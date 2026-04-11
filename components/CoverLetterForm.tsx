"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import CoverLetterResult from "./form/CoverLetterResult";
import ErrorBanner from "./form/ErrorBanner";
import JobDescriptionField from "./form/JobDescriptionField";
import ResumeUpload from "./form/ResumeUpload";
import SubmitButton from "./form/SubmitButton";

async function generateCoverLetter(
  formData: FormData,
  defaultError: string,
): Promise<string> {
  const res = await fetch("/api/generate", { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? defaultError);
  return data.coverLetter as string;
}

export default function CoverLetterForm() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const {
    mutate,
    isPending,
    data: coverLetter,
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
    if (coverLetter) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [coverLetter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setValidationError(t.form.validationNoResume);
      return;
    }
    if (!jobDescription.trim()) {
      setValidationError(t.form.validationNoJobDesc);
      return;
    }
    setValidationError(null);
    reset();
    const body = new FormData();
    body.append("resume", file);
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

      {coverLetter && (
        <div ref={resultRef}>
          <CoverLetterResult coverLetter={coverLetter} />
        </div>
      )}
    </div>
  );
}
