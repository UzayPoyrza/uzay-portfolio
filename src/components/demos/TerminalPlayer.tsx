"use client";

import { useEffect, useRef, useState } from "react";
import "asciinema-player/dist/bundle/asciinema-player.css";

interface TerminalPlayerProps {
  src: string;
  cols?: number;
  rows?: number;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  idleTimeLimit?: number;
  fit?: string;
  onError?: () => void;
}

export default function TerminalPlayer({ src, onError, ...options }: TerminalPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    import("asciinema-player").then((AsciinemaPlayer) => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
      try {
        playerRef.current = AsciinemaPlayer.create(src, containerRef.current, {
          autoPlay: true,
          loop: true,
          speed: 1.5,
          idleTimeLimit: 2,
          fit: "width",
          terminalFontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
          ...options,
        });
      } catch {
        onError?.();
      }
    }).catch(() => {
      onError?.();
    });

    return () => {
      playerRef.current?.dispose();
    };
  }, [src]);

  const restart = () => {
    playerRef.current?.seek(0);
    playerRef.current?.play();
  };

  return (
    <div className="relative group">
      <div ref={containerRef} className="terminal-player" />
      <button
        onClick={restart}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-md border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-white/60 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white/90"
        aria-label="Start from beginning"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        restart
      </button>
    </div>
  );
}
