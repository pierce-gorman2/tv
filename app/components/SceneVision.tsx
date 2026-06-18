"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  { text: "We are building a firm", large: true },
  { text: "that will outlast us.", large: true, gold: true },
];

const subText =
  "A future where what you build is determined by your character and your work — not the family you were born into.";

export default function SceneVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.5 }}
            className={`display-font font-light leading-tight tracking-wide ${
              line.large ? "text-4xl md:text-6xl lg:text-7xl" : "text-2xl"
            } ${line.gold ? "text-[#C9A84C]" : "text-[#f0ece4]"}`}
          >
            {line.text}
          </motion.p>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 1.4, ease: "easeOut" }}
          className="mt-12 font-sans text-base md:text-lg text-[#6b6560] leading-relaxed font-light max-w-xl mx-auto"
        >
          {subText}
        </motion.p>
      </div>
    </section>
  );
}
