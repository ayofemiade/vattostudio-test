"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    id: "starter",
    label: "Starter",
    price: "₦350k",
    period: "/ project",
    tagline: "For startups finding their voice.",
    features: [
      "Brand strategy session",
      "Logo & visual mark",
      "Color system & typography",
      "Brand guidelines PDF",
      "3 revision rounds",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    id: "studio",
    label: "Studio",
    price: "₦850k",
    period: "/ project",
    tagline: "Our most popular. Full identity build.",
    features: [
      "Everything in Starter",
      "Full brand identity system",
      "Motion identity / logo animation",
      "Social media kit",
      "Campaign concept & direction",
      "Priority support",
    ],
    cta: "Start Studio",
    featured: true,
  },
  {
    id: "director",
    label: "Director",
    price: "Custom",
    period: "",
    tagline: "End-to-end production. No ceiling.",
    features: [
      "Everything in Studio",
      "Full campaign production",
      "Brand film / content series",
      "Web design & development",
      "Dedicated creative lead",
      "Ongoing retainer option",
    ],
    cta: "Let's Talk",
    featured: false,
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof PLANS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        position: "relative",
        padding: "clamp(2rem, 4vw, 2.75rem)",
        borderRadius: "4px",
        border: plan.featured
          ? "1px solid var(--color-gold)"
          : "1px solid var(--color-border)",
        background: plan.featured ? "var(--color-surface)" : "transparent",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        transition: "border-color 0.4s, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      onMouseEnter={(e) => {
        if (!plan.featured) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
        }
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        if (!plan.featured) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        }
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Featured badge */}
      {plan.featured && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "2rem",
            background: "var(--color-gold)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.3rem 0.75rem",
            borderRadius: "0 0 3px 3px",
          }}
        >
          Most Popular
        </div>
      )}

      {/* Plan label */}
      <span
        style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: plan.featured ? "var(--color-gold)" : "var(--color-dim)",
          marginBottom: "1.5rem",
          display: "block",
        }}
      >
        {plan.label}
      </span>

      {/* Price */}
      <div style={{ marginBottom: "0.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            letterSpacing: "0.02em",
            color: "var(--color-white)",
            lineHeight: 1,
          }}
        >
          {plan.price}
        </span>
        {plan.period && (
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6875rem",
              color: "var(--color-dim)",
              letterSpacing: "0.1em",
              marginLeft: "0.5rem",
            }}
          >
            {plan.period}
          </span>
        )}
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "var(--font-satoshi)",
          fontSize: "0.875rem",
          color: "var(--color-dim)",
          lineHeight: 1.6,
          marginBottom: "2rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {plan.tagline}
      </p>

      {/* Features */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.875rem",
          marginBottom: "2.5rem",
          flex: 1,
          listStyle: "none",
        }}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              fontFamily: "var(--font-satoshi)",
              fontSize: "0.875rem",
              color: "var(--color-white)",
              lineHeight: 1.5,
            }}
          >
            <Check
              size={13}
              strokeWidth={1.5}
              style={{
                color: "var(--color-gold)",
                flexShrink: 0,
                marginTop: "0.2rem",
              }}
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        data-cursor
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "0.9rem 1.5rem",
          borderRadius: "2px",
          border: "1px solid",
          borderColor: plan.featured ? "var(--color-gold)" : "var(--color-border)",
          background: plan.featured ? "var(--color-gold)" : "transparent",
          color: plan.featured ? "var(--color-bg)" : "var(--color-dim)",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "var(--color-gold)";
          el.style.borderColor = "var(--color-gold)";
          el.style.color = "var(--color-bg)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = plan.featured ? "var(--color-gold)" : "transparent";
          el.style.borderColor = plan.featured ? "var(--color-gold)" : "var(--color-border)";
          el.style.color = plan.featured ? "var(--color-bg)" : "var(--color-dim)";
        }}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PRICING SECTION
   ═══════════════════════════════════════════ */
export function PricingSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="pricing"
      aria-label="Pricing"
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
        {/* Header */}
        <div
          ref={headingRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(3rem, 6vh, 5rem)",
          }}
        >
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)" }} />
            <span className="label-gold">Transparent Pricing</span>
            <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)" }} />
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
              No Surprises.
              <br />
              <span style={{ color: "var(--color-gold)" }}>Just Results.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              color: "var(--color-dim)",
              maxWidth: "44ch",
              margin: "1.5rem auto 0",
              lineHeight: 1.7,
            }}
          >
            Honest scopes. Real timelines. Premium output.
            Every project is a partnership — not a transaction.
          </motion.p>
        </div>

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
            alignItems: "start",
          }}
        >
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.5625rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-dim)",
            textAlign: "center",
            marginTop: "2.5rem",
            lineHeight: 1.8,
          }}
        >
          All prices in Nigerian Naira · International projects quoted separately ·{" "}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ color: "var(--color-gold)", textDecoration: "underline" }}
          >
            Custom scope? Let&apos;s talk.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
