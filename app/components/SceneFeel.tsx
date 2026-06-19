"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { id: 1,  delay: 600,  text: "You've run the numbers.",              size: "large",  color: "primary" },
  { id: 2,  delay: 2200, text: "More times than you'd admit.",         size: "medium", color: "dim"     },
  { id: 3,  delay: 4200, text: "You've imagined the name on the door.",size: "large",  color: "primary" },
  { id: 4,  delay: 6000, text: "The day you hire your first person.",   size: "medium", color: "dim"     },
  { id: 5,  delay: 7600, text: "What you'd tell your kids it means.",   size: "medium", color: "dim"     },
  { id: 6,  delay: 10000, text: "And then life got in the way.",        size: "large",  color: "primary" },
  { id: 7,  delay: 12200, text: "But the idea never left.",             size: "medium", color: "muted"   },
  { id: 8,  delay: 14400, text: "It never leaves.",                     size: "small",  color: "muted"   },
  { id: 9,  delay: 16600, text: "Because it's not supposed to.",        size: "large",  color: "gold"    },
];

const sizeClass: Record<string, string> = {
  large:  "text-3xl md:text-5xl lg:text-6xl",
  medium: "text-xl md:text-3xl lg:text-4xl",
  small:  "text-base md:text-xl lg:text-2xl",
};

const colorStyle: Record<string, string> = {
  primary: "#f0ece4",
  dim:     "#6b6560",
  muted:   "#4a4540",
  gold:    "#C9A84C",
};

export default function SceneFeel() {
  const [shown, setShown] = useState<number[]>([]);

  useEffect(() => {
    const timers = lines.map(({ id, delay }) =>
      setTimeout(() => setShown(prev => [...prev, id]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-8 overflow-hidden"
      style={{ background: "#050507" }}>

      {/* Ambient center glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
        {lines.map(({ id, text, size, color }) => (
          <AnimatePresence key={id}>
            {shown.includes(id) && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className={`display-font font-light leading-tight tracking-wide ${sizeClass[size]}`}
                style={{ color: colorStyle[color] }}
              >
                {text}
              </motion.p>
            )}
          </AnimatePresence>
        ))}

        {/* Final gold line */}
        <AnimatePresence>
          {shown.includes(9) && (
            <motion.div key="line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mx-auto mt-6 h-px w-12 bg-[#C9A84C]/50"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
