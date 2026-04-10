import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS ─────────────────────────────────────────── */
const PAPER = "#F9F5ED";
const RULED = "#D6CEBA";
const INK = "#1C1209";
const FADED = "#7A6E5A";
const RED = "#A6192E";
const BLUE = "#3B6FA0";
const GREEN = "#2E7D52";
const TAPE = "rgba(200,195,170,0.55)";
const PENCIL = "#8C7B6B";

const WashiTape = ({ width = 60, height = 18, color = TAPE, rotate = -2, style = {} }) => (
  <div style={{
    width, height, background: color,
    borderLeft: "1px solid rgba(180,170,140,0.3)",
    borderRight: "1px solid rgba(180,170,140,0.3)",
    transform: `rotate(${rotate}deg)`,
    position: "absolute", ...style,
  }} />
);

const Stamp = ({ text, color = RED, rotate = -8, style = {} }) => (
  <div style={{
    display: "inline-block",
    border: `2.5px solid ${color}`,
    borderRadius: 4,
    padding: "3px 10px",
    fontFamily: "monospace",
    fontSize: "clamp(9px,1vw,11px)",
    color, letterSpacing: "0.18em",
    textTransform: "uppercase", fontWeight: 700,
    transform: `rotate(${rotate}deg)`, opacity: 0.75,
    ...style,
  }}>
    {text}
  </div>
);

const ScribbleUnderline = ({ color = RED, width = "100%", style = {} }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none"
    style={{ width, height: 12, display: "block", ...style }}>
    <path d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Highlight = ({ children, color = "#FFEB3B", style = {} }) => (
  <span style={{
    background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`,
    paddingBottom: 2, ...style,
  }}>
    {children}
  </span>
);

const PillarCard = ({ p, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const rotates = [-2, 1.5, -1, 2.5];
  const rot = rotates[index % rotates.length];

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 48, rotate: rot - 4 }}
      animate={inView ? { opacity: 1, y: 0, rotate: hovered ? 0 : rot } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: p.noteColor,
        borderRadius: 3,
        padding: "clamp(18px,2.5vw,28px)",
        position: "relative",
        cursor: "default",
        boxShadow: hovered
          ? `4px 8px 32px ${p.accent}30, 0 1px 0 rgba(255,255,255,0.8) inset`
          : "3px 5px 16px rgba(0,0,0,0.13), 0 1px 0 rgba(255,255,255,0.7) inset",
        transition: "box-shadow 0.3s",
        overflow: "visible",
      }}
    >
      <WashiTape width={52} height={16} color={TAPE} rotate={index % 2 === 0 ? -3 : 3}
        style={{ top: -8, left: "50%", transform: `translateX(-50%) rotate(${index % 2 === 0 ? -3 : 3}deg)` }} />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 3 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", left: 0, right: 0,
            top: 44 + i * 22, height: 1,
            background: p.accent + "22",
          }} />
        ))}
      </div>
      <div style={{
        position: "absolute", top: 10, right: 12,
        fontFamily: "monospace", fontSize: 11,
        color: p.accent, opacity: 0.45, letterSpacing: "0.1em",
      }}>#{p.id}</div>
      <div style={{ fontSize: "clamp(24px,3vw,32px)", marginBottom: 10, lineHeight: 1, position: "relative", zIndex: 1 }}>
        {p.icon}
      </div>
      <h3 style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "clamp(15px,1.8vw,20px)", fontWeight: 700,
        color: INK, lineHeight: 1.25, marginBottom: 8, position: "relative", zIndex: 1,
      }}>
        {p.title}
      </h3>
      <ScribbleUnderline color={p.accent} width="80%" style={{ marginBottom: 10 }} />
      <p style={{
        fontFamily: "DM Serif Display, Georgia, serif",
        fontSize: "clamp(11px,1.2vw,13px)", color: FADED,
        lineHeight: 1.7, marginBottom: 14, position: "relative", zIndex: 1,
      }}>
        {p.body}
      </p>
      <Stamp text={p.tag} color={p.accent} rotate={-1} style={{ position: "relative", zIndex: 1 }} />
    </motion.div>
  );
};

const pillars = [
  {
    id: "01", icon: "📹", label: "Live & Recorded", title: "Flexible Learning, Your Way",
    body: "Attend live sessions with real mentors or catch up with HD recordings — every lesson stays with you forever.",
    tag: "Hybrid Model", accent: RED, noteColor: "#FFFDE7"
  },
  {
    id: "02", icon: "🎯", label: "Mentor-Led", title: "1-on-1 Expert Guidance",
    body: "Industry veterans sit with you through every doubt, every deadline, every breakthrough.",
    tag: "Personalized", accent: BLUE, noteColor: "#E3F0FF"
  },
  {
    id: "03", icon: "🚀", label: "Real Projects", title: "Build. Ship. Get Hired.",
    body: "No fake assignments. Real-world projects you can put on your résumé from day one.",
    tag: "Portfolio-Ready", accent: GREEN, noteColor: "#E8F5E9"
  },
  {
    id: "04", icon: "🤝", label: "Community", title: "Learn With 10,000+ Peers",
    body: "A thriving community of learners, alumni, and mentors pushing each other further every single day.",
    tag: "Always On", accent: RED, noteColor: "#FFF3E0"
  },
];

const RuledLines = ({ count = 20, topOffset = 60, gap = 26 }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} style={{
        position: "absolute", left: 0, right: 0,
        top: topOffset + i * gap, height: 1,
        background: RULED, opacity: 0.45,
      }} />
    ))}
    <div style={{
      position: "absolute", top: 0, bottom: 0,
      left: "clamp(40px,6vw,72px)", width: 1.5,
      background: RED, opacity: 0.2,
    }} />
  </div>
);

const Bubble = ({ style }) => (
  <motion.div
    style={{
      position: "absolute",
      width: style.size,
      height: style.size,
      borderRadius: "50%",
      background: style.fill,
      left: style.left,
      top: style.top,
      pointerEvents: "none",
      filter: "blur(1px)",
      zIndex: 0,
    }}
    animate={{
      y: ["0px", style.floatY || "-30px", "0px"],
      x: [0, style.floatX || 10, 0],
      opacity: [style.opacity || 0.4, (style.opacity || 0.4) + 0.15, style.opacity || 0.4],
      scale: [1, 1.08, 1],
    }}
    transition={{
      duration: style.dur || 6,
      repeat: Infinity,
      delay: style.delay || 0,
      ease: "easeInOut",
    }}
  />
);

const heroBubbles = [
  { size: "200px", fill: "rgba(166,25,46,0.10)", left: "3%", top: "8%", floatY: "-24px", floatX: 14, dur: 7, delay: 0, opacity: 0.45 },
  { size: "130px", fill: "rgba(166,25,46,0.07)", left: "78%", top: "4%", floatY: "-30px", floatX: -12, dur: 8.5, delay: 1, opacity: 0.4 },
  { size: "95px", fill: "rgba(166,25,46,0.13)", left: "58%", top: "68%", floatY: "-18px", floatX: 9, dur: 6, delay: 2, opacity: 0.5 },
  { size: "65px", fill: "rgba(166,25,46,0.09)", left: "18%", top: "72%", floatY: "-14px", floatX: -7, dur: 5, delay: 0.5, opacity: 0.45 },
];

const PencilSVG = ({ size = 120, rotate = -35, style = {} }) => (
  <svg width={size} height={size * 0.18} viewBox="0 0 200 36" fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <rect x="20" y="8" width="148" height="20" rx="2" fill="#F5D87A" />
    <rect x="20" y="8" width="148" height="20" rx="2" stroke="#C8A820" strokeWidth="1" />
    <line x1="20" y1="14" x2="168" y2="14" stroke="#C8A820" strokeWidth="0.5" opacity="0.4" />
    <line x1="20" y1="22" x2="168" y2="22" stroke="#C8A820" strokeWidth="0.5" opacity="0.4" />
    <rect x="158" y="9" width="24" height="18" rx="2" fill="#F4A7A7" />
    <rect x="158" y="9" width="24" height="18" rx="2" stroke="#D46060" strokeWidth="0.8" />
    <rect x="153" y="8" width="8" height="20" fill={PENCIL} stroke="#BDBDBD" strokeWidth="0.5" />
    <line x1="155" y1="8" x2="155" y2="28" stroke="#BDBDBD" strokeWidth="0.5" />
    <line x1="158" y1="8" x2="158" y2="28" stroke="#BDBDBD" strokeWidth="0.5" />
    <polygon points="20,8 20,28 2,18" fill="#E8C06A" />
    <polygon points="6,12 6,24 2,18" fill="#2A1F0E" />
    <line x1="20" y1="8" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8" />
    <line x1="20" y1="28" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8" />
    <text x="70" y="22" fontFamily="monospace" fontSize="7" fill="#C8A820" opacity="0.7">ESPERLY No.2</text>
  </svg>
);

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >{children}</motion.div>
  );
};

export default function PillarsSection() {
  return (
    <section style={{
      padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
      position: "relative",
      overflow: "hidden",
      background: PAPER,
    }}>
      <RuledLines count={30} topOffset={0} gap={26} />

      {/* Decorative blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", filter: "blur(80px)", background: `radial-gradient(circle, ${RED}12, transparent)`, top: "10%", right: "5%" }} />
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", filter: "blur(60px)", background: `radial-gradient(circle, ${BLUE}10, transparent)`, bottom: "15%", left: "8%" }} />
        {heroBubbles.map((b, i) => (
          <Bubble key={i} style={{ ...b, opacity: (b.opacity || 0.4) * 0.5, top: `${20 + i * 18}%`, left: `${10 + i * 22}%` }} />
        ))}
      </div>

      {/* Decorative wave */}
      <div style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none", opacity: 0.15 }}>
        <svg width="300" height="200" viewBox="0 0 300 200">
          <path d="M300 0 C220 40, 140 30, 80 90 C40 130, 15 165, 0 200"
            stroke={RED} strokeWidth="2" fill="none" />
          <circle cx="160" cy="70" r="5" fill={RED} opacity="0.5" />
          <circle cx="100" cy="115" r="3" fill={RED} opacity="0.4" />
        </svg>
      </div>

      <div style={{ position: "absolute", top: 24, right: 24, opacity: 0.15 }} aria-hidden>
        <PencilSVG size={160} rotate={5} />
      </div>

      <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeUp>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(8px,1.2vw,14px)", flexWrap: "wrap" }}>
            <div style={{ width: 20, height: 2.5, background: RED }} />
            <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: RED, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              What We Offer
            </span>
            <Stamp text="Core" color={BLUE} rotate={3} />
          </div>
          <h2 style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(26px,4.2vw,52px)", fontWeight: 900,
            color: INK, lineHeight: 1.05, marginBottom: 6, letterSpacing: "-0.02em",
          }}>
            Four Pillars of the{" "}
            <Highlight color="#FFEB3B">
              <span style={{ color: RED, fontStyle: "italic" }}>Esperly Method</span>
            </Highlight>
          </h2>
          <ScribbleUnderline color={RED} width="clamp(160px,28vw,320px)" style={{ marginBottom: "clamp(28px,4vw,48px)" }} />
        </FadeUp>

        <div className="pillars-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(16px, 2.5vw, 28px)",
          paddingTop: 8,
        }}>
          {pillars.map((p, i) => <PillarCard p={p} index={i} key={p.id} />)}
        </div>
      </div>
    </section>
  );
}