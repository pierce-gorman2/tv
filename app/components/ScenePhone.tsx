"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posts = [
  {
    gradient: "linear-gradient(160deg,#3a0050 0%,#7b1fa2 40%,#e91e8c 100%)",
    emoji: "💅",
    username: "@glossgirlera",
    caption: "get ready with me ✨ #grwm",
    likes: "284.3K",
    comments: "4.1K",
  },
  {
    gradient: "linear-gradient(160deg,#0a1628 0%,#0d47a1 45%,#00b4d8 100%)",
    emoji: "🎵",
    username: "@vibes.only",
    caption: "this song is living in my head rent free",
    likes: "1.2M",
    comments: "9.8K",
  },
  {
    gradient: "linear-gradient(160deg,#1a0800 0%,#bf360c 40%,#ff6f00 100%)",
    emoji: "🔥",
    username: "@fitscheck",
    caption: "rate my fit 1-10 🔥 #ootd",
    likes: "502.1K",
    comments: "12.4K",
  },
  {
    gradient: "linear-gradient(160deg,#001219 0%,#005f73 40%,#0a9396 100%)",
    emoji: "😂",
    username: "@trending.clips",
    caption: "POV: monday morning again",
    likes: "3.4M",
    comments: "21K",
  },
];

/* ── Phone Frame ── */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: "clamp(200px, 30vw, 260px)",
        height: "clamp(432px, 64vw, 564px)",
        borderRadius: 44,
        background: "#0d0d0d",
        border: "2px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 0 80px rgba(120,160,255,0.18), 0 0 200px rgba(120,160,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)",
        overflow: "hidden",
      }}
    >
      {/* Dynamic island */}
      <div
        className="absolute top-3 left-1/2 z-20"
        style={{
          transform: "translateX(-50%)",
          width: 110,
          height: 28,
          borderRadius: 20,
          background: "#000",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
        }}
      />
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-2"
        style={{ height: 44 }}>
        <span className="font-sans text-[10px] text-white font-semibold">9:41</span>
        <div className="flex gap-1 items-center">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
            <rect x="0" y="4" width="2" height="6" rx="1" opacity="0.4"/>
            <rect x="3" y="2.5" width="2" height="7.5" rx="1" opacity="0.6"/>
            <rect x="6" y="1" width="2" height="9" rx="1" opacity="0.8"/>
            <rect x="9" y="0" width="2" height="10" rx="1"/>
          </svg>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="white">
            <path d="M6 2.5 C8.5 2.5 10.5 4 11.5 6 L10 7.5 C9.5 5.8 8 4.5 6 4.5 C4 4.5 2.5 5.8 2 7.5 L0.5 6 C1.5 4 3.5 2.5 6 2.5Z" opacity="0.7"/>
            <path d="M6 5.5 C7.5 5.5 8.8 6.3 9.5 7.5 L8 9 C7.5 8 6.8 7.5 6 7.5 C5.2 7.5 4.5 8 4 9 L2.5 7.5 C3.2 6.3 4.5 5.5 6 5.5Z"/>
            <circle cx="6" cy="9.5" r="1" fill="white"/>
          </svg>
          <div className="flex items-center gap-0.5">
            <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid rgba(255,255,255,0.6)", padding: 1.5 }}>
              <div style={{ width: "80%", height: "100%", borderRadius: 1.5, background: "#4cd964" }} />
            </div>
          </div>
        </div>
      </div>
      {/* Screen content */}
      <div className="absolute inset-0 overflow-hidden">
        {children}
      </div>
      {/* Bottom home bar */}
      <div className="absolute bottom-2 left-1/2 z-20"
        style={{ transform: "translateX(-50%)", width: 100, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.3)" }}
      />
    </div>
  );
}

/* ── Single Post ── */
function Post({ post }: { post: typeof posts[0] }) {
  return (
    <div className="relative w-full flex-shrink-0"
      style={{ height: "clamp(432px, 64vw, 564px)", background: post.gradient }}>
      {/* Fake video play area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[64px] opacity-30 select-none">{post.emoji}</div>
      </div>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "72%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-full bg-white/70"
        />
      </div>
      {/* Right sidebar icons */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4">
        {[
          { icon: "♥", count: post.likes },
          { icon: "💬", count: post.comments },
          { icon: "↗", count: "Share" },
        ].map(({ icon, count }) => (
          <div key={count} className="flex flex-col items-center gap-0.5">
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-sm text-white">
              {icon}
            </div>
            <span className="font-sans text-[9px] text-white/80">{count}</span>
          </div>
        ))}
        {/* Music disc */}
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xs">
          🎵
        </div>
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-8 left-3 right-14">
        <p className="font-sans text-[11px] font-bold text-white mb-1">{post.username}</p>
        <p className="font-sans text-[10px] text-white/80 leading-snug">{post.caption}</p>
      </div>
      {/* TikTok header */}
      <div className="absolute top-6 left-0 right-0 flex justify-center gap-4 pt-4">
        <span className="font-sans text-[11px] text-white/50">Following</span>
        <span className="font-sans text-[11px] text-white font-bold border-b border-white pb-0.5">For You</span>
      </div>
    </div>
  );
}

/* ── Main Scene ── */
export default function ScenePhone() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [currentPost, setCurrentPost] = useState(0);

  useEffect(() => {
    // Swipe through posts
    const swipe1 = setTimeout(() => setCurrentPost(1), 2200);
    const swipe2 = setTimeout(() => setCurrentPost(2), 4200);
    // Start zoom-out
    const zoom = setTimeout(() => setPhase(1), 5500);
    // First text line
    const text1 = setTimeout(() => setPhase(2), 7000);
    // Second text line
    const text2 = setTimeout(() => setPhase(3), 8400);
    return () => [swipe1, swipe2, zoom, text1, text2].forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#030305" }}>

      {/* Screen glow behind phone */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ opacity: phase >= 1 ? 0 : 1 }}
        transition={{ duration: 1.5 }}
        style={{
          width: "50vw", height: "70vh",
          background: "radial-gradient(ellipse, rgba(100,149,237,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Phone */}
      <motion.div
        animate={{
          scale: phase === 0 ? 1 : phase === 1 ? 0.55 : 0.3,
          opacity: phase >= 2 ? 0 : 1,
          y: phase >= 1 ? -20 : 0,
        }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <PhoneFrame>
          <motion.div
            animate={{ y: currentPost * -100 + "%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
            style={{ height: `${posts.length * 100}%` }}
          >
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </motion.div>
        </PhoneFrame>
      </motion.div>

      {/* Manifesto text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20">
        <AnimatePresence>
          {phase >= 2 && (
            <motion.p
              key="line1"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="display-font font-light text-[#8a8278] leading-tight tracking-wide"
              style={{ fontSize: "clamp(24px, 5vw, 64px)" }}
            >
              You were not created to consume.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              key="line2"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="display-font font-light text-[#C9A84C] leading-tight tracking-wide mt-4"
              style={{ fontSize: "clamp(24px, 5vw, 64px)" }}
            >
              You were created to build.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              key="line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-6 h-px w-16 bg-[#C9A84C]/50"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
