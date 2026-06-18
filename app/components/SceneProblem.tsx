"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function StatCard({
  stat,
  delay,
}: {
  stat: { number: string; label: string; source?: string };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      className="border border-[#C9A84C]/20 rounded-sm p-8 md:p-10 bg-[#0c1020]/60 backdrop-blur-sm"
    >
      <div className="text-[#C9A84C] display-font text-5xl md:text-6xl font-light mb-4 stat-number">
        {stat.number}
      </div>
      <p className="text-[#c8c0b0] font-sans text-sm md:text-base leading-relaxed font-light">
        {stat.label}
      </p>
      {stat.source && (
        <p className="text-[#6b6560] font-sans text-xs mt-3 tracking-wide">
          {stat.source}
        </p>
      )}
    </motion.div>
  );
}

const stats = [
  {
    number: "7–8×",
    label:
      "The median white family holds 7 to 8 times the wealth of the median Black family.",
    source: "Federal Reserve, Survey of Consumer Finances",
  },
  {
    number: "2×",
    label:
      "White Americans own businesses at twice the rate of Black and Hispanic Americans — despite similar entrepreneurial ambition.",
    source: "Stanford Social Innovation Review",
  },
  {
    number: "$84T",
    label:
      "Over $84 trillion in wealth will transfer between generations by 2045. Most of it stays in families that already have it.",
    source: "Cerulli Associates, 2022",
  },
];

export default function SceneProblem() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen bg-[#080d1a] flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div ref={headlineRef}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#f0ece4] leading-tight tracking-wide mb-4"
          >
            The system wasn&apos;t built
            <br />
            <em className="not-italic text-[#C9A84C]">for everyone.</em>
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={headlineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="block h-px w-24 bg-[#C9A84C]/50 mb-16 origin-left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
