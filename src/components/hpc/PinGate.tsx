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
      await new Promise((resolve) => window.setTimeout(resolve, 600));
      window.location.replace("/dashboard");
    } catch {
      setStatus("idle");
      setError("Couldn’t connect. Check your connection and try again.");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  return (
    <main className="hpc-access-shell">
      <section
        className={`hpc-gate${error ? " has-error" : ""}`}
        aria-labelledby="pin-title"
      >
        {status === "success" ? (
          <div className="hpc-access-granted" role="status">
            <h1 id="pin-title">Access granted</h1>
            <SuccessArrowIcon />
          </div>
        ) : (
          <>
            <h1 id="pin-title">Enter PIN</h1>
            <p className="hpc-gate-copy">Enter the four-digit PIN to continue.</p>

            <form onSubmit={submit} className="hpc-pin-form">
              <label className="hpc-pin-control" htmlFor="hpc-pin">
                <span className="sr-only">Four-digit PIN</span>
                <span className="hpc-pin-slots" aria-hidden="true">
                  {Array.from({ length: PIN_LENGTH }, (_, index) => (
                    <span
                      className={`hpc-pin-slot${index === Math.min(pin.length, PIN_LENGTH - 1) ? " is-active" : ""}`}
                      key={index}
                    >
                      {pin[index] ? "•" : ""}
                    </span>
                  ))}
                </span>

                <input
                  ref={inputRef}
                  id="hpc-pin"
                  className="hpc-pin-input"
                  aria-describedby="hpc-pin-message"
                  aria-invalid={Boolean(error)}
                  autoComplete="one-time-code"
                  autoFocus
                  disabled={status === "submitting"}
                  inputMode="numeric"
                  maxLength={PIN_LENGTH}
                  onChange={(event) => updatePin(event.target.value)}
                  pattern="[0-9]*"
                  type="password"
                  value={pin}
                />
              </label>

              <button
                type="submit"
                className="hpc-pin-submit"
                disabled={pin.length !== PIN_LENGTH || status === "submitting"}
              >
                {status === "submitting" ? "Checking…" : "Enter"}
              </button>

              <p
                id="hpc-pin-message"
                className="hpc-pin-message"
                aria-live="polite"
              >
                {error}
              </p>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

function SuccessArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}
