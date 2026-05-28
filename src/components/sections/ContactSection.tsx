"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Instagram, Twitter } from "lucide-react";

/* ═══════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════ */
export function ContactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(headingRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  const [formState, setFormState] = useState({
    name: "", email: "", project: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* In production — wire to Resend / Formspree / email API */
    setSubmitted(true);
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "var(--color-gold)" : "var(--color-border)"}`,
    padding: "1rem 0",
    fontFamily: "var(--font-satoshi)",
    fontSize: "1rem",
    color: "var(--color-white)",
    outline: "none",
    transition: "border-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    borderRadius: 0,
    appearance: "none" as const,
  });

  const labelStyle = {
    fontFamily: "var(--font-ibm-plex-mono)",
    fontSize: "0.5625rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "var(--color-dim)",
    display: "block",
    marginBottom: "0.25rem",
  };

  return (
    <section
      id="contact"
      aria-label="Contact Vattostudio"
      style={{
        padding: "clamp(5rem, 10vh, 9rem) 0",
        background: "var(--color-surface)",
        borderTop: "1px solid rgba(30,30,30,0.7)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gold glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "clamp(3.5rem, 7vh, 6rem)" }}>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
          >
            <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)" }} />
            <span className="label-gold">Start a Project</span>
          </motion.div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
              animate={isInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
              transition={{ delay: 0.1, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3rem, 9vw, 8rem)",
                letterSpacing: "0.01em",
                lineHeight: 0.9,
                color: "var(--color-white)",
              }}
            >
              Let&apos;s Make
              <br />
              <span style={{ color: "var(--color-gold)" }}>Something Real.</span>
            </motion.h2>
          </div>
        </div>

        {/* Two-column: form + info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(3rem, 7vw, 7rem)",
          }}
          className="lg:grid-cols-[1fr_380px]"
        >
          {/* ── Contact form ── */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "3rem 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                  }}
                >
                  Received ✓
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: "var(--color-white)",
                    lineHeight: 1,
                  }}
                >
                  We&apos;ll be in touch soon.
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    fontSize: "1rem",
                    color: "var(--color-dim)",
                    lineHeight: 1.7,
                    maxWidth: "40ch",
                  }}
                >
                  Real responses within 48 hours. No auto-replies. No templates.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
                noValidate
              >
                {/* Row 1: Name + Email */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(1.5rem, 4vw, 3rem)",
                  }}
                  className="grid-cols-1 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("name"), caretColor: "var(--color-gold)" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("email"), caretColor: "var(--color-gold)" }}
                    />
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <label htmlFor="contact-project" style={labelStyle}>Project Type</label>
                  <select
                    id="contact-project"
                    required
                    value={formState.project}
                    onChange={(e) => setFormState((s) => ({ ...s, project: e.target.value }))}
                    onFocus={() => setFocused("project")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("project"),
                      cursor: "pointer",
                      background: "transparent",
                    }}
                  >
                    <option value="" disabled style={{ background: "#1A1A1A" }}>
                      Select what you need
                    </option>
                    {[
                      "Brand Identity",
                      "Campaign Production",
                      "Motion & Film",
                      "Digital Experience",
                      "Full Studio Retainer",
                      "Something else",
                    ].map((opt) => (
                      <option key={opt} value={opt} style={{ background: "#1A1A1A" }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={labelStyle}>
                    Tell us about your project
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="What are you building? What's the timeline? Any budget in mind?"
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("message"),
                      resize: "none",
                      lineHeight: 1.7,
                    }}
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    data-cursor
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-bg)",
                      background: "var(--color-gold)",
                      padding: "1.1rem 2.5rem",
                      borderRadius: "2px",
                      border: "1px solid var(--color-gold)",
                      cursor: "none",
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
                    Send Message
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── Info sidebar ── */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {/* Direct email */}
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>Email directly</p>
              <a
                href="mailto:hello@vattostudio.com"
                data-cursor
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.0625rem)",
                  color: "var(--color-white)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-white)"; }}
              >
                <Mail size={14} strokeWidth={1.5} style={{ color: "var(--color-gold)" }} />
                hello@vattostudio.com
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>Based in</p>
              <p
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.0625rem)",
                  color: "var(--color-white)",
                }}
              >
                <MapPin size={14} strokeWidth={1.5} style={{ color: "var(--color-gold)" }} />
                Lagos, Nigeria
              </p>
              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-dim)",
                  marginTop: "0.5rem",
                }}
              >
                Available for international projects
              </p>
            </div>

            {/* Response time */}
            <div
              style={{
                padding: "1.5rem",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                borderRadius: "3px",
              }}
            >
              <p className="label-gold" style={{ marginBottom: "0.75rem" }}>Response Time</p>
              <p
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "0.9375rem",
                  color: "var(--color-white)",
                  lineHeight: 1.6,
                }}
              >
                We reply to every message personally.
                <br />
                Expect a response within <strong style={{ color: "var(--color-gold)" }}>48 hours</strong>.
              </p>
            </div>

            {/* Social */}
            <div>
              <p className="label" style={{ marginBottom: "1rem" }}>Follow the work</p>
              <div style={{ display: "flex", gap: "1.25rem" }}>
                {[
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com/vattostudio" },
                  { icon: Twitter,   label: "X / Twitter", href: "https://twitter.com/vattostudio" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-cursor
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-dim)",
                      transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--color-gold)";
                      el.style.color = "var(--color-gold)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--color-border)";
                      el.style.color = "var(--color-dim)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={15} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
