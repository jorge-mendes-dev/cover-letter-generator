import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";
import { z } from "zod";

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

// Must be Node.js — unpdf/pdfjs-dist does not run on the Edge runtime
export const runtime = "nodejs";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_RESUME_CHARS = 8_000; // ~ 2 k tokens — keeps cost low and stays within context

type SupportedLocale = "en" | "es" | "pt-BR";

const GENERIC_NAME_VALUES = new Set([
  "",
  "unknown",
  "candidate",
  "n/a",
  "na",
  "not provided",
]);

function normalizeCandidateName(name: string | null | undefined): string | null {
  if (!name) return null;
  const normalized = name.trim();
  if (!normalized) return null;
  return GENERIC_NAME_VALUES.has(normalized.toLowerCase()) ? null : normalized;
}

function extractCandidateNameFromResume(resumeText: string): string | null {
  const lines = resumeText
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 25);

  const titleCaseName =
    /^[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ'’-]+){1,3}$/;
  const upperCaseName =
    /^[A-ZÀ-ÖØ-Ý][A-ZÀ-ÖØ-Ý'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][A-ZÀ-ÖØ-Ý'’-]+){1,3}$/;

  for (const line of lines) {
    if (
      line.includes("@") ||
      /^https?:\/\//i.test(line) ||
      /linkedin|github|portfolio|curriculum|resume|cv/i.test(line) ||
      /\d{3,}/.test(line)
    ) {
      continue;
    }

    if (titleCaseName.test(line) || upperCaseName.test(line)) {
      return line;
    }
  }

  return null;
}

function inferLanguageFromText(
  text: string,
  fallback: SupportedLocale = "en"
): SupportedLocale {
  const lower = text.toLowerCase();
  const normalized = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const scores: Record<SupportedLocale, number> = {
    en: 0,
    es: 0,
    "pt-BR": 0,
  };

  const countWord = (source: string, word: string) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = source.match(new RegExp(`\\b${escaped}\\b`, "g"));
    return matches?.length ?? 0;
  };

  const countFragment = (source: string, fragment: string) => {
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = source.match(new RegExp(escaped, "g"));
    return matches?.length ?? 0;
  };

  const addWord = (language: "es" | "pt-BR", marker: string, weight: number) => {
    scores[language] += countWord(normalized, marker) * weight;
  };

  const addFragment = (
    language: "es" | "pt-BR",
    marker: string,
    weight: number
  ) => {
    scores[language] += countFragment(normalized, marker) * weight;
  };

  addWord("pt-BR", "voce", 3);
  addWord("pt-BR", "seu", 2.4);
  addWord("pt-BR", "sua", 2.4);
  addWord("pt-BR", "nao", 2.1);
  addWord("pt-BR", "com", 1.1);
  addWord("pt-BR", "vaga", 2.7);
  addWord("pt-BR", "equipe", 2.7);

  addWord("es", "usted", 3);
  addWord("es", "su", 1.2);
  addWord("es", "no", 1);
  addWord("es", "con", 1.1);
  addWord("es", "equipo", 2.7);
  addWord("es", "puesto", 2.7);
  addWord("es", "vacante", 2.7);

  addWord("pt-BR", "experiencia", 0.6);
  addWord("es", "experiencia", 0.6);
  addWord("pt-BR", "trabalho", 0.6);
  addWord("es", "trabajo", 0.6);
  addWord("pt-BR", "oportunidade", 0.6);
  addWord("es", "oportunidad", 0.6);
  addWord("pt-BR", "para", 0.5);
  addWord("es", "para", 0.5);

  scores["pt-BR"] += countFragment(lower, "ção") * 1.6;
  scores["pt-BR"] += countFragment(lower, "ções") * 1.8;
  scores["pt-BR"] += countWord(lower, "às") * 1.8;
  scores["pt-BR"] += countWord(lower, "você") * 1.8;
  scores["pt-BR"] += countWord(lower, "não") * 1.5;
  scores["pt-BR"] += countFragment(lower, "ã") * 0.8;
  scores["pt-BR"] += countFragment(lower, "õ") * 0.8;
  scores["pt-BR"] += countFragment(lower, "ç") * 0.8;

  scores.es += countFragment(lower, "ción") * 1.6;
  scores.es += countFragment(lower, "ciones") * 1.8;
  scores.es += countFragment(lower, "ñ") * 1.3;

  addFragment("pt-BR", "cao", 0.7);
  addFragment("pt-BR", "coes", 0.8);
  addFragment("es", "cion", 0.7);
  addFragment("es", "ciones", 0.8);

  const ranking = (Object.entries(scores) as Array<[SupportedLocale, number]>).sort(
    (a, b) => b[1] - a[1]
  );

  const [bestLanguage, bestScore] = ranking[0] ?? [fallback, 0];
  const [, secondScore] = ranking[1] ?? [fallback, 0];
  const confidenceThreshold = 2.4;
  if (bestScore < confidenceThreshold) return fallback;

  const tieMargin = 1.1;
  if (bestScore - secondScore <= tieMargin) return fallback;

  return bestLanguage;
}

function languageLabel(locale: SupportedLocale): string {
  if (locale === "pt-BR") return "Portuguese (Brazil)";
  if (locale === "es") return "Spanish";
  return "English";
}

// ── Zod schema for structured AI output ────────────────────────────────────
const coverLetterSchema = z.object({
  coverLetter: z
    .string()
    .describe(
      "A tailored professional cover letter in 3–4 body paragraphs. " +
        "No salutation, address block, date, or sign-off — body text only."
    ),
  candidateName: z
    .string()
    .describe(
      "Full name of the candidate as it appears on the resume. Use 'Unknown' if not found."
    ),
  candidateEmail: z
    .string()
    .nullable()
    .describe("Email address extracted from the resume, or null if not present."),
  candidatePhone: z
    .string()
    .nullable()
    .describe("Phone number extracted from the resume, or null if not present."),
});

// ── Step 1: Parse & validate the incoming FormData ─────────────────────────
async function parseFormData(
  req: NextRequest
): Promise<{ file?: File; resumeText?: string; jobDescription: string } | NextResponse> {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  const file = formData.get("resume");
  const resumeText = formData.get("resumeText");
  const jobDescription = formData.get("jobDescription");

  if (typeof jobDescription !== "string" || !jobDescription.trim()) {
    return NextResponse.json(
      { error: "Please provide the job description." },
      { status: 400 }
    );
  }

  // Plain-text resume mode
  if (typeof resumeText === "string" && resumeText.trim()) {
    return { resumeText: resumeText.trim(), jobDescription: jobDescription.trim() };
  }

  // PDF upload mode
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Please upload a PDF resume or paste your resume text." }, { status: 400 });
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
    const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
    const { text } = await extractText(pdf, { mergePages: true });
    rawText = text.trim();
  } catch (err) {
    console.error("[extractTextFromPdf] unpdf error:", err);
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
function buildPrompt(
  resumeText: string,
  jobDescription: string,
  targetLanguage: SupportedLocale
) {
  const targetLanguageLabel = languageLabel(targetLanguage);
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

Write the cover letter entirely in ${targetLanguageLabel}. This is mandatory.

Extract the candidate full name exactly as written in the resume and return it in candidateName. Never use placeholders or generic labels.

Do not include greetings, sign-offs, or placeholders like [Company Name]. Output only plain paragraphs separated by a blank line. No bullet points or headers.

Write in a natural, human tone. Avoid robotic phrasing, clichés, or overly formal language.`;

  const prompt = `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`;

  return { system, prompt };
}

// ── Step 4: Call the model and return the structured cover letter ───────────
async function generateCoverLetter(
  apiKey: string,
  system: string,
  prompt: string,
  targetLanguage: SupportedLocale
): Promise<{
  coverLetter: string;
  candidateName: string;
  candidateEmail: string | null;
  candidatePhone: string | null;
} | NextResponse> {
  const groq = createGroq({ apiKey });

  try {
    const generateOnce = async (systemPrompt: string) =>
      generateObject({
        model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
        schema: coverLetterSchema,
        system: systemPrompt,
        prompt,
      });

    let { object } = await generateOnce(system);
    const detectedOutputLanguage = inferLanguageFromText(object.coverLetter);

    if (detectedOutputLanguage !== targetLanguage) {
      const strictSystem = `${system}\n\nCRITICAL LANGUAGE RULE: The final cover letter must be written 100% in ${languageLabel(
        targetLanguage
      )}. Do not switch languages. Do not mix in English.`;
      const retry = await generateOnce(strictSystem);
      object = retry.object;
    }

    return {
      coverLetter: object.coverLetter,
      candidateName: object.candidateName,
      candidateEmail: object.candidateEmail,
      candidatePhone: object.candidatePhone,
    };
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
  const { file, resumeText: rawResumeText, jobDescription } = parsed;
  const targetLanguage = inferLanguageFromText(jobDescription);

  // Step 2 — extract text (PDF path) or use pasted text directly
  let resumeText: string;
  if (rawResumeText) {
    resumeText =
      rawResumeText.length > MAX_RESUME_CHARS
        ? rawResumeText.slice(0, MAX_RESUME_CHARS) +
          "\n\n[Note: The resume above was truncated due to length. Only use the information visible above.]"
        : rawResumeText;
  } else {
    const extracted = await extractTextFromPdf(file!);
    if (extracted instanceof NextResponse) return extracted;
    resumeText = extracted;
  }

  // Step 3 — build the structured prompt
  const { system, prompt } = buildPrompt(
    resumeText,
    jobDescription,
    targetLanguage
  );

  // Step 4 — call the model and return the result
  const result = await generateCoverLetter(apiKey, system, prompt, targetLanguage);
  if (result instanceof NextResponse) return result;

  const extractedName = extractCandidateNameFromResume(resumeText);
  const candidateName =
    normalizeCandidateName(result.candidateName) ?? extractedName ?? "Candidate";

  return NextResponse.json({
    coverLetter: result.coverLetter,
    candidateName,
    candidateEmail: result.candidateEmail ?? undefined,
    candidatePhone: result.candidatePhone ?? undefined,
  });
}
