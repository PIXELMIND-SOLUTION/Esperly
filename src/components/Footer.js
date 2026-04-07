import React, { useState } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────
   WASHI TAPE COMPONENT
───────────────────────────────────────── */
const WashiTape = ({ width = 72, rotation = -2, color, top, left, right, bottom, className = "" }) => {
  const id = `washi-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div
      className={`${className} pointer-events-none absolute z-10`}
      style={{ top, left, right, bottom, transform: `rotate(${rotation}deg)` }}
    >
      <svg width={width} height={22} viewBox={`0 0 ${width} 22`}>
        <defs>
          <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.6" fill="rgba(255,255,255,0.35)" />
          </pattern>
        </defs>
        <rect width={width} height={22} rx={2} fill={color} />
        <rect width={width} height={22} rx={2} fill={`url(#${id})`} />
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────
   PAPER CLIP COMPONENT
───────────────────────────────────────── */
const PaperClip = ({ rotation = 0, color = "#e8d0d8", scale = 1 }) => (
  <div
    className="pointer-events-none"
    style={{
      transform: `rotate(${rotation}deg) scale(${scale})`,
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
    }}
  >
    <svg width="20" height="48" viewBox="0 0 20 48" fill="none">
      <path
        d="M10 3C6 3 2 6 2 11 L2 35 C2 43 6 47 10 47 C14 47 18 43 18 35 L18 15 C18 10.5 15.5 8 12.5 8 L10 8 C7.5 8 5 10 5 13 L5 33 C5 36 7.2 38.5 10 38.5 C12.8 38.5 15 36 15 33 L15 17"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   STICKY NOTE COMPONENT
───────────────────────────────────────── */
const StickyNote = ({ color, rotation = 0, children, className = "" }) => {
  const palette = {
    yellow: { bg: "bg-[#fef08a]", lines: "rgba(229,200,74,0.33)", fold: "#e5c84a" },
    pink: { bg: "bg-[#fda4af]", lines: "rgba(244,114,182,0.33)", fold: "#f472b6" },
    green: { bg: "bg-[#86efac]", lines: "rgba(74,222,128,0.33)", fold: "#4ade80" },
    blue: { bg: "bg-[#93c5fd]", lines: "rgba(96,165,250,0.33)", fold: "#60a5fa" },
    orange: { bg: "bg-[#fdba74]", lines: "rgba(251,146,60,0.33)", fold: "#fb923c" },
  };
  const c = palette[color] || palette.yellow;

  return (
    <motion.div
      whileHover={{ rotate: rotation * 0.4, scale: 1.05, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${c.bg} ${className} relative overflow-hidden rounded cursor-default shadow-[2px_4px_12px_rgba(0,0,0,0.22),0_1px_3px_rgba(0,0,0,0.15)]`}
      style={{
        padding: "8px 10px 12px",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Lined paper effect */}
      <div
        className="absolute inset-0 rounded pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 16px, ${c.lines} 16px, ${c.lines} 17px)`,
          backgroundPositionY: "22px",
        }}
      />
      {/* Folded corner */}
      <div
        className="absolute bottom-0 right-0 w-[14px] h-[14px] opacity-70"
        style={{ background: `linear-gradient(135deg, transparent 50%, ${c.fold} 50%)` }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   TORN PAPER EDGE
───────────────────────────────────────── */
const TornEdge = () => (
  <div className="w-full overflow-hidden h-9 mb-[-2px]">
    <svg width="100%" height="36" viewBox="0 0 1200 36" preserveAspectRatio="none">
      <path
        d="M0 36 L0 20 Q18 10 36 22 Q54 32 72 16 Q90 4 108 20 Q126 30 144 14 Q162 2 180 18 Q198 30 216 12 Q234 0 252 18 Q270 32 288 14 Q306 2 324 20 Q342 30 360 12 Q378 0 396 18 Q414 28 432 10 Q450 0 468 16 Q486 28 504 12 Q522 2 540 18 Q558 30 576 14 Q594 2 612 20 Q630 30 648 10 Q666 0 684 18 Q702 28 720 12 Q738 2 756 20 Q774 30 792 12 Q810 0 828 18 Q846 30 864 14 Q882 2 900 20 Q918 30 936 10 Q954 0 972 18 Q990 28 1008 12 Q1026 2 1044 20 Q1062 32 1080 14 Q1098 2 1116 20 Q1134 30 1152 16 Q1170 4 1188 22 Q1194 26 1200 24 L1200 36 Z"
        fill="#a6192e"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   HAND-DRAWN UNDERLINE SVG
───────────────────────────────────────── */
const HandUnderline = ({ width = 72 }) => (
  <svg width={width} height={10} viewBox={`0 0 ${width} 10`} className="mt-0.5">
    <path
      d={`M2 7 Q${width * 0.28} 3, ${width * 0.5} 7 Q${width * 0.72} 11, ${width - 2} 5`}
      stroke="rgba(255,200,210,0.8)" strokeWidth="2" fill="none" strokeLinecap="round"
    />
    <path
      d={`M6 9 Q${width * 0.4} 7, ${width * 0.65} 9 Q${width * 0.8} 11, ${width - 4} 8`}
      stroke="rgba(255,200,210,0.4)" strokeWidth="1" fill="none" strokeLinecap="round"
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
    className="flex items-center justify-center w-[34px] h-[34px] sm:w-9 sm:h-9 text-sm sm:text-base rounded-[3px] bg-white/15 border border-white/25 shadow-[1px_2px_6px_rgba(0,0,0,0.2)] text-white no-underline flex-shrink-0 transition-colors hover:bg-white/25"
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
    className="flex items-center gap-2 font-['Caveat',cursive] text-white/80 no-underline leading-relaxed hover:text-white transition-colors text-[13px] sm:text-base"
  >
    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
    <span>{children}</span>
  </motion.a>
);

/* ─────────────────────────────────────────
   RULED LINES OVERLAY
───────────────────────────────────────── */
const RuledLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 32 }, (_, i) => (
      <div
        key={i}
        className="absolute left-0 right-0 h-px bg-white/6"
        style={{ top: 40 + i * 26 }}
      />
    ))}
    {/* White margin line */}
    <div className="absolute top-0 bottom-0 w-px bg-white/12" style={{ left: 56 }} />
  </div>
);

/* ─────────────────────────────────────────
   MAIN FOOTER COMPONENT
───────────────────────────────────────── */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Courses: ["Full Stack Dev", "Data Science", "UI/UX Design", "Product Mgmt", "AI & ML", "Cloud & DevOps"],
    Company: ["About Us", "Careers", "Press Kit", "Blog", "Partnerships"],
    Support: ["Help Center", "Community", "Contact Us", "Status Page", "Refund Policy"],
    Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"],
  };

  const tapeColors = [
    "rgba(255,220,120,0.7)",
    "rgba(200,230,255,0.65)",
    "rgba(180,255,200,0.6)",
    "rgba(255,200,220,0.65)",
  ];
  const tapeRots = [-2, 2, -1, 3];

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&display=swap"
        rel="stylesheet"
      />

      {/* Torn paper transition into footer */}
      <TornEdge />

      <footer className="relative overflow-hidden bg-[#a6192e]">
        <RuledLines />

        {/* ── SPIRAL BINDING (md+) ─────────── */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r from-black/25 via-black/10 to-transparent">
          {Array.from({ length: 22 }, (_, i) => (
            <div
              key={i}
              className="absolute w-[14px] h-[14px] rounded-full bg-black/35 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(255,255,255,0.1)] border border-black/30"
              style={{ left: 13, top: 36 + i * 48 }}
            />
          ))}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />
        </div>

        {/* ── FLOATING STICKY NOTES (lg+/xl+) ── */}
        <motion.div
          className="hidden lg:block absolute top-6 right-8 z-20 pointer-events-none"
          animate={{ y: [0, -6, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <StickyNote color="yellow" rotation={5} className="w-[82px]">
            <p className="font-['Caveat',cursive] text-[12px] text-[#3a2f1a] leading-relaxed">
              🎓 15K+<br />Students!
            </p>
          </StickyNote>
        </motion.div>

        <motion.div
          className="hidden xl:block absolute top-16 right-[18%] z-20 pointer-events-none"
          animate={{ y: [0, 5, 0], rotate: [0, -1, 0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <StickyNote color="pink" rotation={-6} className="w-[76px]">
            <p className="font-['Caveat',cursive] text-[12px] text-[#831843] leading-relaxed">
              ⭐ 4.8<br />Rating
            </p>
          </StickyNote>
        </motion.div>

        {/* ── WASHI TAPE DECORATIONS (sm+) ── */}
        <WashiTape className="hidden sm:block" color="rgba(255,220,120,0.45)" width={90} rotation={-2} top={-6} left={72} />
        <WashiTape className="hidden sm:block" color="rgba(200,230,255,0.45)" width={76} rotation={3} top={-6} right={140} />
        <WashiTape className="hidden sm:block" color="rgba(180,255,200,0.4)" width={68} rotation={-1} top={-6} left="38%" />

        {/* ── DOODLE DECORATIONS (md+) ── */}
        <svg className="hidden md:block absolute bottom-28 right-10 opacity-10 pointer-events-none" width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="28" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
          <circle cx="36" cy="36" r="14" stroke="white" strokeWidth="1" fill="none" />
          <line x1="8" y1="36" x2="64" y2="36" stroke="white" strokeWidth="1" opacity="0.5" />
          <line x1="36" y1="8" x2="36" y2="64" stroke="white" strokeWidth="1" opacity="0.5" />
        </svg>
        <svg className="hidden md:block absolute top-20 left-14 opacity-10 pointer-events-none" width="56" height="56" viewBox="0 0 56 56">
          <rect x="6" y="6" width="44" height="44" rx="3" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <rect x="16" y="16" width="24" height="24" rx="2" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="28" cy="28" r="5" fill="white" opacity="0.5" />
        </svg>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-12 pb-8 sm:pt-12 sm:pb-8 md:pt-14 md:pb-10 lg:pt-16 lg:pb-10">

          {/* ── TOP ROW: Brand + Links (4:8 ratio on md+) ── */}
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">

            {/* Brand Block - 4/12 width on md+ */}
            <div className="w-full md:w-4/12 lg:w-4/12">
              {/* Logo card */}
              <div className="relative inline-block mb-6">
                <div className="absolute -top-5 left-8 z-20">
                  <PaperClip rotation={12} color="rgba(255,255,255,0.6)" />
                </div>
                <div className="rounded-[3px] px-5 py-4 bg-white/12 shadow-[2px_4px_16px_rgba(0,0,0,0.2)] border border-white/20 -rotate-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.2)] text-lg">
                      <img
                        src="/logo4.png"
                        alt="Esperly Logo"
                        className="w-[30px] h-[30px] object-contain"
                        onError={e => { e.target.style.display = "none"; e.target.parentNode.textContent = "🎓"; }}
                      />
                    </div>
                    <div>
                      <h2 className="font-['Fraunces',Georgia,serif] font-black text-white leading-tight text-[1.25rem] sm:text-[1.4rem] md:text-[1.625rem]">
                        Esperly
                      </h2>
                      <HandUnderline width={72} />
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-5 leading-relaxed font-['Caveat',cursive] text-white/75 text-[13px] sm:text-sm md:text-base">
                Learn from industry experts with modern online courses designed for the future of education. 600+ courses across 6 disciplines.
              </p>

              {/* Social Icons */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { icon: "𝕏", label: "Twitter / X" },
                  { icon: "in", label: "LinkedIn" },
                  { icon: "▶", label: "YouTube" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "💬", label: "Discord" },
                ].map((s, i) => <SocialBtn key={i} {...s} />)}
              </div>
            </div>

            {/* ── LINK COLUMNS GRID - 8/12 width on md+ ── */}
            <div className="w-full md:w-8/12 lg:w-8/12">
              <div className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-4 md:gap-8">
                {Object.entries(links).map(([heading, items], ci) => (
                  <div key={heading} className="relative">
                    <div className="relative inline-block mb-4">
                      <div className="absolute -top-4 left-2" style={{ transform: `rotate(${tapeRots[ci]}deg)` }}>
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
                      <h4 className="relative z-10 pt-1 font-['Fraunces',Georgia,serif] font-black text-white tracking-wider uppercase text-[11px] sm:text-xs md:text-sm">
                        {heading}
                      </h4>
                    </div>
                    <nav className="flex flex-col gap-2">
                      {items.map(item => <NbLink key={item}>{item}</NbLink>)}
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="relative my-8">
            <div className="w-full border-t-2 border-dashed border-white/20" />
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <PaperClip rotation={90} color="rgba(255,255,255,0.4)" scale={0.75} />
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div>
            <div className="w-full mb-5 border-t border-dashed border-white/15" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:pl-6 flex-wrap">

              {/* Copyright */}
              <div className="rounded-[3px] px-4 py-2 bg-white/10 shadow-[1px_2px_6px_rgba(0,0,0,0.15)] -rotate-0.5"
                style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 16px, rgba(255,255,255,0.03) 16px, rgba(255,255,255,0.03) 17px)" }}>
                <p className="font-['Caveat',cursive] text-white/85 text-[11px] sm:text-xs md:text-sm">
                  © {currentYear} Esperly Education Pvt. Ltd. — All rights reserved ✦
                </p>
              </div>

              {/* Bottom links */}
              <div className="flex gap-4 flex-wrap justify-center">
                {["Privacy", "Terms", "Cookies", "Sitemap"].map((l, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ color: "white" }}
                    className="font-['Caveat',cursive] text-white/55 no-underline transition-colors text-[12px] sm:text-sm"
                  >
                    {l}
                  </motion.a>
                ))}
              </div>

              {/* Made with */}
              <div className="font-['Caveat',cursive] text-white/55 rotate-1 text-[12px] sm:text-sm text-center sm:text-right">
                Made with ❤️ for learners everywhere
              </div>
            </div>
          </div>
        </div>

        {/* Bottom shadow */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-2 bg-gradient-to-t from-black/12 to-transparent" />
      </footer>
    </>
  );
};

export default Footer;