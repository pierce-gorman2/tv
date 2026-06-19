"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function formatDollars(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

const PRESETS = [100_000, 500_000, 1_000_000, 5_000_000];

export default function SceneVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [valueIndex, setValueIndex] = useState(1);
  const startValue = PRESETS[valueIndex];

  // Without plan: 30% of wealth survives each gen
  // With Traditio: 65% survives each gen
  const withoutGen2 = Math.round(startValue * 0.30);
  const withoutGen3 = Math.round(startValue * 0.10);
  const withGen2 = Math.round(startValue * 0.65);
  const withGen3 = Math.round(startValue * 0.42);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-3xl mx-auto w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#f0ece4] leading-tight tracking-wide"
        >
          We are building a firm
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#C9A84C] leading-tight tracking-wide"
        >
          that will outlast us.
        </motion.p>

        {/* Legacy Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="mt-16 border border-[#C9A84C]/15 rounded-sm p-8 bg-[#0c1020]/40 text-left"
        >
          <p className="font-sans text-xs text-[#C9A84C] tracking-[0.2em] uppercase mb-6">
            Legacy Calculator — what does your work become?
          </p>

          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {PRESETS.map((v, i) => (
              <button
                key={i}
                onClick={() => setValueIndex(i)}
                className="px-4 py-2 font-sans text-xs tracking-wide rounded-sm border transition-all duration-300"
                style={{
                  borderColor: valueIndex === i ? "#C9A84C" : "rgba(255,255,255,0.08)",
                  background: valueIndex === i ? "rgba(201,168,76,0.08)" : "transparent",
                  color: valueIndex === i ? "#C9A84C" : "#6b6560",
                }}
              >
                {formatDollars(v)}
              </button>
            ))}
            <span className="font-sans text-xs text-[#4a4540] flex items-center ml-1">
              starting value
            </span>
          </div>

          {/* Comparison grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Without */}
            <div className="flex flex-col gap-4">
              <p className="font-sans text-xs text-[#4a4540] tracking-[0.15em] uppercase">Without a plan</p>
              <GenerationRow gen="You" value={startValue} muted={false} />
              <GenerationRow gen="Your children" value={withoutGen2} muted={true} />
              <GenerationRow gen="Their children" value={withoutGen3} muted={true} dim={true} />
            </div>
            {/* With */}
            <div className="flex flex-col gap-4">
              <p className="font-sans text-xs text-[#C9A84C]/70 tracking-[0.15em] uppercase">With Traditio</p>
              <GenerationRow gen="You" value={startValue} muted={false} gold={true} />
              <GenerationRow gen="Your children" value={withGen2} muted={false} gold={true} />
              <GenerationRow gen="Their children" value={withGen3} muted={false} gold={true} />
            </div>
          </div>

          <p className="mt-6 font-sans text-[10px] text-[#4a4540] italic">
            Illustrative projections based on generational wealth retention research. Not a guarantee.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 1.8, ease: "easeOut" }}
          className="mt-10 font-sans text-base md:text-lg text-[#6b6560] leading-relaxed font-light max-w-xl mx-auto"
        >
          A future where what a man builds reaches his children&apos;s children — not because he was lucky, but because he had someone in his corner who knew how to pass it on.
        </motion.p>
      </div>
    </section>
  );
}

function GenerationRow({
  gen,
  value,
  muted,
  gold,
  dim,
}: {
  gen: string;
  value: number;
  muted: boolean;
  gold?: boolean;
  dim?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-sans text-xs" style={{ color: dim ? "#3a3530" : muted ? "#6b6560" : "#8a8278" }}>
        {gen}
      </span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="display-font text-xl"
        style={{ color: dim ? "#3a3530" : gold ? "#C9A84C" : "#4a4540" }}
      >
        {formatDollars(value)}
      </motion.span>
    </div>
  );
}
