import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiUsers, FiAward, FiBookOpen, FiTarget } from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════════════
   FONTS + GLOBAL RESPONSIVE STYLES
═══════════════════════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Kalam:wght@400;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  body { overflow-x: hidden; }

  /* ── Hero floating elements ── */
  @keyframes floatA {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%       { transform: translateY(-14px) rotate(-0.5deg); }
  }
  @keyframes floatB {
    0%, 100% { transform: translateY(0px) rotate(3deg); }
    50%       { transform: translateY(-10px) rotate(4.5deg); }
  }
  @keyframes floatC {
    0%, 100% { transform: translateY(0px) rotate(1deg); }
    50%       { transform: translateY(-18px) rotate(-1deg); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes inkDraw {
    from { stroke-dashoffset: 1000; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes tape-slide {
    from { opacity: 0; transform: rotate(-3deg) scaleX(0); }
    to   { opacity: 1; transform: rotate(-3deg) scaleX(1); }
  }

  .float-a { animation: floatA 6s ease-in-out infinite; }
  .float-b { animation: floatB 8s ease-in-out infinite 1s; }
  .float-c { animation: floatC 7s ease-in-out infinite 2s; }
  .spin-slow { animation: spinSlow 20s linear infinite; }

  .ink-path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: inkDraw 2s ease-out 0.5s forwards;
  }
  .ink-path-2 {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: inkDraw 1.8s ease-out 1s forwards;
  }

  .cursor-blink { animation: blink 1s step-end infinite; }

  .tape-reveal {
    transform-origin: left center;
    animation: tape-slide 0.5s ease-out forwards;
  }

  /* ── Responsive layout ── */
  .hero-section {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 5rem 1rem 6rem;
  }
  @media (min-width: 640px) {
    .hero-section { padding: 6rem 2rem 7rem; }
  }
  @media (min-width: 1024px) {
    .hero-section { padding: 7rem 4rem 8rem; }
  }

  .hero-inner {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    line-height: 1.1;
    color: #fef9f0;
    font-size: clamp(2rem, 7vw, 5rem);
    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    letter-spacing: -0.02em;
  }
  .hero-title-italic {
    font-style: italic;
    color: #fca5a5;
    display: block;
    font-size: clamp(2.4rem, 8vw, 5.8rem);
  }

  .hero-subtitle {
    font-family: 'Crimson Pro', Georgia, serif;
    color: rgba(254,249,240,0.78);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Notebook paper page card in hero */
  .hero-notebook-card {
    background: #fef9f0;
    border-radius: 2px 2px 4px 4px;
    padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 2rem);
    position: relative;
    box-shadow:
      0 2px 0 #e0d5c5,
      0 4px 0 #d5c8b5,
      0 8px 0 #c8b89e,
      0 20px 60px rgba(0,0,0,0.35),
      inset 0 1px 0 rgba(255,255,255,0.8);
    max-width: 640px;
    margin: 0 auto;
  }

  /* Floating decorative cards */
  .deco-card-left {
    display: none;
  }
  .deco-card-right {
    display: none;
  }
  @media (min-width: 1024px) {
    .deco-card-left  { display: block; }
    .deco-card-right { display: block; }
  }

  /* Hero CTA buttons */
  .hero-cta-row {
    display: flex;
    gap: 0.875rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.75rem;
  }
  .hero-btn-primary {
    font-family: 'Kalam', cursive;
    font-weight: 700;
    font-size: clamp(14px, 2.5vw, 16px);
    padding: 0.75rem 1.75rem;
    border-radius: 3px;
    background: linear-gradient(135deg, #A6192E, #7d1222);
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 3px 4px 0 rgba(0,0,0,0.25), 0 8px 20px rgba(166,25,46,0.4);
    transition: transform 0.15s, box-shadow 0.15s;
    white-space: nowrap;
  }
  .hero-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 3px 6px 0 rgba(0,0,0,0.25), 0 12px 24px rgba(166,25,46,0.45);
  }
  .hero-btn-secondary {
    font-family: 'Kalam', cursive;
    font-weight: 700;
    font-size: clamp(14px, 2.5vw, 16px);
    padding: 0.75rem 1.75rem;
    border-radius: 3px;
    background: transparent;
    color: #7f1d1d;
    border: 2px solid #f87171;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .hero-btn-secondary:hover {
    background: rgba(248,113,113,0.1);
    transform: translateY(-2px);
  }

  /* Spine decoration — hide on mobile */
  .spine-deco { display: none; }
  @media (min-width: 768px) { .spine-deco { display: block; } }

  /* ── Content section ── */
  .content-section {
    padding: 4rem 1rem 4rem;
  }
  @media (min-width: 640px) {
    .content-section { padding: 5rem 1.5rem 5rem; }
  }
  @media (min-width: 1024px) {
    .content-section { padding: 6rem 3rem 6rem; }
  }

  .content-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Mission grid */
  .mission-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    align-items: start;
    margin-bottom: 5rem;
  }
  @media (min-width: 1024px) {
    .mission-grid {
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
  }

  /* Stats corkboard grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  }

  /* Ruled lines bg */
  .ruled-bg {
    background: #fef9f0;
    background-image:
      repeating-linear-gradient(transparent, transparent 27px, rgba(243,213,213,0.5) 28px),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  }

  /* Section heading responsive */
  .section-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    color: #7f1d1d;
    line-height: 1.25;
  }

  /* Mission text */
  .mission-text {
    font-family: 'Crimson Pro', Georgia, serif;
    color: #44403c;
    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 2rem;
  }

  /* Stat value */
  .stat-value {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    color: #1c1917;
    line-height: 1.1;
  }

  /* Scrolling ticker */
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ticker-track {
    display: flex;
    width: max-content;
    animation: ticker 22s linear infinite;
  }
  .ticker-track:hover { animation-play-state: paused; }
`;

/* ═══════════════════════════════════════════════════════════════════
   TINY DECORATIVE COMPONENTS
═══════════════════════════════════════════════════════════════════ */
const PaperClip = ({ className = "", color = "#9ca3af", scale = 1 }) => (
  <svg className={className} width={28 * scale} height={70 * scale}
    viewBox="0 0 28 70" fill="none" style={{ display:"block" }}>
    <path d="M14 4C8.477 4 4 8.477 4 14v34c0 7.732 6.268 14 14 14s14-6.268 14-14V18"
      stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <path d="M14 4C19.523 4 24 8.477 24 14v28c0 5.523-4.477 10-10 10S4 47.523 4 42V18"
      stroke={color === "#9ca3af" ? "#6b7280" : color} strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const Pushpin = ({ color = "#dc2626", size = 24 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 24 36" fill="none" style={{ display:"block" }}>
    <circle cx="12" cy="10" r="9" fill={color}/>
    <circle cx="12" cy="10" r="5" fill="white" fillOpacity="0.35"/>
    <rect x="10.5" y="18" width="3" height="18" rx="1.5" fill="#78716c"/>
  </svg>
);

const TapeStrip = ({ color = "rgba(252,211,77,0.6)", width = 80, rotate = -3, style = {} }) => (
  <div style={{
    width, height: 22, background: color, borderRadius: 2,
    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
    transform: `rotate(${rotate}deg)`,
    ...style,
  }}/>
);

/* Ruled lines on a note card */
const NoteLines = ({ color = "rgba(243,213,213,0.6)", gap = 28, count = 12, startY = 40 }) => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", borderRadius:"inherit" }}>
    {Array.from({ length: count }).map((_,i) => (
      <div key={i} style={{
        position:"absolute", left:0, right:0,
        top: startY + i * gap, height: 1, background: color,
      }}/>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   HERO FLOATING DECO CARD (left / right)
═══════════════════════════════════════════════════════════════════ */
const DecoCard = ({ side, color, icon, title, value, rotate, floatClass }) => {
  const stickyPalette = {
    yellow: { bg:"#fff9c4", border:"#f9d71c", fold:"#e6c700", dark:"#78350f" },
    green:  { bg:"#d4f4dd", border:"#4ade80", fold:"#16a34a", dark:"#14532d" },
    blue:   { bg:"#dde9ff", border:"#93c5fd", fold:"#3b82f6", dark:"#1e3a5f" },
    pink:   { bg:"#ffd6d6", border:"#f87171", fold:"#dc2626", dark:"#7f1d1d" },
  };
  const c = stickyPalette[color];
  return (
    <div className={`deco-card-${side} ${floatClass}`} style={{
      position:"absolute",
      [side]: side === "left" ? "clamp(0.5rem, 3vw, 2rem)" : "clamp(0.5rem, 3vw, 2rem)",
      top: "50%", transform: `translateY(-50%) rotate(${rotate}deg)`,
      zIndex: 5,
    }}>
      <div style={{
        background: c.bg, border:`1.5px solid ${c.border}`,
        borderRadius: 3, padding:"1rem 1.25rem",
        boxShadow:`3px 5px 0 ${c.fold}55, 0 12px 30px rgba(0,0,0,0.15)`,
        minWidth: 110, textAlign:"center", position:"relative",
      }}>
        <NoteLines color={`${c.border}44`} gap={20} count={6} startY={30}/>
        {/* Fold corner */}
        <div style={{ position:"absolute", bottom:0, right:0, width:16, height:16,
          background:`linear-gradient(225deg, ${c.fold}99 50%, transparent 50%)` }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:24, marginBottom:4 }}>{icon}</div>
          <div style={{ fontFamily:"'Kalam', cursive", fontWeight:700,
            fontSize:"1.3rem", color: c.dark, lineHeight:1 }}>{value}</div>
          <div style={{ fontFamily:"'Kalam', cursive", fontSize:"0.7rem",
            color: c.dark, opacity:0.65, marginTop:2 }}>{title}</div>
        </div>
        {/* Pushpin */}
        <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)" }}>
          <Pushpin color={c.fold} size={18}/>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED TYPEWRITER
═══════════════════════════════════════════════════════════════════ */
const Typewriter = ({ texts, speed = 60 }) => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[idx];
    let timeout;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), speed);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts, speed]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink" style={{ borderRight:"3px solid #fca5a5", marginLeft:2 }}/>
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const bgY  = useTransform(scrollYProgress, [0,1], ["0%", "30%"]);
  const opac = useTransform(scrollYProgress, [0,0.8], [1, 0]);

  return (
    <section ref={heroRef} className="hero-section" style={{ background:"#A6192E" }}>
      {/* ── Parallax grid bg ── */}
      <motion.div style={{ y: bgY, position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.035) 60px),
            repeating-linear-gradient(0deg,  transparent, transparent 59px, rgba(255,255,255,0.035) 60px)
          `,
        }}/>
        {/* Radial glow */}
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse 80% 70% at 50% 40%, rgba(255,150,150,0.08) 0%, transparent 70%)",
        }}/>
        {/* Grain overlay */}
        <div style={{
          position:"absolute", inset:0, opacity:0.06,
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}/>
      </motion.div>

      {/* ── Spine strip ── */}
      <div className="spine-deco" style={{
        position:"absolute", left:0, top:0, height:"100%", width:56,
        background:"linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)",
        borderRight:"3px solid rgba(255,255,255,0.1)", zIndex:5,
      }}>
        {/* Hole punches */}
        {[18, 42, 68].map(pct=>(
          <div key={pct} style={{
            position:"absolute", left:"0.85rem", top:`${pct}%`,
            width:20, height:20, borderRadius:"50%",
            background:"rgba(0,0,0,0.4)",
            border:"2px solid rgba(255,255,255,0.08)",
            boxShadow:"inset 0 1px 3px rgba(0,0,0,0.5)",
          }}/>
        ))}
        {/* Coil SVG */}
        <svg style={{ position:"absolute", left:26, top:0, height:"100%", opacity:0.3 }}
          width={18} viewBox="0 0 18 900" preserveAspectRatio="none">
          {Array.from({length:30}).map((_,i)=>(
            <ellipse key={i} cx="9" cy={15+i*30} rx="7" ry="10"
              stroke="#e5e7eb" strokeWidth="1.5" fill="none"/>
          ))}
        </svg>
      </div>

      {/* ── Floating deco stars / sparkles ── */}
      {[
        { x:"8%",  y:"12%", size:24, opacity:0.18, delay:0 },
        { x:"92%", y:"18%", size:16, opacity:0.14, delay:0.8 },
        { x:"85%", y:"75%", size:20, opacity:0.12, delay:1.5 },
        { x:"6%",  y:"80%", size:18, opacity:0.15, delay:0.4 },
        { x:"50%", y:"6%",  size:14, opacity:0.1,  delay:1.2 },
      ].map((s,i)=>(
        <motion.div key={i}
          initial={{ opacity:0, scale:0 }}
          animate={{ opacity:s.opacity, scale:1 }}
          transition={{ delay: s.delay + 0.5, duration:0.6 }}
          style={{
            position:"absolute", left:s.x, top:s.y,
            pointerEvents:"none", zIndex:4,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24">
            <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z"
              fill="rgba(252,211,77,0.9)" stroke="none"/>
          </svg>
        </motion.div>
      ))}

      {/* ── Floating deco sticky notes (desktop only) ── */}
      <DecoCard side="left"  color="yellow" icon="🎓" title="Students" value="10K+"  rotate={-4} floatClass="float-a"/>
      <DecoCard side="right" color="green"  icon="📚" title="Courses"  value="500+"  rotate={5}  floatClass="float-b"/>

      {/* Additional small deco notes, hidden on mobile */}
      <motion.div className="deco-card-left float-c" style={{
        position:"absolute", left:"clamp(0.5rem,3vw,2.5rem)", top:"20%", zIndex:4,
      }}
        initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:1.1, duration:0.6 }}
      >
        <div style={{
          background:"#ffd6d6", border:"1.5px solid #f87171", borderRadius:3,
          padding:"0.6rem 0.875rem",
          boxShadow:"2px 3px 0 #dc262655",
          transform:"rotate(2deg)", position:"relative",
        }}>
          <NoteLines color="#f8717144" gap={18} count={4} startY={24}/>
          <div style={{ position:"relative", zIndex:1, fontFamily:"'Kalam', cursive",
            fontSize:"0.7rem", color:"#7f1d1d", whiteSpace:"nowrap" }}>
            ⭐ Top Rated<br/>Tutors
          </div>
        </div>
      </motion.div>

      <motion.div className="deco-card-right float-a" style={{
        position:"absolute", right:"clamp(0.5rem,3vw,2.5rem)", bottom:"25%", zIndex:4,
      }}
        initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:1.3, duration:0.6 }}
      >
        <div style={{
          background:"#dde9ff", border:"1.5px solid #93c5fd", borderRadius:3,
          padding:"0.6rem 0.875rem",
          boxShadow:"2px 3px 0 #3b82f655",
          transform:"rotate(-3deg)", position:"relative",
        }}>
          <NoteLines color="#93c5fd44" gap={18} count={4} startY={24}/>
          <div style={{ position:"relative", zIndex:1, fontFamily:"'Kalam', cursive",
            fontSize:"0.7rem", color:"#1e3a5f", whiteSpace:"nowrap" }}>
            🏆 95% Success<br/>Rate
          </div>
        </div>
      </motion.div>

      {/* ── MAIN HERO CONTENT ── */}
      <motion.div className="hero-inner" style={{ opacity: opac }}>

        {/* Label tape — animates in */}
        <motion.div
          initial={{ opacity:0, scaleX:0 }}
          animate={{ opacity:1, scaleX:1 }}
          transition={{ duration:0.5, ease:"easeOut" }}
          style={{ transformOrigin:"left center", display:"inline-block", marginBottom:"1.5rem" }}
        >
          <div style={{
            background:"rgba(252,211,77,0.8)",
            padding:"5px 22px",
            borderRadius:"2px",
            transform:"rotate(-1.5deg)",
            display:"inline-block",
            boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
            fontFamily:"'Courier New', monospace",
            fontWeight:700,
            fontSize:"clamp(0.6rem,2vw,0.8rem)",
            color:"#78350f",
            letterSpacing:"0.18em",
          }}>
            ABOUT ESPERLY
          </div>
        </motion.div>

        {/* ── NOTEBOOK PAGE CARD ── */}
        <motion.div
          className="hero-notebook-card"
          initial={{ opacity:0, y:60, rotate:-1 }}
          animate={{ opacity:1, y:0, rotate:0 }}
          transition={{ duration:0.8, delay:0.2, ease:[0.16,1,0.3,1] }}
        >
          {/* Ruled lines on card */}
          <NoteLines color="rgba(243,213,213,0.45)" gap={28} count={14} startY={44}/>

          {/* Red margin line */}
          <div style={{
            position:"absolute", left:52, top:0, bottom:0, width:1.5,
            background:"rgba(248,113,113,0.4)", pointerEvents:"none",
          }}/>

          {/* Tape holding the card */}
          <div style={{ position:"absolute", top:-10, left:"20%", transform:"rotate(-2deg)", zIndex:10 }}>
            <TapeStrip color="rgba(252,211,77,0.7)" width={72}/>
          </div>
          <div style={{ position:"absolute", top:-10, right:"20%", transform:"rotate(2deg)", zIndex:10 }}>
            <TapeStrip color="rgba(147,197,253,0.7)" width={60} rotate={2}/>
          </div>

          {/* Folded corner */}
          <div style={{
            position:"absolute", bottom:0, right:0, width:28, height:28,
            background:"linear-gradient(225deg, rgba(166,25,46,0.15) 50%, transparent 50%)",
            borderRadius:"0 0 4px 0",
          }}/>

          {/* Paperclip — top-left */}
          <div style={{ position:"absolute", top:-22, left:28, opacity:0.6 }}>
            <PaperClip/>
          </div>

          {/* Content */}
          <div style={{ position:"relative", zIndex:1, paddingLeft: "clamp(0.5rem, 3vw, 2rem)" }}>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity:0, x:-20 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay:0.5, duration:0.5 }}
              style={{
                fontFamily:"'Kalam', cursive",
                fontSize:"clamp(0.75rem, 2vw, 0.9rem)",
                color:"rgba(166,25,46,0.55)",
                letterSpacing:"0.1em",
                marginBottom:"0.5rem",
              }}
            >
              — Shaping futures since 2018
            </motion.p>

            {/* Main heading */}
            <motion.h1
              className="hero-title"
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.55, duration:0.6 }}
              style={{ color:"#1c1917", textShadow:"none", marginBottom:"0.5rem" }}
            >
              We Make
              <span className="hero-title-italic" style={{ color:"#A6192E" }}>
                Learning
              </span>
              <span style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
                <span style={{ fontStyle:"normal" }}>Feel</span>
                <span style={{
                  color:"#A6192E", fontStyle:"italic",
                  fontSize:"clamp(1.8rem, 6vw, 4.5rem)",
                }}>
                  <Typewriter texts={["Exciting","Personal","Powerful","Natural"]}/>
                </span>
              </span>
            </motion.h1>

            {/* SVG hand-drawn underline */}
            <motion.div
              initial={{ opacity:0, scaleX:0 }}
              animate={{ opacity:1, scaleX:1 }}
              transition={{ delay:0.9, duration:0.7 }}
              style={{ transformOrigin:"left", marginBottom:"1.25rem" }}
            >
              <svg width="100%" height="14" viewBox="0 0 500 14" preserveAspectRatio="none">
                <path className="ink-path-2"
                  d="M4 9 Q60 4, 130 9 Q200 14, 280 7 Q360 2, 450 9 Q480 11, 496 8"
                  stroke="#A6192E" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>
                <path className="ink-path"
                  d="M4 11 Q80 6, 160 11 Q240 14, 320 8 Q400 3, 480 10"
                  stroke="#f87171" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35"/>
              </svg>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="hero-subtitle"
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.8, duration:0.6 }}
              style={{ marginLeft:0, textAlign:"left", color:"#57534e" }}
            >
              Esperly empowers students with structured guidance, expert educators,
              and modern learning techniques designed for real-world success.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-cta-row"
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1, duration:0.5 }}
              style={{ justifyContent:"flex-start", marginTop:"1.5rem" }}
            >
              <motion.button
                className="hero-btn-primary"
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              >
                Explore Courses →
              </motion.button>
              <motion.button
                className="hero-btn-secondary"
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              >
                Meet Our Tutors
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:0.5 }}
              style={{
                display:"flex", gap:"1.25rem", marginTop:"1.25rem",
                flexWrap:"wrap", alignItems:"center",
              }}
            >
              {["✦ 10K+ Students","⭐ 4.8 Rated","🏆 Award Winning"].map((t,i)=>(
                <span key={i} style={{
                  fontFamily:"'Kalam', cursive",
                  fontSize:"clamp(10px,2vw,12px)",
                  color:"rgba(120,83,10,0.7)",
                  background:"rgba(252,211,77,0.35)",
                  padding:"3px 10px", borderRadius:2,
                  border:"1px solid rgba(252,211,77,0.5)",
                }}>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scrolling ticker below card ── */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
          style={{
            marginTop:"2rem", overflow:"hidden",
            borderTop:"1px solid rgba(255,255,255,0.12)",
            borderBottom:"1px solid rgba(255,255,255,0.12)",
            padding:"0.6rem 0",
          }}
        >
          <div className="ticker-track">
            {[...Array(2)].map((_, rep) => (
              <div key={rep} style={{ display:"flex", gap:"3rem", paddingRight:"3rem", alignItems:"center" }}>
                {["Mathematics","Physics","Chemistry","Biology","Computer Science","Economics","History","Literature"].map(s=>(
                  <span key={s} style={{
                    fontFamily:"'Kalam', cursive",
                    fontSize:"clamp(11px,2vw,13px)",
                    color:"rgba(254,249,240,0.55)",
                    whiteSpace:"nowrap",
                  }}>
                    ✦ {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom torn paper edge */}
      <svg style={{ position:"absolute", bottom:0, left:0, width:"100%", display:"block" }}
        viewBox="0 0 1440 48" preserveAspectRatio="none">
        <path
          d="M0 0 Q50 48 110 18 Q170 0 230 36 Q290 48 360 14 Q430 0 490 28 Q550 48 620 10 Q690 0 750 32 Q810 48 880 14 Q950 0 1010 28 Q1070 48 1140 12 Q1210 0 1270 24 Q1330 40 1390 10 Q1420 0 1440 16 L1440 48 L0 48 Z"
          fill="#fef9f0"
        />
      </svg>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const stickyColors = [
  { bg:"#fff9c4", border:"#f9d71c", shadow:"#e6c700" },
  { bg:"#ffd6d6", border:"#f87171", shadow:"#dc2626" },
  { bg:"#d4f4dd", border:"#4ade80", shadow:"#16a34a" },
  { bg:"#dde9ff", border:"#93c5fd", shadow:"#3b82f6" },
];

const stats = [
  { icon: FiUsers,    label:"10,000+",  sub:"Students" },
  { icon: FiBookOpen, label:"500+",     sub:"Courses" },
  { icon: FiAward,    label:"Top Rated",sub:"Tutors" },
  { icon: FiTarget,   label:"95%",      sub:"Success Rate" },
];

const missions = [
  { icon: FiTarget,   text:"Personalized Learning Plans" },
  { icon: FiBookOpen, text:"Structured Curriculum" },
  { icon: FiAward,    text:"Certified & Experienced Tutors" },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════ */
const AboutUs = () => {
  return (
    <>
      <style>{STYLES}</style>

      <div style={{ position:"relative", overflow:"hidden", fontFamily:"'Georgia', 'Palatino', serif" }}>

        {/* ═══ HERO ═══ */}
        <HeroSection/>

        {/* ═══ CONTENT — notebook pages ═══ */}
        <section className="content-section ruled-bg">
          <div className="content-inner">

            {/* Red margin line (desktop only) */}
            <div className="spine-deco" style={{
              position:"fixed", left:"5.5rem", top:0, height:"100%", width:1,
              background:"rgba(248,113,113,0.3)", zIndex:0, pointerEvents:"none",
            }}/>

            {/* ── Mission block ── */}
            <div className="mission-grid">

              {/* Left: lined paper card */}
              <motion.div
                initial={{ opacity:0, x:-40 }}
                whileInView={{ opacity:1, x:0 }}
                transition={{ duration:0.7 }}
                viewport={{ once:true }}
                style={{ position:"relative" }}
              >
                {/* Tape */}
                <div style={{ position:"absolute", top:-10, left:40, zIndex:10, transform:"rotate(-3deg)" }}>
                  <TapeStrip color="rgba(252,211,77,0.6)" width={80}/>
                </div>

                <div style={{
                  position:"relative", borderRadius:2,
                  padding:"clamp(1.5rem,4vw,2rem) clamp(1.25rem,3vw,2rem)",
                  paddingTop:"clamp(2rem,5vw,2.75rem)",
                  background:"#fef9f0",
                  border:"1px solid #e7ddd0",
                  boxShadow:"3px 4px 0 #e2d5c8, 6px 8px 20px rgba(0,0,0,0.07)",
                  backgroundImage:`repeating-linear-gradient(transparent, transparent 27px, rgba(243,213,213,0.5) 28px)`,
                }}>
                  <NoteLines color="rgba(243,213,213,0.5)" gap={28} count={12} startY={42}/>

                  {/* Margin line */}
                  <div style={{ position:"absolute", left:48, top:0, bottom:0, width:1,
                    background:"rgba(248,113,113,0.3)", pointerEvents:"none" }}/>

                  <h2 className="section-heading" style={{ paddingLeft:"clamp(1rem,3vw,2rem)", marginBottom:"1.25rem" }}>
                    Our Mission
                  </h2>
                  <p className="mission-text" style={{ paddingLeft:"clamp(1rem,3vw,2rem)" }}>
                    Our mission is to provide personalized and effective tuition
                    that builds confidence, strengthens fundamentals, and prepares
                    students for academic excellence — one lesson at a time.
                  </p>

                  {/* Handwritten aside */}
                  <div style={{
                    marginTop:"1.25rem", paddingLeft:"clamp(1rem,3vw,2rem)",
                    fontFamily:"'Kalam', cursive",
                    fontSize:"clamp(0.8rem,2vw,0.9rem)",
                    color:"rgba(166,25,46,0.55)",
                    fontStyle:"italic",
                    transform:"rotate(-0.5deg)",
                  }}>
                    ← We genuinely care about each student ✦
                  </div>
                </div>
              </motion.div>

              {/* Right: sticky note list */}
              <motion.div
                initial={{ opacity:0, x:40 }}
                whileInView={{ opacity:1, x:0 }}
                transition={{ duration:0.7 }}
                viewport={{ once:true }}
                style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}
              >
                {missions.map((item, i) => {
                  const Icon = item.icon;
                  const rotations = [-2, 1.5, -1];
                  const sc = stickyColors[i];
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale:1.03, rotate:0 }}
                      transition={{ type:"spring", stiffness:300 }}
                      style={{
                        position:"relative", display:"flex", alignItems:"center",
                        gap:"clamp(0.75rem,2vw,1.25rem)",
                        padding:"clamp(0.875rem,2vw,1.25rem) clamp(0.875rem,2vw,1.5rem)",
                        background: sc.bg,
                        border:`1px solid ${sc.border}`,
                        borderRadius:2,
                        transform:`rotate(${rotations[i]}deg)`,
                        boxShadow:`4px 5px 0 ${sc.shadow}44, 0 8px 24px rgba(0,0,0,0.08)`,
                      }}
                    >
                      <NoteLines color={`${sc.border}44`} gap={22} count={5} startY={28}/>
                      {/* Pin */}
                      <div style={{ position:"absolute", top:-14, left:24 }}>
                        <Pushpin color={sc.shadow} size={20}/>
                      </div>
                      <Icon size={20} style={{ color:"#7f1d1d", flexShrink:0, position:"relative", zIndex:1 }}/>
                      <span style={{
                        fontWeight:700, color:"#1c1917",
                        fontSize:"clamp(0.875rem,2vw,1rem)",
                        fontFamily:"'Georgia', serif",
                        position:"relative", zIndex:1,
                      }}>
                        {item.text}
                      </span>
                    </motion.div>
                  );
                })}

                {/* Paperclip + est. note */}
                <div style={{ position:"relative", marginTop:"0.5rem", alignSelf:"flex-end" }}>
                  <div style={{ position:"absolute", top:-28, right:16, opacity:0.65 }}>
                    <PaperClip/>
                  </div>
                  <div style={{
                    padding:"0.625rem 1.25rem", borderRadius:2,
                    background:"#fff9c4", border:"1px solid #f9d71c",
                    boxShadow:"3px 3px 0 rgba(230,199,0,0.5)",
                    fontFamily:"'Courier New', monospace",
                    fontSize:"clamp(11px,2vw,13px)",
                    color:"#78350f", transform:"rotate(1deg)",
                  }}>
                    ✦ Est. since 2018
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Stats: sticky notes on corkboard ── */}
            <motion.div
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.6 }}
              viewport={{ once:true }}
              style={{
                position:"relative", borderRadius:"1rem",
                padding:"clamp(1.75rem,4vw,2.5rem) clamp(1.25rem,3vw,2rem)",
                paddingTop:"clamp(2.25rem,5vw,3rem)",
                background:"#c8a97e",
                backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E")`,
                boxShadow:"inset 0 0 60px rgba(0,0,0,0.18), 0 10px 40px rgba(0,0,0,0.12)",
                border:"6px solid #a07850",
              }}
            >
              {/* Corkboard label */}
              <div style={{
                position:"absolute", top:-16, left:"50%", transform:"translateX(-50%)",
                padding:"4px clamp(0.75rem,3vw,1.5rem)",
                background:"#7f1d1d", color:"#fef9f0",
                borderRadius:2,
                fontFamily:"'Courier New', monospace",
                fontWeight:700,
                fontSize:"clamp(0.55rem,1.5vw,0.75rem)",
                letterSpacing:"0.15em",
                boxShadow:"0 2px 6px rgba(0,0,0,0.3)",
                whiteSpace:"nowrap",
              }}>
                OUR NUMBERS
              </div>

              <div className="stats-grid">
                {stats.map((item, index) => {
                  const Icon = item.icon;
                  const sc = stickyColors[index];
                  const rots = [-3, 2, -1.5, 3];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity:0, y:30, rotate:rots[index] }}
                      whileInView={{ opacity:1, y:0 }}
                      whileHover={{ scale:1.07, rotate:0, zIndex:10 }}
                      transition={{ duration:0.5, delay:index*0.1 }}
                      viewport={{ once:true }}
                      style={{
                        position:"relative",
                        padding:"clamp(1rem,3vw,1.5rem) clamp(0.75rem,2vw,1rem)",
                        textAlign:"center",
                        background: sc.bg,
                        border:`1px solid ${sc.border}`,
                        borderRadius:2,
                        transform:`rotate(${rots[index]}deg)`,
                        boxShadow:`4px 6px 0 ${sc.shadow}55, 0 10px 30px rgba(0,0,0,0.12)`,
                      }}
                    >
                      <NoteLines color={`${sc.border}44`} gap={22} count={6} startY={28}/>
                      <div style={{ position:"absolute", top:-16, left:"50%", transform:"translateX(-50%)" }}>
                        <Pushpin color={sc.shadow} size={20}/>
                      </div>
                      <div style={{ position:"relative", zIndex:1 }}>
                        <Icon size={22} style={{ margin:"0 auto 8px", color:"#7f1d1d", display:"block" }}/>
                        <p className="stat-value">{item.label}</p>
                        <p style={{
                          fontFamily:"'Courier New', monospace",
                          fontSize:"clamp(0.6rem,1.5vw,0.78rem)",
                          color:"#78716c", marginTop:4, letterSpacing:"0.05em",
                        }}>
                          {item.sub}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;