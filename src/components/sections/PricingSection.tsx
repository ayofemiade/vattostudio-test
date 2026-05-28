"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, Calculator, Sparkles } from "lucide-react";

// Plans data containing both local (NGN) and global (USD) parameters
const PLANS = [
  {
    id: "starter",
    label: "Starter",
    price: { NGN: 350000, USD: 600 },
    period: "/ project",
    tagline: "For ambitious startups finding their voice and positioning.",
    features: [
      "Brand strategy workshop (2 hours)",
      "Premium logo & visual mark options",
      "Sophisticated color system & typography rules",
      "Detailed Brand guidelines booklet (PDF)",
      "3 revision rounds & standard assets handoff",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    id: "studio",
    label: "Studio",
    price: { NGN: 850000, USD: 1500 },
    period: "/ project",
    tagline: "Our flagship package. Full cinematic brand identity build.",
    features: [
      "Everything in Starter package",
      "Expanded brand identity system & styles",
      "Motion identity / bespoke logo animation",
      "Curated social media assets & templates",
      "Campaign concept, photography & art direction",
      "Priority production support & asset catalog",
    ],
    cta: "Start Studio",
    featured: true,
  },
  {
    id: "director",
    label: "Director",
    price: { NGN: "Custom", USD: "Custom" },
    period: "",
    tagline: "End-to-end multi-disciplinary production. No ceilings.",
    features: [
      "Everything in flagship Studio",
      "Full cinematic campaign production & media planning",
      "Narrative brand film & curated motion catalog",
      "Widescreen web design & React/Next.js build",
      "Dedicated creative lead & design liaison",
      "Strategic ongoing retainer options",
    ],
    cta: "Let's Talk",
    featured: false,
  },
];

// Scope Add-on choices for the Interactive Estimator
const ADDONS = [
  {
    id: "development",
    label: "Next.js / Webflow Development",
    desc: "Bespoke development with GSAP animations & SEO setup.",
    price: { NGN: 450000, USD: 800 },
  },
  {
    id: "motion",
    label: "Bespoke Motion System",
    desc: "Cinematic interface motion, transitions, & sound cues.",
    price: { NGN: 200000, USD: 350 },
  },
  {
    id: "copywriting",
    label: "Creative Narrative & Copy",
    desc: "Brand voice guidelines, website copy, and deck outlines.",
    price: { NGN: 150000, USD: 250 },
  },
  {
    id: "print",
    label: "Print System & Packaging Design",
    desc: "High-end stationery layout, brand merch & luxury box templates.",
    price: { NGN: 180000, USD: 300 },
  },
];

// Currency formatting utility
function formatPrice(val: number | string, currency: "NGN" | "USD") {
  if (typeof val === "string") return val;
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  }
}

/* ─── Premium Pricing Card with Hover Dimming Support ─── */
function PricingCard({
  plan,
  index,
  currency,
  hoveredIndex,
  setHoveredIndex,
}: {
  plan: (typeof PLANS)[0];
  index: number;
  currency: "NGN" | "USD";
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();
  const isHovered = hoveredIndex === index;
  const isAnyCardHovered = hoveredIndex !== null;

  // Determine pricing values
  const currentPriceRaw = plan.price[currency];
  const priceDisplay = typeof currentPriceRaw === "number" ? formatPrice(currentPriceRaw, currency) : currentPriceRaw;

  // Styling properties depending on layout themes
  const baseCardStyles = plan.featured
    ? "bg-[#0A0A0A] text-white border-var-gold shadow-xl"
    : "bg-white text-[#0A0A0A] border-black/5 shadow-md shadow-black/[0.02]";

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // premium ease-out expo
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`relative flex flex-col p-8 sm:p-10 rounded-[6px] border transition-all duration-700 ease-out-expo overflow-hidden ${baseCardStyles}`}
      style={{
        opacity: isAnyCardHovered ? (isHovered ? 1 : 0.45) : 1,
        transform: isHovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        filter: isAnyCardHovered && !isHovered ? "grayscale(30%) blur(0.4px)" : "grayscale(0%) blur(0px)",
        borderColor: plan.featured
          ? "#C9A84C"
          : (isHovered ? "rgba(10, 10, 10, 0.4)" : "rgba(10, 10, 10, 0.08)"),
        boxShadow: plan.featured && isHovered
          ? "0 24px 48px rgba(201, 168, 76, 0.12)"
          : (isHovered ? "0 20px 40px rgba(0,0,0,0.06)" : "none"),
      }}
    >
      {/* Premium Metallic Shimmer Overlay */}
      <motion.div
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: plan.featured
            ? "linear-gradient(135deg, transparent 30%, rgba(201, 168, 76, 0.12) 50%, transparent 70%)"
            : "linear-gradient(135deg, transparent 30%, rgba(10, 10, 10, 0.04) 50%, transparent 70%)",
        }}
      />

      {/* Featured Badge */}
      {plan.featured && (
        <div className="absolute top-0 right-6 bg-[#C9A84C] text-[#0A0A0A] font-mono text-[9px] tracking-[0.2em] uppercase py-1.5 px-4 rounded-b-[4px] font-bold z-20">
          Most Popular
        </div>
      )}

      {/* Card Header details */}
      <span
        className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 block"
        style={{
          color: plan.featured ? "#C9A84C" : "rgba(10, 10, 10, 0.45)",
        }}
      >
        {plan.label}
      </span>

      {/* Price with slide-and-fade triggers on region switch */}
      <div className="mb-4 flex items-baseline relative z-20 overflow-hidden min-h-[4.5rem]">
        <AnimatePresence mode="wait">
          <motion.span
            key={priceDisplay}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-[2.75rem] sm:text-[3.5rem] tracking-[0.01em] leading-none"
            style={{
              color: plan.featured ? "#FFFFFF" : "#0A0A0A",
            }}
          >
            {priceDisplay}
          </motion.span>
        </AnimatePresence>

        {plan.period && (
          <span
            className="font-mono text-[11px] tracking-[0.1em] ml-2"
            style={{
              color: plan.featured ? "rgba(255, 255, 255, 0.45)" : "rgba(10, 10, 10, 0.4)",
            }}
          >
            {plan.period}
          </span>
        )}
      </div>

      {/* Tagline */}
      <p
        className="font-body text-[13.5px] leading-relaxed mb-8 pb-8 border-b relative z-20"
        style={{
          color: plan.featured ? "rgba(255, 255, 255, 0.65)" : "rgba(10, 10, 10, 0.55)",
          borderColor: plan.featured ? "rgba(255, 255, 255, 0.08)" : "rgba(10, 10, 10, 0.08)",
        }}
      >
        {plan.tagline}
      </p>

      {/* Features checklist */}
      <ul className="flex flex-col gap-4 mb-10 flex-1 list-none p-0 m-0 relative z-20">
        {plan.features.map((feature, fIdx) => (
          <li
            key={fIdx}
            className="flex items-start gap-3.5 font-body text-[13.5px] leading-relaxed"
            style={{
              color: plan.featured ? "#FFFFFF" : "#0A0A0A",
            }}
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 6 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 mt-1"
            >
              <Check
                size={14}
                strokeWidth={2.5}
                style={{
                  color: "#C9A84C",
                }}
              />
            </motion.div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Interactive CTA buttons */}
      <a
        href="#contact"
        data-cursor
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="inline-flex justify-center items-center font-mono text-[10px] tracking-[0.2em] uppercase py-4 px-6 rounded-[2px] border relative z-20 transition-all duration-500"
        style={{
          background: plan.featured
            ? (isHovered ? "transparent" : "#C9A84C")
            : (isHovered ? "#0A0A0A" : "transparent"),
          color: plan.featured
            ? (isHovered ? "#C9A84C" : "#0A0A0A")
            : (isHovered ? "#FFFFFF" : "rgba(10, 10, 10, 0.7)"),
          borderColor: plan.featured
            ? "#C9A84C"
            : (isHovered ? "#0A0A0A" : "rgba(10, 10, 10, 0.15)"),
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PRICING COMPONENT
   ═══════════════════════════════════════════ */
export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  // Local interactive states
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Bento Estimator states
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleToggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Base plan estimator base rate selection: Studio defaults
  const selectedBaseRate = 850000;
  const selectedBaseRateUSD = 1500;

  // Compute calculated cumulative estimate
  const cumulativeAddonsNGN = ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce(
    (acc, curr) => acc + curr.price.NGN,
    0
  );
  const cumulativeAddonsUSD = ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce(
    (acc, curr) => acc + curr.price.USD,
    0
  );

  const finalTotalNGN = selectedBaseRate + cumulativeAddonsNGN;
  const finalTotalUSD = selectedBaseRateUSD + cumulativeAddonsUSD;

  return (
    <section
      id="pricing"
      aria-label="Pricing Section"
      className="relative py-24 sm:py-36 bg-[#FFFFFF] border-t border-b border-black/[0.04] overflow-hidden"
    >
      {/* Background radial soft light gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-50 via-white to-white" />

      <div ref={containerRef} className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-24 flex flex-col items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="block w-6 h-[1px] bg-[#C9A84C]" />
            <span className="label-gold">Pricing Strategy</span>
            <span className="block w-6 h-[1px] bg-[#C9A84C]" />
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 35 }}
              animate={isHeadingInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
              transition={{ delay: 0.15, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-[3.25rem] sm:text-[4.5rem] md:text-[5.5rem] tracking-[0.02em] leading-[0.9] text-[#0A0A0A]"
            >
              No Surprises.<br />
              <span className="text-[#C9A84C]">Premium Execution.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-body text-[15px] sm:text-[16px] text-black/60 max-w-[48ch] mx-auto leading-relaxed mb-10"
          >
            Clear milestones. Honest value scales. Elite digital direction.
            We operate under clear scopes to deliver uncompromising luxury outputs.
          </motion.p>

          {/* Region / Currency sliding toggle */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative flex items-center p-1 bg-black/[0.04] rounded-full border border-black/5"
          >
            <div className="relative flex justify-between gap-1">
              <button
                onClick={() => setCurrency("NGN")}
                className="relative px-6 py-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-bold transition-all z-20"
                style={{
                  color: currency === "NGN" ? "#FFFFFF" : "rgba(10, 10, 10, 0.5)",
                }}
              >
                NGN [Local]
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className="relative px-6 py-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-bold transition-all z-20"
                style={{
                  color: currency === "USD" ? "#FFFFFF" : "rgba(10, 10, 10, 0.5)",
                }}
              >
                USD [Global]
              </button>

              {/* Sliding bubble slider element */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute top-0 bottom-0 rounded-full bg-[#0A0A0A] shadow-md z-10"
                style={{
                  left: currency === "NGN" ? 0 : "50%",
                  width: "50%",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 items-stretch">
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              currency={currency}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* ─── Premium Bento Interactive Estimate Calculator ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-black/[0.02] border border-black/5 rounded-[6px] p-8 sm:p-12"
        >
          {/* Subtle gold grid element */}
          <div className="absolute top-0 right-0 p-8 text-black/[0.04] pointer-events-none hidden md:block">
            <Calculator size={180} strokeWidth={0.5} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start relative z-20">
            {/* Left side checklist */}
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C]">
                  <Sparkles size={16} />
                </div>
                <h3 className="font-display text-[2rem] tracking-wide text-[#0A0A0A]">
                  Interactive Scope Planner
                </h3>
              </div>
              <p className="font-body text-[14px] text-black/55 mb-8 leading-relaxed max-w-[50ch]">
                Select custom agency elements to build your dynamic projection.
                We base pricing calculations on our flagship <strong className="text-[#C9A84C]">Studio Base Package</strong> as a foundation.
              </p>

              {/* Addons mapping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const addonPrice = addon.price[currency];

                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className="group flex flex-col p-5 bg-white border rounded-[4px] cursor-pointer transition-all duration-300"
                      style={{
                        borderColor: isChecked ? "#C9A84C" : "rgba(10, 10, 10, 0.06)",
                        boxShadow: isChecked ? "0 8px 24px rgba(201, 168, 76, 0.05)" : "none",
                        transform: isChecked ? "translateY(-2px)" : "translateY(0)",
                      }}
                    >
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="font-mono text-[11.5px] uppercase font-bold text-[#0A0A0A] leading-tight">
                          {addon.label}
                        </span>
                        <div
                          className="w-[15px] h-[15px] rounded-[2px] border flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: isChecked ? "#C9A84C" : "transparent",
                            borderColor: isChecked ? "#C9A84C" : "rgba(10, 10, 10, 0.25)",
                          }}
                        >
                          {isChecked && <Check size={10} strokeWidth={4} className="text-white" />}
                        </div>
                      </div>
                      <p className="font-body text-[12px] text-black/50 mb-3 leading-snug flex-1">
                        {addon.desc}
                      </p>
                      <span className="font-mono text-[11px] font-bold text-[#C9A84C]">
                        +{formatPrice(addonPrice, currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side summary sheet */}
            <div className="lg:sticky lg:top-8 w-full bg-[#0A0A0A] rounded-[4px] p-6 sm:p-8 text-white border border-[#C9A84C]/25 flex flex-col relative overflow-hidden">
              {/* Subtle visual lighting wash */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#C9A84C] via-[#0A0A0A] to-[#0A0A0A]" />

              <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mb-6">
                Scope Est. Statement
              </h4>

              {/* Estimate items table */}
              <div className="flex flex-col gap-3.5 mb-8 pb-8 border-b border-white/10 relative z-10 text-[13px] font-body">
                <div className="flex justify-between items-center text-white/50">
                  <span>Studio Base Rate</span>
                  <span className="font-mono">
                    {currency === "NGN" ? formatPrice(selectedBaseRate, "NGN") : formatPrice(selectedBaseRateUSD, "USD")}
                  </span>
                </div>

                {ADDONS.filter((a) => selectedAddons.includes(a.id)).map((addon) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={addon.id}
                    className="flex justify-between items-center text-[#C9A84C]"
                  >
                    <span className="truncate max-w-[20ch]">{addon.label}</span>
                    <span className="font-mono">+{formatPrice(addon.price[currency], currency)}</span>
                  </motion.div>
                ))}

                {selectedAddons.length === 0 && (
                  <div className="text-white/30 text-[11.5px] italic">
                    No custom additions selected. Toggles will update statement.
                  </div>
                )}
              </div>

              {/* Final total display */}
              <div className="relative z-10 mb-8">
                <span className="font-mono text-[8px] tracking-[0.28em] uppercase text-white/40 block mb-1">
                  Cumulative Budget Value
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currency === "NGN" ? finalTotalNGN : finalTotalUSD}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-display text-[2rem] sm:text-[2.5rem] text-white block leading-none"
                  >
                    {currency === "NGN" ? formatPrice(finalTotalNGN, "NGN") : formatPrice(finalTotalUSD, "USD")}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] font-body text-white/45 block mt-2 leading-relaxed">
                  *Standard estimated figures. Full scopes are detailed dynamically inside creative briefs.
                </span>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  // Pre-fill prompt logic if possible or smoothly jump to project sheet
                  const contactMsgInput = document.querySelector("textarea[name='message']") as HTMLTextAreaElement;
                  if (contactMsgInput) {
                    const addonNames = ADDONS.filter((a) => selectedAddons.includes(a.id))
                      .map((a) => a.label)
                      .join(", ");
                    contactMsgInput.value = `Hello! I checked out the scope planner on your site and I'm interested in the Studio Package with the following additions: ${addonNames || "none"}. Let's outline a plan!`;
                  }
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full inline-flex justify-center items-center font-mono text-[10px] tracking-[0.2em] uppercase py-4 rounded-[2px] bg-[#C9A84C] text-[#0A0A0A] hover:bg-transparent hover:text-[#C9A84C] border border-[#C9A84C] transition-all duration-400 font-bold z-10"
              >
                Lock Scope & Brief Us
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dynamic bottom conditions block */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.16em] uppercase text-black/45 text-center mt-14 leading-relaxed"
        >
          All pricing quotes are structured in local currency values. International contracts are processed in US Dollars.{" "}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[#C9A84C] underline hover:text-[#0A0A0A] transition-colors"
          >
            Custom requirements? Let&apos;s talk custom strategy.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
