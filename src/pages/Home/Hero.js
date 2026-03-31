import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/* ================================
   PARALLAX COMPONENTS
================================ */
const ParallaxSection = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

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
      zIndex: 0,
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
  { size: "180px", fill: "rgba(166,25,46,0.12)", left: "5%", top: "10%", floatY: "-20px", floatX: 12, dur: 7, delay: 0, opacity: 0.5 },
  { size: "120px", fill: "rgba(166,25,46,0.08)", left: "80%", top: "5%", floatY: "-28px", floatX: -10, dur: 8, delay: 1, opacity: 0.4 },
  { size: "90px", fill: "rgba(166,25,46,0.15)", left: "60%", top: "70%", floatY: "-18px", floatX: 8, dur: 6, delay: 2, opacity: 0.5 },
  { size: "60px", fill: "rgba(166,25,46,0.1)", left: "20%", top: "75%", floatY: "-14px", floatX: -6, dur: 5, delay: 0.5, opacity: 0.45 },
  { size: "200px", fill: "rgba(166,25,46,0.05)", left: "40%", top: "50%", floatY: "-22px", floatX: 15, dur: 9, delay: 1.5, opacity: 0.3 },
  { size: "50px", fill: "rgba(166,25,46,0.12)", left: "88%", top: "60%", floatY: "-16px", floatX: -8, dur: 5.5, delay: 3, opacity: 0.45 },
  { size: "140px", fill: "rgba(166,25,46,0.07)", left: "15%", top: "85%", floatY: "-24px", floatX: -8, dur: 7.5, delay: 2.5, opacity: 0.35 },
  { size: "80px", fill: "rgba(166,25,46,0.09)", left: "70%", top: "30%", floatY: "-18px", floatX: 14, dur: 6.5, delay: 3.5, opacity: 0.4 },
];

/* ================================
   EDUCATION CARD DATA
================================ */
const cardsLeft = [
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", title: "Interactive Classes", icon: "🎓" },
  { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7", title: "Expert Teachers", icon: "👨‍🏫" },
  { img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", title: "Group Learning", icon: "👥" },
];

const cardsRight = [
  { img: "https://images.unsplash.com/photo-1588072432836-e10032774350", title: "Online Learning", icon: "💻" },
  { img: "https://images.unsplash.com/photo-1513258496099-48168024aec0", title: "Student Community", icon: "🤝" },
  { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644", title: "Certification", icon: "📜" },
];

const smoothLeft = (delay = 0) => ({
  x: [-200, 0, -200],
  opacity: [0, 1, 0],
  transition: { duration: 8, repeat: Infinity, delay, ease: "easeInOut" },
});

const smoothRight = (delay = 0) => ({
  x: [200, 0, 200],
  opacity: [0, 1, 0],
  transition: { duration: 8.5, repeat: Infinity, delay, ease: "easeInOut" },
});

/* ================================
   HERO COMPONENT
================================ */
const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();

  // All useTransform hooks must be called at the top level
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.9, 0.8]);

  // Background transforms
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgY4 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Floating cards transforms
  const leftCardsY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rightCardsY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Additional transforms for various elements
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const descriptionY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const trustBadgesY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const mobileCardsY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const waveY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const waveOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.3, 0.2]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.06]);

  // Stats transforms
  const statsY1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const statsY2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const statsY3 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const statsY4 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Wave transforms
  const topWaveX = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const topWaveRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const bottomWaveX = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const bottomWaveRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fff5f5 35%, #ffe5e5 65%, #ffffff 100%)",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* BACKGROUND IMAGE WITH PARALLAX */}
      <motion.div
        style={{ y: bgY1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>

      {/* FLOATING BUBBLES WITH PARALLAX - Different speeds */}
      <motion.div style={{ y: bgY2 }} className="absolute inset-0 pointer-events-none">
        {bubbles.slice(0, 3).map((b, i) => (
          <Bubble key={i} style={b} />
        ))}
      </motion.div>

      <motion.div style={{ y: bgY3 }} className="absolute inset-0 pointer-events-none">
        {bubbles.slice(3, 6).map((b, i) => (
          <Bubble key={i + 3} style={b} />
        ))}
      </motion.div>

      <motion.div style={{ y: bgY4 }} className="absolute inset-0 pointer-events-none">
        {bubbles.slice(6).map((b, i) => (
          <Bubble key={i + 6} style={b} />
        ))}
      </motion.div>

      {/* BACKGROUND BLOBS WITH PARALLAX - RED THEME */}
      <motion.div
        className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full -z-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #A6192E, #8B1527)",
          top: "5%",
          left: "15%",
          opacity: 0.15,
        }}
      />

      <motion.div
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full -z-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #A6192E, #7A1222)",
          bottom: "8%",
          right: "12%",
          opacity: 0.12,
        }}
      />

      <motion.div
        className="absolute w-48 h-48 rounded-full -z-10 blur-2xl"
        style={{
          background: "#A6192E",
          top: "40%",
          right: "5%",
          opacity: 0.1,
        }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full -z-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #A6192E, #8B1527)",
          bottom: "20%",
          left: "10%",
          opacity: 0.08,
        }}
      />

      {/* DECORATIVE WAVE TOP RIGHT WITH PARALLAX - RED */}
      <motion.div
        style={{ x: topWaveX, rotate: topWaveRotate }}
        className="absolute top-0 right-0 pointer-events-none z-0 hidden md:block"
      >
        <svg width="420" height="300" viewBox="0 0 420 300">
          <path d="M420 0 C320 60, 200 40, 100 120 C50 160, 20 220, 0 300" stroke="#A6192E" strokeWidth="2" fill="none" />
          <path d="M420 40 C340 90, 240 70, 150 150 C100 190, 60 240, 30 300" stroke="#8B1527" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="220" cy="100" r="6" fill="#A6192E" opacity="0.5" />
          <circle cx="150" cy="155" r="4" fill="#8B1527" opacity="0.4" />
          <circle cx="320" cy="60" r="5" fill="#7A1222" opacity="0.3" />
          <circle cx="100" cy="200" r="7" fill="#A6192E" opacity="0.4" />
        </svg>
      </motion.div>

      {/* DECORATIVE WAVE BOTTOM LEFT WITH PARALLAX - RED */}
      <motion.div
        style={{ x: bottomWaveX, rotate: bottomWaveRotate }}
        className="absolute bottom-0 left-0 pointer-events-none z-0 hidden md:block"
      >
        <svg width="360" height="240" viewBox="0 0 360 240">
          <path d="M0 240 C80 160, 180 180, 260 100 C310 60, 340 30, 360 0" stroke="#A6192E" strokeWidth="2" fill="none" />
          <circle cx="150" cy="160" r="6" fill="#A6192E" opacity="0.5" />
          <circle cx="80" cy="200" r="4" fill="#8B1527" opacity="0.4" />
          <circle cx="260" cy="100" r="5" fill="#7A1222" opacity="0.3" />
        </svg>
      </motion.div>

      {/* SUBTLE GRID PATTERN WITH PARALLAX - RED */}
      <motion.div
        style={{ y: bgY3, opacity: gridOpacity }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(#A6192E 1px, transparent 1px), linear-gradient(90deg, #A6192E 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.02
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 z-10">

        {/* LEFT FLOATING CARDS WITH PARALLAX - DESKTOP */}
        <motion.div
          style={{ y: leftCardsY }}
          className="hidden lg:flex absolute left-0 top-16 xl:top-24 flex-col gap-6 xl:gap-8 z-10"
        >
          {cardsLeft.map((card, i) => (
            <motion.div
              key={i}
              animate={smoothLeft(i * 2)}
              className="backdrop-blur-sm rounded-2xl p-3 xl:p-4 w-48 xl:w-56 shadow-xl border"
              style={{
                background: "rgba(255,255,255,0.95)",
                borderColor: "#A6192E",
                boxShadow: "0 8px 32px rgba(166,25,46,0.15)",
              }}
            >
              <div className="relative">
                <img
                  src={`${card.img}?auto=format&fit=crop&w=600&q=80`}
                  className="rounded-xl w-full object-cover"
                  style={{ height: "clamp(90px, 10vw, 130px)" }}
                  alt={card.title}
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 text-xl bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  {card.icon}
                </span>
              </div>
              <p className="mt-2 text-sm xl:text-base font-semibold text-center" style={{ color: "#A6192E" }}>
                {card.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT FLOATING CARDS WITH PARALLAX - DESKTOP */}
        <motion.div
          style={{ y: rightCardsY }}
          className="hidden lg:flex absolute right-0 bottom-16 xl:bottom-24 flex-col gap-6 xl:gap-8 z-10"
        >
          {cardsRight.map((card, i) => (
            <motion.div
              key={i}
              animate={smoothRight(i * 2.5)}
              className="backdrop-blur-sm rounded-2xl p-3 xl:p-4 w-48 xl:w-56 shadow-xl border"
              style={{
                background: "rgba(255,255,255,0.95)",
                borderColor: "#A6192E",
                boxShadow: "0 8px 32px rgba(166,25,46,0.15)",
              }}
            >
              <div className="relative">
                <img
                  src={`${card.img}?auto=format&fit=crop&w=600&q=80`}
                  className="rounded-xl w-full object-cover"
                  style={{ height: "clamp(90px, 10vw, 130px)" }}
                  alt={card.title}
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 text-xl bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  {card.icon}
                </span>
              </div>
              <p className="mt-2 text-sm xl:text-base font-semibold text-center" style={{ color: "#A6192E" }}>
                {card.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CENTER CONTENT WITH PARALLAX */}
        <motion.div
          ref={heroRef}
          style={{
            y: heroY,
            scale: heroScale,
            opacity: heroOpacity
          }}
          className="text-center max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto relative z-20 px-2"
        >
          {/* Icon with its own parallax */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{
              rotate: iconRotate
            }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-xl"
              style={{
                background: "linear-gradient(135deg, #A6192E, #8B1527)",
                boxShadow: "0 4px 20px rgba(166,25,46,0.3)"
              }}>
              <img src="/logo4.png" className="img-fluid" alt="Esperly Logo" />
            </div>
          </motion.div>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2"
            style={{ color: "#A6192E", letterSpacing: "0.16em" }}
          >
            ✦ Excellence in Education ✦
          </motion.p>

          <motion.h1
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              color: "#A6192E",
              textShadow: "0 2px 24px rgba(166,25,46,0.2)",
              scale: titleScale
            }}
            className="font-bold mt-2 sm:mt-3 leading-tight"
          >
            Esperly
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4 rounded-full"
            style={{ height: "3px", width: "80px", background: "linear-gradient(90deg, transparent, #A6192E, #8B1527, transparent)" }}
          />

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-2"
            style={{ color: "#4A4A4A" }}
          >
            Learn from industry experts with modern online courses<br className="hidden sm:block" /> designed for the future of education.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{
              y: buttonsY
            }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <button
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #A6192E, #8B1527)",
                boxShadow: "0 4px 24px rgba(166,25,46,0.4)",
              }}
            >
              Explore Courses
            </button>
            <button
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 border-2 hover:scale-105 active:scale-95 bg-white/90 backdrop-blur-sm w-full sm:w-auto"
              style={{ borderColor: "#A6192E", color: "#A6192E" }}
            >
              Learn More
            </button>
          </motion.div>

          {/* Stats with staggered parallax */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 sm:mt-10 flex justify-center gap-4 sm:gap-8 md:gap-10"
          >
            {[
              ["15K+", "Students"],
              ["600+", "Courses"],
              ["75+", "Experts"],
              ["50+", "Countries"]
            ].map(([num, label], i) => {
              const statsY = [statsY1, statsY2, statsY3, statsY4][i];
              return (
                <motion.div
                  key={i}
                  className="text-center"
                  style={{ y: statsY }}
                >
                  <div className="font-bold text-lg sm:text-xl md:text-2xl" style={{ color: "#A6192E" }}>{num}</div>
                  <div className="text-xs sm:text-sm mt-0.5 whitespace-nowrap" style={{ color: "#666666" }}>{label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Badges with parallax */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              y: trustBadgesY
            }}
            className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {["⭐ 4.8 Rating", "🏆 Award Winning", "📱 Mobile Ready"].map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white/80 backdrop-blur-sm border border-[#A6192E]"
                style={{ color: "#A6192E" }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* MOBILE CARDS GRID - TABLET & MOBILE with parallax */}
        <motion.div
          style={{
            y: mobileCardsY
          }}
          className="lg:hidden mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 px-2"
        >
          {[...cardsLeft, ...cardsRight].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl sm:rounded-2xl p-2 sm:p-3 border bg-white/90 backdrop-blur-sm"
              style={{
                borderColor: "#A6192E",
                boxShadow: "0 4px 16px rgba(166,25,46,0.12)",
              }}
            >
              <div className="relative">
                <img
                  src={`${card.img}?auto=format&fit=crop&w=400&q=80`}
                  className="rounded-lg sm:rounded-xl w-full h-20 sm:h-24 md:h-28 object-cover"
                  alt={card.title}
                  loading="lazy"
                />
                <span className="absolute top-1 right-1 text-base sm:text-lg bg-white/90 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow-sm">
                  {card.icon}
                </span>
              </div>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-center truncate" style={{ color: "#A6192E" }}>
                {card.title}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Wave Decoration with parallax */}
        <motion.div
          style={{
            y: waveY,
            opacity: waveOpacity
          }}
          className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
        >
          <svg
            className="relative w-full h-12 sm:h-16"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
              fill="#A6192E"
              opacity="0.2"
            />
            <path
              d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
              fill="#8B1527"
              opacity="0.2"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;