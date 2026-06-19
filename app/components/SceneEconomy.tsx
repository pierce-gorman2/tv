"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  {
    number: "44%",
    label: "of U.S. GDP",
    sub: "comes from small businesses. Nearly half the American economy is built by builders like you.",
    source: "SBA Office of Advocacy",
  },
  {
    number: "61.7M",
    label: "Americans employed",
    sub: "by small businesses. Not corporations. Not government. Men and women who decided to build something.",
    source: "SBA, 2023",
  },
  {
    number: "2 in 3",
    label: "net new jobs",
    sub: "created in America come from small businesses. Every time someone builds, everyone benefits.",
    source: "U.S. Bureau of Labor Statistics",
  },
];

function StatBlock({ stat, i }: { stat: typeof stats[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut", delay: i * 0.2 }}
      className="flex flex-col gap-4"
    >
      <div>
        <p className="display-font font-light text-[#C9A84C] leading-none"
          style={{ fontSize: "clamp(52px, 10vw, 96px)" }}>
          {stat.number}
        </p>
        <p className="display-font text-xl md:text-2xl font-light text-[#f0ece4] mt-1 tracking-wide">
          {stat.label}
        </p>
      </div>
      <p className="font-sans text-sm text-[#6b6560] leading-relaxed font-light max-w-xs">
        {stat.sub}
      </p>
      <p className="font-sans text-[10px] text-[#3a3530] italic">{stat.source}</p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: i * 0.2 + 0.4 }}
        className="h-px bg-[#C9A84C]/15 origin-left"
      />
    </motion.div>
  );
}

export default function SceneEconomy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-80px" });
  const punchRef = useRef<HTMLDivElement>(null);
  const punchInView = useInView(punchRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, 0.06, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#06080f] flex flex-col justify-center px-6 py-24 overflow-hidden">

      {/* Ambient number in background */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="display-font font-light text-[#C9A84C]"
          style={{ fontSize: "clamp(200px, 40vw, 500px)", lineHeight: 1 }}>
          44%
        </span>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div ref={headRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs text-[#4a4540] tracking-[0.3em] uppercase mb-5"
          >
            Why this matters beyond you
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
            className="display-font text-4xl md:text-6xl font-light text-[#f0ece4] leading-tight tracking-wide mb-4"
          >
            The nation runs on builders.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
            className="display-font text-2xl md:text-3xl font-light text-[#6b6560] italic mb-16 max-w-2xl"
          >
            America doesn&apos;t need more consumers.
            It needs more builders.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {stats.map((stat, i) => (
            <StatBlock key={i} stat={stat} i={i} />
          ))}
        </div>

        <div ref={punchRef} className="mt-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={punchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="display-font text-2xl md:text-4xl font-light text-[#f0ece4] leading-snug tracking-wide"
          >
            When a man builds a business,
            he doesn&apos;t just change his family.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={punchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.35 }}
            className="display-font text-2xl md:text-4xl font-light text-[#C9A84C] italic leading-snug tracking-wide mt-2"
          >
            He changes his community.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={punchInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 font-sans text-xs text-[#3a3530] tracking-[0.2em] uppercase"
          >
            So what&apos;s stopping most men from starting? ↓
          </motion.p>
        </div>
      </div>
    </section>
  );
}
