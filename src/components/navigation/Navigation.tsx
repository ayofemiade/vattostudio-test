"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

/* ─── Navigation links ─── */
const NAV_LINKS = [
  { label: "Work",     href: "#portfolio" },
  { label: "Services", href: "#services"  },
  { label: "About",    href: "#about"     },
  { label: "Contact",  href: "#contact"   },
];

/* ─── Animation variants ─── */
const mobileMenuVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
};

const mobileLinkVariants = {
  closed: { y: 60, opacity: 0 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.25 + i * 0.07,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const mobileMetaVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.65, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Logo Mark SVG ─── */
function VattoLogoMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Abstract V shape — minimal, geometric */}
      <polygon
        points="2,4 16,28 30,4 26,4 16,21 6,4"
        fill="#C9A84C"
        style={{ transition: "fill 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      />
    </svg>
  );
}

/* ─── Hamburger Icon ─── */
function Hamburger({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
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
  href: string;
  label: string;
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
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [hidden, setHidden]         = useState(false);
  const prefersReducedMotion        = useReducedMotion();
  const lastScrollY                 = useRef(0);
  const scrollTimer                 = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Scroll detection — hide on scroll down, show on scroll up */
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    setScrolled(currentY > 40);

    if (currentY > lastScrollY.current && currentY > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    lastScrollY.current = currentY;

    /* Debounce: ensure nav shows after scroll stops */
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
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Smooth scroll handler */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
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
          y: hidden && !menuOpen ? -100 : 0,
          opacity: hidden && !menuOpen ? 0 : 1,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
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
            }}
            aria-label="Vattostudio — Home"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
            data-cursor
          >
            <VattoLogoMark />
            <span className="nav-logo-mark">VATTOSTUDIO</span>
          </a>

          {/* Desktop links */}
          <nav
            role="navigation"
            aria-label="Primary navigation"
            style={{ display: "flex", alignItems: "center", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
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
                className="font-mono"
                data-cursor
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-bg)",
                  background: "var(--color-gold)",
                  padding: "0.55rem 1.25rem",
                  borderRadius: "2px",
                  transition: "background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#dab85a";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-gold)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Let&apos;s Talk
              </a>
            </Magnetic>
          </nav>

          {/* Mobile hamburger */}
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
            {/* Close button in top right */}
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "clamp(1.25rem, 5vw, 3rem)",
                height: "var(--nav-height)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Hamburger isOpen={true} onClick={() => setMenuOpen(false)} />
            </div>

            {/* Gold accent label */}
            <motion.p
              className="label-gold"
              variants={prefersReducedMotion ? {} : mobileMetaVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ marginBottom: "3rem" }}
            >
              Navigation
            </motion.p>

            {/* Links */}
            <nav
              role="navigation"
              aria-label="Mobile navigation links"
              style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
            >
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} style={{ overflow: "hidden" }}>
                  <motion.a
                    href={link.href}
                    className="mobile-menu-link"
                    onClick={handleNavClick}
                    custom={i}
                    variants={prefersReducedMotion ? {} : mobileLinkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ display: "block" }}
                  >
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>

            {/* Bottom meta */}
            <motion.div
              variants={prefersReducedMotion ? {} : mobileMetaVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                position: "absolute",
                bottom: "clamp(2rem, 5vh, 3rem)",
                left: "2rem",
                right: "2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.5rem",
              }}
            >
              <div>
                <p className="label" style={{ marginBottom: "0.25rem" }}>Based in</p>
                <p style={{ fontFamily: "var(--font-satoshi)", fontSize: "0.875rem", color: "var(--color-white)" }}>
                  Lagos, Nigeria
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="label" style={{ marginBottom: "0.25rem" }}>Est.</p>
                <p style={{ fontFamily: "var(--font-satoshi)", fontSize: "0.875rem", color: "var(--color-white)" }}>
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
