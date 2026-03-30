// pages/category/CourseDetails.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

/* ─────────────────────────────────────────
   STATIC COURSE DATA (would come from API/database in real app)
───────────────────────────────────────── */
const COURSES_DB = {
  "full-stack-dev": {
    id: "full-stack-dev",
    title: "Full Stack Development",
    icon: "⬡",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    rating: 4.8,
    students: 15200,
    duration: "240 hrs",
    level: "Beginner → Pro",
    price: 4999,
    courses: 12,
    categoryTitle: "Engineering & Tech",
    instructor: {
      name: "Dr. Arjun Mehta",
      title: "Senior Educator & Industry Expert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
      students: "36.4k",
      courses: 2,
      rating: 4.8,
    },
    description:
      "Master Full Stack Development from the ground up with hands-on projects, real-world case studies, and expert mentorship. This course is carefully structured to take you from fundamentals to professional-level proficiency, with a curriculum refined through feedback from thousands of students.",
    whatYouLearn: [
      "Core fundamentals of Full Stack Development",
      "Real-world projects and case studies",
      "Industry best practices and workflows",
      "Problem-solving and critical thinking",
      "Assessment techniques and exam strategies",
      "Live doubt-clearing sessions",
    ],
    curriculum: [
      { module: "Module 1", title: "Foundations & Concepts", lessons: 8, duration: "3 hrs" },
      { module: "Module 2", title: "Core Techniques", lessons: 12, duration: "5 hrs" },
      { module: "Module 3", title: "Advanced Topics", lessons: 10, duration: "4.5 hrs" },
      { module: "Module 4", title: "Practical Projects", lessons: 6, duration: "6 hrs" },
      { module: "Module 5", title: "Mock Tests & Review", lessons: 8, duration: "4 hrs" },
    ],
    features: [
      { icon: "🎥", label: "HD Video Lectures", val: "36+ lessons" },
      { icon: "📄", label: "Study Material", val: "PDF notes included" },
      { icon: "🏆", label: "Certificate", val: "On completion" },
      { icon: "♾️", label: "Lifetime Access", val: "Learn at your pace" },
      { icon: "📱", label: "Mobile App", val: "iOS & Android" },
      { icon: "🤝", label: "Live Sessions", val: "Weekly Q&A" },
    ],
    reviews: [
      {
        name: "Priya S.",
        rating: 5,
        text: "Absolutely transformed my understanding. The structured approach and live sessions are a game-changer!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=75",
      },
      {
        name: "Rohan K.",
        rating: 5,
        text: "Best investment I've made. Cleared my exam on the first attempt after following this course.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=75",
      },
      {
        name: "Ananya M.",
        rating: 4,
        text: "Very comprehensive content. The practice tests are especially helpful for consolidating knowledge.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=75",
      },
    ],
  },
  "react-mastery": {
    id: "react-mastery",
    title: "React Mastery",
    icon: "⚛️",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=80",
    rating: 4.9,
    students: 8900,
    duration: "80 hrs",
    level: "Intermediate",
    price: 2999,
    courses: 8,
    categoryTitle: "Frontend Development",
    instructor: {
      name: "Sarah Johnson",
      title: "React Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
      students: "22.1k",
      courses: 3,
      rating: 4.9,
    },
    description: "Master React.js with hooks, context, and advanced patterns. Build production-ready applications.",
    whatYouLearn: ["React Hooks", "State Management", "Performance Optimization", "Testing", "Deployment"],
    curriculum: [
      { module: "Module 1", title: "React Basics", lessons: 10, duration: "15 hrs" },
      { module: "Module 2", title: "Hooks Deep Dive", lessons: 12, duration: "20 hrs" },
    ],
    features: [
      { icon: "🎥", label: "HD Video Lectures", val: "45+ lessons" },
      { icon: "🏆", label: "Certificate", val: "On completion" },
    ],
    reviews: [
      {
        name: "John D.",
        rating: 5,
        text: "Excellent course!",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=75",
      },
    ],
  },
};

/* ─────────────────────────────────────────
   NOTEBOOK RULED LINES COMPONENT
───────────────────────────────────────── */
const RuledLines = ({ count = 18, color = "#A6192E", opacity = 0.07, startY = 40, gap = 26 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="absolute left-0 right-0"
        style={{ top: startY + i * gap, height: 1, backgroundColor: color, opacity }}
      />
    ))}
    <div
      className="absolute top-0 bottom-0"
      style={{ left: 52, width: 1.5, backgroundColor: "#f0a0a8", opacity: 0.2 }}
    />
  </div>
);

/* ─────────────────────────────────────────
   WASHI TAPE COMPONENT
───────────────────────────────────────── */
const WashiTape = ({ width = 64, rotation = -2, color = "rgba(255,200,80,0.65)", top, left, right }) => {
  const id = `wt-${width}-${Math.abs(rotation)}`;
  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{ top, left, right, transform: `rotate(${rotation}deg)` }}
    >
      <svg width={width} height={20} viewBox={`0 0 ${width} 20`}>
        <defs>
          <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="4.5" cy="4.5" r="1.4" fill="rgba(255,255,255,0.38)" />
          </pattern>
        </defs>
        <rect width={width} height={20} rx={2} fill={color} />
        <rect width={width} height={20} rx={2} fill={`url(#${id})`} />
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────
   PAPER CLIP COMPONENT
───────────────────────────────────────── */
const PaperClip = ({ rotation = 0, color = "#b0b8c8", scale = 1 }) => (
  <div
    className="pointer-events-none"
    style={{ transform: `rotate(${rotation}deg) scale(${scale})`, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))" }}
  >
    <svg width="20" height="48" viewBox="0 0 20 48" fill="none">
      <path
        d="M10 3C6 3 2 6 2 11L2 35C2 43 6 47 10 47C14 47 18 43 18 35L18 15C18 10.5 15.5 8 12.5 8L10 8C7.5 8 5 10 5 13L5 33C5 36 7.2 38.5 10 38.5C12.8 38.5 15 36 15 33L15 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   STICKY NOTE COMPONENT
───────────────────────────────────────── */
const StickyNote = ({ color = "yellow", rotation = 0, width = 80, children }) => {
  const pal = {
    yellow: { bg: "#fef08a", lines: "#e5c84a55", fold: "#e5c84a" },
    pink: { bg: "#fda4af", lines: "#f472b655", fold: "#f472b6" },
    green: { bg: "#86efac", lines: "#4ade8055", fold: "#4ade80" },
    blue: { bg: "#93c5fd", lines: "#60a5fa55", fold: "#60a5fa" },
    orange: { bg: "#fdba74", lines: "#fb923c55", fold: "#fb923c" },
  };
  const c = pal[color] || pal.yellow;
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width,
        backgroundColor: c.bg,
        borderRadius: 3,
        padding: "8px 10px 12px",
        transform: `rotate(${rotation}deg)`,
        boxShadow: "2px 4px 12px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.09)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 3,
          backgroundImage: `repeating-linear-gradient(transparent, transparent 16px, ${c.lines} 16px, ${c.lines} 17px)`,
          backgroundPositionY: "22px",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[13px] h-[13px]"
        style={{ background: `linear-gradient(135deg, transparent 50%, ${c.fold} 50%)`, opacity: 0.7 }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

/* ─────────────────────────────────────────
   HAND-DRAWN UNDERLINE
───────────────────────────────────────── */
const HandUnderline = ({ width = 100 }) => {
  const ACCENT = "#A6192E";
  return (
    <svg width={width} height={10} viewBox={`0 0 ${width} 10`} className="block mt-0.5">
      <path
        d={`M2 7 Q${width * 0.3} 3, ${width * 0.5} 7 Q${width * 0.7} 11, ${width - 2} 5`}
        stroke={ACCENT}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M6 9 Q${width * 0.4} 7, ${width * 0.65} 9 Q${width * 0.82} 11, ${width - 4} 8`}
        stroke={ACCENT}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
};

/* ─────────────────────────────────────────
   SECTION HEADING (with vertical rule)
───────────────────────────────────────── */
const SectionHeading = ({ children, delay = 0, accent = "#A6192E" }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex items-center gap-3 mb-5"
  >
    <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
    <h2 className="font-['Fraunces',Georgia,serif] text-[clamp(18px,2.2vw,24px)] font-black text-[#1A1410] tracking-tight">
      {children}
    </h2>
  </motion.div>
);

/* ─────────────────────────────────────────
   STARS COMPONENT
───────────────────────────────────────── */
const Stars = ({ rating, size = 12 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        style={{ fontSize: size, color: s <= Math.round(rating) ? "#f59e0b" : "#d4ccba" }}
      >
        ★
      </span>
    ))}
  </div>
);

/* ─────────────────────────────────────────
   CURRICULUM ACCORDION ITEM
───────────────────────────────────────── */
const CurriculumItem = ({ item, delay, accent = "#A6192E" }) => {
  const [open, setOpen] = useState(false);
  const lessonTitles = ["Introduction", "Core Concepts", "Practice", "Advanced Topics", "Assessment", "Project Work", "Review"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="border-b"
      style={{ borderColor: `${accent}18` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left cursor-pointer bg-transparent border-none"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${accent}14`, border: `1.5px solid ${accent}40` }}
          >
            <span className="font-mono text-[10px] font-bold" style={{ color: accent }}>
              {item.module.split(" ")[1]}
            </span>
          </div>
          <span className="font-['Fraunces',Georgia,serif] text-sm font-bold text-[#1A1410]">
            {item.title}
          </span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:flex gap-3">
            <span className="font-mono text-[9px] text-[#8C7F6E]">{item.lessons} lessons</span>
            <span className="font-mono text-[9px] text-[#8C7F6E]">{item.duration}</span>
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            className="text-base font-mono"
            style={{ color: accent }}
          >
            +
          </motion.span>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-10">
              {Array.from({ length: item.lessons }, (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1.5 border-t first:border-t-0"
                  style={{ borderColor: `${accent}12` }}
                >
                  <span className="text-[9px]" style={{ color: accent }}>▶</span>
                  <span className="font-serif text-xs text-[#6B5F52]">
                    Lesson {i + 1}: {lessonTitles[i % 7]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   NOTEBOOK CARD WRAPPER
───────────────────────────────────────── */
const NotebookCard = ({ children, rotation = 0, className = "", tapeColor, tapeWidth = 60, tapeLeft = "50%", tapeOffset = -50 }) => (
  <div className={`relative ${className}`} style={{ transform: `rotate(${rotation}deg)` }}>
    {tapeColor && (
      <div
        className="absolute -top-2.5 z-10"
        style={{ left: tapeLeft, transform: `translateX(${tapeOffset}%) rotate(-1deg)` }}
      >
        <svg width={tapeWidth} height={20} viewBox={`0 0 ${tapeWidth} 20`}>
          <defs>
            <pattern id={`tc-${tapeWidth}`} width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="1.3" fill="rgba(255,255,255,0.35)" />
            </pattern>
          </defs>
          <rect width={tapeWidth} height={20} rx={2} fill={tapeColor} />
          <rect width={tapeWidth} height={20} rx={2} fill={`url(#tc-${tapeWidth})`} />
        </svg>
      </div>
    )}
    <div
      className="relative overflow-hidden rounded-[4px]"
      style={{
        backgroundColor: "rgba(255,255,255,0.88)",
        border: "1px solid #E5DDD0",
        boxShadow: "2px 4px 16px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.06)",
        backgroundImage: "repeating-linear-gradient(transparent, transparent 26px, #dde8f022 26px, #dde8f022 27px)",
      }}
    >
      {children}
    </div>
  </div>
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  // Get course data from database based on ID
  const course = COURSES_DB[courseId];

  // Handle case where course doesn't exist
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#fdf8f0]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Course Not Found</h1>
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

  const ACCENT = "#A6192E";
  const data = course;

  return (
    <>
      <Navbar />
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      <style>{`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      <div
        className="min-h-screen font-serif"
        style={{
          background: "#fdf8f0",
          backgroundImage: `
            repeating-linear-gradient(transparent, transparent 27px, #c8d8e828 27px, #c8d8e828 28px),
            linear-gradient(90deg, transparent 56px, #f0a0a820 57px, #f0a0a820 58px, transparent 58px)
          `,
          backgroundPositionY: "32px",
        }}
      >
        {/* ══════════════════════════════ HERO BANNER ══════════════════════════════ */}
        <div className="relative overflow-hidden" style={{ height: "clamp(260px, 42vw, 420px)" }}>
          <motion.img
            src={course.img}
            alt={course.title}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full h-full object-cover block"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.12) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, ${ACCENT}44 0%, transparent 65%)` }}
          />

          {/* Hero ruled lines */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{ top: i * 32, height: 1, backgroundColor: "rgba(255,255,255,0.04)" }}
              />
            ))}
          </div>

          {/* Washi tapes on hero */}
          <WashiTape color="rgba(255,200,80,0.55)" width={80} rotation={-2} top={-6} left={72} />
          <WashiTape color="rgba(160,200,255,0.5)" width={66} rotation={3} top={-6} right={120} />

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-14 pb-8">
            <div className="max-w-5xl">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-3 flex-wrap font-mono text-[9px] tracking-[0.18em] uppercase"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <span>All Categories</span>
                <span style={{ color: ACCENT }}>›</span>
                <span>{course.categoryTitle}</span>
                <span style={{ color: ACCENT }}>›</span>
                <span style={{ color: "rgba(255,255,255,0.8)" }}>{course.title}</span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.55 }}
                className="relative inline-block"
              >
                {/* Tape pinning the title */}
                <div className="absolute -top-2.5 left-5">
                  <svg width={72} height={18} viewBox="0 0 72 18">
                    <defs>
                      <pattern id="ht" width="8" height="8" patternUnits="userSpaceOnUse">
                        <circle cx="4" cy="4" r="1.2" fill="rgba(255,255,255,0.3)" />
                      </pattern>
                    </defs>
                    <rect width={72} height={18} rx={2} fill="rgba(255,160,80,0.62)" />
                    <rect width={72} height={18} rx={2} fill="url(#ht)" />
                  </svg>
                </div>
                <h1
                  className="font-['Fraunces',Georgia,serif] font-black text-white tracking-tight"
                  style={{ fontSize: "clamp(22px, 4vw, 48px)", lineHeight: 1.1 }}
                >
                  <span className="inline-block mr-2.5" style={{ fontSize: "clamp(20px, 3.5vw, 42px)" }}>
                    {course.icon}
                  </span>
                  {course.title}
                </h1>
              </motion.div>

              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-5 flex-wrap mt-3"
              >
                <div className="flex items-center gap-1.5">
                  <Stars rating={course.rating} size={13} />
                  <span className="font-mono text-[11px] font-bold text-[#f59e0b]">{course.rating}</span>
                  <span className="font-mono text-[9px] text-white/50">({(course.students / 1000).toFixed(1)}k reviews)</span>
                </div>
                {[
                  { icon: "👥", val: `${(course.students / 1000).toFixed(1)}k students` },
                  { icon: "⏱️", val: course.duration },
                  { icon: "📊", val: course.level },
                ].map((m) => (
                  <div key={m.val} className="flex items-center gap-1.5">
                    <span className="text-xs">{m.icon}</span>
                    <span className="font-mono text-[9px] text-white/70">{m.val}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════ BODY ══════════════════════════════ */}
        <div className="max-w-6xl mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <SectionHeading accent={ACCENT}>About This Course</SectionHeading>
                <NotebookCard tapeColor="rgba(255,200,80,0.62)" tapeWidth={72} tapeLeft="12%" tapeOffset={0}>
                  <div className="p-5 sm:p-6 relative">
                    <RuledLines count={10} opacity={0.05} color={ACCENT} />
                    <p className="font-['Lora',Georgia,serif] text-[clamp(13px,1.4vw,15px)] text-[#4a3f35] leading-relaxed relative z-[1]">
                      {data.description}
                    </p>
                  </div>
                </NotebookCard>
              </motion.section>

              {/* What You'll Learn */}
              <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <SectionHeading accent={ACCENT}>What You'll Learn</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.whatYouLearn.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.22 + i * 0.06 }}
                    >
                      <div
                        className="flex items-start gap-2.5 p-2.5 rounded-[3px]"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.85)",
                          border: `1.5px solid ${ACCENT}20`,
                          boxShadow: "1px 2px 8px rgba(0,0,0,0.07)",
                          transform: i % 2 === 0 ? "rotate(-0.4deg)" : "rotate(0.3deg)",
                        }}
                      >
                        <div
                          className="w-[18px] h-[18px] rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                          style={{ backgroundColor: `${ACCENT}14`, border: `1.5px solid ${ACCENT}50` }}
                        >
                          <span className="text-[8px]" style={{ color: ACCENT }}>✓</span>
                        </div>
                        <span className="font-['Lora',Georgia,serif] text-[clamp(12px,1.2vw,13.5px)] text-[#3D3428] leading-relaxed">
                          {item}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Curriculum */}
              <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <SectionHeading accent={ACCENT}>Curriculum</SectionHeading>
                <NotebookCard tapeColor="rgba(160,200,255,0.62)" tapeWidth={80} tapeLeft="40%" tapeOffset={0}>
                  <div className="px-4 sm:px-6 py-2 relative">
                    <RuledLines count={22} opacity={0.05} color={ACCENT} />
                    <div className="relative z-[1]">
                      {data.curriculum.map((item, i) => (
                        <CurriculumItem key={i} item={item} delay={0.28 + i * 0.06} accent={ACCENT} />
                      ))}
                    </div>
                  </div>
                </NotebookCard>
              </motion.section>

              {/* Reviews */}
              <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
                <SectionHeading accent={ACCENT}>Student Reviews</SectionHeading>

                {/* Rating summary */}
                <div className="relative mb-6">
                  <div className="absolute -top-2 left-8 z-20">
                    <PaperClip rotation={10} color="#b0b8c8" scale={0.9} />
                  </div>
                  <NotebookCard tapeColor="rgba(255,160,180,0.6)" tapeWidth={60} tapeLeft="70%" tapeOffset={0}>
                    <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-6 relative">
                      <RuledLines count={8} opacity={0.05} color={ACCENT} />
                      <div className="text-center flex-shrink-0 z-[1]">
                        <div
                          className="font-['Fraunces',Georgia,serif] font-black leading-none"
                          style={{ fontSize: "clamp(40px,5vw,56px)", color: ACCENT }}
                        >
                          {course.rating}
                        </div>
                        <Stars rating={course.rating} size={15} />
                        <div className="font-mono text-[9px] text-[#8C7F6E] mt-1">Course Rating</div>
                      </div>
                      <div className="flex-1 w-full z-[1]">
                        {[5, 4, 3, 2, 1].map((n) => (
                          <div key={n} className="flex items-center gap-2 mb-2">
                            <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, backgroundColor: "#E5DDD0" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: n === 5 ? "72%" : n === 4 ? "20%" : n === 3 ? "6%" : n === 2 ? "2%" : "1%",
                                }}
                                transition={{ delay: 0.5 + (5 - n) * 0.09, duration: 0.5 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: ACCENT }}
                              />
                            </div>
                            <span className="font-mono text-[9px] text-[#8C7F6E] whitespace-nowrap">{n} ★</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NotebookCard>
                </div>

                {/* Review cards */}
                <div className="flex flex-col gap-4">
                  {data.reviews.map((rev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38 + i * 0.09 }}
                    >
                      <NotebookCard
                        rotation={i % 2 === 0 ? -0.4 : 0.4}
                        tapeColor={["rgba(255,230,100,0.6)", "rgba(160,230,200,0.6)", "rgba(200,180,255,0.6)"][i]}
                        tapeWidth={52}
                        tapeLeft={`${20 + i * 25}%`}
                        tapeOffset={0}
                      >
                        <div className="p-4 sm:p-5 relative">
                          <RuledLines count={6} opacity={0.05} color={ACCENT} />
                          <div className="flex items-center gap-3 mb-3 relative z-[1]">
                            <img
                              src={rev.avatar}
                              alt={rev.name}
                              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                              style={{ border: `2px solid ${ACCENT}33` }}
                            />
                            <div>
                              <div className="font-['Fraunces',Georgia,serif] text-sm font-bold text-[#1A1410]">
                                {rev.name}
                              </div>
                              <Stars rating={rev.rating} size={11} />
                            </div>
                          </div>
                          <p className="font-['Lora',Georgia,serif] italic text-[clamp(12px,1.2vw,13.5px)] text-[#4a3f35] leading-relaxed relative z-[1]">
                            "{rev.text}"
                          </p>
                        </div>
                      </NotebookCard>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* ── RIGHT COLUMN (sticky card) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:sticky lg:top-6 h-fit"
            >
              <div className="relative">
                <div className="absolute -top-5 left-[55%] z-30">
                  <PaperClip rotation={14} color="#a0a8b8" />
                </div>
                <div
                  className="rounded-[4px] overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: `1.5px solid ${ACCENT}28`,
                    boxShadow: "3px 5px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.07)",
                    transform: "rotate(0.5deg)",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 26px, #dde8f020 26px, #dde8f020 27px)",
                  }}
                >
                  {/* Card image */}
                  <div className="relative overflow-hidden" style={{ height: 130 }}>
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover block" />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
                    />
                    <div className="absolute bottom-2 left-3 font-mono text-[8px] text-white/70 uppercase tracking-[0.14em]">
                      {course.courses} courses available
                    </div>
                    {/* Washi on card image */}
                    <div className="absolute -top-1.5 right-5">
                      <svg width="56" height="18" viewBox="0 0 56 18">
                        <defs>
                          <pattern id="wc" width="8" height="8" patternUnits="userSpaceOnUse">
                            <circle cx="4" cy="4" r="1.2" fill="rgba(255,255,255,0.35)" />
                          </pattern>
                        </defs>
                        <rect width="56" height="18" rx={2} fill="rgba(255,180,80,0.7)" />
                        <rect width="56" height="18" rx={2} fill="url(#wc)" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className="font-['Fraunces',Georgia,serif] font-black"
                          style={{ fontSize: "clamp(28px,3.5vw,38px)", color: ACCENT }}
                        >
                          ₹{course.price.toLocaleString()}
                        </span>
                        <span className="font-mono text-[10px] text-[#8C7F6E] line-through">
                          ₹{(course.price * 2.4).toFixed(0)}
                        </span>
                        <span className="bg-[#dcfce7] border border-[#86efac] text-[#166534] font-mono text-[8px] px-2 py-0.5 rounded tracking-[0.08em] font-bold">
                          58% OFF
                        </span>
                      </div>
                      <div className="font-['Caveat',cursive] text-[13px] text-red-600 mt-0.5">
                        ⚡ 2 days left at this price
                      </div>
                    </div>

                    {/* Enrol button */}
                    <motion.button
                      whileHover={{ scale: 1.03, rotate: -0.5 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setEnrolled(!enrolled)}
                      className="w-full py-3 rounded-sm font-bold text-white mb-2"
                      style={{
                        fontFamily: "Fraunces, Georgia, serif",
                        fontSize: 16,
                        backgroundColor: enrolled ? "#166534" : `linear-gradient(135deg, ${ACCENT}, #8B1527)`,
                        background: enrolled ? "#166534" : `linear-gradient(135deg, ${ACCENT}, #8B1527)`,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: enrolled
                          ? "2px 3px 10px rgba(22,101,52,0.35)"
                          : `2px 3px 10px ${ACCENT}45`,
                        transition: "background 0.3s, box-shadow 0.3s",
                      }}
                    >
                      {enrolled ? "✓ Enrolled!" : "Enrol Now →"}
                    </motion.button>

                    {/* Wishlist button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setWishlist(!wishlist)}
                      className="w-full py-2.5 rounded-sm mb-4 font-['Caveat',cursive] text-sm bg-transparent cursor-pointer transition-all duration-200"
                      style={{
                        border: `1.5px solid ${wishlist ? ACCENT : "#D4CCBA"}`,
                        color: wishlist ? ACCENT : "#8C7F6E",
                      }}
                    >
                      {wishlist ? "♥ Wishlisted" : "♡ Add to Wishlist"}
                    </motion.button>

                    <div className="h-px bg-[#E5DDD0] mb-4" />

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {data.features.map((f, i) => {
                        const noteColors = ["yellow", "blue", "green", "pink", "orange", "yellow"];
                        const pal = {
                          yellow: "#fef08a",
                          blue: "#93c5fd",
                          green: "#86efac",
                          pink: "#fda4af",
                          orange: "#fdba74",
                        };
                        return (
                          <div
                            key={f.label}
                            className="rounded-[3px] p-1.5"
                            style={{
                              backgroundColor: pal[noteColors[i]],
                              boxShadow: "1px 2px 5px rgba(0,0,0,0.1)",
                              transform: i % 2 === 0 ? "rotate(-0.6deg)" : "rotate(0.6deg)",
                            }}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13px]">{f.icon}</span>
                              <div>
                                <div className="font-['Fraunces',Georgia,serif] text-[10px] font-bold text-[#1A1410]">
                                  {f.label}
                                </div>
                                <div className="font-mono text-[8px] text-[#3D3428]">{f.val}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="h-px bg-[#E5DDD0] mb-4" />

                    {/* Instructor */}
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                          <svg width="36" height="14" viewBox="0 0 36 14">
                            <defs>
                              <pattern id="wi" width="7" height="7" patternUnits="userSpaceOnUse">
                                <circle cx="3.5" cy="3.5" r="1.1" fill="rgba(255,255,255,0.38)" />
                              </pattern>
                            </defs>
                            <rect width="36" height="14" rx={2} fill="rgba(255,200,80,0.7)" />
                            <rect width="36" height="14" rx={2} fill="url(#wi)" />
                          </svg>
                        </div>
                        <img
                          src={data.instructor.avatar}
                          alt={data.instructor.name}
                          className="w-12 h-12 rounded-full object-cover"
                          style={{ border: `2px solid ${ACCENT}44` }}
                        />
                      </div>
                      <div>
                        <div className="font-['Fraunces',Georgia,serif] text-sm font-bold text-[#1A1410]">
                          {data.instructor.name}
                        </div>
                        <div className="font-['Lora',Georgia,serif] italic text-[10px] text-[#8C7F6E]">
                          {data.instructor.title}
                        </div>
                        <div className="flex gap-3 mt-1">
                          {[
                            { val: data.instructor.students, label: "students" },
                            { val: data.instructor.courses, label: "courses" },
                          ].map((s) => (
                            <div key={s.label} className="flex gap-1 items-baseline">
                              <span className="font-mono text-[11px] font-bold" style={{ color: ACCENT }}>
                                {s.val}
                              </span>
                              <span className="font-mono text-[8px] text-[#8C7F6E]">{s.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating sticky notes */}
              <div className="flex gap-3 justify-center mt-5 flex-wrap">
                {[
                  { color: "green", num: "98%", label: "Pass Rate", rot: -3 },
                  { color: "yellow", num: "4.8★", label: "Rating", rot: 2 },
                  { color: "blue", num: "24/7", label: "Support", rot: -2 },
                ].map(({ color, num, label, rot }, i) => (
                  <StickyNote key={i} color={color} width={66} rotation={rot}>
                    <div className="font-['Caveat',cursive] text-center">
                      <div className="text-[17px] font-bold leading-none" style={{ color: ACCENT }}>
                        {num}
                      </div>
                      <div className="text-[11px] text-[#555] mt-0.5">{label}</div>
                    </div>
                  </StickyNote>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}