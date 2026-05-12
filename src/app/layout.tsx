import type { Metadata } from "next";
import { IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

/* IBM Plex Mono */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/* Bebas Neue */
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vattostudio — Visual Storytelling Studio",
  description:
    "Vattostudio is a Nigerian creative production studio crafting cinematic brand identities, campaigns, and visual stories that reveal the truth of a brand.",
  keywords: [
    "creative studio",
    "production studio",
    "Nigeria",
    "brand identity",
    "visual storytelling",
    "Vattostudio",
  ],
  openGraph: {
    title: "Vattostudio — Visual Storytelling Studio",
    description:
      "We don't invent brands. We reveal them. Premium creative production from Lagos.",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vattostudio — Visual Storytelling Studio",
    description: "Premium creative production studio. We reveal, not invent.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${bebasNeue.variable}`}>
      <head>
        {/* Satoshi — from Fontshare CDN */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Cinematic grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Scroll progress bar */}
        <ScrollProgress />

        {/* Custom cursor — desktop only */}
        <CustomCursor />

        {/* Smooth scroll wrapper */}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
