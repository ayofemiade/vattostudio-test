"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─── Duration config ─── */
const INTRO_DURATION = 2800; // ms total

/* ─── Logo V Mark ─── */
function IntroLogoMark() {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      /*
        CSS handles the glow pulse — no filter conflict with Framer Motion.
        The "logo-pulse" @keyframes is defined in globals.css.
      */
      style={{ animation: "logo-pulse 3s ease-in-out infinite 1.2s" }}
    >
      <polygon points="2,4 16,28 30,4 26,4 16,21 6,4" fill="#C9A84C" />
    </motion.svg>
  );
}

/* ─── Studio name — letter by letter ─── */
function StudioName() {
  const letters = "VATTOSTUDIO".split("");
  return (
    <motion.div
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          "0.05em",
        fontFamily:   "var(--font-bebas)",
        fontSize:     "clamp(1.75rem, 4vw, 2.5rem)",
        letterSpacing: "0.12em",
        color:        "white",
        overflow:     "hidden",
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + i * 0.045, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─── Tagline reveal ─── */
function TaglineReveal() {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.p
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ delay: 1.45, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          fontFamily:    "var(--font-ibm-plex-mono)",
          fontSize:      "clamp(0.5rem, 1.2vw, 0.75rem)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color:         "var(--color-gold)",
          marginTop:     "0.875rem",
          whiteSpace:    "nowrap",
        }}
      >
        We Reveal, Not Invent.
      </motion.p>
    </div>
  );
}

/* ─── Gold cinematic sweep ─── */
function GoldSweep() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ delay: 1.6, duration: 0.6, times: [0, 0.1, 0.9, 1], ease: "linear" }}
      style={{
        position:   "absolute",
        top:        "50%",
        left:       0,
        right:      0,
        height:     "1px",
        background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6) 30%, rgba(201,168,76,0.8) 50%, rgba(201,168,76,0.6) 70%, transparent)",
        transform:  "translateY(56px)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Ambient grain layer ─── */
function IntroGrain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:          "absolute",
        inset:             0,
        backgroundImage:   `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat:  "repeat",
        backgroundSize:    "160px 160px",
        opacity:           0.06,
        mixBlendMode:      "overlay",
        pointerEvents:     "none",
      }}
    />
  );
}

/* ─── Ambient gold glow ─── */
function IntroGlow() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.2 }}
      aria-hidden="true"
      style={{
        position:   "absolute",
        bottom:     "-20%",
        left:       "50%",
        transform:  "translateX(-50%)",
        width:      "60vw",
        height:     "60vh",
        background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
        animation:  "ambient-breathe 4s ease-in-out infinite 0.8s",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   CINEMATIC INTRO
   
   Key design decisions:
   - AnimatePresence WRAPS the conditional {visible && ...}
     so the exit animation plays before DOM removal.
   - sessionStorage is always wrapped in try/catch (private
     mode browsers can block it and throw).
   - A 5s safety timer ensures onComplete() is ALWAYS called
     even if something goes wrong with the main timer.
   ═══════════════════════════════════════════ */
export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible]     = useState(true);
  const prefersReducedMotion      = useReducedMotion();

  useEffect(() => {
    /* Try reading sessionStorage — could be blocked in private mode */
    let played = false;
    try {
      played = !!sessionStorage.getItem("vatto-intro-played");
    } catch {
      played = false;
    }

    /* Skip immediately if already played or motion is reduced */
    if (played || prefersReducedMotion) {
      setVisible(false);
      onComplete();
      return;
    }

    /* Lock body scroll for the duration */
    document.body.classList.add("intro-active");

    /* Main completion timer */
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.classList.remove("intro-active");
      try {
        sessionStorage.setItem("vatto-intro-played", "1");
      } catch {
        /* Storage full or blocked — just continue */
      }
      onComplete();
    }, INTRO_DURATION);

    /*
      Safety fallback: if the main timer somehow fails to fire
      (edge case: tab throttled, StrictMode double-invoke, etc.)
      this ensures the intro ALWAYS completes within 5s max.
    */
    const safety = setTimeout(() => {
      setVisible(false);
      document.body.classList.remove("intro-active");
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(safety);
      document.body.classList.remove("intro-active");
    };
  }, [onComplete, prefersReducedMotion]);

  return (
    /*
      AnimatePresence MUST wrap the conditional content — not be
      inside the conditional — so it can detect the removal and
      play the exit animation before unmounting.
    */
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-intro"
          className="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
          }}
          role="progressbar"
          aria-label="Loading Vattostudio"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <IntroGrain />
          <IntroGlow />
          <GoldSweep />

          <div
            style={{
              position:      "relative",
              zIndex:        2,
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           "1.25rem",
            }}
          >
            <IntroLogoMark />
            <StudioName />
            <TaglineReveal />
          </div>

          {/* Bottom progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay:    0.2,
              duration: (INTRO_DURATION - 400) / 1000,
              ease:     "linear",
            }}
            style={{
              position:        "absolute",
              bottom:          0,
              left:            0,
              right:           0,
              height:          "1px",
              background:      "linear-gradient(to right, transparent, rgba(201,168,76,0.4) 40%, rgba(201,168,76,0.7) 70%, transparent)",
              transformOrigin: "left",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
