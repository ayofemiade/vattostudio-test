"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  {
    index:       "01",
    title:       "Brand Identity",
    description: "We excavate the soul of your brand — then craft visual systems that communicate it with precision. Logos, color, type, motion language.",
    tags:        ["Strategy", "Visual Identity", "Systems"],
    image:       "/brand_identity.png",
  },
  {
    index:       "02",
    title:       "Campaign Production",
    description: "From concept to final asset. Stills, motion, digital — produced with editorial restraint and commercial effectiveness.",
    tags:        ["Photography", "Videography", "Direction"],
    image:       "/campaign_production.png",
  },
  {
    index:       "03",
    title:       "Motion & Film",
    description: "Moving image work that speaks before a single word is read. Brand films, social content, and cinematic edits.",
    tags:        ["Brand Film", "Social Content", "Post-Production"],
    image:       "/motion_film.png",
  },
  {
    index:       "04",
    title:       "Digital Experience",
    description: "Web presence built around intentional design. Sites that feel like the brand — not like a template.",
    tags:        ["Web Design", "UI/UX", "Development"],
    image:       "/digital_experience.png",
  },
];

/* ─── Single service row ─── */
function ServiceRow({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);
  const isInView              = useInView(ref, { once: true, margin: "-8%" });
  const prefersReducedMotion  = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay:    index * 0.1,
        duration: 0.85,
        ease:     [0.25, 0.46, 0.45, 0.94],
      }}
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         "grid",
        gridTemplateColumns: "4rem 1fr auto",
        alignItems:      "center",
        gap:             "clamp(1.5rem, 3vw, 3.5rem)",
        padding:         "clamp(2.5rem, 5vh, 4rem) clamp(1rem, 3vw, 2.5rem)",
        borderBottom:    `1px solid rgba(10,10,10,0.08)`,
        cursor:          "default",
        position:        "relative",
        overflow:        "hidden",
        transition:      "all 0.6s var(--ease-cinematic)",
      }}
    >
      {/* ─── Cinematic Background Image Reveal ─── */}
      <motion.div
        animate={{
          opacity: hovered ? 0.85 : 0,
          scale:   hovered ? 1.05 : 1.0,
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position:      "absolute",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
        }}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "grayscale(10%) contrast(1.15) brightness(0.65)",
          }}
        />
      </motion.div>

      {/* Dark overlay with left-to-right gradient to keep text extremely readable */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
        style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(to right, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.15) 100%)",
          zIndex:        1,
          pointerEvents: "none",
        }}
      />

      {/* Subtle hover line highlight at bottom */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position:        "absolute",
          left:            0,
          right:           0,
          bottom:          0,
          height:          "1px",
          background:      "linear-gradient(to right, transparent, var(--color-gold), transparent)",
          transformOrigin: "center",
          zIndex:          2,
        }}
      />

      {/* Index */}
      <span
        data-index
        style={{
          fontFamily:    "var(--font-ibm-plex-mono)",
          fontSize:      "0.6875rem",
          letterSpacing: "0.1em",
          color:         hovered ? "var(--color-gold)" : "rgba(10,10,10,0.4)",
          paddingTop:    "0.5rem",
          transition:    "color 0.35s var(--ease-cinematic)",
          position:      "relative",
          zIndex:        2,
        }}
      >
        {service.index}
      </span>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h3
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(2.25rem, 4.5vw, 4.25rem)",
            letterSpacing: "0.02em",
            color:         hovered ? "var(--color-white)" : "var(--color-bg)",
            lineHeight:    1,
            marginBottom:  "0.9rem",
            transform:     hovered ? "translateX(12px)" : "translateX(0px)",
            transition:    "transform 0.5s var(--ease-cinematic)",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-satoshi)",
            fontSize:   "clamp(0.875rem, 1.2vw, 1rem)",
            lineHeight: 1.75,
            color:      hovered ? "rgba(255,255,255,0.78)" : "rgba(10,10,10,0.55)",
            maxWidth:   "54ch",
            transform:     hovered ? "translateX(12px)" : "translateX(0px)",
            transition:    "transform 0.5s var(--ease-cinematic), color 0.4s",
          }}
        >
          {service.description}
        </p>
      </div>

      {/* Right side: tags + arrow */}
      <div
        style={{
          display:        "flex",
          flexDirection:  "column",
          gap:            "0.5rem",
          alignItems:     "flex-end",
          paddingTop:     "0.5rem",
          position:       "relative",
          zIndex:         2,
        }}
        className="hidden md:flex"
      >
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily:    "var(--font-ibm-plex-mono)",
              fontSize:      "0.5rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color:         hovered ? "rgba(201,168,76,0.9)" : "rgba(10,10,10,0.6)",
              background:    hovered ? "rgba(201,168,76,0.08)" : "rgba(10,10,10,0.03)",
              border:        `1px solid ${hovered ? "rgba(201,168,76,0.35)" : "rgba(10,10,10,0.08)"}`,
              whiteSpace:    "nowrap",
              transition:    "all 0.4s var(--ease-cinematic)",
            }}
          >
            {tag}
          </span>
        ))}

        {/* Arrow indicator */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0.35,
            rotate:  hovered ? 0 : -45,
            scale:   hovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop:      "0.5rem",
            width:          "38px",
            height:         "38px",
            borderRadius:   "50%",
            border:         "1px solid var(--color-gold)",
            background:     "rgba(201,168,76,0.08)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}
        >
          <ArrowUpRight size={14} color="var(--color-gold)" strokeWidth={1.5} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════ */
export function ServicesSection() {
  const headingRef           = useRef<HTMLDivElement>(null);
  const isHeadingInView      = useInView(headingRef, { once: true, margin: "-12%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-label="Our Services"
      style={{
        padding:  "clamp(6rem, 11vh, 10rem) 0",
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Atmospheric ambient */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          bottom:        "-10%",
          left:          "-5%",
          width:         "45vw",
          height:        "45vh",
          background:    "radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.03) 0%, transparent 65%)",
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
        {/* Section header */}
        <div
          ref={headingRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr auto",
            alignItems:          "flex-end",
            gap:                 "2rem",
            marginBottom:        "clamp(3.5rem, 7vh, 6rem)",
          }}
        >
          <div>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isHeadingInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)", transformOrigin: "left" }}
              />
              <span className="label-gold">What We Create</span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
                animate={isHeadingInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
                transition={{ delay: 0.1, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily:    "var(--font-bebas)",
                  fontSize:      "clamp(3rem, 7vw, 6.5rem)",
                  letterSpacing: "0.01em",
                  lineHeight:    0.92,
                  color:         "var(--color-bg)",
                }}
              >
                Four Disciplines.
                <br />
                <span style={{ color: "var(--color-gold)" }}>One Standard.</span>
              </motion.h2>
            </div>
          </div>

          {/* Right-side sub copy */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize:   "clamp(0.875rem, 1.1vw, 1rem)",
              lineHeight: 1.75,
              color:      "rgba(10, 10, 10, 0.6)",
              maxWidth:   "28ch",
              textAlign:  "right",
            }}
            className="hidden md:block"
          >
            Every discipline practiced with the same conviction. Work made to last.
          </motion.p>
        </div>

        {/* Service list */}
        <div style={{ borderTop: "1px solid rgba(10,10,10,0.08)" }}>
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.index} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
