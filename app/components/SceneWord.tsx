"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const letters = "TRADITIO".split("");

export default function SceneWord() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen bg-[#06080f] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Faint large letterform in background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="display-font font-light text-[#C9A84C]"
          style={{ fontSize: "clamp(120px, 28vw, 380px)", opacity: 0.025, letterSpacing: "0.1em" }}
        >
          T
        </span>
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Staggered letter drop */}
        <div className="flex justify-center flex-wrap gap-0 mb-2 overflow-hidden">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: -60, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="display-font font-light text-[#f0ece4]"
              style={{
                fontSize: "clamp(52px, 12vw, 120px)",
                letterSpacing: "0.12em",
                lineHeight: 1,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
          className="h-px bg-[#C9A84C] mx-auto mb-10 origin-left"
          style={{ width: "clamp(120px, 30vw, 320px)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="font-sans text-xs text-[#C9A84C]/60 tracking-[0.3em] uppercase mb-6"
        >
          Latin · Noun
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-[#8a8278] leading-relaxed font-light max-w-xl mx-auto"
        >
          The act of passing down. Of handing over what you built
          <br />
          to the person who comes next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="mt-12 space-y-2"
        >
          <p className="display-font text-2xl md:text-3xl text-[#C9A84C] font-light italic">
            That is not just our name.
          </p>
          <p className="display-font text-2xl md:text-3xl text-[#f0ece4] font-light italic">
            It is our model.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
