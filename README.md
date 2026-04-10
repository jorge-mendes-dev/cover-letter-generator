# Cover Letter Generator

Upload your PDF résumé and paste a job description — get a tailored, AI-generated cover letter in seconds.

Built with **Next.js 16**, **React 19**, and **Groq's `llama-3.3-70b-versatile`** model via the Vercel AI SDK.

---

## Features

- **PDF résumé parsing** — server-side text extraction via `pdf-parse` (text-based PDFs only)
- **AI-generated cover letters** — structured output with Zod validation; no hallucinated placeholders
- **ElevenLabs-inspired UI** — Cormorant Garamond display type, Inter body, soft light palette
- **Error boundary** — catches unexpected render errors with a graceful fallback UI
- **Input validation** — PDF type/size checks (≤ 5 MB), non-empty job description required

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 · TypeScript · Tailwind CSS v4 |
| AI | Vercel AI SDK v6 · `@ai-sdk/groq` · `llama-3.3-70b-versatile` |
| PDF parsing | `pdf-parse` v2 (Node.js runtime) |
| Validation | Zod v4 |

---

## Project Structure

```
app/
  layout.tsx              — fonts + root ErrorBoundary
  globals.css             — Tailwind import + base styles
  page.tsx                — landing page (server component)
  api/
    generate/
      route.ts            — POST handler: PDF → prompt → AI → JSON
components/
  CoverLetterForm.tsx     — client form: upload, textarea, submit, result
  ErrorBoundary.tsx       — class-based React error boundary
  form/
    CoverLetterResult.tsx — rendered cover letter output
    ErrorBanner.tsx       — inline API error display
    JobDescriptionField.tsx
    ResumeUpload.tsx
    SubmitButton.tsx
    tokens.ts             — shared design tokens (colors, shadows, fonts)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> The API key is only read server-side and never exposed to the client.

### Development

```bash
npm run dev        # http://localhost:3000
npm run dev:f      # http://localhost:4000
```

### Build & Start

```bash
npm run build
npm start
```

---

## API Route

`POST /api/generate` — accepts `multipart/form-data`:

| Field | Type | Constraint |
|---|---|---|
| `resume` | `File` (PDF) | ≤ 5 MB, text-based |
| `jobDescription` | `string` | Non-empty |

**Response** `200 OK`:

```json
{ "coverLetter": "..." }
```

**Error responses**: `400` (invalid input), `422` (PDF parse failure), `500` (server/AI error).

The route runs on the **Node.js runtime** (not Edge) because `pdf-parse` requires Node.js APIs. Resume text is truncated to 8 000 characters before being sent to the model.

---

## Corporate Proxy / TLS

If you are behind a corporate proxy with a custom root CA, set:

```env
NODE_TLS_REJECT_UNAUTHORIZED=0
```

The app detects this flag and configures `undici`'s global dispatcher accordingly.

---

## Deployment

Deploy to [Vercel](https://vercel.com) with zero configuration — just add `GROQ_API_KEY` as an environment variable in your project settings.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
