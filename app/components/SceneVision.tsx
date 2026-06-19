"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function formatDollars(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

const PRESETS = [100_000, 500_000, 1_000_000, 5_000_000];

/* ── SVG Growth Curve ── */
function GrowthCurve({ startValue, withoutGen2, withoutGen3, withGen2, withGen3, inView }: {
  startValue: number;
  withoutGen2: number;
  withoutGen3: number;
  withGen2: number;
  withGen3: number;
  inView: boolean;
}) {
  const W = 300;
  const H = 140;
  const pad = { x: 10, y: 10 };
  const xs = [pad.x, W / 2, W - pad.x];
  const maxVal = Math.max(startValue, withGen3);

  const toY = (v: number) => H - pad.y - ((v / maxVal) * (H - pad.y * 2));

  const without = [toY(startValue), toY(withoutGen2), toY(withoutGen3)];
  const withT = [toY(startValue), toY(withGen2), toY(withGen3)];

  const pathD = (ys: number[]) =>
    `M ${xs[0]} ${ys[0]} C ${xs[0] + 80} ${ys[0]}, ${xs[1] - 60} ${ys[1]}, ${xs[1]} ${ys[1]} C ${xs[1] + 60} ${ys[1]}, ${xs[2] - 80} ${ys[2]}, ${xs[2]} ${ys[2]}`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((pct, i) => (
          <line key={i} x1={pad.x} x2={W - pad.x} y1={H * pct} y2={H * pct}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* Generation labels */}
        {["Gen 1", "Gen 2", "Gen 3"].map((g, i) => (
          <text key={i} x={xs[i]} y={H - 2} textAnchor="middle"
            fill="rgba(106,100,90,0.6)" fontSize="8" fontFamily="Inter, sans-serif">
            {g}
          </text>
        ))}

        {/* Without path */}
        <motion.path
          d={pathD(without)}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* With Traditio path */}
        <motion.path
          d={pathD(withT)}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
        />

        {/* Area fill under Traditio line */}
        <motion.path
          d={`${pathD(withT)} L ${xs[2]} ${H - pad.y} L ${xs[0]} ${H - pad.y} Z`}
          fill="rgba(201,168,76,0.05)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        />

        {/* Dots at gen3 endpoints */}
        <motion.circle cx={xs[2]} cy={without[2]} r="3" fill="rgba(255,255,255,0.15)"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 1.1 }} style={{ transformOrigin: `${xs[2]}px ${without[2]}px` }} />
        <motion.circle cx={xs[2]} cy={withT[2]} r="4" fill="#C9A84C"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 1.5, type: "spring" }} style={{ transformOrigin: `${xs[2]}px ${withT[2]}px` }} />
      </svg>
    </div>
  );
}

export default function SceneVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [valueIndex, setValueIndex] = useState(1);
  const startValue = PRESETS[valueIndex];

  const withoutGen2 = Math.round(startValue * 0.30);
  const withoutGen3 = Math.round(startValue * 0.10);
  const withGen2 = Math.round(startValue * 2.1);
  const withGen3 = Math.round(startValue * 4.8);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-3xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#f0ece4] leading-tight tracking-wide text-center"
        >
          We are building a firm
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="display-font text-4xl md:text-6xl lg:text-7xl font-light text-[#C9A84C] leading-tight tracking-wide text-center mb-16"
        >
          that will outlast us.
        </motion.p>

        {/* Legacy Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          className="border border-[#C9A84C]/15 rounded-sm p-8 bg-[#0c1020]/40"
        >
          <p className="font-sans text-xs text-[#C9A84C] tracking-[0.2em] uppercase mb-6">
            Legacy Calculator — what does your work become?
          </p>

          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2 mb-8 items-center">
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
            <span className="font-sans text-xs text-[#4a4540] ml-1">starting value</span>
          </div>

          {/* Growth curve */}
          <div className="mb-8">
            <GrowthCurve key={valueIndex}
              startValue={startValue}
              withoutGen2={withoutGen2} withoutGen3={withoutGen3}
              withGen2={withGen2} withGen3={withGen3}
              inView={inView}
            />
            <div className="flex gap-6 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-px border-t border-dashed border-white/20" />
                <span className="font-sans text-[10px] text-[#4a4540]">Without a plan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-[#C9A84C]" />
                <span className="font-sans text-[10px] text-[#C9A84C]/60">With Traditio</span>
              </div>
            </div>
          </div>

          {/* Comparison numbers */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
            <div className="flex flex-col gap-4">
              <p className="font-sans text-[10px] text-[#4a4540] tracking-[0.15em] uppercase">Without a plan</p>
              <GenRow gen="You" value={startValue} />
              <GenRow gen="Your children" value={withoutGen2} dim />
              <GenRow gen="Their children" value={withoutGen3} dim />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-sans text-[10px] text-[#C9A84C]/60 tracking-[0.15em] uppercase">With Traditio</p>
              <GenRow gen="You" value={startValue} gold />
              <GenRow gen="Your children" value={withGen2} gold up />
              <GenRow gen="Their children" value={withGen3} gold up />
            </div>
          </div>

          <p className="mt-5 font-sans text-[10px] text-[#3a3530] italic">
            Illustrative projections. Not a guarantee — a possibility worth building toward.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="mt-10 font-sans text-base md:text-lg text-[#6b6560] leading-relaxed font-light max-w-xl mx-auto text-center"
        >
          A future where what a man builds reaches his children&apos;s children — not because he was lucky, but because he had someone in his corner who knew how to pass it on.
        </motion.p>
      </div>
    </section>
  );
}

function GenRow({ gen, value, gold, dim, up }: {
  gen: string; value: number; gold?: boolean; dim?: boolean; up?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-sans text-xs" style={{ color: dim ? "#3a3530" : "#6b6560" }}>
        {gen}
      </span>
      <div className="flex items-center gap-1">
        {up && <span className="font-sans text-[10px] text-[#C9A84C]/60">↑</span>}
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
    </div>
  );
}
