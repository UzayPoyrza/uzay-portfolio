"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import Link from "next/link";

const PIN_LENGTH = 4;

export default function PinGate() {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function replaceDigits(
    nextDigits: string[],
    focusIndex?: number,
    clearError = true,
  ) {
    setDigits(nextDigits);
    if (clearError) setError("");
    if (focusIndex !== undefined) {
      requestAnimationFrame(() => inputs.current[focusIndex]?.focus());
    }
  }

  function handleChange(index: number, value: string) {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) {
      const next = [...digits];
      next[index] = "";
      replaceDigits(next);
      return;
    }

    const next = [...digits];
    numbers.slice(0, PIN_LENGTH - index).split("").forEach((digit, offset) => {
      next[index + offset] = digit;
    });
    replaceDigits(next, Math.min(index + numbers.length, PIN_LENGTH - 1));
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      const next = [...digits];
      next[index - 1] = "";
      replaceDigits(next, index - 1);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < PIN_LENGTH - 1) {
      event.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pin = digits.join("");
    if (pin.length !== PIN_LENGTH || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/hpc/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(body.error || "Unable to unlock the preview.");
        replaceDigits(["", "", "", ""], 0, false);
        return;
      }

      window.location.replace("/hpc");
    } catch {
      setError("Couldn’t reach the preview. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="hpc-access-shell">
      <div className="hpc-orbit hpc-orbit-one" aria-hidden="true" />
      <div className="hpc-orbit hpc-orbit-two" aria-hidden="true" />

      <div className="hpc-access-topline">
        <Link href="/" className="hpc-wordmark" aria-label="Uzay.dev home">
          <span className="hpc-wordmark-dot" />
          uzay.dev
        </Link>
        <span className="hpc-private-label">
          <LockIcon /> Private preview
        </span>
      </div>

      <section className="hpc-pin-panel" aria-labelledby="pin-title">
        <div className="hpc-access-index" aria-hidden="true">01 / ACCESS</div>
        <div className="hpc-lock-seal" aria-hidden="true"><LockIcon /></div>
        <p className="hpc-eyebrow">HPC Sites Markup Builder</p>
        <h1 id="pin-title">Enter your access PIN.</h1>
        <p className="hpc-pin-copy">
          This review space is private. Use the four-digit PIN shared with you.
        </p>

        <form onSubmit={submit} className="hpc-pin-form">
          <div className="hpc-pin-inputs" aria-label="Four-digit access PIN">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => { inputs.current[index] = node; }}
                aria-label={`PIN digit ${index + 1}`}
                aria-invalid={Boolean(error)}
                autoComplete={index === 0 ? "one-time-code" : "off"}
                autoFocus={index === 0}
                className={error ? "is-error" : ""}
                disabled={submitting}
                inputMode="numeric"
                maxLength={index === 0 ? 4 : 1}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                pattern="[0-9]*"
                type="password"
                value={digit}
              />
            ))}
          </div>

          <div className="hpc-pin-status" aria-live="polite">
            {error || "Access expires after eight hours."}
          </div>

          <button
            type="submit"
            className="hpc-unlock-button"
            disabled={digits.join("").length !== PIN_LENGTH || submitting}
          >
            <span>{submitting ? "Checking…" : "Continue to dashboard"}</span>
            <ArrowIcon />
          </button>
        </form>
      </section>

      <p className="hpc-access-footer">Internal project review · Authorized access only</p>
    </main>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" />
      <rect x="5" y="10" width="14" height="10" rx="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}
