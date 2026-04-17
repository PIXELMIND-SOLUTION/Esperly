import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS (kept only for SVG/gradient values Tailwind can't handle) ─── */
const RED = "#EB6664";
const BLUE = "#3B6FA0";
const PENCIL = "#8C7B6B";
const INK = "#1C1209";
const FADED = "#111111";
const RULED = "#D6CEBA";
const TAPE = "rgba(200,195,170,0.55)";

/* ─── SUB COMPONENTS ────────────────────────────────────────── */

const WashiTape = ({ rotate = -2 }) => (
  <div
    className="absolute top-[-8px] left-1/2 h-4 w-[52px] border-l border-r"
    style={{
      background: TAPE,
      borderColor: "rgba(180,170,140,0.3)",
      transform: `translateX(-50%) rotate(${rotate}deg)`,
    }}
  />
);

const ScribbleUnderline = ({ color = RED, className = "", style = {} }) => (
  <svg
    viewBox="0 0 200 12"
    preserveAspectRatio="none"
    className={className}
    style={{ height: 12, display: "block", ...style }}
  >
    <path
      d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const Highlight = ({ children, color = "#FFEB3B" }) => (
  <span
    style={{
      background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`,
      paddingBottom: 2,
    }}
  >
    {children}
  </span>
);

const Bubble = ({ style: s }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: s.size,
      height: s.size,
      background: s.fill,
      left: s.left,
      top: s.top,
      filter: "blur(1px)",
      zIndex: 0,
    }}
    animate={{
      y: ["0px", s.floatY || "-30px", "0px"],
      x: [0, s.floatX || 10, 0],
      opacity: [s.opacity || 0.4, (s.opacity || 0.4) + 0.12, s.opacity || 0.4],
      scale: [1, 1.07, 1],
    }}
    transition={{
      duration: s.dur || 6,
      repeat: Infinity,
      delay: s.delay || 0,
      ease: "easeInOut",
    }}
  />
);

const heroBubbles = [
  { size: "180px", fill: "rgba(166,25,46,0.09)", left: "3%", top: "8%", floatY: "-22px", floatX: 12, dur: 7, delay: 0, opacity: 0.4 },
  { size: "120px", fill: "rgba(166,25,46,0.06)", left: "78%", top: "4%", floatY: "-28px", floatX: -10, dur: 8.5, delay: 1, opacity: 0.35 },
  { size: "85px", fill: "rgba(166,25,46,0.11)", left: "58%", top: "65%", floatY: "-16px", floatX: 8, dur: 6, delay: 2, opacity: 0.45 },
  { size: "60px", fill: "rgba(166,25,46,0.08)", left: "18%", top: "70%", floatY: "-12px", floatX: -6, dur: 5, delay: 0.5, opacity: 0.4 },
];

const PencilSVG = ({ size = 160, rotate = 5 }) => (
  <svg
    width={size}
    height={size * 0.18}
    viewBox="0 0 200 36"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
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

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─── PILLAR DATA ────────────────────────────────────────────── */
const pillars = [
  {
    id: "01",
    icon: "🧑‍🏫",
    title: "Dedicated Mentorship",
    body: "At Esperly, every student is paired with a mentor who truly understands their learning journey. Beyond teaching, our mentors guide, motivate, and build confidence — ensuring students feel supported at every step.",
    accent: RED,
    noteColor: "#F5B3B2",
    noteBg: "#FFFDE7",
  },
  {
    id: "02",
    icon: "🎯",
    title: "Personalized Learning",
    body: "We believe learning should adapt to the student, not the other way around. Our sessions are thoughtfully tailored to individual learning styles, pace, and goals — creating a more engaging and effective experience.",
    accent: RED,
    noteColor: "#E3F0FF",
    noteBg: "#E3F0FF",
  },
  {
    id: "03",
    icon: "💡",
    title: "Concept Mastery",
    body: "Strong foundations lead to lasting success. We go beyond memorization, helping students deeply understand concepts, apply them with clarity, and develop the confidence to tackle any challenge.",
    accent: RED,
    noteColor: "#E8F5E9",
    noteBg: "#E8F5E9",
  },
  {
    id: "04",
    icon: "📈",
    title: "Structured Progress Tracking",
    body: "Growth is best achieved with the right direction. Through regular assessments and detailed feedback, we track progress closely — keeping students and parents informed, involved, and confident in the journey.",
    accent: RED,
    noteColor: "#FFFDE7",
    noteBg: "#FFF3E0",
  },
];

/* ─── PILLAR CARD ────────────────────────────────────────────── */
const PillarCard = ({ p, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const rotates = [-2, 1.5, -1, 2.5];
  const rot = rotates[index % rotates.length];

  return (
    <motion.div
      ref={ref}
      className="relative rounded-[3px] cursor-default overflow-visible transition-shadow duration-300"
      style={{
        background: p.noteColor,
        boxShadow: hovered
          ? `4px 8px 32px ${p.accent}30, 0 1px 0 rgba(255,255,255,0.8) inset`
          : "3px 5px 16px rgba(0,0,0,0.13), 0 1px 0 rgba(255,255,255,0.7) inset",
      }}
      initial={{ opacity: 0, y: 48, rotate: rot - 4 }}
      animate={inView ? { opacity: 1, y: 0, rotate: hovered ? 0 : rot } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Washi tape */}
      <WashiTape rotate={index % 2 === 0 ? -3 : 3} />

      {/* Card number */}
      <div
        className="absolute top-[10px] right-3 font-mono text-[11px] tracking-[0.1em] opacity-45"
        style={{ color: p.accent }}
      >
        #{p.id}
      </div>

      {/* Content */}
      <div className="p-[clamp(18px,3vw,28px)] relative z-10">
        <div className="flex items-start gap-2 mb-2">
          <div className="text-[clamp(24px,4vw,32px)] leading-none shrink-0">
            {p.icon}
          </div>
          <h3
            className="font-bold leading-[1.25]"
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(15px, 2vw, 20px)",
              color: INK,
            }}
          >
            {p.title}
          </h3>
        </div>
        <ScribbleUnderline color={p.accent} style={{ width: "80%", marginBottom: 10 }} />
        <p
          className="leading-[1.75] mb-[14px]"
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: "clamp(8px, 1.4vw, 13px)",
            color: FADED,
          }}
        >
          {p.body}
        </p>
      </div>
    </motion.div>
  );
};

/* ─── MAIN EXPORT ────────────────────────────────────────────── */
export default function PillarsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(40px, 7vw, 50px) clamp(16px, 5vw, 50px)",
        background: "#FBF7F2",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: "clamp(150px, 25vw, 300px)",
            height: "clamp(150px, 25vw, 300px)",
            filter: "blur(80px)",
            background: `radial-gradient(circle, ${RED}12, transparent)`,
            top: "10%",
            right: "5%",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "clamp(100px, 18vw, 200px)",
            height: "clamp(100px, 18vw, 200px)",
            filter: "blur(60px)",
            background: `radial-gradient(circle, ${BLUE}10, transparent)`,
            bottom: "15%",
            left: "8%",
          }}
        />
        {heroBubbles.map((b, i) => (
          <Bubble
            key={i}
            style={{
              ...b,
              opacity: (b.opacity || 0.4) * 0.5,
              top: `${20 + i * 18}%`,
              left: `${10 + i * 22}%`,
            }}
          />
        ))}
      </div>

      {/* Decorative wave */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-15">
        <svg
          style={{ width: "clamp(120px,22vw,300px)", height: "clamp(80px,15vw,200px)" }}
          viewBox="0 0 300 200"
        >
          <path
            d="M300 0 C220 40, 140 30, 80 90 C40 130, 15 165, 0 200"
            stroke={RED}
            strokeWidth="2"
            fill="none"
          />
          <circle cx="160" cy="70" r="5" fill={RED} opacity="0.5" />
          <circle cx="100" cy="115" r="3" fill={RED} opacity="0.4" />
        </svg>
      </div>

      {/* Pencil decoration — hidden on small screens */}
      <div className="absolute top-6 right-6 opacity-15 hidden sm:block" aria-hidden>
        <PencilSVG size={160} rotate={5} />
      </div>

      {/* ── SECTION CONTENT ── */}
      <div className="max-w-7xl mx-auto relative z-[2]">
        <FadeUp>
          {/* Heading */}
          <h2
            className="font-black leading-[1.05] mb-1 tracking-[-0.02em]"
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(24px, 5vw, 52px)",
              color: INK,
            }}
          >
            The Four Pillars of{" "}
            <Highlight color="#FFEB3B">
              <span style={{ color: RED, fontStyle: "italic" }}>Esperly</span>
            </Highlight>
          </h2>

          {/* Sub-heading */}
          <p
            className="leading-[1.6] italic mb-[clamp(6px,1vw,10px)]"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(13px, 1.8vw, 17px)",
              color: FADED,
            }}
          >
            Designed to support every student's unique learning journey
          </p>

          {/* Scribble underline */}
          <ScribbleUnderline
            color={RED}
            style={{ width: "clamp(140px, 30vw, 320px)", marginBottom: "clamp(24px, 4vw, 48px)" }}
          />
        </FadeUp>

        {/* ── CARDS GRID ── */}
        <div
          className="grid gap-[clamp(20px,3vw,28px)] pt-2"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          }}
        >
          {pillars.map((p, i) => (
            <PillarCard p={p} index={i} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}