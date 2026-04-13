import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS (shared with Pillars theme) ─────────────── */
const PAPER  = "#F9F5ED";
const RULED  = "#D6CEBA";
const INK    = "#1C1209";
const FADED  = "#7A6E5A";
const RED    = "#A6192E";
const BLUE   = "#3B6FA0";
const TAPE   = "rgba(200,195,170,0.55)";
const PENCIL = "#8C7B6B";

const FLIP_MS      = 700;
const AUTO_INTERVAL = 4200;

/* ─── CURRICULUM DATA ────────────────────────────────────────── */
const chapters = [
  {
    number: "01", subject: "Full Stack Development", icon: "⬡",
    tagline: "From zero to production",
    topics: ["HTML & CSS Mastery","JavaScript ES6+","React & Next.js","Node.js & Express","MongoDB & PostgreSQL","REST & GraphQL APIs","Docker & Deployment"],
    description: "Build complete web applications from the ground up. Learn how the frontend talks to the backend, how data flows, and how to ship products that scale.",
    duration: "240 hours", projects: "12 real projects",
    pageColor: "#FFF8F5", accent: RED,
  },
  {
    number: "02", subject: "Data Science", icon: "⬢",
    tagline: "Turn raw data into decisions",
    topics: ["Python & NumPy","Pandas & EDA","Data Visualisation","Statistics & Probability","Scikit-learn","Feature Engineering","Model Deployment"],
    description: "Master the full data pipeline — from messy CSVs to insight dashboards. Learn to ask the right questions and build models that actually get used.",
    duration: "200 hours", projects: "10 real projects",
    pageColor: "#FFFBF0", accent: "#C8940A",
  },
  {
    number: "03", subject: "UI / UX Design", icon: "⬣",
    tagline: "Design that thinks and feels",
    topics: ["Design Principles","User Research","Wireframing","Figma Mastery","Prototyping","Usability Testing","Design Systems"],
    description: "Go beyond aesthetics. Understand how people think, how interfaces should behave, and how to design with empathy that converts users into fans.",
    duration: "160 hours", projects: "8 real projects",
    pageColor: "#F5FAFF", accent: BLUE,
  },
  {
    number: "04", subject: "Product Management", icon: "⬡",
    tagline: "Strategy meets execution",
    topics: ["Product Thinking","Market Research","PRDs & Roadmaps","Agile & Scrum","Metrics & OKRs","Stakeholder Mgmt","Go-to-Market"],
    description: "Learn to be the CEO of your product. Understand users, align teams, prioritise ruthlessly, and ship features that move the needle.",
    duration: "180 hours", projects: "9 real projects",
    pageColor: "#F5FFF5", accent: "#2E7D52",
  },
  {
    number: "05", subject: "AI & Machine Learning", icon: "⬢",
    tagline: "Build intelligent systems",
    topics: ["Linear & Logistic Reg.","Neural Networks","CNNs & RNNs","NLP & Transformers","Prompt Engineering","LLM Fine-tuning","MLOps"],
    description: "From perceptrons to large language models. Learn the mathematics, the intuition, and the engineering to build AI systems that work in the real world.",
    duration: "220 hours", projects: "11 real projects",
    pageColor: "#FDF5FF", accent: "#7B3FA0",
  },
  {
    number: "06", subject: "Cloud & DevOps", icon: "⬣",
    tagline: "Ship fast. Stay reliable.",
    topics: ["Linux & Bash","AWS / GCP / Azure","CI / CD Pipelines","Docker & Kubernetes","Infrastructure as Code","Monitoring & Logging","Security Best Practices"],
    description: "Master the infrastructure that keeps apps alive. Learn to automate deployments, scale systems, and build pipelines that ship code safely every day.",
    duration: "190 hours", projects: "9 real projects",
    pageColor: "#FFF8F0", accent: "#C05A1A",
  },
];

/* ─── SHARED DECORATIVE COMPONENTS (Pillars theme) ──────────── */

const WashiTape = ({ rotate = -2, color = TAPE, width = 52 }) => (
  <div
    className="absolute top-[-8px] left-1/2 h-4 pointer-events-none z-20"
    style={{
      width,
      background: color,
      borderLeft: "1px solid rgba(180,170,140,0.3)",
      borderRight: "1px solid rgba(180,170,140,0.3)",
      transform: `translateX(-50%) rotate(${rotate}deg)`,
    }}
  />
);

const ScribbleUnderline = ({ color = RED, style = {} }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ height: 12, display: "block", ...style }}>
    <path d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Stamp = ({ text, color = RED, rotate = -8 }) => (
  <div
    className="inline-block rounded font-mono font-bold uppercase tracking-[0.18em] opacity-75 shrink-0"
    style={{
      border: `2.5px solid ${color}`,
      padding: "3px 10px",
      fontSize: "clamp(9px,1vw,11px)",
      color,
      transform: `rotate(${rotate}deg)`,
    }}
  >
    {text}
  </div>
);

const RuledLines = ({ count = 22, gap = 26, accent = RED }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="absolute left-0 right-0 h-px" style={{ top: 52 + i * gap, background: RULED, opacity: 0.45 }} />
    ))}
    <div className="absolute top-0 bottom-0 w-[1.5px]" style={{ left: "clamp(20px,5vw,72px)", background: RED, opacity: 0.18 }} />
  </div>
);

const Highlight = ({ children, color = "#FFEB3B" }) => (
  <span style={{ background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`, paddingBottom: 2 }}>
    {children}
  </span>
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

const PencilSVG = ({ size = 160, rotate = 5 }) => (
  <svg width={size} height={size * 0.18} viewBox="0 0 200 36" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
    <rect x="20" y="8" width="148" height="20" rx="2" fill="#F5D87A" />
    <rect x="20" y="8" width="148" height="20" rx="2" stroke="#C8A820" strokeWidth="1" />
    <line x1="20" y1="14" x2="168" y2="14" stroke="#C8A820" strokeWidth="0.5" opacity="0.4" />
    <line x1="20" y1="22" x2="168" y2="22" stroke="#C8A820" strokeWidth="0.5" opacity="0.4" />
    <rect x="158" y="9" width="24" height="18" rx="2" fill="#F4A7A7" />
    <rect x="158" y="9" width="24" height="18" rx="2" stroke="#D46060" strokeWidth="0.8" />
    <rect x="153" y="8" width="8" height="20" fill={PENCIL} stroke="#BDBDBD" strokeWidth="0.5" />
    <polygon points="20,8 20,28 2,18" fill="#E8C06A" />
    <polygon points="6,12 6,24 2,18" fill="#2A1F0E" />
    <line x1="20" y1="8" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8" />
    <line x1="20" y1="28" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8" />
    <text x="70" y="22" fontFamily="monospace" fontSize="7" fill="#C8A820" opacity="0.7">ESPERLY No.2</text>
  </svg>
);

/* ─── LEFT PAGE ──────────────────────────────────────────────── */
const LeftPageContent = ({ ch }) => (
  <div className="w-full h-full flex flex-col justify-center items-center text-center px-6 py-8 relative overflow-hidden" style={{ background: ch.pageColor }}>
    <RuledLines count={22} gap={26} accent={ch.accent} />

    {/* Ghost chapter number */}
    <div
      className="absolute bottom-2 right-3 select-none pointer-events-none"
      style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(60px,8vw,100px)", fontWeight: 900, color: ch.accent, opacity: 0.06, lineHeight: 1 }}
    >
      {ch.number}
    </div>

    {/* Washi tape */}
    <WashiTape rotate={-1} color="rgba(255,200,80,0.65)" width={64} />

    {/* Icon */}
    <div className="relative z-10 text-4xl mb-3" style={{ color: ch.accent }}>{ch.icon}</div>

    {/* Subject */}
    <h3
      className="relative z-10 font-black leading-tight mb-2"
      style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(14px,1.8vw,22px)", color: INK }}
    >
      {ch.subject}
    </h3>

    {/* Tagline */}
    <p className="relative z-10 italic mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif", fontSize: "clamp(10px,1vw,13px)", color: ch.accent, letterSpacing: "0.04em" }}>
      {ch.tagline}
    </p>

    {/* Scribble underline */}
    <ScribbleUnderline color={ch.accent} style={{ width: "70%", marginBottom: 12 }} />

    {/* Description */}
    <p
      className="relative z-10 leading-relaxed mb-5"
      style={{ fontFamily: "Georgia, serif", fontSize: "clamp(9px,0.95vw,12px)", color: FADED, maxWidth: 260 }}
    >
      {ch.description}
    </p>

    {/* Stats */}
    <div className="relative z-10 flex gap-2 flex-wrap justify-center">
      {[ch.duration, ch.projects].map((s, i) => (
        <div
          key={i}
          className="rounded px-3 py-1.5 font-mono font-bold"
          style={{
            fontSize: "clamp(8px,0.8vw,11px)",
            color: ch.accent,
            background: `${ch.accent}10`,
            border: `1.5px solid ${ch.accent}30`,
            letterSpacing: "0.06em",
          }}
        >
          {s}
        </div>
      ))}
    </div>
  </div>
);

/* ─── RIGHT PAGE ─────────────────────────────────────────────── */
const RightPageContent = ({ ch }) => (
  <div className="w-full h-full flex flex-col px-6 py-6 relative overflow-hidden" style={{ background: PAPER }}>
    <RuledLines count={22} gap={26} accent={ch.accent} />

    {/* Top washi */}
    <div className="absolute top-[-8px] right-10">
      <WashiTape rotate={2} color="rgba(160,200,255,0.5)" width={52} />
    </div>

    {/* Chapter label */}
    <div
      className="relative z-10 mb-3 font-mono uppercase tracking-[0.2em]"
      style={{ fontSize: "clamp(8px,0.8vw,10px)", color: FADED }}
    >
      Chapter {ch.number} · Curriculum
    </div>

    {/* Section heading */}
    <h4
      className="relative z-10 mb-4 pb-3 border-b font-bold"
      style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(11px,1.2vw,14px)", color: INK, borderColor: RULED }}
    >
      What you'll learn
    </h4>

    {/* Topics list */}
    <div className="relative z-10 flex flex-col gap-2 flex-1">
      {ch.topics.map((topic, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ch.accent, opacity: 0.85 }} />
          <span className="flex-1" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(9px,0.95vw,12px)", color: INK, lineHeight: 1.4 }}>
            {topic}
          </span>
          <div className="flex-1 border-b border-dotted" style={{ borderColor: RULED, marginBottom: 2 }} />
          <span className="flex-shrink-0 font-mono" style={{ fontSize: 9, color: RULED }}>
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className="relative z-10 flex justify-between items-center pt-3 mt-3 border-t" style={{ borderColor: RULED }}>
      <span className="font-mono tracking-[0.1em]" style={{ fontSize: 9, color: FADED }}>ESPERLY</span>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 10, color: FADED, fontStyle: "italic" }}>
        pg. {ch.number}
      </span>
    </div>
  </div>
);

/* ─── BOOK SPINE ─────────────────────────────────────────────── */
const Spine = ({ ch }) => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden"
    style={{ background: `linear-gradient(180deg, ${ch.accent}ee 0%, ${ch.accent}aa 100%)` }}>
    <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.12) 100%)" }} />
    {[...Array(7)].map((_, i) => (
      <div key={i} className="relative z-10 rounded-full my-0.5"
        style={{ width: 7, height: 7, background: "rgba(0,0,0,0.35)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.2)" }} />
    ))}
    <span className="relative z-10" style={{
      fontFamily: "Fraunces, Georgia, serif", fontSize: 9, fontWeight: 900,
      color: "rgba(255,255,255,0.85)", letterSpacing: "0.18em",
      writingMode: "vertical-rl", textOrientation: "mixed",
      transform: "rotate(180deg)", textTransform: "uppercase",
      maxHeight: 140, overflow: "hidden", whiteSpace: "nowrap",
    }}>
      {ch.subject}
    </span>
    <span className="relative z-10 font-mono" style={{
      fontSize: 8, color: "rgba(255,255,255,0.5)",
      writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.12em",
    }}>
      {ch.number}
    </span>
  </div>
);

/* ─── DESKTOP BOOK ───────────────────────────────────────────── */
const DesktopBook = ({ cur, nxt, isFlipping, flipDir, flipAngle, onPrev, onNext }) => {
  const ch = chapters[cur];
  const chNext = chapters[nxt];

  return (
    <div className="flex items-center justify-center gap-4 lg:gap-8">
      {/* Prev button */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={onPrev} disabled={isFlipping}
        className="flex-shrink-0 flex items-center justify-center rounded-full text-lg disabled:opacity-40 transition-shadow"
        style={{
          width: "clamp(38px,4vw,52px)", height: "clamp(38px,4vw,52px)",
          background: PAPER,
          border: `1.5px solid ${RULED}`,
          color: INK,
          boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
          fontFamily: "Georgia, serif",
        }}
      >
        ←
      </motion.button>

      {/* Book container */}
      <div className="relative" style={{ width: "clamp(360px,80vw,980px)", height: "clamp(320px,44vw,560px)" }}>

        {/* Drop shadow */}
        <div className="absolute rounded-full pointer-events-none" style={{
          bottom: -20, left: "6%", right: "6%", height: 28,
          background: "rgba(0,0,0,0.14)", filter: "blur(16px)", zIndex: 0,
        }} />

        {/* Stacked pages illusion */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute rounded-md" style={{
            bottom: -(i + 1) * 2,
            left: `calc(clamp(20px,2.5vw,32px) + ${i * 0.6}px)`,
            right: -(i * 0.6),
            height: "100%",
            background: i % 2 === 0 ? "#EDE8DE" : "#E3DDD2",
            zIndex: -i - 1,
          }} />
        ))}

        {/* Book body */}
        <div className="relative w-full h-full flex rounded-md overflow-visible z-10"
          style={{ boxShadow: "0 16px 56px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)" }}>

          {/* Spine */}
          <div className="flex-shrink-0 rounded-l-md overflow-hidden relative z-10"
            style={{ width: "clamp(22px,2.8vw,36px)", boxShadow: "inset -4px 0 12px rgba(0,0,0,0.22)" }}>
            <Spine ch={ch} />
          </div>

          {/* Left page — static with cross-fade */}
          <div className="flex-1 relative overflow-hidden border-r z-10" style={{ borderColor: RULED }}>
            <div className="absolute inset-0" style={{
              opacity: isFlipping
                ? (flipDir === "forward" ? Math.min(Math.abs(flipAngle) / 90, 1) : Math.min(flipAngle / 90, 1))
                : 0,
            }}>
              <LeftPageContent ch={isFlipping ? chNext : ch} />
            </div>
            <div className="absolute inset-0" style={{
              opacity: isFlipping
                ? (flipDir === "forward" ? Math.max(1 - Math.abs(flipAngle) / 90, 0) : Math.max(1 - flipAngle / 90, 0))
                : 1,
            }}>
              <LeftPageContent ch={ch} />
            </div>
            {/* Gutter shadow */}
            <div className="absolute top-0 bottom-0 right-0 w-5 pointer-events-none z-10"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.04))" }} />
          </div>

          {/* Right page + flip */}
          <div className="flex-1 relative overflow-visible z-20" style={{ perspective: 1800 }}>
            {/* Static underlayer */}
            <div className="absolute inset-0 z-0 rounded-r-md overflow-hidden">
              {isFlipping && flipDir === "forward" && <RightPageContent ch={chNext} />}
              {isFlipping && flipDir === "backward" && <RightPageContent ch={ch} />}
              {!isFlipping && <RightPageContent ch={ch} />}
            </div>

            {/* Flipping page */}
            {isFlipping && (
              <div
                className="absolute inset-0 z-20"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "0% 50%",
                  transform: `rotateY(${flipAngle}deg)`,
                  filter: `drop-shadow(${
                    Math.abs(flipAngle) > 10 && Math.abs(flipAngle) < 170
                      ? `${flipDir === "forward" ? "-6px" : "6px"} 0 18px rgba(0,0,0,${0.08 + 0.2 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)})`
                      : "none"
                  })`,
                }}
              >
                {/* Front face */}
                <div className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                  <div className="absolute top-0 bottom-0 right-0 pointer-events-none z-10"
                    style={{ width: "18%", background: `linear-gradient(90deg, transparent, rgba(0,0,0,${0.03 + 0.14 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)}))` }} />
                  <div className="absolute top-0 bottom-0 left-0 pointer-events-none z-10"
                    style={{ width: "14%", background: `linear-gradient(270deg, transparent, rgba(255,255,255,${0.06 + 0.16 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)}))` }} />
                  {flipDir === "forward" ? <RightPageContent ch={ch} /> : <RightPageContent ch={chNext} />}
                </div>
                {/* Back face */}
                <div className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div className="absolute top-0 bottom-0 left-0 pointer-events-none z-10"
                    style={{ width: "22%", background: `linear-gradient(270deg, transparent, rgba(0,0,0,${0.04 + 0.15 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)}))` }} />
                  {flipDir === "forward" ? <LeftPageContent ch={chNext} /> : <LeftPageContent ch={ch} />}
                </div>
              </div>
            )}

            {/* Gutter shadow */}
            <div className="absolute top-0 bottom-0 left-0 w-5 pointer-events-none z-30 rounded-r-md"
              style={{ background: "linear-gradient(270deg, transparent, rgba(0,0,0,0.04))" }} />
          </div>
        </div>
      </div>

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={onNext} disabled={isFlipping}
        className="flex-shrink-0 flex items-center justify-center rounded-full text-lg disabled:opacity-40"
        style={{
          width: "clamp(38px,4vw,52px)", height: "clamp(38px,4vw,52px)",
          background: PAPER,
          border: `1.5px solid ${RULED}`,
          color: INK,
          boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
          fontFamily: "Georgia, serif",
        }}
      >
        →
      </motion.button>
    </div>
  );
};

/* ─── MOBILE CARD ────────────────────────────────────────────── */
const MobileCard = ({ ch, onNext, onPrev }) => {
  const [flipped, setFlipped] = useState(false);
  const [anim, setAnim] = useState(false);

  const toggle = () => {
    if (anim) return;
    setAnim(true);
    setFlipped(f => !f);
    setTimeout(() => setAnim(false), FLIP_MS);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ height: 500, perspective: 1400 }}>
      <div
        className="w-full h-full relative cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: `transform ${FLIP_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
        onClick={toggle}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-lg overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxShadow: "4px 6px 24px rgba(0,0,0,0.15)" }}>
          <LeftPageContent ch={ch} />
          <div className="absolute bottom-4 left-0 right-0 text-center font-mono" style={{ fontSize: 11, color: FADED }}>
            Tap to see topics →
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-lg overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "4px 6px 24px rgba(0,0,0,0.15)" }}>
          <RightPageContent ch={ch} />
        </div>
      </div>

      {/* Mobile nav */}
      <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={e => { e.stopPropagation(); onPrev(); setFlipped(false); }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
          style={{ background: PAPER, border: `1.5px solid ${RULED}`, color: INK, boxShadow: "2px 3px 8px rgba(0,0,0,0.1)" }}
        >←</button>
        <button
          onClick={e => { e.stopPropagation(); onNext(); setFlipped(false); }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
          style={{ background: PAPER, border: `1.5px solid ${RULED}`, color: INK, boxShadow: "2px 3px 8px rgba(0,0,0,0.1)" }}
        >→</button>
      </div>
    </div>
  );
};

/* ─── MAIN SECTION ───────────────────────────────────────────── */
const BookSection = () => {
  const [cur, setCur]           = useState(0);
  const [nxt, setNxt]           = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir]   = useState("forward");
  const [flipAngle, setFlipAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const rafRef   = useRef(null);
  const count    = chapters.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const runFlip = useCallback((dir, targetIdx) => {
    if (isFlipping) return;
    setNxt(targetIdx);
    setFlipDir(dir);
    setFlipAngle(0);
    setIsFlipping(true);
    const start  = performance.now();
    const target = dir === "forward" ? -180 : 180;
    const step   = (now) => {
      const t    = Math.min((now - start) / FLIP_MS, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setFlipAngle(target * ease);
      if (t < 1) { rafRef.current = requestAnimationFrame(step); }
      else { setFlipAngle(0); setCur(targetIdx); setIsFlipping(false); }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [isFlipping]);

  const goNext = useCallback(() => runFlip("forward",  (cur + 1) % count), [runFlip, cur, count]);
  const goPrev = useCallback(() => runFlip("backward", (cur - 1 + count) % count), [runFlip, cur, count]);

  useEffect(() => {
    if (isMobile) return;
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goNext, isMobile]);

  const resetTimer = () => {
    if (isMobile) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
  };

  const handleNext = () => { goNext(); resetTimer(); };
  const handlePrev = () => { goPrev(); resetTimer(); };
  const handleDot  = (i) => {
    if (i === cur || isFlipping) return;
    runFlip(i > cur ? "forward" : "backward", i);
    resetTimer();
  };

  const ch = chapters[cur];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      <section
        className="relative overflow-hidden"
        style={{
          padding: "clamp(40px, 7vw, 96px) clamp(16px, 5vw, 60px)",
          background: PAPER,
          backgroundImage: `
            repeating-linear-gradient(transparent, transparent 27px, ${RULED}44 27px, ${RULED}44 28px),
            linear-gradient(90deg, transparent 52px, ${RED}18 53px, ${RED}18 54px, transparent 54px)
          `,
          backgroundPositionY: "32px",
        }}
      >
        {/* Ambient blobs — matching Pillars */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{
            width: "clamp(150px,25vw,300px)", height: "clamp(150px,25vw,300px)",
            filter: "blur(80px)",
            background: `radial-gradient(circle, ${RED}12, transparent)`,
            top: "10%", right: "5%",
          }} />
          <div className="absolute rounded-full" style={{
            width: "clamp(100px,18vw,200px)", height: "clamp(100px,18vw,200px)",
            filter: "blur(60px)",
            background: `radial-gradient(circle, ${BLUE}10, transparent)`,
            bottom: "15%", left: "8%",
          }} />
        </div>

        {/* Pencil decoration — hidden on mobile */}
        <div className="absolute top-6 right-6 opacity-15 hidden sm:block" aria-hidden>
          <PencilSVG size={160} rotate={5} />
        </div>

        {/* Corner doodles */}
        <svg className="absolute top-6 left-8 opacity-[0.07] pointer-events-none hidden md:block" width="72" height="72" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" stroke={RED} strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
          <circle cx="40" cy="40" r="18" stroke={RED} strokeWidth="1" fill="none" />
          <line x1="10" y1="40" x2="70" y2="40" stroke={RED} strokeWidth="1" opacity="0.5" />
          <line x1="40" y1="10" x2="40" y2="70" stroke={RED} strokeWidth="1" opacity="0.5" />
        </svg>
        <svg className="absolute bottom-8 right-8 opacity-[0.07] pointer-events-none hidden md:block" width="60" height="60" viewBox="0 0 64 64">
          <rect x="6" y="6" width="52" height="52" rx="4" stroke={RED} strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <rect x="18" y="18" width="28" height="28" rx="2" stroke={RED} strokeWidth="1" fill="none" />
          <circle cx="32" cy="32" r="6" fill={RED} opacity="0.4" />
        </svg>

        {/* Decorative wave */}
        <div className="absolute top-0 right-0 pointer-events-none opacity-15">
          <svg style={{ width: "clamp(120px,22vw,300px)", height: "clamp(80px,15vw,200px)" }} viewBox="0 0 300 200">
            <path d="M300 0 C220 40, 140 30, 80 90 C40 130, 15 165, 0 200" stroke={RED} strokeWidth="2" fill="none" />
            <circle cx="160" cy="70" r="5" fill={RED} opacity="0.5" />
            <circle cx="100" cy="115" r="3" fill={RED} opacity="0.4" />
          </svg>
        </div>

        {/* ── SECTION INNER ── */}
        <div className="max-w-[1100px] mx-auto relative z-[2]">

          {/* ── HEADER (Pillars-style) ── */}
          <FadeUp>
            {/* Label row */}
            <div className="flex items-center gap-[14px] mb-[clamp(8px,1.5vw,14px)] flex-wrap">
              <div className="w-5 h-[2.5px] shrink-0" style={{ background: RED }} />
              <span className="font-mono uppercase tracking-[0.22em]" style={{ fontSize: "clamp(9px,1.2vw,12px)", color: RED }}>
                What We Offer
              </span>
              <Stamp text="Curriculum" color={BLUE} rotate={3} />
            </div>

            {/* Sub-heading */}
            <p
              className="leading-[1.6] font-bold mb-1"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", fontSize: "24px", color: "black" }}
            >
              At{" "}
              <Highlight color="#FFEB3B">
                <span style={{ color: RED, fontStyle: "italic" }}>Esperly</span>
              </Highlight>
              , we unlock each child's true potential through{" "}
              <span style={{ fontStyle: "italic" }}>thoughtful</span> and guided learning.
            </p>

            {/* Scribble underline */}
            <ScribbleUnderline color={RED} style={{ width: "clamp(140px,30vw,320px)", marginBottom: "clamp(24px,4vw,48px)" }} />
          </FadeUp>

          {/* ── BOOK / CARD ── */}
          {isMobile ? (
            <div className="mb-24">
              <MobileCard ch={ch} onNext={handleNext} onPrev={handlePrev} />
            </div>
          ) : (
            <DesktopBook
              cur={cur} nxt={nxt}
              isFlipping={isFlipping} flipDir={flipDir} flipAngle={flipAngle}
              onPrev={handlePrev} onNext={handleNext}
            />
          )}

          {/* ── PROGRESS DOTS ── */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex gap-2 items-center">
              {chapters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className="rounded-full border-none outline-none cursor-pointer transition-all duration-300"
                  style={{
                    width: i === cur ? 28 : 8, height: 8,
                    background: i === cur ? RED : RULED,
                  }}
                />
              ))}
            </div>
            <div className="font-mono uppercase tracking-[0.18em]" style={{ fontSize: "clamp(9px,1vw,11px)", color: FADED }}>
              {chapters[cur].subject}
            </div>
            {/* Auto-play bar */}
            {!isMobile && (
              <div className="rounded-full overflow-hidden" style={{ width: "clamp(100px,18vw,200px)", height: 2, background: RULED }}>
                <motion.div
                  key={cur}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${RED}, ${RED}88)` }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookSection;