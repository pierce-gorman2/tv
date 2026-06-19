"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const columns = [
  { gold: true, label: "Job 1" },
  { gold: true, label: "Job 2" },
  { gold: false, label: "Job 3" },
];

export default function SceneStatNewJobs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const closeRef = useRef<HTMLDivElement>(null);
  const closeInView = useInView(closeRef, { once: true, margin: "-60px" });

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{ background: "#06080f" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 45%, rgba(201,168,76,0.04) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 flex flex-col items-center gap-12 max-w-3xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs text-[#4a4540] tracking-[0.3em] uppercase"
        >
          Job creation in America
        </motion.p>

        {/* Three rising columns */}
        <div className="flex items-end justify-center gap-5 md:gap-8" style={{ height: 220 }}>
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col items-center gap-3 h-full justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
                className="font-sans text-[10px] tracking-wide"
                style={{ color: col.gold ? "#C9A84C" : "#3a3530" }}
              >
                {col.gold ? "Small business" : "Everything else"}
              </motion.div>

              <div
                className="relative overflow-hidden rounded-sm"
                style={{
                  width: "clamp(60px, 14vw, 100px)",
                  height: "100%",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{
                    duration: 1.4,
                    delay: 0.2 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-0 left-0 right-0 origin-bottom"
                  style={{
                    height: col.gold ? "100%" : "34%",
                    background: col.gold
                      ? "linear-gradient(to top, #C9A84C, rgba(201,168,76,0.6))"
                      : "rgba(255,255,255,0.06)",
                  }}
                />
                {col.gold && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.6 }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 40%)",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-3"
        >
          <p
            className="display-font font-light text-[#C9A84C] leading-none"
            style={{ fontSize: "clamp(52px, 11vw, 96px)" }}
          >
            2 in 3
          </p>
          <p className="display-font text-2xl md:text-4xl font-light text-[#f0ece4] tracking-wide">
            new jobs in America
          </p>
          <p className="display-font text-xl md:text-3xl font-light text-[#6b6560] italic">
            come from small businesses.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
          className="font-sans text-[10px] text-[#3a3530] italic"
        >
          Source: U.S. Bureau of Labor Statistics
        </motion.p>
      </div>

      {/* Closing conviction */}
      <div ref={closeRef} className="relative z-10 max-w-3xl mx-auto text-center mt-24 px-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={closeInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-px w-16 bg-[#C9A84C]/40 mx-auto mb-10 origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={closeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.1 }}
          className="display-font text-3xl md:text-5xl font-light text-[#f0ece4] leading-snug tracking-wide"
        >
          When a man builds a business,
          <br />he doesn&apos;t just change his family.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={closeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.5 }}
          className="display-font text-3xl md:text-5xl font-light text-[#C9A84C] italic leading-snug tracking-wide mt-3"
        >
          He changes his community.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={closeInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 font-sans text-xs text-[#3a3530] tracking-[0.2em] uppercase"
        >
          So what&apos;s stopping most men from starting? ↓
        </motion.p>
      </div>
    </section>
  );
}
