"use client";

import { useState } from "react";

type Result = {
  shortUrl: string;
  originalUrl: string;
};

const DEMO_SHORT = "neatlink.io/zn9edcu";
const DEMO_ORIGINAL = "https://en.wikipedia.org/wiki/Systems_design";

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setError(null);
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setResult({ shortUrl: data.shortUrl, originalUrl: url.trim() });
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    const target = result?.shortUrl;
    if (!target) return;
    await navigator.clipboard.writeText(target);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const displayShort = result
    ? result.shortUrl.replace(/^https?:\/\//, "")
    : DEMO_SHORT;
  const displayOriginal = result?.originalUrl ?? DEMO_ORIGINAL;

  return (
    <>
      <form
        id="shorten"
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl bg-surface rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)] flex items-center p-1.5 border border-hairline"
      >
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/your-very-long-url"
          className="flex-1 px-5 py-3 bg-transparent outline-none text-ink placeholder:text-muted/70 text-[15px]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-surface rounded-full px-6 py-3 text-[14px] font-medium hover:bg-ink/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Shortening…" : "Shorten"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-[13px] text-red-600" role="alert">
          {error}
        </p>
      )}

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[14px] text-muted">
        {["No signup", "Permanent links", "Copy in one click"].map((label) => (
          <li key={label} className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-accent"
            >
              <path
                d="M11.5 3.75L5.5 9.75L2.5 6.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-20 relative w-full max-w-lg">
        <svg
          aria-hidden="true"
          className="absolute -top-10 -left-14 w-20 h-20 text-ink/30 -rotate-18 hidden sm:block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>

        <div
          aria-hidden="true"
          className="absolute top-4 -left-6 sm:-left-10 w-[85%] bg-surface rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-20px_rgba(0,0,0,0.15)] border border-hairline p-5 -rotate-[4deg] opacity-70"
        >
          <div className="text-[10px] uppercase tracking-[0.12em] text-muted font-medium">
            Short URL
          </div>
          <div className="mt-1 font-mono text-[14px] text-ink truncate">
            neatlink.io/q7mx82p
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted font-medium">
            Original
          </div>
          <div className="mt-1 text-[12px] text-muted truncate">
            https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
          </div>
        </div>

        <div className="relative bg-surface rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_48px_-20px_rgba(0,0,0,0.18)] border border-hairline p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.12em] text-muted font-medium">
                Short URL
              </div>
              <div className="mt-1.5">
                {result ? (
                  <a
                    href={result.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[18px] font-medium text-ink hover:text-accent transition-colors truncate block"
                  >
                    {displayShort}
                  </a>
                ) : (
                  <span className="font-mono text-[18px] font-medium text-ink truncate block">
                    {displayShort}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={copy}
              disabled={!result}
              className="inline-flex items-center gap-1.5 bg-ink text-surface rounded-full px-3 py-1.5 text-[12px] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-hairline">
            <div className="text-[11px] uppercase tracking-[0.12em] text-muted font-medium">
              Original
            </div>
            <div className="mt-1.5 text-[13px] text-muted truncate">
              {displayOriginal}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-[12px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              {result ? "Created just now" : "Example"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
