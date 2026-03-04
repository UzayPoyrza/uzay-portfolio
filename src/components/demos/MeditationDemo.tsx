"use client";

import { motion } from "framer-motion";
import AudioPlayer from "./AudioPlayer";

const icons = {
  code: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  pen: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  audio: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  sliders: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
};

const pipelineSteps = [
  { label: "custom XML", icon: icons.code },
  { label: "AI script writing", icon: icons.pen },
  { label: "ElevenLabs + FFmpeg", icon: icons.audio },
  { label: "auto mix & master", icon: icons.sliders },
];

export default function MeditationDemo() {
  return (
    <div className="border border-border p-6 transition-colors hover:border-accent/30">
      <div className="flex items-center gap-2">
        <h3 className="font-serif text-xl text-text">Fully Automated Guided Meditation Generator</h3>
        <a href="https://github.com/UzayPoyrza/guided-meditation-generator" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-accent transition-colors hover:text-accent-hover">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </div>
      <p className="mt-1 text-sm text-text-muted">
        Created a custom XML markup language to handle timed breathing cues, real pauses, audio layering, and other things no existing format supported. Prompt engineered until the AI wrote full meditation scripts in that format. The XML gets parsed and combined with ElevenLabs for voice synthesis and FFmpeg for audio processing. AI picks background music from a curated database. Collaborated with a mix master engineer to automate the final mix and master stage.
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

      {/* Audio player - borderless, no duplicate title */}
      <div className="mt-4 border-t border-border/50 pt-4">
        <AudioPlayer
          src="/audio/meditation.mp3"
          title=""
          description=""
          borderless
        />
      </div>
    </div>
  );
}
