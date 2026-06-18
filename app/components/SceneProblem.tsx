"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Animated bar chart: generational wealth decay ── */
function GenerationalDecayChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const bars = [
    { label: "You", pct: 100, gen: "Gen 1" },
    { label: "Your children", pct: 30, gen: "Gen 2" },
    { label: "Their children", pct: 10, gen: "Gen 3" },
  ];

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <p className="text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase mb-2">
        What happens to what you build
      </p>
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-28 shrink-0">
            <p className="font-sans text-xs text-[#6b6560]">{bar.gen}</p>
            <p className="font-sans text-xs text-[#c8c0b0]">{bar.label}</p>
          </div>
          <div className="flex-1 h-px bg-white/5 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: bar.pct / 100 } : {}}
              transition={{ duration: 1.2, delay: i * 0.3, ease: "easeOut" }}
              style={{ originX: 0, height: "2px", top: "-1px" }}
              className="absolute top-0 left-0 bg-[#C9A84C] origin-left"
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.3 + 1 }}
            className="font-sans text-sm text-[#C9A84C] w-10 text-right"
          >
            {bar.pct}%
          </motion.span>
        </div>
      ))}
      <p className="text-[#4a4540] font-sans text-xs mt-2 italic">
        Source: Williams & Preisser, Preparing Heirs
      </p>
    </div>
  );
}

/* ── Animated donut/arc: business survival ── */
function BusinessSurvivalChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const r = 44;
  const cx = 56;
  const cy = 56;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { label: "Survive to Gen 2", pct: 30, color: "#C9A84C" },
    { label: "Lost by Gen 2", pct: 70, color: "#1a1a2e" },
  ];

  const survivePct = 30;
  const dashArray = (survivePct / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <p className="text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase mb-2">
        Family businesses that survive
      </p>
      <div className="flex items-center gap-8">
        <svg width="112" height="112" viewBox="0 0 112 112">
          {/* Background ring */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a2e" strokeWidth="10" />
          {/* Survival arc */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#C9A84C"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dashArray} ${circumference}`}
            strokeDashoffset={circumference * 0.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <motion.text
            x={cx}
            y={cy + 6}
            textAnchor="middle"
            fill="#C9A84C"
            fontSize="18"
            fontFamily="Cormorant Garamond, serif"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            1 in 3
          </motion.text>
        </svg>
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-sans text-xs text-[#c8c0b0]">Survive to the next generation</p>
            <p className="display-font text-2xl text-[#C9A84C]">30%</p>
          </div>
          <div>
            <p className="font-sans text-xs text-[#6b6560]">Make it to the third</p>
            <p className="display-font text-2xl text-[#4a4540]">10%</p>
          </div>
        </div>
      </div>
      <p className="text-[#4a4540] font-sans text-xs italic">
        Source: Family Business Institute
      </p>
    </div>
  );
}

/* ── Animated bar: wealth transfer concentration ── */
function WealthTransferChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <p className="text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase mb-2">
        $84 trillion transferring by 2045
      </p>

      {[
        { label: "Top 1.5% of households", pct: 42, value: "$35T" },
        { label: "Next 8.5%", pct: 38, value: "$32T" },
        { label: "Bottom 90%", pct: 20, value: "$17T" },
      ].map((row, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-sans text-xs text-[#8a8278]">{row.label}</span>
            <span className="font-sans text-xs text-[#C9A84C]">{row.value}</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${row.pct}%` } : {}}
              transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: i === 2 ? "#2a2a2a" : `rgba(201,168,76,${1 - i * 0.3})`,
              }}
            />
          </div>
        </div>
      ))}
      <p className="text-[#4a4540] font-sans text-xs italic">
        Source: Cerulli Associates, 2022
      </p>
    </div>
  );
}

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
            className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#f0ece4] leading-tight tracking-wide mb-2"
          >
            Most men build.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#C9A84C] leading-tight tracking-wide mb-4 italic"
          >
            Almost none of it lasts.
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={headlineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="block h-px w-24 bg-[#C9A84C]/50 mb-16 origin-left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <ChartCard delay={0}>
            <GenerationalDecayChart />
          </ChartCard>
          <ChartCard delay={0.15}>
            <BusinessSurvivalChart />
          </ChartCard>
          <ChartCard delay={0.3}>
            <WealthTransferChart />
          </ChartCard>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-14 display-font text-xl md:text-2xl text-[#6b6560] font-light italic max-w-2xl"
        >
          The problem is not ambition. Men have always built.
          The problem is that almost nothing gets passed on.
        </motion.p>
      </div>
    </section>
  );
}

function ChartCard({
  children,
  delay,
}: {
  children: React.ReactNode;
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
      className="border border-[#C9A84C]/10 rounded-sm p-7 bg-[#0c1020]/60"
    >
      {children}
    </motion.div>
  );
}
