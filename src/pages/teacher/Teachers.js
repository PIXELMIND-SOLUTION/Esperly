import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers, FiAward, FiStar,
  FiChevronRight, FiChevronLeft,
  FiEyeOff, FiLock, FiUnlock,
} from "react-icons/fi";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";

/* ═══════════════════════════════════════════════════════════════════
   FONTS
═══════════════════════════════════════════════════════════════════ */
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Playfair+Display:wght@700;900&display=swap');`;

/* ═══════════════════════════════════════════════════════════════════
   RESPONSIVE STYLES
═══════════════════════════════════════════════════════════════════ */
const RESPONSIVE_STYLES = `
  * { box-sizing: border-box; }

  /* Prevent horizontal overflow */
  body { overflow-x: hidden; }

  /* Card grid breakpoints */
  .teacher-grid {
    display: grid;
    gap: 2rem;
    padding-top: 1.5rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 480px) {
    .teacher-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  }
  @media (min-width: 768px) {
    .teacher-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
  }
  @media (min-width: 1024px) {
    .teacher-grid { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
  }
  @media (min-width: 1280px) {
    .teacher-grid { grid-template-columns: repeat(4, 1fr); gap: 2.75rem; }
  }

  /* Stats grid */
  .stats-grid {
    display: grid;
    gap: 1.5rem;
    padding-top: 1.25rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  }

  /* Notebook outer padding */
  .notebook-outer {
    padding: 0.5rem;
  }
  @media (min-width: 640px) {
    .notebook-outer { padding: 1.25rem; }
  }
  @media (min-width: 1024px) {
    .notebook-outer { padding: 2rem 2.5rem; }
  }
  @media (min-width: 1280px) {
    .notebook-outer { padding: 2.5rem 4rem; }
  }

  /* Paper area inner padding */
  .paper-inner {
    padding: 1.5rem 0.75rem;
  }
  @media (min-width: 480px) {
    .paper-inner { padding: 2rem 1.25rem; }
  }
  @media (min-width: 640px) {
    .paper-inner { padding: 2.5rem 2rem; }
  }
  @media (min-width: 1024px) {
    .paper-inner { padding: 3rem 3.5rem; }
  }

  /* Cover padding */
  .cover-inner {
    padding: 1.25rem 0.75rem;
  }
  @media (min-width: 480px) {
    .cover-inner { padding: 1.5rem 1.25rem; }
  }
  @media (min-width: 640px) {
    .cover-inner { padding: 2rem 2.5rem; }
  }
  @media (min-width: 1024px) {
    .cover-inner { padding: 2.25rem 4rem; }
  }

  /* Corkboard padding */
  .corkboard-inner {
    padding: 1.5rem 0.75rem;
  }
  @media (min-width: 480px) {
    .corkboard-inner { padding: 1.75rem 1.25rem; }
  }
  @media (min-width: 640px) {
    .corkboard-inner { padding: 2rem 2rem; }
  }
  @media (min-width: 1024px) {
    .corkboard-inner { padding: 2.5rem; }
  }

  /* Cover heading */
  .cover-heading {
    font-size: clamp(1.1rem, 5vw, 2.5rem);
    line-height: 1.2;
  }

  /* Pagination wrap */
  .pagination-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 2.5rem;
  }
  @media (min-width: 480px) {
    .pagination-wrap { gap: 0.5rem; }
  }

  /* Stat card min height */
  .stat-card-body {
    min-height: 90px;
  }
  @media (min-width: 480px) {
    .stat-card-body { min-height: 105px; }
  }

  /* Teacher card min height */
  .teacher-card-body {
    min-height: 230px;
  }
  @media (min-width: 480px) {
    .teacher-card-body { min-height: 260px; }
  }

  /* Pushpin positioning on mobile */
  .pushpin-wrap {
    position: absolute;
    z-index: 40;
    pointer-events: none;
    user-select: none;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (min-width: 480px) {
    .pushpin-wrap { top: -22px; }
  }

  /* Paperclip on mobile */
  .paperclip-wrap {
    position: absolute;
    z-index: 40;
    pointer-events: none;
    user-select: none;
    top: -14px;
    right: 4px;
  }
  @media (min-width: 480px) {
    .paperclip-wrap { top: -18px; right: 6px; }
  }

  /* Spine elements — hide on very small screens */
  .spine-elements {
    display: none;
  }
  @media (min-width: 640px) {
    .spine-elements { display: block; }
  }

  /* Cover label tape */
  .label-tape {
    font-size: clamp(0.5rem, 1.5vw, 0.65rem);
    padding: 3px 10px;
    letter-spacing: 0.12em;
  }
  @media (min-width: 640px) {
    .label-tape { padding: 4px 18px; letter-spacing: 0.18em; }
  }

  /* Cover flex layout */
  .cover-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  @media (min-width: 640px) {
    .cover-content {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  /* Footer text */
  .footer-note {
    font-size: clamp(0.6rem, 2vw, 0.75rem);
  }

  /* Reveal details row items */
  .detail-icon { font-size: 10px; }
  .detail-label { font-size: 9px; width: 1.75rem; }
  .detail-val { font-size: 10px; }
  @media (min-width: 480px) {
    .detail-icon { font-size: 11px; }
    .detail-label { font-size: 10px; width: 2rem; }
    .detail-val { font-size: 11px; }
  }

  /* Reveal button */
  .reveal-btn {
    padding: 0.4rem 0;
    font-size: 10px;
  }
  @media (min-width: 480px) {
    .reveal-btn { padding: 0.5rem 0; font-size: 11px; }
  }
  @media (min-width: 640px) {
    .reveal-btn { font-size: 12px; }
  }

  /* Course title */
  .course-title {
    font-size: clamp(12px, 2.5vw, 15px);
  }

  /* Stat value */
  .stat-value {
    font-size: clamp(1rem, 3vw, 1.5rem);
    line-height: 1;
  }

  /* Stat icon */
  .stat-icon {
    font-size: clamp(1.25rem, 4vw, 1.875rem);
    margin-bottom: 0.25rem;
  }

  /* Corkboard label badge */
  .corkboard-label {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 12px;
    font-size: clamp(0.55rem, 1.8vw, 0.75rem);
    white-space: nowrap;
    font-weight: 700;
    letter-spacing: 0.15em;
  }
  @media (min-width: 480px) {
    .corkboard-label { top: -16px; padding: 4px 16px; }
  }
  @media (min-width: 640px) {
    .corkboard-label { top: -18px; padding: 4px 20px; }
  }

  /* Page container */
  .page-container {
    position: relative;
    z-index: 10;
    max-width: 1440px;
    margin: 0 auto;
    padding: 1rem 0.375rem;
  }
  @media (min-width: 480px) {
    .page-container { padding: 1.5rem 0.75rem; }
  }
  @media (min-width: 640px) {
    .page-container { padding: 2.5rem 1.25rem; }
  }
  @media (min-width: 1024px) {
    .page-container { padding: 2.5rem 2.5rem; }
  }
  @media (min-width: 1280px) {
    .page-container { padding: 2.5rem 4rem; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   PALETTE
═══════════════════════════════════════════════════════════════════ */
const P = {
  paper:      "#fef9f0",
  cream:      "#f6f0e4",
  ruled:      "rgba(243,213,213,0.5)",
  margin:     "rgba(239,68,68,0.32)",
  cork:       "#c8a97e",
  corkBorder: "#a07850",
  red:        "#A6192E",
  redDark:    "#7d1222",
  redDeep:    "#5c0d18",
  yellow:     "#FFF9C4",
  yellowBrd:  "#F9A825",
  yellowDrk:  "#E65100",
  stickyDrk:  "#5D4037",
};

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const teachersData = [
  { id:1, course:"Mathematics",        icon:"📐",
    hiddenDetails:{ name:"Dr. Arjun Mehta",     experience:"12+ years", qualification:"PhD in Mathematics",       achievements:"Published 20+ research papers", students:"5,000+", rating:4.9 } },
  { id:2, course:"Physics",            icon:"⚛️",
    hiddenDetails:{ name:"Prof. Sarah Johnson",  experience:"10+ years", qualification:"PhD in Physics",            achievements:"NASA Research Associate",       students:"4,200+", rating:4.8 } },
  { id:3, course:"Chemistry",          icon:"🧪",
    hiddenDetails:{ name:"Dr. Michael Chen",     experience:"15+ years", qualification:"PhD in Organic Chemistry",  achievements:"3 Patent Holder",               students:"3,800+", rating:4.9 } },
  { id:4, course:"Biology",            icon:"🧬",
    hiddenDetails:{ name:"Dr. Emily Rodriguez",  experience:"8+ years",  qualification:"PhD in Molecular Biology",  achievements:"Published in Nature",           students:"3,200+", rating:4.7 } },
  { id:5, course:"Computer Science",   icon:"💻",
    hiddenDetails:{ name:"Prof. David Kumar",    experience:"11+ years", qualification:"MS in CS, Stanford",        achievements:"Ex-Google Engineer",            students:"6,500+", rating:4.9 } },
  { id:6, course:"English Literature", icon:"📖",
    hiddenDetails:{ name:"Dr. Lisa Thompson",    experience:"14+ years", qualification:"PhD in English Literature", achievements:"Award-winning Author",          students:"2,900+", rating:4.8 } },
  { id:7, course:"Economics",          icon:"📈",
    hiddenDetails:{ name:"Dr. Robert Williams",  experience:"16+ years", qualification:"PhD in Economics",          achievements:"Former World Bank Consultant",  students:"4,100+", rating:4.8 } },
  { id:8, course:"History",            icon:"🏛️",
    hiddenDetails:{ name:"Prof. James Anderson", experience:"20+ years", qualification:"PhD in Ancient History",    achievements:"Best History Educator Award",   students:"2,500+", rating:4.7 } },
];

/* ═══════════════════════════════════════════════════════════════════
   STABLE TILTS
═══════════════════════════════════════════════════════════════════ */
const TILTS = [-2.4, 1.7, -1.1, 2.0, -0.7, 2.6, -1.9, 1.3];
const getTilt = (id) => TILTS[(id - 1) % TILTS.length];

/* ═══════════════════════════════════════════════════════════════════
   STICKY NOTE COLOR PALETTE
═══════════════════════════════════════════════════════════════════ */
const NOTE_PALETTE = [
  { bg:"#fff9c4", border:"#f9d71c", fold:"#e6c700", dark:"#78350f" },
  { bg:"#ffd6d6", border:"#f87171", fold:"#dc2626", dark:"#7f1d1d" },
  { bg:"#d4f4dd", border:"#4ade80", fold:"#16a34a", dark:"#14532d" },
  { bg:"#dde9ff", border:"#93c5fd", fold:"#3b82f6", dark:"#1e3a5f" },
  { bg:"#ffe4cc", border:"#fb923c", fold:"#ea580c", dark:"#7c2d12" },
  { bg:"#f0d9ff", border:"#c084fc", fold:"#9333ea", dark:"#581c87" },
  { bg:"#d1faf5", border:"#2dd4bf", fold:"#0d9488", dark:"#134e4a" },
  { bg:"#fce7f3", border:"#f472b6", fold:"#db2777", dark:"#831843" },
];

/* ═══════════════════════════════════════════════════════════════════
   SVG — Paperclip
═══════════════════════════════════════════════════════════════════ */
const Paperclip = ({ height = 46, rotate = -18 }) => (
  <svg
    width={height * 0.52} height={height}
    viewBox="0 0 22 42" fill="none"
    style={{ transform:`rotate(${rotate}deg)`, filter:"drop-shadow(1px 2px 3px rgba(0,0,0,0.28))", display:"block" }}
  >
    <path
      d="M11 4 C6 4 3 8 3 13 L3 31 C3 37 7 40 11 40 C15 40 19 37 19 31 L19 15 C19 10 16.5 7.5 13 7.5 C9.5 7.5 7.5 10 7.5 15 L7.5 29 C7.5 32 9 34 11 34 C13 34 14.5 32 14.5 29 L14.5 16"
      stroke="#8d8d8d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M10 4.5 C7 5.5 4 9 4 13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   SVG — Pushpin
═══════════════════════════════════════════════════════════════════ */
const Pushpin = ({ color = P.red, size = 22 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 24 36" fill="none">
    <circle cx="12" cy="10" r="9" fill={color}/>
    <circle cx="12" cy="10" r="5"  fill="white" fillOpacity="0.35"/>
    <rect x="10.5" y="18" width="3" height="18" rx="1.5" fill="#78716c"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   Tape Strip
═══════════════════════════════════════════════════════════════════ */
const Tape = ({ rotate="-2deg", color="rgba(252,211,77,0.65)", width=72 }) => (
  <div style={{
    width:`${width}px`, height:"18px",
    background:color, borderRadius:"1px",
    transform:`rotate(${rotate})`,
    boxShadow:"0 1px 4px rgba(0,0,0,0.14)",
    flexShrink:0,
  }}/>
);

/* ═══════════════════════════════════════════════════════════════════
   Ruled lines inside a sticky note
═══════════════════════════════════════════════════════════════════ */
const StickyLines = ({ startY=58, count=8, gap=22, color }) => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
    {Array.from({ length:count }).map((_,i)=>(
      <div key={i} style={{
        position:"absolute", left:0, right:0,
        top:`${startY + i*gap}px`, height:"1px",
        background:color||"rgba(249,168,37,0.35)"
      }}/>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   TEACHER CARD
═══════════════════════════════════════════════════════════════════ */
const TeacherCard = React.memo(({ teacher, index, isRevealed, onToggleReveal }) => {
  const tilt = getTilt(teacher.id);
  const nc   = NOTE_PALETTE[(teacher.id - 1) % NOTE_PALETTE.length];
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity:0, y:55, rotate: tilt - 4 }}
      animate={{ opacity:1, y:0, rotate: hov ? 0 : tilt }}
      transition={{ delay:index*0.07, duration:0.55, ease:[0.16,1,0.3,1] }}
      onHoverStart={()=>setHov(true)}
      onHoverEnd={()=>setHov(false)}
      style={{ position:"relative", zIndex: hov ? 30 : index+1 }}
    >
      {/* Pushpin */}
      <div className="pushpin-wrap">
        <Pushpin color={nc.fold} size={20}/>
      </div>

      {/* Paperclip */}
      <div className="paperclip-wrap">
        <Paperclip height={40} rotate={index%2===0 ? -16 : 20}/>
      </div>

      <motion.div
        animate={{
          scale:  hov ? 1.04 : 1,
          y:      hov ? -10  : 0,
          filter: hov
            ? `drop-shadow(5px 14px 22px ${nc.fold}88)`
            : `drop-shadow(2px 5px 10px ${nc.fold}44)`,
        }}
        transition={{ duration:0.22, ease:"easeOut" }}
      >
        {/* Sticky body */}
        <div
          className="teacher-card-body"
          style={{
            position:"relative", overflow:"hidden",
            background:    nc.bg,
            border:        `1.5px solid ${nc.border}`,
            borderRadius:  "2px 2px 4px 4px",
            boxShadow:     `3px 5px 0 ${nc.fold}55`,
          }}
        >
          {/* Folded corner */}
          <div style={{
            position:"absolute", bottom:0, right:0, width:"1.75rem", height:"1.75rem", pointerEvents:"none",
            background:`linear-gradient(225deg, ${nc.fold}99 50%, transparent 50%)`
          }}/>

          {/* Ruled lines */}
          <StickyLines startY={56} count={9} gap={21} color={`${nc.border}55`}/>

          {/* Header strip */}
          <div style={{
            position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"0.5rem 0.75rem",
            background:`linear-gradient(135deg, ${nc.border}28, ${nc.border}10)`,
            borderBottom:`1.5px solid ${nc.border}44`,
          }}>
            <div style={{ position:"absolute", left:"2.25rem", top:0, bottom:0, width:"1px", background:`${P.red}30` }}/>
            <span style={{ fontSize:"clamp(22px,5vw,30px)", lineHeight:1, userSelect:"none", paddingLeft:"1.25rem" }}>
              {teacher.icon}
            </span>
            <div style={{ display:"flex", gap:"0.375rem", alignItems:"center" }}>
              {[0,1,2].map(i=>(
                <div key={i} style={{
                  width:"0.375rem", height:"0.375rem", borderRadius:"50%",
                  background:nc.fold, opacity:0.35 + i*0.2
                }}/>
              ))}
            </div>
          </div>

          {/* Inner paper area */}
          <div style={{ position:"relative", padding:"0.625rem 0.75rem 0.25rem" }}>
            <div style={{ position:"absolute", left:"2.25rem", top:0, bottom:0, width:"1px", background:`${P.red}25` }}/>

            {/* Course title */}
            <h3 className="course-title" style={{
              paddingLeft:"1.25rem", fontWeight:900, lineHeight:1.3, marginBottom:"0.25rem",
              color:nc.dark, fontFamily:"'Kalam', cursive",
            }}>
              {teacher.course}
            </h3>
            <div style={{ marginLeft:"1.25rem", width:"2rem", height:"2px", marginBottom:"0.5rem", borderRadius:"9999px", background:nc.fold }}/>

            {/* Stats row */}
            <div style={{
              paddingLeft:"1.25rem", display:"flex", flexWrap:"wrap", gap:"0.375rem",
              fontSize:"clamp(9px,2vw,11px)", color:nc.dark, opacity:0.65, fontFamily:"'Kalam', cursive",
              marginBottom:"0.25rem",
            }}>
              <span style={{ display:"flex", alignItems:"center", gap:"0.25rem" }}>
                <FiUsers size={8}/> {teacher.hiddenDetails.students}
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:"0.25rem" }}>
                <FiStar size={8}/> {teacher.hiddenDetails.rating}★
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:"0.25rem" }}>
                <FiAward size={8}/> Certified
              </span>
            </div>
          </div>

          {/* Revealed details */}
          <AnimatePresence initial={false}>
            {isRevealed && (
              <motion.div
                key="details"
                initial={{ opacity:0, height:0 }}
                animate={{ opacity:1, height:"auto" }}
                exit={{   opacity:0, height:0 }}
                transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
                style={{ overflow:"hidden" }}
              >
                <div style={{
                  margin:"0.25rem 0.75rem 0.25rem",
                  padding:"0.625rem",
                  borderRadius:"0.25rem",
                  background:`${nc.border}18`,
                  border:`1px dashed ${nc.border}66`,
                  display:"flex", flexDirection:"column", gap:"0.375rem",
                }}>
                  {[
                    ["🎓","Name",  teacher.hiddenDetails.name],
                    ["⏱️","Exp",   teacher.hiddenDetails.experience],
                    ["📜","Qual",  teacher.hiddenDetails.qualification],
                    ["🏆","Award", teacher.hiddenDetails.achievements],
                  ].map(([icon,label,val])=>(
                    <div key={label} style={{ display:"flex", alignItems:"flex-start", gap:"0.375rem" }}>
                      <span className="detail-icon" style={{ flexShrink:0, marginTop:"0.125rem" }}>{icon}</span>
                      <span className="detail-label" style={{
                        fontWeight:700, flexShrink:0, marginTop:"0.125rem", opacity:0.5,
                        color:nc.dark, fontFamily:"'Kalam', cursive",
                      }}>{label}</span>
                      <span className="detail-val" style={{
                        fontWeight:700, lineHeight:1.5, wordBreak:"break-words",
                        color:nc.dark, fontFamily:"'Kalam', cursive",
                      }}>{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reveal / Hide button */}
          <div style={{ padding:"0.5rem 0.75rem 0.75rem" }}>
            <motion.button
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.96 }}
              onClick={()=>onToggleReveal(teacher.id)}
              className="reveal-btn"
              style={{
                width:"100%", fontWeight:900,
                display:"flex", alignItems:"center", justifyContent:"center", gap:"0.375rem",
                fontFamily:"'Kalam', cursive",
                background: isRevealed
                  ? `linear-gradient(135deg, ${nc.border}, ${nc.fold})`
                  : `${nc.border}22`,
                color:      isRevealed ? "white" : nc.dark,
                border:     `1.5px solid ${isRevealed ? "transparent" : nc.border}`,
                borderRadius:"3px",
                boxShadow:  isRevealed ? `0 3px 8px ${nc.fold}55` : "none",
                letterSpacing:"0.02em",
                cursor:"pointer", transition:"all 0.2s",
              }}
            >
              {isRevealed
                ? <><FiLock   size={10}/> Hide Details</>
                : <><FiUnlock size={10}/> Reveal Details</>
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════════════ */
const StatCard = ({ icon, label, value, desc, delay, idx }) => {
  const tilt = TILTS[(idx * 2) % TILTS.length];
  const nc   = NOTE_PALETTE[(idx + 2) % NOTE_PALETTE.length];

  return (
    <motion.div
      initial={{ opacity:0, y:28, rotate:tilt }}
      animate={{ opacity:1, y:0,  rotate:tilt }}
      whileHover={{ rotate:0, y:-8, scale:1.08 }}
      transition={{ delay, duration:0.4, ease:[0.16,1,0.3,1] }}
      style={{ position:"relative", filter:`drop-shadow(2px 5px 10px ${nc.fold}44)` }}
    >
      {/* Pushpin */}
      <div style={{ position:"absolute", zIndex:10, pointerEvents:"none", top:"-18px", left:"50%", transform:"translateX(-50%)" }}>
        <Pushpin color={nc.fold} size={18}/>
      </div>

      <div
        className="stat-card-body"
        style={{
          position:"relative", overflow:"hidden", paddingTop:"1rem", paddingBottom:"0.75rem",
          paddingLeft:"0.625rem", paddingRight:"0.625rem", textAlign:"center",
          background:   nc.bg,
          border:       `1.5px solid ${nc.border}`,
          borderRadius: "2px",
          boxShadow:    `3px 4px 0 ${nc.fold}55`,
        }}
      >
        <StickyLines startY={38} count={5} gap={20} color={`${nc.border}55`}/>

        {/* Folded corner */}
        <div style={{
          position:"absolute", bottom:0, right:0, width:"1.5rem", height:"1.5rem", pointerEvents:"none",
          background:`linear-gradient(225deg, ${nc.fold}88 50%, transparent 50%)`
        }}/>

        <div style={{ position:"relative", zIndex:10 }}>
          <div className="stat-icon" style={{ userSelect:"none" }}>{icon}</div>
          <div className="stat-value" style={{ fontWeight:900, color:nc.dark, fontFamily:"'Kalam', cursive" }}>{value}</div>
          <div style={{
            fontSize:"clamp(9px,2.5vw,12px)", fontWeight:700, marginTop:"0.25rem",
            color:nc.dark, fontFamily:"'Kalam', cursive", opacity:0.85,
          }}>{label}</div>
          <div style={{
            fontSize:"clamp(8px,2vw,10px)", marginTop:"0.125rem", opacity:0.5,
            color:nc.dark, fontFamily:"'Kalam', cursive",
          }}>{desc}</div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   NOTEBOOK COVER
═══════════════════════════════════════════════════════════════════ */
const NotebookCover = () => (
  <div
    style={{
      position:"relative", overflow:"hidden",
      background:`linear-gradient(135deg, ${P.red} 0%, ${P.redDark} 55%, ${P.redDeep} 100%)`,
      borderBottom:`3px solid ${P.redDeep}`,
    }}
  >
    {/* Spine strip */}
    <div className="spine-elements" style={{
      position:"absolute", left:0, top:0, height:"100%", width:"2.5rem",
      background:`linear-gradient(90deg, ${P.redDeep} 0%, rgba(92,13,24,0.6) 70%, transparent 100%)`,
      borderRight:`2px solid rgba(255,255,255,0.1)`,
    }}/>

    {/* Hole punches on spine */}
    {[18,40,62,84].map(pct=>(
      <div key={pct} className="spine-elements" style={{
        position:"absolute", top:`${pct}%`, left:"0.65rem",
        width:"1rem", height:"1rem", borderRadius:"50%",
        background:P.redDeep,
        border:"1.5px solid rgba(255,255,255,0.14)",
        boxShadow:"inset 0 1px 3px rgba(0,0,0,0.5)",
      }}/>
    ))}

    {/* Coil spring */}
    <svg className="spine-elements" style={{ position:"absolute", left:"2.25rem", top:0, height:"100%", opacity:0.28 }}
      width="14" viewBox="0 0 14 600" preserveAspectRatio="none">
      {Array.from({length:24}).map((_,i)=>(
        <ellipse key={i} cx="7" cy={13+i*25} rx="5.5" ry="8"
          stroke="#e5e7eb" strokeWidth="1.2" fill="none"/>
      ))}
    </svg>

    {/* Faint ruled lines on cover */}
    {Array.from({length:6}).map((_,i)=>(
      <div key={i} style={{
        position:"absolute", left:0, right:0, top:`${12+i*18}px`,
        height:"1px", background:"rgba(255,255,255,0.05)", pointerEvents:"none",
      }}/>
    ))}

    {/* Content */}
    <div className="cover-inner">
      <div className="cover-content" style={{ position:"relative" }}>
        <div>
          {/* Label tape */}
          <div style={{ display:"inline-block", marginBottom:"0.75rem" }}>
            <div className="label-tape" style={{
              background:"rgba(252,211,77,0.72)",
              borderRadius:"2px", transform:"rotate(-1deg)", display:"inline-block",
              boxShadow:"0 2px 6px rgba(0,0,0,0.2)",
              fontFamily:"'Courier New', monospace",
              fontWeight:700, color:"#78350f",
            }}>
              FACULTY DIRECTORY
            </div>
          </div>

          <h1 className="cover-heading" style={{
            fontWeight:900, color:"white", lineHeight:1.15,
            fontFamily:"'Playfair Display', Georgia, serif",
            textShadow:"0 2px 10px rgba(0,0,0,0.4)",
          }}>
            Meet Our Expert Faculty
          </h1>
          <p style={{
            marginTop:"0.25rem", color:"rgba(255,255,255,0.6)", fontSize:"clamp(0.7rem,2vw,0.875rem)",
            fontStyle:"italic", fontFamily:"'Kalam', cursive",
          }}>
            Click any card to reveal teacher details
          </p>
        </div>

        {/* Lock badge */}
        <div style={{
          display:"flex", alignItems:"center", gap:"0.5rem",
          padding:"0.5rem 0.75rem", borderRadius:"0.375rem",
          background:"rgba(255,255,255,0.12)",
          border:"1px solid rgba(255,255,255,0.2)",
          backdropFilter:"blur(4px)",
          alignSelf:"flex-start", flexShrink:0,
        }}>
          <FiLock size={11} style={{ color:"#fde68a", flexShrink:0 }}/>
          <span style={{
            color:"rgba(255,255,255,0.85)", fontSize:"clamp(0.6rem,2vw,0.6875rem)",
            fontWeight:700, whiteSpace:"nowrap", fontFamily:"'Kalam', cursive",
          }}>
            Click cards to reveal
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   RULED PAPER AREA
═══════════════════════════════════════════════════════════════════ */
const PaperArea = ({ children }) => (
  <div style={{
    position:"relative",
    background: P.paper,
    backgroundImage: `
      repeating-linear-gradient(transparent, transparent 27px, ${P.ruled} 28px),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")
    `,
  }}>
    {/* Red margin line */}
    <div className="spine-elements" style={{
      position:"absolute", left:"3.5rem", top:0, bottom:0, width:"1px", background:P.margin,
    }}/>

    {/* Hole punches */}
    {[8,24,42,60,78].map(pct=>(
      <div key={pct} className="spine-elements" style={{
        position:"absolute", top:`${pct}%`, left:"1.8rem",
        width:"1rem", height:"1rem", borderRadius:"50%",
        background:"#e7ddd0", border:"1.5px solid #d6c9bb",
        boxShadow:"inset 0 1px 3px rgba(0,0,0,0.2)",
      }}/>
    ))}

    <div className="paper-inner" style={{ position:"relative", zIndex:10 }}>
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   NOTEBOOK wrapper
═══════════════════════════════════════════════════════════════════ */
const Notebook = ({ children }) => (
  <div style={{
    position:"relative", width:"100%", borderRadius:"0.75rem", overflow:"hidden",
    boxShadow:"0 2px 0 #b8a888, 0 6px 0 #c8b898, 0 20px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.8)",
    border:"1px solid #d0c4b0",
  }}>
    <NotebookCover/>
    <PaperArea>{children}</PaperArea>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   BACKGROUND
═══════════════════════════════════════════════════════════════════ */
const Background = () => (
  <>
    <div style={{
      position:"fixed", inset:0, zIndex:0,
      background:"linear-gradient(145deg, #e8dcc8 0%, #dfd0b8 60%, #d4c4a8 100%)",
      backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.5'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`,
    }}/>
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden", userSelect:"none" }}>
      {["✦","✧","★","✩","✦","✧","✩"].map((s,i)=>(
        <motion.div key={i} style={{
          position:"absolute", color:"rgba(127,29,29,0.055)",
          fontSize:`${14+(i%4)*12}px`, left:`${7+i*13}%`, top:`${10+(i%5)*17}%`,
        }}
          animate={{ rotate: i%2===0 ? 360 : -360 }}
          transition={{ duration:14+i*3, repeat:Infinity, ease:"linear" }}
        >{s}</motion.div>
      ))}
    </div>
  </>
);

/* ═══════════════════════════════════════════════════════════════════
   PAGINATION
═══════════════════════════════════════════════════════════════════ */
const Pagination = ({ current, total, onChange }) => {
  if (total <= 1) return null;
  return (
    <div className="pagination-wrap">
      <motion.button
        whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
        onClick={()=>onChange(Math.max(0,current-1))}
        disabled={current===0}
        style={{
          padding:"0.5rem 0.625rem",
          border:`2px solid ${current===0 ? "#d4ccc0" : P.red}`,
          color:    current===0 ? "#c0b8b0" : P.red,
          background:"rgba(255,255,255,0.55)",
          borderRadius:"3px",
          cursor:   current===0 ? "not-allowed" : "pointer",
          display:"flex", alignItems:"center",
        }}
      ><FiChevronLeft size={16}/></motion.button>

      {Array.from({ length:total }).map((_,i)=>(
        <motion.button key={i}
          whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
          onClick={()=>onChange(i)}
          style={{
            width:"2rem", height:"2rem",
            fontFamily:"'Kalam', cursive", fontWeight:900, fontSize:"0.875rem",
            background: current===i ? P.red  : "rgba(166,25,46,0.09)",
            color:      current===i ? "white": P.red,
            border:     `2px solid ${current===i ? P.red : "rgba(166,25,46,0.28)"}`,
            borderRadius:"3px",
            transform:  current===i ? "rotate(0deg)" : `rotate(${i%2===0?-1.5:1.5}deg)`,
            cursor:"pointer",
          }}
        >{i+1}</motion.button>
      ))}

      <motion.button
        whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
        onClick={()=>onChange(Math.min(total-1,current+1))}
        disabled={current===total-1}
        style={{
          padding:"0.5rem 0.625rem",
          border:`2px solid ${current===total-1 ? "#d4ccc0" : P.red}`,
          color:    current===total-1 ? "#c0b8b0" : P.red,
          background:"rgba(255,255,255,0.55)",
          borderRadius:"3px",
          cursor:   current===total-1 ? "not-allowed" : "pointer",
          display:"flex", alignItems:"center",
        }}
      ><FiChevronRight size={16}/></motion.button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════ */
const Teachers = () => {
  const [openModal,       setOpenModal]       = useState(false);
  const [revealedDetails, setRevealedDetails] = useState({});
  const [currentPage,     setCurrentPage]     = useState(0);

  const PER_PAGE     = 8;
  const totalPages   = Math.ceil(teachersData.length / PER_PAGE);
  const pageTeachers = teachersData.slice(currentPage*PER_PAGE, (currentPage+1)*PER_PAGE);

  const handleToggleReveal = useCallback(
    (id)=>setRevealedDetails(prev=>({ ...prev, [id]:!prev[id] })),
    []
  );

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  return (
    <>
      <style>{FONT_IMPORT + RESPONSIVE_STYLES}</style>

      <Navbar onOpenModal={()=>setOpenModal(true)}/>

      <div style={{ minHeight:"100vh", position:"relative" }}>
        <Background/>

        <div className="page-container">
          <Notebook>

            {/* ── Teacher card corkboard ── */}
            <div
              className="corkboard-inner"
              style={{
                position:"relative", borderRadius:"1rem",
                marginBottom:"3rem",
                background:P.cork,
                backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
                border:`7px solid ${P.corkBorder}`,
                boxShadow:"inset 0 0 60px rgba(0,0,0,0.18), 0 10px 40px rgba(0,0,0,0.14)",
              }}
            >
              {/* Corkboard label */}
              <div className="corkboard-label" style={{
                background:P.red, color:"#fef9f0", borderRadius:"2px",
                fontFamily:"'Courier New', monospace",
                boxShadow:"0 2px 8px rgba(0,0,0,0.3)",
              }}>
                📌 FACULTY PINBOARD
              </div>

              {/* Tape strips */}
              <div style={{ position:"absolute", top:"1rem", left:"1rem", display:"flex", gap:"0.5rem", opacity:0.7 }}>
                <Tape rotate="-2deg" width={48}/>
                <Tape rotate="2deg" color="rgba(248,113,113,0.5)" width={36}/>
              </div>

              <div className="teacher-grid">
                {pageTeachers.map((teacher, idx)=>(
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    index={idx}
                    isRevealed={!!revealedDetails[teacher.id]}
                    onToggleReveal={handleToggleReveal}
                  />
                ))}
              </div>
            </div>

            {/* ── Pagination ── */}
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={handlePageChange}
            />

            {/* ── Dashed divider ── */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"3rem" }}>
              <div style={{ flex:1, height:"1px", background:`repeating-linear-gradient(90deg, ${P.red}28 0, ${P.red}28 7px, transparent 7px, transparent 14px)` }}/>
              <span style={{ color:"rgba(153,27,27,0.3)", fontSize:"1rem", userSelect:"none" }}>✦</span>
              <div style={{ flex:1, height:"1px", background:`repeating-linear-gradient(90deg, ${P.red}28 0, ${P.red}28 7px, transparent 7px, transparent 14px)` }}/>
            </div>

            {/* ── Stats corkboard ── */}
            <div
              className="corkboard-inner"
              style={{
                position:"relative", borderRadius:"0.75rem", marginBottom:"2.5rem",
                background:P.cork,
                backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
                border:`6px solid ${P.corkBorder}`,
                boxShadow:"inset 0 0 40px rgba(0,0,0,0.14)",
              }}
            >
              <div className="corkboard-label" style={{
                background:P.red, color:"#fef9f0", borderRadius:"2px",
                fontFamily:"'Courier New', monospace",
                boxShadow:"0 2px 6px rgba(0,0,0,0.28)",
              }}>
                📊 OUR NUMBERS
              </div>

              <div className="stats-grid">
                {[
                  { icon:"👨‍🏫", label:"Expert Teachers", value:"50+",  desc:"Certified Pros",  delay:0.25, idx:0 },
                  { icon:"🎓",   label:"Years Combined",  value:"150+", desc:"Rich Experience", delay:0.35, idx:1 },
                  { icon:"📚",   label:"Subjects",        value:"25+",  desc:"Comprehensive",   delay:0.45, idx:2 },
                  { icon:"⭐",   label:"Avg Rating",      value:"4.8",  desc:"Satisfaction",    delay:0.55, idx:3 },
                ].map(s=><StatCard key={s.label} {...s}/>)}
              </div>
            </div>

            {/* ── Footer note ── */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
              style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:"0.5rem", textAlign:"center", paddingBottom:"0.5rem" }}
            >
              <FiEyeOff size={11} style={{ color:"rgba(153,27,27,0.4)", flexShrink:0 }}/>
              <p className="footer-note" style={{ color:"rgba(127,29,29,0.45)", fontFamily:"'Kalam', cursive" }}>
                Teacher details are protected — click{" "}
                <span style={{ fontWeight:700, color:"rgba(127,29,29,0.6)" }}>"Reveal Details"</span>{" "}
                on any card to view full information
              </p>
              <FiLock size={11} style={{ color:"rgba(153,27,27,0.4)", flexShrink:0 }}/>
            </motion.div>

            <div style={{ marginTop:"0.75rem", textAlign:"center", paddingBottom:"0.5rem" }}>
              <span style={{ fontSize:"clamp(0.55rem,1.5vw,0.6875rem)", color:"rgba(127,29,29,0.25)", fontFamily:"'Kalam', cursive" }}>
                ✧ Esperly Faculty Directory · Confidential · 2024 ✧
              </span>
            </div>

          </Notebook>
        </div>
      </div>

      <Footer/>
      <LoginModal isOpen={openModal} onClose={()=>setOpenModal(false)}/>
    </>
  );
};

export default Teachers;