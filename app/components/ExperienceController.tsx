"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ScenePhone from "./ScenePhone";
import SceneOpening from "./SceneOpening";
import SceneDream from "./SceneDream";
import SceneStatGDP from "./SceneStatGDP";
import SceneStatJobs from "./SceneStatJobs";
import SceneStatNewJobs from "./SceneStatNewJobs";
import SceneGap from "./SceneGap";
import SceneWhy from "./SceneWhy";
import SceneWord from "./SceneWord";
import SceneModel from "./SceneModel";
import SceneCall from "./SceneCall";
import Footer from "./Footer";
import CursorGlow from "./CursorGlow";

const SCENES = [
  { id: "phone",    Component: ScenePhone,       duration: 11500, label: "Intro",      interactive: false },
  { id: "opening",  Component: SceneOpening,     duration: 13000, label: "Dream",      interactive: false },
  { id: "dream",    Component: SceneDream,       duration: 28000, label: "You",        interactive: true  },
  { id: "gdp",      Component: SceneStatGDP,     duration: 8500,  label: "Economy",    interactive: false },
  { id: "jobs",     Component: SceneStatJobs,    duration: 9500,  label: "Jobs",       interactive: false },
  { id: "newjobs",  Component: SceneStatNewJobs, duration: 11000, label: "Impact",     interactive: false },
  { id: "gap",      Component: SceneGap,         duration: 28000, label: "The Gap",    interactive: true  },
  { id: "why",      Component: SceneWhy,         duration: 9000,  label: "Why",        interactive: false },
  { id: "word",     Component: SceneWord,        duration: 9000,  label: "Traditio",   interactive: false },
  { id: "model",    Component: SceneModel,       duration: 20000, label: "Model",      interactive: true  },
  { id: "call",     Component: SceneCall,        duration: null,  label: "Build",      interactive: true  },
];

export default function ExperienceController() {
  const [current, setCurrent] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const continueTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= SCENES.length) return;
    setCurrent(index);
    setShowContinue(false);
    setProgressKey(k => k + 1);
  }, []);

  const advance = useCallback(() => goTo(current + 1), [current, goTo]);
  const back = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance timer
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const scene = SCENES[current];
    if (scene.duration) {
      timerRef.current = setTimeout(advance, scene.duration);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, advance]);

  // "Continue" button appears after delay
  useEffect(() => {
    if (continueTimerRef.current) clearTimeout(continueTimerRef.current);
    setShowContinue(false);
    continueTimerRef.current = setTimeout(() => setShowContinue(true), 4000);
    return () => { if (continueTimerRef.current) clearTimeout(continueTimerRef.current); };
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); advance(); }
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back]);

  const scene = SCENES[current];
  const isLast = current === SCENES.length - 1;

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden select-none">
      <CursorGlow />

      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Scenes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 overflow-y-auto"
        >
          <scene.Component />
          {/* Footer on last scene */}
          {isLast && (
            <footer className="border-t border-white/5 px-6 py-12 bg-[#0a0a0a]">
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

      {/* Progress bar — top */}
      {scene.duration && (
        <div className="fixed top-0 left-0 right-0 h-px bg-white/5 z-50">
          <motion.div
            key={progressKey}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: scene.duration / 1000, ease: "linear" }}
            className="h-full bg-[#C9A84C]/50"
          />
        </div>
      )}

      {/* Gold scroll progress line — left edge */}
      <div className="fixed left-0 top-0 bottom-0 w-px bg-white/[0.03] z-50 pointer-events-none">
        <motion.div
          key={`progress-${current}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: (scene.duration ?? 30000) / 1000, ease: "linear" }}
          className="h-full bg-[#C9A84C]/40 origin-top"
        />
      </div>

      {/* Scene dots — bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="transition-all duration-400 rounded-full"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current
                ? "#C9A84C"
                : i < current
                ? "rgba(201,168,76,0.3)"
                : "rgba(255,255,255,0.1)",
            }}
            aria-label={s.label}
          />
        ))}
      </div>

      {/* Continue / Back nav — bottom right */}
      <AnimatePresence>
        {showContinue && !isLast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          >
            {current > 0 && (
              <button
                onClick={back}
                className="font-sans text-xs text-[#4a4540] hover:text-[#8a8278] tracking-[0.2em] uppercase transition-colors"
              >
                ← Back
              </button>
            )}
            <button
              onClick={advance}
              className="font-sans text-xs text-[#C9A84C] hover:text-[#f0ece4] tracking-[0.2em] uppercase transition-colors border border-[#C9A84C]/30 hover:border-[#C9A84C] px-4 py-2 rounded-sm"
            >
              Continue →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip intro — top right, only on first scene */}
      <AnimatePresence>
        {current === 0 && showContinue && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => goTo(1)}
            className="fixed top-5 right-5 z-50 font-sans text-xs text-[#4a4540] hover:text-[#8a8278] tracking-[0.2em] uppercase transition-colors"
          >
            Skip →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
