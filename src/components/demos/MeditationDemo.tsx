"use client";

import { motion } from "framer-motion";
import AudioPlayer from "./AudioPlayer";

const pipelineSteps = [
  { label: "prompt engineering", icon: "⌘" },
  { label: "elevenlabs API", icon: "🔊" },
  { label: "guided meditation", icon: "🎧" },
];

export default function MeditationDemo() {
  return (
    <div className="border border-border p-6 transition-colors hover:border-accent/30">
      <h3 className="font-serif text-xl text-text">Meditation Audio Player</h3>
      <p className="mt-1 text-sm text-text-muted">
        3-stage automation pipeline: prompt → voice synthesis → guided audio
      </p>

      {/* Pipeline visualization */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2">
        {pipelineSteps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex items-center gap-1.5 whitespace-nowrap border border-accent/20 bg-accent/5 px-3 py-1.5 font-mono text-xs text-accent"
            >
              <span>{step.icon}</span>
              {step.label}
            </motion.div>
            {i < pipelineSteps.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="font-mono text-accent/50"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Audio player - borderless since we're already in a card */}
      <div className="mt-4 border-t border-border/50 pt-4">
        <AudioPlayer
          title="AI Guided Meditation"
          description="Generated via prompt engineering + ElevenLabs voice synthesis. Audio coming soon."
          borderless
        />
      </div>
    </div>
  );
}
