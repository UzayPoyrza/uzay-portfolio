"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { checkersReplayText, RULES_PY, ALPHA_BETA_PY, GAME_ENGINE_PY } from "@/data/checkers-replay";

type GameState = {
  board: string[][];
  turn: number;
  captured_black: number;
  captured_white: number;
  game_over: boolean;
  selected: [number, number] | null;
  valid_moves: [number, number][];
  movable_pieces: [number, number][];
  status: string;
};

// ──────────── Terminal Replay ────────────
function TerminalReplay({ onDone, active }: { onDone?: () => void; active: boolean }) {
  const [lines, setLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    if (lineIndex >= checkersReplayText.length) {
      onDone?.();
      return;
    }
    const delay = checkersReplayText[lineIndex] === "" ? 80 :
                  checkersReplayText[lineIndex].startsWith("Alpha-Beta") ? 800 :
                  checkersReplayText[lineIndex].startsWith("[W] AI") ? 600 :
                  checkersReplayText[lineIndex].includes("---") ? 40 :
                  checkersReplayText[lineIndex].startsWith("$") ? 500 :
                  120;

    const timer = setTimeout(() => {
      setLines((prev) => [...prev, checkersReplayText[lineIndex]]);
      setLineIndex((i) => i + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [lineIndex, onDone, active]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      ref={termRef}
      className="h-[360px] overflow-y-auto bg-[#0a0a0a] p-4 font-mono text-xs leading-relaxed text-green-400"
    >
      {lines.map((line, i) => (
        <div key={i} className={
          line.startsWith("[W]") ? "text-red-400" :
          line.startsWith("[B]") ? "text-green-300" :
          line.startsWith("Alpha-Beta") ? "text-yellow-400/70" :
          line.includes("captures") || line.includes("Capturing") ? "text-accent" :
          line.startsWith("$") ? "text-gray-500" :
          line.includes("won") || line.includes("wins") ? "font-bold text-accent" :
          ""
        }>
          {line || "\u00A0"}
        </div>
      ))}
      {lineIndex < checkersReplayText.length && (
        <span className="inline-block animate-pulse text-green-400">▌</span>
      )}
    </div>
  );
}

// ──────────── Live Checkers Board ────────────
function LiveBoard({ pyodide }: { pyodide: any }) {
  const [state, setState] = useState<GameState | null>(null);
  const [thinking, setThinking] = useState(false);

  const callPython = useCallback((code: string): string => {
    return pyodide.runPython(code);
  }, [pyodide]);

  useEffect(() => {
    const result = callPython("init_game()");
    setState(JSON.parse(result));
  }, [callPython]);

  const handleCellClick = useCallback(async (row: number, col: number) => {
    if (!state || state.game_over || state.turn !== 0 || thinking) return;

    if (state.selected) {
      // Check if clicking a valid move destination
      const isValidDest = state.valid_moves.some(([r, c]) => r === row && c === col);
      if (isValidDest) {
        const result = callPython(`make_move(${row}, ${col})`);
        const newState: GameState = JSON.parse(result);
        setState(newState);

        // If it's AI's turn now, let it move
        if (newState.turn === 1 && !newState.game_over) {
          setThinking(true);
          // Use setTimeout to let the UI update before the blocking Python call
          setTimeout(() => {
            const aiResult = callPython("ai_move()");
            setState(JSON.parse(aiResult));
            setThinking(false);
          }, 50);
        }
        return;
      }
    }

    // Select a piece
    const result = callPython(`select_piece(${row}, ${col})`);
    setState(JSON.parse(result));
  }, [state, thinking, callPython]);

  if (!state) return <div className="p-4 text-center text-text-muted">Initializing...</div>;

  const isMovable = (r: number, c: number) =>
    state.movable_pieces.some(([mr, mc]) => mr === r && mc === c);
  const isSelected = (r: number, c: number) =>
    state.selected?.[0] === r && state.selected?.[1] === c;
  const isValidDest = (r: number, c: number) =>
    state.valid_moves.some(([vr, vc]) => vr === r && vc === c);

  return (
    <div>
      {/* Board */}
      <div className="mx-auto w-fit">
        {/* Column labels */}
        <div className="flex">
          <div className="h-5 w-5" />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex h-5 w-8 items-end justify-center font-mono text-[10px] text-text-muted sm:w-10">
              {i}
            </div>
          ))}
        </div>
        {[...state.board].reverse().map((row, visualR) => {
          const r = 7 - visualR;
          return (
          <div key={r} className="flex">
            <div className="flex h-8 w-5 items-center justify-center font-mono text-[10px] text-text-muted sm:h-10">
              {r}
            </div>
            {row.map((cell, c) => {
              const isDark = (r + c) % 2 === 1;
              const selected = isSelected(r, c);
              const movable = isMovable(r, c) && !selected;
              const validDest = isValidDest(r, c);

              return (
                <button
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  disabled={state.game_over || thinking || state.turn !== 0}
                  className={`flex h-8 w-8 items-center justify-center text-base transition-all sm:h-10 sm:w-10 sm:text-lg ${
                    isDark
                      ? selected
                        ? "bg-accent/30 ring-1 ring-accent"
                        : validDest
                        ? "cursor-pointer bg-green-900/40 ring-1 ring-green-500/50"
                        : movable
                        ? "cursor-pointer bg-[#1a1a1a] hover:bg-accent/10"
                        : "bg-[#1a1a1a]"
                      : "bg-[#0d0d0d]"
                  }`}
                >
                  {cell !== " " && cell !== "▪" ? (
                    <span className={
                      cell === "○" || cell === "♔" ? "text-green-400" : "text-red-400"
                    }>
                      {cell}
                    </span>
                  ) : validDest ? (
                    <span className="h-2 w-2 rounded-full bg-green-500/50" />
                  ) : null}
                </button>
              );
            })}
          </div>
          );
        })}
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-xs text-text-muted">
          {thinking ? "AI thinking..." : state.status}
        </p>
        <div className="flex gap-3 font-mono text-[10px] text-text-muted">
          <span>You: {state.captured_black} captures</span>
          <span>AI: {state.captured_white} captures</span>
        </div>
      </div>

      {state.game_over && (
        <button
          onClick={() => {
            const result = callPython("init_game()");
            setState(JSON.parse(result));
          }}
          className="mt-3 border border-accent px-4 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          Play Again
        </button>
      )}
    </div>
  );
}

// ──────────── Main CheckersDemo ────────────
export default function CheckersDemo({ embedded = false }: { embedded?: boolean } = {}) {
  const [mode, setMode] = useState<"replay" | "loading" | "live">("replay");
  const [pyodide, setPyodide] = useState<any>(null);
  const [loadProgress, setLoadProgress] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const loadPyodideRuntime = async () => {
    setMode("loading");
    setLoadProgress("Downloading Python runtime (~15MB)...");

    try {
      // Load Pyodide from CDN via script tag to avoid Next.js bundling issues
      const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.5/full";

      if (!(window as any).loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `${PYODIDE_CDN}/pyodide.js`;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Pyodide script"));
          document.head.appendChild(script);
        });
      }

      setLoadProgress("Initializing Python...");
      const loadPy = (window as any).loadPyodide;
      const py = await loadPy({ indexURL: PYODIDE_CDN + "/" });

      setLoadProgress("Loading checkers game...");

      // Write Python files to Pyodide's virtual filesystem
      py.FS.writeFile("rules.py", RULES_PY);
      py.FS.writeFile("alpha_beta.py", ALPHA_BETA_PY);
      py.FS.writeFile("game_engine.py", GAME_ENGINE_PY);

      // Import the game engine
      py.runPython("from game_engine import *");

      setPyodide(py);
      setMode("live");
    } catch (err) {
      console.error("Failed to load Pyodide:", err);
      setLoadProgress("Failed to load Python runtime. Try refreshing.");
    }
  };

  return (
    <div ref={containerRef} className={embedded ? "" : "border border-border p-6 transition-colors hover:border-accent/30"}>
      {!embedded && (
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl text-text">Checkers AI</h3>
              <a href="https://github.com/UzayPoyrza/checker-RL" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-accent transition-colors hover:text-accent-hover">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            </div>
            <p className="mt-1 text-sm text-text-muted">
              Built this from scratch after my reinforcement learning class. See if you can beat my AI (alpha-beta pruning, depth 4, running Python in your browser via Pyodide)
            </p>
          </div>
          {mode === "replay" && (
            <button
              onClick={loadPyodideRuntime}
              className="shrink-0 border border-accent px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              Play Live
            </button>
          )}
          {mode === "live" && (
            <span className="shrink-0 border border-green-500/50 px-3 py-1.5 font-mono text-xs text-green-400">
              Live
            </span>
          )}
        </div>
      )}
      {embedded && (
        <div className="mb-3 flex items-center gap-2">
          {mode === "replay" && (
            <button
              onClick={loadPyodideRuntime}
              className="border border-accent px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              Play Live
            </button>
          )}
          {mode === "live" && (
            <span className="border border-green-500/50 px-3 py-1.5 font-mono text-xs text-green-400">
              Live
            </span>
          )}
        </div>
      )}

      {mode === "replay" && <TerminalReplay active={inView} />}

      {mode === "loading" && (
        <div className="flex h-[360px] flex-col items-center justify-center bg-[#0a0a0a]">
          <div className="h-6 w-6 animate-spin border-2 border-accent border-t-transparent rounded-full" />
          <p className="mt-4 font-mono text-xs text-text-muted">{loadProgress}</p>
        </div>
      )}

      {mode === "live" && pyodide && <LiveBoard pyodide={pyodide} />}
    </div>
  );
}
