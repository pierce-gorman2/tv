"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

/* 10×10 grid — 46 dots are "small business" */
const TOTAL = 100;
const GOLD = 46;

export default function SceneStatJobs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(61.7, 2200, inView);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(201,168,76,0.035) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 flex flex-col items-center gap-10 max-w-3xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs text-[#4a4540] tracking-[0.3em] uppercase"
        >
          The people behind it
        </motion.p>

        {/* Dot grid */}
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(10, 1fr)", width: "min(280px, 70vw)" }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isGold = i < GOLD;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.35,
                  delay: isGold
                    ? 0.3 + i * 0.018
                    : 0.3 + GOLD * 0.018 + (i - GOLD) * 0.008,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-full aspect-square"
                style={{
                  background: isGold
                    ? `rgba(201,168,76,${0.5 + (1 - i / GOLD) * 0.5})`
                    : "rgba(255,255,255,0.06)",
                  boxShadow: isGold && i < 10 ? "0 0 6px rgba(201,168,76,0.3)" : "none",
                }}
              />
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-6 text-xs font-sans"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]/80" />
            <span className="text-[#8a8278]">Small business employee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/8" />
            <span className="text-[#4a4540]">Other private sector</span>
          </div>
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-2"
        >
          <p
            className="display-font font-light text-[#C9A84C] leading-none"
            style={{ fontSize: "clamp(52px, 11vw, 96px)" }}
          >
            {count}M
          </p>
          <p className="display-font text-2xl md:text-4xl font-light text-[#f0ece4] tracking-wide">
            Americans go to work
          </p>
          <p className="display-font text-xl md:text-3xl font-light text-[#6b6560] italic">
            for a small business every day.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="font-sans text-sm text-[#4a4540] max-w-sm leading-relaxed"
        >
          Not for a corporation. Not for the government.
          For someone who decided to build something — and did.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.4 }}
          className="font-sans text-[10px] text-[#3a3530] italic"
        >
          Source: SBA, 2023 · Each dot = ~617,000 workers
        </motion.p>
      </div>
    </section>
  );
}
