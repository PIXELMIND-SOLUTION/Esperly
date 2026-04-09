import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS ─────────────────────────────────────────── */
const PAPER = "#F9F5ED";
const PAPER2 = "#F2EBD9";
const PAPER3 = "#EDE3CC";
const RULED = "#D6CEBA";
const INK = "#1C1209";
const INK2 = "#3A2E1A";
const FADED = "#7A6E5A";
const RED = "#A6192E";
const BLUE = "#3B6FA0";
const GREEN = "#2E7D52";
const CLIP = "#9E9E9E";
const CLIP2 = "#BDBDBD";

/* ─── PAPERCLIP ─────────────────────────────────────────── */
const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
  <svg width={size} height={size * 2.2} viewBox="0 0 24 52" fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={CLIP2} strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 4" opacity="0.6" fill="none" />
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
      const value = Math.min(
        start + (end - start) * (progress / duration),
        end
      );
      setCount(Math.floor(value));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, start, trigger]);

  return count;
};

/* ─── METRIC CHIP ─────────────────────────────────────────── */
const MetricChip = ({ m, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const colors = [RED, BLUE, GREEN, RED];
  const c = colors[index % colors.length];

  // extract numeric part
  const numericValue = parseInt(m.value.replace(/[^0-9]/g, "")) || 0;
  const counter = useCounter(numericValue, 1200, 0, inView);

  const displayValue = m.value.includes("%")
    ? `${counter}%`
    : m.value.includes("₹")
    ? `₹${counter}`
    : m.value.includes("★")
    ? `${(counter / 10).toFixed(1)}★`
    : m.value.includes("×")
    ? `${counter}×`
    : counter;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        y: -6,
        scale: 1.03,
        boxShadow: `0px 10px 25px ${c}40`,
      }}
      transition={{ duration: 0.4 }}
      style={{
        background: PAPER,
        border: `1px solid ${RULED}`,
        borderRadius: 3,
        padding: "clamp(16px,2vw,22px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: c }} />

      {/* ruled lines */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: 28 + i * 18, height: 1,
          background: RULED, opacity: 0.6,
        }} />
      ))}

      <div style={{
        fontFamily: "monospace",
        fontSize: 11,
        color: c,
        letterSpacing: "0.15em",
        position: "absolute",
        top: 8,
        right: 10,
        opacity: 0.5,
      }}>
        {m.symbol}
      </div>

      <p style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "clamp(28px,4vw,44px)",
        fontWeight: 900,
        color: c,
        lineHeight: 1,
        marginTop: 8,
      }}>
        {displayValue}
      </p>

      <p style={{
        fontFamily: "monospace",
        fontSize: "clamp(9px,1vw,11px)",
        color: INK2,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>
        {m.label}
      </p>

      <p style={{
        fontSize: "clamp(9px,1vw,10px)",
        color: FADED,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
      }}>
        {m.sub}
      </p>
    </motion.div>
  );
};

/* ─── DATA ─────────────────────────────────────────── */
const metrics = [
  { value: "98%", label: "Completion Rate", sub: "vs 12% industry avg", symbol: "★" },
  { value: "49", label: "Mentor Rating", sub: "across 500+ mentors", symbol: "✓" },
  { value: "3×", label: "Faster Progress", sub: "than self-study", symbol: "↑" },
  { value: "18", label: "Avg Package (LPA)", sub: "for placed students", symbol: "₹" },
];

/* ─── MAIN SECTION ─────────────────────────────────────────── */
export default function ExperienceSection() {
  return (
    <div style={{
      background: PAPER3,
      borderTop: `2px solid ${RULED}`,
      borderBottom: `2px solid ${RULED}`,
      padding: "clamp(20px,3vw,36px)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 8, right: 24, opacity: 0.25 }}>
        <Paperclip size={22} rotate={-8} />
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}>
          {metrics.map((m, i) => (
            <MetricChip key={i} m={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}