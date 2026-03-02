import React from "react";
import { motion } from "motion/react";

/* ================================
   FLOATING BUBBLE COMPONENT
================================ */
const Bubble = ({ style }) => (
  <motion.div
    style={{
      position: "absolute",
      width: style.size,
      height: style.size,
      borderRadius: "50%",
      background: style.fill,
      left: style.left,
      top: style.top,
      pointerEvents: "none",
      filter: "blur(0.5px)",
    }}
    animate={{
      y: ["0px", style.floatY || "-30px", "0px"],
      x: [0, style.floatX || 10, 0],
      opacity: [style.opacity || 0.4, (style.opacity || 0.4) + 0.15, style.opacity || 0.4],
      scale: [1, 1.08, 1],
    }}
    transition={{
      duration: style.dur || 6,
      repeat: Infinity,
      delay: style.delay || 0,
      ease: "easeInOut",
    }}
  />
);

const bubbles = [
  { size: "180px", fill: "rgba(153,230,220,0.25)", left: "5%", top: "10%", floatY: "-20px", floatX: 12, dur: 7, delay: 0, opacity: 0.5 },
  { size: "120px", fill: "rgba(94,210,200,0.2)", left: "80%", top: "5%", floatY: "-28px", floatX: -10, dur: 8, delay: 1, opacity: 0.4 },
  { size: "90px", fill: "rgba(200,245,242,0.5)", left: "60%", top: "70%", floatY: "-18px", floatX: 8, dur: 6, delay: 2, opacity: 0.5 },
  { size: "60px", fill: "rgba(49,196,190,0.18)", left: "20%", top: "75%", floatY: "-14px", floatX: -6, dur: 5, delay: 0.5, opacity: 0.45 },
  { size: "200px", fill: "rgba(178,238,234,0.18)", left: "40%", top: "50%", floatY: "-22px", floatX: 15, dur: 9, delay: 1.5, opacity: 0.3 },
  { size: "50px", fill: "rgba(94,210,200,0.3)", left: "88%", top: "60%", floatY: "-16px", floatX: -8, dur: 5.5, delay: 3, opacity: 0.45 },
];

/* ================================
   EDUCATION CARD DATA
================================ */
const cardsLeft = [
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", title: "Interactive Classes" },
  { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7", title: "Expert Teachers" },
];

const cardsRight = [
  { img: "https://images.unsplash.com/photo-1588072432836-e10032774350", title: "Online Learning" },
  { img: "https://images.unsplash.com/photo-1513258496099-48168024aec0", title: "Student Community" },
];

const smoothLeft = (delay = 0) => ({
  x: [-240, 0, -240],
  opacity: [0, 1, 0],
  transition: { duration: 7, repeat: Infinity, delay, ease: "easeInOut" },
});

const smoothRight = (delay = 0) => ({
  x: [240, 0, 240],
  opacity: [0, 1, 0],
  transition: { duration: 7.5, repeat: Infinity, delay, ease: "easeInOut" },
});

/* ================================
   HERO COMPONENT
================================ */
const Hero = () => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #f0fdfa 0%, #ffffff 35%, #f0fdfa 65%, #e6fffc 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* FLOATING BUBBLES */}
      {bubbles.map((b, i) => <Bubble key={i} style={b} />)}

      {/* BACKGROUND BLOBS */}
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #99f6e4, #ccfbf1)", top: "5%", left: "15%", opacity: 0.35 }} />
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #5eead4, #a7f3d0)", bottom: "8%", right: "12%", opacity: 0.25 }} />
      <div className="absolute w-48 h-48 rounded-full -z-10 blur-2xl"
        style={{ background: "#ccfbf1", top: "40%", right: "5%", opacity: 0.4 }} />

      {/* DECORATIVE WAVE TOP RIGHT */}
      <svg className="absolute top-0 right-0 pointer-events-none opacity-10 hidden md:block" width="420" height="300" viewBox="0 0 420 300">
        <path d="M420 0 C320 60, 200 40, 100 120 C50 160, 20 220, 0 300" stroke="#0d9488" strokeWidth="2" fill="none"/>
        <path d="M420 40 C340 90, 240 70, 150 150 C100 190, 60 240, 30 300" stroke="#14b8a6" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <circle cx="220" cy="100" r="6" fill="#5eead4" opacity="0.7"/>
        <circle cx="150" cy="155" r="4" fill="#14b8a6" opacity="0.6"/>
        <circle cx="320" cy="60" r="5" fill="#0d9488" opacity="0.5"/>
        <circle cx="100" cy="200" r="7" fill="#99f6e4" opacity="0.6"/>
      </svg>

      {/* DECORATIVE WAVE BOTTOM LEFT */}
      <svg className="absolute bottom-0 left-0 pointer-events-none opacity-10 hidden md:block" width="360" height="240" viewBox="0 0 360 240">
        <path d="M0 240 C80 160, 180 180, 260 100 C310 60, 340 30, 360 0" stroke="#0d9488" strokeWidth="2" fill="none"/>
        <circle cx="150" cy="160" r="6" fill="#5eead4" opacity="0.7"/>
        <circle cx="80" cy="200" r="4" fill="#14b8a6" opacity="0.6"/>
        <circle cx="260" cy="100" r="5" fill="#0d9488" opacity="0.5"/>
      </svg>

      {/* SUBTLE GRID PATTERN */}
      <div className="absolute inset-0 -z-10 opacity-5" style={{
        backgroundImage: "linear-gradient(#0d9488 1px, transparent 1px), linear-gradient(90deg, #0d9488 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div className="max-w-7xl mx-auto w-full relative py-20 md:py-28 px-4 sm:px-8 lg:px-12">

        {/* LEFT FLOATING CARDS */}
        <div className="hidden md:flex absolute left-0 top-16 lg:top-24 flex-col gap-6 lg:gap-10 z-10">
          {cardsLeft.map((card, i) => (
            <motion.div
              key={i}
              animate={smoothLeft(i * 2)}
              className="backdrop-blur-sm rounded-2xl p-3 lg:p-4 w-44 lg:w-60 shadow-lg border"
              style={{
                background: "rgba(255,255,255,0.92)",
                borderColor: "#5eead4",
                boxShadow: "0 8px 32px rgba(20,184,166,0.18)",
              }}
            >
              <img
                src={`${card.img}?auto=format&fit=crop&w=600&q=80`}
                className="rounded-xl w-full object-cover"
                style={{ height: "clamp(80px, 10vw, 140px)" }}
                alt={card.title}
              />
              <p className="mt-2 text-sm lg:text-base font-semibold" style={{ color: "#0f766e" }}>
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* RIGHT FLOATING CARDS */}
        <div className="hidden md:flex absolute right-0 bottom-16 lg:bottom-24 flex-col gap-6 lg:gap-10 z-10">
          {cardsRight.map((card, i) => (
            <motion.div
              key={i}
              animate={smoothRight(i * 2.5)}
              className="backdrop-blur-sm rounded-2xl p-3 lg:p-4 w-44 lg:w-60 shadow-lg border"
              style={{
                background: "rgba(255,255,255,0.92)",
                borderColor: "#5eead4",
                boxShadow: "0 8px 32px rgba(20,184,166,0.18)",
              }}
            >
              <img
                src={`${card.img}?auto=format&fit=crop&w=600&q=80`}
                className="rounded-xl w-full object-cover"
                style={{ height: "clamp(80px, 10vw, 140px)" }}
                alt={card.title}
              />
              <p className="mt-2 text-sm lg:text-base font-semibold" style={{ color: "#0f766e" }}>
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CENTER CONTENT */}
        <div className="text-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto relative z-20 px-2">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center mb-4"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #ccfbf1, #5eead4)", boxShadow: "0 4px 20px rgba(20,184,166,0.3)" }}>
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <path d="M4 10L16 4L28 10V22L16 28L4 22V10Z" stroke="#0d9488" strokeWidth="2" fill="rgba(255,255,255,0.6)"/>
                <path d="M16 4V28M4 10L28 22M28 10L4 22" stroke="#0d9488" strokeWidth="1.5" opacity="0.5"/>
                <circle cx="16" cy="16" r="4" fill="#14b8a6"/>
              </svg>
            </div>
          </motion.div>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-semibold text-xs sm:text-sm tracking-widest uppercase"
            style={{ color: "#0d9488", letterSpacing: "0.16em" }}
          >
            ✦ Perfect for Education Platforms ✦
          </motion.p>

          <motion.h1
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold mt-3 leading-none"
            style={{
              fontSize: "clamp(3rem, 10vw, 5.5rem)",
              color: "#0f4c45",
              textShadow: "0 2px 24px rgba(20,184,166,0.18)",
            }}
          >
            Esperly
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-4 mb-4 rounded-full"
            style={{ height: "2px", width: "80px", background: "linear-gradient(90deg, transparent, #14b8a6, transparent)" }}
          />

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed"
            style={{ color: "#0f766e" }}
          >
            Learn from experts with modern online courses<br className="hidden sm:block" /> designed for the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button
              className="px-7 py-3 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                boxShadow: "0 4px 24px rgba(20,184,166,0.4)",
              }}
            >
              Explore Courses
            </button>
            <button
              className="px-7 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 border-2 hover:scale-105 active:scale-95 bg-white"
              style={{ borderColor: "#14b8a6", color: "#0d9488" }}
            >
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex justify-center gap-6 sm:gap-10"
          >
            {[["10K+", "Students"], ["500+", "Courses"], ["50+", "Experts"]].map(([num, label], i) => (
              <div key={i} className="text-center">
                <div className="font-bold text-xl sm:text-2xl" style={{ color: "#0d9488" }}>{num}</div>
                <div className="text-xs sm:text-sm mt-0.5" style={{ color: "#0f766e", opacity: 0.7 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* MOBILE CARDS GRID */}
        <div className="md:hidden mt-12 grid grid-cols-2 gap-3 px-1">
          {[...cardsLeft, ...cardsRight].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="rounded-2xl p-2.5 border bg-white"
              style={{
                borderColor: "#5eead4",
                boxShadow: "0 4px 16px rgba(20,184,166,0.15)",
              }}
            >
              <img
                src={`${card.img}?auto=format&fit=crop&w=400&q=80`}
                className="rounded-xl w-full h-24 object-cover"
                alt={card.title}
              />
              <p className="mt-2 text-xs font-semibold text-center" style={{ color: "#0f766e" }}>
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;