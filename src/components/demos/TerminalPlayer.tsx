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
  const [started, setStarted] = useState(false);

  useEffect(() => {
    import("asciinema-player").then((AsciinemaPlayer) => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
      try {
        playerRef.current = AsciinemaPlayer.create(src, containerRef.current, {
          autoPlay: false,
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

  const handlePlay = () => {
    playerRef.current?.play();
    setStarted(true);
  };

  return (
    <div className="relative">
      <div ref={containerRef} className="terminal-player" />
      {!started && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/10"
          aria-label="Play recording"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
