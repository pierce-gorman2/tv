"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type FormState = "idle" | "open" | "sent";

export default function SceneCall() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${name}\n\nWhat I'm building:\n${building}`);
    const mailto = `mailto:ventures@traditio.co?subject=${encodeURIComponent(`${name} — Traditio Ventures Inquiry`)}&body=${body}`;
    window.location.href = mailto;
    setFormState("sent");
  }

  return (
    <section className="relative min-h-screen bg-[#06080f] flex flex-col items-center justify-center px-6 py-24">
      <div ref={ref} className="max-w-xl mx-auto w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="display-font text-3xl md:text-5xl font-light text-[#f0ece4] leading-tight tracking-wide"
        >
          If you are building something
          <br />
          worth passing down —
          <br />
          <span className="text-[#C9A84C]">we want to know.</span>
        </motion.p>

        <AnimatePresence mode="wait">
          {formState === "idle" && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12"
            >
              <button
                onClick={() => setFormState("open")}
                className="inline-block px-8 py-4 border border-[#C9A84C] text-[#C9A84C] font-sans text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0a0a0a]"
              >
                Get In Touch
              </button>
            </motion.div>
          )}

          {formState === "open" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-5 text-left"
            >
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-[#4a4540] tracking-[0.15em] uppercase">
                  Your name
                </label>
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Smith"
                  className="bg-transparent border-b border-white/10 py-3 font-sans text-sm text-[#f0ece4] placeholder-[#3a3530] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-[#4a4540] tracking-[0.15em] uppercase">
                  Your email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="bg-transparent border-b border-white/10 py-3 font-sans text-sm text-[#f0ece4] placeholder-[#3a3530] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-[#4a4540] tracking-[0.15em] uppercase">
                  What are you building?
                </label>
                <textarea
                  required
                  value={building}
                  onChange={e => setBuilding(e.target.value)}
                  placeholder="Tell us about your business — what it is, where you are, what you're trying to pass on."
                  rows={4}
                  className="bg-transparent border-b border-white/10 py-3 font-sans text-sm text-[#f0ece4] placeholder-[#3a3530] focus:outline-none focus:border-[#C9A84C] transition-colors duration-300 resize-none"
                />
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  type="submit"
                  className="px-6 py-3 border border-[#C9A84C] text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0a0a0a]"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => setFormState("idle")}
                  className="px-6 py-3 text-[#4a4540] font-sans text-xs tracking-[0.2em] uppercase hover:text-[#8a8278] transition-colors duration-300"
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
              transition={{ duration: 0.6 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <span className="gold-line" />
              <p className="display-font text-xl text-[#C9A84C] italic">
                We&apos;ll be in touch.
              </p>
              <p className="font-sans text-xs text-[#4a4540]">
                ventures@traditio.co
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
