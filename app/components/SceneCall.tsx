"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";

type FormState = "idle" | "open" | "sent";

export default function SceneCall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${name}\n\nWhat I'm building:\n${building}`);
    window.location.href = `mailto:ventures@traditio.co?subject=${encodeURIComponent(`${name} — Traditio Ventures`)}&body=${body}`;
    setFormState("sent");
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{ background: "#06080f" }}
    >
      {/* Ambient radial glow at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-xl mx-auto w-full text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs text-[#4a4540] tracking-[0.3em] uppercase mb-10"
        >
          The invitation
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="display-font text-4xl md:text-5xl lg:text-6xl font-light text-[#f0ece4] leading-tight tracking-wide"
        >
          If you are building
          <br />
          something worth
          <br />
          passing down —
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="display-font text-4xl md:text-5xl lg:text-6xl font-light text-[#C9A84C] leading-tight tracking-wide mt-2"
        >
          we want to know.
        </motion.p>

        <AnimatePresence mode="wait">
          {formState === "idle" && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-14 flex flex-col items-center gap-4"
            >
              <button
                onClick={() => setFormState("open")}
                className="group relative px-10 py-5 border border-[#C9A84C] text-[#C9A84C] font-sans text-sm tracking-[0.25em] uppercase overflow-hidden transition-colors duration-500 hover:text-[#0a0a0a]"
              >
                <motion.div
                  className="absolute inset-0 bg-[#C9A84C] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <span className="relative z-10">Get In Touch</span>
              </button>
              <p className="font-sans text-xs text-[#3a3530]">ventures@traditio.co</p>
            </motion.div>
          )}

          {formState === "open" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-6 text-left"
            >
              {[
                { label: "Your name", value: name, set: setName, type: "text", placeholder: "John Smith" },
                { label: "Your email", value: email, set: setEmail, type: "email", placeholder: "john@company.com" },
              ].map(({ label, value, set, type, placeholder }) => (
                <div key={label} className="flex flex-col gap-2">
                  <label className="font-sans text-[10px] text-[#4a4540] tracking-[0.2em] uppercase">{label}</label>
                  <input
                    required
                    type={type}
                    value={value}
                    onChange={e => set(e.target.value)}
                    placeholder={placeholder}
                    className="bg-transparent border-b border-white/8 py-3 font-sans text-sm text-[#f0ece4] placeholder-[#2a2520] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] text-[#4a4540] tracking-[0.2em] uppercase">
                  What are you building?
                </label>
                <textarea
                  required
                  value={building}
                  onChange={e => setBuilding(e.target.value)}
                  placeholder="Tell us about it — what it is, where you are, and what you want it to become."
                  rows={4}
                  className="bg-transparent border-b border-white/8 py-3 font-sans text-sm text-[#f0ece4] placeholder-[#2a2520] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="px-7 py-3 border border-[#C9A84C] text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C9A84C] hover:text-[#0a0a0a] transition-all duration-300"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => setFormState("idle")}
                  className="px-7 py-3 text-[#4a4540] font-sans text-xs tracking-[0.2em] uppercase hover:text-[#8a8278] transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          {formState === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-14 flex flex-col items-center gap-5"
            >
              <span className="gold-line" />
              <p className="display-font text-2xl md:text-3xl text-[#C9A84C] italic font-light">
                We&apos;ll be in touch.
              </p>
              <p className="font-sans text-xs text-[#4a4540] tracking-wide">
                ventures@traditio.co
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
