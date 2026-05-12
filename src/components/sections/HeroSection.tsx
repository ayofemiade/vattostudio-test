"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";

/* ─── Reveal from bottom mask — cinematic ─── */
const maskReveal = {
  hidden:  { clipPath: "inset(100% 0 0 0)", y: 20 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: {
      delay,
      duration: 1.0,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Scroll indicator ─── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.0, duration: 0.8 }}
      style={{
        position: "absolute",
        bottom: "clamp(2rem, 4vh, 3rem)",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.5625rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--color-dim)",
        }}
      >
        Scroll
      </span>
      <div
        style={{
          width: "1px",
          height: "48px",
          background: "var(--color-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            background: "var(--color-gold)",
          }}
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Studio stat item ─── */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <span
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          color: "var(--color-white)",
          lineHeight: 1,
          letterSpacing: "0.04em",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.5625rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-dim)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Ambient background glow ─── */
function AmbientGlow() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [0.15, 0]);

  return (
    <>
      {/* Background Image — Low opacity cinematic visual with parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity,
          pointerEvents: "none",
          y,
        }}
      >
        <Image
          src="/hero-visual.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", filter: "grayscale(50%)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Warm center-bottom glow — like a stage light from below */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Top-right subtle ambient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "40vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </>
  );
}

/* ─── Geometric background mark — large abstract V ─── */
function GeometricMark() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "clamp(-4rem, -2vw, 0rem)",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(280px, 45vw, 680px)",
        height: "clamp(280px, 45vw, 680px)",
        zIndex: 1,
        opacity: 0.035,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Large V letterform */}
        <polygon
          points="20,40 200,360 380,40 340,40 200,300 60,40"
          fill="white"
        />
        {/* Inner detail line */}
        <polygon
          points="70,40 200,270 330,40 310,40 200,250 90,40"
          fill="#0A0A0A"
        />
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  /* Subtle parallax on mouse move */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 8;
      const mark = container.querySelector<HTMLElement>("[data-parallax]");
      if (mark) {
        mark.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Hero — We Reveal, Not Invent"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* Backgrounds */}
      <AmbientGlow />
      <div data-parallax style={{
        position: "absolute",
        right: "clamp(-4rem, -2vw, 0rem)",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(280px, 45vw, 680px)",
        height: "clamp(280px, 45vw, 680px)",
        zIndex: 1,
        pointerEvents: "none",
        transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}>
        <GeometricMark />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "calc(var(--nav-height) + clamp(3rem, 8vh, 6rem)) clamp(1.25rem, 5vw, 3rem) clamp(6rem, 10vh, 8rem)",
        }}
      >
        {/* Top label */}
        <motion.div
          custom={0.3}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "clamp(2rem, 4vh, 3.5rem)",
          }}
        >
          <span
            style={{
              display: "block",
              width: "32px",
              height: "1px",
              background: "var(--color-gold)",
            }}
          />
          <span className="label-gold">Lagos, Nigeria · Est. 2021</span>
        </motion.div>

        {/* ── Headline ── */}
        <h1
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(5rem, 14vw, 14rem)",
            lineHeight: 0.9,
            letterSpacing: "0.01em",
            color: "var(--color-white)",
            maxWidth: "12ch",
            marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
          }}
          aria-label="We Reveal, Not Invent."
        >
          {/* Line 1 */}
          <span style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "block" }}
              custom={0.5}
              variants={prefersReducedMotion ? {} : maskReveal}
              initial="hidden"
              animate="visible"
            >
              We Reveal,
            </motion.span>
          </span>
          {/* Line 2 — slight indent for editorial rhythm */}
          <span
            style={{
              display: "block",
              overflow: "hidden",
              paddingLeft: "clamp(0rem, 4vw, 4rem)",
            }}
          >
            <motion.span
              style={{
                display: "block",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.5)",
              }}
              custom={0.75}
              variants={prefersReducedMotion ? {} : maskReveal}
              initial="hidden"
              animate="visible"
            >
              Not Invent.
            </motion.span>
          </span>
        </h1>

        {/* ── Subheadline ── */}
        <motion.p
          custom={1.0}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-satoshi)",
            fontSize: "clamp(0.9375rem, 1.5vw, 1.1875rem)",
            lineHeight: 1.65,
            color: "var(--color-dim)",
            maxWidth: "38ch",
            marginBottom: "clamp(2.5rem, 5vh, 4rem)",
          }}
        >
          We find the truth in your brand and build visual worlds around it.
          No noise. No shortcuts.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          custom={1.2}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2rem)", flexWrap: "wrap" }}
        >
          {/* Primary CTA */}
          <Magnetic>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#portfolio");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-bg)",
                background: "var(--color-gold)",
                padding: "1rem 2rem",
                borderRadius: "2px",
                border: "1px solid var(--color-gold)",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.color = "var(--color-gold)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "var(--color-gold)";
                el.style.color = "var(--color-bg)";
                el.style.transform = "translateY(0)";
              }}
            >
              View Our Work
              <ArrowDown size={12} strokeWidth={1.5} />
            </a>
          </Magnetic>

          {/* Secondary CTA */}
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#contact");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-dim)",
                transition: "color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                position: "relative",
                padding: "0.5rem 1rem",
              }}
              className="hover-gold-line"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-white)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-dim)"; }}
            >
              Start a Project
            </a>
          </Magnetic>
        </motion.div>

        {/* ── Bottom stats strip ── */}
        <motion.div
          custom={1.5}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(2rem, 5vw, 4rem)",
            marginTop: "clamp(4rem, 10vh, 8rem)",
            paddingTop: "2rem",
            borderTop: "1px solid var(--color-border)",
            flexWrap: "wrap",
          }}
        >
          <StatItem value="60+" label="Projects Delivered" />
          <StatItem value="4+" label="Years Active" />
          <StatItem value="3" label="Continents Reached" />
          <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-dim)",
                display: "block",
                textAlign: "right",
              }}
            >
              Creative Production Studio
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
