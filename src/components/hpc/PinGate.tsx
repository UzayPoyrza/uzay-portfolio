"use client";

import { FormEvent, useRef, useState } from "react";

const PIN_LENGTH = 4;
type GateStatus = "idle" | "submitting" | "success";

export default function PinGate() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<GateStatus>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  function updatePin(value: string) {
    setPin(value.replace(/\D/g, "").slice(0, PIN_LENGTH));
    if (error) setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pin.length !== PIN_LENGTH || status !== "idle") return;

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/dashboard/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("idle");
        setPin("");
        setError(body.error || "Unable to unlock the preview.");
        requestAnimationFrame(() => inputRef.current?.focus());
        return;
      }

      setStatus("success");
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      window.location.replace("/dashboard");
    } catch {
      setStatus("idle");
      setError("Couldn’t connect. Check your connection and try again.");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  const successful = status === "success";

  return (
    <main className="hpc-access-shell">
      <section
        className={`hpc-gate${error ? " has-error" : ""}${successful ? " is-success" : ""}`}
        aria-labelledby="pin-title"
      >
        <div className="hpc-gate-icon" aria-hidden="true">
          {successful ? <CheckIcon /> : <LockIcon />}
        </div>

        <p className="hpc-gate-label">HPC Sites Markup Builder</p>
        <h1 id="pin-title">{successful ? "Access granted" : "Enter PIN"}</h1>
        <p className="hpc-gate-copy">
          {successful
            ? "Opening the private workspace…"
            : "Enter the four-digit PIN to continue."}
        </p>

        {successful ? (
          <div className="hpc-success-status" role="status">
            <span /> Secure session started
          </div>
        ) : (
          <form onSubmit={submit} className="hpc-pin-form">
            <div className="hpc-pin-row">
              <label className="sr-only" htmlFor="hpc-pin">Four-digit PIN</label>
              <input
                ref={inputRef}
                id="hpc-pin"
                aria-describedby="hpc-pin-message"
                aria-invalid={Boolean(error)}
                autoComplete="one-time-code"
                autoFocus
                disabled={status === "submitting"}
                inputMode="numeric"
                maxLength={PIN_LENGTH}
                onChange={(event) => updatePin(event.target.value)}
                pattern="[0-9]*"
                placeholder="••••"
                type="password"
                value={pin}
              />
              <button
                type="submit"
                disabled={pin.length !== PIN_LENGTH || status === "submitting"}
              >
                {status === "submitting" ? "Checking…" : "Enter"}
                <ArrowIcon />
              </button>
            </div>

            <p
              id="hpc-pin-message"
              className="hpc-pin-message"
              aria-live="polite"
            >
              {error}
            </p>
          </form>
        )}
      </section>
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6.5 12.5 3.5 3.5 7.5-8" />
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
