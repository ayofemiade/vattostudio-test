"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealMask } from "@/components/ui/RevealMask";

/* ════════════════════════════════════════════
   BLADE GEOMETRY
   Generates an SVG path for one aperture blade.
   Each blade is an arc-bounded wedge shape.
════════════════════════════════════════════ */
function bladeD(innerR: number, outerR: number, spanDeg: number): string {
  const h = spanDeg / 2;
  const pt = (R: number, d: number): [number, number] => [
    +(R * Math.sin((d * Math.PI) / 180)).toFixed(3),
    +(-(R * Math.cos((d * Math.PI) / 180))).toFixed(3),
  ];
  const [x1, y1] = pt(innerR, -h);
  const [x2, y2] = pt(outerR, -h);
  const [x3, y3] = pt(outerR, +h);
  const [x4, y4] = pt(innerR, +h);
  const la = spanDeg > 180 ? 1 : 0;
  return [
    `M${x1},${y1}`,
    `L${x2},${y2}`,
    `A${outerR},${outerR} 0 ${la},1 ${x3},${y3}`,
    `L${x4},${y4}`,
    `A${innerR},${innerR} 0 ${la},0 ${x1},${y1}Z`,
  ].join(" ");
}

/* Pre-compute blade paths so they're never recalculated */
const N_BLADES    = 8;
const MAIN_BLADE  = bladeD(50, 148, 56);   /* outer iris blades */
const INNER_BLADE = bladeD(26, 48, 38);    /* inner counter-rotating detail */

/* ════════════════════════════════════════════
   CAMERA APERTURE — The Signature 3D Element
   
   A cinematic camera iris built in SVG.
   Layers: outer ticking ring → static ring →
           scroll-driven iris blades →
           counter-rotating inner blades →
           pulsing center lens
════════════════════════════════════════════ */
interface ApertureProps {
  x:           MotionValue<number>;
  y:           MotionValue<number>;
  scale:       MotionValue<number>;
  opacity:     MotionValue<number>;
  bladeRotate: MotionValue<number>;
}

function CameraAperture({ x, y, scale, opacity, bladeRotate }: ApertureProps) {
  const toRad = (d: number) => (d * Math.PI) / 180;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position:   "absolute",
        right:      "clamp(-120px, -4vw, -40px)",
        top:        "50%",
        x,
        y,
        translateY: "-50%",
        scale,
        opacity,
        width:  "clamp(280px, 42vw, 560px)",
        height: "clamp(280px, 42vw, 560px)",
        zIndex: 3,
        pointerEvents: "none",
        willChange:    "transform, opacity",
      }}
    >
      <svg
        viewBox="-185 -185 370 370"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Radial glow at center */}
          <radialGradient id="cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(201,168,76,0.14)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </radialGradient>
          {/* Blade fill gradient (gives depth) */}
          <radialGradient id="bg" cx="50%" cy="50%" r="80%">
            <stop offset="0%"   stopColor="rgba(201,168,76,0.06)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0.10)" />
          </radialGradient>
        </defs>

        {/* Ambient center glow */}
        <circle r="90" fill="url(#cg)" />

        {/* ── Layer 1: Outer rotating ring + ticks ── */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 110, ease: "linear", repeat: Infinity }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <circle r="172" fill="none" stroke="rgba(201,168,76,0.10)" strokeWidth="1" />
          {Array.from({ length: 48 }, (_, i) => {
            const a    = i * 7.5;
            const main = i % 8 === 0;
            const r1   = 168, r2 = main ? 155 : 162;
            const rad  = toRad(a);
            const x1 = r1 * Math.sin(rad), y1 = -r1 * Math.cos(rad);
            const x2 = r2 * Math.sin(rad), y2 = -r2 * Math.cos(rad);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={`rgba(201,168,76,${main ? 0.38 : 0.14})`}
                strokeWidth={main ? "1.5" : "0.7"}
              />
            );
          })}
        </motion.g>

        {/* ── Layer 2: Static secondary ring ── */}
        <circle r="152" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="0.6" />

        {/* ── Layer 3: Main iris blades (scroll-driven close) ── */}
        <motion.g style={{ rotate: bladeRotate, originX: "50%", originY: "50%" }}>
          {Array.from({ length: N_BLADES }, (_, i) => (
            <path
              key={i}
              d={MAIN_BLADE}
              transform={`rotate(${(i * 360) / N_BLADES})`}
              fill="url(#bg)"
              stroke="rgba(201,168,76,0.24)"
              strokeWidth="0.7"
              strokeLinejoin="round"
            />
          ))}
        </motion.g>

        {/* ── Layer 4: Inner counter-rotating mechanical detail ── */}
        <motion.g
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
          style={{ originX: "50%", originY: "50%" }}
        >
          {Array.from({ length: 4 }, (_, i) => (
            <path
              key={i}
              d={INNER_BLADE}
              transform={`rotate(${i * 90 + 22.5})`}
              fill="rgba(201,168,76,0.09)"
              stroke="rgba(201,168,76,0.30)"
              strokeWidth="0.6"
            />
          ))}
        </motion.g>

        {/* ── Layer 5: Inner rings ── */}
        <circle r="49" fill="none" stroke="rgba(201,168,76,0.22)" strokeWidth="0.9" />
        <circle r="28" fill="none" stroke="rgba(201,168,76,0.13)" strokeWidth="0.5" />

        {/* ── Layer 6: Crosshairs (gap between inner/outer blades) ── */}
        <line x1="-148" y1="0" x2="-51" y2="0" stroke="rgba(201,168,76,0.07)" strokeWidth="0.5" />
        <line x1="51"   y1="0" x2="148" y2="0" stroke="rgba(201,168,76,0.07)" strokeWidth="0.5" />
        <line x1="0" y1="-148" x2="0" y2="-51" stroke="rgba(201,168,76,0.07)" strokeWidth="0.5" />
        <line x1="0" y1="51"   x2="0" y2="148" stroke="rgba(201,168,76,0.07)" strokeWidth="0.5" />

        {/* ── Layer 7: Pulsing center lens ── */}
        <motion.circle
          cx="0"
          cy="0"
          r="18"
          fill="rgba(201,168,76,0.08)"
          stroke="rgba(201,168,76,0.5)"
          strokeWidth="1.2"
          animate={{ scale: [1, 1.22, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
          style={{
            transformBox:    "fill-box",
            transformOrigin: "center",
          }}
        />

        {/* ── Center dot ── */}
        <motion.circle
          r="3.5"
          fill="rgba(201,168,76,0.95)"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   FILM FRAME CORNERS — Editorial Viewfinder
════════════════════════════════════════════ */
function FilmCorners({ opacity }: { opacity: MotionValue<number> }) {
  const L   = 28;
  const c   = "rgba(201,168,76,0.32)";
  const t   = "1.5px solid";
  const off = "clamp(1rem, 2.5vw, 2rem)";

  return (
    <motion.div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none", opacity }}
    >
      <div style={{ position: "absolute", top: off, left: off, width: L, height: L, borderTop: `${t} ${c}`, borderLeft: `${t} ${c}` }} />
      <div style={{ position: "absolute", top: off, right: off, width: L, height: L, borderTop: `${t} ${c}`, borderRight: `${t} ${c}` }} />
      <div style={{ position: "absolute", bottom: off, left: off, width: L, height: L, borderBottom: `${t} ${c}`, borderLeft: `${t} ${c}` }} />
      <div style={{ position: "absolute", bottom: off, right: off, width: L, height: L, borderBottom: `${t} ${c}`, borderRight: `${t} ${c}` }} />
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   SCENE LABEL — "Scene 01" with REC blink
   Appears briefly then fades — film aesthetic
════════════════════════════════════════════ */
function SceneLabel() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.55, 0.55, 0] }}
      transition={{ times: [0, 0.12, 0.78, 1], duration: 5, delay: 1.2 }}
      style={{
        position:      "absolute",
        top:           "calc(var(--nav-height) + 1.5rem)",
        right:         "clamp(1.25rem, 5vw, 3rem)",
        zIndex:        6,
        display:       "flex",
        alignItems:    "center",
        gap:           "0.625rem",
        pointerEvents: "none",
      }}
    >
      {/* Blinking REC indicator */}
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.75, repeat: 6, repeatType: "loop" }}
        style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-gold)" }}
      />
      <span style={{
        fontFamily:    "var(--font-ibm-plex-mono)",
        fontSize:      "0.5rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color:         "rgba(201,168,76,0.65)",
      }}>
        Scene 01
      </span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   SCAN LINE — viewfinder sweep (atmospheric)
════════════════════════════════════════════ */
function ScanLine() {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        /* x has 4 keyframes — MUST match length of times array */
        x:       ["-10%", "-10%", "110%", "110%"],
        opacity: [0,      0.45,   0.45,   0],
      }}
      transition={{
        duration:    1.4,
        ease:        [0.25, 0.46, 0.45, 0.94],
        times:       [0,    0.08, 0.92, 1],
        repeat:      Infinity,
        repeatDelay: 11,
        delay:       4,
      }}
      style={{
        position:   "absolute",
        top:        "49.5%",
        left:       0,
        width:      "120px",
        height:     "1px",
        background: "linear-gradient(to right, transparent, rgba(201,168,76,0.55), transparent)",
        zIndex:     4,
        pointerEvents: "none",
      }}
    />
  );
}


/* ════════════════════════════════════════════
   SCROLL INDICATOR
════════════════════════════════════════════ */
function ScrollIndicator({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      style={{
        position:  "absolute",
        bottom:    "clamp(2rem, 4vh, 3rem)",
        left:      "50%",
        transform: "translateX(-50%)",
        display:   "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:        "0.75rem",
        zIndex:     10,
      }}
    >
      <span style={{
        fontFamily:    "var(--font-ibm-plex-mono)",
        fontSize:      "0.5rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color:         "rgba(136,136,128,0.55)",
      }}>
        Scroll
      </span>
      <div style={{ width: "1px", height: "48px", background: "rgba(30,30,30,0.8)", position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            width:      "100%",
            background: "linear-gradient(to bottom, var(--color-gold), transparent)",
          }}
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   AMBIENT ORBS
════════════════════════════════════════════ */
function AmbientOrbs() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
      {/* Primary warm uplift from bottom */}
      <motion.div
        animate={{ opacity: [0.08, 0.14, 0.08], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        style={{
          position:   "absolute",
          bottom:     "-5%",
          left:       "50%",
          transform:  "translateX(-50%)",
          width:      "90vw",
          height:     "70vh",
          background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)",
          filter:     "blur(2px)",
        }}
      />
      {/* Right-side aperture ambient — mirrors the aperture glow */}
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 3 }}
        style={{
          position:   "absolute",
          top:        "20%",
          right:      "-5%",
          width:      "40vw",
          height:     "60vh",
          background: "radial-gradient(ellipse at 100% 50%, rgba(201,168,76,0.10) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   STAT ITEM
════════════════════════════════════════════ */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <span style={{
        fontFamily:    "var(--font-bebas)",
        fontSize:      "clamp(1.5rem, 3vw, 2.5rem)",
        color:         "var(--color-gold)",
        lineHeight:    1,
        letterSpacing: "0.04em",
      }}>
        {value}
      </span>
      <span style={{
        fontFamily:    "var(--font-ibm-plex-mono)",
        fontSize:      "0.5625rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         "var(--color-dim)",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════
   ANIMATION VARIANTS
════════════════════════════════════════════ */
const maskReveal = {
  hidden:  { clipPath: "inset(100% 0 0 0)", y: 18 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    y:        0,
    transition: {
      delay,
      duration: 1.1,
      ease:     [0.76, 0, 0.24, 1] as const,
    },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y:       0,
    transition: {
      delay,
      duration: 0.9,
      ease:     [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

/* ════════════════════════════════════════════════════════
   HERO SECTION — The Film Chamber

   Emotional arc:
   ENTER → cinematic atmosphere, aperture breathing →
   CURSOR → reveals imagery through spotlight →
   SCROLL → text parallaxes up, aperture closes (iris cut),
             background zooms in (camera push), dark veil
             rises = seamless "scene change" to next section
════════════════════════════════════════════════════════ */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef         = useRef<HTMLElement>(null);

  /* ── Mouse parallax for aperture via Framer spring ── */
  const rawX      = useMotionValue(0);
  const rawY      = useMotionValue(0);
  const apertureX = useSpring(rawX, { stiffness: 48, damping: 18 });
  const apertureY = useSpring(rawY, { stiffness: 48, damping: 18 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 24);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 18);
    },
    [rawX, rawY]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [prefersReducedMotion, onMouseMove]);

  /* ── Scroll-driven cinematic transition ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* 
    Text: slides up + fades as hero exits viewport.
    The subtle scale-up creates the "camera pushing in" sensation. 
  */
  const textY       = useTransform(scrollYProgress, [0, 0.7],  [0, -130]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.52], [1, 0]);
  const textScale   = useTransform(scrollYProgress, [0, 0.7],  [1, 1.06]);

  /* 
    Aperture blades rotate inward as you scroll — the iris closing.
    Simultaneously shrinks and fades = "cut to black" metaphor. 
  */
  const bladeRotate     = useTransform(scrollYProgress, [0, 0.82], [0, 32]);
  const apertureScale   = useTransform(scrollYProgress, [0, 0.82], [1, 0.58]);
  const apertureOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  /* Background zooms in subtly — the camera pushes toward subject */
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  /* 
    Veil: darkens with an elliptical radial gradient as the iris closes.
    The edges darken first (like a real iris), then the center follows. 
  */
  const veilOpacity    = useTransform(scrollYProgress, [0, 0.72], [0, 0.82]);
  const cornersOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);

  const d = 0.1; /* base animation delay */

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Hero — We Reveal, Not Invent"
      style={{
        position:   "relative",
        minHeight:  "100svh",
        display:    "flex",
        alignItems: "center",
        overflow:   "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* ── Background layer: reveal mask + scroll zoom ── */}
      <motion.div
        style={{ position: "absolute", inset: 0, zIndex: 0, scale: bgScale }}
      >
        <RevealMask
          src="/hero-visual.png"
          radius={190}
          revealedOpacity={0.72}
          hiddenOpacity={0.07}
        />
      </motion.div>

      {/* ── Cinematic iris veil — darkens elliptically on scroll ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse 65% 65% at center, transparent 20%, rgba(10,10,10,0.96) 100%)",
          opacity:    veilOpacity,
          zIndex:     5,
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient orbs ── */}
      <AmbientOrbs />

      {/* ── Film frame corners (viewfinder aesthetic) ── */}
      <FilmCorners opacity={cornersOpacity} />

      {/* ── Scene 01 label ── */}
      <SceneLabel />

      {/* ── Horizontal scan line (viewfinder sweep) ── */}
      {!prefersReducedMotion && <ScanLine />}

      {/* ── Camera Aperture ── */}
      <CameraAperture
        x={apertureX}
        y={apertureY}
        scale={apertureScale}
        opacity={apertureOpacity}
        bladeRotate={bladeRotate}
      />

      {/* ════════════════════════════════════════
          MAIN CONTENT — parallaxes out on scroll
         ════════════════════════════════════════ */}
      <motion.div
        style={{
          position:    "relative",
          zIndex:      10,
          width:       "100%",
          maxWidth:    "1440px",
          margin:      "0 auto",
          padding:     "calc(var(--nav-height) + clamp(3rem, 8vh, 6rem)) clamp(1.25rem, 5vw, 3rem) clamp(7rem, 12vh, 10rem)",
          y:           textY,
          opacity:     textOpacity,
          scale:       textScale,
          willChange:  "transform, opacity",
        }}
      >
        {/* ── Top label ── */}
        <motion.div
          variants={prefersReducedMotion ? {} : fadeUp}
          custom={d + 0.2}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(2rem, 4vh, 3.5rem)" }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: d + 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: "block", width: "36px", height: "1px", background: "var(--color-gold)", transformOrigin: "left" }}
          />
          <span className="label-gold">Lagos, Nigeria · Est. 2021</span>
        </motion.div>

        {/* ── Headline: "WE REVEAL," on one line ── */}
        <h1
          aria-label="We Reveal, Not Invent."
          style={{
            fontFamily:   "var(--font-bebas)",
            letterSpacing: "0.01em",
            color:         "var(--color-white)",
            marginBottom:  "clamp(2rem, 3.5vh, 3rem)",
          }}
        >
          {/* 
            Line 1: WE REVEAL, — single line.
            "WE" white, "REVEAL," in gold.
            Font-size calibrated so the full string fits on one line
            at all viewport widths ≥ 320px.
          */}
          <span style={{ display: "block", overflow: "hidden", lineHeight: 0.88 }}>
            <motion.span
              style={{
                display:    "block",
                fontSize:   "clamp(3.5rem, 9.5vw, 9.5rem)",
                whiteSpace: "nowrap",
              }}
              custom={d + 0.4}
              variants={prefersReducedMotion ? {} : maskReveal}
              initial="hidden"
              animate="visible"
            >
              <span style={{ color: "var(--color-white)" }}>WE </span>
              <span style={{ color: "var(--color-gold)" }}>REVEAL,</span>
            </motion.span>
          </span>

          {/* 
            Line 2: NOT INVENT. — ghost/outline treatment.
            Indented to create typographic depth.
            Slightly smaller to establish visual hierarchy.
          */}
          <span style={{ display: "block", overflow: "hidden", lineHeight: 0.88, paddingLeft: "clamp(0rem, 5vw, 5.5rem)" }}>
            <motion.span
              style={{
                display:          "block",
                fontSize:         "clamp(2.5rem, 7vw, 7rem)",
                color:            "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.30)",
              }}
              custom={d + 0.62}
              variants={prefersReducedMotion ? {} : maskReveal}
              initial="hidden"
              animate="visible"
            >
              NOT INVENT.
            </motion.span>
          </span>
        </h1>

        {/* ── Subheadline ── */}
        <motion.p
          custom={d + 0.85}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-satoshi)",
            fontSize:   "clamp(0.9375rem, 1.5vw, 1.125rem)",
            lineHeight: 1.72,
            color:      "var(--color-dim)",
            maxWidth:   "42ch",
            marginBottom: "clamp(2.5rem, 5vh, 4rem)",
          }}
        >
          We find the truth in your brand and build visual worlds around it.
          No noise. No shortcuts. No invented identities.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          custom={d + 1.0}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2rem)", flexWrap: "wrap" }}
        >
          {/* Primary — View Our Work */}
          <Magnetic>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.625rem",
                fontFamily:    "var(--font-ibm-plex-mono)",
                fontSize:      "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                position:      "relative",
                overflow:      "hidden",
                color:         "var(--color-bg)",
                background:    "var(--color-gold)",
                padding:       "1rem 2.25rem",
                border:        "1px solid var(--color-gold)",
                transition:    "color 0.45s var(--ease-cinematic)",
              }}
              onMouseEnter={(e) => {
                const fill = e.currentTarget.querySelector<HTMLElement>("[data-fill]");
                if (fill) fill.style.transform = "translateX(0)";
                e.currentTarget.style.color = "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                const fill = e.currentTarget.querySelector<HTMLElement>("[data-fill]");
                if (fill) fill.style.transform = "translateX(-101%)";
                e.currentTarget.style.color = "var(--color-bg)";
              }}
            >
              <span
                data-fill
                aria-hidden="true"
                style={{
                  position:   "absolute",
                  inset:      0,
                  background: "#0A0A0A",
                  transform:  "translateX(-101%)",
                  transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
                  zIndex:     0,
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>View Our Work</span>
              <ArrowDown size={12} strokeWidth={1.5} style={{ position: "relative", zIndex: 1 }} />
            </a>
          </Magnetic>

          {/* Secondary — Start a Project */}
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor
              className="hover-gold-line"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.5rem",
                fontFamily:    "var(--font-ibm-plex-mono)",
                fontSize:      "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         "var(--color-dim)",
                transition:    "color 0.3s var(--ease-cinematic)",
                padding:       "0.5rem 0",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-white)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-dim)"; }}
            >
              Start a Project
            </a>
          </Magnetic>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          custom={d + 1.2}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display:     "flex",
            alignItems:  "flex-start",
            gap:         0,
            marginTop:   "clamp(4rem, 10vh, 9rem)",
            paddingTop:  "2rem",
            borderTop:   "1px solid rgba(30,30,30,0.8)",
            flexWrap:    "wrap",
          }}
        >
          <StatItem value="60+" label="Projects Delivered" />
          <div style={{ width: "1px", height: "40px", background: "var(--color-border)", alignSelf: "center", margin: "0 clamp(1.5rem, 3vw, 2.5rem)", flexShrink: 0 }} />
          <StatItem value="4+" label="Years Active" />
          <div style={{ width: "1px", height: "40px", background: "var(--color-border)", alignSelf: "center", margin: "0 clamp(1.5rem, 3vw, 2.5rem)", flexShrink: 0 }} />
          <StatItem value="3" label="Continents Reached" />

          <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d + 1.6, duration: 0.8 }}
              style={{
                fontFamily:    "var(--font-ibm-plex-mono)",
                fontSize:      "0.5rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color:         "rgba(136,136,128,0.45)",
                display:       "block",
                textAlign:     "right",
              }}
            >
              Creative Production Studio
              <br />
              <span style={{ color: "var(--color-gold)", opacity: 0.7 }}>Lagos, Nigeria</span>
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator delay={d + 1.8} />
    </section>
  );
}
