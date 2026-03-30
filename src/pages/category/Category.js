// pages/category/Category.tsx
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

/* ─────────────────────────────────────────────
   MOCK DATA — replace with real CATEGORIES import
───────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "math",
    title: "Mathematics",
    tagline: "Numbers that never lie",
    icon: "📐",
    badge: "Popular",
    accent: "#dc2626",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    count: "42 topics",
    subcategories: [],
  },
  {
    id: "science",
    title: "Science",
    tagline: "Curiosity meets discovery",
    icon: "🔬",
    badge: "Trending",
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1532094349884-543559059ac8?w=600&q=80",
    count: "38 topics",
    subcategories: [],
  },
  {
    id: "english",
    title: "English",
    tagline: "Words that move the world",
    icon: "📖",
    badge: null,
    accent: "#16a34a",
    img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80",
    count: "29 topics",
    subcategories: [],
  },
  {
    id: "history",
    title: "History",
    tagline: "Stories carved in stone",
    icon: "🏛️",
    badge: null,
    accent: "#ca8a04",
    img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80",
    count: "33 topics",
    subcategories: [],
  },
  {
    id: "coding",
    title: "Computer Science",
    tagline: "Build the future, one line at a time",
    icon: "💻",
    badge: "New",
    accent: "#7c3aed",
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80",
    count: "51 topics",
    subcategories: [],
  },
  {
    id: "physics",
    title: "Physics",
    tagline: "Forces that shape reality",
    icon: "⚡",
    badge: null,
    accent: "#0891b2",
    img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80",
    count: "27 topics",
    subcategories: [],
  },
  {
    id: "chemistry",
    title: "Chemistry",
    tagline: "Reactions that build life",
    icon: "⚗️",
    badge: null,
    accent: "#ea580c",
    img: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&q=80",
    count: "24 topics",
    subcategories: [],
  },
  {
    id: "economics",
    title: "Economics",
    tagline: "The logic behind every choice",
    icon: "📊",
    badge: null,
    accent: "#0d9488",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    count: "19 topics",
    subcategories: [],
  },
];

/* ─────────────────────────────────────────────
   SVG helpers
───────────────────────────────────────────── */
const Pushpin = ({ color = "#dc2626", size = 28 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 24 36" fill="none">
    <circle cx="12" cy="10" r="9" fill={color} />
    <circle cx="12" cy="10" r="5" fill="white" fillOpacity="0.35" />
    <rect x="10.5" y="18" width="3" height="18" rx="1.5" fill="#78716c" />
  </svg>
);

const PaperClip = () => (
  <svg width="20" height="52" viewBox="0 0 28 70" fill="none">
    <path
      d="M14 4C8.477 4 4 8.477 4 14v34c0 7.732 6.268 14 14 14s14-6.268 14-14V18"
      stroke="#9ca3af" strokeWidth="3.5" strokeLinecap="round" fill="none"
    />
    <path
      d="M14 4C19.523 4 24 8.477 24 14v28c0 5.523-4.477 10-10 10S4 47.523 4 42V18"
      stroke="#6b7280" strokeWidth="2" strokeLinecap="round" fill="none"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   Sticky note color palette for cards
───────────────────────────────────────────── */
const noteColors = [
  { bg: "#fff9c4", fold: "#e6c700" },
  { bg: "#ffd6d6", fold: "#f87171" },
  { bg: "#d4f4dd", fold: "#4ade80" },
  { bg: "#dde9ff", fold: "#93c5fd" },
  { bg: "#ffe4cc", fold: "#fb923c" },
  { bg: "#f0d9ff", fold: "#c084fc" },
  { bg: "#d1faf5", fold: "#2dd4bf" },
  { bg: "#fce7f3", fold: "#f472b6" },
];

/* ─────────────────────────────────────────────
   Ruled-line CSS
───────────────────────────────────────────── */
const ruledBg = `
  repeating-linear-gradient(
    transparent, transparent 27px, rgba(243,213,213,0.45) 28px
  )
`;

/* ─────────────────────────────────────────────
   CategoryCard
───────────────────────────────────────────── */
const CategoryCard = React.memo(({ cat, index, onClick }) => {
  const [hov, setHov] = useState(false);
  const nc = noteColors[index % noteColors.length];
  const rotations = [-3, 2, -1.5, 3, -2, 1, -2.5, 2.5];
  const rot = rotations[index % rotations.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, rotate: rot }}
      animate={{ opacity: 1, y: 0, rotate: rot }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, y: -8, scale: 1.04, zIndex: 20 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onClick={() => onClick(cat)}
      className="cursor-pointer relative"
      style={{ zIndex: hov ? 20 : 1 }}
      role="button"
      aria-label={`Explore ${cat.title}`}
    >
      {/* Pushpin */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
        <Pushpin color={cat.accent} size={24} />
      </div>

      {/* Card body */}
      <div
        className="relative overflow-hidden"
        style={{
          background: nc.bg,
          border: `1.5px solid ${nc.fold}`,
          borderRadius: "2px",
          boxShadow: hov
            ? `6px 8px 0 ${nc.fold}88, 0 20px 40px rgba(0,0,0,0.18)`
            : `4px 5px 0 ${nc.fold}55, 0 6px 18px rgba(0,0,0,0.10)`,
          transition: "box-shadow 0.25s ease",
        }}
      >
        {/* Folded corner */}
        <div
          className="absolute bottom-0 right-0 w-8 h-8"
          style={{
            background: `linear-gradient(225deg, ${nc.fold}99 50%, transparent 50%)`,
          }}
        />

        {/* Image */}
        <div className="relative h-36 overflow-hidden">
          <motion.img
            src={cat.img}
            alt={cat.title}
            loading="lazy"
            animate={{ scale: hov ? 1.1 : 1 }}
            transition={{ duration: 0.45 }}
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Badge tape */}
          {cat.badge && (
            <div
              className="absolute top-2 left-0 px-3 py-1 text-[9px] font-bold tracking-widest uppercase"
              style={{
                background: "rgba(252,211,77,0.85)",
                color: "#78350f",
                fontFamily: "'Courier New', monospace",
                boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                transform: "rotate(-1deg)",
              }}
            >
              {cat.badge}
            </div>
          )}

          {/* Icon */}
          <div className="absolute bottom-2 left-3 text-2xl drop-shadow-lg">{cat.icon}</div>
        </div>

        {/* Text body — ruled lines inside */}
        <div
          className="px-4 py-3 pb-5"
          style={{
            backgroundImage: ruledBg,
            backgroundSize: "100% 28px",
          }}
        >
          {/* Red margin line */}
          <div
            className="absolute left-8 top-36 bottom-0 w-px"
            style={{ background: "rgba(239,68,68,0.3)" }}
          />

          <h3
            className="pl-4 font-bold leading-tight mb-1"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "0.95rem",
              color: "#1c1917",
              lineHeight: "28px",
            }}
          >
            {cat.title}
          </h3>
          <p
            className="pl-4 italic"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "0.72rem",
              color: "#78716c",
              lineHeight: "28px",
            }}
          >
            {cat.tagline}
          </p>

          {/* Footer row */}
          <div className="pl-4 flex items-center justify-between mt-2">
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.65rem",
                color: "#a8a29e",
                letterSpacing: "0.05em",
              }}
            >
              {cat.count}
            </span>
            <motion.div
              animate={{
                background: hov ? cat.accent : "rgba(0,0,0,0.06)",
                color: hov ? "#fff" : "#44403c",
              }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs border"
              style={{ borderColor: hov ? cat.accent : "rgba(0,0,0,0.12)", transition: "all 0.2s" }}
            >
              →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Category() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-5% 0px" });
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`);
  };

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        className="relative min-h-screen py-20 px-4 sm:px-8 lg:px-16 overflow-hidden"
        style={{
          background: "#fef9f0",
          backgroundImage: `
          ${ruledBg},
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")
        `,
        }}
      >
        {/* Red margin line */}
        <div
          className="absolute left-20 top-0 h-full w-px hidden lg:block"
          style={{ background: "rgba(239,68,68,0.35)" }}
        />

        {/* Hole punches */}
        {[12, 28, 44, 60, 76].map((pct) => (
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

        {/* Paperclip on header */}
        <div className="absolute top-14 right-12 opacity-60 hidden lg:block">
          <PaperClip />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            {/* Tape-label badge */}
            <div className="inline-block mb-5">
              <div
                style={{
                  background: "rgba(252,211,77,0.72)",
                  padding: "5px 20px",
                  borderRadius: "2px",
                  transform: "rotate(-1.5deg)",
                  display: "inline-block",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  color: "#78350f",
                  letterSpacing: "0.18em",
                }}
              >
                DISCOVER · LEARN · GROW
              </div>
            </div>

            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h2
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 3.8rem)",
                    color: "#1c1917",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  All{" "}
                  <span className="relative" style={{ color: "#dc2626", fontStyle: "italic" }}>
                    Categories
                    <svg
                      viewBox="0 0 200 10"
                      className="absolute -bottom-1 left-0 w-full"
                      style={{ height: "10px" }}
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 7C30 3 60 9 100 5.5C140 2 170 8 198 5"
                        stroke="#dc2626" strokeWidth="2.8" fill="none" strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>
                <p
                  className="mt-3 italic"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "1rem",
                    color: "#78716c",
                    lineHeight: "28px",
                  }}
                >
                  Click any card to explore its topics
                </p>
              </div>

              {/* Count note */}
              <div
                className="px-4 py-2 text-xs"
                style={{
                  background: "#ffd6d6",
                  border: "1.5px solid #f87171",
                  borderRadius: "2px",
                  transform: "rotate(1deg)",
                  boxShadow: "3px 3px 0 #dc262633",
                  fontFamily: "'Courier New', monospace",
                  color: "#7f1d1d",
                  fontWeight: 600,
                }}
              >
                {CATEGORIES.length} categories
              </div>
            </div>
          </motion.div>

          {/* ── Corkboard grid ── */}
          {inView && (
            <div
              className="relative rounded-2xl p-8 sm:p-12"
              style={{
                background: "#c8a97e",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
                border: "7px solid #a07850",
                boxShadow: "inset 0 0 70px rgba(0,0,0,0.18), 0 12px 50px rgba(0,0,0,0.15)",
              }}
            >
              {/* Corkboard label */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 text-xs font-bold tracking-widest whitespace-nowrap"
                style={{
                  background: "#7f1d1d",
                  color: "#fef9f0",
                  borderRadius: "2px",
                  fontFamily: "'Courier New', monospace",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                📋 SUBJECT CATALOGUE
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 pt-4">
                {CATEGORIES.map((cat, i) => (
                  <CategoryCard key={cat.id} cat={cat} index={i} onClick={handleCategoryClick} />
                ))}
              </div>
            </div>
          )}

          {/* Footer rule */}
          <div className="flex items-center gap-4 mt-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.65rem",
                color: "#a8a29e",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              End of catalogue
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}