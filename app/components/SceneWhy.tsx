"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SceneWhy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-2xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="display-font text-3xl md:text-5xl font-light text-[#f0ece4] leading-tight tracking-wide italic"
        >
          &ldquo;A good man leaves an inheritance to his children&rsquo;s children.&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <span className="gold-line mx-auto" />
          <span className="text-[#C9A84C] font-sans text-sm tracking-[0.2em] uppercase">
            Proverbs 13:22
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 text-[#8a8278] font-sans text-base md:text-lg leading-relaxed font-light"
        >
          That verse is not just a quote.
          <br />
          <span className="text-[#c8c0b0]">It is the reason this firm exists.</span>
        </motion.p>
      </div>
    </section>
  );
}
