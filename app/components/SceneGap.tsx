"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const gaps = [
  {
    id: "capital",
    fear: "I don't have the money.",
    stat: "82% of small business failures cite cash flow as the cause.",
    source: "U.S. Bank Study",
    bridge: "We provide capital for growth — not as a lender who wants it back with interest, but as a partner who wins when you win.",
    bridgeLabel: "Capital",
  },
  {
    id: "network",
    fear: "I don't know the right people.",
    stat: "85% of positions are filled through networking. Business is no different.",
    source: "LinkedIn, 2022",
    bridge: "We open doors. Our network becomes your network — operators, advisors, buyers, partners who don't take cold calls but will take ours.",
    bridgeLabel: "Network",
  },
  {
    id: "knowledge",
    fear: "I know my craft. I don't know business.",
    stat: "Only 40% of small business owners say they feel prepared to run a business before starting.",
    source: "SCORE, 2023",
    bridge: "We've built before. Financial structure, operations, hiring, scaling — we sit at the table with you and work through it. Not a course. A partner.",
    bridgeLabel: "Knowledge",
  },
  {
    id: "path",
    fear: "I don't know how to make it last.",
    stat: "70% of family businesses don't survive to the second generation — usually due to lack of planning.",
    source: "Family Business Institute",
    bridge: "We plan for the handover from day one. The whole model is built around making sure what you build outlasts you.",
    bridgeLabel: "Longevity",
  },
];

export default function SceneGap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div ref={headRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs text-[#4a4540] tracking-[0.3em] uppercase mb-5"
          >
            The gap
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
            className="display-font text-4xl md:text-6xl font-light text-[#f0ece4] leading-tight tracking-wide mb-4"
          >
            Between wanting to build
            <br />
            <em className="not-italic text-[#C9A84C]">and actually building.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-xs text-[#4a4540] tracking-[0.2em] uppercase mb-14"
          >
            Click the fear you recognize.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gaps.map((gap, i) => (
            <GapCard
              key={gap.id}
              gap={gap}
              delay={i * 0.1}
              isActive={activeId === gap.id}
              onToggle={() => setActiveId(activeId === gap.id ? null : gap.id)}
            />
          ))}
        </div>

        <AnimatePresence>
          {activeId && (
            <motion.div
              key="bridge-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 p-8 border border-[#C9A84C]/25 bg-[#C9A84C]/03 rounded-sm"
              style={{ background: "rgba(201,168,76,0.03)" }}
            >
              <p className="font-sans text-[10px] text-[#C9A84C]/60 tracking-[0.3em] uppercase mb-3">
                How Traditio bridges this
              </p>
              <p className="display-font text-xl md:text-2xl font-light text-[#f0ece4] leading-snug">
                {gaps.find(g => g.id === activeId)?.bridge}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 max-w-xl"
        >
          <span className="gold-line mb-6" />
          <p className="display-font text-2xl md:text-3xl font-light text-[#8a8278] italic leading-snug">
            Every single one of these gaps — we were built to close.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function GapCard({
  gap,
  delay,
  isActive,
  onToggle,
}: {
  gap: typeof gaps[0];
  delay: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      onClick={onToggle}
      className="group p-7 border rounded-sm cursor-pointer transition-all duration-400 select-none"
      style={{
        borderColor: isActive ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.06)",
        background: isActive ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.01)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className="font-sans text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
          style={{ color: isActive ? "#C9A84C" : "#4a4540" }}
        >
          {gap.bridgeLabel}
        </span>
        <motion.span
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#C9A84C]/40 text-xl leading-none"
        >
          +
        </motion.span>
      </div>

      <p
        className="display-font text-xl md:text-2xl font-light leading-snug mb-4 transition-colors duration-300"
        style={{ color: isActive ? "#f0ece4" : "#8a8278" }}
      >
        &ldquo;{gap.fear}&rdquo;
      </p>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-[#C9A84C]/10 mt-1">
              <p className="font-sans text-sm text-[#6b6560] leading-relaxed italic mb-2">
                {gap.stat}
              </p>
              <p className="font-sans text-[10px] text-[#3a3530]">{gap.source}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
