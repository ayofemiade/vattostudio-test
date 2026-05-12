"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const SERVICES = [
  {
    index: "01",
    title: "Brand Identity",
    description:
      "We excavate the soul of your brand — then craft visual systems that communicate it with precision. Logos, color, type, motion language.",
    tags: ["Strategy", "Visual Identity", "Systems"],
  },
  {
    index: "02",
    title: "Campaign Production",
    description:
      "From concept to final asset. Stills, motion, digital — produced with editorial restraint and commercial effectiveness.",
    tags: ["Photography", "Videography", "Direction"],
  },
  {
    index: "03",
    title: "Motion & Film",
    description:
      "Moving image work that speaks before a single word is read. Brand films, social content, and cinematic edits.",
    tags: ["Brand Film", "Social Content", "Post-Production"],
  },
  {
    index: "04",
    title: "Digital Experience",
    description:
      "Web presence built around intentional design. Sites that feel like the brand — not like a template.",
    tags: ["Web Design", "UI/UX", "Development"],
  },
];

/* ─── Single service row ─── */
function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      data-cursor
      style={{
        display: "grid",
        gridTemplateColumns: "4rem 1fr auto",
        alignItems: "start",
        gap: "clamp(1.5rem, 3vw, 3rem)",
        padding: "clamp(2rem, 4vh, 2.75rem) 0",
        borderBottom: "1px solid var(--color-border)",
        cursor: "default",
        transition: "background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        position: "relative",
        overflow: "hidden",
      }}
      className="service-row"
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderBottomColor = "rgba(201,168,76,0.3)";
        const indexEl = el.querySelector<HTMLElement>("[data-index]");
        if (indexEl) indexEl.style.color = "var(--color-gold)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderBottomColor = "var(--color-border)";
        const indexEl = el.querySelector<HTMLElement>("[data-index]");
        if (indexEl) indexEl.style.color = "var(--color-dim)";
      }}
    >
      {/* Index */}
      <span
        data-index
        style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          color: "var(--color-dim)",
          paddingTop: "0.4rem",
          transition: "color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {service.index}
      </span>

      {/* Content */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "0.02em",
            color: "var(--color-white)",
            lineHeight: 1,
            marginBottom: "0.875rem",
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-satoshi)",
            fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
            lineHeight: 1.7,
            color: "var(--color-dim)",
            maxWidth: "52ch",
          }}
        >
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          alignItems: "flex-end",
          paddingTop: "0.4rem",
        }}
        className="hidden md:flex"
      >
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
              background: "var(--color-surface)",
              padding: "0.3rem 0.75rem",
              borderRadius: "2px",
              border: "1px solid var(--color-border)",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════ */
export function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-label="Our Services"
      style={{
        padding: "clamp(5rem, 10vh, 9rem) 0",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        {/* Section header */}
        <div
          ref={headingRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            gap: "2rem",
            marginBottom: "clamp(3rem, 6vh, 5rem)",
          }}
        >
          <div>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "var(--color-gold)",
                }}
              />
              <span className="label-gold">What We Do</span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
                animate={
                  isHeadingInView
                    ? { clipPath: "inset(0% 0 0 0)", y: 0 }
                    : {}
                }
                transition={{ delay: 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 0.95,
                  color: "var(--color-white)",
                }}
              >
                Craft, Not Craft
                <br />
                <span style={{ color: "var(--color-gold)" }}>Services.</span>
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
              fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
              lineHeight: 1.7,
              color: "var(--color-dim)",
              maxWidth: "28ch",
              textAlign: "right",
            }}
            className="hidden md:block"
          >
            Every discipline practiced with the same conviction. Work made to last.
          </motion.p>
        </div>

        {/* Service list */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.index} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
