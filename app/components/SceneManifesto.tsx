"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function SceneManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "#050507" }}
    >
      {/* Slow drifting gold haze */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201,168,76,0.05) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="display-font font-light text-[#6b6560] leading-tight tracking-wide"
          style={{ fontSize: "clamp(28px, 5.5vw, 72px)" }}
        >
          You were not created to consume.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="display-font font-light text-[#C9A84C] leading-tight tracking-wide"
          style={{ fontSize: "clamp(28px, 5.5vw, 72px)" }}
        >
          You were created to build.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 1.6 }}
          className="origin-center"
        >
          <div className="w-16 h-px bg-[#C9A84C]/40 mx-auto mt-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 2.1 }}
          className="font-sans text-sm text-[#3a3530] tracking-[0.25em] uppercase pt-4"
        >
          The data proves it. ↓
        </motion.p>
      </div>
    </section>
  );
}
