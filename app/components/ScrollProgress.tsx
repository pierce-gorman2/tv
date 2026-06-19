"use client";

import { useScroll, motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="fixed left-0 top-0 h-full w-px bg-white/[0.03] z-50 pointer-events-none">
      <motion.div style={{ scaleY, originY: 0 }} className="h-full bg-[#C9A84C]/50" />
    </div>
  );
}
