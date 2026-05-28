"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

/* ─── Navigation links ─── */
const NAV_LINKS = [
  { label: "Work",     href: "#portfolio", num: "01" },
  { label: "Services", href: "#services",  num: "02" },
  { label: "About",    href: "#about",     num: "03" },
  { label: "Contact",  href: "#contact",   num: "04" },
];

/* ─── Animation variants ─── */
const mobileMenuVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

const mobileLinkVariants = {
  closed: { y: 80, opacity: 0, skewX: 4 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    skewX: 0,
    transition: {
      delay: 0.2 + i * 0.08,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const mobileMetaVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const mobileCtaVariants = {
  closed: { opacity: 0, y: 24 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.55, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Logo Mark SVG ─── */
function VattoLogoMark({ glowing = false }: { glowing?: boolean }) {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
      animate={{
        filter: glowing
          ? "drop-shadow(0 0 10px rgba(201,168,76,0.7))"
          : "drop-shadow(0 0 0px rgba(201,168,76,0))",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <polygon
        points="2,4 16,28 30,4 26,4 16,21 6,4"
        fill="#C9A84C"
        style={{ transition: "fill 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      />
    </motion.svg>
  );
}

/* ─── Hamburger Icon ─── */
function Hamburger({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`hamburger ${isOpen ? "open" : ""}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      style={{ zIndex: 1001, position: "relative" }}
    >
      <span className="hamburger-line" />
      <span className="hamburger-line" />
      <span className="hamburger-line" />
    </button>
  );
}

/* ─── Desktop Nav Link ─── */
function DesktopNavLink({
  href,
  label,
  onClick,
}: {
  href:    string;
  label:   string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a href={href} className="nav-link" onClick={onClick} data-cursor>
      {label}
    </a>
  );
}

/* ═══════════════════════════════════════════
   MAIN NAVIGATION COMPONENT
   ═══════════════════════════════════════════ */
export function Navigation() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const prefersReducedMotion      = useReducedMotion();
  const lastScrollY               = useRef(0);
  const scrollTimer               = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Scroll detection */
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    setScrolled(currentY > 40);

    if (currentY > lastScrollY.current && currentY > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    lastScrollY.current = currentY;

    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => setHidden(false), 800);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [handleScroll]);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Smooth scroll + close menu */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    },
    []
  );

  return (
    <>
      {/* ─── Main Nav Bar ─── */}
      <motion.header
        className={`nav-root ${scrolled ? "nav-scrolled" : ""}`}
        animate={{
          y:       hidden && !menuOpen ? -100 : 0,
          opacity: hidden && !menuOpen ? 0 : 1,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.55,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        role="banner"
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            height: "100%",
            padding: "0 clamp(1.25rem, 5vw, 3rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
            aria-label="Vattostudio — Home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              /* Prevent logo from wrapping on tiny screens */
              flexShrink: 0,
            }}
            data-cursor
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <VattoLogoMark glowing={logoHover} />
            <motion.span
              className="nav-logo-mark"
              animate={{ color: logoHover ? "var(--color-gold)" : "var(--color-white)" }}
              transition={{ duration: 0.3 }}
            >
              VATTOSTUDIO
            </motion.span>
          </a>

          {/* Desktop links */}
          <nav
            role="navigation"
            aria-label="Primary navigation"
            style={{ alignItems: "center", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => (
              <DesktopNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={handleNavClick}
              />
            ))}

            {/* CTA */}
            <Magnetic>
              <a
                href="#contact"
                onClick={handleNavClick}
                data-cursor
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-bg)",
                  background: "var(--color-gold)",
                  padding: "0.6rem 1.4rem",
                  transition: "color 0.45s var(--ease-cinematic)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  const fill = el.querySelector<HTMLElement>("[data-fill]");
                  if (fill) fill.style.transform = "translateX(0)";
                  el.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  const fill = el.querySelector<HTMLElement>("[data-fill]");
                  if (fill) fill.style.transform = "translateX(-101%)";
                  el.style.color = "var(--color-bg)";
                }}
              >
                <span
                  data-fill
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#0A0A0A",
                    transform: "translateX(-101%)",
                    transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>Let&apos;s Talk</span>
              </a>
            </Magnetic>
          </nav>

          {/* Mobile hamburger — only visible below md */}
          <div className="flex md:hidden">
            <Hamburger isOpen={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Full-Screen Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={prefersReducedMotion ? {} : mobileMenuVariants}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Close button (top-right) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: "clamp(1.25rem, 5vw, 2.5rem)",
                height: "var(--nav-height)",
                display: "flex",
                alignItems: "center",
                zIndex: 1001,
              }}
            >
              <Hamburger isOpen={true} onClick={() => setMenuOpen(false)} />
            </div>

            {/* Logo (top-left) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "clamp(1.25rem, 5vw, 2.5rem)",
                height: "var(--nav-height)",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              <VattoLogoMark />
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

            {/* Inner content wrapper — vertically centered between header & footer */}
            <div
              style={{
                paddingTop: "var(--nav-height)",
                paddingBottom: "8rem",   /* room for the bottom meta bar */
                display: "flex",
                flexDirection: "column",
                gap: "0",
                width: "100%",
              }}
            >
              {/* Gold eyebrow label */}
              <motion.p
                className="label-gold"
                variants={prefersReducedMotion ? {} : mobileMetaVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ marginBottom: "1.25rem" }}
              >
                Navigation
              </motion.p>

              {/* Links with hairline separators */}
              <nav
                role="navigation"
                aria-label="Mobile navigation links"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {NAV_LINKS.map((link, i) => (
                  <div key={link.href}>
                    {/* Hairline separator above each link */}
                    <div className="mobile-menu-link-rule" />
                    <div style={{ overflow: "hidden", padding: "0.15rem 0" }}>
                      <motion.a
                        href={link.href}
                        className="mobile-menu-link"
                        onClick={handleNavClick}
                        custom={i}
                        variants={prefersReducedMotion ? {} : mobileLinkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{ display: "flex" }}
                      >
                        <span className="mobile-menu-link-num">{link.num}</span>
                        {link.label}
                      </motion.a>
                    </div>
                  </div>
                ))}
                {/* Bottom separator */}
                <div className="mobile-menu-link-rule" />
              </nav>

              {/* Mobile CTA button — revealed after links */}
              <motion.div
                variants={prefersReducedMotion ? {} : mobileCtaVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ marginTop: "2.5rem" }}
              >
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-bg)",
                    background: "var(--color-gold)",
                    padding: "1rem 2.5rem",
                    borderRadius: "2px",
                    width: "100%",
                    maxWidth: "280px",
                    fontWeight: 700,
                    transition: "opacity 0.3s",
                  }}
                >
                  Start a Project
                </a>
              </motion.div>
            </div>

            {/* Bottom meta strip */}
            <motion.div
              variants={prefersReducedMotion ? {} : mobileMetaVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                position: "absolute",
                bottom: "clamp(1.5rem, 4vh, 3rem)",
                left: "clamp(1.25rem, 5vw, 2.5rem)",
                right: "clamp(1.25rem, 5vw, 2.5rem)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderTop: "1px solid rgba(30,30,30,0.8)",
                paddingTop: "1.25rem",
                zIndex: 1,
              }}
            >
              <div>
                <p className="label" style={{ marginBottom: "0.3rem" }}>Based in</p>
                <p style={{ fontFamily: "var(--font-satoshi)", fontSize: "0.9375rem", color: "var(--color-white)" }}>
                  Lagos, Nigeria
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="label" style={{ marginBottom: "0.3rem" }}>Est.</p>
                <p style={{ fontFamily: "var(--font-satoshi)", fontSize: "0.9375rem", color: "var(--color-white)" }}>
                  2021
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
