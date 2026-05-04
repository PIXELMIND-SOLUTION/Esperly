import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── PAPERCLIP SVG ─────────────────────────────────────────── */
const Paperclip = ({ rotate = 0 }) => (
  <svg
    width="22"
    height="48"
    viewBox="0 0 24 52"
    fill="none"
    className="opacity-30"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path
      d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke="#9E9E9E"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke="#BDBDBD"
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

/* ─── CARD ACCENT COLORS ─────────────────────────────────────── */
const ACCENTS = [
  { topBar: "bg-[#EB6664]", valueColor: "text-[#EB6664]", shadow: "shadow-[3px_6px_0_rgba(235,102,100,0.2),0_10px_25px_rgba(0,0,0,0.15)]" },
  { topBar: "bg-[#3B6FA0]", valueColor: "text-[#3B6FA0]", shadow: "shadow-[3px_6px_0_rgba(59,111,160,0.2),0_10px_25px_rgba(0,0,0,0.15)]" },
  { topBar: "bg-[#2E7D52]", valueColor: "text-[#2E7D52]", shadow: "shadow-[3px_6px_0_rgba(46,125,82,0.2),0_10px_25px_rgba(0,0,0,0.15)]" },
  { topBar: "bg-[#EB6664]", valueColor: "text-[#EB6664]", shadow: "shadow-[3px_6px_0_rgba(235,102,100,0.2),0_10px_25px_rgba(0,0,0,0.15)]" },
];

const ROTATIONS = ["-rotate-2", "rotate-[1.5deg]", "-rotate-[1.5deg]", "rotate-2"];

/* ─── METRIC CHIP ─────────────────────────────────────────── */
const MetricChip = ({ m, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const accent = ACCENTS[index % ACCENTS.length];

  const numericValue = parseFloat(m.value.replace(/[^0-9.]/g, "")) || 0;
  const counter = useCounter(numericValue * 10, 1200, 0, inView);

  const displayValue =
    m.label === "Mentor Rating"
      ? `${(counter / 10).toFixed(1)} ⭐`
      : m.value.includes("%")
      ? `${Math.floor(counter)}%`
      : m.value.includes("₹")
      ? `₹${Math.floor(counter)}`
      : m.value.includes("×")
      ? `${Math.floor(counter)}×`
      : Math.floor(counter);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -6, scale: 1.04, rotate: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`
        relative overflow-hidden cursor-pointer
        bg-[#FBF7F2] border border-[#D6CEBA] rounded-[4px]
        px-4 py-5 text-center
        ${ROTATIONS[index]} ${accent.shadow}
      `}
    >
      {/* Pin */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-sm">
        📌
      </div>

      {/* Top color bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${accent.topBar}`} />

      {/* Value */}
      <p
        className={`
          font-serif text-[clamp(28px,4vw,42px)] font-black leading-none
          mt-4 relative z-10 ${accent.valueColor}
        `}
        style={{ fontFamily: "Fraunces, Georgia, serif" }}
      >
        {displayValue}
      </p>

      {/* Label */}
      <p
        className="font-mono text-[clamp(9px,1vw,11px)] text-[#3A2E1A]
          tracking-widest uppercase relative z-10 mt-1"
      >
        {m.label}
      </p>

      {/* Subtext */}
      <p
        className="text-[clamp(9px,1vw,10px)] text-[#7A6E5A] italic relative z-10"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {m.sub}
      </p>

      {/* Torn edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
        style={{
          background:
            "repeating-linear-gradient(90deg, #D6CEBA 0px, #D6CEBA 6px, transparent 6px, transparent 10px)",
        }}
      />
    </motion.div>
  );
};

/* ─── DATA ─────────────────────────────────────────── */
const metrics = [
  { value: "99%",  label: "Completion Rate",  sub: "Consistent learning. Strong finish."  },
  { value: "3×",   label: "Faster Progress",  sub: "Learn faster. Achieve more."          },
  { value: "4.9",  label: "Mentor Rating",    sub: "Trusted. Experienced. Student-first." },
  { value: "98%",  label: "Real Growth",      sub: "Steady improvement. Proven success."  },
];

/* ─── NOTEBOOK RULED BACKGROUND ─────────────────────────────── */
const NotebookBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Margin line */}
    <div
      className="absolute top-0 bottom-0 w-[1.5px] opacity-70 z-10"
      style={{
        left: "clamp(20px, 5vw, 72px)",
        background: "#E8A0A8",
      }}
    />
    {/* Ruled lines */}
    {Array.from({ length: 40 }, (_, i) => (
      <div
        key={i}
        className="absolute left-0 right-0 h-px opacity-75"
        style={{ top: 22 + i * 28, background: "#D6CEBA" }}
      />
    ))}
  </div>
);

/* ─── MAIN SECTION ─────────────────────────────────────────── */
export default function ExperienceCount() {
  return (
    <div className="relative overflow-hidden bg-[transparent] 
      px-4 sm:px-6 md:px-10 lg:px-16 
      py-8 sm:py-10 md:py-14 lg:py-16 
      min-h-[200px]">

      {/* Decorative paperclip */}
      <div className="absolute top-2 right-3 sm:right-6 md:right-10 z-10">
        <Paperclip rotate={-8} />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10">
        <span
          className="block text-[12px] sm:text-sm md:text-base 
          text-[#000] tracking-[0.18em] uppercase font-bold 
          border-b border-[#D6CEBA] pb-1 w-fit mx-auto"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          Our Numbers at a Glance
        </span>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          gap-3 sm:gap-4 md:gap-6
        "
        >
          {metrics.map((m, i) => (
            <MetricChip key={i} m={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}