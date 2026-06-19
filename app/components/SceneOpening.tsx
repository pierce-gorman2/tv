"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
  { id: 1, delay: 600 },
  { id: 2, delay: 2800 },
  { id: 3, delay: 4800 },
  { id: 4, delay: 6400 },
  { id: 5, delay: 8000 },
];

export default function SceneOpening() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = phases.map(({ id, delay }) =>
      setTimeout(() => setPhase(id), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-6">
      <div className="text-center max-w-3xl mx-auto space-y-8">

        {/* Line 1 — the question */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.p
              key="q"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#f0ece4] leading-tight tracking-wide"
            >
              What have you been
              <br />
              <em className="not-italic text-[#C9A84C]">dreaming to build?</em>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Line 2 — the affirmation */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.p
              key="affirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="display-font text-xl md:text-2xl font-light text-[#6b6560] italic tracking-wide"
            >
              The idea is real. It always was.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Line 3 — the gap */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              key="gap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-2"
            >
              <p className="font-sans text-base md:text-lg text-[#4a4540] leading-relaxed tracking-wide">
                The capital wasn&apos;t there.
              </p>
              <p className="font-sans text-base md:text-lg text-[#4a4540] leading-relaxed tracking-wide">
                The network wasn&apos;t there.
              </p>
              <p className="font-sans text-base md:text-lg text-[#4a4540] leading-relaxed tracking-wide">
                The path from vision to something real — wasn&apos;t there.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Line 4 — the pivot */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.p
              key="pivot"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="display-font text-2xl md:text-3xl font-light text-[#f0ece4] tracking-wide"
            >
              We&apos;re the bridge across that gap.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Wordmark */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.div
              key="wordmark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="pt-6 flex flex-col items-center gap-3"
            >
              <span className="display-font text-lg md:text-xl font-medium tracking-[0.35em] text-[#f0ece4] uppercase">
                Traditio Ventures
              </span>
              <span className="gold-line" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            key="scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 scroll-indicator"
          >
            <span className="text-[#C9A84C]/60 text-[10px] tracking-[0.25em] uppercase font-sans">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                <rect x="5.5" y="0" width="3" height="7" rx="1.5" fill="#C9A84C" opacity="0.5" />
                <path d="M7 12 L3 16 L7 20 L11 16 Z" fill="#C9A84C" opacity="0.2" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
