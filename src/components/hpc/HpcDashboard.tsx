"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  dashboardId: string;
  hasHpcTool: boolean;
};

type DashboardTheme = "night" | "day";

const PRESETS: Record<DashboardTheme, string[]> = {
  night: [
    "#05070a",
    "#0d1117",
    "#1a1a1f",
    "#141d1a",
    "#1d1626",
    "linear-gradient(160deg, #141b2c, #232a45)",
  ],
  day: [
    "#e8ecf3",
    "#f4f1ea",
    "#e9efe9",
    "#f0e9ef",
    "#dfe6f0",
    "linear-gradient(160deg, #e8edf5, #f7f4ee)",
  ],
};

const TOOL_SEARCH_TEXT = "mockup viewer hpc redesigns original vs mockups";

function backgroundKey(theme: DashboardTheme) {
  return `hpc.bg.${theme}`;
}

export default function HpcDashboard({ dashboardId, hasHpcTool }: Props) {
  const [theme, setTheme] = useState<DashboardTheme>("night");
  const [background, setBackground] = useState("");
  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [query, setQuery] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [locking, setLocking] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const preferenceFrame = window.requestAnimationFrame(() => {
      const savedTheme = localStorage.getItem("hpc.theme") === "day" ? "day" : "night";
      setTheme(savedTheme);
      setBackground(localStorage.getItem(backgroundKey(savedTheme)) || "");
    });

    function tick() {
      setNow(new Date());
    }

    tick();
    const timer = window.setInterval(tick, 10_000);
    return () => {
      window.cancelAnimationFrame(preferenceFrame);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!backgroundOpen) return;

    function closeBackground(event: PointerEvent) {
      if (!backgroundRef.current?.contains(event.target as Node)) {
        setBackgroundOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeBackground);
    return () => document.removeEventListener("pointerdown", closeBackground);
  }, [backgroundOpen]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.key === "/" && document.activeElement !== searchRef.current) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setBackgroundOpen(false);
        if (document.activeElement === searchRef.current) {
          setQuery("");
          searchRef.current?.blur();
        }
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function selectTheme(nextTheme: DashboardTheme) {
    setTheme(nextTheme);
    localStorage.setItem("hpc.theme", nextTheme);
    setBackground(localStorage.getItem(backgroundKey(nextTheme)) || "");
  }

  function selectBackground(value: string) {
    setBackground(value);
    if (value) localStorage.setItem(backgroundKey(theme), value);
    else localStorage.removeItem(backgroundKey(theme));
  }

  function setImageBackground(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = imageUrl.trim();
    if (!value) return;
    selectBackground(`img:${value}`);
    setBackgroundOpen(false);
  }

  function googleSearch() {
    const value = query.trim();
    if (!value) return;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(value)}`,
      "_blank",
      "noopener",
    );
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim().toLowerCase();
    if (!value) return;

    if (hasHpcTool && TOOL_SEARCH_TEXT.includes(value)) {
      window.open("/hpc/tool", "_blank", "noopener");
    } else {
      googleSearch();
    }
  }

  async function lockDashboard() {
    if (locking) return;
    setLocking(true);
    try {
      await fetch("/api/dashboard/auth", { method: "DELETE" });
    } finally {
      window.location.replace("/enter");
    }
  }

  const toolVisible =
    hasHpcTool && TOOL_SEARCH_TEXT.includes(query.trim().toLowerCase());
  const isImageBackground = background.startsWith("img:");
  const dashboardStyle: CSSProperties = isImageBackground
    ? {
        backgroundColor: "var(--hpc-bg)",
        backgroundImage: `url(${JSON.stringify(background.slice(4))})`,
      }
    : background.startsWith("linear-gradient")
      ? { backgroundImage: background }
      : background
        ? { backgroundColor: background }
        : {};

  return (
    <main
      className={`hpc-dashboard-shell${isImageBackground ? " has-image" : ""}`}
      data-dashboard-id={dashboardId}
      data-hpc-theme={theme}
      style={dashboardStyle}
    >
      <div className="hpc-original-page">
        <header className="hpc-original-topbar">
          <form className="hpc-original-search" onSubmit={submitSearch}>
            <input
              ref={searchRef}
              aria-label="Search tools"
              autoComplete="off"
              autoFocus
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search…"
              value={query}
            />
            <button type="button" onClick={googleSearch} aria-label="Search Google">
              G
            </button>
          </form>

          <div className="hpc-original-controls">
            <button
              className="hpc-original-icon-button"
              type="button"
              title="Toggle day / night"
              aria-label="Toggle day or night theme"
              onClick={() => selectTheme(theme === "day" ? "night" : "day")}
            >
              {theme === "night" ? <SunIcon /> : <MoonIcon />}
            </button>

            <div className="hpc-original-background-wrap" ref={backgroundRef}>
              <button
                className="hpc-original-icon-button"
                type="button"
                title="Background"
                aria-label="Customize background"
                aria-haspopup="true"
                aria-expanded={backgroundOpen}
                onClick={() => setBackgroundOpen((open) => !open)}
              >
                <ImageIcon />
              </button>

              {backgroundOpen && (
                <div className="hpc-original-popover">
                  <p className="hpc-original-pop-label">Background</p>
                  <div className="hpc-original-swatches">
                    {PRESETS[theme].map((preset) => (
                      <button
                        type="button"
                        aria-label={`Use ${preset} background`}
                        className={background === preset ? "is-active" : ""}
                        key={preset}
                        onClick={() => selectBackground(preset)}
                        style={{ background: preset }}
                      />
                    ))}
                  </div>

                  <form className="hpc-original-image-row" onSubmit={setImageBackground}>
                    <input
                      aria-label="Background image URL"
                      onChange={(event) => setImageUrl(event.target.value)}
                      placeholder="image URL…"
                      value={imageUrl}
                    />
                    <button type="submit">Set</button>
                  </form>

                  <button
                    className="hpc-original-reset"
                    type="button"
                    onClick={() => {
                      selectBackground("");
                      setImageUrl("");
                    }}
                  >
                    Reset to default
                  </button>
                </div>
              )}
            </div>

            <button
              className="hpc-original-icon-button"
              type="button"
              title="Reload"
              aria-label="Reload dashboard"
              onClick={() => window.location.reload()}
            >
              <ReloadIcon />
            </button>

            <button
              className="hpc-original-icon-button"
              type="button"
              title="Lock"
              aria-label="Lock dashboard"
              disabled={locking}
              onClick={lockDashboard}
            >
              <LockIcon />
            </button>
          </div>

          <div className="hpc-original-clock" aria-live="off">
            <div className="hpc-original-clock-time">
              {now?.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              }) || ""}
            </div>
            <div className="hpc-original-clock-date">
              {now?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              }) || ""}
            </div>
          </div>
        </header>

        <h1 className="hpc-original-welcome">
          Welcome {hasHpcTool ? "Max" : "back"}
        </h1>

        <div className="hpc-original-columns">
          <section aria-labelledby="tools-heading">
            <h2 id="tools-heading">tools</h2>
            <div className="hpc-original-tiles">
              {toolVisible && (
                // Full navigation is intentional: the destination is proxied static HTML.
                <a
                  className="hpc-original-tile"
                  href="/hpc/tool"
                  target="_blank"
                  rel="noopener"
                >
                  <span className="hpc-original-app" aria-hidden="true">
                    <MockupViewerIcon />
                  </span>
                  <span>
                    <strong>Mockup Viewer</strong>
                    <small>HPC redesigns · original vs mockups</small>
                  </span>
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M4.8 19.2l1.7-1.7M17.5 6.5l1.7-1.7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
      <circle cx="9" cy="9.5" r="1.6" />
      <path d="m3.5 16.5 4.5-4 3.5 3 3.5-3.5 5.5 5" />
    </svg>
  );
}

function ReloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.9-6.2" />
      <path d="M20 3.5V8h-4.5" />
    </svg>
  );
}

function MockupViewerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M8 20h8M12 16.5V20" />
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
