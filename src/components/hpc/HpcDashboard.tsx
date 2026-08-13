"use client";

import { useState } from "react";
import Link from "next/link";
import type { HpcRevision } from "@/lib/hpc/github";

type Props = {
  revision: HpcRevision | null;
  syncUnavailable: boolean;
};

export default function HpcDashboard({ revision, syncUnavailable }: Props) {
  const [loggingOut, setLoggingOut] = useState(false);

  async function logOut() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/hpc/auth", { method: "DELETE" });
    } finally {
      window.location.replace("/hpc");
    }
  }

  const committedAt = revision?.committedAt
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(revision.committedAt))
    : null;

  return (
    <main className="hpc-dashboard-shell">
      <header className="hpc-dashboard-header">
        <Link href="/" className="hpc-wordmark" aria-label="Uzay.dev home">
          <span className="hpc-wordmark-dot" />
          uzay.dev
        </Link>

        <div className="hpc-header-actions">
          <span className="hpc-private-label">
            <ShieldIcon /> Private workspace
          </span>
          <button type="button" onClick={logOut} className="hpc-signout" disabled={loggingOut}>
            {loggingOut ? "Locking…" : "Lock workspace"}
          </button>
        </div>
      </header>

      <section className="hpc-dashboard-content">
        <div className="hpc-dashboard-intro">
          <div>
            <p className="hpc-eyebrow">Internal tools</p>
            <h1>HPC review workspace</h1>
          </div>
          <p>
            A focused space for reviewing Columbia Sites mockups and comparing
            design directions against the current pages.
          </p>
        </div>

        {syncUnavailable && (
          <div className="hpc-sync-alert" role="status">
            <span />
            GitHub couldn’t be reached. Opening the tool will retry, then use your last known-good snapshot if available.
          </div>
        )}

        <div className="hpc-tool-count"><span>Available tools</span><span>01</span></div>

        <article className="hpc-tool-card">
          <div className="hpc-tool-preview">
            {revision ? (
              // This is an authenticated, revision-pinned image from the private source repository.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/hpc/tool/${revision.sha}/viewer/thumbs/hpc-main.png`}
                alt="HPC mockup builder preview"
              />
            ) : (
              <div className="hpc-preview-skeleton" aria-hidden="true">
                <span /><span /><span /><span />
              </div>
            )}
            <div className="hpc-preview-chrome" aria-hidden="true">
              <i /><i /><i />
              <span>HPC MOCKUP REVIEW</span>
            </div>
          </div>

          <div className="hpc-tool-details">
            <div className="hpc-tool-heading">
              <div className="hpc-tool-number">01</div>
              <div>
                <p className="hpc-tool-kicker">Design review · Columbia CUIT</p>
                <h2>HPC Sites Markup Builder</h2>
              </div>
            </div>

            <p className="hpc-tool-description">
              Compare the current HPC pages with production-minded redesign options,
              then leave element-level feedback directly on the mockups.
            </p>

            <div className="hpc-source-row">
              <div className="hpc-source-status">
                <span className={revision ? "is-live" : "is-waiting"} />
                <div>
                  <strong>{revision ? `Connected to ${revision.ref}` : "Connection pending"}</strong>
                  <small>
                    {revision && committedAt
                      ? `${revision.shortSha} · Updated ${committedAt}`
                      : "The latest source will be checked when you open the tool."}
                  </small>
                </div>
              </div>
              {/* A full navigation is intentional: the destination is proxied static HTML, not an RSC page. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/hpc/tool" className="hpc-open-tool">
                <span>Open latest build</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </article>

        <div className="hpc-dashboard-note">
          <SyncIcon />
          <p><strong>Always current.</strong> Opening the tool checks GitHub for the newest commit and locks the review to that stable snapshot.</p>
        </div>
      </section>

      <footer className="hpc-dashboard-footer">
        <span>HPC Sites Markup Builder</span>
        <span>Private preview · uzay.dev</span>
      </footer>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5.5 6v5.2c0 4.2 2.7 8 6.5 9.8 3.8-1.8 6.5-5.6 6.5-9.8V6L12 3Z" />
      <path d="m9.5 12 1.7 1.7 3.7-4" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 8a7.5 7.5 0 0 0-12.7-2L4 8" />
      <path d="M4 4v4h4M5 16a7.5 7.5 0 0 0 12.7 2L20 16" />
      <path d="M20 20v-4h-4" />
    </svg>
  );
}
