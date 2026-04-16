import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS ─────────────────────────────────────────── */
const PAPER = "#FBF7F2";
const PAPER2 = "#F2EBD9";
const PAPER3 = "#EDE3CC";
const RULED = "#D6CEBA";
const INK = "#1C1209";
const INK2 = "#3A2E1A";
const FADED = "#7A6E5A";
const RED = "#EB6664";
const BLUE = "#3B6FA0";
const GREEN = "#2E7D52";
const CLIP = "#9E9E9E";
const CLIP2 = "#BDBDBD";
const MARGIN_LINE = "#E8A0A8";
const HOLE_SHADOW = "#C8B89A";

/* ─── PAPERCLIP ─────────────────────────────────────────── */
const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
  <svg
    width={size}
    height={size * 2.2}
    viewBox="0 0 24 52"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
  >
    <path
      d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={CLIP2}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeDasharray="2 4"
      opacity="0.6"
      fill="none"
    />
  </svg>
);

/* ─── COUNTER HOOK ─────────────────────────────────────────── */
const useCounter = (end, duration = 1500, start = 0, trigger = false) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) return;
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const value = Math.min(start + (end - start) * (progress / duration), end);
      setCount(Math.floor(value));
      if (progress < duration) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start, trigger]);

  return count;
};

/* ─── NOTEBOOK RULED BACKGROUND ─────────────────────────────── */
const NotebookBackground = () => {
  const LINE_SPACING = 28;
  const NUM_LINES = 40;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Margin line — classic red ruled notebook margin */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "clamp(20px, 5vw, 72px)",
          width: "1.5px",
          background: MARGIN_LINE,
          opacity: 0.7,
          zIndex: 1,
        }}
      />


      {/* Horizontal ruled lines */}
      {Array.from({ length: NUM_LINES }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 22 + i * LINE_SPACING,
            height: "1px",
            background: RULED,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
};

const UnevenGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <pattern
            id="unevenGrid"
            width="100"   // ⬅️ increased size
            height="100"  // ⬅️ increased size
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <path
              d="M0 25 Q50 30 100 25"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
            <path
              d="M0 75 Q50 70 100 75"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />

            {/* Vertical lines */}
            <path
              d="M25 0 Q30 50 25 100"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
            <path
              d="M75 0 Q70 50 75 100"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#unevenGrid)" />
      </svg>
    </div>
  );
};

/* ─── METRIC CHIP ─────────────────────────────────────────── */
const MetricChip = ({ m, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const colors = [RED, BLUE, GREEN, RED];
  const c = colors[index % colors.length];

  const numericValue = parseFloat(m.value.replace(/[^0-9.]/g, "")) || 0;
  const counter = useCounter(numericValue * 10, 1200, 0, inView);

  /* ⭐ FIXED DISPLAY LOGIC */
  const displayValue = m.label === "Mentor Rating"
    ? `${(counter / 10).toFixed(1)} ⭐`
    : m.value.includes("%")
    ? `${Math.floor(counter)}%`
    : m.value.includes("₹")
    ? `₹${Math.floor(counter)}`
    : m.value.includes("×")
    ? `${Math.floor(counter)}×`
    : Math.floor(counter);

  const rotations = [-2, 1.5, -1.5, 2]; // sticky tilt

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        y: -6,
        scale: 1.04,
        rotate: 0,
        boxShadow: `0px 14px 30px ${c}30`,
      }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{
        background: PAPER,
        border: `1px solid ${RULED}`,
        borderRadius: 4,
        padding: "clamp(16px,2vw,22px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",

        /* ✨ STICKY NOTE FEEL */
        transform: `rotate(${rotations[index]}deg)`,
        boxShadow: `
          3px 6px 0 ${c}30,
          0 10px 25px rgba(0,0,0,0.15)
        `,
      }}
    >
      {/* 📌 TOP PIN */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 14,
        }}
      >
        📌
      </div>

      {/* TOP STRIP */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: c,
        }}
      />

      {/* LIGHT PAPER TEXTURE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 20px, #000 21px)",
        }}
      />

      {/* VALUE */}
      <p
        style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: "clamp(28px,4vw,42px)",
          fontWeight: 900,
          color: c,
          lineHeight: 1,
          marginTop: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        {displayValue}
      </p>

      {/* LABEL */}
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "clamp(9px,1vw,11px)",
          color: INK2,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}
      >
        {m.label}
      </p>

      {/* SUBTEXT */}
      <p
        style={{
          fontSize: "clamp(9px,1vw,10px)",
          color: FADED,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          position: "relative",
          zIndex: 1,
        }}
      >
        {m.sub}
      </p>

      {/* TORN EDGE EFFECT */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `repeating-linear-gradient(90deg, ${RULED} 0px, ${RULED} 6px, transparent 6px, transparent 10px)`,
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
};

/* ─── DATA ─────────────────────────────────────────── */
const metrics = [
  { value: "99%",  label: "Completion Rate",  sub: "Consistent learning. Strong finish.",   symbol: "★" },
  { value: "3×",   label: "Faster Progress",  sub: "Learn faster. Achieve more.",            symbol: "↑" },
  { value: "4.9",  label: "Mentor Rating",    sub: "Trusted. Experienced. Student-first",    symbol: "✓" },
  { value: "98%",  label: "Real Growth",      sub: "Steady improvement. Proven success",     symbol: "₹" },
];

/* ─── MAIN SECTION ─────────────────────────────────────────── */
export default function ExperianceCount() {
  return (
    <div
      style={{
        background: PAPER,
        padding: "clamp(24px,4vw,48px) clamp(16px,4vw,40px)",
        position: "relative",
        overflow: "hidden",
        minHeight: 220,
      }}
    >
      {/* Full-section notebook background */}
      <UnevenGrid />

      {/* Decorative paperclip */}
      <div style={{ position: "absolute", top: 8, right: 28, opacity: 0.28, zIndex: 3 }}>
        <Paperclip size={22} rotate={-8} />
      </div>

      {/* Section heading — looks like a notebook title */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          marginBottom: "clamp(16px,3vw,28px)",
          paddingLeft: 80,
        }}
      >
        <span
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(11px,1.4vw,14px)",
            color: FADED,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontStyle: "italic",
            borderBottom: `1px solid ${RULED}`,
            paddingBottom: 2,
          }}
        >
          Our Numbers at a Glance
        </span>
      </div>

      {/* Cards grid */}
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 3 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(10px,2vw,18px)",
            paddingLeft: "clamp(0px,4vw,80px)",
          }}
        >
          {metrics.map((m, i) => (
            <MetricChip key={i} m={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}