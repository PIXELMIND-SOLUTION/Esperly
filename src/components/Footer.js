import React, { useState } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────
   NOTEBOOK RULED LINES OVERLAY
───────────────────────────────────────── */
const RuledLines = ({ color = "#A6192E", opacity = 0.06 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 32 }, (_, i) => (
      <div
        key={i}
        className="absolute left-0 right-0"
        style={{ top: 40 + i * 26, height: 1, background: color, opacity }}
      />
    ))}
    {/* Red margin line */}
    <div
      className="absolute top-0 bottom-0"
      style={{ left: 56, width: 1.5, background: "#f0a0a8", opacity: 0.25 }}
    />
  </div>
);

/* ─────────────────────────────────────────
   WASHI TAPE
───────────────────────────────────────── */
const WashiTape = ({ width = 72, rotation = -2, color, patternColor = "rgba(255,255,255,0.35)", top, left, right, bottom }) => {
  const id = `washi-${width}-${rotation}`;
  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{ top, left, right, bottom, transform: `rotate(${rotation}deg)` }}
    >
      <svg width={width} height={22} viewBox={`0 0 ${width} 22`}>
        <defs>
          <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.6" fill={patternColor} />
          </pattern>
        </defs>
        <rect width={width} height={22} rx={2} fill={color} />
        <rect width={width} height={22} rx={2} fill={`url(#${id})`} />
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────
   PAPER CLIP
───────────────────────────────────────── */
const PaperClip = ({ rotation = 0, color = "#b0b8c8", scale = 1 }) => (
  <div
    className="pointer-events-none"
    style={{
      transform: `rotate(${rotation}deg) scale(${scale})`,
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
    }}
  >
    <svg width="20" height="48" viewBox="0 0 20 48" fill="none">
      <path
        d="M10 3C6 3 2 6 2 11 L2 35 C2 43 6 47 10 47 C14 47 18 43 18 35 L18 15 C18 10.5 15.5 8 12.5 8 L10 8 C7.5 8 5 10 5 13 L5 33 C5 36 7.2 38.5 10 38.5 C12.8 38.5 15 36 15 33 L15 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   STICKY NOTE
───────────────────────────────────────── */
const StickyNote = ({ color, width = 80, rotation = 0, children }) => {
  const palette = {
    yellow: { bg: "#fef08a", lines: "#e5c84a55", fold: "#e5c84a" },
    pink:   { bg: "#fda4af", lines: "#f472b655", fold: "#f472b6" },
    green:  { bg: "#86efac", lines: "#4ade8055", fold: "#4ade80" },
    blue:   { bg: "#93c5fd", lines: "#60a5fa55", fold: "#60a5fa" },
    orange: { bg: "#fdba74", lines: "#fb923c55", fold: "#fb923c" },
  };
  const c = palette[color] || palette.yellow;
  return (
    <motion.div
      whileHover={{ rotate: rotation * 0.4, scale: 1.05, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        width,
        background: c.bg,
        borderRadius: 3,
        padding: "8px 10px 12px",
        transform: `rotate(${rotation}deg)`,
        boxShadow: "2px 4px 12px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* ruled lines */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 3,
        backgroundImage: `repeating-linear-gradient(transparent, transparent 16px, ${c.lines} 16px, ${c.lines} 17px)`,
        backgroundPositionY: "22px",
        pointerEvents: "none",
      }} />
      {/* fold corner */}
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: 14, height: 14,
        background: `linear-gradient(135deg, transparent 50%, ${c.fold} 50%)`,
        opacity: 0.7,
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   TORN PAPER EDGE (top of footer)
───────────────────────────────────────── */
const TornEdge = () => (
  <div className="w-full overflow-hidden" style={{ height: 36, marginBottom: -2 }}>
    <svg width="100%" height="36" viewBox="0 0 1200 36" preserveAspectRatio="none">
      <path
        d="M0 36 L0 20 Q18 10 36 22 Q54 32 72 16 Q90 4 108 20 Q126 30 144 14 Q162 2 180 18 Q198 30 216 12 Q234 0 252 18 Q270 32 288 14 Q306 2 324 20 Q342 30 360 12 Q378 0 396 18 Q414 28 432 10 Q450 0 468 16 Q486 28 504 12 Q522 2 540 18 Q558 30 576 14 Q594 2 612 20 Q630 30 648 10 Q666 0 684 18 Q702 28 720 12 Q738 2 756 20 Q774 30 792 12 Q810 0 828 18 Q846 30 864 14 Q882 2 900 20 Q918 30 936 10 Q954 0 972 18 Q990 28 1008 12 Q1026 2 1044 20 Q1062 32 1080 14 Q1098 2 1116 20 Q1134 30 1152 16 Q1170 4 1188 22 Q1194 26 1200 24 L1200 36 Z"
        fill="#fdf8f0"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   HAND-DRAWN UNDERLINE SVG
───────────────────────────────────────── */
const HandUnderline = ({ width = 100 }) => (
  <svg width={width} height={10} viewBox={`0 0 ${width} 10`} className="mt-0.5">
    <path
      d={`M2 7 Q${width * 0.28} 3, ${width * 0.5} 7 Q${width * 0.72} 11, ${width - 2} 5`}
      stroke="#A6192E"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d={`M6 9 Q${width * 0.4} 7, ${width * 0.65} 9 Q${width * 0.8} 11, ${width - 4} 8`}
      stroke="#A6192E"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

/* ─────────────────────────────────────────
   SOCIAL ICON BUTTON
───────────────────────────────────────── */
const SocialBtn = ({ icon, label }) => (
  <motion.a
    href="#"
    aria-label={label}
    whileHover={{ y: -3, rotate: -4, scale: 1.08 }}
    whileTap={{ scale: 0.93 }}
    className="flex items-center justify-center rounded-sm"
    style={{
      width: 36, height: 36,
      background: "rgba(255,255,255,0.92)",
      border: "1.5px solid #A6192E30",
      boxShadow: "1px 2px 6px rgba(0,0,0,0.1)",
      fontSize: 16, color: "#A6192E",
      textDecoration: "none",
    }}
    title={label}
  >
    {icon}
  </motion.a>
);

/* ─────────────────────────────────────────
   NOTEBOOK TAB LINK
───────────────────────────────────────── */
const NbLink = ({ children, href = "#" }) => (
  <motion.a
    href={href}
    whileHover={{ x: 3 }}
    transition={{ type: "spring", stiffness: 400 }}
    className="flex items-center gap-2 group"
    style={{
      fontFamily: "'Caveat', cursive",
      fontSize: 16, color: "#3D3428",
      textDecoration: "none", lineHeight: 1.5,
    }}
  >
    <span
      className="flex-shrink-0"
      style={{ width: 6, height: 6, borderRadius: "50%", background: "#A6192E", opacity: 0.7, display: "inline-block" }}
    />
    <span className="group-hover:text-[#A6192E] transition-colors duration-200">{children}</span>
  </motion.a>
);

/* ─────────────────────────────────────────
   NEWSLETTER INPUT
───────────────────────────────────────── */
const Newsletter = () => {
  const [val, setVal] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!val.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setVal(""); }, 2800);
  };

  return (
    <div>
      <p style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: "#8C7F6E", marginBottom: 8 }}>
        ✏️ Drop your email — we'll write back
      </p>
      <div className="flex gap-2 flex-wrap">
        <input
          type="email"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="your@email.com"
          className="flex-1 rounded-sm border outline-none px-3 py-2 min-w-0"
          style={{
            fontFamily: "'Caveat', cursive", fontSize: 15,
            background: "rgba(255,255,255,0.92)",
            borderColor: "#A6192E40", color: "#1A1410",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.07)",
            minWidth: 140,
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="rounded-sm px-4 py-2 font-bold text-white flex-shrink-0"
          style={{
            fontFamily: "'Caveat', cursive", fontSize: 15,
            background: sent ? "#22c55e" : "linear-gradient(135deg, #A6192E, #8B1527)",
            boxShadow: "2px 3px 10px rgba(166,25,46,0.35)",
            border: "none", cursor: "pointer", transition: "background 0.3s",
          }}
        >
          {sent ? "✓ Sent!" : "Subscribe →"}
        </motion.button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────────── */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Courses:   ["Full Stack Dev", "Data Science", "UI/UX Design", "Product Mgmt", "AI & ML", "Cloud & DevOps"],
    Company:   ["About Us", "Careers", "Press Kit", "Blog", "Partnerships"],
    Support:   ["Help Center", "Community", "Contact Us", "Status Page", "Refund Policy"],
    Legal:     ["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"],
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&display=swap"
        rel="stylesheet"
      />

      {/* Torn paper transition into footer */}
      <TornEdge />

      <footer
        className="relative overflow-hidden"
        style={{
          /* Notebook paper base */
          background: "#fdf8f0",
          backgroundImage: `
            repeating-linear-gradient(
              transparent,
              transparent 27px,
              #c8d8e830 27px,
              #c8d8e830 28px
            ),
            linear-gradient(90deg, transparent 56px, #f0a0a828 57px, #f0a0a828 58px, transparent 58px)
          `,
          backgroundPositionY: "32px",
        }}
      >
        <RuledLines />

        {/* ── SPIRAL BINDING (left side) ─────── */}
        <div
          className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none hidden md:block"
          style={{ width: 48, background: "linear-gradient(90deg, #e8d5c0 0%, #f0e0cc 70%, transparent 100%)" }}
        >
          {Array.from({ length: 22 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: 13, top: 36 + i * 48,
                width: 14, height: 14,
                background: "#d4c4b0",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(255,255,255,0.5)",
                border: "1px solid #c8b49a",
              }}
            />
          ))}
          {/* Right edge margin line */}
          <div className="absolute right-0 top-0 bottom-0" style={{ width: 1.5, background: "#e8a0a8", opacity: 0.5 }} />
        </div>

        {/* ── FLOATING DECORATIVE STICKY NOTES ── */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-8 z-20 pointer-events-none hidden lg:block"
        >
          <StickyNote color="yellow" width={82} rotation={5}>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: "#3a2f1a", lineHeight: 1.6 }}>
              🎓 15K+<br />Students!
            </p>
          </StickyNote>
        </motion.div>

        <motion.div
          animate={{ y: [0, 5, 0], rotate: [0, -1, 0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-16 right-[18%] z-20 pointer-events-none hidden xl:block"
        >
          <StickyNote color="pink" width={76} rotation={-6}>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: "#831843", lineHeight: 1.6 }}>
              ⭐ 4.8<br />Rating
            </p>
          </StickyNote>
        </motion.div>

        {/* ── WASHI TAPE DECORATIONS ─────────── */}
        <WashiTape
          color="rgba(255,180,100,0.58)"
          width={90} rotation={-2}
          top={-6} left={72}
        />
        <WashiTape
          color="rgba(160,200,255,0.58)"
          width={76} rotation={3}
          top={-6} right={140}
        />
        <WashiTape
          color="rgba(180,240,160,0.55)"
          width={68} rotation={-1}
          top={-6} left="38%"
        />

        {/* ── DOODLE DECORATIONS ─────────────── */}
        <svg
          className="absolute bottom-28 right-10 opacity-10 pointer-events-none hidden md:block"
          width="72" height="72" viewBox="0 0 72 72"
        >
          <circle cx="36" cy="36" r="28" stroke="#A6192E" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
          <circle cx="36" cy="36" r="14" stroke="#A6192E" strokeWidth="1" fill="none" />
          <line x1="8" y1="36" x2="64" y2="36" stroke="#A6192E" strokeWidth="1" opacity="0.5" />
          <line x1="36" y1="8" x2="36" y2="64" stroke="#A6192E" strokeWidth="1" opacity="0.5" />
        </svg>
        <svg
          className="absolute top-20 left-14 opacity-10 pointer-events-none hidden md:block"
          width="56" height="56" viewBox="0 0 56 56"
        >
          <rect x="6" y="6" width="44" height="44" rx="3" stroke="#A6192E" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <rect x="16" y="16" width="24" height="24" rx="2" stroke="#A6192E" strokeWidth="1" fill="none" />
          <circle cx="28" cy="28" r="5" fill="#A6192E" opacity="0.5" />
        </svg>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-14 pb-8">

          {/* ── TOP ROW: Brand + Newsletter ────── */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-14">

            {/* Brand Block */}
            <div className="flex-shrink-0 max-w-xs">
              {/* Logo card — pinned with paper clip */}
              <div className="relative inline-block mb-6">
                <div className="absolute -top-5 left-8 z-20">
                  <PaperClip rotation={12} color="#a0a8b8" />
                </div>
                <div
                  className="rounded-sm px-5 py-4"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    boxShadow: "2px 4px 16px rgba(0,0,0,0.1)",
                    border: "1px solid #E5DDD0",
                    transform: "rotate(-1deg)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #A6192E, #8B1527)",
                        boxShadow: "0 2px 10px rgba(166,25,46,0.35)",
                        fontSize: 18,
                      }}
                    >
                      📖
                    </div>
                    <div>
                      <h2
                        className="font-black leading-none"
                        style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 26, color: "#A6192E" }}
                      >
                        Esperly
                      </h2>
                      <HandUnderline width={72} />
                    </div>
                  </div>
                </div>
              </div>

              <p
                className="mb-5 leading-relaxed"
                style={{ fontFamily: "'Caveat', cursive", fontSize: 15, color: "#4a3f35", lineHeight: 1.7 }}
              >
                Learn from industry experts with modern online courses designed for the future of education. 600+ courses across 6 disciplines.
              </p>

              {/* Social Icons — as tiny photo cards */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { icon: "𝕏", label: "Twitter / X" },
                  { icon: "in", label: "LinkedIn" },
                  { icon: "▶", label: "YouTube" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "💬", label: "Discord" },
                ].map((s, i) => (
                  <SocialBtn key={i} {...s} />
                ))}
              </div>
            </div>

            {/* Newsletter — as a notebook card */}
            <div className="flex-1 flex flex-col justify-start">
              {/* Heading with washi */}
              <div className="relative inline-block mb-5">
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                  style={{ transform: "translateX(-50%) rotate(-1deg)" }}
                >
                  <svg width={110} height={20} viewBox="0 0 110 20">
                    <defs>
                      <pattern id="washi-nl" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="1.5" fill="rgba(255,255,255,0.38)" />
                      </pattern>
                    </defs>
                    <rect width={110} height={20} rx={2} fill="rgba(255,160,180,0.62)" />
                    <rect width={110} height={20} rx={2} fill="url(#washi-nl)" />
                  </svg>
                </div>
                <div
                  className="rounded-sm px-6 py-5 mt-3"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #E5DDD0",
                    boxShadow: "2px 4px 14px rgba(0,0,0,0.09)",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 26px, #dde8f028 26px, #dde8f028 27px)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="absolute right-3 top-3">
                      <PaperClip rotation={-8} color="#c0a880" scale={0.8} />
                    </div>
                    <div>
                      <h3
                        className="font-black leading-tight mb-1"
                        style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 20, color: "#1A1410" }}
                      >
                        Stay in the loop
                        <span style={{ color: "#A6192E", fontStyle: "italic" }}> ✦</span>
                      </h3>
                      <p style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#8C7F6E" }}>
                        Course launches, tips & community news — no spam, ever.
                      </p>
                    </div>
                  </div>
                  <Newsletter />
                </div>
              </div>

              {/* Mini stat sticky notes row */}
              <div className="flex gap-3 flex-wrap mt-2">
                {[
                  { num: "15K+", label: "Learners", color: "yellow", rot: -2 },
                  { num: "600+", label: "Courses", color: "green", rot: 1.5 },
                  { num: "75+", label: "Experts", color: "blue", rot: -1 },
                  { num: "50+", label: "Countries", color: "orange", rot: 2 },
                ].map(({ num, label, color, rot }, i) => (
                  <StickyNote key={i} color={color} width={68} rotation={rot} >
                    <div style={{ fontFamily: "'Caveat', cursive", textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#A6192E", lineHeight: 1 }}>{num}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{label}</div>
                    </div>
                  </StickyNote>
                ))}
              </div>
            </div>
          </div>

          {/* ── DIVIDER: torn-style dashed rule ── */}
          <div className="relative my-8">
            <div
              className="w-full"
              style={{ borderTop: "2px dashed #A6192E25", borderImage: "repeating-linear-gradient(90deg, #A6192E40 0, #A6192E40 6px, transparent 6px, transparent 12px) 1" }}
            />
            {/* Paper clip on divider */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <PaperClip rotation={90} color="#b8c0d0" scale={0.75} />
            </div>
          </div>

          {/* ── LINK COLUMNS ───────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pl-0 md:pl-6">
            {Object.entries(links).map(([heading, items], ci) => {
              const tapeColors = [
                "rgba(255,200,80,0.65)",
                "rgba(160,200,255,0.65)",
                "rgba(180,240,160,0.6)",
                "rgba(255,160,180,0.62)",
              ];
              const tapeRots = [-2, 2, -1, 3];
              return (
                <div key={heading} className="relative">
                  {/* Column heading as washi-taped label */}
                  <div className="relative inline-block mb-4">
                    <div
                      className="absolute -top-4 left-2"
                      style={{ transform: `rotate(${tapeRots[ci]}deg)` }}
                    >
                      <svg width={heading.length * 8 + 20} height={18} viewBox={`0 0 ${heading.length * 8 + 20} 18`}>
                        <defs>
                          <pattern id={`wt-col-${ci}`} width="9" height="9" patternUnits="userSpaceOnUse">
                            <circle cx="4.5" cy="4.5" r="1.3" fill="rgba(255,255,255,0.35)" />
                          </pattern>
                        </defs>
                        <rect width={heading.length * 8 + 20} height={18} rx={2} fill={tapeColors[ci]} />
                        <rect width={heading.length * 8 + 20} height={18} rx={2} fill={`url(#wt-col-${ci})`} />
                      </svg>
                    </div>
                    <h4
                      className="relative z-10 pt-1"
                      style={{
                        fontFamily: "Fraunces, Georgia, serif",
                        fontSize: 14, fontWeight: 900,
                        color: "#1A1410", letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {heading}
                    </h4>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {items.map(item => <NbLink key={item}>{item}</NbLink>)}
                  </nav>
                </div>
              );
            })}
          </div>

          {/* ── APP BADGES ─────────────────────── */}
          <div className="flex flex-wrap gap-3 mb-10 pl-0 md:pl-6">
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#8C7F6E", alignSelf: "center" }}>
              📱 Get the app:
            </p>
            {["App Store", "Google Play"].map((store, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -2, rotate: i === 0 ? -1 : 1, scale: 1.04 }}
                className="flex items-center gap-2 rounded-sm px-4 py-2"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1.5px solid #A6192E30",
                  boxShadow: "1px 2px 8px rgba(0,0,0,0.1)",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 18 }}>{i === 0 ? "🍎" : "🤖"}</span>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#8C7F6E", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {i === 0 ? "Download on the" : "Get it on"}
                  </div>
                  <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 13, fontWeight: 700, color: "#1A1410" }}>
                    {store}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* ── BOTTOM BAR ─────────────────────── */}
          <div className="relative">
            {/* Dashed rule */}
            <div className="w-full mb-5" style={{ borderTop: "1px dashed #A6192E22" }} />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap pl-0 md:pl-6">
              {/* Copyright note — as a small sticky */}
              <div
                className="rounded-sm px-4 py-2"
                style={{
                  background: "rgba(255,240,160,0.55)",
                  boxShadow: "1px 2px 6px rgba(0,0,0,0.08)",
                  transform: "rotate(-0.5deg)",
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 16px, rgba(0,0,0,0.04) 16px, rgba(0,0,0,0.04) 17px)",
                }}
              >
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#3a2f1a" }}>
                  © {currentYear} Esperly Education Pvt. Ltd. — All rights reserved ✦
                </p>
              </div>

              {/* Bottom links */}
              <div className="flex gap-4 flex-wrap justify-center">
                {["Privacy", "Terms", "Cookies", "Sitemap"].map((l, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ color: "#A6192E" }}
                    style={{
                      fontFamily: "'Caveat', cursive", fontSize: 14,
                      color: "#8C7F6E", textDecoration: "none", transition: "color 0.2s",
                    }}
                  >
                    {l}
                  </motion.a>
                ))}
              </div>

              {/* Handwritten "Made with ❤️" */}
              <div
                style={{
                  fontFamily: "'Caveat', cursive", fontSize: 14,
                  color: "#A6192E", opacity: 0.7,
                  transform: "rotate(1deg)",
                }}
              >
                Made with ❤️ for learners everywhere
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM TORN PAPER EDGE ─────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 8, background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.04))" }}
        />
      </footer>
    </>
  );
};

export default Footer;