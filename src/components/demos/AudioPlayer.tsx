"use client";

import { useState, useRef, useCallback } from "react";
import WaveformVisualizer from "./WaveformVisualizer";

interface AudioPlayerProps {
  src?: string;
  title: string;
  description: string;
}

export default function AudioPlayer({
  src,
  title,
  description,
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
    <div className="border border-border p-6 transition-colors hover:border-accent/30">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="font-serif text-xl">{title}</h4>
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        </div>
        {hasAudio ? (
          <button
            onClick={toggle}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="3" height="12" />
                <rect x="9" y="1" width="3" height="12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <polygon points="2,1 12,7 2,13" />
              </svg>
            )}
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
