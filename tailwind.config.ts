import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "studio-black": "#0A0A0A",
        "studio-gold": "#C9A84C",
        "studio-white": "#FFFFFF",
        "studio-dim": "#888880",
        "studio-surface": "#1A1A1A",
        "studio-border": "#222222",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      letterSpacing: {
        "widest-xl": "0.3em",
        "widest-2xl": "0.5em",
      },
      transitionTimingFunction: {
        "cinematic": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "reveal": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      transitionDuration: {
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
