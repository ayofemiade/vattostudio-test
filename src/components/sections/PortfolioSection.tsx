"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Image from "next/image";

const WORKS = [
  {
    id: "01",
    title: "Achebe Spirits",
    category: "Brand Identity",
    year: "2024",
    description: "Complete visual identity for a luxury Nigerian spirits brand. From concept to label.",
    image: "/achebe.png",
    aspect: "4/5",
  },
  {
    id: "02",
    title: "Ìmọ̀lẹ̀ Films",
    category: "Film & Campaign",
    year: "2024",
    description: "Campaign production for an independent Nollywood production house.",
    image: "/imole.png",
    aspect: "3/4",
  },
  {
    id: "03",
    title: "Orisun Wellness",
    category: "Digital Experience",
    year: "2023",
    description: "Web presence and visual identity for a Lagos-based wellness brand.",
    image: "/orisun.png",
    aspect: "4/5",
  },
];

/* ─── Single work card ─── */
function WorkCard({
  work,
  index,
}: {
  work: (typeof WORKS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor
      style={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        aspectRatio: work.aspect,
        cursor: "none",
        background: "#121212",
      }}
    >
      {/* Real Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "transform 1.2s var(--ease-cinematic)",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          style={{
            objectFit: "cover",
            opacity: hovered ? 0.6 : 0.4,
            transition: "opacity 0.6s var(--ease-cinematic)",
            filter: hovered ? "grayscale(0%)" : "grayscale(30%)",
          }}
        />
      </div>

      {/* Cinematic Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          zIndex: 2,
        }}
      >
        {/* Top — number + icon */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {work.id}
          </span>
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : -10,
              rotate: hovered ? 0 : -45,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid var(--color-gold)",
              background: "rgba(201,168,76,0.1)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={16} color="var(--color-gold)" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Bottom — details */}
        <div>
          <motion.div
            animate={{ y: hovered ? 0 : 5, opacity: hovered ? 1 : 0.7 }}
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "0.75rem",
            }}
          >
            {work.category} · {work.year}
          </motion.div>
          <h3
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "0.02em",
              color: "var(--color-white)",
              lineHeight: 1,
            }}
          >
            {work.title}
          </h3>
          <motion.p
            animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0, marginTop: hovered ? "1rem" : "0rem" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "36ch",
              overflow: "hidden",
            }}
          >
            {work.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PORTFOLIO PREVIEW SECTION
   ═══════════════════════════════════════════ */
export function PortfolioSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="portfolio"
      aria-label="Selected Work"
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
        {/* Header row */}
        <div
          ref={headingRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "clamp(3rem, 6vh, 5rem)",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)" }} />
              <span className="label-gold">Selected Work</span>
            </motion.div>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
                animate={isInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 0.95,
                  color: "var(--color-white)",
                }}
              >
                A Few Things
                <br />
                <span style={{ color: "var(--color-gold)" }}>We&apos;ve Built.</span>
              </motion.h2>
            </div>
          </div>

          <motion.a
            href="#"
            data-cursor
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
              transition: "color 0.3s",
            }}
            className="hover-gold-line"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-dim)"; }}
          >
            Full Archive
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </motion.a>
        </div>

        {/* Asymmetric 3-card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
          }}
        >
          {/* Card 1 — spans 5 cols */}
          <div style={{ gridColumn: "span 12", gridRow: "1" }}
               className="md:col-span-5">
            <WorkCard work={WORKS[0]} index={0} />
          </div>
          {/* Card 2 — spans 7 cols, offset row */}
          <div style={{ gridColumn: "span 12" }}
               className="md:col-span-7 md:mt-16">
            <WorkCard work={WORKS[1]} index={1} />
          </div>
          {/* Card 3 — spans 6 cols */}
          <div style={{ gridColumn: "span 12" }}
               className="md:col-span-6 md:col-start-4">
            <WorkCard work={WORKS[2]} index={2} />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: "clamp(3rem, 6vh, 5rem)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="#contact"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-bg)",
              background: "var(--color-gold)",
              padding: "1.1rem 2.5rem",
              borderRadius: "2px",
              border: "1px solid var(--color-gold)",
              transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.color = "var(--color-gold)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--color-gold)";
              el.style.color = "var(--color-bg)";
            }}
          >
            Start Your Project
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
