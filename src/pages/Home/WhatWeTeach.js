import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────
   CURRICULUM DATA
───────────────────────────────────────── */
const chapters = [
  {
    number: "01", subject: "Full Stack Development", icon: "⬡",
    tagline: "From zero to production",
    topics: ["HTML & CSS Mastery","JavaScript ES6+","React & Next.js","Node.js & Express","MongoDB & PostgreSQL","REST & GraphQL APIs","Docker & Deployment"],
    description: "Build complete web applications from the ground up. Learn how the frontend talks to the backend, how data flows, and how to ship products that scale.",
    duration: "240 hours", projects: "12 real projects",
    pageColor: "#FFF8F5", noteColor: "bg-amber-100", noteBorder: "border-amber-300",
    tapeColor: "bg-orange-200", dotColor: "bg-[#A6192E]",
  },
  {
    number: "02", subject: "Data Science", icon: "⬢",
    tagline: "Turn raw data into decisions",
    topics: ["Python & NumPy","Pandas & EDA","Data Visualisation","Statistics & Probability","Scikit-learn","Feature Engineering","Model Deployment"],
    description: "Master the full data pipeline — from messy CSVs to insight dashboards. Learn to ask the right questions and build models that actually get used.",
    duration: "200 hours", projects: "10 real projects",
    pageColor: "#FFFBF0", noteColor: "bg-yellow-100", noteBorder: "border-yellow-300",
    tapeColor: "bg-yellow-200", dotColor: "bg-[#A6192E]",
  },
  {
    number: "03", subject: "UI / UX Design", icon: "⬣",
    tagline: "Design that thinks and feels",
    topics: ["Design Principles","User Research","Wireframing","Figma Mastery","Prototyping","Usability Testing","Design Systems"],
    description: "Go beyond aesthetics. Understand how people think, how interfaces should behave, and how to design with empathy that converts users into fans.",
    duration: "160 hours", projects: "8 real projects",
    pageColor: "#F5FAFF", noteColor: "bg-blue-100", noteBorder: "border-blue-300",
    tapeColor: "bg-sky-200", dotColor: "bg-[#A6192E]",
  },
  {
    number: "04", subject: "Product Management", icon: "⬡",
    tagline: "Strategy meets execution",
    topics: ["Product Thinking","Market Research","PRDs & Roadmaps","Agile & Scrum","Metrics & OKRs","Stakeholder Mgmt","Go-to-Market"],
    description: "Learn to be the CEO of your product. Understand users, align teams, prioritise ruthlessly, and ship features that move the needle.",
    duration: "180 hours", projects: "9 real projects",
    pageColor: "#F5FFF5", noteColor: "bg-green-100", noteBorder: "border-green-300",
    tapeColor: "bg-green-200", dotColor: "bg-[#A6192E]",
  },
  {
    number: "05", subject: "AI & Machine Learning", icon: "⬢",
    tagline: "Build intelligent systems",
    topics: ["Linear & Logistic Reg.","Neural Networks","CNNs & RNNs","NLP & Transformers","Prompt Engineering","LLM Fine-tuning","MLOps"],
    description: "From perceptrons to large language models. Learn the mathematics, the intuition, and the engineering to build AI systems that work in the real world.",
    duration: "220 hours", projects: "11 real projects",
    pageColor: "#FDF5FF", noteColor: "bg-purple-100", noteBorder: "border-purple-300",
    tapeColor: "bg-violet-200", dotColor: "bg-[#A6192E]",
  },
  {
    number: "06", subject: "Cloud & DevOps", icon: "⬣",
    tagline: "Ship fast. Stay reliable.",
    topics: ["Linux & Bash","AWS / GCP / Azure","CI / CD Pipelines","Docker & Kubernetes","Infrastructure as Code","Monitoring & Logging","Security Best Practices"],
    description: "Master the infrastructure that keeps apps alive. Learn to automate deployments, scale systems, and build pipelines that ship code safely every day.",
    duration: "190 hours", projects: "9 real projects",
    pageColor: "#FFF8F0", noteColor: "bg-orange-100", noteBorder: "border-orange-300",
    tapeColor: "bg-amber-200", dotColor: "bg-[#A6192E]",
  },
];

const FLIP_MS = 700;
const AUTO_INTERVAL = 4200;

/* ─────────────────────────────────────────
   NOTEBOOK RULED LINES (SVG)
───────────────────────────────────────── */
const RuledLines = ({ accentColor = "#A6192E" }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 22 }, (_, i) => (
      <div
        key={i}
        className="absolute left-0 right-0"
        style={{ top: 52 + i * 24, height: 1, background: `${accentColor}18` }}
      />
    ))}
    {/* red margin line */}
    <div className="absolute top-0 bottom-0" style={{ left: 48, width: 1, background: "#f0a0a822" }} />
  </div>
);

/* ─────────────────────────────────────────
   WASHI TAPE STRIP
───────────────────────────────────────── */
const WashiTape = ({ className = "", width = 56, rotation = -2, color = "rgba(255,210,80,0.72)" }) => (
  <div
    className="absolute z-20 pointer-events-none"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <svg width={width} height={20} viewBox={`0 0 ${width} 20`}>
      <defs>
        <pattern id={`wt${width}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.5" fill="rgba(255,255,255,0.38)" />
        </pattern>
      </defs>
      <rect width={width} height={20} rx={2} fill={color} />
      <rect width={width} height={20} rx={2} fill={`url(#wt${width})`} />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   PAPER CLIP SVG
───────────────────────────────────────── */
const PaperClip = ({ rotation = 0, color = "#b0b8c8" }) => (
  <div
    className="absolute z-30 pointer-events-none"
    style={{ transform: `rotate(${rotation}deg)`, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))" }}
  >
    <svg width="22" height="52" viewBox="0 0 22 52" fill="none">
      <path
        d="M11 3C6 3 2 6.5 2 12 L2 38 C2 46 6.5 50 11 50 C15.5 50 20 46 20 38 L20 16 C20 11 17 8 13 8 L11 8 C8 8 5.5 10 5.5 13.5 L5.5 36 C5.5 39.5 8 42 11 42 C14 42 16.5 39.5 16.5 36 L16.5 18"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   STICKY NOTE CORNER
───────────────────────────────────────── */
const StickyCorner = ({ text, color = "bg-yellow-200", position = "top-right" }) => {
  const pos = position === "top-right"
    ? "top-[-10px] right-[-10px]"
    : "bottom-[-10px] left-[-10px]";
  return (
    <div className={`absolute ${pos} z-30 pointer-events-none`}
      style={{ transform: `rotate(${position === "top-right" ? 6 : -5}deg)` }}>
      <div className={`${color} rounded-sm px-2 py-1 shadow-md`}
        style={{
          fontFamily: "'Caveat', cursive", fontSize: 11, color: "#3a2f1a",
          backgroundImage: "repeating-linear-gradient(transparent, transparent 14px, rgba(0,0,0,0.06) 14px, rgba(0,0,0,0.06) 15px)",
          minWidth: 52,
        }}>
        {text}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   LEFT PAGE CONTENT
───────────────────────────────────────── */
const LeftPageContent = ({ ch }) => (
  <div
    className="w-full h-full flex flex-col justify-center items-center text-center px-8 py-10 relative overflow-hidden"
    style={{ background: ch.pageColor }}
  >
    <RuledLines />
    {/* Big ghost number */}
    <div
      className="absolute bottom-2 right-2 select-none pointer-events-none"
      style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(80px,10vw,120px)", fontWeight: 900, color: "#A6192E", opacity: 0.055, lineHeight: 1 }}
    >
      {ch.number}
    </div>

    {/* Washi tape at top */}
    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2">
      <WashiTape width={64} rotation={-1} color="rgba(255,200,80,0.7)" />
    </div>

    {/* Icon */}
    <div className="relative z-10 text-5xl mb-4" style={{ color: "#A6192E" }}>{ch.icon}</div>

    {/* Subject */}
    <h3
      className="relative z-10 font-black leading-tight mb-2"
      style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(16px,2vw,24px)", color: "#1A1410" }}
    >
      {ch.subject}
    </h3>

    {/* Tagline */}
    <p
      className="relative z-10 italic mb-4"
      style={{ fontFamily: "DM Serif Display, Georgia, serif", fontSize: "clamp(11px,1.1vw,13px)", color: "#A6192E", letterSpacing: "0.04em" }}
    >
      {ch.tagline}
    </p>

    {/* Animated underline */}
    <svg className="relative z-10 mb-4" width="80" height="10" viewBox="0 0 80 10">
      <path d="M2 6 Q20 2, 40 7 Q60 12, 78 5" stroke="#A6192E" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>

    {/* Description */}
    <p
      className="relative z-10 leading-relaxed mb-6"
      style={{ fontFamily: "Georgia, serif", fontSize: "clamp(10px,1.05vw,12.5px)", color: "#6B5F52", maxWidth: 240 }}
    >
      {ch.description}
    </p>

    {/* Stats */}
    <div className="relative z-10 flex gap-3">
      {[ch.duration, ch.projects].map((s, i) => (
        <div
          key={i}
          className="border rounded px-3 py-1.5"
          style={{
            fontFamily: "monospace", fontSize: "clamp(9px,0.85vw,11px)", color: "#A6192E",
            background: "#A6192E10", borderColor: "#A6192E30", fontWeight: 700, letterSpacing: "0.06em",
          }}
        >
          {s}
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────
   RIGHT PAGE CONTENT
───────────────────────────────────────── */
const RightPageContent = ({ ch }) => (
  <div className="w-full h-full flex flex-col px-8 py-8 relative overflow-hidden bg-[#FFFCF8]">
    <RuledLines accentColor="#8C7F6E" />

    {/* Top washi */}
    <div className="absolute top-[-8px] right-10">
      <WashiTape width={52} rotation={2} color="rgba(160,200,255,0.65)" />
    </div>

    {/* Chapter label */}
    <div
      className="relative z-10 mb-3"
      style={{ fontFamily: "monospace", fontSize: "clamp(9px,0.85vw,11px)", color: "#8C7F6E", letterSpacing: "0.2em", textTransform: "uppercase" }}
    >
      Chapter {ch.number} · Curriculum
    </div>

    {/* Section heading */}
    <h4
      className="relative z-10 mb-4 pb-3 border-b border-[#E5DDD0]"
      style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 700, color: "#1A1410" }}
    >
      What you'll learn
    </h4>

    {/* Topics */}
    <div className="relative z-10 flex flex-col gap-2.5 flex-1">
      {ch.topics.map((topic, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#A6192E", opacity: 0.85 }} />
          <span
            className="flex-1"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(10px,1.05vw,13px)", color: "#3D3428", lineHeight: 1.4 }}
          >
            {topic}
          </span>
          {/* Dotted leader line */}
          <div className="flex-1 border-b border-dotted border-[#C9BFB0] mb-0.5" />
          <span className="flex-shrink-0" style={{ fontFamily: "monospace", fontSize: 10, color: "#C9BFB0" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div
      className="relative z-10 flex justify-between items-center pt-3 mt-3 border-t border-[#E5DDD0]"
    >
      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#8C7F6E", letterSpacing: "0.1em" }}>ESPERLY</span>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 11, color: "#8C7F6E", fontStyle: "italic" }}>
        pg. {ch.number}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   BOOK SPINE
───────────────────────────────────────── */
const Spine = ({ ch }) => (
  <div
    className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden"
    style={{ background: `linear-gradient(180deg, #A6192Eee 0%, #8B1527cc 100%)` }}
  >
    <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0.1) 100%)" }} />
    {/* Spiral holes */}
    {[...Array(7)].map((_, i) => (
      <div
        key={i}
        className="relative z-10 rounded-full"
        style={{
          width: 8, height: 8,
          background: "rgba(0,0,0,0.35)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.2)",
          margin: "2px 0",
        }}
      />
    ))}
    <span
      className="relative z-10"
      style={{
        fontFamily: "Fraunces, Georgia, serif", fontSize: 10, fontWeight: 900,
        color: "rgba(255,255,255,0.85)", letterSpacing: "0.18em",
        writingMode: "vertical-rl", textOrientation: "mixed",
        transform: "rotate(180deg)", textTransform: "uppercase",
        maxHeight: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}
    >
      {ch.subject}
    </span>
    <span
      className="relative z-10"
      style={{
        fontFamily: "monospace", fontSize: 8, color: "rgba(255,255,255,0.5)",
        writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.12em",
      }}
    >
      {ch.number}
    </span>
  </div>
);

/* ─────────────────────────────────────────
   DESKTOP BOOK — two-page spread with
   physics-correct flip. The page that
   flips has:
     front face  = current RIGHT page
     back  face  = next    LEFT  page
   Under the flipping page we reveal:
     next's RIGHT page (already visible)
───────────────────────────────────────── */
const DesktopBook = ({ cur, nxt, isFlipping, flipDir, flipAngle, chapters, onPrev, onNext }) => {
  const ch = chapters[cur];
  const chNext = chapters[nxt];

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      {/* Prev */}
      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
        onClick={onPrev} disabled={isFlipping}
        className="flex-shrink-0 flex items-center justify-center rounded-full border border-[#E5DDD0] bg-[#FFFCF8] text-[#1A1410] shadow-sm text-lg disabled:opacity-40"
        style={{ width: "clamp(36px,4vw,48px)", height: "clamp(36px,4vw,48px)" }}
      >
        ←
      </motion.button>

      {/* Book */}
      <div className="relative" style={{ width: "clamp(320px,72vw,840px)", height: "clamp(300px,42vw,490px)" }}>

        {/* Drop shadow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ bottom: -18, left: "6%", right: "6%", height: 26, background: "rgba(0,0,0,0.16)", filter: "blur(14px)", zIndex: 0 }}
        />

        {/* Stacked pages illusion */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-md"
            style={{
              bottom: -(i + 1) * 2,
              left: `calc(clamp(20px,2.5vw,30px) + ${i * 0.5}px)`,
              right: -(i * 0.5),
              height: "100%",
              background: i % 2 === 0 ? "#f0ebe3" : "#e8e0d4",
              zIndex: -i - 1,
            }}
          />
        ))}

        {/* Book body */}
        <div className="relative w-full h-full flex rounded-md overflow-visible z-10"
          style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)" }}>

          {/* SPINE */}
          <div
            className="flex-shrink-0 rounded-l-md overflow-hidden relative z-10"
            style={{ width: "clamp(20px,2.5vw,30px)", boxShadow: "inset -4px 0 12px rgba(0,0,0,0.2)" }}
          >
            <Spine ch={ch} />
          </div>

          {/* LEFT PAGE — static */}
          <div className="flex-1 relative overflow-hidden border-r border-[#E5DDD0] z-10">
            {/* When flipping, cross-fade left page */}
            <div className="absolute inset-0" style={{
              opacity: isFlipping
                ? (flipDir === "forward"
                  ? Math.min(Math.abs(flipAngle) / 90, 1)
                  : Math.min(flipAngle / 90, 1))
                : 0
            }}>
              <LeftPageContent ch={isFlipping ? chNext : ch} />
            </div>
            <div className="absolute inset-0" style={{
              opacity: isFlipping
                ? (flipDir === "forward"
                  ? Math.max(1 - Math.abs(flipAngle) / 90, 0)
                  : Math.max(1 - flipAngle / 90, 0))
                : 1
            }}>
              <LeftPageContent ch={ch} />
            </div>
            {/* Centre gutter shadow */}
            <div className="absolute top-0 bottom-0 right-0 w-5 pointer-events-none z-10"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.05))" }} />
          </div>

          {/* RIGHT SIDE — container with flipping page on top */}
          <div className="flex-1 relative overflow-visible z-20" style={{ perspective: 1800 }}>

            {/* ── STATIC UNDERLAYER ─────────────────────────
                Reveals the DESTINATION right page beneath
                the flipping page as it peels away.
            ─────────────────────────────────────────────── */}
            <div className="absolute inset-0 z-0 rounded-r-md overflow-hidden">
              {isFlipping && flipDir === "forward" && <RightPageContent ch={chNext} />}
              {isFlipping && flipDir === "backward" && <RightPageContent ch={ch} />}
              {!isFlipping && <RightPageContent ch={ch} />}
            </div>

            {/* ── THE FLIPPING PAGE ─────────────────────────
                transformStyle: preserve-3d
                rotateY: 0  → fully open (shows front)
                rotateY:-180 → fully flipped (shows back)

                FRONT face = page being turned (current RIGHT)
                BACK  face = reverse side    (next   LEFT)
            ─────────────────────────────────────────────── */}
            {isFlipping && (
              <div
                className="absolute inset-0 z-20"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "0% 50%",
                  transform: `rotateY(${flipAngle}deg)`,
                  /* Curved curl shadow that strengthens mid-flip */
                  filter: `drop-shadow(${
                    Math.abs(flipAngle) > 10 && Math.abs(flipAngle) < 170
                      ? `${flipDir === "forward" ? "-6px" : "6px"} 0 18px rgba(0,0,0,${
                          0.08 + 0.2 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)
                        })`
                      : "none"
                  })`,
                }}
              >
                {/* ── FRONT FACE ── */}
                <div
                  className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  {/* Page curl shade on right edge */}
                  <div
                    className="absolute top-0 bottom-0 right-0 pointer-events-none z-10"
                    style={{
                      width: "18%",
                      background: `linear-gradient(90deg, transparent, rgba(0,0,0,${
                        0.03 + 0.14 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)
                      }))`,
                    }}
                  />
                  {/* Page gloss on left edge */}
                  <div
                    className="absolute top-0 bottom-0 left-0 pointer-events-none z-10"
                    style={{
                      width: "14%",
                      background: `linear-gradient(270deg, transparent, rgba(255,255,255,${
                        0.06 + 0.16 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)
                      }))`,
                    }}
                  />
                  {flipDir === "forward"
                    ? <RightPageContent ch={ch} />
                    : <RightPageContent ch={chNext} />
                  }
                </div>

                {/* ── BACK FACE ── (mirrored — rotateY 180deg) */}
                <div
                  className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Back-face shade on left edge (was the spine side) */}
                  <div
                    className="absolute top-0 bottom-0 left-0 pointer-events-none z-10"
                    style={{
                      width: "22%",
                      background: `linear-gradient(270deg, transparent, rgba(0,0,0,${
                        0.04 + 0.15 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)
                      }))`,
                    }}
                  />
                  {flipDir === "forward"
                    ? <LeftPageContent ch={chNext} />
                    : <LeftPageContent ch={ch} />
                  }
                </div>
              </div>
            )}

            {/* Gutter shadow on left edge of right page */}
            <div
              className="absolute top-0 bottom-0 left-0 w-5 pointer-events-none z-30 rounded-r-md"
              style={{ background: "linear-gradient(270deg, transparent, rgba(0,0,0,0.05))" }}
            />
          </div>
        </div>
      </div>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
        onClick={onNext} disabled={isFlipping}
        className="flex-shrink-0 flex items-center justify-center rounded-full border border-[#E5DDD0] bg-[#FFFCF8] text-[#1A1410] shadow-sm text-lg disabled:opacity-40"
        style={{ width: "clamp(36px,4vw,48px)", height: "clamp(36px,4vw,48px)" }}
      >
        →
      </motion.button>
    </div>
  );
};

/* ─────────────────────────────────────────
   MOBILE SINGLE CARD (flip on tap)
───────────────────────────────────────── */
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
    <div className="relative w-full max-w-sm mx-auto" style={{ height: 480, perspective: 1400 }}>
      <div
        className="w-full h-full relative cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: `transform ${FLIP_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
        onClick={toggle}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden shadow-xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <LeftPageContent ch={ch} />
          <div className="absolute bottom-4 left-0 right-0 text-center" style={{ fontFamily: "monospace", fontSize: 11, color: "#8C7F6E" }}>
            Tap to see topics →
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden shadow-xl"
          style={{
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <RightPageContent ch={ch} />
        </div>
      </div>
      {/* Nav */}
      <div className="absolute -bottom-14 left-0 right-0 flex justify-center gap-5">
        <button
          onClick={e => { e.stopPropagation(); onPrev(); setFlipped(false); }}
          className="w-10 h-10 rounded-full border border-[#E5DDD0] bg-[#FFFCF8] flex items-center justify-center text-lg text-[#1A1410]"
        >←</button>
        <button
          onClick={e => { e.stopPropagation(); onNext(); setFlipped(false); }}
          className="w-10 h-10 rounded-full border border-[#E5DDD0] bg-[#FFFCF8] flex items-center justify-center text-lg text-[#1A1410]"
        >→</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
const WhatWeTeach = () => {
  const [cur, setCur] = useState(0);
  const [nxt, setNxt] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState("forward");
  const [flipAngle, setFlipAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const count = chapters.length;

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
    const start = performance.now();
    const target = dir === "forward" ? -180 : 180;

    const step = (now) => {
      const t = Math.min((now - start) / FLIP_MS, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const angle = target * ease;
      setFlipAngle(angle);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setFlipAngle(0);
        setCur(targetIdx);
        setIsFlipping(false);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [isFlipping]);

  const goNext = useCallback(() => runFlip("forward", (cur + 1) % count), [runFlip, cur, count]);
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

  const handleDot = (i) => {
    if (i === cur || isFlipping) return;
    const dir = i > cur ? "forward" : "backward";
    runFlip(dir, i);
    resetTimer();
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <section
        className="relative overflow-hidden py-16 md:py-24 px-4 md:px-12"
        style={{
          background: "#FAF7F2",
          /* Faint notebook lines on section bg */
          backgroundImage: `
            repeating-linear-gradient(transparent, transparent 27px, #c8d8e840 27px, #c8d8e840 28px),
            linear-gradient(90deg, transparent 52px, #f0a0a820 53px, #f0a0a820 54px, transparent 54px)
          `,
          backgroundPositionY: "32px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Section ambient */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 15% 50%, #A6192E08, transparent 55%), radial-gradient(ellipse at 85% 20%, #A6192E05, transparent 50%)",
        }} />

        {/* Corner doodle */}
        <svg className="absolute top-6 right-8 opacity-10 pointer-events-none hidden md:block" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" stroke="#A6192E" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
          <circle cx="40" cy="40" r="18" stroke="#A6192E" strokeWidth="1" fill="none" />
          <line x1="10" y1="40" x2="70" y2="40" stroke="#A6192E" strokeWidth="1" opacity="0.5" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="#A6192E" strokeWidth="1" opacity="0.5" />
        </svg>
        <svg className="absolute bottom-8 left-8 opacity-10 pointer-events-none hidden md:block" width="64" height="64" viewBox="0 0 64 64">
          <rect x="6" y="6" width="52" height="52" rx="4" stroke="#A6192E" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <rect x="18" y="18" width="28" height="28" rx="2" stroke="#A6192E" strokeWidth="1" fill="none" />
          <circle cx="32" cy="32" r="6" fill="#A6192E" opacity="0.4" />
        </svg>

        <div className="max-w-6xl mx-auto relative">

          {/* ── HEADER ─────────────────────────── */}
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12 md:mb-16">
            <div>
              {/* Washi label */}
              <div className="inline-flex items-center gap-2 mb-3">
                <div
                  className="px-4 py-1 rounded-sm"
                  style={{
                    background: "rgba(255,200,80,0.65)",
                    fontFamily: "'Caveat', cursive", fontSize: 14, color: "#3a2a10",
                    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 6px)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    transform: "rotate(-1deg)",
                  }}
                >
                  📖 Curriculum
                </div>
              </div>
              <h2
                className="font-black leading-none tracking-tight"
                style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(28px,4.5vw,56px)", color: "#1A1410", letterSpacing: "-0.025em" }}
              >
                What We<br />
                <span style={{ color: "#A6192E", fontStyle: "italic" }}>Teach</span>
              </h2>
              {/* Hand-drawn underline */}
              <svg width="140" height="12" viewBox="0 0 140 12" className="mt-1">
                <path d="M2 8 Q35 3, 70 9 Q105 14, 138 6" stroke="#A6192E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M10 11 Q50 8, 90 11 Q120 13, 136 9" stroke="#A6192E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />
              </svg>
            </div>

            {/* Ghost chapter counter */}
            <div
              className="select-none"
              style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, color: "#A6192E", opacity: 0.1, lineHeight: 1 }}
            >
              {String(cur + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>
          </div>

          {/* ── BOOK / CARD ─────────────────────── */}
          {isMobile ? (
            <div className="mb-20">
              <MobileCard ch={chapters[cur]} onNext={handleNext} onPrev={handlePrev} />
            </div>
          ) : (
            <DesktopBook
              cur={cur} nxt={nxt}
              isFlipping={isFlipping} flipDir={flipDir} flipAngle={flipAngle}
              chapters={chapters}
              onPrev={handlePrev} onNext={handleNext}
            />
          )}

          {/* ── PROGRESS DOTS ─────────────────── */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex gap-2 items-center">
              {chapters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className="rounded-full border-none outline-none cursor-pointer transition-all duration-300"
                  style={{
                    width: i === cur ? 28 : 8, height: 8,
                    background: i === cur ? "#A6192E" : "#E5DDD0",
                  }}
                />
              ))}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,11px)", color: "#8C7F6E", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {chapters[cur].subject}
            </div>
            {/* Auto-play bar (desktop only) */}
            {!isMobile && (
              <div className="rounded-full overflow-hidden" style={{ width: "clamp(100px,18vw,200px)", height: 2, background: "#E5DDD0" }}>
                <motion.div
                  key={cur}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #A6192E, #A6192E88)" }}
                />
              </div>
            )}
          </div>

          {/* ── CHAPTER THUMBNAIL TABS ─────────── */}
          <div className="flex gap-2 md:gap-3 mt-8 flex-wrap justify-center">
            {chapters.map((ch, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleDot(i)}
                className="flex items-center gap-2 rounded-lg border outline-none cursor-pointer transition-all duration-250"
                style={{
                  padding: "7px 14px",
                  background: i === cur ? "#A6192E14" : "#FFFCF8",
                  borderColor: i === cur ? "#A6192E55" : "#E5DDD0",
                  boxShadow: i === cur ? "0 4px 16px #A6192E18" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: 13, color: "#A6192E" }}>{ch.icon}</span>
                <span style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: "clamp(10px,1.1vw,12px)",
                  fontWeight: i === cur ? 700 : 500,
                  color: i === cur ? "#A6192E" : "#8C7F6E",
                  whiteSpace: "nowrap",
                  transition: "color 0.25s",
                }}>
                  {ch.subject}
                </span>
              </motion.button>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default WhatWeTeach;