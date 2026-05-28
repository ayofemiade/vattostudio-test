"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const VALUES = [
  {
    label: "01",
    title: "Restraint",
    body:  "We remove before we add. Every element earns its place.",
  },
  {
    label: "02",
    title: "Honesty",
    body:  "We don't dress things up. We reveal what's already there.",
  },
  {
    label: "03",
    title: "Precision",
    body:  "Details make the difference between good and unforgettable.",
  },
  {
    label: "04",
    title: "Longevity",
    body:  "We build for years — not trends.",
  },
];

/* ─── Manifesto Ticker with liquid scroll-velocity skewing ─── */
function ManifestoTicker() {
  const words = [
    "We Reveal",
    "·",
    "Not Invent",
    "·",
    "Visual Truth",
    "·",
    "Cinematic Craft",
    "·",
    "Lagos Made",
    "·",
    "Felt Worldwide",
    "·",
  ];
  const text = words.join("  ");
  const repeated = `${text}  ${text}  `;

  /* Scroll velocity tracking */
  const { scrollY }    = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  /* Map scroll velocity to horizontal text skewing (-8deg to 8deg) */
  const skewX          = useTransform(scrollVelocity, [-2000, 2000], [-8, 8]);
  const skewXSpring    = useSpring(skewX, { stiffness: 90, damping: 25 });

  return (
    <div
      style={{
        overflow:     "hidden",
        borderTop:    "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding:      "1.125rem 0",
        margin:       "clamp(3.5rem, 7vh, 6rem) 0",
        position:     "relative",
      }}
      aria-hidden="true"
    >
      {/* Left + right fade overlays */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to right, var(--color-bg) 0%, transparent 8%, transparent 92%, var(--color-bg) 100%)",
          zIndex:     1,
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        style={{
          display:    "flex",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-bebas)",
          fontSize:   "clamp(1.25rem, 2.5vw, 2.25rem)",
          letterSpacing: "0.05em",
          color:      "transparent",
          WebkitTextStroke: "1px rgba(136,136,128,0.35)",
          gap:        "0",
          skewX:      skewXSpring,
        }}
      >
        {repeated}
        <span style={{ color: "var(--color-gold)", WebkitTextStroke: "none", opacity: 0.6 }}>
          &nbsp;·&nbsp;
        </span>
        {repeated}
      </motion.div>
    </div>
  );
}

/* ─── Premium Value Card with active React-Motion hover reveals ─── */
function ValueCard({ value, index, isInView }: {
  value: typeof VALUES[0];
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:    "clamp(1.75rem, 3vw, 2.5rem)",
        borderTop:  "1px solid rgba(255,255,255,0.06)",
        position:   "relative",
        overflow:   "hidden",
        background: hovered ? "rgba(201,168,76,0.02)" : "transparent",
        transition: "background 0.45s var(--ease-cinematic)",
      }}
    >
      {/* Top accent line sliding horizontal reveal */}
      <motion.div
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          height:     "1px",
          background: "var(--color-gold)",
        }}
      />

      {/* Index Number + Title with micro translations */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.875rem",
          marginBottom: "1.25rem",
          transform: hovered ? "translateY(-2px)" : "translateY(0px)",
          transition: "transform 0.4s var(--ease-cinematic)",
        }}
      >
        <span
          style={{
            fontFamily:    "var(--font-ibm-plex-mono)",
            fontSize:      "0.5625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         hovered ? "var(--color-gold)" : "var(--color-dim)",
            transform:     hovered ? "translateX(4px)" : "translateX(0px)",
            transition:    "all 0.4s var(--ease-cinematic)",
            display:       "inline-block",
          }}
        >
          {value.label}
        </span>
        <h3
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "0.04em",
            color:         "var(--color-white)",
            lineHeight:    1,
          }}
        >
          {value.title}
        </h3>
      </div>

      <p
        style={{
          fontFamily: "var(--font-satoshi)",
          fontSize:   "clamp(0.9rem, 1.2vw, 1rem)",
          lineHeight: 1.7,
          color:      hovered ? "rgba(255,255,255,0.75)" : "var(--color-dim)",
          transform:  hovered ? "translateY(-1px)" : "translateY(0px)",
          transition: "all 0.4s var(--ease-cinematic)",
        }}
      >
        {value.body}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ABOUT COMPONENT (THE STUDIO)
   ═══════════════════════════════════════════ */
export function AboutSection() {
  const headingRef           = useRef<HTMLDivElement>(null);
  const valuesRef            = useRef<HTMLDivElement>(null);
  const isHeadingInView      = useInView(headingRef, { once: true, margin: "-12%" });
  const isValuesInView       = useInView(valuesRef,  { once: true, margin: "-8%"  });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Vattostudio"
      style={{
        padding:    "clamp(6rem, 11vh, 10rem) 0",
        background: "var(--color-bg)",
        borderTop:  "1px solid rgba(255,255,255,0.06)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Top-right ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "-5%",
          right:         "-5%",
          width:         "45vw",
          height:        "45vh",
          background:    "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin:   "0 auto",
          padding:  "0 clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        {/* Top grid: Headline + body copy */}
        <div
          ref={headingRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr",
            gap:                 "clamp(3rem, 6vw, 6rem)",
          }}
          className="md:grid-cols-2"
        >
          {/* Left Column — Headline & Lagos Worldwide Graphic */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isHeadingInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)", transformOrigin: "left" }}
                />
                <span className="label-gold">The Studio</span>
              </motion.div>

              <div style={{ overflow: "hidden" }}>
                <motion.h2
                  initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
                  animate={isHeadingInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    fontFamily:    "var(--font-bebas)",
                    fontSize:      "clamp(3.5rem, 7vw, 7rem)",
                    letterSpacing: "0.01em",
                    lineHeight:    0.92,
                    color:         "var(--color-white)",
                  }}
                >
                  Built From Lagos.
                  <br />
                  <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>
                    Felt Worldwide.
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Lagos to Worldwide interactive visual graphic */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 35 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                marginTop: "2.5rem",
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
                position: "relative",
              }}
              className="group cursor-default"
            >
              <Image
                src="/lagos_worldwide.png"
                alt="Lagos Worldwide Creative Network"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  filter: "grayscale(10%) brightness(0.85) contrast(1.1)",
                  transition: "transform 0.8s var(--ease-cinematic)",
                }}
                className="group-hover:scale-105"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(201,168,76,0.04) 0%, transparent 70%)",
                  opacity: 0,
                  transition: "opacity 0.6s",
                  pointerEvents: "none",
                }}
                className="group-hover:opacity-100"
              />
            </motion.div>
          </div>

          {/* Right Column — Body copy + studio meta grid */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "1.75rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(1rem, 1.4vw, 1.25rem)",
                lineHeight: 1.75,
                color:      "var(--color-white)",
              }}
            >
              Vattostudio is a creative production studio rooted in Lagos, Nigeria.
              We work with brands that want more than visibility — they want meaning.
            </p>
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.9rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color:      "var(--color-dim)",
              }}
            >
              We don&apos;t invent identities. We excavate them. Through deep strategy,
              precise craft, and cinematic production — we surface what was always true
              about your brand and build an undeniable world around it.
            </p>

            {/* Studio Meta Table */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "1.5rem 1.25rem",
                marginTop:           "0.5rem",
                paddingTop:          "1.75rem",
                borderTop:           "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                { label: "Founded",   value: "2021" },
                { label: "Location",  value: "Lagos, NG" },
                { label: "Team size", value: "Tight. Intentional." },
                { label: "Approach",  value: "Quality over volume" },
              ].map((item) => (
                <div key={item.label}>
                  <span
                    style={{
                      fontFamily:    "var(--font-ibm-plex-mono)",
                      fontSize:      "0.5rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color:         "var(--color-dim)",
                      display:       "block",
                      marginBottom:  "0.35rem",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize:   "0.9375rem",
                      color:      "var(--color-white)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dynamic velocity-skewed ticker */}
        <ManifestoTicker />

        {/* Values Section Header */}
        <motion.div
          ref={valuesRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}
        >
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)" }} />
          <span className="label-gold">What We Stand For</span>
        </motion.div>

        {/* Asymmetric value bento grid */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            marginTop:           "0",
          }}
        >
          {VALUES.map((value, i) => (
            <ValueCard
              key={value.label}
              value={value}
              index={i}
              isInView={isValuesInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
