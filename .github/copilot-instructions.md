# Copilot Instructions — cv-generator

## Project Overview

**Cover Letter Generator** — a Next.js 16 (App Router) application where users upload a PDF résumé and paste a job description to receive a tailored AI-generated cover letter.

**Stack:**

- Next.js 16.2 · React 19 · TypeScript · Tailwind CSS v4
- AI SDK (`ai` v6, `@ai-sdk/groq`) — model: `llama-3.3-70b-versatile`
- `pdf-parse` v2 for server-side PDF text extraction
- `zod` v4 for structured AI response validation

---

## Project Structure

```
app/
  layout.tsx          — fonts (Cormorant Garamond, Inter, JetBrains Mono) + metadata
  globals.css         — Tailwind import, body base styles (light theme)
  page.tsx            — landing page (server component)
  api/
    generate/
      route.ts        — POST handler: PDF parse → prompt → AI → JSON response
components/
  CoverLetterForm.tsx — "use client" form: upload, textarea, submit, result display
.env.local            — GROQ_API_KEY (required, not committed)
DESIGN.md             — ElevenLabs-inspired design system reference
```

---

## Design System (from DESIGN.md)

The UI follows an **ElevenLabs-inspired light design system**. Always respect these rules when editing UI:

### Colors

| Role               | Value                           |
| ------------------ | ------------------------------- |
| Page background    | `#f5f5f5`                       |
| Surface / card     | `#ffffff`                       |
| Warm surface       | `rgba(245,242,239,0.8)`         |
| Primary text       | `#000000`                       |
| Secondary text     | `#4e4e4e`                       |
| Muted / label text | `#777169`                       |
| Border             | `#e5e5e5` or `rgba(0,0,0,0.05)` |

### Typography

- **Display headings**: `var(--font-cormorant)` — Cormorant Garamond **weight 300**, `letter-spacing: -0.96px`. Never use bold for headings.
- **Body / UI**: `var(--font-inter)` — Inter 400/500, `letter-spacing: 0.14px–0.18px` (always positive on body text)
- **Output / code**: `var(--font-mono)` — JetBrains Mono 400, `line-height: 1.85`

### Shadows (always sub-0.1 opacity)

- **Outline ring**: `rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px`
- **Inset edge**: `rgba(0,0,0,0.075) 0px 0px 0px 0.5px inset`
- **Warm lift**: `rgba(0,0,0,0.1) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(78,50,23,0.04) 0px 6px 16px`
- **Button**: `rgba(0,0,0,0.4) 0px 0px 1px, rgba(0,0,0,0.04) 0px 4px 4px`

### Border Radius

- Cards / containers: `16px–24px`
- Inputs / textareas: `10px–12px`
- Pill buttons: `9999px`

### Buttons

- **Primary**: black pill `#000` · white text · `9999px` radius · Inter 500 15px
- **Secondary**: white pill · shadow-as-border (`rgba(0,0,0,0.4) 0px 0px 1px,...`) · Inter 500 13px
- **Warm CTA**: `rgba(245,242,239,0.8)` bg · warm shadow · `30px` radius

---

## API Route — `app/api/generate/route.ts`

Runs on **Node.js runtime** (not Edge — required by `pdf-parse`).

### 4-Step Workflow

```
POST /api/generate (multipart FormData)
  │
  ▼  Step 1 — parseFormData()
  │  Validates: file (PDF, ≤ 5 MB) + jobDescription (non-empty string)
  │
  ▼  Step 2 — extractTextFromPdf()
  │  File → Buffer → pdf-parse → raw text string
  │  Truncates at 8 000 chars (~2 k tokens)
  │
  ▼  Step 3 — buildPrompt()
  │  Composes { system, prompt }
  │  system: role + 4-paragraph structure rules + tone rules
  │  prompt: "RESUME:\n{text}\n\nJOB DESCRIPTION:\n{jd}"
  │
  ▼  Step 4 — generateCoverLetter()
     generateObject({ model, schema: z.object({ coverLetter: z.string() }), system, prompt })
     Returns NextResponse.json({ coverLetter })
```

Each step returns either its result **or** a `NextResponse` error — the handler chains them with early-exit guards.

### Key Constraints

- `pdf-parse` uses CJS — import via `require()`, not ESM `import`. It is listed in `serverExternalPackages` in `next.config.ts`.
- `GROQ_API_KEY` must be set in `.env.local`. Missing key returns HTTP 500 with a safe error message.
- File size limit: 5 MB. Resume text truncated at 8 000 chars before sending to model.

---

## Environment Variables

| Variable       | Required | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `GROQ_API_KEY` | ✅       | Groq API key — get from console.groq.com |

---

## Key Conventions

- **No inline Tailwind for design values** — use `style={{}}` props with exact DESIGN.md tokens (colors, shadows, radii, letter-spacing). Tailwind utilities are fine for layout/spacing helpers.
- **Server components by default** — only add `"use client"` when state/effects are needed.
- **Structured AI output** — always use `generateObject` + Zod schema, never `generateText` + string parsing.
- **pdf-parse via require()** — the ESM interop issue with `moduleResolution: "bundler"` means the default export doesn't resolve; use `require()` with a type cast.
- **No placeholder brackets in prompts** — the system prompt instructs the model never to output `[Company Name]` etc.
