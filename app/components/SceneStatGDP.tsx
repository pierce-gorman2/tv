"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration: number, active: boolean, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration, decimals]);
  return value;
}

export default function SceneStatGDP() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(44, 2000, inView);

  const r = 130;
  const cx = 160;
  const cy = 160;
  const circumference = 2 * Math.PI * r;
  const targetDash = (44 / 100) * circumference;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{ background: "#080d1a" }}
    >
      {/* Faint radial behind graphic */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 flex flex-col items-center gap-12 max-w-3xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs text-[#4a4540] tracking-[0.3em] uppercase"
        >
          The scale of what builders create
        </motion.p>

        {/* Donut ring */}
        <div className="relative">
          <svg width="320" height="320" viewBox="0 0 320 320">
            {/* Track ring */}
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="18"
            />
            {/* Animated gold arc */}
            <motion.circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="#C9A84C"
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`0 ${circumference}`}
              animate={inView ? { strokeDasharray: `${targetDash} ${circumference}` } : {}}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ rotate: -90, transformOrigin: "160px 160px" }}
            />
            {/* Tick at 44% */}
            <motion.circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="24"
              strokeLinecap="round"
              strokeDasharray={`2 ${circumference}`}
              animate={inView ? {
                strokeDashoffset: -(targetDash - 1),
              } : { strokeDashoffset: 0 }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ rotate: -90, transformOrigin: "160px 160px" }}
            />
          </svg>

          {/* Center counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="display-font text-[#C9A84C] font-light"
              style={{ fontSize: "clamp(56px, 10vw, 88px)", lineHeight: 1 }}
            >
              {count}%
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="font-sans text-xs text-[#4a4540] tracking-[0.2em] uppercase mt-1"
            >
              of U.S. GDP
            </motion.span>
          </div>
        </div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="space-y-3"
        >
          <p className="display-font text-3xl md:text-5xl font-light text-[#f0ece4] leading-snug tracking-wide">
            Nearly half the American economy
          </p>
          <p className="display-font text-2xl md:text-4xl font-light text-[#6b6560] italic leading-snug">
            is built by small business owners.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="font-sans text-[10px] text-[#3a3530] italic"
        >
          Source: SBA Office of Advocacy
        </motion.p>
      </div>
    </section>
  );
}
