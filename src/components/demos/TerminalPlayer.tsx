"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    let player: any;

    import("asciinema-player").then((AsciinemaPlayer) => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
      try {
        player = AsciinemaPlayer.create(src, containerRef.current, {
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
      player?.dispose();
    };
  }, [src]);

  return <div ref={containerRef} className="terminal-player" />;
}
