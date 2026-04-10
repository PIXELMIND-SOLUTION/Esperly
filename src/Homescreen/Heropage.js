import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HeroPage = () => {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.9, 0.8]);

  const decor1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const decor2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const decor3Y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      className="relative overflow-hidden vh-80 flex items-center justify-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.93) 0%, rgba(255,240,242,0.89) 40%, rgba(255,220,224,0.86) 70%, rgba(255,255,255,0.92) 100%)",
        }}
      />

      {/* ── OVERLAY DECORATIONS ── */}

      {/* Top-left dashed arc rings */}
      <motion.div style={{ y: decor1Y }} className="absolute top-0 left-0 pointer-events-none z-[1]">
        <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
          <circle cx="0" cy="0" r="290" stroke="#A6192E" strokeWidth="1" strokeDasharray="6 10" opacity="0.16" />
          <circle cx="0" cy="0" r="205" stroke="#A6192E" strokeWidth="0.8" opacity="0.10" />
          <circle cx="62" cy="62" r="11" fill="#A6192E" opacity="0.11" />
          <circle cx="125" cy="32" r="5" fill="#A6192E" opacity="0.14" />
          <circle cx="32" cy="138" r="7" fill="#8B1527" opacity="0.09" />
        </svg>
      </motion.div>

      {/* Bottom-right dashed arc rings */}
      <motion.div style={{ y: decor2Y }} className="absolute bottom-0 right-0 pointer-events-none z-[1]">
        <svg width="400" height="340" viewBox="0 0 400 340" fill="none">
          <circle cx="400" cy="340" r="310" stroke="#A6192E" strokeWidth="1" strokeDasharray="6 10" opacity="0.14" />
          <circle cx="400" cy="340" r="220" stroke="#A6192E" strokeWidth="0.8" opacity="0.09" />
          <circle cx="325" cy="272" r="9" fill="#A6192E" opacity="0.11" />
          <circle cx="368" cy="185" r="5" fill="#8B1527" opacity="0.13" />
          <circle cx="258" cy="312" r="6" fill="#A6192E" opacity="0.09" />
        </svg>
      </motion.div>

      {/* Top-right dot grid */}
      <motion.div
        style={{ y: decor1Y }}
        className="absolute top-10 right-10 pointer-events-none z-[1] hidden md:block"
      >
        <svg width="165" height="165" viewBox="0 0 165 165" fill="none">
          {[0, 1, 2, 3, 4].map((col) =>
            [0, 1, 2, 3, 4].map((row) => (
              <circle
                key={`${col}-${row}`}
                cx={col * 30 + 15}
                cy={row * 30 + 15}
                r="2.8"
                fill="#A6192E"
                opacity={0.07 + (col + row) * 0.014}
              />
            ))
          )}
        </svg>
      </motion.div>

      {/* Bottom-left dot grid */}
      <motion.div
        style={{ y: decor2Y }}
        className="absolute bottom-10 left-10 pointer-events-none z-[1] hidden md:block"
      >
        <svg width="135" height="135" viewBox="0 0 135 135" fill="none">
          {[0, 1, 2, 3].map((col) =>
            [0, 1, 2, 3].map((row) => (
              <circle
                key={`${col}-${row}`}
                cx={col * 32 + 16}
                cy={row * 32 + 16}
                r="2.8"
                fill="#A6192E"
                opacity={0.09 + (col + row) * 0.017}
              />
            ))
          )}
        </svg>
      </motion.div>

      {/* Left vertical dashed rule */}
      <motion.div
        style={{ y: decor3Y }}
        className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-[1] hidden lg:block"
      >
        <svg width="2" height="200" viewBox="0 0 2 200">
          <line x1="1" y1="0" x2="1" y2="200" stroke="#A6192E" strokeWidth="1.5" strokeDasharray="4 9" opacity="0.18" />
        </svg>
      </motion.div>

      {/* Right vertical dashed rule */}
      <motion.div
        style={{ y: decor3Y }}
        className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-[1] hidden lg:block"
      >
        <svg width="2" height="200" viewBox="0 0 2 200">
          <line x1="1" y1="0" x2="1" y2="200" stroke="#A6192E" strokeWidth="1.5" strokeDasharray="4 9" opacity="0.18" />
        </svg>
      </motion.div>

      {/* Top-center thin horizontal rule */}
      <motion.div
        style={{ y: decor1Y }}
        className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-[1] hidden md:block"
      >
        <svg width="200" height="2" viewBox="0 0 200 2">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#A6192E" strokeWidth="1" strokeDasharray="4 8" opacity="0.15" />
        </svg>
      </motion.div>

      {/* Bottom-center thin horizontal rule */}
      <motion.div
        style={{ y: decor2Y }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-[1] hidden md:block"
      >
        <svg width="200" height="2" viewBox="0 0 200 2">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#A6192E" strokeWidth="1" strokeDasharray="4 8" opacity="0.15" />
        </svg>
      </motion.div>

      {/* Soft radial glow blobs */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(166,25,46,0.09), transparent 70%)",
          top: "8%",
          left: "4%",
        }}
      />
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(166,25,46,0.07), transparent 70%)",
          bottom: "6%",
          right: "5%",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 text-center max-w-3xl mx-auto px-6 sm:px-10 py-24"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            color: "#A6192E",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "0.9rem",
          }}
        >
          ✦ &nbsp; Personalized Tuition &nbsp; ✦
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.1rem, 5.5vw, 3.8rem)",
            color: "#A6192E",
            lineHeight: 1.18,
            fontWeight: 800,
            letterSpacing: "-0.015em",
            margin: 0,
          }}
        >
          Every Student is Unique,{" "}
          <span style={{ color: "", fontStyle: "italic" }}>and so is their</span>
          <br />
          Learning Journey
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          style={{
            height: "3px",
            width: "72px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, transparent, #A6192E, #8B1527, transparent)",
            margin: "1.4rem auto",
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            color: "#4A4A4A",
            fontSize: "clamp(0.95rem, 1.7vw, 1.12rem)",
            lineHeight: 1.85,
            maxWidth: "540px",
            margin: "0 auto",
          }}
        >
          Every Student is Unique, and so is their Learning Journey. That's the idea that sparked Esperly. 
          We want to create a space where students could learn at their own pace, on their own schedule, and
          with complete  support- no matter where they are in the world.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: "2.2rem", display: "flex", justifyContent: "center" }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #A6192E, #8B1527)",
              boxShadow: "0 6px 28px rgba(166,25,46,0.38)",
              color: "#fff",
              border: "none",
              padding: "0.88rem 2.4rem",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.015em",
              transition: "transform 0.18s, box-shadow 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 36px rgba(166,25,46,0.48)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 28px rgba(166,25,46,0.38)";
            }}
          >
            Begin with a Free Session
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPage;