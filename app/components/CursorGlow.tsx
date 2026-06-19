"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        animate={{ x: pos.x - 300, y: pos.y - 300 }}
        transition={{ type: "spring", stiffness: 60, damping: 25, mass: 0.8 }}
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.055) 0%, rgba(201,168,76,0.01) 50%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
