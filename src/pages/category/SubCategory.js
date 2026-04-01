// pages/category/SubCategory.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const CATEGORIES = [
  { id: "math", title: "Mathematics", tagline: "Numbers that never lie", icon: "📐", badge: "Popular", accent: "#dc2626", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80", count: "42 topics", subcategories: [] },
  { id: "science", title: "Science", tagline: "Curiosity meets discovery", icon: "🔬", badge: "Trending", accent: "#2563eb", img: "https://images.unsplash.com/photo-1532094349884-543559059ac8?w=600&q=80", count: "38 topics", subcategories: [] },
  { id: "english", title: "English", tagline: "Words that move the world", icon: "📖", badge: null, accent: "#16a34a", img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80", count: "29 topics", subcategories: [] },
  { id: "history", title: "History", tagline: "Stories carved in stone", icon: "🏛️", badge: null, accent: "#ca8a04", img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80", count: "33 topics", subcategories: [] },
  { id: "coding", title: "Computer Science", tagline: "Build the future, one line at a time", icon: "💻", badge: "New", accent: "#7c3aed", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80", count: "51 topics", subcategories: [] },
  { id: "physics", title: "Physics", tagline: "Forces that shape reality", icon: "⚡", badge: null, accent: "#0891b2", img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80", count: "27 topics", subcategories: [] },
  { id: "chemistry", title: "Chemistry", tagline: "Reactions that build life", icon: "⚗️", badge: null, accent: "#ea580c", img: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&q=80", count: "24 topics", subcategories: [] },
  { id: "economics", title: "Economics", tagline: "The logic behind every choice", icon: "📊", badge: null, accent: "#0d9488", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80", count: "19 topics", subcategories: [] },
];

const MOCK_SUBCATEGORIES = [
  { id: "sub1", title: "Fundamentals", level: "Beginner", icon: "🌱", rating: 4.8, courses: 12, duration: "6 hrs", students: 8400, price: 799, img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80" },
  { id: "sub2", title: "Core Concepts", level: "Beginner", icon: "🧱", rating: 4.6, courses: 9, duration: "4 hrs", students: 6100, price: 599, img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&q=80" },
  { id: "sub3", title: "Problem Solving", level: "Intermediate", icon: "🧩", rating: 4.9, courses: 18, duration: "10 hrs", students: 12300, price: 1199, img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80" },
  { id: "sub4", title: "Applied Practice", level: "Intermediate", icon: "🔧", rating: 4.7, courses: 14, duration: "8 hrs", students: 9800, price: 999, img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80" },
  { id: "sub5", title: "Advanced Theory", level: "Advanced", icon: "🚀", rating: 4.5, courses: 22, duration: "15 hrs", students: 4500, price: 1599, img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80" },
  { id: "sub6", title: "Exam Mastery", level: "Advanced", icon: "🏆", rating: 4.9, courses: 16, duration: "12 hrs", students: 15200, price: 1399, img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500&q=80" },
  { id: "sub7", title: "Quick Revision", level: "Beginner", icon: "⚡", rating: 4.4, courses: 7, duration: "3 hrs", students: 22000, price: 399, img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=80" },
  { id: "sub8", title: "Project Work", level: "Advanced", icon: "🗂️", rating: 4.7, courses: 10, duration: "20 hrs", students: 3300, price: 1799, img: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?w=500&q=80" },
];

/* ─────────────────────────────────────────────
   Palettes
───────────────────────────────────────────── */
const noteColors = [
  { bg: "#fff9c4", fold: "#e6c700", text: "#78350f" },
  { bg: "#ffd6d6", fold: "#f87171", text: "#7f1d1d" },
  { bg: "#d4f4dd", fold: "#4ade80", text: "#14532d" },
  { bg: "#dde9ff", fold: "#93c5fd", text: "#1e3a5f" },
  { bg: "#ffe4cc", fold: "#fb923c", text: "#7c2d12" },
  { bg: "#f0d9ff", fold: "#c084fc", text: "#581c87" },
  { bg: "#d1faf5", fold: "#2dd4bf", text: "#134e4a" },
  { bg: "#fce7f3", fold: "#f472b6", text: "#831843" },
];

const levelColors = {
  Beginner:     { bg: "#d4f4dd", text: "#14532d", border: "#4ade80" },
  Intermediate: { bg: "#fff9c4", text: "#78350f", border: "#f9d71c" },
  Advanced:     { bg: "#ffd6d6", text: "#7f1d1d", border: "#f87171" },
  "All Levels": { bg: "#dde9ff", text: "#1e3a5f", border: "#93c5fd" },
};

const ruledBg = "repeating-linear-gradient(transparent, transparent 27px, rgba(243,213,213,0.45) 28px)";

/* ─────────────────────────────────────────────
   Global responsive styles
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    .sub-cork-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.25rem;
      padding-top: 1.5rem;
    }
    @media (min-width: 480px)  { .sub-cork-grid { gap: 1.6rem; } }
    @media (min-width: 640px)  { .sub-cork-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; } }
    @media (min-width: 1024px) { .sub-cork-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.5rem; } }
    .sub-cork-cell { padding-top: 1.4rem; }

    /* Hero header: stack on mobile, row on lg */
    .hero-inner {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    @media (min-width: 1024px) {
      .hero-inner {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }
    }

    /* Stats row wraps on mobile */
    .stats-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
    }

    /* Filter bar: always wraps cleanly */
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   SVG helpers
───────────────────────────────────────────── */
const Pushpin = ({ color = "#dc2626", size = 22 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 24 36" fill="none">
    <circle cx="12" cy="10" r="9" fill={color} />
    <circle cx="12" cy="10" r="5" fill="white" fillOpacity="0.35" />
    <rect x="10.5" y="18" width="3" height="18" rx="1.5" fill="#78716c" />
  </svg>
);

const TapeStrip = ({
  rotate = "-2deg",
  color = "rgba(252,211,77,0.65)",
  width = 70,
}) => (
  <div
    style={{
      width: `${width}px`,
      height: "18px",
      background: color,
      borderRadius: "1px",
      transform: `rotate(${rotate})`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.14)",
    }}
  />
);

/* ─────────────────────────────────────────────
   FilterBar
───────────────────────────────────────────── */
const FilterBar = ({
  active,
  onChange,
  accent,
}) => {
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];
  return (
    <div className="filter-bar">
      {filters.map((f) => {
        const isActive = active === f;
        return (
          <motion.button
            key={f}
            whileHover={{ y: -2, rotate: isActive ? 0 : -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(f)}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(0.58rem, 1.6vw, 0.72rem)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: `1.5px solid ${isActive ? accent : "#d6c9bb"}`,
              background: isActive ? accent : "#fef9f0",
              color: isActive ? "#fff" : "#78716c",
              borderRadius: "2px",
              padding: "5px 14px",
              boxShadow: isActive ? `3px 3px 0 ${accent}44` : "2px 2px 0 #d6c9bb55",
              transform: isActive
                ? "rotate(0deg)"
                : `rotate(${f === "Beginner" ? -1 : f === "Advanced" ? 1 : 0}deg)`,
              transition: "all 0.2s",
              cursor: "pointer",
            }}
          >
            {f}
          </motion.button>
        );
      })}
    </div>
  );
};


const SubCard = React.memo(
  ({
    sub,
    accent,
    delay,
    index,
    onClick,
  }) => {
    const [hov, setHov] = useState(false);
    const nc = noteColors[index % noteColors.length];
    const lc = levelColors[sub.level] ?? levelColors["All Levels"];
    const rots = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5];
    const rot = rots[index % rots.length];

    return (
      <motion.article
        initial={{ opacity: 0, y: 28, rotate: rot }}
        animate={{ opacity: 1, y: 0, rotate: rot }}
        transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotate: 0, y: -8, scale: 1.04, zIndex: 20 }}
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        onClick={() => onClick(sub)}
        className="cursor-pointer relative w-full"
        style={{ zIndex: hov ? 20 : 1 }}
        role="button"
        aria-label={`Explore ${sub.title}`}
      >
        {/* Pushpin */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <Pushpin color={accent} size={20} />
        </div>

        <div
          className="relative overflow-hidden w-full"
          style={{
            background: nc.bg,
            border: `1.5px solid ${nc.fold}`,
            borderRadius: "2px",
            boxShadow: hov
              ? `6px 8px 0 ${nc.fold}88, 0 18px 36px rgba(0,0,0,0.16)`
              : `3px 4px 0 ${nc.fold}55, 0 5px 14px rgba(0,0,0,0.09)`,
            transition: "box-shadow 0.25s ease",
          }}
        >
          {/* Folded corner */}
          <div
            className="absolute bottom-0 right-0 w-7 h-7 pointer-events-none"
            style={{ background: `linear-gradient(225deg, ${nc.fold}99 50%, transparent 50%)` }}
          />

          {/* Image — aspect-ratio for fluid sizing */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
            <motion.img
              src={sub.img}
              alt={sub.title}
              loading="lazy"
              animate={{ scale: hov ? 1.09 : 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            {/* Level badge */}
            <div className="absolute top-2 left-0">
              <div
                style={{
                  background: lc.bg,
                  border: `1px solid ${lc.border}`,
                  color: lc.text,
                  padding: "2px 8px",
                  fontSize: "clamp(0.5rem, 1.4vw, 0.62rem)",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transform: "rotate(-0.5deg)",
                  boxShadow: "1px 1px 3px rgba(0,0,0,0.15)",
                }}
              >
                {sub.level}
              </div>
            </div>

            {/* Icon */}
            <div
              className="absolute top-1.5 right-2 drop-shadow-lg"
              style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)" }}
            >
              {sub.icon}
            </div>

            {/* Stars */}
            <div className="absolute bottom-2 left-2 flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  style={{
                    color: s <= Math.round(sub.rating) ? "#f59e0b" : "rgba(255,255,255,0.3)",
                    fontSize: "clamp(7px, 1.5vw, 9px)",
                  }}
                >
                  ★
                </span>
              ))}
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(0.52rem, 1.3vw, 0.6rem)",
                  color: "rgba(255,255,255,0.8)",
                  marginLeft: "2px",
                }}
              >
                {sub.rating}
              </span>
            </div>
          </div>

          {/* Text body — ruled lines */}
          <div
            className="relative px-2 sm:px-3 pt-2 pb-4"
            style={{ backgroundImage: ruledBg, backgroundSize: "100% 28px" }}
          >
            {/* Margin line */}
            <div
              className="absolute left-6 sm:left-7 top-0 bottom-0 w-px pointer-events-none"
              style={{ background: "rgba(239,68,68,0.25)" }}
            />

            <h4
              className="pl-3 sm:pl-4 font-bold leading-[28px]"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(0.7rem, 2vw, 0.88rem)",
                color: "#1c1917",
                margin: 0,
              }}
            >
              {sub.title}
            </h4>

            {/* Stats */}
            <div className="pl-3 sm:pl-4 flex gap-2 flex-wrap leading-[28px]">
              {[
                { icon: "📚", val: `${sub.courses} courses` },
                { icon: "⏱️", val: sub.duration },
              ].map((stat) => (
                <span
                  key={stat.val}
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "clamp(0.52rem, 1.3vw, 0.62rem)",
                    color: "#78716c",
                  }}
                >
                  {stat.icon} {stat.val}
                </span>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="pl-3 sm:pl-4 flex items-center justify-between leading-[28px]">
              <span
                style={{
                  fontFamily: "'Georgia', serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.78rem, 2vw, 0.95rem)",
                  color: accent,
                }}
              >
                ₹{sub.price.toLocaleString()}
              </span>
              <motion.div
                animate={{
                  background: hov ? accent : "rgba(0,0,0,0.06)",
                  color: hov ? "#fff" : "#44403c",
                }}
                className="flex items-center gap-1"
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(0.5rem, 1.3vw, 0.62rem)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  border: `1.5px solid ${hov ? accent : "rgba(0,0,0,0.12)"}`,
                  transition: "all 0.2s",
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                }}
              >
                View →
              </motion.div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Subcategory({ onSelectCourse }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const category = CATEGORIES.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fef9f0]">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Category Not Found</h1>
            <button
              onClick={() => navigate("/category")}
              className="px-6 py-2 bg-red-500 text-white rounded-lg"
            >
              Back to Categories
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const rawSubs =
    category.subcategories && category.subcategories.length > 0
      ? (category.subcategories)
      : MOCK_SUBCATEGORIES;

  const filtered =
    filter === "All"
      ? rawSubs
      : rawSubs.filter((s) => s.level === filter || s.level === "All Levels");

  const { accent = "#dc2626", icon, title, tagline } = category;

  return (
    <>
      <GlobalStyles />
      <Navbar />

      <section
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: "#fef9f0",
          backgroundImage: `
            ${ruledBg},
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")
          `,
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1rem, 5vw, 4rem)",
        }}
      >
        {/* Red margin line — desktop only */}
        <div
          className="absolute left-20 top-0 h-full w-px hidden lg:block"
          style={{ background: "rgba(239,68,68,0.35)" }}
        />

        {/* Hole punches — desktop only */}
        {[10, 25, 40, 55, 70, 85].map((pct) => (
          <div
            key={pct}
            className="absolute w-5 h-5 rounded-full hidden lg:block"
            style={{
              top: `${pct}%`,
              left: "2.2rem",
              background: "#e7ddd0",
              border: "1.5px solid #d6c9bb",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Back button ── */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/category")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(0.6rem, 1.6vw, 0.72rem)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: accent,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ← All Categories
          </motion.button>

          {/* ── Hero header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative"
            style={{ marginBottom: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            {/* Tape strips */}
            <div className="absolute -top-3 left-8 sm:left-12 flex gap-3">
              <TapeStrip rotate="-2deg" />
              <TapeStrip rotate="1.5deg" color="rgba(248,113,113,0.45)" width={50} />
            </div>

            <div
              className="relative"
              style={{
                background: "#ffd6d6",
                border: "1.5px solid #f87171",
                borderRadius: "2px",
                boxShadow: `6px 8px 0 #dc262633, 0 16px 40px rgba(0,0,0,0.1)`,
                transform: "rotate(-0.5deg)",
                padding: "clamp(1.25rem, 4vw, 2.5rem)",
              }}
            >
              {/* Folded corner */}
              <div
                className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 pointer-events-none"
                style={{ background: "linear-gradient(225deg, #f8717199 50%, transparent 50%)" }}
              />

              <div className="hero-inner">
                {/* Left: icon + title */}
                <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                  <motion.div
                    initial={{ scale: 0.7, rotate: -10 }}
                    animate={{ scale: 1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16 }}
                    className="relative flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "clamp(3rem, 8vw, 4rem)",
                      height: "clamp(3rem, 8vw, 4rem)",
                      fontSize: "clamp(1.25rem, 4vw, 2rem)",
                      background: "#fff9c4",
                      border: "1.5px solid #f9d71c",
                      borderRadius: "2px",
                      boxShadow: "3px 4px 0 #e6c70055",
                      transform: "rotate(-8deg)",
                    }}
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Pushpin color={accent} size={14} />
                    </div>
                    {icon}
                  </motion.div>

                  <div>
                    <h1
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontWeight: 700,
                        fontSize: "clamp(1.5rem, 5vw, 3rem)",
                        color: "#7f1d1d",
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      {title}
                    </h1>
                    <p
                      className="italic mt-1"
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "clamp(0.76rem, 2vw, 0.95rem)",
                        color: "#78716c",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {tagline}
                    </p>
                  </div>
                </div>

                {/* Right: stat notes */}
                <div className="stats-row">
                  {[
                    { label: "Topics",   val: rawSubs.length },
                    { label: "Courses",  val: rawSubs.reduce((a, s) => a + (s.courses || 0), 0) },
                    { label: "Students", val: `${(rawSubs.reduce((a, s) => a + (s.students || 0), 0) / 1000).toFixed(0)}k+` },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      style={{
                        background: noteColors[i].bg,
                        border: `1.5px solid ${noteColors[i].fold}`,
                        borderRadius: "2px",
                        transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                        boxShadow: `3px 3px 0 ${noteColors[i].fold}44`,
                        minWidth: "64px",
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontWeight: 700,
                          fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                          color: accent,
                        }}
                      >
                        {stat.val}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Courier New', monospace",
                          fontSize: "clamp(0.52rem, 1.3vw, 0.6rem)",
                          color: "#78716c",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Filter row ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between flex-wrap gap-3 pb-4"
            style={{
              borderBottom: `1.5px dashed ${accent}33`,
              marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
            }}
          >
            <FilterBar active={filter} onChange={setFilter} accent={accent} />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(0.55rem, 1.4vw, 0.65rem)",
                color: "#a8a29e",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              {filtered.length} topics shown
            </span>
          </motion.div>

          {/* ── Corkboard ── */}
          <div
            className="relative rounded-xl sm:rounded-2xl"
            style={{
              background: "#c8a97e",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
              border: "5px solid #a07850",
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.18), 0 10px 40px rgba(0,0,0,0.14)",
              padding: "clamp(0.75rem, 3.5vw, 2.5rem)",
            }}
          >
            {/* Board label */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 font-bold tracking-widest whitespace-nowrap"
              style={{
                background: accent,
                color: "#fef9f0",
                borderRadius: "2px",
                fontFamily: "'Courier New', monospace",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)",
                letterSpacing: "0.1em",
                padding: "4px clamp(8px, 2vw, 20px)",
              }}
            >
              📌 {title.toUpperCase()} · TOPICS
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="sub-cork-grid"
              >
                {filtered.map((sub, i) => (
                  <div key={sub.title} className="sub-cork-cell">
                    <SubCard
                      sub={sub}
                      accent={accent}
                      delay={i * 0.05}
                      index={i}
                      onClick={() => navigate(`/course-detail/full-stack-dev`)}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer rule */}
          <div
            className="flex items-center gap-3 sm:gap-4"
            style={{ marginTop: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(0.52rem, 1.3vw, 0.62rem)",
                color: "#a8a29e",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {title} · {rawSubs.length} topics
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}