"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ScenePhone    from "./ScenePhone";
import SceneOpening  from "./SceneOpening";
import SceneDream    from "./SceneDream";
import SceneFeel     from "./SceneFeel";
import SceneWhy      from "./SceneWhy";
import SceneWord     from "./SceneWord";
import SceneModel    from "./SceneModel";
import SceneCall     from "./SceneCall";
import CursorGlow    from "./CursorGlow";

const SCENES = [
  { id: "phone",   Component: ScenePhone,   duration: 10500, label: "Intro",    interactive: false },
  { id: "opening", Component: SceneOpening, duration: 13000, label: "Dream",    interactive: false },
  { id: "dream",   Component: SceneDream,   duration: 26000, label: "You",      interactive: true  },
  { id: "feel",    Component: SceneFeel,    duration: 19500, label: "The Idea", interactive: false },
  { id: "why",     Component: SceneWhy,     duration: 10000, label: "Why",      interactive: false },
  { id: "word",    Component: SceneWord,    duration: 10000, label: "Traditio", interactive: false },
  { id: "model",   Component: SceneModel,   duration: 20000, label: "Model",    interactive: true  },
  { id: "call",    Component: SceneCall,    duration: null,  label: "Build",    interactive: true  },
];

export default function ExperienceController() {
  const [current, setCurrent]         = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const advTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= SCENES.length) return;
    setCurrent(index);
    setShowContinue(false);
    setProgressKey(k => k + 1);
  }, []);

  const advance = useCallback(() => goTo(current + 1), [current, goTo]);
  const back    = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (advTimer.current) clearTimeout(advTimer.current);
    const { duration } = SCENES[current];
    if (duration) advTimer.current = setTimeout(advance, duration);
    return () => { if (advTimer.current) clearTimeout(advTimer.current); };
  }, [current, advance]);

  // "Continue" button delay
  useEffect(() => {
    if (contTimer.current) clearTimeout(contTimer.current);
    setShowContinue(false);
    contTimer.current = setTimeout(() => setShowContinue(true), 3500);
    return () => { if (contTimer.current) clearTimeout(contTimer.current); };
  }, [current]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); advance(); }
      if (e.key === "ArrowLeft")  back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back]);

  const scene  = SCENES[current];
  const isLast = current === SCENES.length - 1;

  return (
    <div className="fixed inset-0 bg-[#030305] overflow-hidden select-none">
      <CursorGlow />
      <div className="grain" aria-hidden="true" />

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 overflow-y-auto overflow-x-hidden"
        >
          <scene.Component />

          {isLast && (
            <footer className="border-t border-white/5 px-6 py-12 bg-[#06080f]">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="display-font text-base font-light text-[#f0ece4] tracking-[0.2em] uppercase mb-1">Traditio Ventures</p>
                  <p className="font-sans text-xs text-[#4a4540]">The venture and investment arm of Traditio Co.</p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-xs text-[#4a4540]">traditioventures.com</p>
                  <p className="font-sans text-xs text-[#4a4540] mt-1">© Traditio Co. 2026</p>
                </div>
              </div>
            </footer>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Top progress bar */}
      {scene.duration && (
        <div className="fixed top-0 left-0 right-0 h-px bg-white/5 z-50 pointer-events-none">
          <motion.div
            key={`bar-${progressKey}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: scene.duration / 1000, ease: "linear" }}
            className="h-full bg-[#C9A84C]/50"
          />
        </div>
      )}

      {/* Left spine */}
      <div className="fixed left-0 top-0 bottom-0 w-px bg-white/[0.03] z-50 pointer-events-none">
        <motion.div
          key={`spine-${progressKey}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: (scene.duration ?? 30000) / 1000, ease: "linear" }}
          className="h-full bg-[#C9A84C]/35 origin-top"
        />
      </div>

      {/* Scene dots */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="transition-all duration-500 rounded-full focus:outline-none"
            aria-label={s.label}
            style={{
              width:  i === current ? 22 : 6,
              height: 6,
              background: i === current
                ? "#C9A84C"
                : i < current
                ? "rgba(201,168,76,0.28)"
                : "rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>

      {/* Continue / Back */}
      <AnimatePresence>
        {showContinue && !isLast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-3"
          >
            {current > 0 && (
              <button onClick={back}
                className="font-sans text-[10px] text-[#4a4540] hover:text-[#6b6560] tracking-[0.2em] uppercase transition-colors">
                ← Back
              </button>
            )}
            <button onClick={advance}
              className="font-sans text-[10px] text-[#C9A84C] tracking-[0.2em] uppercase border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 px-4 py-2 rounded-sm transition-colors">
              Continue →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip intro */}
      <AnimatePresence>
        {current === 0 && showContinue && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => goTo(1)}
            className="fixed top-5 right-5 z-50 font-sans text-[10px] text-[#4a4540] hover:text-[#6b6560] tracking-[0.2em] uppercase transition-colors"
          >
            Skip →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
