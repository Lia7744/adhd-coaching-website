"use client";

import { useState } from "react";
import { Send, CheckCircle, Download } from "lucide-react";

type EmailCaptureFormProps = {
  source: string;
  fileDownloadUrl: string;
  ctaText: string;
};

export default function EmailCaptureForm({ source, fileDownloadUrl, ctaText }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/brevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Oops! Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-brand-sage/10 border-2 border-brand-sage/30 rounded-2xl p-6 sm:p-8 mt-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-sage" />
        <CheckCircle className="w-12 h-12 text-brand-sage mx-auto mb-4" />
        <h3 className="text-xl font-serif font-bold text-brand-charcoal mb-2">You're all set!</h3>
        <p className="text-brand-warm-gray mb-6">Check your inbox for a welcome email, or download your guide right now.</p>
        <a 
          href={fileDownloadUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-brand-sage text-white font-bold text-base shadow-md hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all"
        >
          <Download className="w-5 h-5" />
          Download Guide
        </a>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream border border-brand-border/60 rounded-2xl p-6 sm:p-8 mt-12 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-sage/30" />
      <div className="max-w-xl mx-auto">
        <p className="text-brand-charcoal font-medium mb-6 leading-relaxed">
          {ctaText}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 h-14 px-6 rounded-full border border-brand-border bg-white text-brand-charcoal placeholder:text-brand-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-14 px-8 rounded-full bg-brand-sage text-white font-bold text-base shadow-md hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {status === "loading" ? "Sending..." : "Send it to me!"}
            {status !== "loading" && <Send className="w-4 h-4" />}
          </button>
        </form>
        {status === "error" && (
          <p className="text-red-500 text-sm mt-3 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
