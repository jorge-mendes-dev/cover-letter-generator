import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// pdf-parse v2 ships a class-based API; require() resolves the CJS build.
// LoadParameters uses `data: TypedArray | ArrayBuffer` (not `buffer`).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PDFParse } = require("pdf-parse") as {
  PDFParse: new (opts: { data?: ArrayBuffer | Uint8Array; url?: string }) => {
    getText: () => Promise<{ text: string }>;
  };
};

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
    ? rawText.slice(0, MAX_RESUME_CHARS) + "\n[resume truncated for length]"
    : rawText;
}

// ── Step 3: Build the prompt that goes to the model ────────────────────────
function buildPrompt(resumeText: string, jobDescription: string) {
  const system = `You are an expert professional resume writer and career coach who specialises in tailored cover letters.

Your task: write a compelling, specific cover letter body based on the applicant's resume and the provided job description.

Requirements:
- Exactly 3–4 paragraphs of body text.
- Paragraph 1 (Hook): open with genuine enthusiasm for the specific role; name the company or role explicitly if identifiable from the job description.
- Paragraphs 2–3 (Evidence): select 2–3 concrete achievements or skills from the resume that directly match the job's requirements — include numbers, technologies, or measurable outcomes wherever possible.
- Paragraph 4 (Close): reinforce the candidate's fit and invite next steps.
- Tone: confident and direct — never start with "I am writing to apply" or "I believe I would be a great fit".
- Language: detect the language of the job description and write the entire cover letter in that same language. If the job description is in Portuguese, write in Portuguese. If in English, write in English. Match the language exactly.
- Do NOT use placeholder brackets such as [Company Name] or [Your Name] — infer from context or omit gracefully.
- Do NOT include greeting (Dear …), date, address header, or sign-off (Sincerely, …) — body paragraphs only.
- Output plain prose paragraphs separated by a blank line; no bullet points, no headers.`;

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
  if (contentLength && parseInt(contentLength) > MAX_FILE_BYTES + 4096) {
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
