import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";

const FLIP_MS = 700;
const AUTO_INTERVAL = 5000;

/* ─── IMAGE MAPS ─────────────────────────────────────────────── */
const chapterImages = {
  // Chapter 01 & 06 – intro/closing
  intro: "/logo1.png",   // open book
  closing: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80", // graduation

  // Left-page icon sets
  ch02: [
    { img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&q=75", label: "School" },
    { img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&q=75", label: "Textbooks" },
    { img: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=200&q=75", label: "Learning" },
    { img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=200&q=75", label: "Achievement" },
    { img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&q=75", label: "Elementary" },
    { img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&q=75", label: "Math" },
    { img: "https://images.unsplash.com/photo-1532094349884-543559b2a2cb?w=200&q=75", label: "Science" },
    { img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&q=75", label: "Writing" },
  ],
  ch03: [
    { img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200&q=75", label: "Abacus" },
    { img: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=200&q=75", label: "Speaking" },
    { img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=200&q=75", label: "Phonics" },
    { img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=200&q=75", label: "Mental Math" },
    { img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=75", label: "Communication" },
    { img: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=200&q=75", label: "Grammar" },
    { img: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=200&q=75", label: "Confidence" },
    { img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=75", label: "Skills" },
  ],
  ch04: [
    { img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&q=75", label: "Dance" },
    { img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=75", label: "Drawing" },
    { img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&q=75", label: "Singing" },
    { img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=200&q=75", label: "Yoga" },
    { img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&q=75", label: "Zumba" },
    { img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&q=75", label: "Painting" },
    { img: "https://images.unsplash.com/photo-1499540633125-484965b60031?w=200&q=75", label: "Creativity" },
    { img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=75", label: "Wellness" },
  ],
  ch05: [
    { img: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=200&q=75", label: "Hindi" },
    { img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&q=75", label: "English" },
    { img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=75", label: "Tamil" },
    { img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&q=75", label: "Telugu" },
    { img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=200&q=75", label: "Kannada" },
    { img: "https://images.unsplash.com/photo-1549732565-d673b928da7f?w=200&q=75", label: "French" },
    { img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=200&q=75", label: "German" },
    { img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&q=75", label: "Spanish" },
  ],
};

/* ─── PAGE DATA ─────────────────────────────────────────────── */
const chapters = [
  {
    number: "01",
    accent: "#EB6664",
    pageColor: "#FFF8F5",
    showLeftContent: false,
    rightContent: { type: "intro" },
  },
  {
    number: "02",
    accent: "#3B6FA0",
    pageColor: "#F5FAFF",
    showLeftContent: true,
    leftIcons: chapterImages.ch02,
    rightContent: { type: "tuition" },
  },
  {
    number: "03",
    accent: "#2E7D52",
    pageColor: "#F5FFF5",
    showLeftContent: true,
    leftIcons: chapterImages.ch03,
    rightContent: { type: "shortcourses" },
  },
  {
    number: "04",
    accent: "#C05A1A",
    pageColor: "#FFF8F0",
    showLeftContent: true,
    leftIcons: chapterImages.ch04,
    rightContent: { type: "boosters" },
  },
  {
    number: "05",
    accent: "#7B3FA0",
    pageColor: "#FDF5FF",
    showLeftContent: true,
    leftIcons: chapterImages.ch05,
    rightContent: { type: "languages" },
  },
  {
    number: "06",
    accent: "#EB6664",
    pageColor: "#FFF8F5",
    showLeftContent: false,
    rightContent: { type: "closing" },
  },
];

/* ─── SHARED DECORATIVE COMPONENTS ──────────────────────────── */
const WashiTape = ({ rotate = -2, color = "rgba(200,195,170,0.55)", width = 52 }) => (
  <div
    className="absolute -top-2 left-1/2 h-4 pointer-events-none z-20 border-l border-r"
    style={{
      width,
      background: color,
      borderColor: "rgba(180,170,140,0.3)",
      transform: `translateX(-50%) rotate(${rotate}deg)`,
    }}
  />
);

const ScribbleUnderline = ({ color = "#EB6664", className = "" }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={`h-3 block ${className}`}>
    <path d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Highlight = ({ children, color = "#FFEB3B" }) => (
  <span style={{ background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)` }} className="pb-0.5">
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
    <rect x="153" y="8" width="8" height="20" fill="#8C7B6B" stroke="#BDBDBD" strokeWidth="0.5" />
    <polygon points="20,8 20,28 2,18" fill="#E8C06A" />
    <polygon points="6,12 6,24 2,18" fill="#2A1F0E" />
    <line x1="20" y1="8" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8" />
    <line x1="20" y1="28" x2="2" y2="18" stroke="#C8A820" strokeWidth="0.8" />
    <text x="70" y="22" fontFamily="monospace" fontSize="7" fill="#C8A820" opacity="0.7">ESPERLY No.2</text>
  </svg>
);

/* ─── RIGHT PAGE CONTENT RENDERER ───────────────────────────── */
const RightPageInner = ({ ch }) => {
  const { rightContent, accent, number } = ch;
  const type = rightContent.type;

  if (type === "intro") {
    return (
      <div className="h-full flex flex-col justify-center relative" style={{ paddingLeft: "clamp(50px,7vw,90px)", paddingRight: "clamp(20px,3vw,40px)" }}>
        <div className="relative z-10">
          <div className="font-mono uppercase tracking-widest mb-3 text-[8px] sm:text-[9px] md:text-[10px] text-[#7A6E5A]">
            Welcome · Esperly
          </div>
          <h2 className="font-['Fraunces',Georgia,serif] font-black text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] text-[#1C1209] leading-relaxed mb-2.5">
            Our structured, personalized online tuition for Classes 1 to 12 is designed to help every learner succeed.
          </h2>
          <ScribbleUnderline color={accent} className="w-4/5 mb-3.5" />
          {[
            "1:1 learning, fully personalized",
            "Handpicked expert educators",
            "Flexible schedules that fit your routine",
            "Engaging, student-focused sessions",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-1.5 font-['Georgia',serif] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11.5px] text-[#1C1209] leading-[1.5] mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: accent }} />
              <span>{item}</span>
            </div>
          ))}
          <div className="mt-3.5 p-2 md:p-2.5 rounded-md border-[1.5px]" style={{ background: `${accent}10`, borderColor: `${accent}30` }}>
            <div className="font-['Fraunces',Georgia,serif] font-bold text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] mb-1" style={{ color: accent }}>
              One Platform. All Boards.
            </div>
            <div className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-[#7A6E5A] leading-relaxed">
              CBSE • ICSE • IGCSE • State • International Baccalaureate (IB)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "tuition") {
    const levels = [
      {
        label: "Elementary Level (Class 1–5)",
        items: ["Building a strong foundation in basics", "Focus on reading, writing, and concept understanding"],
      },
      {
        label: "Middle Level (Class 6–8)",
        items: ["Strengthening concepts across core subjects", "Gradual academic progression with clarity"],
      },
      {
        label: "Secondary Level (Class 9–12)",
        items: ["In-depth subject learning and mastery", "Focused exam preparation and performance"],
      },
    ];
    return (
      <div className="h-full flex flex-col justify-center relative" style={{ paddingLeft: "clamp(50px,7vw,90px)", paddingRight: "clamp(20px,3vw,40px)", paddingTop: "clamp(16px,2vw,24px)", paddingBottom: "clamp(16px,2vw,24px)" }}>
        <div className="relative z-10">
          <div className="font-mono uppercase tracking-widest mb-2 text-[8px] sm:text-[9px] md:text-[10px] text-[#7A6E5A]">Chapter 02</div>
          <h3 className="font-['Fraunces',Georgia,serif] font-black text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#1C1209] mb-2">
            School Tuition Programs
          </h3>
          <ScribbleUnderline color={accent} className="w-[70%] mb-3" />
          {levels.map((lvl, li) => (
            <div key={li} className="mb-2.5">
              <div className="font-['Fraunces',Georgia,serif] font-bold text-[10px] sm:text-[11px] md:text-[12px] lg:text-[12.5px] mb-1" style={{ color: accent }}>
                {lvl.label}
              </div>
              {lvl.items.map((item, i) => (
                <div key={i} className="flex items-start gap-1.5 font-['Georgia',serif] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11.5px] text-[#1C1209] leading-[1.5] mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: accent }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "shortcourses") {
    const courses = ["Abacus", "Phonics", "Public Speaking", "Personality Development", "Vedic Maths", "English Grammar"];
    return (
      <div className="h-full flex flex-col justify-center relative" style={{ paddingLeft: "clamp(50px,7vw,90px)", paddingRight: "clamp(20px,3vw,40px)", paddingTop: "clamp(16px,2vw,24px)", paddingBottom: "clamp(16px,2vw,24px)" }}>
        <div className="relative z-10">
          <div className="font-mono uppercase tracking-widest mb-2 text-[8px] sm:text-[9px] md:text-[10px] text-[#7A6E5A]">Chapter 03</div>
          <h3 className="font-['Fraunces',Georgia,serif] font-black text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#1C1209] mb-1">
            Short-Term Courses
          </h3>
          <div className="font-['Georgia',serif] italic text-[9px] sm:text-[10px] md:text-[11px] mb-2" style={{ color: accent }}>
            Skill-Based Learning
          </div>
          <ScribbleUnderline color={accent} className="w-[70%] mb-2.5" />
          <p className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-[#7A6E5A] mb-2 leading-relaxed">
            We offer focused short-term courses to enhance essential skills:
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {courses.map((c, i) => (
              <div key={i} className="flex items-start gap-1.5 font-['Georgia',serif] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11.5px] text-[#1C1209] leading-[1.5]">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: accent }} />
                <span>{c}</span>
              </div>
            ))}
          </div>
          <p className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-[#7A6E5A] mt-2.5 leading-relaxed">
            These courses help students build confidence and practical abilities.
          </p>
        </div>
      </div>
    );
  }

  if (type === "boosters") {
    const activities = ["Dance", "Drawing", "Singing", "Yoga", "Zumba", "Painting"];
    return (
      <div className="h-full flex flex-col justify-center relative" style={{ paddingLeft: "clamp(50px,7vw,90px)", paddingRight: "clamp(20px,3vw,40px)", paddingTop: "clamp(16px,2vw,24px)", paddingBottom: "clamp(16px,2vw,24px)" }}>
        <div className="relative z-10">
          <div className="font-mono uppercase tracking-widest mb-2 text-[8px] sm:text-[9px] md:text-[10px] text-[#7A6E5A]">Chapter 04</div>
          <h3 className="font-['Fraunces',Georgia,serif] font-black text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#1C1209] mb-1">
            Learning Boosters
          </h3>
          <div className="font-['Georgia',serif] italic text-[9px] sm:text-[10px] md:text-[11px] mb-2" style={{ color: accent }}>
            Creative & Activity-Based Programs
          </div>
          <ScribbleUnderline color={accent} className="w-[70%] mb-2.5" />
          <p className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-[#7A6E5A] mb-2 leading-relaxed">
            To support overall growth, we provide:
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-1.5 font-['Georgia',serif] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11.5px] text-[#1C1209] leading-[1.5]">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: accent }} />
                <span>{a}</span>
              </div>
            ))}
          </div>
          <p className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-[#7A6E5A] mt-2.5 leading-relaxed">
            These activities help in creativity, expression, and physical well-being.
          </p>
        </div>
      </div>
    );
  }

  if (type === "languages") {
    const langs = ["Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "French", "German", "Spanish", "Sanskrit"];
    return (
      <div className="h-full flex flex-col justify-center relative" style={{ paddingLeft: "clamp(50px,7vw,90px)", paddingRight: "clamp(20px,3vw,40px)", paddingTop: "clamp(16px,2vw,24px)", paddingBottom: "clamp(16px,2vw,24px)" }}>
        <div className="relative z-10">
          <div className="font-mono uppercase tracking-widest mb-2 text-[8px] sm:text-[9px] md:text-[10px] text-[#7A6E5A]">Chapter 05</div>
          <h3 className="font-['Fraunces',Georgia,serif] font-black text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#1C1209] mb-1">
            Language Tracks
          </h3>
          <div className="font-['Georgia',serif] italic text-[9px] sm:text-[10px] md:text-[11px] mb-2" style={{ color: accent }}>
            Multi-Language Learning
          </div>
          <ScribbleUnderline color={accent} className="w-[70%] mb-2.5" />
          <p className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-[#7A6E5A] mb-2 leading-relaxed">
            Students can learn and improve communication skills in:
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {langs.map((l, i) => (
              <div key={i} className="flex items-start gap-1.5 font-['Georgia',serif] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11.5px] text-[#1C1209] leading-[1.5]">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: accent }} />
                <span>{l}</span>
              </div>
            ))}
          </div>
          <p className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-[#7A6E5A] mt-2.5 leading-relaxed">
            Focus is on speaking, reading, and writing skills.
          </p>
        </div>
      </div>
    );
  }

  if (type === "closing") {
    return (
      <div className="h-full flex flex-col justify-center items-center text-center relative" style={{ paddingLeft: "clamp(50px,7vw,90px)", paddingRight: "clamp(20px,3vw,40px)" }}>
        <div className="relative z-10 w-full">
          <div className="font-mono uppercase tracking-widest mb-4 text-[8px] sm:text-[9px] md:text-[10px] text-[#7A6E5A]">
            Chapter 06 · Final
          </div>
          {/* Graduation image replacing emoji */}
          <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden mx-auto mb-2.5 border-2" style={{ borderColor: `${accent}40` }}>
            <img
              src={chapterImages.closing}
              alt="Graduation"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-['Fraunces',Georgia,serif] font-black text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] text-[#1C1209] leading-relaxed mb-2">
            Complete Learning Solution
          </h3>
          <ScribbleUnderline color={accent} className="w-[70%] mx-auto mb-3.5" />
          <p className="font-['Georgia',serif] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] text-[#7A6E5A] leading-relaxed mb-3.5">
            From academics to skills and creativity, we offer a complete learning platform for every student.
          </p>
          <div className="flex gap-2 flex-wrap justify-center mb-4">
            {["Structured Learning", "Expert Guidance", "Flexible Classes"].map((tag, i) => (
              <span
                key={i}
                className="font-['Georgia',serif] text-[8px] sm:text-[9px] md:text-[10px] rounded py-0.5 px-2 border-[1.5px]"
                style={{ color: accent, background: `${accent}12`, borderColor: `${accent}30` }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="font-['Fraunces',Georgia,serif] font-bold italic text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px]" style={{ color: accent }}>
            Start your learning journey with us today.
          </div>
        </div>
      </div>
    );
  }

  return null;
};

/* ─── LEFT PAGE CONTENT ──────────────────────────────────────── */
const LeftPageContent = ({ ch }) => {
  if (!ch.showLeftContent) {
    return (
      <div className="w-full h-full relative overflow-hidden flex justify-center items-center" style={{ background: ch.pageColor }}>
        <div>
          <WashiTape rotate={-1} color="rgba(255,200,80,0.65)" width={64} />
          <div
            className="absolute bottom-2 right-3 select-none pointer-events-none leading-none font-['Fraunces',Georgia,serif] font-black opacity-6"
            style={{ fontSize: "clamp(60px,8vw,100px)", color: ch.accent }}
          >
            {ch.number}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center relative z-10">
            {/* Book image replacing 📖 emoji */}
            <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden mb-2 " >
              <img
                src={chapterImages.intro}
                alt="Learning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-['Fraunces',Georgia,serif] font-black tracking-wider text-[16px] sm:text-[18px] md:text-[20px] lg:text-[23px] xl:text-[26px]" style={{ color: ch.accent }}>
              Esperly
            </div>
            <ScribbleUnderline color={ch.accent} className="w-20 mt-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-6 relative overflow-hidden" style={{ background: ch.pageColor }}>
      <WashiTape rotate={-1} color="rgba(255,200,80,0.65)" width={64} />
      <div
        className="absolute bottom-2 right-3 select-none pointer-events-none leading-none font-['Fraunces',Georgia,serif] font-black opacity-6"
        style={{ fontSize: "clamp(60px,8vw,100px)", color: ch.accent }}
      >
        {ch.number}
      </div>

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-3 px-2 sm:px-4 md:px-5">
          {ch.leftIcons.map((icon, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 p-2 sm:p-2.5 rounded-lg border"
              style={{ background: `${ch.accent}08`, borderColor: `${ch.accent}18` }}
            >
              {/* Image replacing emoji */}
              <div
                className="rounded-md overflow-hidden flex-shrink-0"
                style={{
                  width: "clamp(28px, 4vw, 48px)",
                  height: "clamp(28px, 4vw, 48px)",
                }}
              >
                <img
                  src={icon.img}
                  alt={icon.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span
                className="font-['Georgia',serif] font-bold tracking-wider text-[7px] sm:text-[8px] md:text-[9px]"
                style={{ color: ch.accent }}
              >
                {icon.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── RIGHT PAGE WRAPPER ─────────────────────────────────────── */
const RightPageContent = ({ ch }) => (
  <div className="w-full h-full relative overflow-hidden bg-[#FBF7F2]">
    <div className="absolute -top-2 right-10">
      <WashiTape rotate={2} color="rgba(160,200,255,0.5)" width={52} />
    </div>
    <RightPageInner ch={ch} />
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 border-t border-[#D6CEBA]" style={{ paddingLeft: "clamp(50px,7vw,90px)", paddingRight: "clamp(20px,3vw,40px)" }}>
      <span className="font-mono tracking-widest text-[9px] text-[#7A6E5A]">ESPERLY</span>
      <span className="font-['Georgia',serif] text-[10px] text-[#7A6E5A] italic">
        pg. {ch.number}
      </span>
    </div>
  </div>
);

/* ─── BOOK SPINE ─────────────────────────────────────────────── */
const Spine = ({ ch }) => {
  const subjects = ["Welcome", "Tuition Programs", "Short Courses", "Activity Boosters", "Language Tracks", "Complete Solution"];
  const label = subjects[parseInt(ch.number, 10) - 1] || "Esperly";
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${ch.accent}ee 0%, ${ch.accent}aa 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.12) 100%)" }}
      />
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="relative z-10 rounded-full my-0.5"
          style={{
            width: 7, height: 7,
            background: "rgba(0,0,0,0.35)",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.2)",
          }}
        />
      ))}
      <span
        className="relative z-10 uppercase overflow-hidden whitespace-nowrap font-['Fraunces',Georgia,serif] font-black text-white/85 tracking-[0.18em]"
        style={{
          fontSize: 9,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          maxHeight: 140,
        }}
      >
        {label}
      </span>
      <span
        className="relative z-10 font-mono text-white/50 tracking-[0.12em]"
        style={{
          fontSize: 8,
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        {ch.number}
      </span>
    </div>
  );
};

/* ─── DESKTOP BOOK ───────────────────────────────────────────── */
const DesktopBook = ({ cur, nxt, isFlipping, flipDir, flipAngle, onPrev, onNext }) => {
  const ch = chapters[cur];
  const chNext = chapters[nxt];

  return (
    <div className="flex items-center justify-center gap-4 lg:gap-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        disabled={isFlipping}
        className="flex-shrink-0 flex items-center justify-center rounded-full text-lg disabled:opacity-40 transition-shadow w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[46px] md:h-[46px] lg:w-[48px] lg:h-[48px] xl:w-[52px] xl:h-[52px]"
        style={{
          background: "#FBF7F2",
          border: "1.5px solid #D6CEBA",
          color: "#1C1209",
          boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
          fontFamily: "Georgia, serif",
        }}
      >
        ←
      </motion.button>

      <div className="relative w-[360px] h-[320px] sm:w-[500px] sm:h-[380px] md:w-[650px] md:h-[420px] lg:w-[800px] lg:h-[480px] xl:w-[980px] xl:h-[560px]">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: -20,
            left: "6%",
            right: "6%",
            height: 28,
            background: "rgba(0,0,0,0.14)",
            filter: "blur(16px)",
            zIndex: 0,
          }}
        />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-md"
            style={{
              bottom: -(i + 1) * 2,
              left: `calc(clamp(20px,2.5vw,32px) + ${i * 0.6}px)`,
              right: -(i * 0.6),
              height: "100%",
              background: i % 2 === 0 ? "#EDE8DE" : "#E3DDD2",
              zIndex: -i - 1,
            }}
          />
        ))}
        <div
          className="relative w-full h-full flex rounded-md overflow-visible z-10"
          style={{ boxShadow: "0 16px 56px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <div
            className="flex-shrink-0 rounded-l-md overflow-hidden relative z-10 w-[22px] sm:w-[26px] md:w-[30px] lg:w-[32px] xl:w-[36px]"
            style={{ boxShadow: "inset -4px 0 12px rgba(0,0,0,0.22)" }}
          >
            <Spine ch={ch} />
          </div>

          {/* Left page */}
          <div className="flex-1 relative overflow-hidden border-r z-10 border-[#D6CEBA]">
            <div
              className="absolute inset-0"
              style={{
                opacity: isFlipping
                  ? flipDir === "forward"
                    ? Math.min(Math.abs(flipAngle) / 90, 1)
                    : Math.min(flipAngle / 90, 1)
                  : 0,
              }}
            >
              <LeftPageContent ch={isFlipping ? chNext : ch} />
            </div>
            <div
              className="absolute inset-0"
              style={{
                opacity: isFlipping
                  ? flipDir === "forward"
                    ? Math.max(1 - Math.abs(flipAngle) / 90, 0)
                    : Math.max(1 - flipAngle / 90, 0)
                  : 1,
              }}
            >
              <LeftPageContent ch={ch} />
            </div>
            <div
              className="absolute top-0 bottom-0 right-0 w-5 pointer-events-none z-10"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.04))" }}
            />
          </div>

          {/* Right page + flip */}
          <div className="flex-1 relative overflow-visible z-20" style={{ perspective: 1800 }}>
            <div className="absolute inset-0 z-0 rounded-r-md overflow-hidden">
              {isFlipping && flipDir === "forward" && <RightPageContent ch={chNext} />}
              {isFlipping && flipDir === "backward" && <RightPageContent ch={ch} />}
              {!isFlipping && <RightPageContent ch={ch} />}
            </div>

            {isFlipping && (
              <div
                className="absolute inset-0 z-20"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "0% 50%",
                  transform: `rotateY(${flipAngle}deg)`,
                  filter: `drop-shadow(${Math.abs(flipAngle) > 10 && Math.abs(flipAngle) < 170
                    ? `${flipDir === "forward" ? "-6px" : "6px"} 0 18px rgba(0,0,0,${0.08 + 0.2 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)})`
                    : "none"
                    })`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div
                    className="absolute top-0 bottom-0 right-0 pointer-events-none z-10"
                    style={{ width: "18%", background: `linear-gradient(90deg, transparent, rgba(0,0,0,${0.03 + 0.14 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)}))` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 left-0 pointer-events-none z-10"
                    style={{ width: "14%", background: `linear-gradient(270deg, transparent, rgba(255,255,255,${0.06 + 0.16 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)}))` }}
                  />
                  {flipDir === "forward" ? <RightPageContent ch={ch} /> : <RightPageContent ch={chNext} />}
                </div>
                <div
                  className="absolute inset-0 rounded-r-md overflow-hidden"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 pointer-events-none z-10"
                    style={{ width: "22%", background: `linear-gradient(270deg, transparent, rgba(0,0,0,${0.04 + 0.15 * Math.sin((Math.abs(flipAngle) / 180) * Math.PI)}))` }}
                  />
                  {flipDir === "forward" ? <LeftPageContent ch={chNext} /> : <LeftPageContent ch={ch} />}
                </div>
              </div>
            )}

            <div
              className="absolute top-0 bottom-0 left-0 w-5 pointer-events-none z-30 rounded-r-md"
              style={{ background: "linear-gradient(270deg, transparent, rgba(0,0,0,0.04))" }}
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        disabled={isFlipping}
        className="flex-shrink-0 flex items-center justify-center rounded-full text-lg disabled:opacity-40 w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[46px] md:h-[46px] lg:w-[48px] lg:h-[48px] xl:w-[52px] xl:h-[52px]"
        style={{
          background: "#FBF7F2",
          border: "1.5px solid #D6CEBA",
          color: "#1C1209",
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
    setFlipped((f) => !f);
    setTimeout(() => setAnim(false), FLIP_MS);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[500px]" style={{ perspective: 1400 }}>
      <div
        className="w-full h-full relative cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: `transform ${FLIP_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
        onClick={toggle}
      >
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "4px 6px 24px rgba(0,0,0,0.15)",
          }}
        >
          <LeftPageContent ch={ch} />
          <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-[11px] text-[#7A6E5A]">
            Tap to see details →
          </div>
        </div>
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "4px 6px 24px rgba(0,0,0,0.15)",
          }}
        >
          <RightPageContent ch={ch} />
        </div>
      </div>

      <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
            setFlipped(false);
          }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
          style={{
            background: "#FBF7F2",
            border: "1.5px solid #D6CEBA",
            color: "#1C1209",
            boxShadow: "2px 3px 8px rgba(0,0,0,0.1)",
          }}
        >
          ←
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
            setFlipped(false);
          }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
          style={{
            background: "#FBF7F2",
            border: "1.5px solid #D6CEBA",
            color: "#1C1209",
            boxShadow: "2px 3px 8px rgba(0,0,0,0.1)",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};

/* ─── MAIN SECTION ───────────────────────────────────────────── */
const BookSection = () => {
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

  const runFlip = useCallback(
    (dir, targetIdx) => {
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
        setFlipAngle(target * ease);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setFlipAngle(0);
          setCur(targetIdx);
          setIsFlipping(false);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [isFlipping]
  );

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
    runFlip(i > cur ? "forward" : "backward", i);
    resetTimer();
  };

  const ch = chapters[cur];
  const pageLabels = ["Welcome", "Tuition Programs", "Short Courses", "Learning Boosters", "Language Tracks", "Complete Solution"];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Serif+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <section className="relative overflow-hidden py-10 px-4 sm:py-12 sm:px-5 md:py-14 md:px-6 bg-[#FBF7F2]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute rounded-full w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] blur-[80px] top-[10%] right-[5%]"
            style={{ background: "radial-gradient(circle, #EB666412, transparent)" }}
          />
          <div
            className="absolute rounded-full w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[200px] lg:h-[200px] blur-[60px] bottom-[15%] left-[8%]"
            style={{ background: "radial-gradient(circle, #3B6FA010, transparent)" }}
          />
        </div>

        <div className="absolute top-6 right-6 opacity-15 hidden sm:block" aria-hidden>
          <PencilSVG size={160} rotate={5} />
        </div>

        <svg className="absolute top-6 left-8 opacity-7 pointer-events-none hidden md:block" width="72" height="72" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" stroke="#EB6664" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
          <circle cx="40" cy="40" r="18" stroke="#EB6664" strokeWidth="1" fill="none" />
          <line x1="10" y1="40" x2="70" y2="40" stroke="#EB6664" strokeWidth="1" opacity="0.5" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="#EB6664" strokeWidth="1" opacity="0.5" />
        </svg>
        <svg className="absolute bottom-8 right-8 opacity-7 pointer-events-none hidden md:block" width="60" height="60" viewBox="0 0 64 64">
          <rect x="6" y="6" width="52" height="52" rx="4" stroke="#EB6664" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <rect x="18" y="18" width="28" height="28" rx="2" stroke="#EB6664" strokeWidth="1" fill="none" />
          <circle cx="32" cy="32" r="6" fill="#EB6664" opacity="0.4" />
        </svg>

        <div className="absolute top-0 right-0 pointer-events-none opacity-15">
          <svg className="w-[120px] h-[80px] sm:w-[160px] sm:h-[110px] md:w-[220px] md:h-[150px] lg:w-[260px] lg:h-[180px] xl:w-[300px] xl:h-[200px]" viewBox="0 0 300 200">
            <path d="M300 0 C220 40, 140 30, 80 90 C40 130, 15 165, 0 200" stroke="#EB6664" strokeWidth="2" fill="none" />
            <circle cx="160" cy="70" r="5" fill="#EB6664" opacity="0.5" />
            <circle cx="100" cy="115" r="3" fill="#EB6664" opacity="0.4" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-[2]">
          <FadeUp>
            <p className="leading-relaxed font-bold mb-1 font-['DMSerifDisplay',Georgia,serif] text-2xl text-black">
              At{" "}
              <Highlight color="#FFEB3B">
                <span className="text-[#EB6664] italic">Esperly</span>
              </Highlight>
              , we unlock each child's true potential through{" "}
              <span className="italic">thoughtful</span> and guided learning.
            </p>
            <ScribbleUnderline color="#EB6664" className="w-[140px] sm:w-[220px] md:w-[280px] lg:w-[320px] mb-6 sm:mb-8 md:mb-10 lg:mb-12" />
          </FadeUp>

          {isMobile ? (
            <div className="mb-24">
              <MobileCard ch={ch} onNext={handleNext} onPrev={handlePrev} />
            </div>
          ) : (
            <DesktopBook
              cur={cur}
              nxt={nxt}
              isFlipping={isFlipping}
              flipDir={flipDir}
              flipAngle={flipAngle}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}

          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex gap-2 items-center">
              {chapters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className="rounded-full border-none outline-none cursor-pointer transition-all duration-300 h-2"
                  style={{
                    width: i === cur ? 28 : 8,
                    background: i === cur ? "#EB6664" : "#D6CEBA",
                  }}
                />
              ))}
            </div>
            <div className="font-mono uppercase tracking-[0.18em] text-[9px] sm:text-[10px] md:text-[11px] text-[#7A6E5A]">
              {pageLabels[cur]}
            </div>
            {!isMobile && (
              <div className="rounded-full overflow-hidden h-0.5 w-[100px] sm:w-[140px] md:w-[170px] lg:w-[200px] bg-[#D6CEBA]">
                <motion.div
                  key={cur}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #EB6664, #EB666488)" }}
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