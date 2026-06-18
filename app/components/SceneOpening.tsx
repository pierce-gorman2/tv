"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SceneOpening() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timings = [800, 2800, 4600, 6200];
    const timers = timings.map((t, i) =>
      setTimeout(() => setPhase(i + 1), t)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-6">
      <div className="text-center max-w-3xl mx-auto">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.p
              key="line1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="display-font text-3xl md:text-5xl lg:text-6xl font-light text-[#f0ece4] tracking-wide leading-tight"
            >
              Most people will never own anything.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.p
              key="line2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="display-font text-3xl md:text-5xl lg:text-6xl font-light text-[#C9A84C] mt-6 tracking-wide leading-tight"
            >
              {"We’re here to change that."}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              key="wordmark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <span className="display-font text-xl md:text-2xl font-medium tracking-[0.3em] text-[#f0ece4] uppercase">
                Traditio Ventures
              </span>
              <span className="gold-line" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            key="scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 scroll-indicator"
          >
            <span className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-sans">Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="6" y="0" width="4" height="8" rx="2" fill="#C9A84C" opacity="0.6" />
              <rect x="7" y="12" width="2" height="8" rx="1" fill="#C9A84C" opacity="0.3" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
