"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SceneCall() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative min-h-screen bg-[#06080f] flex flex-col items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="display-font text-3xl md:text-5xl font-light text-[#f0ece4] leading-tight tracking-wide"
        >
          If you are building something worth passing down —
          <br />
          <span className="text-[#C9A84C]">we want to know.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="mt-12"
        >
          <a
            href="mailto:ventures@traditio.co"
            className="inline-block px-8 py-4 border border-[#C9A84C] text-[#C9A84C] font-sans text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0a0a0a]"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
