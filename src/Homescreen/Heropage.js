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
      className="relative overflow-hidden h-lvh flex items-end justify-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/ban.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* img-overlay img-overlay-black */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
      />

      {/* ── DECORATIONS ── */}
      <motion.div style={{ y: decor1Y }} className="absolute top-0 left-0 pointer-events-none z-[1]">
        <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
          <circle cx="0" cy="0" r="290" stroke="#A6192E" strokeWidth="1" strokeDasharray="6 10" opacity="0.25" />
          <circle cx="0" cy="0" r="205" stroke="#A6192E" strokeWidth="0.8" opacity="0.18" />
          <circle cx="62" cy="62" r="11" fill="#A6192E" opacity="0.20" />
          <circle cx="125" cy="32" r="5" fill="#A6192E" opacity="0.22" />
          <circle cx="32" cy="138" r="7" fill="#8B1527" opacity="0.16" />
        </svg>
      </motion.div>

      <motion.div style={{ y: decor2Y }} className="absolute bottom-0 right-0 pointer-events-none z-[1]">
        <svg width="400" height="340" viewBox="0 0 400 340" fill="none">
          <circle cx="400" cy="340" r="310" stroke="#A6192E" strokeWidth="1" strokeDasharray="6 10" opacity="0.22" />
          <circle cx="400" cy="340" r="220" stroke="#A6192E" strokeWidth="0.8" opacity="0.16" />
          <circle cx="325" cy="272" r="9" fill="#A6192E" opacity="0.18" />
          <circle cx="368" cy="185" r="5" fill="#8B1527" opacity="0.20" />
          <circle cx="258" cy="312" r="6" fill="#A6192E" opacity="0.16" />
        </svg>
      </motion.div>

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
                opacity={0.14 + (col + row) * 0.018}
              />
            ))
          )}
        </svg>
      </motion.div>

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
                opacity={0.16 + (col + row) * 0.022}
              />
            ))
          )}
        </svg>
      </motion.div>

      <motion.div
        style={{ y: decor3Y }}
        className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-[1] hidden lg:block"
      >
        <svg width="2" height="200" viewBox="0 0 2 200">
          <line x1="1" y1="0" x2="1" y2="200" stroke="#A6192E" strokeWidth="1.5" strokeDasharray="4 9" opacity="0.30" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: decor3Y }}
        className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-[1] hidden lg:block"
      >
        <svg width="2" height="200" viewBox="0 0 2 200">
          <line x1="1" y1="0" x2="1" y2="200" stroke="#A6192E" strokeWidth="1.5" strokeDasharray="4 9" opacity="0.30" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: decor1Y }}
        className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-[1] hidden md:block"
      >
        <svg width="200" height="2" viewBox="0 0 200 2">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#A6192E" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: decor2Y }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-[1] hidden md:block"
      >
        <svg width="200" height="2" viewBox="0 0 200 2">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#A6192E" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
        </svg>
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            padding: "clamp(2rem, 6vw, 4rem) clamp(1.5rem, 6vw, 4rem)",
            textAlign: "center",
          }}
        >
          {/* Title */}
          <motion.h1
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontSize: "clamp(1rem, 3.4vw, 2.55rem)",
              color: "#ffffff",
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: "-0.018em",
              margin: 0,
              whiteSpace: "wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            Every Student is Unique, and so is their Learning Journey
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.28 }}
            style={{
              height: "3px",
              width: "72px",
              borderRadius: "9999px",
              background: "linear-gradient(90deg, transparent, #EB6664, transparent)",
              margin: "1.4rem auto",
            }}
          />

          {/* Description with BIG QUOTES */}
          <div className="relative max-w-5xl mx-auto">

            {/* Opening Quote */}
            <span className="absolute -top-6 -left-4 text-white/80 text-3xl sm:text-4xl font-serif">
              “
            </span>

            {/* Closing Quote */}
            <span className="absolute -bottom-8 -right-4 text-white/80 text-3xl sm:text-4xl font-serif">
              ”
            </span>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(0.88rem, 1.45vw, 1.06rem)",
                lineHeight: 1.88,
                margin: "0 auto",
                fontWeight: 400,
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
              }}
              className="px-4"
            >
              Every Student is Unique, and so is their Learning Journey. That&apos;s the idea that sparked
              Esperly. We want to create a space where students could learn at their own pace, on their
              own schedule, and with complete support — no matter where they are in the world.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            style={{
              marginTop: "2.2rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "#EB6664",
                boxShadow: "0 6px 28px rgba(166,25,46,0.50), 0 1px 0 rgba(255,255,255,0.18) inset",
                color: "#fff",
                border: "none",
                padding: "0.88rem 2.4rem",
                borderRadius: "9999px",
                fontSize: "clamp(0.82rem, 1.3vw, 0.97rem)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.015em",
                transition: "transform 0.18s, box-shadow 0.18s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 36px rgba(166,25,46,0.65), 0 1px 0 rgba(255,255,255,0.18) inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(166,25,46,0.50), 0 1px 0 rgba(255,255,255,0.18) inset";
              }}
            >
              Begin with a Free Session
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPage;