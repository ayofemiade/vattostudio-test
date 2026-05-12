"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    // Ring follows with a lag
    let rafId: number;
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    // Expand on hoverable elements
    const onEnter = () => {
      if (dot) dot.style.transform = "translate(-50%, -50%) scale(2.5)";
      if (ring) {
        ring.style.width = "60px";
        ring.style.height = "60px";
        ring.style.borderColor = "rgba(201, 168, 76, 0.7)";
      }
    };
    const onLeave = () => {
      if (dot) dot.style.transform = "translate(-50%, -50%) scale(1)";
      if (ring) {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(201, 168, 76, 0.4)";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
