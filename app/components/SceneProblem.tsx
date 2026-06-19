"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── Generational decay "what if" chart ── */
function GenerationalDecayChart({ withTraditio }: { withTraditio: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const bars = withTraditio
    ? [
        { label: "You", gen: "Gen 1", pct: 100 },
        { label: "Your children", gen: "Gen 2", pct: 68 },
        { label: "Their children", gen: "Gen 3", pct: 42 },
      ]
    : [
        { label: "You", gen: "Gen 1", pct: 100 },
        { label: "Your children", gen: "Gen 2", pct: 30 },
        { label: "Their children", gen: "Gen 3", pct: 10 },
      ];

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <p className="text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase mb-1">
        Wealth retained across generations
      </p>
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-28 shrink-0">
            <p className="font-sans text-[10px] text-[#6b6560]">{bar.gen}</p>
            <p className="font-sans text-xs text-[#c8c0b0]">{bar.label}</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-full overflow-hidden" style={{ height: 3 }}>
            <motion.div
              animate={{ width: `${bar.pct}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: withTraditio
                  ? `rgba(201,168,76,${0.4 + (bar.pct / 100) * 0.6})`
                  : `rgba(201,168,76,${0.2 + (bar.pct / 100) * 0.4})`,
              }}
            />
          </div>
          <motion.span
            animate={{ opacity: 1 }}
            className="font-sans text-sm w-10 text-right"
            style={{ color: withTraditio && bar.pct > 30 ? "#C9A84C" : "#6b6560" }}
          >
            {bar.pct}%
          </motion.span>
        </div>
      ))}
      <p className="text-[#4a4540] font-sans text-[10px] mt-1 italic">
        {withTraditio ? "Projected with structured succession planning" : "Source: Williams & Preisser, Preparing Heirs"}
      </p>
    </div>
  );
}

/* ── Business survival donut ── */
function BusinessSurvivalChart({ withTraditio }: { withTraditio: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const survivePct = withTraditio ? 62 : 30;
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const dashArray = (survivePct / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <p className="text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase mb-1">
        Family businesses that survive
      </p>
      <div className="flex items-center gap-6">
        <svg width="100" height="100" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r={r} fill="none" stroke="#1a1a2e" strokeWidth="10" />
          <motion.circle
            cx="56" cy="56" r={r}
            fill="none"
            stroke={withTraditio ? "#C9A84C" : "#3a3020"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dashArray} ${circumference}`}
            strokeDashoffset={circumference * 0.25}
            animate={{ strokeDasharray: `${dashArray} ${circumference}` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
          <text x="56" y="62" textAnchor="middle" fill="#C9A84C" fontSize="15"
            fontFamily="Cormorant Garamond, serif">
            {withTraditio ? "2 in 3" : "1 in 3"}
          </text>
        </svg>
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-sans text-[11px] text-[#8a8278]">Survive to next gen</p>
            <motion.p
              animate={{ color: withTraditio ? "#C9A84C" : "#4a4540" }}
              className="display-font text-2xl"
            >
              {survivePct}%
            </motion.p>
          </div>
          <div>
            <p className="font-sans text-[11px] text-[#6b6560]">Reach the third</p>
            <p className="display-font text-2xl text-[#4a4540]">
              {withTraditio ? "35%" : "10%"}
            </p>
          </div>
        </div>
      </div>
      <p className="text-[#4a4540] font-sans text-[10px] italic">
        {withTraditio ? "Businesses with active succession planning" : "Source: Family Business Institute"}
      </p>
    </div>
  );
}

/* ── Wealth transfer chart ── */
function WealthTransferChart({ withTraditio }: { withTraditio: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const rows = withTraditio
    ? [
        { label: "Top 1.5%", pct: 42, value: "$35T", dim: false },
        { label: "Next 8.5%", pct: 38, value: "$32T", dim: false },
        { label: "Bottom 90%", pct: 20, value: "$17T", dim: false },
        { label: "Families with a plan", pct: 55, value: "↑3×", dim: false, highlight: true },
      ]
    : [
        { label: "Top 1.5%", pct: 42, value: "$35T", dim: false },
        { label: "Next 8.5%", pct: 38, value: "$32T", dim: false },
        { label: "Bottom 90%", pct: 20, value: "$17T", dim: true },
      ];

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <p className="text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase mb-1">
        $84T transfers by 2045
      </p>
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className={`font-sans text-xs ${row.highlight ? "text-[#C9A84C]" : "text-[#8a8278]"}`}>
              {row.label}
            </span>
            <span className={`font-sans text-xs ${row.highlight ? "text-[#C9A84C]" : "text-[#C9A84C]/70"}`}>
              {row.value}
            </span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${row.pct}%` }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: row.highlight
                  ? "#C9A84C"
                  : row.dim
                  ? "#2a2a2a"
                  : `rgba(201,168,76,${0.7 - i * 0.2})`,
              }}
            />
          </div>
        </div>
      ))}
      <p className="text-[#4a4540] font-sans text-[10px] italic">
        Source: Cerulli Associates, 2022
      </p>
    </div>
  );
}

export default function SceneProblem() {
  const [withTraditio, setWithTraditio] = useState(false);
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
            className="block h-px w-24 bg-[#C9A84C]/50 mb-10 origin-left"
          />
        </div>

        {/* What if toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headlineInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className={`font-sans text-xs tracking-wide transition-colors duration-300 ${!withTraditio ? "text-[#f0ece4]" : "text-[#4a4540]"}`}>
            Reality
          </span>
          <button
            onClick={() => setWithTraditio(!withTraditio)}
            className="relative w-12 h-6 rounded-full border border-[#C9A84C]/40 transition-colors duration-500 focus:outline-none"
            style={{ background: withTraditio ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.03)" }}
            aria-label="Toggle what if scenario"
          >
            <motion.div
              animate={{ x: withTraditio ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-[#C9A84C]"
            />
          </button>
          <span className={`font-sans text-xs tracking-wide transition-colors duration-300 ${withTraditio ? "text-[#C9A84C]" : "text-[#4a4540]"}`}>
            What if you had the right partner?
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            <GenerationalDecayChart key="decay" withTraditio={withTraditio} />,
            <BusinessSurvivalChart key="survival" withTraditio={withTraditio} />,
            <WealthTransferChart key="transfer" withTraditio={withTraditio} />,
          ].map((chart, i) => (
            <ChartCard key={i} delay={i * 0.15}>
              {chart}
            </ChartCard>
          ))}
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

function ChartCard({ children, delay }: { children: React.ReactNode; delay: number }) {
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
