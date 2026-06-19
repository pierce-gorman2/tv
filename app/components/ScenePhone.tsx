"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posts = [
  {
    gradient: "linear-gradient(155deg,#1a0030 0%,#6a0080 45%,#d500f9 100%)",
    topText: "For You",
    username: "@glossgirlera",
    caption: "get ready with me 💅 #grwm #fyp",
    likes: "284.3K", comments: "4.1K", shares: "12K",
    tag: "TRENDING",
    soundName: "original sound - glossgirlera",
  },
  {
    gradient: "linear-gradient(155deg,#000d1a 0%,#003566 45%,#0077b6 100%)",
    topText: "For You",
    username: "@coastalvibes",
    caption: "days like this 🌊 #aesthetic #summer",
    likes: "1.2M", comments: "9.8K", shares: "88K",
    tag: "🎵 Trending sound",
    soundName: "Golden Hour - JVKE",
  },
  {
    gradient: "linear-gradient(155deg,#0d0d0d 0%,#7f1d1d 45%,#dc2626 100%)",
    topText: "For You",
    username: "@fitscheck",
    caption: "rate this 1-10 🔥 #mensfashion #ootd",
    likes: "502K", comments: "31K", shares: "7.2K",
    tag: null,
    soundName: "CARNIVAL - ¥$, Kanye West",
  },
  {
    gradient: "linear-gradient(155deg,#020617 0%,#134e4a 45%,#14b8a6 100%)",
    topText: "For You",
    username: "@mondaymotivation",
    caption: "POV: you finally unbothered 😌 #peace #viral",
    likes: "3.4M", comments: "21K", shares: "140K",
    tag: "🔥 4.2M views",
    soundName: "telepatía - Kali Uchis",
  },
  {
    gradient: "linear-gradient(155deg,#111827 0%,#92400e 45%,#f59e0b 100%)",
    topText: "For You",
    username: "@moneymindset99",
    caption: "how i went from $0 to $10k/month 💰 #money",
    likes: "892K", comments: "14K", shares: "52K",
    tag: "💰 Finance",
    soundName: "original sound - moneymindset99",
  },
];

/* Sound wave bars */
function SoundWave() {
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 14 }}>
      {[4, 8, 12, 7, 10, 5, 11, 8, 4, 9].map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-white/70"
          style={{ width: 2, height: h }}
          animate={{ height: [h, h * 0.4, h * 1.2, h * 0.6, h] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.07,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* Floating heart */
function FloatingHeart({ trigger }: { trigger: boolean }) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          key="heart"
          initial={{ opacity: 1, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -120, scale: 1.4 }}
          exit={{}}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute right-8 bottom-32 text-3xl pointer-events-none z-30"
        >
          ❤️
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Phone frame */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: "clamp(190px, 28vw, 250px)",
        height: "clamp(412px, 60vw, 540px)",
        borderRadius: 46,
        background: "#080808",
        border: "2px solid rgba(255,255,255,0.14)",
        boxShadow:
          "0 0 60px rgba(140,100,255,0.22), 0 0 140px rgba(140,100,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Dynamic island */}
      <div className="absolute top-[10px] left-1/2 z-30"
        style={{ transform:"translateX(-50%)", width:100, height:26, borderRadius:20, background:"#000" }} />
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5"
        style={{ height: 42, paddingTop: 8 }}>
        <span className="font-sans text-[10px] text-white font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center opacity-90">
          {/* Signal */}
          <div className="flex gap-[2px] items-end">
            {[3,5,7,9].map((h,i) => <div key={i} style={{width:2,height:h,borderRadius:1,background:i<3?"white":"rgba(255,255,255,0.3)"}}/>)}
          </div>
          {/* WiFi */}
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path d="M7 8.5C7.8 8.5 8.5 9.2 8.5 10S7.8 11.5 7 11.5 5.5 10.8 5.5 10 6.2 8.5 7 8.5Z" fill="white"/>
            <path d="M3.5 6.5C4.5 5.3 5.7 4.5 7 4.5S9.5 5.3 10.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M1 4C2.8 2 4.8 1 7 1S11.2 2 13 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
          </svg>
          {/* Battery */}
          <div style={{width:22, height:11, borderRadius:3, border:"1.5px solid rgba(255,255,255,0.5)", padding:2}}>
            <div style={{width:"78%", height:"100%", borderRadius:1, background:"white"}}/>
          </div>
        </div>
      </div>
      {/* Screen */}
      <div className="absolute inset-0 overflow-hidden">{children}</div>
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[90px] w-[3px] h-[32px] rounded-l-sm bg-white/10"/>
      <div className="absolute -left-[3px] top-[130px] w-[3px] h-[52px] rounded-l-sm bg-white/10"/>
      <div className="absolute -left-[3px] top-[192px] w-[3px] h-[52px] rounded-l-sm bg-white/10"/>
      <div className="absolute -right-[3px] top-[130px] w-[3px] h-[72px] rounded-r-sm bg-white/10"/>
      {/* Home bar */}
      <div className="absolute bottom-2 left-1/2 z-30"
        style={{transform:"translateX(-50%)", width:90, height:4, borderRadius:4, background:"rgba(255,255,255,0.28)"}}/>
    </div>
  );
}

/* Post card */
function Post({ post, active }: { post: typeof posts[0]; active: boolean }) {
  const [heartVisible, setHeartVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setHeartVisible(true), 600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="relative w-full flex-shrink-0" style={{ height: "clamp(412px, 60vw, 540px)", background: post.gradient }}>
      {/* Video scrub bar at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/15 z-20">
        {active && (
          <motion.div initial={{ width:"0%" }} animate={{ width:"100%" }}
            transition={{ duration: 1.0, ease:"linear" }}
            className="h-full bg-white/60" />
        )}
      </div>
      {/* Trending tag */}
      {post.tag && (
        <div className="absolute top-10 left-3 z-20">
          <span className="font-sans text-[9px] bg-white/15 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/20">
            {post.tag}
          </span>
        </div>
      )}
      {/* Main icon/visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-7xl opacity-20 select-none">▶</div>
      </div>
      {/* Floating heart */}
      <FloatingHeart trigger={heartVisible} />
      {/* Right sidebar */}
      <div className="absolute right-2 bottom-16 flex flex-col items-center gap-4 z-20">
        {/* Avatar */}
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"/>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FE2C55] flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">+</span>
          </div>
        </div>
        {/* Like */}
        <div className="flex flex-col items-center gap-0.5">
          <motion.div animate={heartVisible ? { scale:[1,1.4,1] } : {}} transition={{ duration:0.3 }}
            className="w-9 h-9 flex items-center justify-center text-lg">
            {heartVisible ? "❤️" : "🤍"}
          </motion.div>
          <span className="font-sans text-[9px] text-white font-semibold">{post.likes}</span>
        </div>
        {/* Comment */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 flex items-center justify-center text-lg">💬</div>
          <span className="font-sans text-[9px] text-white font-semibold">{post.comments}</span>
        </div>
        {/* Share */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 flex items-center justify-center text-lg">↗️</div>
          <span className="font-sans text-[9px] text-white font-semibold">{post.shares}</span>
        </div>
        {/* Spinning disc */}
        <motion.div animate={{ rotate: 360 }} transition={{ repeat:Infinity, duration:3, ease:"linear" }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-white/30 flex items-center justify-center text-xs">
          🎵
        </motion.div>
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-12 left-3 right-14 z-20 space-y-1">
        <p className="font-sans text-[11px] font-bold text-white drop-shadow">{post.username}</p>
        <p className="font-sans text-[10px] text-white/85 leading-snug drop-shadow">{post.caption}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <SoundWave />
          <span className="font-sans text-[9px] text-white/60 truncate">{post.soundName}</span>
        </div>
      </div>
      {/* TikTok nav bar */}
      <div className="absolute top-8 left-0 right-0 flex justify-center gap-5 z-20">
        <span className="font-sans text-[11px] text-white/45 font-medium">Following</span>
        <span className="font-sans text-[11px] text-white font-bold border-b-2 border-white pb-0.5">For You</span>
        <span className="font-sans text-[11px] text-white/45 font-medium">Explore</span>
      </div>
      {/* TikTok logo */}
      <div className="absolute top-8 right-3 z-20">
        <span className="font-sans text-[13px] font-bold text-white drop-shadow" style={{fontFamily:"sans-serif"}}>TikTok</span>
      </div>
    </div>
  );
}

export default function ScenePhone() {
  const [postIndex, setPostIndex] = useState(0);
  const [phase, setPhase] = useState<0|1|2|3>(0);

  useEffect(() => {
    // Fast swipes: every ~1.1s
    const s1 = setTimeout(() => setPostIndex(1), 1100);
    const s2 = setTimeout(() => setPostIndex(2), 2200);
    const s3 = setTimeout(() => setPostIndex(3), 3200);
    const s4 = setTimeout(() => setPostIndex(4), 4100);
    // Zoom out starts
    const z  = setTimeout(() => setPhase(1), 4900);
    // First line
    const t1 = setTimeout(() => setPhase(2), 6100);
    // Second line
    const t2 = setTimeout(() => setPhase(3), 7400);
    return () => [s1,s2,s3,s4,z,t1,t2].forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ background:"#030305" }}>
      {/* Screen bloom */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ opacity: phase >= 1 ? 0 : 1 }}
        transition={{ duration: 1.2 }}
        style={{
          width:"55vw", height:"75vh",
          background:"radial-gradient(ellipse, rgba(160,100,255,0.16) 0%, transparent 70%)",
          filter:"blur(50px)",
        }}
      />
      {/* Notification banner */}
      <AnimatePresence>
        {postIndex === 2 && (
          <motion.div
            initial={{ y:-60, opacity:0 }}
            animate={{ y:0, opacity:1 }}
            exit={{ y:-60, opacity:0 }}
            transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
            className="absolute top-6 left-1/2 z-50 -translate-x-1/2"
            style={{ width:"clamp(180px,24vw,240px)" }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-3 py-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-black to-gray-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">T</div>
              <div>
                <p className="font-sans text-[9px] text-white/60">TikTok</p>
                <p className="font-sans text-[10px] text-white font-medium">New videos for you 🔥</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone */}
      <motion.div
        animate={{
          scale: phase === 0 ? 1 : phase === 1 ? 0.5 : 0.28,
          opacity: phase >= 2 ? 0 : 1,
          y: phase >= 1 ? -30 : 0,
          filter: phase >= 1 ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: phase === 1 ? 1.2 : 0.9, ease:[0.22,1,0.36,1] }}
        className="relative z-10"
      >
        <PhoneFrame>
          <motion.div
            animate={{ y: `${postIndex * -100}%` }}
            transition={{ duration: 0.38, ease:[0.22,1,0.36,1] }}
            className="flex flex-col"
            style={{ height:`${posts.length * 100}%` }}
          >
            {posts.map((post, i) => (
              <Post key={i} post={post} active={postIndex === i} />
            ))}
          </motion.div>
        </PhoneFrame>
      </motion.div>

      {/* Manifesto reveal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none z-20 space-y-5">
        <AnimatePresence>
          {phase >= 2 && (
            <motion.p key="l1"
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:1.1, ease:[0.22,1,0.36,1] }}
              className="display-font font-light leading-tight"
              style={{ fontSize:"clamp(22px,4.5vw,60px)", color:"rgba(200,192,176,0.7)" }}
            >
              You were not created to consume.
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase >= 3 && (
            <>
              <motion.p key="l2"
                initial={{ opacity:0, y:30 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:1.1, ease:[0.22,1,0.36,1] }}
                className="display-font font-light leading-tight text-[#C9A84C]"
                style={{ fontSize:"clamp(22px,4.5vw,60px)" }}
              >
                You were created to build.
              </motion.p>
              <motion.div key="line"
                initial={{ scaleX:0, opacity:0 }}
                animate={{ scaleX:1, opacity:1 }}
                transition={{ duration:0.9, delay:0.5 }}
                className="h-px w-14 bg-[#C9A84C]/50 mx-auto"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
