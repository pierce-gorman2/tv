"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Invest",
    body: "We provide capital for growth alongside operators who are ready to build something real.",
    detail: "We're not a bank and we're not a typical fund. We come in alongside you — our capital, your operation. We look for builders who know their craft and need a partner who knows how to structure for longevity, not just a quick return.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M10 20 L14 14 L18 17 L24 10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build",
    body: "We work with them — not above them — to grow something real.",
    detail: "We don't install our own people and walk away. We sit at the table with you. Operational decisions, financial discipline, team structure — we're in it. The goal is to build something that doesn't collapse when you step back.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="16" width="7" height="12" stroke="#C9A84C" strokeWidth="1.5" rx="1" />
        <rect x="13" y="9" width="7" height="19" stroke="#C9A84C" strokeWidth="1.5" rx="1" />
        <rect x="22" y="4" width="6" height="24" stroke="#C9A84C" strokeWidth="1.5" rx="1" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Hand Over",
    body: "We provide a structured path for operators to buy back full ownership of what they built.",
    detail: "This is the part private equity never talks about. From day one, we structure for the handover. The operator earns back full ownership through performance — not charity, not luck. What they built, they own. That's the whole point.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M6 20 C8 14 12 11 16 11 C20 11 24 14 26 20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 15 L26 20 L20 25" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="7" r="4" stroke="#C9A84C" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function SceneModel() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            className="display-font text-4xl md:text-6xl font-light text-[#f0ece4] mb-3 tracking-wide"
          >
            The Model
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-xs text-[#4a4540] tracking-[0.2em] uppercase mb-14"
          >
            Click any phase to go deeper
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {phases.map((phase, i) => (
            <PhaseCard
              key={i}
              phase={phase}
              delay={i * 0.15}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div ref={taglineRef} className="mt-16">
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
  isOpen,
  onToggle,
}: {
  phase: (typeof phases)[0];
  delay: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: "easeOut", delay }}
      onClick={onToggle}
      className="flex flex-col gap-4 p-7 border rounded-sm cursor-pointer select-none transition-colors duration-300 group"
      style={{
        borderColor: isOpen ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.06)",
        background: isOpen ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.01)",
      }}
    >
      <div className="flex items-start justify-between">
        {phase.icon}
        <div className="flex items-center gap-2">
          <span className="text-[#C9A84C]/40 font-sans text-xs tracking-[0.3em]">
            {phase.number}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#C9A84C]/50 text-lg leading-none"
          >
            +
          </motion.span>
        </div>
      </div>

      <div>
        <h3 className="display-font text-2xl md:text-3xl font-light text-[#f0ece4] mb-2 tracking-wide group-hover:text-[#C9A84C] transition-colors duration-300">
          {phase.title}
        </h3>
        <p className="font-sans text-sm text-[#8a8278] leading-relaxed font-light">
          {phase.body}
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <p className="font-sans text-sm text-[#a09890] leading-relaxed font-light">
                {phase.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
