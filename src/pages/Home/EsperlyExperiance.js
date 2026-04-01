import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";

/* ─── COLOUR TOKENS WITH #A6192E THEME ─────────────────────────────────────────── */
const PAPER   = "#F9F5ED";   // aged cream paper
const PAPER2  = "#F2EBD9";   // slightly darker paper
const PAPER3  = "#EDE3CC";   // notepaper
const RULED   = "#D6CEBA";   // ruled line colour
const INK     = "#1C1209";   // dark ink
const INK2    = "#3A2E1A";   // medium ink
const FADED   = "#7A6E5A";   // faded ink / muted
const RED     = "#A6192E";   // Primary theme color - Esperly Red
const RED2    = "#C8203A";   // secondary red
const PENCIL  = "#8C7B6B";   // pencil graphite
const CLIP    = "#9E9E9E";   // paperclip metal
const CLIP2   = "#BDBDBD";   // paperclip highlight
const YELLOW  = "#F5C842";   // sticky note yellow
const BLUE    = "#3B6FA0";   // blue pen ink
const GREEN   = "#2E7D52";   // green highlighter
const TAPE    = "rgba(200,195,170,0.55)"; // scotch tape

/* ─── SVG DECORATIONS ────────────────────────────────────────── */

/* Paperclip SVG */
const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
  <svg
    width={size} height={size * 2.2}
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

/* Pencil SVG */
const PencilSVG = ({ size = 120, rotate = -35, style = {} }) => (
  <svg
    width={size} height={size * 0.18}
    viewBox="0 0 200 36"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
  >
    {/* Body */}
    <rect x="20" y="8" width="148" height="20" rx="2" fill="#F5D87A"/>
    <rect x="20" y="8" width="148" height="20" rx="2" stroke="#C8A820" strokeWidth="1"/>
    {/* Wood grain lines */}
    <line x1="20" y1="14" x2="168" y2="14" stroke="#C8A820" strokeWidth="0.5" opacity="0.4"/>
    <line x1="20" y1="22" x2="168" y2="22" stroke="#C8A820" strokeWidth="0.5" opacity="0.4"/>
    {/* Eraser */}
    <rect x="158" y="9" width="24" height="18" rx="2" fill="#F4A7A7"/>
    <rect x="158" y="9" width="24" height="18" rx="2" stroke="#D46060" strokeWidth="0.8"/>
    {/* Ferrule */}
    <rect x="153" y="8" width="8" height="20" fill={CLIP} stroke={CLIP2} strokeWidth="0.5"/>
    <line x1="155" y1="8" x2="155" y2="28" stroke={CLIP2} strokeWidth="0.5"/>
    <line x1="158" y1="8" x2="158" y2="28" stroke={CLIP2} strokeWidth="0.5"/>
    {/* Tip */}
    <polygon points="20,8 20,28 2,18" fill="#E8C06A"/>
    <polygon points="6,12 6,24 2,18" fill="#2A1F0E"/>
    {/* Tip line */}
    <line x1="20" y1="8" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8"/>
    <line x1="20" y1="28" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8"/>
    {/* Brand text faux */}
    <text x="70" y="22" fontFamily="monospace" fontSize="7" fill="#C8A820" opacity="0.7">ESPERLY No.2</text>
  </svg>
);

/* Pen SVG */
const PenSVG = ({ size = 140, rotate = 20, style = {} }) => (
  <svg
    width={size} height={size * 0.14}
    viewBox="0 0 220 30"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
  >
    <rect x="30" y="5" width="150" height="20" rx="10" fill={RED}/>
    <rect x="30" y="5" width="150" height="20" rx="10" stroke={RED2} strokeWidth="1"/>
    {/* Highlight */}
    <rect x="35" y="7" width="140" height="5" rx="3" fill="rgba(255,255,255,0.15)"/>
    {/* Clip */}
    <rect x="155" y="3" width="5" height="22" rx="2" fill={CLIP} stroke={CLIP2} strokeWidth="0.5"/>
    <circle cx="157.5" cy="25" r="3" fill={CLIP}/>
    {/* Grip */}
    <rect x="45" y="5" width="30" height="20" rx="2" fill={RED2} opacity="0.5"/>
    {[0,3,6,9,12,15,18,21,24,27].map(x => (
      <line key={x} x1={47+x} y1="5" x2={47+x} y2="25" stroke={RED2} strokeWidth="0.5" opacity="0.5"/>
    ))}
    {/* Nib */}
    <polygon points="30,8 30,22 8,15" fill="#C0C0C0"/>
    <polygon points="15,11 15,19 8,15" fill="#888"/>
    <line x1="8" y1="15" x2="30" y2="10" stroke="#999" strokeWidth="0.5"/>
    <line x1="8" y1="15" x2="30" y2="20" stroke="#999" strokeWidth="0.5"/>
    {/* Cap end */}
    <rect x="178" y="5" width="22" height="20" rx="10" fill={RED2}/>
  </svg>
);

/* Washi tape strip */
const WashiTape = ({ width = 60, height = 18, color = TAPE, rotate = -2, style = {} }) => (
  <div style={{
    width, height,
    background: color,
    borderLeft: "1px solid rgba(180,170,140,0.3)",
    borderRight: "1px solid rgba(180,170,140,0.3)",
    transform: `rotate(${rotate}deg)`,
    position: "absolute",
    ...style,
  }}/>
);

/* Ruled paper lines overlay */
const RuledLines = ({ count = 20, topOffset = 60, gap = 26 }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} style={{
        position: "absolute",
        left: 0, right: 0,
        top: topOffset + i * gap,
        height: 1,
        background: RULED,
        opacity: 0.55,
      }}/>
    ))}
    {/* Red margin line - using theme color */}
    <div style={{
      position: "absolute",
      top: 0, bottom: 0,
      left: "clamp(40px,6vw,72px)",
      width: 1.5,
      background: RED,
      opacity: 0.25,
    }}/>
  </div>
);

/* Spiral binding holes */
const SpiralHoles = ({ count = 10 }) => (
  <div style={{
    position: "absolute",
    top: 0, left: -14, bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    pointerEvents: "none",
    zIndex: 3,
  }}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} style={{
        width: 22, height: 22,
        borderRadius: "50%",
        background: PAPER2,
        border: `2px solid ${PENCIL}`,
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.18)",
        flexShrink: 0,
      }}/>
    ))}
  </div>
);

/* Stamp / badge */
const Stamp = ({ text, color = RED, rotate = -8, style = {} }) => (
  <div style={{
    display: "inline-block",
    border: `2.5px solid ${color}`,
    borderRadius: 4,
    padding: "3px 10px",
    fontFamily: "monospace",
    fontSize: "clamp(9px,1vw,11px)",
    color,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 700,
    transform: `rotate(${rotate}deg)`,
    opacity: 0.75,
    ...style,
  }}>
    {text}
  </div>
);

/* Hand-drawn underline SVG */
const ScribbleUnderline = ({ color = RED, width = "100%", style = {} }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ width, height: 12, display: "block", ...style }}>
    <path
      d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
    />
  </svg>
);

/* Sticky note */
const StickyNote = ({ children, color = YELLOW, rotate = 2, style = {} }) => (
  <div style={{
    background: color,
    padding: "clamp(12px,2vw,18px) clamp(14px,2.5vw,22px)",
    borderRadius: "2px 2px 2px 2px",
    boxShadow: "2px 4px 12px rgba(0,0,0,0.14), inset 0 -1px 0 rgba(0,0,0,0.06)",
    transform: `rotate(${rotate}deg)`,
    position: "relative",
    ...style,
  }}>
    {/* Top fold shadow */}
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: 6,
      background: "rgba(0,0,0,0.06)",
      borderRadius: "2px 2px 0 0",
    }}/>
    {children}
  </div>
);

/* Highlighter mark */
const Highlight = ({ children, color = "#FFEB3B", style = {} }) => (
  <span style={{
    background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`,
    paddingBottom: 2,
    ...style,
  }}>
    {children}
  </span>
);

/* ─── ANIMATION HELPERS ──────────────────────────────────────── */
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

const SlideIn = ({ children, from = "left", delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >{children}</motion.div>
  );
};

/* ─── DATA ───────────────────────────────────────────────────── */
const pillars = [
  { id: "01", icon: "📹", label: "Live & Recorded", title: "Flexible Learning, Your Way",
    body: "Attend live sessions with real mentors or catch up with HD recordings — every lesson stays with you forever.",
    tag: "Hybrid Model", accent: RED, noteColor: "#FFFDE7" },
  { id: "02", icon: "🎯", label: "Mentor-Led", title: "1-on-1 Expert Guidance",
    body: "Industry veterans sit with you through every doubt, every deadline, every breakthrough.",
    tag: "Personalized", accent: BLUE, noteColor: "#E3F0FF" },
  { id: "03", icon: "🚀", label: "Real Projects", title: "Build. Ship. Get Hired.",
    body: "No fake assignments. Real-world projects you can put on your résumé from day one.",
    tag: "Portfolio-Ready", accent: GREEN, noteColor: "#E8F5E9" },
  { id: "04", icon: "🤝", label: "Community", title: "Learn With 10,000+ Peers",
    body: "A thriving community of learners, alumni, and mentors pushing each other further every single day.",
    tag: "Always On", accent: RED, noteColor: "#FFF3E0" },
];

const metrics = [
  { value: "98%", label: "Completion Rate", sub: "vs 12% industry avg", symbol: "★" },
  { value: "4.9★", label: "Mentor Rating", sub: "across 500+ mentors", symbol: "✓" },
  { value: "3×", label: "Faster Progress", sub: "than self-study", symbol: "↑" },
  { value: "₹18L", label: "Avg First Package", sub: "for placed students", symbol: "₹" },
];

const testimonials = [
  { name: "Priya Sharma", role: "SDE-2 at Flipkart", batch: "2023",
    quote: "Esperly didn't just teach me to code — it taught me how engineers think. My mentor spotted gaps I didn't even know I had.",
    avatar: "PS", accentColor: RED },
  { name: "Arjun Mehta", role: "Data Analyst at Swiggy", batch: "2024",
    quote: "The live sessions felt like college but better — no boring lectures, just real problems solved in real time together.",
    avatar: "AM", accentColor: BLUE },
  { name: "Sneha Nair", role: "Product @ Razorpay", batch: "2023",
    quote: "My mentor reviewed every project I shipped. That feedback loop alone was worth ten times what I paid.",
    avatar: "SN", accentColor: GREEN },
];

const tracks = [
  { name: "Full Stack Dev",     hours: "240h", icon: "⬡", color: RED,    note: "Most popular" },
  { name: "Data Science",       hours: "200h", icon: "⬢", color: BLUE,   note: "High demand" },
  { name: "UI/UX Design",       hours: "160h", icon: "⬣", color: GREEN,  note: "Creative track" },
  { name: "Product Management", hours: "180h", icon: "⬡", color: RED,    note: "Leadership" },
  { name: "AI & ML",            hours: "220h", icon: "⬢", color: "#6A0DAD", note: "Future-ready" },
  { name: "Cloud & DevOps",     hours: "190h", icon: "⬣", color: "#B05A1A", note: "Infrastructure" },
];

/* ─── COMPONENTS ─────────────────────────────────────────────── */

/* Pillar card — sticky note style */
const PillarCard = ({ p, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const rotates = [-2, 1.5, -1, 2.5];
  const rot = rotates[index % rotates.length];

  return (
    <motion.div
      ref={ref}
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
          ? "4px 8px 28px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.8) inset"
          : "3px 5px 16px rgba(0,0,0,0.13), 0 1px 0 rgba(255,255,255,0.7) inset",
        transition: "box-shadow 0.3s",
        overflow: "visible",
      }}
    >
      {/* Tape strip on top */}
      <WashiTape
        width={52} height={16} color={TAPE} rotate={index % 2 === 0 ? -3 : 3}
        style={{ top: -8, left: "50%", transform: `translateX(-50%) rotate(${index % 2 === 0 ? -3 : 3}deg)` }}
      />

      {/* Ruled lines */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 3 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", left: 0, right: 0,
            top: 44 + i * 22, height: 1,
            background: p.accent + "22",
          }}/>
        ))}
      </div>

      {/* Number stamp */}
      <div style={{
        position: "absolute", top: 10, right: 12,
        fontFamily: "monospace",
        fontSize: 11,
        color: p.accent,
        opacity: 0.45,
        letterSpacing: "0.1em",
      }}>
        #{p.id}
      </div>

      {/* Icon */}
      <div style={{ fontSize: "clamp(24px,3vw,32px)", marginBottom: 10, lineHeight: 1, position: "relative", zIndex: 1 }}>
        {p.icon}
      </div>

      {/* Title — handwritten-ish */}
      <h3 style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "clamp(15px,1.8vw,20px)",
        fontWeight: 700,
        color: INK,
        lineHeight: 1.25,
        marginBottom: 8,
        position: "relative", zIndex: 1,
      }}>
        {p.title}
      </h3>
      <ScribbleUnderline color={p.accent} width="80%" style={{ marginBottom: 10 }}/>

      {/* Body */}
      <p style={{
        fontFamily: "DM Serif Display, Georgia, serif",
        fontSize: "clamp(11px,1.2vw,13px)",
        color: FADED,
        lineHeight: 1.7,
        marginBottom: 14,
        position: "relative", zIndex: 1,
      }}>
        {p.body}
      </p>

      {/* Tag */}
      <Stamp text={p.tag} color={p.accent} rotate={-1} style={{ position: "relative", zIndex: 1 }}/>
    </motion.div>
  );
};

/* Metric card — index card style */
const MetricChip = ({ m, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const colors = [RED, BLUE, GREEN, RED];
  const c = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: PAPER,
        border: `1px solid ${RULED}`,
        borderRadius: 3,
        padding: "clamp(16px,2vw,22px) clamp(14px,1.8vw,18px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: "2px 3px 10px rgba(0,0,0,0.08)",
      }}
    >
      {/* Top colour bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: c,
      }}/>
      {/* Ruled lines */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: 28 + i * 18, height: 1,
          background: RULED, opacity: 0.6,
        }}/>
      ))}

      <div style={{
        fontFamily: "monospace",
        fontSize: 11,
        color: c,
        letterSpacing: "0.15em",
        position: "absolute",
        top: 8, right: 10,
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
        marginBottom: 4,
        marginTop: 8,
        position: "relative", zIndex: 1,
      }}>
        {m.value}
      </p>
      <p style={{
        fontFamily: "monospace",
        fontSize: "clamp(9px,1vw,11px)",
        color: INK2,
        letterSpacing: "0.08em",
        marginBottom: 2,
        textTransform: "uppercase",
        position: "relative", zIndex: 1,
      }}>
        {m.label}
      </p>
      <p style={{
        fontSize: "clamp(9px,1vw,10px)",
        color: FADED,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        position: "relative", zIndex: 1,
      }}>
        {m.sub}
      </p>
    </motion.div>
  );
};

/* Testimonial — pinned paper */
const TestimonialCard = ({ t }) => (
  <motion.div
    key={t.name}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.5 }}
    style={{
      background: PAPER,
      border: `1px solid ${RULED}`,
      borderRadius: 3,
      padding: "clamp(28px,3.5vw,44px) clamp(24px,3vw,40px)",
      position: "relative",
      overflow: "hidden",
      boxShadow: "3px 6px 20px rgba(0,0,0,0.1)",
    }}
  >
    <RuledLines count={14} topOffset={0} gap={28}/>

    {/* Pin at top */}
    <div style={{
      position: "absolute", top: -6, left: "50%",
      transform: "translateX(-50%)",
      zIndex: 4,
    }}>
      <div style={{
        width: 14, height: 14,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${t.accentColor}, ${t.accentColor}cc)`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.4)",
      }}/>
      <div style={{ width: 1.5, height: 12, background: PENCIL, margin: "0 auto" }}/>
    </div>

    {/* Paperclip decoration */}
    <div style={{ position: "absolute", top: 16, right: 20, opacity: 0.35 }}>
      <Paperclip size={22} color={CLIP} rotate={-15}/>
    </div>

    {/* Quote mark */}
    <div style={{
      fontFamily: "Georgia, serif",
      fontSize: "clamp(72px,10vw,120px)",
      color: t.accentColor,
      opacity: 0.1,
      lineHeight: 0.7,
      position: "absolute",
      top: 20, left: 20,
      pointerEvents: "none",
      zIndex: 0,
    }}>
      "
    </div>

    <p style={{
      fontFamily: "Fraunces, Georgia, serif",
      fontSize: "clamp(14px,1.7vw,20px)",
      color: INK,
      lineHeight: 1.75,
      marginBottom: 28,
      position: "relative",
      zIndex: 1,
      paddingTop: 18,
      fontStyle: "italic",
    }}>
      {t.quote}
    </p>

    <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: `linear-gradient(135deg, ${t.accentColor}33, ${t.accentColor}88)`,
        border: `2px solid ${t.accentColor}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "monospace", fontWeight: 700, color: t.accentColor, fontSize: 14,
        flexShrink: 0,
      }}>
        {t.avatar}
      </div>
      <div>
        <p style={{
          fontFamily: "Fraunces, Georgia, serif",
          color: INK, fontSize: "clamp(13px,1.5vw,17px)",
          fontWeight: 700, margin: 0,
        }}>
          {t.name}
        </p>
        <p style={{
          fontFamily: "monospace",
          color: FADED, fontSize: "clamp(9px,1vw,11px)",
          margin: "2px 0 0", letterSpacing: "0.08em",
        }}>
          {t.role} · Batch '{t.batch}
        </p>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <Stamp text="verified" color={t.accentColor} rotate={4} style={{ fontSize: 8 }}/>
      </div>
    </div>
  </motion.div>
);

/* Track row — file/tab style */
const TrackPill = ({ tr, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.52, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(10px,1.5vw,16px)",
        background: hovered ? PAPER : PAPER2,
        border: `1px solid ${RULED}`,
        borderLeft: `4px solid ${tr.color}`,
        borderRadius: "0 3px 3px 0",
        padding: "clamp(10px,1.4vw,16px) clamp(12px,1.6vw,20px)",
        cursor: "default",
        position: "relative",
        transition: "background 0.25s, box-shadow 0.25s",
        boxShadow: hovered ? `2px 4px 16px ${tr.color}22` : "1px 2px 6px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Ruled line */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: 1, background: RULED, opacity: 0.4,
      }}/>

      {/* Icon */}
      <span style={{ fontSize: "clamp(18px,2.2vw,24px)", color: tr.color, flexShrink: 0 }}>{tr.icon}</span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "Fraunces, Georgia, serif",
          color: INK,
          fontSize: "clamp(12px,1.4vw,16px)",
          fontWeight: 600,
          margin: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {tr.name}
        </p>
        <p style={{
          fontFamily: "monospace",
          fontSize: "clamp(9px,1vw,10px)",
          color: FADED,
          margin: "2px 0 0",
          fontStyle: "italic",
        }}>
          {tr.note}
        </p>
      </div>

      {/* Paperclip on first item */}
      {index === 0 && (
        <div style={{ position: "absolute", top: -4, right: 24, opacity: 0.4 }}>
          <Paperclip size={14} color={CLIP} rotate={12}/>
        </div>
      )}

      <div style={{
        fontFamily: "monospace",
        fontSize: "clamp(9px,1vw,11px)",
        color: tr.color,
        background: tr.color + "18",
        border: `1px solid ${tr.color}44`,
        borderRadius: 2,
        padding: "2px 8px",
        letterSpacing: "0.1em",
        flexShrink: 0,
        fontWeight: 700,
      }}>
        {tr.hours}
      </div>
    </motion.div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function EsperlyStationery() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  /* auto-rotate testimonials */
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ background: PAPER2, color: INK, fontFamily: "Georgia, serif", overflowX: "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${RED}88; border-radius: 4px; }

        /* Responsive grid helpers */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
        }
        @media (max-width: 1024px) {
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .pillars-grid { grid-template-columns: 1fr; }
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.8vw, 20px);
        }
        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .tracks-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 5vw, 64px);
          align-items: start;
        }
        @media (max-width: 768px) {
          .tracks-layout { grid-template-columns: 1fr; }
        }

        .hero-pencil { display: block; }
        @media (max-width: 600px) { .hero-pencil { display: none; } }

        .cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }
      `}</style>

      {/* ══════════════════════════════
          HERO — notebook cover
      ══════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "clamp(380px,55vw,640px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "clamp(48px,7vw,96px) clamp(20px,6vw,80px)",
        background: PAPER,
      }}>
        <RuledLines count={24} topOffset={0} gap={28}/>

        {/* Spiral binding left edge */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 28, background: PAPER3, borderRight: `1px solid ${RULED}`, zIndex: 2 }}>
          <SpiralHoles count={12}/>
        </div>

        {/* Decorative pencil + pen */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="hero-pencil" style={{ position: "absolute", right: "clamp(80px,10vw,160px)", top: "18%" }}>
            <PencilSVG size={180} rotate={-8}/>
          </div>
          <div className="hero-pencil" style={{ position: "absolute", right: "clamp(40px,6vw,80px)", top: "52%" }}>
            <PenSVG size={160} rotate={12}/>
          </div>
          {/* Paperclips scattered */}
          <div style={{ position: "absolute", right: "clamp(16px,4vw,60px)", top: "10%" }}>
            <Paperclip size={28} color={CLIP} rotate={20}/>
          </div>
          <div style={{ position: "absolute", right: "clamp(50px,8vw,120px)", bottom: "15%" }}>
            <Paperclip size={20} color={CLIP2} rotate={-10}/>
          </div>
          {/* Scribble doodle star */}
          <svg style={{ position: "absolute", right: "22%", top: "12%", opacity: 0.12 }} width="60" height="60" viewBox="0 0 60 60">
            <path d="M30 5 L33 22 L50 15 L38 27 L55 30 L38 33 L50 45 L33 38 L30 55 L27 38 L10 45 L22 33 L5 30 L22 27 L10 15 L27 22 Z" stroke={RED} strokeWidth="1.5" fill="none"/>
          </svg>
          {/* Wavy doodle line */}
          <svg style={{ position: "absolute", bottom: "8%", left: "10%", opacity: 0.1 }} width="300" height="30" viewBox="0 0 300 30">
            <path d="M0 15 C25 5, 50 25, 75 15 S125 5, 150 15 S200 25, 225 15 S275 5, 300 15" stroke={BLUE} strokeWidth="2" fill="none"/>
          </svg>
        </motion.div>

        {/* Content — offset for spiral */}
        <div style={{ position: "relative", zIndex: 3, maxWidth: 760, width: "100%", paddingLeft: "clamp(32px,4vw,48px)" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(14px,2vw,22px)" }}
          >
            <div style={{ width: 24, height: 2, background: RED }}/>
            <span style={{
              fontFamily: "monospace",
              fontSize: "clamp(9px,1.1vw,12px)",
              color: RED,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}>
              Esperly Platform
            </span>
            {/* Stamp */}
            <Stamp text="2024" color={BLUE} rotate={-6} style={{ marginLeft: 8 }}/>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(36px,7vw,82px)",
              fontWeight: 900,
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              marginBottom: "clamp(10px,1.5vw,16px)",
            }}>
              <span style={{ display: "block", color: INK }}>The Esperly</span>
              <span style={{ display: "block", color: RED, fontStyle: "italic", position: "relative" }}>
                Experience
                <ScribbleUnderline color={RED} width="100%" style={{ marginTop: 2 }}/>
              </span>
              <span style={{ display: "block", color: INK }}>in Tuitions</span>
            </h1>
          </motion.div>

          {/* Stats — index-card badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,1.2vw,12px)", marginTop: "clamp(16px,2.5vw,24px)" }}
          >
            {[
              { val: "10K+", lbl: "Students", color: RED },
              { val: "500+", lbl: "Mentors", color: BLUE },
              { val: "6 Tracks", lbl: "Available", color: GREEN },
            ].map((b, i) => (
              <div key={i} style={{
                background: PAPER2,
                border: `1px solid ${RULED}`,
                borderTop: `3px solid ${b.color}`,
                borderRadius: "0 0 3px 3px",
                padding: "clamp(6px,0.9vw,10px) clamp(12px,1.5vw,20px)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "1px 2px 6px rgba(0,0,0,0.08)",
              }}>
                <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(14px,1.6vw,18px)", fontWeight: 900, color: b.color }}>{b.val}</span>
                <span style={{ fontFamily: "monospace", fontSize: "clamp(8px,0.9vw,10px)", color: FADED, letterSpacing: "0.1em", textTransform: "uppercase" }}>{b.lbl}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Big faded number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          style={{
            position: "absolute",
            right: "clamp(10px,3vw,40px)",
            bottom: "-6%",
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(80px,14vw,200px)",
            fontWeight: 900,
            color: PENCIL,
            opacity: 0.06,
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          01
        </motion.div>
      </section>

      {/* ══════════════════════════════
          METRICS — index cards
      ══════════════════════════════ */}
      <div style={{
        background: PAPER3,
        borderTop: `2px solid ${RULED}`,
        borderBottom: `2px solid ${RULED}`,
        padding: "clamp(20px,3vw,36px) clamp(24px,5vw,64px)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", top: 8, right: 24, opacity: 0.25 }}>
          <Paperclip size={22} color={CLIP} rotate={-8}/>
        </div>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="metrics-grid">
            {metrics.map((m, i) => <MetricChip m={m} index={i} key={i}/>)}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          4 PILLARS — sticky notes
      ══════════════════════════════ */}
      <section style={{
        padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
        position: "relative",
        overflow: "hidden",
        background: PAPER,
      }}>
        <RuledLines count={30} topOffset={0} gap={26}/>

        {/* Pencil decoration */}
        <div style={{ position: "absolute", top: 24, right: 24, opacity: 0.18 }} aria-hidden>
          <PencilSVG size={160} rotate={5}/>
        </div>

        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeUp>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(8px,1.2vw,14px)", flexWrap: "wrap" }}>
              <div style={{ width: 20, height: 2.5, background: RED }}/>
              <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: RED, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                What We Offer
              </span>
              <Stamp text="Core" color={BLUE} rotate={3}/>
            </div>

            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(26px,4.2vw,52px)",
              fontWeight: 900,
              color: INK,
              lineHeight: 1.05,
              marginBottom: 6,
              letterSpacing: "-0.02em",
            }}>
              Four Pillars of the{" "}
              <Highlight color="#FFEB3B">
                <span style={{ color: RED, fontStyle: "italic" }}>Esperly Method</span>
              </Highlight>
            </h2>
            <ScribbleUnderline color={RED} width="clamp(160px,28vw,320px)" style={{ marginBottom: "clamp(28px,4vw,48px)" }}/>
          </FadeUp>

          <div className="pillars-grid" style={{ paddingTop: 8 }}>
            {pillars.map((p, i) => <PillarCard p={p} index={i} key={p.id}/>)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TRACKS — file folder style
      ══════════════════════════════ */}
      <section style={{
        background: PAPER2,
        borderTop: `1px solid ${RULED}`,
        borderBottom: `1px solid ${RULED}`,
        padding: "clamp(40px,6vw,80px) clamp(20px,5vw,60px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <RuledLines count={28} topOffset={0} gap={26}/>

        {/* Pen decoration */}
        <div style={{ position: "absolute", bottom: 20, right: 30, opacity: 0.15 }} aria-hidden>
          <PenSVG size={180} rotate={-8}/>
        </div>
        {/* Paperclip cluster */}
        <div style={{ position: "absolute", top: 20, right: 60, opacity: 0.3 }} aria-hidden>
          <Paperclip size={26} color={CLIP} rotate={25}/>
        </div>
        <div style={{ position: "absolute", top: 40, right: 80, opacity: 0.2 }} aria-hidden>
          <Paperclip size={20} color={CLIP2} rotate={-5}/>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="tracks-layout">

            {/* Left copy */}
            <SlideIn from="left">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                <div style={{ width: 20, height: 2.5, background: BLUE }}/>
                <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: BLUE, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                  Learning Tracks
                </span>
              </div>

              <h2 style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "clamp(24px,3.8vw,48px)",
                fontWeight: 900,
                color: INK,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}>
                Choose Your<br/>
                <span style={{ color: BLUE, fontStyle: "italic" }}>Expert Track</span>
              </h2>
              <ScribbleUnderline color={BLUE} width="clamp(120px,18vw,220px)" style={{ marginBottom: "clamp(14px,2vw,22px)" }}/>

              <p style={{
                fontFamily: "DM Serif Display, Georgia, serif",
                fontSize: "clamp(12px,1.3vw,15px)",
                color: FADED,
                lineHeight: 1.75,
                maxWidth: 340,
                marginBottom: "clamp(20px,3vw,32px)",
              }}>
                Every track is designed with industry experts, built around outcomes, not just content.{" "}
                <Highlight color="#B3E5FC">Structured. Mentored. Real.</Highlight>
              </p>

              {/* Sticky note CTA */}
              <div style={{ display: "inline-block", position: "relative" }}>
                <WashiTape width={44} height={14} rotate={-2}
                  style={{ top: -7, left: "50%", transform: "translateX(-50%) rotate(-2deg)" }}/>
                <motion.button
                  whileHover={{ scale: 1.04, rotate: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: RED,
                    color: "#fff",
                    border: "none",
                    borderRadius: 3,
                    padding: "clamp(11px,1.4vw,15px) clamp(22px,2.8vw,34px)",
                    fontFamily: "Fraunces, Georgia, serif",
                    fontSize: "clamp(12px,1.4vw,15px)",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    boxShadow: `2px 4px 12px ${RED}80`,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Explore All Tracks →
                </motion.button>
              </div>
            </SlideIn>

            {/* Right — track list */}
            <SlideIn from="right" delay={0.12}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,1vw,10px)" }}>
                {/* File folder tab header */}
                <div style={{
                  display: "flex",
                  gap: 2,
                  marginBottom: 2,
                }}>
                  {["All", "Dev", "Design", "Data"].map((tab, i) => (
                    <div key={tab} style={{
                      padding: "4px 12px",
                      background: i === 0 ? PAPER : PAPER3,
                      border: `1px solid ${RULED}`,
                      borderBottom: i === 0 ? `1px solid ${PAPER}` : `1px solid ${RULED}`,
                      borderRadius: "3px 3px 0 0",
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: i === 0 ? RED : FADED,
                      letterSpacing: "0.08em",
                      cursor: "default",
                    }}>
                      {tab}
                    </div>
                  ))}
                </div>
                <div style={{
                  border: `1px solid ${RULED}`,
                  borderRadius: "0 3px 3px 3px",
                  overflow: "hidden",
                  background: PAPER,
                  padding: "clamp(8px,1.2vw,14px)",
                  display: "flex", flexDirection: "column",
                  gap: "clamp(6px,0.9vw,10px)",
                }}>
                  {tracks.map((tr, i) => <TrackPill tr={tr} index={i} key={tr.name}/>)}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TESTIMONIALS — pinned papers
      ══════════════════════════════ */}
      <section style={{
        padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
        position: "relative",
        overflow: "hidden",
        background: PAPER,
      }}>
        <RuledLines count={32} topOffset={0} gap={26}/>

        {/* Pen deco */}
        <div style={{ position: "absolute", top: 24, left: 32, opacity: 0.12 }} aria-hidden>
          <PenSVG size={200} rotate={-5}/>
        </div>

        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeUp style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,48px)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 20, height: 2, background: RED }}/>
              <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: RED, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                Student Voices
              </span>
              <div style={{ width: 20, height: 2, background: RED }}/>
            </div>
            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(24px,3.8vw,50px)",
              fontWeight: 900,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}>
              Real Students,{" "}
              <span style={{ color: RED, fontStyle: "italic" }}>Real Results</span>
            </h2>
            <ScribbleUnderline color={RED} width="clamp(140px,20vw,240px)" style={{ margin: "8px auto 0" }}/>
          </FadeUp>

          <AnimatePresence mode="wait">
            <TestimonialCard key={activeTestimonial} t={testimonials[activeTestimonial]}/>
          </AnimatePresence>

          {/* Controls */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginTop: 24,
          }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
              style={{
                width: 38, height: 38, borderRadius: "50%",
                border: `1.5px solid ${RULED}`,
                background: PAPER2, color: INK,
                fontSize: 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "1px 2px 6px rgba(0,0,0,0.08)",
                fontFamily: "Georgia, serif",
              }}
            >←</motion.button>

            <div style={{ display: "flex", gap: 8 }}>
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  animate={{
                    width: i === activeTestimonial ? 24 : 8,
                    background: i === activeTestimonial ? t.accentColor : RULED,
                  }}
                  style={{ height: 8, borderRadius: 999, cursor: "pointer" }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
              style={{
                width: 38, height: 38, borderRadius: "50%",
                border: `1.5px solid ${RULED}`,
                background: PAPER2, color: INK,
                fontSize: 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "1px 2px 6px rgba(0,0,0,0.08)",
                fontFamily: "Georgia, serif",
              }}
            >→</motion.button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA — letter/envelope style
      ══════════════════════════════ */}
      {/* <section style={{
        background: RED,
        padding: "clamp(40px,6vw,80px) clamp(20px,5vw,60px)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <line key={i}
              x1={-100 + i * 80} y1="0"
              x2={-100 + i * 80 + 200} y2="200%"
              stroke="white" strokeWidth="1"
            />
          ))}
        </svg>

      
        <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, borderBottom: "60px solid transparent", borderLeft: `60px solid rgba(255,255,255,0.1)`, pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, borderTop: "60px solid transparent", borderRight: `60px solid rgba(255,255,255,0.1)`, pointerEvents: "none" }}/>

       
        <div style={{ position: "absolute", right: "3%", top: "20%", opacity: 0.15 }} aria-hidden>
          <PenSVG size={160} rotate={15}/>
        </div>

      
        <svg style={{ position: "absolute", left: "4%", bottom: "10%", opacity: 0.12 }} width="140" height="140">
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 6 }, (_, c) => (
              <circle key={`${r}-${c}`} cx={c * 22 + 11} cy={r * 22 + 11} r="1.8" fill="white"/>
            ))
          )}
        </svg>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto" }}>
          <FadeUp>
          
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <WashiTape width={56} height={18} color="rgba(255,255,255,0.3)" rotate={-1} style={{ position: "relative", top: "auto", left: "auto" }}/>
            </div>

            <p style={{
              fontFamily: "monospace",
              fontSize: "clamp(9px,1.1vw,12px)",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "clamp(10px,1.5vw,16px)",
            }}>
              Your turn
            </p>

            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(26px,4.8vw,60px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: 10,
            }}>
              Start Your<br/>
              <span style={{ fontStyle: "italic", color: YELLOW }}>Esperly Journey</span>
            </h2>
            <ScribbleUnderline color={YELLOW} width="clamp(140px,22vw,260px)" style={{ margin: "0 auto 20px" }}/>

            <p style={{
              fontFamily: "DM Serif Display, Georgia, serif",
              fontSize: "clamp(12px,1.4vw,16px)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.65,
              marginBottom: "clamp(24px,3.5vw,40px)",
              maxWidth: 420,
              margin: "0 auto clamp(24px,3.5vw,40px)",
            }}>
              Book a free counselling call. No pressure, no pitch — just clarity on your next step.
            </p>

            <div className="cta-btns">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, rotate: -0.5 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: PAPER,
                  color: RED,
                  border: "none",
                  borderRadius: 3,
                  padding: "clamp(12px,1.5vw,16px) clamp(26px,3.2vw,42px)",
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: "clamp(12px,1.4vw,16px)",
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "2px 4px 16px rgba(0,0,0,0.2)",
                  letterSpacing: "0.01em",
                }}
              >
                Book Free Call →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2, rotate: 0.5 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.5)",
                  borderRadius: 3,
                  padding: "clamp(12px,1.5vw,16px) clamp(26px,3.2vw,42px)",
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: "clamp(12px,1.4vw,16px)",
                  fontWeight: 700,
                  cursor: "pointer",
                  backdropFilter: "blur(4px)",
                  letterSpacing: "0.01em",
                }}
              >
                View Tracks
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section> */}
    </div>
  );
}