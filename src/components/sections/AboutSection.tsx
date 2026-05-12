"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const VALUES = [
  {
    label: "01 — Restraint",
    body: "We remove before we add. Every element earns its place.",
  },
  {
    label: "02 — Honesty",
    body: "We don't dress things up. We reveal what's already there.",
  },
  {
    label: "03 — Precision",
    body: "Details make the difference between good and unforgettable.",
  },
  {
    label: "04 — Longevity",
    body: "We build for years — not trends.",
  },
];

/* ─── Manifesto ticker ─── */
function ManifestoTicker() {
  const text = "We Reveal · Not Invent · Visual Truth · Cinematic Craft · Lagos Made · ";
  const repeated = text.repeat(6);

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "1rem 0",
        margin: "clamp(3rem, 6vh, 5rem) 0",
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
          letterSpacing: "0.06em",
          color: "var(--color-dim)",
          gap: "0",
        }}
      >
        {repeated}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════ */
export function AboutSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const valuesRef  = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-15%" });
  const isValuesInView  = useInView(valuesRef,  { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Vattostudio"
      style={{
        padding: "clamp(5rem, 10vh, 9rem) 0",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        {/* Top grid — label + headline + body */}
        <div
          ref={headingRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(2.5rem, 5vw, 5rem)",
          }}
          className="md:grid-cols-2"
        >
          {/* Left — headline */}
          <div>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)" }} />
              <span className="label-gold">The Studio</span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
                animate={isHeadingInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
                transition={{ delay: 0.1, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(3rem, 7vw, 6.5rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 0.93,
                  color: "var(--color-white)",
                }}
              >
                Built From
                <br />
                Lagos.
                <br />
                <span
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                  }}
                >
                  Felt Worldwide.
                </span>
              </motion.h2>
            </div>
          </div>

          {/* Right — body copy */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "1.5rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(1rem, 1.4vw, 1.1875rem)",
                lineHeight: 1.75,
                color: "var(--color-white)",
              }}
            >
              Vattostudio is a creative production studio rooted in Lagos, Nigeria.
              We work with brands that want more than visibility — they want meaning.
            </p>
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color: "var(--color-dim)",
              }}
            >
              We don&apos;t invent identities. We excavate them. Through deep strategy,
              precise craft, and cinematic production — we surface what was always true
              about your brand and build an undeniable world around it.
            </p>

            {/* Studio meta */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--color-border)",
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
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.5625rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-dim)",
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize: "0.875rem",
                      color: "var(--color-white)",
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

        {/* Values grid */}
        <div ref={valuesRef}>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-gold"
            style={{ marginBottom: "2rem" }}
          >
            What We Stand For
          </motion.p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "1px",
              background: "var(--color-border)",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {VALUES.map((value, i) => (
              <motion.div
                key={value.label}
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={isValuesInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                style={{
                  background: "var(--color-bg)",
                  padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  transition: "background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-bg)";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  {value.label}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                    lineHeight: 1.65,
                    color: "var(--color-white)",
                  }}
                >
                  {value.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
