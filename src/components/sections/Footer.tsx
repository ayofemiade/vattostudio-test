"use client";

import { ArrowUpRight, Instagram, Twitter } from "lucide-react";

function FooterLogoMark() {
  return (
    <svg width="44" height="44" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="2,4 16,28 30,4 26,4 16,21 6,4" fill="#C9A84C" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Work:     ["Brand Identity", "Campaign Production", "Motion & Film", "Digital Experience"],
  Studio:   ["About", "Process", "Pricing", "Contact"],
  Social:   ["Instagram", "Twitter / X", "LinkedIn", "Behance"],
};

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Vattostudio footer"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        padding: "clamp(4rem, 8vh, 7rem) 0 0",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        {/* Top section: CTA callout */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5rem",
            marginBottom: "clamp(4rem, 8vh, 6rem)",
            paddingBottom: "clamp(3rem, 6vh, 5rem)",
            borderBottom: "1px solid var(--color-border)",
          }}
          className="md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="label-gold" style={{ marginBottom: "1rem" }}>Ready to Begin?</p>
            <h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "0.01em",
                lineHeight: 0.9,
                color: "var(--color-white)",
              }}
            >
              Your Brand.
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                }}
              >
                Revealed.
              </span>
            </h2>
          </div>
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
              whiteSpace: "nowrap",
              flexShrink: 0,
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
            Start a Project
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </div>

        {/* Middle: link columns + brand */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            marginBottom: "clamp(3rem, 6vh, 5rem)",
          }}
          className="md:grid-cols-[2fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <FooterLogoMark />
              <span
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1.375rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-white)",
                }}
              >
                VATTOSTUDIO
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "var(--color-dim)",
                maxWidth: "28ch",
                marginBottom: "1.5rem",
              }}
            >
              A creative production studio from Lagos. We reveal the truth in brands.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
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
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--color-border)",
                    borderRadius: "50%",
                    color: "var(--color-dim)",
                    transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--color-gold)";
                    el.style.color = "var(--color-gold)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--color-border)";
                    el.style.color = "var(--color-dim)";
                  }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-dim)",
                  marginBottom: "1.25rem",
                }}
              >
                {category}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      data-cursor
                      style={{
                        fontFamily: "var(--font-satoshi)",
                        fontSize: "0.9375rem",
                        color: "var(--color-dim)",
                        transition: "color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-white)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-dim)"; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.75rem 0",
            borderTop: "1px solid var(--color-border)",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
            }}
          >
            © {currentYear} Vattostudio · All rights reserved · Lagos, Nigeria
          </p>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
            }}
          >
            We Reveal, Not Invent
            <span style={{ color: "var(--color-gold)", marginLeft: "0.5rem" }}>·</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
