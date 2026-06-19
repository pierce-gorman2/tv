"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sequence = [
  { id: 1, delay: 500 },
  { id: 2, delay: 2200 },
  { id: 3, delay: 3800 },
  { id: 4, delay: 5600 },
  { id: 5, delay: 7200 },
];

export default function SceneOpening() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = sequence.map(({ id, delay }) =>
      setTimeout(() => setPhase(id), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-6">
      <div className="max-w-3xl mx-auto w-full space-y-8">

        <AnimatePresence>
          {phase >= 1 && (
            <motion.div key="p1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <p className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#f0ece4] leading-tight tracking-wide">
                You have been dreaming
                <br />
                about building something.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.p key="p2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="display-font text-2xl md:text-3xl font-light text-[#6b6560] italic tracking-wide"
            >
              Not a side project. A real business.
              <br />
              A name. Something that lasts.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div key="p3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-1 pl-4 border-l border-[#C9A84C]/20"
            >
              <p className="font-sans text-base md:text-lg text-[#4a4540]">The capital wasn&apos;t there.</p>
              <p className="font-sans text-base md:text-lg text-[#4a4540]">The network wasn&apos;t there.</p>
              <p className="font-sans text-base md:text-lg text-[#4a4540]">The path from vision to something real — wasn&apos;t clear.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 4 && (
            <motion.p key="p4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-sans text-lg md:text-xl text-[#8a8278]"
            >
              Most men stop there.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 5 && (
            <motion.div key="p5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="space-y-5"
            >
              <p className="display-font text-3xl md:text-4xl font-light text-[#C9A84C] tracking-wide">
                We exist for the ones who don&apos;t.
              </p>
              <div className="flex flex-col gap-2">
                <span className="display-font text-base md:text-lg font-medium tracking-[0.3em] text-[#f0ece4] uppercase">
                  Traditio Ventures
                </span>
                <span className="gold-line" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase >= 5 && (
          <motion.div key="scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3 L10 17 M4 11 L10 17 L16 11" stroke="#C9A84C" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
