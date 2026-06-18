"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const definition = "Latin. Noun. The act of passing down. Of handing over what you built to the person who comes next.";

export default function SceneWord() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen bg-[#06080f] flex flex-col items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="display-font text-7xl md:text-9xl font-light text-[#f0ece4] tracking-widest"
        >
          Traditio
        </motion.h2>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="block h-px w-32 bg-[#C9A84C] mx-auto mt-6 mb-8 origin-left"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
          className="text-[#8a8278] font-sans text-base md:text-lg leading-relaxed font-light tracking-wide max-w-xl mx-auto"
        >
          {definition}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
          className="mt-10 display-font text-xl md:text-2xl text-[#C9A84C] font-light italic"
        >
          That is not just our name. It is our model.
        </motion.p>
      </div>
    </section>
  );
}
