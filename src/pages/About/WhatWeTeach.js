import React from "react";

const subjectsTop = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "Economics",
  "Statistics",
];

const subjectsBottom = [
  "Accountancy",
  "Business Studies",
  "History",
  "Geography",
  "Political Science",
  "Competitive Exams",
  "Coding for Kids",
  "Spoken English",
];

/* ── tiny SVG pushpin ── */
const Pushpin = ({ color = "#dc2626" }) => (
  <svg width="16" height="24" viewBox="0 0 24 36" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="10" r="9" fill={color} />
    <circle cx="12" cy="10" r="5" fill="white" fillOpacity="0.35" />
    <rect x="10.5" y="18" width="3" height="18" rx="1.5" fill="#78716c" />
  </svg>
);

/* ── sticky note color variants ── */
const tagColors = [
  { bg: "#fff9c4", border: "#f9d71c", text: "#78350f", pin: "#ca8a04" },
  { bg: "#ffd6d6", border: "#f87171", text: "#7f1d1d", pin: "#dc2626" },
  { bg: "#d4f4dd", border: "#4ade80", text: "#14532d", pin: "#16a34a" },
  { bg: "#dde9ff", border: "#93c5fd", text: "#1e3a5f", pin: "#3b82f6" },
  { bg: "#ffe4cc", border: "#fb923c", text: "#7c2d12", pin: "#ea580c" },
  { bg: "#f0d9ff", border: "#c084fc", text: "#581c87", pin: "#9333ea" },
  { bg: "#d1faf5", border: "#2dd4bf", text: "#134e4a", pin: "#0d9488" },
  { bg: "#fce7f3", border: "#f472b6", text: "#831843", pin: "#db2777" },
];

/* ruled-line background */
const ruledLines = `repeating-linear-gradient(
  transparent,
  transparent 27px,
  rgba(243,213,213,0.5) 28px
)`;

/* ── SubjectTag component ── */
const SubjectTag = ({ subject, index }) => {
  const c = tagColors[index % tagColors.length];
  const rotations = [-3, -1.5, 0, 1.5, 3, -2, 2, -1];
  const rot = rotations[index % rotations.length];

  return (
    <div
      className="relative flex items-center gap-2 px-6 py-3 select-none"
      style={{
        background: c.bg,
        border: `1.5px solid ${c.border}`,
        borderRadius: "2px",
        transform: `rotate(${rot}deg)`,
        boxShadow: `3px 4px 0 ${c.pin}44, 0 6px 16px rgba(0,0,0,0.12)`,
        whiteSpace: "nowrap",
        fontFamily: "'Georgia', serif",
        fontWeight: 700,
        color: c.text,
        fontSize: "1rem",
        cursor: "default",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "rotate(0deg) scale(1.07)";
        e.currentTarget.style.boxShadow = `5px 7px 0 ${c.pin}66, 0 12px 24px rgba(0,0,0,0.18)`;
        e.currentTarget.style.zIndex = "10";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rot}deg) scale(1)`;
        e.currentTarget.style.boxShadow = `3px 4px 0 ${c.pin}44, 0 6px 16px rgba(0,0,0,0.12)`;
        e.currentTarget.style.zIndex = "1";
      }}
    >
      <Pushpin color={c.pin} />
      {subject}
    </div>
  );
};

/* ── Scroll track ── */
const ScrollTrack = ({ subjects, direction = "right", trackIndex = 0 }) => {
  const doubled = [...subjects, ...subjects, ...subjects];
  const animName = direction === "right" ? "scrollRight" : "scrollLeft";

  return (
    <div
      className="overflow-hidden relative"
      style={{
        /* slight tilt per row */
        transform: `rotate(${trackIndex % 2 === 0 ? "-0.6deg" : "0.6deg"})`,
        padding: "12px 0",
      }}
    >
      {/* Ruled line behind the tags */}
      <div
        className="absolute inset-0"
        style={{
          borderTop: "1.5px solid rgba(248,113,113,0.3)",
          borderBottom: "1.5px solid rgba(248,113,113,0.3)",
          pointerEvents: "none",
        }}
      />

      <div
        className="flex gap-6 w-max"
        style={{
          animation: `${animName} 30s linear infinite`,
        }}
      >
        {doubled.map((subject, index) => (
          <SubjectTag key={index} subject={subject} index={index} />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════ */
const WhatWeTeach = () => {
  return (
    <>
      {/* ── Keyframes injected via style tag ── */}
      <style>{`
        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <section
        className="relative py-28 overflow-hidden"
        style={{
          background: "#fef9f0",
          backgroundImage: `
            ${ruledLines},
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")
          `,
        }}
      >
        {/* Red margin line */}
        <div
          className="absolute left-20 top-0 h-full w-px"
          style={{ background: "#f87171", opacity: 0.45 }}
        />

        {/* Hole-punch dots top-left */}
        {[8, 18, 28].map((pct) => (
          <div
            key={pct}
            className="absolute w-5 h-5 rounded-full"
            style={{
              top: `${pct}%`,
              left: "2.2rem",
              background: "#e7ddd0",
              border: "1.5px solid #d6c9bb",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">

          {/* ── Header on a sticky note ── */}
          <div className="flex justify-center mb-16">
            <div
              className="relative max-w-xl w-full text-center p-10"
              style={{
                background: "#ffd6d6",
                border: "1.5px solid #f87171",
                borderRadius: "2px",
                boxShadow:
                  "5px 7px 0 #dc262644, 0 16px 40px rgba(0,0,0,0.12)",
                transform: "rotate(-0.8deg)",
              }}
            >
              {/* Tape strips across top */}
              <div
                className="absolute -top-3 left-12"
                style={{
                  width: "70px",
                  height: "20px",
                  background: "rgba(252,211,77,0.65)",
                  borderRadius: "2px",
                  transform: "rotate(-2deg)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              />
              <div
                className="absolute -top-3 right-12"
                style={{
                  width: "70px",
                  height: "20px",
                  background: "rgba(252,211,77,0.65)",
                  borderRadius: "2px",
                  transform: "rotate(2deg)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              />

              {/* Label stamp */}
              <div
                className="inline-block mb-4 px-4 py-1 text-xs font-bold tracking-widest"
                style={{
                  background: "#7f1d1d",
                  color: "#fef9f0",
                  borderRadius: "2px",
                  fontFamily: "'Courier New', monospace",
                  boxShadow: "2px 2px 0 #4a0e0e",
                }}
              >
                WHAT WE TEACH
              </div>

              <h2
                style={{
                  fontFamily: "'Georgia', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#7f1d1d",
                  lineHeight: 1.25,
                  margin: "0 0 1rem",
                }}
              >
                Subjects Designed for
                <span
                  className="block"
                  style={{ fontStyle: "italic", color: "#dc2626" }}
                >
                  Academic Excellence
                </span>
              </h2>

              <p
                style={{
                  fontFamily: "'Georgia', serif",
                  color: "#57534e",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                From core academics to competitive preparation,
                Esperly ensures complete learning support.
              </p>
            </div>
          </div>

          {/* ── Scroll rows ── */}
          <div className="flex flex-col gap-8">
            <ScrollTrack subjects={subjectsTop} direction="right" trackIndex={0} />
            <ScrollTrack subjects={subjectsBottom} direction="left" trackIndex={1} />
          </div>

          {/* ── Bottom doodle note ── */}
          <div className="flex justify-end mt-10 pr-4">
            <div
              className="px-5 py-3 text-sm"
              style={{
                background: "#d4f4dd",
                border: "1.5px solid #4ade80",
                borderRadius: "2px",
                transform: "rotate(1.5deg)",
                boxShadow: "3px 3px 0 #16a34a44",
                fontFamily: "'Courier New', monospace",
                color: "#14532d",
                fontWeight: 600,
              }}
            >
              📚 More subjects added regularly!
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default WhatWeTeach;