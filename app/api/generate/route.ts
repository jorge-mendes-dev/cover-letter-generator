import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// pdf-parse v2 ships a class-based API; require() resolves the CJS build.
// LoadParameters uses `data: TypedArray | ArrayBuffer` (not `buffer`).
type PDFParseConstructor = new (opts: { data?: ArrayBuffer | Uint8Array; url?: string }) => {
  getText: () => Promise<{ text: string }>;
};

let PDFParse: PDFParseConstructor | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ({ PDFParse } = require("pdf-parse") as { PDFParse: PDFParseConstructor });
} catch (err) {
  console.error("[module load] pdf-parse failed to load:", err);
}

// Node.js native fetch (undici) does NOT honour NODE_TLS_REJECT_UNAUTHORIZED at
// runtime — it must be applied via a custom global dispatcher. This activates
// only when the flag is explicitly set (e.g. Windows with a corporate proxy or
// missing root CA certificates in the trust store).
if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const undici = require("undici") as {
    setGlobalDispatcher: (d: unknown) => void;
    Agent: new (o: { connect: { rejectUnauthorized: boolean } }) => unknown;
  };
  undici.setGlobalDispatcher(new undici.Agent({ connect: { rejectUnauthorized: false } }));
}

// Must be Node.js — pdf-parse does not run on the Edge runtime
export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_RESUME_CHARS = 8_000; // ~ 2 k tokens — keeps cost low and stays within context

// ── Zod schema for structured AI output ────────────────────────────────────
const coverLetterSchema = z.object({
  coverLetter: z
    .string()
    .describe(
      "A tailored professional cover letter in 3–4 body paragraphs. " +
        "No salutation, address block, date, or sign-off — body text only."
    ),
});

// ── Step 1: Parse & validate the incoming FormData ─────────────────────────
async function parseFormData(
  req: NextRequest
): Promise<{ file: File; jobDescription: string } | NextResponse> {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  const file = formData.get("resume");
  const jobDescription = formData.get("jobDescription");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Please upload a PDF resume." }, { status: 400 });
  }
  if (typeof jobDescription !== "string" || !jobDescription.trim()) {
    return NextResponse.json(
      { error: "Please provide the job description." },
      { status: 400 }
    );
  }
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json(
      { error: "Only PDF files are supported." },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { error: "Resume must be smaller than 5 MB." },
      { status: 400 }
    );
  }

  return { file, jobDescription: jobDescription.trim() };
}

// ── Step 2: Extract plain text from the PDF buffer ─────────────────────────
async function extractTextFromPdf(file: File): Promise<string | NextResponse> {
  if (!PDFParse) {
    return NextResponse.json(
      { error: "PDF parsing is unavailable. Please try again later." },
      { status: 500 }
    );
  }
  let rawText: string;
  try {
    const arrayBuffer = await file.arrayBuffer();
    const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });
    const result = await parser.getText();
    rawText = result.text.trim();
  } catch (err) {
    console.error("[extractTextFromPdf] pdf-parse error:", err);
    return NextResponse.json(
      {
        error:
          "Could not parse the PDF. Please ensure it is a valid, text-based PDF " +
          "(scanned / image-only PDFs are not supported).",
      },
      { status: 422 }
    );
  }

  if (!rawText) {
    return NextResponse.json(
      {
        error:
          "No readable text found in the PDF. " +
          "Scanned or image-only PDFs are not supported.",
      },
      { status: 422 }
    );
  }

  // Truncate to stay within model token limits
  return rawText.length > MAX_RESUME_CHARS
    ? rawText.slice(0, MAX_RESUME_CHARS) +
        "\n\n[Note: The resume above was truncated due to length. Only use the information visible above.]"
    : rawText;
}

// ── Step 3: Build the prompt that goes to the model ────────────────────────
function buildPrompt(resumeText: string, jobDescription: string) {
  const system = `You are an experienced resume writer and career coach who specializes in writing strong, tailored, and natural-sounding cover letters.

Write a compelling cover letter based on the candidate’s resume and the job description provided. Aim for approximately 250–350 words total across 3–4 paragraphs.

Only use information present in the resume. Do not invent skills, achievements, technologies, companies, or metrics that are not explicitly stated.

Start with a strong, specific opening that shows genuine interest in the role. Mention the company, product, or domain when possible, and connect it to something meaningful (such as scale, technical challenges, or impact). Avoid generic openings like “I’m thrilled to apply”.

In the next 1–2 paragraphs, highlight 2–3 relevant experiences that match the job requirements. For each example:
1. Clearly describe the action taken, the technologies used, and the impact or result (prefer measurable outcomes like performance, scalability, or efficiency improvements).
2. Reflect the seniority level evident in the resume — do not over-claim ownership, architectural decisions, or cross-team leadership that is not supported by the resume text.
3. Do not simply repeat the resume — focus on what is most relevant for this role.

If the job description mentions AI, automation, or innovation, incorporate relevant experience or demonstrated interest in those areas in a natural way.

Finish with a confident, forward-looking closing that reinforces the candidate’s fit and interest in contributing. Avoid generic phrases like “I look forward to hearing from you”.

Write in the same language as the job description.

Do not include greetings, sign-offs, or placeholders like [Company Name]. Output only plain paragraphs separated by a blank line. No bullet points or headers.

Write in a natural, human tone. Avoid robotic phrasing, clichés, or overly formal language.`;

  const prompt = `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`;

  return { system, prompt };
}

// ── Step 4: Call the model and return the structured cover letter ───────────
async function generateCoverLetter(
  apiKey: string,
  system: string,
  prompt: string
): Promise<{ coverLetter: string } | NextResponse> {
  const groq = createGroq({ apiKey });

  try {
    const { object } = await generateObject({
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      schema: coverLetterSchema,
      system,
      prompt,
    });
    return { coverLetter: object.coverLetter };
  } catch (err) {
    console.error("[/api/generate] AI error:", err);
    return NextResponse.json(
      { error: "Failed to generate the cover letter. Please try again." },
      { status: 500 }
    );
  }
}

// ── Route handler — orchestrates the workflow ──────────────────────────────
export async function POST(req: NextRequest) {
  // Reject oversized requests before buffering the body
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_FILE_BYTES + 4096) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is not configured. Please contact the administrator." },
      { status: 500 }
    );
  }

  // Step 1 — parse & validate FormData
  const parsed = await parseFormData(req);
  if (parsed instanceof NextResponse) return parsed;
  const { file, jobDescription } = parsed;

  // Step 2 — extract text from the uploaded PDF
  const resumeText = await extractTextFromPdf(file);
  if (resumeText instanceof NextResponse) return resumeText;

  // Step 3 — build the structured prompt
  const { system, prompt } = buildPrompt(resumeText, jobDescription);

  // Step 4 — call the model and return the result
  const result = await generateCoverLetter(apiKey, system, prompt);
  if (result instanceof NextResponse) return result;

  return NextResponse.json(result);
}
