"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

interface RevealMaskProps {
  src: string;
  alt?: string;
  /** Spotlight radius in pixels */
  radius?: number;
  /** Image opacity when revealed */
  revealedOpacity?: number;
  /** Image opacity when hidden (outside spotlight) */
  hiddenOpacity?: number;
  /** Image object-position style */
  objectPosition?: string;
}

/* ═══════════════════════════════════════════
   REVEAL MASK — "We Reveal, Not Invent."
   
   Creates a dark mask over the hero image.
   The user's cursor illuminates a spotlight,
   revealing the full imagery beneath — 
   literally performing the brand's philosophy.
   ═══════════════════════════════════════════ */
export function RevealMask({
  src,
  alt = "",
  radius = 180,
  revealedOpacity = 0.75,
  hiddenOpacity = 0.08,
  objectPosition = "center",
}: RevealMaskProps) {
  const containerRef    = useRef<HTMLDivElement>(null);
  const maskLayerRef    = useRef<HTMLDivElement>(null);
  const revealLayerRef  = useRef<HTMLDivElement>(null);
  const posRef          = useRef({ x: -9999, y: -9999 });
  const animFrameRef    = useRef<number>(0);
  const isHovering      = useRef(false);
  const prefersReduced  = useReducedMotion();

  /* ── Update mask position via RAF (smooth, no re-renders) ── */
  const updateMask = useCallback(() => {
    const container  = containerRef.current;
    const mask       = maskLayerRef.current;
    const reveal     = revealLayerRef.current;
    if (!container || !mask || !reveal) return;

    const rect = container.getBoundingClientRect();
    const x    = posRef.current.x - rect.left;
    const y    = posRef.current.y - rect.top;

    /* Radial gradient: transparent in spotlight, black outside */
    const gradient = `radial-gradient(
      circle ${radius}px at ${x}px ${y}px,
      transparent 0%,
      rgba(0,0,0,0.55) ${radius * 0.7}px,
      rgba(0,0,0,0.92) ${radius * 1.1}px
    )`;

    mask.style.maskImage       = gradient;
    mask.style.webkitMaskImage = gradient;

    /* Reveal layer: show image at spotlight position */
    const revealGradient = `radial-gradient(
      circle ${radius * 1.1}px at ${x}px ${y}px,
      rgba(0,0,0,${revealedOpacity}) 0%,
      rgba(0,0,0,0) 100%
    )`;
    reveal.style.maskImage       = revealGradient;
    reveal.style.webkitMaskImage = revealGradient;
  }, [radius, revealedOpacity]);

  const rafLoop = useCallback(() => {
    updateMask();
    animFrameRef.current = requestAnimationFrame(rafLoop);
  }, [updateMask]);

  useEffect(() => {
    if (prefersReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isHovering.current) {
        isHovering.current = true;
      }
    };

    /* Mobile: reveal center area subtly on touch */
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      posRef.current = { x: t.clientX, y: t.clientY };
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    /* Start RAF loop */
    animFrameRef.current = requestAnimationFrame(rafLoop);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [rafLoop, prefersReduced]);

  /* ── Mobile: auto-reveal center ── */
  useEffect(() => {
    if (!prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    /* Static center reveal for reduced motion / mobile */
    const rect = container.getBoundingClientRect();
    posRef.current = {
      x: rect.width  / 2,
      y: rect.height / 2,
    };
    updateMask();
  }, [prefersReduced, updateMask]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* ── Base image layer — always dimmed ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hiddenOpacity,
          transition: "opacity 0.6s var(--ease-cinematic)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition,
            filter: "grayscale(20%) contrast(1.1)",
          }}
        />
      </div>

      {/* ── Reveal layer — visible through cursor spotlight ── */}
      <div
        ref={revealLayerRef}
        style={{
          position: "absolute",
          inset: 0,
          transition: prefersReduced ? "none" : undefined,
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition,
            filter: "grayscale(10%) contrast(1.15) brightness(1.05)",
          }}
        />
        {/* Warm tint in the revealed area */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(201, 168, 76, 0.06)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* ── Dark mask that has the spotlight hole ── */}
      <div
        ref={maskLayerRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,10,10,0.94)",
          /* Initial state: full cover, no spotlight */
          maskImage: "radial-gradient(circle 0px at 50% 50%, transparent 0%, black 0%)",
          WebkitMaskImage: "radial-gradient(circle 0px at 50% 50%, transparent 0%, black 0%)",
        }}
      />

      {/* ── Vignette — always present ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,10,10,0.5) 100%),
            linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 20%, transparent 75%, rgba(10,10,10,0.95) 100%)
          `,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Cursor hint — shows briefly then fades ── */}
      <RevealHint />
    </div>
  );
}

/* ─── Cursor hint text — guides users to move cursor ─── */
function RevealHint() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(clamp(6rem, 12vh, 10rem) + 4rem)",
        right: "clamp(1.5rem, 5vw, 4rem)",
        zIndex: 5,
        textAlign: "right",
        pointerEvents: "none",
      }}
      className="hidden md:block"
    >
      <p
        style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(201, 168, 76, 0.4)",
          lineHeight: 1.8,
        }}
      >
        Move cursor to reveal
      </p>
    </div>
  );
}
