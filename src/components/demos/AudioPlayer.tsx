"use client";

import { useState, useRef, useCallback } from "react";
import WaveformVisualizer from "./WaveformVisualizer";

interface AudioPlayerProps {
  src?: string;
  title: string;
  description: string;
  borderless?: boolean;
}

export default function AudioPlayer({
  src,
  title,
  description,
  borderless = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!src || contextRef.current) return;
    const ctx = new AudioContext();
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 2048;

    const audio = new Audio(src);
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyserNode);
    analyserNode.connect(ctx.destination);

    audioRef.current = audio;
    contextRef.current = ctx;
    setAnalyser(analyserNode);

    audio.addEventListener("ended", () => setIsPlaying(false));
  }, [src]);

  const toggle = () => {
    if (!src) return;
    initAudio();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const hasAudio = !!src;

  return (
    <div className={borderless ? "" : "border border-border p-6 transition-colors hover:border-accent/30"}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          {title && <h4 className="font-serif text-xl">{title}</h4>}
          <p className={`text-sm text-text-muted${title ? " mt-1" : ""}`}>{description}</p>
        </div>
        {hasAudio ? (
          <button
            onClick={toggle}
            className="shrink-0 border border-accent px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            {isPlaying ? "pause" : "click to play demo"}
          </button>
        ) : (
          <span className="shrink-0 border border-border px-3 py-1.5 text-xs text-text-muted">
            Coming Soon
          </span>
        )}
      </div>
      <WaveformVisualizer analyser={analyser} isPlaying={isPlaying} />
    </div>
  );
}
