"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { HpcRevision } from "@/lib/hpc/github";

type Props = {
  dashboardId: string;
  hasHpcTool: boolean;
  revision: HpcRevision | null;
  syncUnavailable: boolean;
};

export default function HpcDashboard({
  dashboardId,
  hasHpcTool,
  revision,
  syncUnavailable,
}: Props) {
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  async function logOut() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/dashboard/auth", { method: "DELETE" });
    } finally {
      window.location.replace("/enter");
    }
  }

  return (
    <main className="hpc-dashboard-shell" data-dashboard-id={dashboardId}>
      <header className="hpc-dashboard-header">
        <div className="hpc-dashboard-header-inner">
          <Link href="/" className="hpc-back-link">
            <ArrowLeftIcon /> uzay.dev
          </Link>
          <button
            type="button"
            onClick={logOut}
            className="hpc-lock-button"
            disabled={loggingOut}
          >
            <LockIcon /> {loggingOut ? "Locking…" : "Lock"}
          </button>
        </div>
      </header>

      <section className="hpc-dashboard-content" aria-labelledby="workspace-title">
        <div className="hpc-dashboard-intro">
          <p className="hpc-dashboard-label">Private workspace</p>
          <h1 id="workspace-title">Welcome.</h1>
          <p>Your tools are ready.</p>
        </div>

        <div className="hpc-tools-heading">
          <h2>Tools</h2>
        </div>

        {hasHpcTool ? <div className="hpc-tools-grid">
          <article className="hpc-tool-tile">
            {/* Full navigation is intentional: the destination is proxied static HTML. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/hpc/tool"
              className="hpc-tool-hit-area"
              aria-label="Open HPC Sites Markup Builder"
            />

            <div className="hpc-tool-main" aria-hidden="true">
              <span className="hpc-tool-icon"><LayoutIcon /></span>
              <span className="hpc-tool-copy">
                <strong>HPC Sites Markup Builder</strong>
                <small>Columbia Sites mockup review</small>
              </span>
              <ArrowIcon />
            </div>

            <div className="hpc-tool-menu-wrap" ref={menuRef}>
              <button
                type="button"
                className="hpc-tool-menu-button"
                aria-label="HPC Sites Markup Builder options"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <MoreIcon />
              </button>

              {menuOpen && (
                <div className="hpc-tool-menu" role="menu">
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a href="/hpc/tool" role="menuitem">
                    <ExternalIcon /> Open tool
                  </a>
                  <div className="hpc-menu-status">
                    <span className={revision ? "is-live" : "is-waiting"} />
                    <div>
                      <strong>{revision ? `Synced to ${revision.ref}` : "Sync on open"}</strong>
                      {revision && <small>{revision.shortSha}</small>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div> : (
          <p className="hpc-sync-note" role="status">
            No tools are assigned to this workspace yet.
          </p>
        )}

        {syncUnavailable && (
          <p className="hpc-sync-note" role="status">
            Source status is temporarily unavailable. Opening the tool will retry.
          </p>
        )}
      </section>
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

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M10 7l-5 5 5 5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      <rect x="5.5" y="10" width="13" height="10" rx="2" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M9 9v11" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8" />
      <path d="M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
