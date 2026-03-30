import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ================================
   PAPER CLIP SVG
================================ */
const PaperClip = ({ rotation = 0, color = "#b0b8c8", scale = 1 }) => (
  <svg
    width={28 * scale}
    height={60 * scale}
    viewBox="0 0 28 60"
    fill="none"
    style={{ transform: `rotate(${rotation}deg)`, filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.2))" }}
  >
    <path
      d="M14 4 C7 4, 3 8, 3 14 L3 44 C3 52, 8 56, 14 56 C20 56, 25 52, 25 44 L25 18 C25 12, 21 8, 16 8 L14 8 C10 8, 7 11, 7 15 L7 42 C7 46, 10 49, 14 49 C18 49, 21 46, 21 42 L21 20"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ================================
   WASHI TAPE COMPONENT
================================ */
const WashiTape = ({ width = 80, rotation = -3, color = "rgba(255,180,100,0.55)", top, left, right, bottom, pattern = "dots" }) => {
  const patternEl = pattern === "dots"
    ? <pattern id={`p-${color.replace(/[^a-zA-Z0-9]/g, '')}`} width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="2" fill="rgba(255,255,255,0.4)" />
      </pattern>
    : <pattern id={`p-${color.replace(/[^a-zA-Z0-9]/g, '')}`} width="16" height="12" patternUnits="userSpaceOnUse">
        <line x1="0" y1="6" x2="16" y2="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <line x1="8" y1="0" x2="8" y2="12" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      </pattern>;
  return (
    <div className="absolute pointer-events-none z-10" style={{ top, left, right, bottom, transform: `rotate(${rotation}deg)` }}>
      <svg width={width} height={22} viewBox={`0 0 ${width} 22`}>
        <defs>{patternEl}</defs>
        <rect width={width} height={22} rx={2} fill={color} />
        <rect width={width} height={22} rx={2} fill={`url(#p-${color.replace(/[^a-zA-Z0-9]/g, '')})`} />
      </svg>
    </div>
  );
};

/* ================================
   STICKY NOTE COMPONENT
================================ */
const StickyNote = ({ color, width, rotation, children, style = {} }) => {
  const colors = {
    yellow: { bg: "bg-[#fef08a]", shadow: "rgba(234,179,8,0.3)", lines: "#e5c84a", fold: "#e5c84a" },
    pink: { bg: "bg-[#fda4af]", shadow: "rgba(244,63,94,0.25)", lines: "#f472b6", fold: "#f472b6" },
    green: { bg: "bg-[#86efac]", shadow: "rgba(34,197,94,0.25)", lines: "#4ade80", fold: "#4ade80" },
    blue: { bg: "bg-[#93c5fd]", shadow: "rgba(59,130,246,0.25)", lines: "#60a5fa", fold: "#60a5fa" },
    orange: { bg: "bg-[#fdba74]", shadow: "rgba(249,115,22,0.25)", lines: "#fb923c", fold: "#fb923c" },
    purple: { bg: "bg-[#c4b5fd]", shadow: "rgba(139,92,246,0.25)", lines: "#a78bfa", fold: "#a78bfa" },
  };
  const c = colors[color] || colors.yellow;
  return (
    <motion.div
      className={`${c.bg} relative rounded-[3px]`}
      style={{
        width,
        padding: "10px 12px 14px",
        transform: `rotate(${rotation}deg)`,
        boxShadow: `2px 4px 14px ${c.shadow}, 0 1px 3px rgba(0,0,0,0.12)`,
        ...style,
      }}
      whileHover={{ rotate: rotation * 0.5, scale: 1.04, zIndex: 99 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Fold corner */}
      <div
        className="absolute bottom-0 right-0 w-[18px] h-[18px] rounded-br-[3px]"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${c.fold} 50%)`,
          opacity: 0.6,
        }}
      />
      {/* Lines on sticky */}
      <div
        className="absolute inset-0 rounded-[3px] overflow-hidden pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 18px, ${c.lines}55 18px, ${c.lines}55 19px)`,
          backgroundPositionY: "24px",
        }}
      />
      {children}
    </motion.div>
  );
};

/* ================================
   NOTEBOOK CARD COMPONENT
================================ */
const NotebookCard = ({ img, title, icon, color = "white", delay = 0, rotation = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ rotate: 0, y: -6, scale: 1.04, zIndex: 100 }}
      className="relative w-full cursor-pointer rounded-[4px]"
      style={{
        backgroundColor: color,
        padding: "10px 10px 12px",
        transform: `rotate(${rotation}deg)`,
        boxShadow: "3px 5px 18px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)",
      }}
      transition={{ type: "spring", stiffness: 250, delay, duration: 0.6 }}
    >
      {/* Top tape piece */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-4 rounded-[2px]"
        style={{
          background: "rgba(255,220,100,0.7)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 5px)",
        }}
      />
      <div className="relative">
        <img
          src={`${img}?auto=format&fit=crop&w=600&q=80`}
          className="w-full h-[90px] object-cover rounded-[2px] block"
          alt={title}
          loading="lazy"
        />
        <span className="absolute top-1 right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center text-[13px] shadow-md">
          {icon}
        </span>
      </div>
      <p className="mt-2 text-center font-['Caveat',cursive] text-sm font-bold text-[#A6192E] tracking-wide">
        {title}
      </p>
    </motion.div>
  );
};

/* ================================
   CARD DATA
================================ */
const cardsLeft = [
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", title: "Interactive Classes", icon: "🎓", rotation: -4 },
  { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7", title: "Expert Teachers", icon: "👨‍🏫", rotation: 3 },
  { img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", title: "Group Learning", icon: "👥", rotation: -2 },
];

const cardsRight = [
  { img: "https://images.unsplash.com/photo-1588072432836-e10032774350", title: "Online Learning", icon: "💻", rotation: 4 },
  { img: "https://images.unsplash.com/photo-1513258496099-48168024aec0", title: "Student Community", icon: "🤝", rotation: -3 },
  { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644", title: "Certification", icon: "📜", rotation: 2 },
];

/* ================================
   HERO COMPONENT
================================ */
const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.95, 0.85]);
  const leftCardsY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rightCardsY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const mobileCardsY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      {/* Google Font: Caveat for handwritten look */}
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />

      <section className="relative min-h-screen flex items-center overflow-hidden font-['Lato',sans-serif]"
        style={{
          background: "#fdf8f0",
          backgroundImage: `
            repeating-linear-gradient(
              transparent,
              transparent 27px,
              #c8d8e8 27px,
              #c8d8e8 28px
            )
          `,
          backgroundPositionY: "32px",
        }}
      >
        {/* === NOTEBOOK SPINE LEFT MARGIN === */}
        <div className="absolute left-0 top-0 bottom-0 w-[52px] z-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #e8d5c0 0%, #f0e0cc 60%, transparent 100%)",
          }}
        >
          {/* Spiral holes */}
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute left-4 w-4 h-4 rounded-full"
              style={{
                top: 36 + i * 48,
                background: "#d4c4b0",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(255,255,255,0.5)",
                border: "1px solid #c8b49a",
              }}
            />
          ))}
          {/* Red margin line */}
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#e8a0a8] opacity-70" />
        </div>

        {/* === THREE-RING BINDER HOLES === */}
        <div className="absolute left-7 top-0 bottom-0 flex flex-col justify-around z-[2] pointer-events-none">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-[22px] h-[22px] rounded-full"
              style={{
                background: "#c8b49a",
                boxShadow: "inset 0 3px 5px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.4)",
                border: "2px solid #b8a490",
              }}
            />
          ))}
        </div>

        {/* === BACKGROUND TEXTURE OVERLAY === */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2000&q=80")',
            }}
          />
        </motion.div>

        {/* === WASHI TAPE DECORATIONS === */}
        <WashiTape color="rgba(255,180,100,0.6)" width={100} rotation={-2} top={40} left={70} pattern="dots" />
        <WashiTape color="rgba(166,200,255,0.6)" width={80} rotation={3} top={80} right={60} pattern="grid" />
        <WashiTape color="rgba(200,255,160,0.6)" width={90} rotation={-1} bottom={100} left={80} pattern="dots" />
        <WashiTape color="rgba(255,150,180,0.55)" width={70} rotation={2} bottom={60} right={70} pattern="grid" />

        {/* === DOODLE DECORATIONS (SVG) === */}
        <svg className="absolute top-[60px] right-[120px] opacity-18 pointer-events-none z-[1] hidden lg:block" width="90" height="90" viewBox="0 0 90 90">
          <path d="M20 70 Q45 10, 70 70 Q45 90, 20 70Z" stroke="#A6192E" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <circle cx="45" cy="45" r="8" stroke="#A6192E" strokeWidth="1.5" fill="none" />
          <path d="M10 45 Q30 20, 50 45 Q70 70, 80 45" stroke="#A6192E" strokeWidth="1.5" fill="none" />
        </svg>

        <svg className="absolute bottom-[100px] left-[80px] opacity-14 pointer-events-none z-[1] hidden lg:block" width="70" height="70" viewBox="0 0 70 70">
          <rect x="10" y="10" width="50" height="50" rx="4" stroke="#4a7ab5" strokeWidth="2" fill="none" strokeDasharray="5 3" />
          <line x1="10" y1="35" x2="60" y2="35" stroke="#4a7ab5" strokeWidth="1.5" />
          <line x1="35" y1="10" x2="35" y2="60" stroke="#4a7ab5" strokeWidth="1.5" />
          <circle cx="35" cy="35" r="5" fill="#4a7ab5" opacity="0.5" />
        </svg>

        <svg className="absolute top-[160px] left-[90px] opacity-15 pointer-events-none z-[1] hidden lg:block" width="50" height="50" viewBox="0 0 50 50">
          <polygon points="25,5 45,45 5,45" stroke="#A6192E" strokeWidth="2" fill="none" />
          <polygon points="25,15 38,38 12,38" stroke="#A6192E" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>

        {/* === FLOATING STICKY NOTES BACKGROUND === */}
        <motion.div
          animate={{ rotate: [0, 1, -1, 0], y: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] right-[6%] z-[3] pointer-events-none hidden lg:block"
        >
          <StickyNote color="blue" width={100} rotation={5}>
            <p className="font-['Caveat',cursive] text-xs text-[#1e3a5f] leading-relaxed">
              📚 Today's<br />study plan
            </p>
          </StickyNote>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, -1, 1, 0], y: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[18%] right-[4%] z-[3] pointer-events-none hidden lg:block"
        >
          <StickyNote color="green" width={90} rotation={-6}>
            <p className="font-['Caveat',cursive] text-xs text-[#14532d] leading-relaxed">
              ✅ Complete<br />module 3!
            </p>
          </StickyNote>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 1, -0.5, 0], y: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] left-[5%] z-[3] pointer-events-none hidden lg:block"
        >
          <StickyNote color="orange" width={95} rotation={-7}>
            <p className="font-['Caveat',cursive] text-xs text-[#7c2d12] leading-relaxed">
              🎯 Goal: <br />600 courses!
            </p>
          </StickyNote>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, -1, 0.5, 0], y: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[22%] left-[6%] z-[3] pointer-events-none hidden lg:block"
        >
          <StickyNote color="purple" width={88} rotation={5}>
            <p className="font-['Caveat',cursive] text-xs text-[#3b1a6d] leading-relaxed">
              💡 Remember:<br />Practice daily!
            </p>
          </StickyNote>
        </motion.div>

        {/* === LEFT PHOTO CARDS === */}
        <motion.div
          style={{ y: leftCardsY }}
          className="absolute left-[66px] top-[10%] z-[8] hidden lg:flex flex-col gap-6"
        >
          {/* Paper clip on top card */}
          <div className="relative">
            <div className="absolute -top-[22px] left-[60%] z-20">
              <PaperClip rotation={15} color="#a0a8b8" />
            </div>
            <NotebookCard {...cardsLeft[0]} delay={0.3} color="white" />
          </div>
          <div className="relative">
            <div className="absolute -top-5 right-[20%] z-20">
              <PaperClip rotation={-10} color="#c0a880" />
            </div>
            <NotebookCard {...cardsLeft[1]} delay={0.5} color="#fffbf0" />
          </div>
          <div className="relative">
            <div className="absolute -top-[18px] left-[30%] z-20">
              <PaperClip rotation={5} color="#b8c0d0" />
            </div>
            <NotebookCard {...cardsLeft[2]} delay={0.7} color="white" />
          </div>
        </motion.div>

        {/* === RIGHT PHOTO CARDS === */}
        <motion.div
          style={{ y: rightCardsY }}
          className="absolute right-[66px] bottom-[8%] z-[8] hidden lg:flex flex-col gap-6"
        >
          <div className="relative">
            <div className="absolute -top-5 left-1/2 z-20">
              <PaperClip rotation={-12} color="#a8b8c0" />
            </div>
            <NotebookCard {...cardsRight[0]} delay={0.4} color="white" />
          </div>
          <div className="relative">
            <div className="absolute -top-[22px] right-[25%] z-20">
              <PaperClip rotation={8} color="#c8b090" />
            </div>
            <NotebookCard {...cardsRight[1]} delay={0.6} color="#f8fff4" />
          </div>
          <div className="relative">
            <div className="absolute -top-[19px] left-[40%] z-20">
              <PaperClip rotation={-6} color="#b0b8c8" />
            </div>
            <NotebookCard {...cardsRight[2]} delay={0.8} color="white" />
          </div>
        </motion.div>

        {/* === CENTER NOTEBOOK PAGE === */}
        <div className="max-w-7xl mx-auto w-full relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={heroRef}
            style={{ y: heroY, opacity: heroOpacity }}
            className="text-center max-w-[320px] sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto relative px-2"
          >
            {/* === MAIN NOTEBOOK PAGE CONTAINER === */}
            <div
              className="relative rounded-[4px] p-[40px_28px_44px] border border-[#e8dfd0]"
              style={{
                background: "#fef9f2",
                backgroundImage: `
                  repeating-linear-gradient(
                    transparent,
                    transparent 27px,
                    #dde8f0 27px,
                    #dde8f0 28px
                  ),
                  linear-gradient(90deg, transparent 48px, #f0a0a8 49px, #f0a0a8 50px, transparent 50px)
                `,
                boxShadow: "4px 6px 24px rgba(0,0,0,0.12), 2px 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {/* Top tape on main card */}
              <div
                className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[72px] h-6 rounded-[3px] z-20"
                style={{
                  background: "rgba(255,220,80,0.75)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.35) 5px, rgba(255,255,255,0.35) 6px)",
                }}
              />

              {/* Corner sticky note */}
              <div className="absolute -top-2 -right-2 z-20">
                <StickyNote color="pink" width={64} rotation={8}>
                  <p className="font-['Caveat',cursive] text-[11px] text-[#831843] text-center">
                    ⭐ 4.8
                  </p>
                </StickyNote>
              </div>

              {/* Logo icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
                className="flex justify-center mb-[14px]"
              >
                <div
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center border-3 border-white"
                  style={{
                    background: "linear-gradient(135deg, #A6192E, #8B1527)",
                    boxShadow: "0 3px 16px rgba(166,25,46,0.35), 0 1px 3px rgba(0,0,0,0.15)",
                  }}
                >
                  <span className="text-[22px]">📖</span>
                </div>
              </motion.div>

              {/* Handwritten label */}
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="font-['Caveat',cursive] text-[15px] text-[#A6192E] tracking-[0.08em] mb-1 opacity-85"
              >
                ✦ Excellence in Education ✦
              </motion.p>

              {/* Big title - handwritten */}
              <motion.h1
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-['Caveat',cursive] text-[clamp(3.2rem,9vw,6rem)] text-[#A6192E] leading-[1.05] mt-1 tracking-tight"
                style={{ textShadow: "1px 2px 0 rgba(166,25,46,0.12)" }}
              >
                Esperly
              </motion.h1>

              {/* Underline drawn effect */}
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                width="180" height="14" viewBox="0 0 180 14"
                className="block mx-auto my-[2px] mb-[14px]"
              >
                <motion.path
                  d="M4 8 Q50 4, 90 9 Q130 14, 176 6"
                  stroke="#A6192E"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                />
                <motion.path
                  d="M10 12 Q60 9, 100 12 Q140 15, 172 10"
                  stroke="#A6192E"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.75 }}
                />
              </motion.svg>

              {/* Description text */}
              <motion.p
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-['Caveat',cursive] text-[clamp(14px,2.5vw,18px)] text-[#4a3f35] leading-relaxed mb-5"
              >
                Learn from industry experts with modern online courses<br className="hidden sm:block" />designed for the future of education.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex gap-3 justify-center flex-wrap mb-[22px]"
              >
                <motion.button
                  whileHover={{ scale: 1.06, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-[4px] font-bold text-white border-none cursor-pointer font-['Caveat',cursive] text-base tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, #A6192E, #8B1527)",
                    boxShadow: "2px 3px 10px rgba(166,25,46,0.4), 0 1px 2px rgba(0,0,0,0.15)",
                  }}
                >
                  Explore Courses →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.06, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-[4px] font-bold text-[#A6192E] bg-white border-2 border-[#A6192E] cursor-pointer font-['Caveat',cursive] text-base tracking-wide"
                  style={{ boxShadow: "2px 3px 8px rgba(0,0,0,0.1)" }}
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Stats row - as mini sticky notes */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-2.5 flex-wrap"
              >
                {[
                  { num: "15K+", label: "Students", color: "yellow", rot: -2 },
                  { num: "600+", label: "Courses", color: "green", rot: 1.5 },
                  { num: "75+", label: "Experts", color: "blue", rot: -1 },
                  { num: "50+", label: "Countries", color: "orange", rot: 2 },
                ].map(({ num, label, color, rot }, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.75 + i * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                  >
                    <StickyNote color={color} width={62} rotation={rot} style={{ padding: "6px 8px 10px" }}>
                      <div className="font-['Caveat',cursive] text-center">
                        <div className="text-[18px] font-bold text-[#A6192E] leading-none">{num}</div>
                        <div className="text-[11px] text-[#555] mt-0.5">{label}</div>
                      </div>
                    </StickyNote>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust badges as tape labels */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex justify-center gap-2 mt-[18px] flex-wrap"
              >
                {["⭐ 4.8 Rating", "🏆 Award Winning", "📱 Mobile Ready"].map((badge, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.08 }}
                    className="px-3 py-[5px] text-[13px] font-['Caveat',cursive] rounded-[3px] cursor-default"
                    style={{
                      background: i === 0 ? "rgba(255,220,80,0.7)" : i === 1 ? "rgba(166,200,255,0.7)" : "rgba(200,255,160,0.7)",
                      color: "#3a3020",
                      boxShadow: "1px 2px 5px rgba(0,0,0,0.12)",
                      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 6px)",
                    }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>

              {/* Bottom corner fold */}
              <div
                className="absolute bottom-0 right-0 w-7 h-7"
                style={{ background: "linear-gradient(135deg, transparent 50%, #e8d8c0 50%)" }}
              />
            </div>

            {/* === MOBILE CARDS GRID === */}
            <motion.div
              style={{ y: mobileCardsY }}
              className="lg:hidden mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 px-1"
            >
              {[...cardsLeft, ...cardsRight].map((card, i) => (
                <div key={i} className="relative">
                  <div className="absolute -top-4 left-[40%] z-20">
                    <PaperClip rotation={i % 2 === 0 ? 8 : -8} color="#a0a8b8" scale={0.75} />
                  </div>
                  <NotebookCard
                    {...card}
                    delay={0.4 + i * 0.1}
                    color={i % 2 === 0 ? "white" : "#fefdf5"}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* === BOTTOM TORN PAPER EDGE === */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none">
          <svg width="100%" height="32" viewBox="0 0 1200 32" preserveAspectRatio="none">
            <path
              d="M0 32 L0 18 Q20 10 40 20 Q60 30 80 15 Q100 5 120 18 Q140 28 160 12 Q180 0 200 14 Q220 26 240 16 Q260 6 280 20 Q300 30 320 14 Q340 2 360 18 Q380 28 400 10 Q420 0 440 16 Q460 28 480 14 Q500 4 520 20 Q540 30 560 12 Q580 0 600 18 Q620 28 640 10 Q660 0 680 16 Q700 28 720 12 Q740 2 760 20 Q780 30 800 14 Q820 4 840 20 Q860 30 880 12 Q900 0 920 18 Q940 28 960 10 Q980 0 1000 16 Q1020 28 1040 12 Q1060 2 1080 18 Q1100 30 1120 14 Q1140 4 1160 20 Q1180 30 1200 16 L1200 32 Z"
              fill="#f5ede0"
              opacity="0.8"
            />
            <path
              d="M0 32 L0 22 Q30 16 60 24 Q90 30 120 20 Q150 12 180 24 Q210 30 240 18 Q270 8 300 22 Q330 30 360 18 Q390 8 420 22 Q450 32 480 20 Q510 10 540 24 Q570 32 600 20 Q630 10 660 24 Q690 32 720 20 Q750 10 780 24 Q810 30 840 18 Q870 8 900 22 Q930 32 960 18 Q990 8 1020 22 Q1050 32 1080 20 Q1110 10 1140 24 Q1170 32 1200 22 L1200 32 Z"
              fill="#ede0d0"
              opacity="0.6"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;