"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping:   35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        height:          "1.5px",
        background:      "linear-gradient(to right, var(--color-gold), rgba(201,168,76,0.5))",
        transformOrigin: "0%",
        zIndex:          2000,
        scaleX,
      }}
      aria-hidden="true"
    />
  );
}
