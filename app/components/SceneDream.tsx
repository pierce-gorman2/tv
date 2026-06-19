"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = [
  { id: "service", label: "A service business" },
  { id: "trade", label: "A trade or craft" },
  { id: "product", label: "A product company" },
  { id: "practice", label: "A professional practice" },
  { id: "brick", label: "A brick-and-mortar" },
  { id: "unnamed", label: "Something I haven't named yet" },
];

const responses: Record<string, { line1: string; line2: string }> = {
  service: {
    line1: "Something built on trust. On showing up.",
    line2: "The kind of thing that only works because of who you are — and everything you've put in.",
  },
  trade: {
    line1: "A craft that took years to master.",
    line2: "Built with your hands, your reputation, your name. That kind of work leaves something real behind.",
  },
  product: {
    line1: "An idea that became something people actually need.",
    line2: "You didn't just think it — you built it. Most people never get that far.",
  },
  practice: {
    line1: "Years of expertise, organized into a business.",
    line2: "More valuable than most people know. More fragile than most people admit.",
  },
  brick: {
    line1: "A place. A presence. A name in a community.",
    line2: "Something your neighborhood depends on — whether they say so or not.",
  },
  unnamed: {
    line1: "The ones hardest to name are often the most worth building.",
    line2: "You know what it is. You know it matters. That's enough.",
  },
};

export default function SceneDream() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const responseRef = useRef<HTMLDivElement>(null);

  const response = selected ? responses[selected] : null;

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-center px-6 py-28 pb-24">
      <div ref={ref} className="max-w-4xl mx-auto w-full">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="display-font text-2xl md:text-3xl font-light text-[#6b6560] tracking-wide mb-3"
        >
          So tell us —
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
          className="display-font text-4xl md:text-6xl font-light text-[#f0ece4] leading-tight tracking-wide mb-16"
        >
          what is it you&apos;re building?
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-sans text-xs text-[#4a4540] tracking-[0.25em] uppercase mb-7"
        >
          What is it?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-5 md:p-7 text-left border rounded-sm transition-all duration-500 cursor-pointer focus:outline-none"
              style={{
                borderColor: selected === cat.id ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.06)",
                background:
                  selected === cat.id
                    ? "rgba(201,168,76,0.06)"
                    : "rgba(255,255,255,0.015)",
              }}
            >
              {selected === cat.id && (
                <motion.div
                  layoutId="selectedGlow"
                  className="absolute inset-0 rounded-sm"
                  style={{
                    boxShadow: "inset 0 0 30px rgba(201,168,76,0.08)",
                  }}
                />
              )}
              <span
                className="display-font text-lg md:text-xl font-light transition-colors duration-300"
                style={{ color: selected === cat.id ? "#C9A84C" : "#8a8278" }}
              >
                {cat.label}
              </span>
              {selected === cat.id && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="block mt-1 font-sans text-[10px] text-[#C9A84C]/50 tracking-[0.2em] uppercase"
                >
                  Selected
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          {response && (
            <motion.div
              ref={responseRef}
              key={selected}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-14 max-w-2xl"
            >
              <span className="gold-line mb-6" />
              <p className="display-font text-2xl md:text-3xl font-light text-[#f0ece4] leading-snug mb-3">
                {response.line1}
              </p>
              <p className="font-sans text-sm md:text-base text-[#6b6560] leading-relaxed font-light">
                {response.line2}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 font-sans text-xs text-[#4a4540] tracking-[0.2em] uppercase"
              >
                Here&apos;s what stands in the way. ↓
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
