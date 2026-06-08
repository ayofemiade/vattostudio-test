"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CinematicIntro } from "./CinematicIntro";

/*
  WHY THE HYDRATION MISMATCH HAPPENED:
  
  Reading sessionStorage during `useState(() => ...)` causes a
  server/client split:
    - Server:  window === undefined → returns false → renders <CinematicIntro>
    - Client:  sessionStorage has the flag → returns true  → renders null
  
  React sees different trees and throws a hydration error that
  prevents the page from rendering — hence the black screen on reload.
  
  THE FIX:
  Start with `null` on both server AND client (they match).
  Resolve to the real value in useEffect, which only runs
  on the client after hydration is complete.
*/

export function CinematicIntroWrapper() {
  /*
    null = still determining (SSR + first client frame)
    true = show intro (first visit)
    false = skip intro (return visit or intro just completed)
  */
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    // Runs only on the client after hydration — sessionStorage is safe here
    let played = false;
    try {
      played = !!sessionStorage.getItem("vatto-intro-played");
    } catch {
      played = false; // sessionStorage blocked in private mode — show intro
    }
    setShow(!played);
  }, []);

  const handleComplete = useCallback(() => {
    setShow(false);
  }, []);

  // null (SSR / checking) → render a full-screen solid black backdrop to prevent content flash during hydration
  if (show === null) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#050505", // Matches var(--color-bg)
          zIndex: 99999,
          pointerEvents: "all",
        }}
      />
    );
  }

  return (
    <AnimatePresence>
      {show && <CinematicIntro onComplete={handleComplete} />}
    </AnimatePresence>
  );
}

