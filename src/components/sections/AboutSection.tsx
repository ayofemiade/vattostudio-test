"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

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

/* ─── Manifesto ticker ─── */
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

  return (
    <div
      style={{
        overflow:     "hidden",
        borderTop:    "1px solid rgba(30,30,30,0.7)",
        borderBottom: "1px solid rgba(30,30,30,0.7)",
        padding:      "1.125rem 0",
        margin:       "clamp(3.5rem, 7vh, 6rem) 0",
        position:     "relative",
      }}
      aria-hidden="true"
    >
      {/* Left + right fade */}
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

/* ─── Value card ─── */
function ValueCard({ value, index, isInView }: {
  value: typeof VALUES[0];
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        padding:    "clamp(1.75rem, 3vw, 2.5rem)",
        borderTop:  "1px solid rgba(30,30,30,0.7)",
        position:   "relative",
        overflow:   "hidden",
        transition: "background 0.45s var(--ease-cinematic)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {/* Gold accent line — top */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          width:      "0%",
          height:     "1px",
          background: "var(--color-gold)",
          transition: "width 0.5s var(--ease-cinematic)",
        }}
        className="value-accent-line"
      />
      <style>{`
        div:hover > .value-accent-line { width: 100% !important; }
      `}</style>

      {/* Number + title */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.875rem", marginBottom: "1.25rem" }}>
        <span
          style={{
            fontFamily:    "var(--font-ibm-plex-mono)",
            fontSize:      "0.5625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "var(--color-gold)",
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
          color:      "var(--color-dim)",
        }}
      >
        {value.body}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════ */
export function AboutSection() {
  const headingRef       = useRef<HTMLDivElement>(null);
  const valuesRef        = useRef<HTMLDivElement>(null);
  const isHeadingInView  = useInView(headingRef, { once: true, margin: "-12%" });
  const isValuesInView   = useInView(valuesRef,  { once: true, margin: "-8%"  });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Vattostudio"
      style={{
        padding:    "clamp(6rem, 11vh, 10rem) 0",
        background: "var(--color-bg)",
        borderTop:  "1px solid rgba(30,30,30,0.6)",
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
        {/* Top grid */}
        <div
          ref={headingRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr",
            gap:                 "clamp(3rem, 6vw, 6rem)",
          }}
          className="md:grid-cols-2"
        >
          {/* Left — headline */}
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
                  fontSize:      "clamp(3rem, 7vw, 7rem)",
                  letterSpacing: "0.01em",
                  lineHeight:    0.92,
                  color:         "var(--color-white)",
                }}
              >
                Built From
                <br />
                Lagos.
                <br />
                <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>
                  Felt Worldwide.
                </span>
              </motion.h2>
            </div>
          </div>

          {/* Right — body copy */}
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

            {/* Studio meta */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "1.25rem",
                marginTop:           "0.5rem",
                paddingTop:          "1.75rem",
                borderTop:           "1px solid rgba(30,30,30,0.7)",
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

        {/* Manifesto ticker */}
        <ManifestoTicker />

        {/* Values label */}
        <motion.div
          ref={valuesRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0" }}
        >
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)" }} />
          <span className="label-gold">What We Stand For</span>
        </motion.div>

        {/* Values grid — editorial */}
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
