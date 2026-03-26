import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

/* ─── GOOGLE FONTS ─────────────────────────────────────────────── */
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #F8F4EC; }
  `}</style>
);

/* ─── DATA ─────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "school",
    title: "School Tuitions",
    icon: "📚",
    tagline: "Build your academic foundation",
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
    accent: "#2E7D52",
    badge: "Popular",
    count: "240+ tutors",
    subcategories: [
      { title: "Mathematics",   icon: "➗", courses: 84, img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=75" },
      { title: "Physics",       icon: "⚛️", courses: 62, img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=75" },
      { title: "Chemistry",     icon: "🧪", courses: 58, img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=75" },
      { title: "Biology",       icon: "🧬", courses: 47, img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=75" },
      { title: "History",       icon: "🏛️", courses: 33, img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&q=75" },
      { title: "Geography",     icon: "🌍", courses: 29, img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=400&q=75" },
      { title: "English Lit",   icon: "📖", courses: 41, img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=75" },
      { title: "Economics",     icon: "📈", courses: 38, img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=75" },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "💻",
    tagline: "Write code that changes the world",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    accent: "#3B6FA0",
    badge: "Trending",
    count: "380+ courses",
    subcategories: [
      { title: "Python",         icon: "🐍", courses: 96,  img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=75" },
      { title: "JavaScript",     icon: "⚡", courses: 112, img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=75" },
      { title: "Java",           icon: "☕", courses: 74,  img: "https://images.unsplash.com/photo-1588239034647-25783cbfcfc1?w=400&q=75" },
      { title: "C / C++",        icon: "⚙️", courses: 55,  img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=75" },
      { title: "React / Next",   icon: "⚛️", courses: 88,  img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=75" },
      { title: "Flutter",        icon: "📱", courses: 43,  img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=75" },
      { title: "Rust",           icon: "🦀", courses: 28,  img: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&q=75" },
      { title: "DevOps",         icon: "🔧", courses: 51,  img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=75" },
    ],
  },
  {
    id: "design",
    title: "Design",
    icon: "🎨",
    tagline: "Craft beauty with intention",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    accent: "#A6192E",
    badge: "Hot",
    count: "160+ courses",
    subcategories: [
      { title: "UI / UX",         icon: "🖱️", courses: 67, img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=75" },
      { title: "Figma",           icon: "🔷", courses: 52, img: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&q=75" },
      { title: "Graphic Design",  icon: "✏️", courses: 74, img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=75" },
      { title: "Motion Design",   icon: "🎬", courses: 39, img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=75" },
      { title: "3D & Blender",    icon: "🧊", courses: 34, img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&q=75" },
      { title: "Illustration",    icon: "🖌️", courses: 48, img: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=400&q=75" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "🗣️",
    tagline: "Speak to the entire world",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    accent: "#C97B1A",
    badge: "New",
    count: "120+ tutors",
    subcategories: [
      { title: "English",    icon: "🇬🇧", courses: 98, img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=75" },
      { title: "Spanish",    icon: "🇪🇸", courses: 64, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75" },
      { title: "French",     icon: "🇫🇷", courses: 57, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=75" },
      { title: "German",     icon: "🇩🇪", courses: 44, img: "https://images.unsplash.com/photo-1566404791232-af9fe269f649?w=400&q=75" },
      { title: "Japanese",   icon: "🇯🇵", courses: 52, img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=75" },
      { title: "Mandarin",   icon: "🇨🇳", courses: 48, img: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=75" },
      { title: "Arabic",     icon: "🌙", courses: 36,  img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=75" },
      { title: "Hindi",      icon: "🇮🇳", courses: 42, img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=75" },
    ],
  },
  {
    id: "business",
    title: "Business",
    icon: "📊",
    tagline: "Build, scale and lead",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    accent: "#3B6FA0",
    badge: null,
    count: "210+ courses",
    subcategories: [
      { title: "Marketing",         icon: "📣", courses: 72, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=75" },
      { title: "Finance",           icon: "💰", courses: 68, img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=75" },
      { title: "Entrepreneurship",  icon: "🚀", courses: 55, img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=75" },
      { title: "Management",        icon: "👔", courses: 49, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=75" },
      { title: "Sales",             icon: "🤝", courses: 38, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=75" },
      { title: "HR & People",       icon: "👥", courses: 31, img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=75" },
    ],
  },
  {
    id: "examprep",
    title: "Exam Prep",
    icon: "✍️",
    tagline: "Crack every exam with confidence",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    accent: "#A6192E",
    badge: "🔥 Hot",
    count: "190+ courses",
    subcategories: [
      { title: "JEE Mains",   icon: "🏆", courses: 64, img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=75" },
      { title: "JEE Adv.",    icon: "🥇", courses: 48, img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=75" },
      { title: "NEET",        icon: "🩺", courses: 72, img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&q=75" },
      { title: "UPSC",        icon: "🏛️", courses: 56, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=75" },
      { title: "Banking",     icon: "🏦", courses: 43, img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&q=75" },
      { title: "CAT / MBA",   icon: "📋", courses: 38, img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&q=75" },
      { title: "GRE / GMAT",  icon: "🌐", courses: 29, img: "https://images.unsplash.com/photo-1560785496-3c9d5717e0f2?w=400&q=75" },
      { title: "SAT / ACT",   icon: "📝", courses: 25, img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=75" },
    ],
  },
  {
    id: "datascience",
    title: "Data Science",
    icon: "🤖",
    tagline: "Turn data into decisions",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    accent: "#2E7D52",
    badge: "Trending",
    count: "290+ courses",
    subcategories: [
      { title: "Machine Learning",  icon: "🧠", courses: 88, img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=75" },
      { title: "Deep Learning",     icon: "🔬", courses: 64, img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=75" },
      { title: "NLP",               icon: "💬", courses: 47, img: "https://images.unsplash.com/photo-1655720035861-ba4fd21a598d?w=400&q=75" },
      { title: "Data Analytics",    icon: "📊", courses: 72, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=75" },
      { title: "SQL & Databases",   icon: "🗃️", courses: 58, img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=75" },
      { title: "Power BI",          icon: "📉", courses: 43, img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=75" },
      { title: "Computer Vision",   icon: "👁️", courses: 38, img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=75" },
      { title: "GenAI / LLMs",      icon: "✨", courses: 55, img: "https://images.unsplash.com/photo-1684487747385-1f26213c5db1?w=400&q=75" },
    ],
  },
  {
    id: "creativearts",
    title: "Creative Arts",
    icon: "🎭",
    tagline: "Express, create and inspire",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    accent: "#C97B1A",
    badge: null,
    count: "140+ tutors",
    subcategories: [
      { title: "Music Theory",   icon: "🎵", courses: 48, img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=75" },
      { title: "Guitar",         icon: "🎸", courses: 54, img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=75" },
      { title: "Piano",          icon: "🎹", courses: 46, img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=75" },
      { title: "Dance",          icon: "💃", courses: 39, img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=75" },
      { title: "Drama / Acting", icon: "🎭", courses: 28, img: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=75" },
      { title: "Painting",       icon: "🖼️", courses: 44, img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=75" },
    ],
  },
  {
    id: "softskills",
    title: "Soft Skills",
    icon: "💬",
    tagline: "Lead, communicate and grow",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    accent: "#3B6FA0",
    badge: "New",
    count: "95+ courses",
    subcategories: [
      { title: "Public Speaking",   icon: "🎙️", courses: 42, img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=75" },
      { title: "Leadership",        icon: "🌟", courses: 37, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=75" },
      { title: "Communication",     icon: "🤝", courses: 49, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=75" },
      { title: "Interview Prep",    icon: "💼", courses: 55, img: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&q=75" },
      { title: "Time Management",   icon: "⏱️", courses: 28, img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=75" },
      { title: "Critical Thinking", icon: "🧩", courses: 32, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=75" },
    ],
  },
];

/* ─── RULED LINES ──────────────────────────────────────────────── */
const RuledLines = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden>
    {Array.from({ length: 30 }, (_, i) => (
      <div key={i} style={{
        position: "absolute", left: 0, right: 0,
        top: i * 32, height: 1,
        background: "#D4CCBA", opacity: 0.3,
      }} />
    ))}
    <div style={{
      position: "absolute", top: 0, bottom: 0,
      left: "clamp(32px,5vw,64px)", width: 1.5,
      background: "#A6192E", opacity: 0.18,
    }} />
  </div>
);

/* ─── CATEGORY CARD ────────────────────────────────────────────── */
const CategoryCard = React.memo(({ cat, index, onClick, isActive }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(cat)}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{ cursor: "pointer" }}
      role="button"
      aria-label={`Open ${cat.title} subcategories`}
      aria-expanded={isActive}
    >
      <div style={{
        position: "relative",
        borderRadius: 6,
        overflow: "hidden",
        height: "clamp(190px, 20vw, 265px)",
        border: isActive
          ? `2.5px solid ${cat.accent}`
          : `1.5px solid rgba(212,204,186,${hov ? 0.9 : 0.5})`,
        boxShadow: isActive
          ? `0 0 0 4px ${cat.accent}22, 0 12px 32px rgba(0,0,0,0.18)`
          : hov
            ? `0 14px 36px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.1)`
            : `0 3px 14px rgba(0,0,0,0.07)`,
        transition: "box-shadow 0.32s ease, border 0.22s ease",
      }}>
        {/* Background image */}
        <motion.img
          src={cat.img} alt={cat.title} loading="lazy"
          animate={{ scale: hov || isActive ? 1.09 : 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Dark gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(
            170deg,
            rgba(8,4,2,0.05) 0%,
            rgba(8,4,2,0.3) 45%,
            rgba(8,4,2,0.82) 100%
          )`,
        }} />

        {/* Accent tint on hover / active */}
        <motion.div
          animate={{ opacity: isActive ? 0.22 : hov ? 0.15 : 0 }}
          style={{
            position: "absolute", inset: 0,
            background: cat.accent,
            pointerEvents: "none",
            transition: "opacity 0.3s",
          }}
        />

        {/* Top: badge + active check */}
        <div style={{
          position: "absolute", top: 11, left: 11, right: 11,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          {cat.badge ? (
            <span style={{
              fontFamily: "'DM Mono', 'Courier New', monospace",
              fontSize: 9, fontWeight: 500,
              color: "#fff",
              background: cat.accent,
              borderRadius: 2,
              padding: "3px 8px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: `0 2px 6px ${cat.accent}66`,
            }}>{cat.badge}</span>
          ) : <div />}

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: cat.accent,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: "#fff",
                  boxShadow: `0 2px 8px ${cat.accent}88`,
                }}>✓</motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom text block */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "clamp(10px,1.4vw,16px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
            <span style={{ fontSize: "clamp(16px,1.8vw,22px)", lineHeight: 1 }}>{cat.icon}</span>
            <h3 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(13px,1.4vw,18px)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.12, letterSpacing: "-0.01em",
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}>{cat.title}</h3>
          </div>

          <p style={{
            fontFamily: "Lora, Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(9px,0.85vw,11px)",
            color: "rgba(255,255,255,0.68)",
            marginBottom: 9, lineHeight: 1.3,
          }}>{cat.tagline}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontFamily: "'DM Mono', 'Courier New', monospace",
              fontSize: "clamp(8px,0.75vw,9.5px)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.05em",
            }}>{cat.count}</span>

            <motion.div
              animate={{
                background: isActive || hov ? cat.accent : "rgba(255,255,255,0.14)",
                x: hov && !isActive ? 2 : 0,
              }}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.28)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, color: "#fff",
                backdropFilter: "blur(4px)",
                transition: "background 0.25s",
              }}
            >{isActive ? "↑" : "→"}</motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ─── SUBCATEGORY CARD ─────────────────────────────────────────── */
const SubCard = React.memo(({ sub, accent, delay }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.38, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{ cursor: "pointer" }}
    >
      <div style={{
        borderRadius: 5,
        overflow: "hidden",
        border: hov ? `1.5px solid ${accent}` : "1.5px solid rgba(212,204,186,0.65)",
        boxShadow: hov
          ? `0 10px 26px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)`
          : `0 2px 8px rgba(0,0,0,0.05)`,
        transition: "box-shadow 0.28s, border 0.2s",
        background: "#EEE6D2",
      }}>
        {/* Image */}
        <div style={{ position: "relative", height: 100, overflow: "hidden" }}>
          <motion.img
            src={sub.img} alt={sub.title} loading="lazy"
            animate={{ scale: hov ? 1.08 : 1 }}
            transition={{ duration: 0.42 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.4) 100%)",
          }} />
          <div style={{
            position: "absolute", top: 7, right: 8,
            fontSize: 17, lineHeight: 1,
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))",
          }}>{sub.icon}</div>
        </div>

        {/* Text */}
        <div style={{ padding: "9px 11px 11px" }}>
          <h4 style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(11px,1vw,13px)",
            fontWeight: 700, color: "#1A1008",
            marginBottom: 4, lineHeight: 1.25,
          }}>{sub.title}</h4>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9, color: "#7A6E5A",
              letterSpacing: "0.04em",
            }}>{sub.courses} courses</span>
            <motion.span
              animate={{ color: hov ? accent : "#7A6E5A", x: hov ? 2 : 0 }}
              style={{ fontSize: 11, fontFamily: "monospace", display: "block" }}
            >→</motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ─── SUBCATEGORY PANEL ────────────────────────────────────────── */
const SubcategoryPanel = ({ cat, onClose }) => (
  <motion.div
    key={cat.id}
    initial={{ opacity: 0, height: 0, marginTop: 0 }}
    animate={{ opacity: 1, height: "auto", marginTop: 20 }}
    exit={{ opacity: 0, height: 0, marginTop: 0 }}
    transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
    style={{ overflow: "hidden", marginBottom: 20 }}
  >
    <div style={{
      background: "linear-gradient(135deg, #EEE6D2 0%, #E6DCC4 100%)",
      border: `1.5px solid ${cat.accent}44`,
      borderRadius: 8,
      padding: "clamp(18px,2.5vw,32px)",
      position: "relative",
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.55), 0 8px 28px rgba(0,0,0,0.06)`,
    }}>
      {/* Subtle ruled lines */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 8, pointerEvents: "none" }} aria-hidden>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", left: 0, right: 0,
            top: i * 34, height: 1,
            background: "#D4CCBA", opacity: 0.28,
          }} />
        ))}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          left: 28, width: 1.2,
          background: cat.accent, opacity: 0.16,
        }} />
      </div>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "clamp(14px,2vw,24px)",
        position: "relative", zIndex: 1,
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Accent circle icon */}
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: cat.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 21,
            boxShadow: `0 4px 14px ${cat.accent}55`,
            flexShrink: 0,
          }}>{cat.icon}</div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h3 style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "clamp(15px,1.7vw,21px)",
                fontWeight: 900, color: "#1A1008",
                letterSpacing: "-0.01em",
              }}>{cat.title}</h3>
              <span style={{
                background: `${cat.accent}18`,
                border: `1px solid ${cat.accent}44`,
                color: cat.accent,
                fontFamily: "'DM Mono', monospace",
                fontSize: 9, fontWeight: 500,
                padding: "2px 8px", borderRadius: 3,
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>{cat.subcategories.length} topics</span>
            </div>
            <p style={{
              fontFamily: "Lora, Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(10px,0.95vw,13px)",
              color: "#7A6E5A",
              marginTop: 3,
            }}>{cat.tagline}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.93 }}
          onClick={onClose}
          aria-label="Close subcategories"
          style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(166,25,46,0.07)",
            border: "1.5px solid rgba(166,25,46,0.22)",
            color: "#A6192E", fontSize: 15,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "monospace",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >✕</motion.button>
      </div>

      {/* Accent divider */}
      <div style={{
        height: 1.5,
        background: `linear-gradient(90deg, ${cat.accent}55, ${cat.accent}22, transparent)`,
        marginBottom: "clamp(14px,2vw,24px)",
        position: "relative", zIndex: 1,
      }} />

      {/* Sub-cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(120px, 12vw, 158px), 1fr))",
        gap: "clamp(10px,1.4vw,16px)",
        position: "relative", zIndex: 1,
      }}>
        {cat.subcategories.map((sub, i) => (
          <SubCard key={sub.title} sub={sub} accent={cat.accent} delay={i * 0.035} />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── SCRIBBLE SVG ─────────────────────────────────────────────── */
const Scribble = () => (
  <svg viewBox="0 0 200 10" preserveAspectRatio="none"
    style={{ width: "100%", height: 10, display: "block", marginTop: 3 }}
    aria-hidden
  >
    <path d="M2 7C30 3 60 9 100 5.5C140 2 170 8 198 5"
      stroke="#A6192E" strokeWidth="2.8" fill="none" strokeLinecap="round" />
  </svg>
);

/* ─── ROOT ─────────────────────────────────────────────────────── */
const GRID_COLS = 5; // logical max columns; CSS handles fewer

export default function Category() {
  const [activeId, setActiveId] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

  const activeCat = CATEGORIES.find(c => c.id === activeId);

  const handleCardClick = (cat) => {
    const isOpening = activeId !== cat.id;
    setActiveId(isOpening ? cat.id : null);
    if (isOpening) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  // Chunk categories into rows for inline panel insertion
  const rows = [];
  for (let i = 0; i < CATEGORIES.length; i += GRID_COLS) {
    rows.push(CATEGORIES.slice(i, i + GRID_COLS));
  }
  const activeRowIndex = activeId
    ? Math.floor(CATEGORIES.findIndex(c => c.id === activeId) / GRID_COLS)
    : -1;

  return (
    <>
      <FontImport />
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          background: "#F8F4EC",
          padding: "clamp(48px,7vw,88px) clamp(20px,5vw,60px)",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        <RuledLines />

        {/* Ambient dot grids */}
        <svg style={{ position: "absolute", left: "2.5%", bottom: "8%", opacity: 0.05 }} width="90" height="90" aria-hidden>
          {Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 16 + 8} cy={r * 16 + 8} r="1.4" fill="#A6192E" />
          )))}
        </svg>
        <svg style={{ position: "absolute", right: "2.5%", top: "5%", opacity: 0.04 }} width="72" height="72" aria-hidden>
          {Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 16 + 8} cy={r * 16 + 8} r="1.4" fill="#3B6FA0" />
          )))}
        </svg>

        <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "clamp(26px,4vw,48px)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 20, height: 2, background: "#A6192E" }} />
              <span style={{
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: "clamp(9px,0.95vw,11px)",
                color: "#A6192E", letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}>Discover · Learn · Grow</span>
              <div style={{ width: 20, height: 2, background: "#A6192E" }} />
            </div>

            <div style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between", flexWrap: "wrap", gap: 14,
            }}>
              <div>
                <h2 style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: "clamp(28px,4.8vw,56px)",
                  fontWeight: 900, color: "#1A1008",
                  lineHeight: 1.0, letterSpacing: "-0.025em",
                  margin: "0 0 4px",
                }}>
                  All{" "}
                  <span style={{ color: "#A6192E", fontStyle: "italic", position: "relative" }}>
                    Categories
                    <Scribble />
                  </span>
                </h2>
                <p style={{
                  fontFamily: "Lora, Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(11px,1.1vw,15px)",
                  color: "#7A6E5A", lineHeight: 1.5, margin: "8px 0 0",
                }}>
                  Click any card to explore its topics
                </p>
              </div>

              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(10px,1vw,13px)",
                color: "#7A6E5A",
                border: "1px solid #D4CCBA",
                borderRadius: 3, padding: "6px 14px",
                background: "rgba(255,255,255,0.45)",
                whiteSpace: "nowrap",
              }}>
                {CATEGORIES.length} categories ·{" "}
                {CATEGORIES.reduce((a, c) => a + c.subcategories.length, 0)} topics
              </div>
            </div>
          </motion.div>

          {/* ── GRID WITH INLINE PANELS ── */}
          {inView && rows.map((row, rowIdx) => (
            <React.Fragment key={rowIdx}>
              {/* Category row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(150px, 16vw, 218px), 1fr))",
                gap: "clamp(12px,1.6vw,20px)",
                marginBottom: activeRowIndex === rowIdx ? 0 : "clamp(12px,1.6vw,20px)",
              }}>
                {row.map((cat, i) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    index={rowIdx * GRID_COLS + i}
                    onClick={handleCardClick}
                    isActive={activeId === cat.id}
                  />
                ))}
              </div>

              {/* Inline subcategory panel after this row */}
              <AnimatePresence>
                {activeRowIndex === rowIdx && activeCat && (
                  <SubcategoryPanel
                    key={activeCat.id}
                    cat={activeCat}
                    onClose={() => setActiveId(null)}
                  />
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}

          {/* Footer rule */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            marginTop: "clamp(32px,4vw,52px)",
          }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #D4CCBA, transparent)" }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9,
              color: "#7A6E5A", letterSpacing: "0.14em", textTransform: "uppercase",
            }}>End of catalogue</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #D4CCBA, transparent)" }} />
          </div>
        </div>
      </section>
    </>
  );
}