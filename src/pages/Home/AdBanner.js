// components/AdScroller.js
import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   AD DATA — replace with real ads from your API
───────────────────────────────────────────── */
const DEFAULT_ADS = [
  {
    id: "ad1",
    label: "SPONSORED",
    headline: "Master Calculus in 30 Days",
    subline: "Live doubt sessions + 200+ practice sets",
    cta: "Enroll Free →",
    href: "#",
    accent: "#dc2626",
    noteColor: { bg: "#fff9c4", fold: "#e6c700", text: "#78350f" },
    icon: "📐",
    badge: "50% OFF",
  },
  {
    id: "ad2",
    label: "FEATURED",
    headline: "Physics Olympiad Bootcamp",
    subline: "IIT-JEE & NEET crash course by top rankers",
    cta: "Book Seat →",
    href: "#",
    accent: "#0891b2",
    noteColor: { bg: "#dde9ff", fold: "#93c5fd", text: "#1e3a5f" },
    icon: "⚡",
    badge: "NEW",
  },
  {
    id: "ad3",
    label: "SPONSORED",
    headline: "Code Your First App Today",
    subline: "Python · JavaScript · React — beginner to pro",
    cta: "Start Now →",
    href: "#",
    accent: "#7c3aed",
    noteColor: { bg: "#f0d9ff", fold: "#c084fc", text: "#581c87" },
    icon: "💻",
  },
  {
    id: "ad4",
    label: "PROMOTED",
    headline: "Chemistry Formula Flashcards",
    subline: "1200+ cards, spaced repetition engine",
    cta: "Get for ₹99 →",
    href: "#",
    accent: "#ea580c",
    noteColor: { bg: "#ffe4cc", fold: "#fb923c", text: "#7c2d12" },
    icon: "⚗️",
    badge: "HOT",
  },
  {
    id: "ad5",
    label: "SPONSORED",
    headline: "English Grammar Made Simple",
    subline: "Video lessons loved by 1M+ students",
    cta: "Watch Free →",
    href: "#",
    accent: "#16a34a",
    noteColor: { bg: "#d4f4dd", fold: "#4ade80", text: "#14532d" },
    icon: "📖",
  },
  {
    id: "ad6",
    label: "FEATURED",
    headline: "History UPSC Prep 2025",
    subline: "PYQ analysis + current affairs bundle",
    cta: "Download →",
    href: "#",
    accent: "#ca8a04",
    noteColor: { bg: "#fef9c3", fold: "#fde047", text: "#713f12" },
    icon: "🏛️",
    badge: "FREE",
  },
  {
    id: "ad7",
    label: "PROMOTED",
    headline: "Economics for CBSE Grade 12",
    subline: "Chapter-wise solved papers + mock tests",
    cta: "Try 7 Days →",
    href: "#",
    accent: "#0d9488",
    noteColor: { bg: "#d1faf5", fold: "#2dd4bf", text: "#134e4a" },
    icon: "📊",
  },
];

/* ─────────────────────────────────────────────
   Injected styles
───────────────────────────────────────────── */
const AdScrollerStyles = () => (
  <style>{`
    @keyframes adTicker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ad-ticker-track {
      display: flex;
      width: max-content;
      animation: adTicker var(--ticker-duration, 36s) linear infinite;
    }
    .ad-ticker-track:hover { animation-play-state: paused; }
    .ad-ticker-wrap {
      overflow: hidden;
      position: relative;
    }
    .ad-ticker-wrap::before,
    .ad-ticker-wrap::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: clamp(40px, 6vw, 80px);
      z-index: 2;
      pointer-events: none;
    }
    .ad-ticker-wrap::before { left: 0;  background: linear-gradient(to right, var(--mask-from, #fef9f0), transparent); }
    .ad-ticker-wrap::after  { right: 0; background: linear-gradient(to left,  var(--mask-from, #fef9f0), transparent); }

    .ad-card {
      flex-shrink: 0;
      cursor: pointer;
      position: relative;
      margin: 0 clamp(0.5rem, 1.5vw, 1rem);
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      border-radius: 2px;
    }
    .ad-card:hover {
      transform: translateY(-5px) rotate(0deg) scale(1.03) !important;
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   Pushpin SVG
───────────────────────────────────────────── */
const Pushpin = ({ color = "#dc2626", size = 18 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 24 36" fill="none">
    <circle cx="12" cy="10" r="9" fill={color} />
    <circle cx="12" cy="10" r="5" fill="white" fillOpacity="0.35" />
    <rect x="10.5" y="18" width="3" height="18" rx="1.5" fill="#78716c" />
  </svg>
);

const ruledBg =
  "repeating-linear-gradient(transparent, transparent 27px, rgba(243,213,213,0.45) 28px)";

/* ─────────────────────────────────────────────
   Single Ad Card
───────────────────────────────────────────── */
const AdCard = ({ ad, rotDeg }) => {
  const [hov, setHov] = useState(false);
  const { noteColor: nc, accent } = ad;

  return (
    <div
      className="ad-card"
      style={{
        transform: `rotate(${hov ? 0 : rotDeg}deg)`,
        width: "clamp(180px, 22vw, 240px)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => window.open(ad.href, "_blank", "noopener")}
      role="link"
      aria-label={ad.headline}
    >
      {/* Pushpin */}
      <div
        style={{
          position: "absolute",
          top: "-18px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Pushpin color={accent} size={18} />
      </div>

      {/* Card body */}
      <div
        style={{
          background: nc.bg,
          border: `1.5px solid ${nc.fold}`,
          borderRadius: "2px",
          boxShadow: hov
            ? `5px 7px 0 ${nc.fold}88, 0 16px 32px rgba(0,0,0,0.16)`
            : `3px 4px 0 ${nc.fold}55, 0 4px 12px rgba(0,0,0,0.09)`,
          transition: "box-shadow 0.22s ease",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Folded corner */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "24px",
            height: "24px",
            background: `linear-gradient(225deg, ${nc.fold}99 50%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />

        {/* Top accent strip */}
        <div style={{ background: accent, height: "6px", width: "100%" }} />

        {/* Body text — ruled paper */}
        <div
          style={{
            padding: "10px 12px 14px",
            backgroundImage: ruledBg,
            backgroundSize: "100% 28px",
            position: "relative",
          }}
        >
          {/* Left margin line */}
          <div
            style={{
              position: "absolute",
              left: "26px",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(239,68,68,0.25)",
              pointerEvents: "none",
            }}
          />

          {/* Label + icon row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2px",
              paddingLeft: "14px",
            }}
          >
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.52rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accent,
                opacity: 0.8,
              }}
            >
              {ad.label}
            </span>
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>{ad.icon}</span>
          </div>

          {/* Headline */}
          <h4
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: "clamp(0.72rem, 1.8vw, 0.84rem)",
              color: "#1c1917",
              lineHeight: "1.35",
              paddingLeft: "14px",
              margin: "0 0 4px 0",
            }}
          >
            {ad.headline}
          </h4>

          {/* Subline */}
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.58rem, 1.4vw, 0.66rem)",
              color: "#78716c",
              paddingLeft: "14px",
              margin: "0 0 8px 0",
              lineHeight: "1.4",
            }}
          >
            {ad.subline}
          </p>

          {/* CTA + badge */}
          <div
            style={{
              paddingLeft: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(0.58rem, 1.5vw, 0.68rem)",
                fontWeight: 700,
                color: accent,
                letterSpacing: "0.04em",
              }}
            >
              {ad.cta}
            </span>
            {ad.badge && (
              <span
                style={{
                  background: accent,
                  color: "#fff",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.5rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "2px 6px",
                  borderRadius: "2px",
                  transform: "rotate(2deg)",
                  display: "inline-block",
                  boxShadow: `2px 2px 0 ${accent}55`,
                }}
              >
                {ad.badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   AdScroller — default export
   Props:
     ads        – array of ad objects (optional, defaults to built-in ads)
     speed      – scroll speed in px/s (default 60)
     title      – header label text
     bgColor    – page background colour for edge fade match
     maskColor  – edge fade colour (usually same as bgColor)
     className  – extra className on wrapper
───────────────────────────────────────────── */
export default function AdScroller({
  ads = DEFAULT_ADS,
  speed = 60,
  title = "PROMOTIONS & OFFERS",
  bgColor = "#fef9f0",
  maskColor = "#fef9f0",
  className = "",
}) {
  const doubled = [...ads, ...ads];
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(ads.length * 4);

  useEffect(() => {
    if (trackRef.current) {
      const totalW = trackRef.current.scrollWidth / 2;
      setDuration(totalW / speed);
    }
  }, [ads.length, speed]);

  const rotations = [-2.5, 1.5, -1, 2, -1.8, 1, -2, 1.5, -1.2, 2.2, -0.8, 1.8];

  return (
    <>
      <AdScrollerStyles />

      <div
        className={className}
        style={{
          background: bgColor,
          backgroundImage: ruledBg,
          backgroundSize: "100% 28px",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(1.5rem, 3vw, 2.5rem) 0 clamp(1rem, 2vw, 1.5rem)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0 clamp(1rem, 5vw, 3rem)",
            marginBottom: "clamp(1.25rem, 3vw, 2rem)",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              borderTop: "1.5px dashed rgba(239,68,68,0.25)",
            }}
          />
          <div
            style={{
              background: "rgba(252,211,77,0.8)",
              padding: "4px 18px",
              borderRadius: "2px",
              transform: "rotate(-1deg)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.14)",
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: "clamp(0.55rem, 1.6vw, 0.68rem)",
              color: "#78350f",
              letterSpacing: "0.18em",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            📢 {title}
          </div>
          <div
            style={{
              flex: 1,
              height: "1px",
              borderTop: "1.5px dashed rgba(239,68,68,0.25)",
            }}
          />
        </div>

        {/* Corkboard strip */}
        <div
          style={{
            background: "#c8a97e",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
            borderTop: "4px solid #a07850",
            borderBottom: "4px solid #a07850",
            padding: "clamp(1.5rem, 3vw, 2rem) 0 clamp(1rem, 2vw, 1.5rem)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.14)",
          }}
        >
          {/* Scrolling ticker */}
          <div
            className="ad-ticker-wrap"
            style={{
              "--mask-from": maskColor,
              "--ticker-duration": `${duration}s`,
            }}
          >
            <div className="ad-ticker-track" ref={trackRef}>
              {doubled.map((ad, i) => (
                <AdCard
                  key={`${ad.id}-${i}`}
                  ad={ad}
                  rotDeg={rotations[i % rotations.length]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <div
          style={{
            textAlign: "center",
            marginTop: "0.75rem",
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(0.5rem, 1.2vw, 0.58rem)",
            color: "#a8a29e",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          hover to pause · click to visit
        </div>
      </div>
    </>
  );
}