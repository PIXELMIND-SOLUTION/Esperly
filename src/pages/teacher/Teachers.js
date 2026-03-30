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
   PALETTE  — warm paper + red brand + sticky yellow
═══════════════════════════════════════════════════════════════════ */
const P = {
  paper:     "#fef9f0",
  cream:     "#f6f0e4",
  ruled:     "rgba(243,213,213,0.5)",
  margin:    "rgba(239,68,68,0.32)",
  cork:      "#c8a97e",
  corkBorder:"#a07850",
  red:       "#A6192E",
  redDark:   "#7d1222",
  redDeep:   "#5c0d18",
  yellow:    "#FFF9C4",
  yellowBrd: "#F9A825",
  yellowDrk: "#E65100",
  stickyDrk: "#5D4037",
};

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const teachersData = [
  { id:1, course:"Mathematics",       icon:"📐",
    hiddenDetails:{ name:"Dr. Arjun Mehta",      experience:"12+ years", qualification:"PhD in Mathematics",        achievements:"Published 20+ research papers",        students:"5,000+", rating:4.9 } },
  { id:2, course:"Physics",           icon:"⚛️",
    hiddenDetails:{ name:"Prof. Sarah Johnson",   experience:"10+ years", qualification:"PhD in Physics",             achievements:"NASA Research Associate",              students:"4,200+", rating:4.8 } },
  { id:3, course:"Chemistry",         icon:"🧪",
    hiddenDetails:{ name:"Dr. Michael Chen",      experience:"15+ years", qualification:"PhD in Organic Chemistry",   achievements:"3 Patent Holder",                     students:"3,800+", rating:4.9 } },
  { id:4, course:"Biology",           icon:"🧬",
    hiddenDetails:{ name:"Dr. Emily Rodriguez",   experience:"8+ years",  qualification:"PhD in Molecular Biology",   achievements:"Published in Nature",                 students:"3,200+", rating:4.7 } },
  { id:5, course:"Computer Science",  icon:"💻",
    hiddenDetails:{ name:"Prof. David Kumar",     experience:"11+ years", qualification:"MS in CS, Stanford",         achievements:"Ex-Google Engineer",                  students:"6,500+", rating:4.9 } },
  { id:6, course:"English Literature",icon:"📖",
    hiddenDetails:{ name:"Dr. Lisa Thompson",     experience:"14+ years", qualification:"PhD in English Literature",  achievements:"Award-winning Author",                students:"2,900+", rating:4.8 } },
  { id:7, course:"Economics",         icon:"📈",
    hiddenDetails:{ name:"Dr. Robert Williams",   experience:"16+ years", qualification:"PhD in Economics",           achievements:"Former World Bank Consultant",         students:"4,100+", rating:4.8 } },
  { id:8, course:"History",           icon:"🏛️",
    hiddenDetails:{ name:"Prof. James Anderson",  experience:"20+ years", qualification:"PhD in Ancient History",     achievements:"Best History Educator Award",          students:"2,500+", rating:4.7 } },
];

/* ═══════════════════════════════════════════════════════════════════
   STABLE TILTS
═══════════════════════════════════════════════════════════════════ */
const TILTS = [-2.4, 1.7, -1.1, 2.0, -0.7, 2.6, -1.9, 1.3];
const getTilt = (id) => TILTS[(id - 1) % TILTS.length];

/* ═══════════════════════════════════════════════════════════════════
   STICKY NOTE COLOR PALETTE  (8 variants, cycles)
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
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length:count }).map((_,i)=>(
      <div key={i} className="absolute left-0 right-0"
        style={{ top:`${startY + i*gap}px`, height:"1px", background:color||"rgba(249,168,37,0.35)" }}
      />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   TEACHER CARD  — sticky note with corkboard pin
═══════════════════════════════════════════════════════════════════ */
const TeacherCard = React.memo(({ teacher, index, isRevealed, onToggleReveal }) => {
  const tilt   = getTilt(teacher.id);
  const nc     = NOTE_PALETTE[(teacher.id - 1) % NOTE_PALETTE.length];
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity:0, y:55, rotate: tilt - 4 }}
      animate={{ opacity:1, y:0, rotate: hov ? 0 : tilt }}
      transition={{ delay:index*0.07, duration:0.55, ease:[0.16,1,0.3,1] }}
      onHoverStart={()=>setHov(true)}
      onHoverEnd={()=>setHov(false)}
      className="relative"
      style={{ zIndex: hov ? 30 : index+1 }}
    >
      {/* Pushpin */}
      <div className="absolute z-40 pointer-events-none select-none"
        style={{ top:"-22px", left:"50%", transform:"translateX(-50%)" }}>
        <Pushpin color={nc.fold} size={22}/>
      </div>

      {/* Paperclip — top-right corner */}
      <div className="absolute z-40 pointer-events-none select-none"
        style={{ top:"-18px", right:"6px" }}>
        <Paperclip height={44} rotate={index%2===0 ? -16 : 20}/>
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
          className="relative overflow-hidden"
          style={{
            background:    nc.bg,
            border:        `1.5px solid ${nc.border}`,
            borderRadius:  "2px 2px 4px 4px",
            minHeight:     "260px",
            boxShadow:     `3px 5px 0 ${nc.fold}55`,
          }}
        >
          {/* Folded corner — bottom right */}
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
            style={{ background:`linear-gradient(225deg, ${nc.fold}99 50%, transparent 50%)` }}
          />

          {/* Ruled lines */}
          <StickyLines startY={62} count={9} gap={22} color={`${nc.border}55`}/>

          {/* Header strip */}
          <div
            className="relative flex items-center justify-between px-3 pt-2.5 pb-2"
            style={{
              background:   `linear-gradient(135deg, ${nc.border}28, ${nc.border}10)`,
              borderBottom: `1.5px solid ${nc.border}44`,
            }}
          >
            {/* Red margin line inside header */}
            <div className="absolute left-9 top-0 bottom-0 w-px" style={{ background:`${P.red}30` }}/>

            <span className="text-[28px] sm:text-[30px] leading-none select-none drop-shadow-sm pl-5">
              {teacher.icon}
            </span>
            <div className="flex gap-1.5 items-center">
              {[0,1,2].map(i=>(
                <div key={i} className="w-1.5 h-1.5 rounded-full"
                  style={{ background:nc.fold, opacity:0.35 + i*0.2 }}/>
              ))}
            </div>
          </div>

          {/* Inner paper area with margin line */}
          <div className="relative px-3 pt-3 pb-1">
            <div className="absolute left-9 top-0 bottom-0 w-px" style={{ background:`${P.red}25` }}/>

            {/* Course title */}
            <h3 className="pl-5 text-[14px] sm:text-[15px] font-black leading-snug mb-1"
              style={{ color:nc.dark, fontFamily:"'Kalam', cursive" }}>
              {teacher.course}
            </h3>
            <div className="pl-5 w-8 h-[2px] mb-2 rounded-full" style={{ background:nc.fold }}/>

            {/* Stats */}
            <div className="pl-5 flex flex-wrap gap-2 text-[10px] sm:text-[11px] mb-1"
              style={{ color:nc.dark, opacity:0.65, fontFamily:"'Kalam', cursive" }}>
              <span className="flex items-center gap-1"><FiUsers size={9}/> {teacher.hiddenDetails.students}</span>
              <span className="flex items-center gap-1"><FiStar  size={9}/> {teacher.hiddenDetails.rating}★</span>
              <span className="flex items-center gap-1"><FiAward size={9}/> Certified</span>
            </div>
          </div>

          {/* Revealed details — expands */}
          <AnimatePresence initial={false}>
            {isRevealed && (
              <motion.div
                key="details"
                initial={{ opacity:0, height:0 }}
                animate={{ opacity:1, height:"auto" }}
                exit={{   opacity:0, height:0 }}
                transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
                className="overflow-hidden"
              >
                <div className="mx-3 mt-1 mb-1 p-2.5 rounded space-y-1.5"
                  style={{
                    background: `${nc.border}18`,
                    border:     `1px dashed ${nc.border}66`,
                  }}>
                  {[
                    ["🎓","Name",  teacher.hiddenDetails.name],
                    ["⏱️","Exp",   teacher.hiddenDetails.experience],
                    ["📜","Qual",  teacher.hiddenDetails.qualification],
                    ["🏆","Award", teacher.hiddenDetails.achievements],
                  ].map(([icon,label,val])=>(
                    <div key={label} className="flex items-start gap-1.5">
                      <span className="text-[11px] shrink-0 mt-0.5">{icon}</span>
                      <span className="text-[10px] font-bold shrink-0 w-8 mt-0.5 opacity-50"
                        style={{ color:nc.dark, fontFamily:"'Kalam', cursive" }}>{label}</span>
                      <span className="text-[11px] leading-relaxed font-bold break-words"
                        style={{ color:nc.dark, fontFamily:"'Kalam', cursive" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reveal / Hide button */}
          <div className="px-3 pb-3 pt-2">
            <motion.button
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.96 }}
              onClick={()=>onToggleReveal(teacher.id)}
              className="w-full py-2 text-[11px] sm:text-[12px] font-black flex items-center justify-center gap-1.5 transition-all duration-200"
              style={{
                fontFamily: "'Kalam', cursive",
                background: isRevealed
                  ? `linear-gradient(135deg, ${nc.border}, ${nc.fold})`
                  : `${nc.border}22`,
                color:      isRevealed ? "white" : nc.dark,
                border:     `1.5px solid ${isRevealed ? "transparent" : nc.border}`,
                borderRadius:"3px",
                boxShadow:  isRevealed ? `0 3px 8px ${nc.fold}55` : "none",
                letterSpacing:"0.02em",
              }}
            >
              {isRevealed
                ? <><FiLock   size={11}/> Hide Details</>
                : <><FiUnlock size={11}/> Reveal Details</>
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════════════════════════════
   STAT CARD  — smaller sticky notes on the corkboard footer strip
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
      className="relative"
      style={{ filter:`drop-shadow(2px 5px 10px ${nc.fold}44)` }}
    >
      {/* Pushpin */}
      <div className="absolute z-10 pointer-events-none"
        style={{ top:"-20px", left:"50%", transform:"translateX(-50%)" }}>
        <Pushpin color={nc.fold} size={20}/>
      </div>

      <div
        className="relative overflow-hidden pt-4 pb-3 px-2 sm:px-3 text-center"
        style={{
          background:   nc.bg,
          border:       `1.5px solid ${nc.border}`,
          borderRadius: "2px",
          minHeight:    "105px",
          boxShadow:    `3px 4px 0 ${nc.fold}55`,
        }}
      >
        <StickyLines startY={40} count={5} gap={21} color={`${nc.border}55`}/>

        {/* Folded corner */}
        <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
          style={{ background:`linear-gradient(225deg, ${nc.fold}88 50%, transparent 50%)` }}
        />

        <div className="relative z-10">
          <div className="text-2xl sm:text-3xl mb-1 select-none">{icon}</div>
          <div className="text-lg sm:text-2xl font-black leading-none"
            style={{ color:nc.dark, fontFamily:"'Kalam', cursive" }}>{value}</div>
          <div className="text-[11px] sm:text-xs font-bold mt-1"
            style={{ color:nc.dark, fontFamily:"'Kalam', cursive", opacity:0.85 }}>{label}</div>
          <div className="text-[10px] mt-0.5 opacity-50"
            style={{ color:nc.dark, fontFamily:"'Kalam', cursive" }}>{desc}</div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   NOTEBOOK COVER  — dark red, with spine, hole punches, coil
═══════════════════════════════════════════════════════════════════ */
const NotebookCover = () => (
  <div
    className="relative px-4 sm:px-10 lg:px-16 py-6 sm:py-9 overflow-hidden"
    style={{
      background:   `linear-gradient(135deg, ${P.red} 0%, ${P.redDark} 55%, ${P.redDeep} 100%)`,
      borderBottom: `3px solid ${P.redDeep}`,
    }}
  >
    {/* Spine strip */}
    <div className="absolute left-0 top-0 h-full w-10 hidden sm:block"
      style={{
        background:`linear-gradient(90deg, ${P.redDeep} 0%, rgba(92,13,24,0.6) 70%, transparent 100%)`,
        borderRight:`2px solid rgba(255,255,255,0.1)`,
      }}
    />

    {/* Hole punches on spine */}
    {[18,40,62,84].map(pct=>(
      <div key={pct} className="absolute hidden sm:block w-4 h-4 rounded-full"
        style={{
          top:`${pct}%`, left:"0.65rem",
          background:P.redDeep,
          border:"1.5px solid rgba(255,255,255,0.14)",
          boxShadow:"inset 0 1px 3px rgba(0,0,0,0.5)",
        }}
      />
    ))}

    {/* Coil spring decoration */}
    <svg className="absolute left-9 top-0 h-full hidden sm:block" width="14"
      viewBox="0 0 14 600" preserveAspectRatio="none" style={{ opacity:0.28 }}>
      {Array.from({length:24}).map((_,i)=>(
        <ellipse key={i} cx="7" cy={13+i*25} rx="5.5" ry="8"
          stroke="#e5e7eb" strokeWidth="1.2" fill="none"/>
      ))}
    </svg>

    {/* Faint ruled lines on cover */}
    {Array.from({length:6}).map((_,i)=>(
      <div key={i} className="absolute left-0 right-0 pointer-events-none"
        style={{ top:`${12+i*18}px`, height:"1px", background:"rgba(255,255,255,0.05)" }}/>
    ))}

    {/* Content */}
    <div className="relative sm:pl-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        {/* Label tape */}
        <div className="inline-block mb-3">
          <div style={{
            background:"rgba(252,211,77,0.72)",
            padding:"4px 18px",
            borderRadius:"2px",
            transform:"rotate(-1deg)",
            display:"inline-block",
            boxShadow:"0 2px 6px rgba(0,0,0,0.2)",
            fontFamily:"'Courier New', monospace",
            fontWeight:700,
            fontSize:"0.65rem",
            color:"#78350f",
            letterSpacing:"0.18em",
          }}>
            FACULTY DIRECTORY
          </div>
        </div>

        <h1
          className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight"
          style={{ fontFamily:"'Playfair Display', Georgia, serif", textShadow:"0 2px 10px rgba(0,0,0,0.4)" }}
        >
          Meet Our Expert Faculty
        </h1>
        <p className="mt-1 text-white/60 text-sm italic" style={{ fontFamily:"'Kalam', cursive" }}>
          Click any card to reveal teacher details
        </p>
      </div>

      {/* Lock badge */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded self-start sm:self-center shrink-0"
        style={{
          background:"rgba(255,255,255,0.12)",
          border:"1px solid rgba(255,255,255,0.2)",
          backdropFilter:"blur(4px)",
        }}
      >
        <FiLock size={12} className="text-yellow-300 shrink-0"/>
        <span className="text-white/85 text-[11px] font-bold whitespace-nowrap"
          style={{ fontFamily:"'Kalam', cursive" }}>
          Click cards to reveal
        </span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   RULED PAPER AREA wrapper
═══════════════════════════════════════════════════════════════════ */
const PaperArea = ({ children }) => (
  <div
    className="relative"
    style={{
      background: P.paper,
      backgroundImage: `
        repeating-linear-gradient(transparent, transparent 27px, ${P.ruled} 28px),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")
      `,
    }}
  >
    {/* Red margin line */}
    <div className="absolute left-14 top-0 bottom-0 w-px hidden sm:block"
      style={{ background:P.margin }}/>

    {/* Hole punches */}
    {[8,24,42,60,78].map(pct=>(
      <div key={pct} className="absolute w-4 h-4 rounded-full hidden sm:block"
        style={{
          top:`${pct}%`, left:"1.8rem",
          background:"#e7ddd0",
          border:"1.5px solid #d6c9bb",
          boxShadow:"inset 0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    ))}

    <div className="relative z-10 px-3 sm:px-8 lg:px-14 py-10 sm:py-14">
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   NOTEBOOK wrapper (cover + pages)
═══════════════════════════════════════════════════════════════════ */
const Notebook = ({ children }) => (
  <div
    className="relative w-full rounded-xl overflow-hidden"
    style={{
      boxShadow:"0 2px 0 #b8a888, 0 6px 0 #c8b898, 0 20px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.8)",
      border:"1px solid #d0c4b0",
    }}
  >
    <NotebookCover/>
    <PaperArea>{children}</PaperArea>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   BACKGROUND  — ambient paper texture + floating doodles
═══════════════════════════════════════════════════════════════════ */
const Background = () => (
  <>
    {/* Cork texture behind notebook */}
    <div
      className="fixed inset-0 z-0"
      style={{
        background:"linear-gradient(145deg, #e8dcc8 0%, #dfd0b8 60%, #d4c4a8 100%)",
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.5'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`,
      }}
    />
    {/* Floating star doodles */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {["✦","✧","★","✩","✦","✧","✩"].map((s,i)=>(
        <motion.div key={i} className="absolute text-red-900/[0.055]"
          style={{ fontSize:`${14+(i%4)*12}px`, left:`${7+i*13}%`, top:`${10+(i%5)*17}%` }}
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
    <div className="flex justify-center items-center gap-1.5 sm:gap-2 mb-10 flex-wrap">
      <motion.button
        whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
        onClick={()=>onChange(Math.max(0,current-1))}
        disabled={current===0}
        className="p-2 sm:p-2.5 border-2 transition-all"
        style={{
          borderColor:current===0 ? "#d4ccc0" : P.red,
          color:       current===0 ? "#c0b8b0" : P.red,
          background:  "rgba(255,255,255,0.55)",
          borderRadius:"3px",
          cursor:      current===0 ? "not-allowed" : "pointer",
        }}
      ><FiChevronLeft size={17}/></motion.button>

      {Array.from({ length:total }).map((_,i)=>(
        <motion.button key={i}
          whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
          onClick={()=>onChange(i)}
          className="w-8 h-8 sm:w-9 sm:h-9 font-black text-sm transition-all"
          style={{
            fontFamily:"'Kalam', cursive",
            background: current===i ? P.red  : "rgba(166,25,46,0.09)",
            color:      current===i ? "white": P.red,
            border:     `2px solid ${current===i ? P.red : "rgba(166,25,46,0.28)"}`,
            borderRadius:"3px",
            transform:  current===i ? "rotate(0deg)" : `rotate(${i%2===0?-1.5:1.5}deg)`,
          }}
        >{i+1}</motion.button>
      ))}

      <motion.button
        whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
        onClick={()=>onChange(Math.min(total-1,current+1))}
        disabled={current===total-1}
        className="p-2 sm:p-2.5 border-2 transition-all"
        style={{
          borderColor:current===total-1 ? "#d4ccc0" : P.red,
          color:       current===total-1 ? "#c0b8b0" : P.red,
          background:  "rgba(255,255,255,0.55)",
          borderRadius:"3px",
          cursor:      current===total-1 ? "not-allowed" : "pointer",
        }}
      ><FiChevronRight size={17}/></motion.button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════ */
const Teachers = () => {
  const [openModal,      setOpenModal]      = useState(false);
  const [revealedDetails,setRevealedDetails] = useState({});
  const [currentPage,    setCurrentPage]    = useState(0);

  const PER_PAGE    = 8;
  const totalPages  = Math.ceil(teachersData.length / PER_PAGE);
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
      <style>{FONT_IMPORT}</style>

      <Navbar onOpenModal={()=>setOpenModal(true)}/>

      <div className="min-h-screen relative">
        <Background/>

        <div className="relative z-10 px-2 sm:px-5 lg:px-10 xl:px-16 py-6 sm:py-10 max-w-[1440px] mx-auto">
          <Notebook>

            {/* ── Teacher card corkboard ── */}
            <div
              className="relative rounded-2xl p-5 sm:p-8 mb-12"
              style={{
                background:P.cork,
                backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
                border:`7px solid ${P.corkBorder}`,
                boxShadow:"inset 0 0 60px rgba(0,0,0,0.18), 0 10px 40px rgba(0,0,0,0.14)",
              }}
            >
              {/* Corkboard label */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 text-[10px] sm:text-xs font-bold tracking-widest whitespace-nowrap"
                style={{
                  background:P.red,
                  color:"#fef9f0",
                  borderRadius:"2px",
                  fontFamily:"'Courier New', monospace",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                📌 FACULTY PINBOARD
              </div>

              {/* Tape strips on top-left and top-right of board */}
              <div className="absolute top-4 left-4 flex gap-2 opacity-70">
                <Tape rotate="-2deg" width={55}/>
                <Tape rotate="2deg"  color="rgba(248,113,113,0.5)" width={40}/>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-9 lg:gap-11 pt-6">
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
            <div className="flex items-center gap-3 mb-12">
              <div className="flex-1 h-px" style={{ background:`repeating-linear-gradient(90deg, ${P.red}28 0, ${P.red}28 7px, transparent 7px, transparent 14px)` }}/>
              <span className="text-red-800/30 text-base select-none">✦</span>
              <div className="flex-1 h-px" style={{ background:`repeating-linear-gradient(90deg, ${P.red}28 0, ${P.red}28 7px, transparent 7px, transparent 14px)` }}/>
            </div>

            {/* ── Stats — mini corkboard ── */}
            <div
              className="relative rounded-xl p-5 sm:p-8 mb-10"
              style={{
                background:P.cork,
                backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
                border:`6px solid ${P.corkBorder}`,
                boxShadow:"inset 0 0 40px rgba(0,0,0,0.14)",
              }}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap"
                style={{ background:P.red, color:"#fef9f0", borderRadius:"2px", fontFamily:"'Courier New', monospace", boxShadow:"0 2px 6px rgba(0,0,0,0.28)" }}>
                📊 OUR NUMBERS
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 pt-5">
                {[
                  { icon:"👨‍🏫", label:"Expert Teachers", value:"50+",  desc:"Certified Pros",   delay:0.25, idx:0 },
                  { icon:"🎓",  label:"Years Combined",  value:"150+", desc:"Rich Experience",  delay:0.35, idx:1 },
                  { icon:"📚",  label:"Subjects",        value:"25+",  desc:"Comprehensive",    delay:0.45, idx:2 },
                  { icon:"⭐",  label:"Avg Rating",      value:"4.8",  desc:"Satisfaction",     delay:0.55, idx:3 },
                ].map(s=><StatCard key={s.label} {...s}/>)}
              </div>
            </div>

            {/* ── Footer note ── */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
              className="flex flex-wrap items-center justify-center gap-2 text-center pb-2"
            >
              <FiEyeOff size={12} className="text-red-800/40 shrink-0"/>
              <p className="text-[11px] sm:text-xs text-red-900/45"
                style={{ fontFamily:"'Kalam', cursive" }}>
                Teacher details are protected — click{" "}
                <span className="font-bold text-red-800/60">"Reveal Details"</span>{" "}
                on any card to view full information
              </p>
              <FiLock size={12} className="text-red-800/40 shrink-0"/>
            </motion.div>

            <div className="mt-3 text-center pb-2">
              <span className="text-[11px] text-red-900/25"
                style={{ fontFamily:"'Kalam', cursive" }}>
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