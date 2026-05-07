"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import CoverLetterResult from "./form/CoverLetterResult";
import ErrorBanner from "./form/ErrorBanner";
import JobDescriptionField from "./form/JobDescriptionField";
import ResumeUpload, { type ResumeInputMode } from "./form/ResumeUpload";
import SubmitButton from "./form/SubmitButton";

async function generateCoverLetter(
  formData: FormData,
  defaultError: string,
): Promise<{
  coverLetter: string;
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;
}> {
  const res = await fetch("/api/generate", { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? defaultError);
  return {
    coverLetter: data.coverLetter as string,
    candidateName: (data.candidateName as string) ?? "Unknown",
    candidateEmail: data.candidateEmail as string | undefined,
    candidatePhone: data.candidatePhone as string | undefined,
  };
}

export default function CoverLetterForm() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [resumeInputMode, setResumeInputMode] =
    useState<ResumeInputMode>("upload");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const {
    mutate,
    isPending,
    data,
    error: mutationError,
    reset,
  } = useMutation({
    mutationFn: (formData: FormData) =>
      generateCoverLetter(formData, t.form.errorDefault),
  });

  const error =
    validationError ??
    (mutationError instanceof Error
      ? mutationError.message
      : mutationError
        ? t.form.errorDefault
        : null);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeInputMode === "upload" && !file) {
      setValidationError(t.form.validationNoResume);
      return;
    }
    if (resumeInputMode === "paste" && !resumeText.trim()) {
      setValidationError(t.form.validationNoResumeText);
      return;
    }
    if (!jobDescription.trim()) {
      setValidationError(t.form.validationNoJobDesc);
      return;
    }
    setValidationError(null);
    reset();
    const body = new FormData();
    if (resumeInputMode === "upload" && file) {
      body.append("resume", file);
    } else {
      body.append("resumeText", resumeText.trim());
    }
    body.append("jobDescription", jobDescription.trim());
    mutate(body);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "32px" }}
      >
        <ResumeUpload
          file={file}
          onFileAccepted={(f) => {
            setFile(f);
            setValidationError(null);
          }}
          onFileReset={() => {
            setFile(null);
            setValidationError(null);
            reset();
          }}
          onError={setValidationError}
          inputMode={resumeInputMode}
          onInputModeChange={(mode) => {
            setResumeInputMode(mode);
            setValidationError(null);
            reset();
          }}
          resumeText={resumeText}
          onResumeTextChange={(text) => {
            setResumeText(text);
            if (!text.trim()) reset();
          }}
        />

        <JobDescriptionField
          value={jobDescription}
          onChange={(v) => {
            setJobDescription(v);
            if (!v.trim()) reset();
          }}
        />

        {error && <ErrorBanner message={error} />}

        <SubmitButton loading={isPending} />
      </form>

      {data ? (
        <div ref={resultRef}>
          <CoverLetterResult
            coverLetter={data.coverLetter}
            candidateName={data.candidateName}
            candidateEmail={data.candidateEmail}
            candidatePhone={data.candidatePhone}
          />
        </div>
      ) : null}
    </div>
  );
}
