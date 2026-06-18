"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Invest",
    body: "We find operators with potential and acquire majority equity alongside them.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M10 20 L16 12 L22 17 L28 10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build",
    body: "We work with them — not above them — to grow something real.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="14" width="8" height="14" stroke="#C9A84C" strokeWidth="1.5" rx="1" />
        <rect x="14" y="8" width="8" height="20" stroke="#C9A84C" strokeWidth="1.5" rx="1" />
        <rect x="24" y="4" width="4" height="24" stroke="#C9A84C" strokeWidth="1.5" rx="1" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Hand Over",
    body: "We provide a structured path for them to buy back full ownership of what they built.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 20 C6 20 10 14 16 14 C22 14 26 20 26 20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 15 L26 20 L20 25" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="10" r="4" stroke="#C9A84C" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function SceneModel() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const taglineRef = useRef<HTMLDivElement>(null);
  const taglineInView = useInView(taglineRef, { once: true, margin: "-60px" });

  return (
    <section className="relative min-h-screen bg-[#080d1a] flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div ref={headRef}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="display-font text-4xl md:text-6xl font-light text-[#f0ece4] mb-16 tracking-wide"
          >
            The Model
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {phases.map((phase, i) => (
            <PhaseCard key={i} phase={phase} delay={i * 0.2} />
          ))}
        </div>

        <div ref={taglineRef} className="mt-16 md:mt-20">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={taglineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block h-px w-16 bg-[#C9A84C]/50 mb-6 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={taglineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="display-font text-xl md:text-2xl text-[#8a8278] font-light italic"
          >
            The inverse of everything private equity was designed to be.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({
  phase,
  delay,
}: {
  phase: (typeof phases)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      className="flex flex-col gap-5 p-8 border border-white/5 rounded-sm bg-white/[0.02]"
    >
      <div className="flex items-start justify-between">
        {phase.icon}
        <span className="text-[#C9A84C]/40 font-sans text-xs tracking-[0.3em]">
          {phase.number}
        </span>
      </div>
      <div>
        <h3 className="display-font text-2xl md:text-3xl font-light text-[#f0ece4] mb-3 tracking-wide">
          {phase.title}
        </h3>
        <p className="font-sans text-sm text-[#8a8278] leading-relaxed font-light">
          {phase.body}
        </p>
      </div>
    </motion.div>
  );
}
