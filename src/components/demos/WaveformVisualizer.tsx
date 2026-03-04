"use client";

import { useRef, useEffect } from "react";

interface WaveformVisualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

export default function WaveformVisualizer({
  analyser,
  isPlaying,
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (analyser && isPlaying) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        ctx.lineWidth = 2;
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#c45d3e";
        ctx.beginPath();

        const sliceWidth = w / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * h) / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.lineTo(w, h / 2);
        ctx.stroke();
      } else {
        // Idle state — flat line with subtle pulse
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border").trim() || "#2a2a2a";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="h-24 w-full"
      style={{ imageRendering: "auto" }}
    />
  );
}
