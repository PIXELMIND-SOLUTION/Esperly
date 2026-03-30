import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiAward, FiBookOpen, FiTarget } from "react-icons/fi";

/* ─────────────── tiny decorative SVGs ─────────────── */
const PaperClip = ({ className = "" }) => (
  <svg
    className={className}
    width="28"
    height="70"
    viewBox="0 0 28 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 4C8.477 4 4 8.477 4 14v34c0 7.732 6.268 14 14 14s14-6.268 14-14V18"
      stroke="#9ca3af"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M14 4C19.523 4 24 8.477 24 14v28c0 5.523-4.477 10-10 10S4 47.523 4 42V18"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Pushpin = ({ color = "#dc2626", className = "" }) => (
  <svg
    className={className}
    width="24"
    height="36"
    viewBox="0 0 24 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="10" r="9" fill={color} />
    <circle cx="12" cy="10" r="5" fill="white" fillOpacity="0.35" />
    <rect x="10.5" y="18" width="3" height="18" rx="1.5" fill="#78716c" />
  </svg>
);

const TapeStrip = ({ className = "", color = "rgba(252,211,77,0.55)" }) => (
  <div
    className={`absolute ${className}`}
    style={{
      width: "80px",
      height: "22px",
      background: color,
      borderRadius: "2px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
      transform: "rotate(-3deg)",
    }}
  />
);

/* ─────────────── ruled-line background ─────────────── */
const ruledLines = `repeating-linear-gradient(
  transparent,
  transparent 27px,
  #f3d5d5 28px
)`;

/* ─────────────── paper texture via CSS ─────────────── */
const paperStyle = {
  background: "#fef9f0",
  backgroundImage: `
    ${ruledLines},
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")
  `,
};

/* ─────────────── sticky note colors ─────────────── */
const stickyColors = [
  { bg: "#fff9c4", border: "#f9d71c", shadow: "#e6c700" },
  { bg: "#ffd6d6", border: "#f87171", shadow: "#dc2626" },
  { bg: "#d4f4dd", border: "#4ade80", shadow: "#16a34a" },
  { bg: "#dde9ff", border: "#93c5fd", shadow: "#3b82f6" },
];

const stats = [
  { icon: FiUsers, label: "10,000+", sub: "Students" },
  { icon: FiBookOpen, label: "500+", sub: "Courses" },
  { icon: FiAward, label: "Top Rated", sub: "Tutors" },
  { icon: FiTarget, label: "95%", sub: "Success Rate" },
];

const missions = [
  { icon: FiTarget, text: "Personalized Learning Plans" },
  { icon: FiBookOpen, text: "Structured Curriculum" },
  { icon: FiAward, text: "Certified & Experienced Tutors" },
];

/* ═══════════════════════════════════════════════════════ */
const AboutUs = () => {
  return (
    <div
      className="relative overflow-hidden font-sans"
      style={{ fontFamily: "'Georgia', 'Palatino', serif" }}
    >
      {/* ═══ HERO — giant notebook cover ═══ */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "#A6192E",
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.04) 60px),
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.04) 60px)
          `,
        }}
      >
        {/* Spine strip */}
        <div
          className="absolute left-0 top-0 h-full w-14"
          style={{
            background:
              "linear-gradient(90deg,#A6192E 0%,#A6192E 60%,transparent 100%)",
            borderRight: "3px solid rgba(255,255,255,0.12)",
          }}
        />

        {/* Hole punches on spine */}
        {[20, 45, 70].map((pct) => (
          <div
            key={pct}
            className="absolute left-4 w-5 h-5 rounded-full"
            style={{
              top: `${pct}%`,
              background: "#A6192E",
              border: "2px solid rgba(255,255,255,0.15)",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
            }}
          />
        ))}

        {/* Coil spring (decorative) */}
        <svg
          className="absolute left-8 top-0 h-full"
          width="18"
          viewBox="0 0 18 900"
          preserveAspectRatio="none"
          style={{ opacity: 0.35 }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <ellipse
              key={i}
              cx="9"
              cy={15 + i * 30}
              rx="7"
              ry="10"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              fill="none"
            />
          ))}
        </svg>

        {/* Main page content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-2xl mx-auto px-16 text-center"
        >
          {/* Label tape */}
          <div className="inline-block relative mb-8">
            <div
              style={{
                background: "rgba(252,211,77,0.75)",
                padding: "6px 24px",
                borderRadius: "2px",
                transform: "rotate(-1.5deg)",
                display: "inline-block",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: "0.8rem",
                color: "#78350f",
                letterSpacing: "0.15em",
              }}
            >
              ABOUT ESPERLY
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 1.2,
              color: "#fef9f0",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            Shaping Futures Through
            <span
              className="block"
              style={{
                color: "#fca5a5",
                fontStyle: "italic",
              }}
            >
              Quality Tuition
            </span>
          </h1>

          <p
            style={{
              marginTop: "1.5rem",
              color: "rgba(254,249,240,0.8)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              fontFamily: "'Georgia', serif",
            }}
          >
            Esperly empowers students with structured guidance, expert educators,
            and modern learning techniques.
          </p>
        </motion.div>

        {/* Bottom torn paper edge */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            d="M0 0 Q60 40 120 15 Q180 0 240 30 Q300 40 360 10 Q420 0 480 25 Q540 40 600 8 Q660 0 720 28 Q780 40 840 12 Q900 0 960 30 Q1020 40 1080 10 Q1140 0 1200 22 Q1260 40 1320 8 Q1380 0 1440 20 L1440 40 L0 40 Z"
            fill="#fef9f0"
          />
        </svg>
      </section>

      {/* ═══ CONTENT — notebook pages ═══ */}
      <section className="py-24" style={paperStyle}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {/* Red margin line */}
          <div
            className="fixed left-[5.5rem] top-0 h-full w-px hidden lg:block"
            style={{ background: "#f87171", opacity: 0.4, zIndex: 0 }}
          />

          {/* ── Mission block ── */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-28">

            {/* Left: handwritten-feel text on lined paper */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Tape at top */}
              <TapeStrip className="-top-3 left-10" />

              <div
                className="relative rounded-sm p-8 pt-10"
                style={{
                  background: "#fef9f0",
                  border: "1px solid #e7ddd0",
                  boxShadow:
                    "3px 4px 0 #e2d5c8, 6px 8px 20px rgba(0,0,0,0.08)",
                  backgroundImage: ruledLines,
                }}
              >
                {/* Red margin line inside */}
                <div
                  className="absolute left-12 top-0 h-full w-px"
                  style={{ background: "#fca5a5" }}
                />

                <h2
                  className="pl-8 mb-6"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: "#7f1d1d",
                    lineHeight: 1.3,
                  }}
                >
                  Our Mission
                </h2>
                <p
                  className="pl-8 leading-[2rem]"
                  style={{
                    fontFamily: "'Georgia', serif",
                    color: "#44403c",
                    fontSize: "1.05rem",
                    lineHeight: "2rem",
                  }}
                >
                  Our mission is to provide personalized and effective tuition
                  that builds confidence, strengthens fundamentals, and prepares
                  students for academic excellence.
                </p>
              </div>
            </motion.div>

            {/* Right: sticky note list */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {missions.map((item, i) => {
                const Icon = item.icon;
                const rotations = [-2, 1.5, -1];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative flex items-center gap-5 p-5 pl-6"
                    style={{
                      background: stickyColors[i].bg,
                      border: `1px solid ${stickyColors[i].border}`,
                      borderRadius: "2px",
                      transform: `rotate(${rotations[i]}deg)`,
                      boxShadow: `4px 5px 0 ${stickyColors[i].shadow}44, 0 8px 24px rgba(0,0,0,0.1)`,
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    {/* Pin */}
                    <Pushpin
                      color={stickyColors[i].shadow}
                      className="absolute -top-4 left-6"
                    />
                    <Icon size={22} style={{ color: "#7f1d1d", flexShrink: 0 }} />
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#1c1917",
                        fontSize: "1rem",
                      }}
                    >
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}

              {/* Paperclip attaching a note */}
              <div className="relative mt-2 self-end">
                <PaperClip className="absolute -top-8 right-4 opacity-70" />
                <div
                  className="px-5 py-3 rounded-sm text-sm"
                  style={{
                    background: "#fff9c4",
                    border: "1px solid #f9d71c",
                    boxShadow: "3px 3px 0 #e6c70088",
                    fontFamily: "'Courier New', monospace",
                    color: "#78350f",
                    transform: "rotate(1deg)",
                  }}
                >
                  ✦ Est. since 2018
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Stats: sticky note cards on corkboard ── */}
          <div
            className="relative rounded-2xl p-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            style={{
              background: "#c8a97e",
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E")
              `,
              boxShadow:
                "inset 0 0 60px rgba(0,0,0,0.2), 0 10px 40px rgba(0,0,0,0.15)",
              border: "6px solid #a07850",
            }}
          >
            {/* Corkboard label */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 text-xs font-bold tracking-widest"
              style={{
                background: "#7f1d1d",
                color: "#fef9f0",
                borderRadius: "2px",
                fontFamily: "'Courier New', monospace",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              OUR NUMBERS
            </div>

            {stats.map((item, index) => {
              const Icon = item.icon;
              const sc = stickyColors[index];
              const rots = [-3, 2, -1.5, 3];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotate: rots[index] }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.07, rotate: 0, zIndex: 10 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative p-6 text-center"
                  style={{
                    background: sc.bg,
                    border: `1px solid ${sc.border}`,
                    borderRadius: "2px",
                    transform: `rotate(${rots[index]}deg)`,
                    boxShadow: `4px 6px 0 ${sc.shadow}55, 0 10px 30px rgba(0,0,0,0.15)`,
                  }}
                >
                  <Pushpin
                    color={sc.shadow}
                    className="absolute -top-5 left-1/2 -translate-x-1/2"
                  />
                  <Icon
                    size={26}
                    style={{ margin: "0 auto 10px", color: "#7f1d1d" }}
                  />
                  <p
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      color: "#1c1917",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.78rem",
                      color: "#78716c",
                      marginTop: "4px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.sub}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutUs;