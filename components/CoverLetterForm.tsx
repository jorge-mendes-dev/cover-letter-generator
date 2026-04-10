"use client";

import { useEffect, useRef, useState } from "react";
import CoverLetterResult from "./form/CoverLetterResult";
import ErrorBanner from "./form/ErrorBanner";
import JobDescriptionField from "./form/JobDescriptionField";
import ResumeUpload from "./form/ResumeUpload";
import SubmitButton from "./form/SubmitButton";

export default function CoverLetterForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload your resume as a PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    setLoading(true);
    setError(null);
    setCoverLetter(null);

    const body = new FormData();
    body.append("resume", file);
    body.append("jobDescription", jobDescription.trim());

    try {
      const res = await fetch("/api/generate", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setCoverLetter(data.coverLetter);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
            setError(null);
          }}
          onFileReset={() => {
            setFile(null);
            setError(null);
          }}
          onError={setError}
        />

        <JobDescriptionField
          value={jobDescription}
          onChange={setJobDescription}
        />

        {error && <ErrorBanner message={error} />}

        <SubmitButton loading={loading} />
      </form>

      {coverLetter && (
        <div ref={resultRef}>
          <CoverLetterResult coverLetter={coverLetter} />
        </div>
      )}
    </div>
  );
}
