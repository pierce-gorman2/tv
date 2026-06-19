"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function SceneWhy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Massive parallax background scripture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="display-font font-light italic text-center leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(60px, 12vw, 160px)",
            color: "rgba(201,168,76,0.04)",
            letterSpacing: "-0.02em",
          }}
        >
          children&apos;s children
        </p>
      </motion.div>

      {/* Foreground content */}
      <div ref={textRef} className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-sans text-xs text-[#4a4540] tracking-[0.3em] uppercase mb-10"
        >
          The conviction behind this firm
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="display-font text-3xl md:text-5xl lg:text-6xl font-light text-[#f0ece4] leading-tight tracking-wide italic"
        >
          &ldquo;A good man leaves an inheritance
          <br />
          to his children&apos;s children.&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 mt-7 mb-10 origin-center"
        >
          <span className="gold-line mx-auto" />
          <span className="text-[#C9A84C] font-sans text-xs tracking-[0.3em] uppercase">
            Proverbs 13:22
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="space-y-4"
        >
          <p className="font-sans text-base md:text-lg text-[#6b6560] leading-relaxed font-light">
            That verse is not just a quote.
          </p>
          <p className="display-font text-xl md:text-2xl text-[#c8c0b0] font-light italic">
            It is the reason this firm exists.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-14 font-sans text-xs text-[#3a3530] tracking-[0.2em] uppercase"
        >
          So we built something to make it possible. ↓
        </motion.p>
      </div>
    </section>
  );
}
