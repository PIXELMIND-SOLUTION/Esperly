import React, { useState } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────
   RESPONSIVE STYLES
───────────────────────────────────────── */
const RESPONSIVE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&display=swap');

  * { box-sizing: border-box; }

  .footer-root {
    position: relative;
    overflow: hidden;
    background: rgb(166, 25, 46);
  }

  /* Ruled lines — subtler on red bg */
  .footer-ruled-line {
    background: rgba(255,255,255,0.06);
  }
  .footer-margin-line {
    background: rgba(255,255,255,0.12);
  }

  /* Main content wrapper */
  .footer-content {
    position: relative;
    z-index: 10;
    max-width: 1280px;
    margin: 0 auto;
    padding: 3rem 1rem 2rem;
  }
  @media (min-width: 480px) {
    .footer-content { padding: 3rem 1.5rem 2rem; }
  }
  @media (min-width: 768px) {
    .footer-content { padding: 3.5rem 3rem 2rem; }
  }
  @media (min-width: 1024px) {
    .footer-content { padding: 4rem 4rem 2.5rem; }
  }

  /* Top row: brand + newsletter */
  .footer-top-row {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-bottom: 3rem;
  }
  @media (min-width: 1024px) {
    .footer-top-row {
      flex-direction: row;
      gap: 5rem;
    }
  }

  /* Brand block max width */
  .footer-brand {
    flex-shrink: 0;
    width: 100%;
  }
  @media (min-width: 1024px) {
    .footer-brand { max-width: 280px; }
  }

  /* Newsletter block */
  .footer-newsletter-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  /* Newsletter card */
  .newsletter-card {
    border-radius: 3px;
    padding: 1.25rem;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(4px);
    backgroundImage: repeating-linear-gradient(transparent, transparent 26px, rgba(255,255,255,0.04) 26px, rgba(255,255,255,0.04) 27px);
    position: relative;
    margin-top: 0.75rem;
  }
  @media (min-width: 480px) {
    .newsletter-card { padding: 1.5rem; }
  }

  /* Mini stat sticky notes */
  .stat-notes-row {
    display: flex;
    gap: 0.625rem;
    flex-wrap: wrap;
    margin-top: 0.625rem;
  }

  /* Link columns grid */
  .footer-links-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem 1.25rem;
    margin-bottom: 2.5rem;
  }
  @media (min-width: 640px) {
    .footer-links-grid { gap: 2rem 1.5rem; }
  }
  @media (min-width: 768px) {
    .footer-links-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      padding-left: 1.5rem;
    }
  }

  /* App badges row */
  .app-badges-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }
  @media (min-width: 768px) {
    .app-badges-row { padding-left: 1.5rem; }
  }

  /* Bottom bar */
  .footer-bottom-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  @media (min-width: 640px) {
    .footer-bottom-bar { flex-direction: row; }
  }
  @media (min-width: 768px) {
    .footer-bottom-bar { padding-left: 1.5rem; }
  }

  /* Spiral binding — hide on mobile */
  .footer-spiral {
    display: none;
  }
  @media (min-width: 768px) {
    .footer-spiral { display: block; }
  }

  /* Floating sticky notes — hide on smaller screens */
  .sticky-float-1 { display: none; }
  .sticky-float-2 { display: none; }
  @media (min-width: 1024px) { .sticky-float-1 { display: block; } }
  @media (min-width: 1280px) { .sticky-float-2 { display: block; } }

  /* Doodles */
  .footer-doodle-1 { display: none; }
  .footer-doodle-2 { display: none; }
  @media (min-width: 768px) {
    .footer-doodle-1 { display: block; }
    .footer-doodle-2 { display: block; }
  }

  /* Newsletter input layout */
  .newsletter-input-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .newsletter-input {
    flex: 1;
    min-width: 130px;
  }
  @media (min-width: 480px) {
    .newsletter-input { min-width: 160px; }
  }

  /* Logo card responsive sizing */
  .logo-heading {
    font-size: clamp(1.25rem, 4vw, 1.625rem);
  }

  /* Brand description */
  .brand-desc {
    font-size: clamp(13px, 2.5vw, 15px);
  }

  /* Section heading */
  .section-col-heading {
    font-size: clamp(11px, 2vw, 14px);
  }

  /* Nav links */
  .nb-link-text {
    font-size: clamp(13px, 2.5vw, 16px);
  }

  /* Copyright sticky */
  .copyright-sticky {
    font-size: clamp(11px, 2.5vw, 14px);
  }

  /* Bottom links */
  .bottom-link {
    font-size: clamp(12px, 2.5vw, 14px);
  }

  /* Made with text */
  .made-with {
    font-size: clamp(12px, 2.5vw, 14px);
  }

  /* Newsletter heading */
  .newsletter-heading {
    font-size: clamp(16px, 3vw, 20px);
  }

  /* Stat note width */
  .stat-note-width {
    width: clamp(58px, 16vw, 72px);
  }

  /* Subscribe button text */
  .subscribe-btn {
    font-size: clamp(13px, 2.5vw, 15px);
    white-space: nowrap;
    padding: 0.5rem 0.875rem;
    flex-shrink: 0;
  }

  /* Washi tape — hide the decorative ones on very small screens */
  .washi-deco { display: none; }
  @media (min-width: 480px) { .washi-deco { display: block; } }

  /* Social icon buttons */
  .social-btn {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }
  @media (min-width: 480px) {
    .social-btn { width: 36px; height: 36px; font-size: 16px; }
  }

  /* App store badge font sizes */
  .app-store-label { font-size: clamp(7px, 1.5vw, 9px); }
  .app-store-name  { font-size: clamp(11px, 2vw, 13px); }
`;

/* ─────────────────────────────────────────
   NOTEBOOK RULED LINES OVERLAY
───────────────────────────────────────── */
const RuledLines = () => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
    {Array.from({ length: 32 }, (_, i) => (
      <div
        key={i}
        className="footer-ruled-line"
        style={{ position:"absolute", left:0, right:0, top: 40 + i * 26, height: 1 }}
      />
    ))}
    {/* White margin line */}
    <div
      className="footer-margin-line"
      style={{ position:"absolute", top:0, bottom:0, left:56, width:1.5 }}
    />
  </div>
);

/* ─────────────────────────────────────────
   WASHI TAPE
───────────────────────────────────────── */
const WashiTape = ({ width = 72, rotation = -2, color, top, left, right, bottom, className="" }) => {
  const id = `washi-${Math.random().toString(36).slice(2,7)}`;
  return (
    <div
      className={`${className}`}
      style={{ position:"absolute", pointerEvents:"none", zIndex:10, top, left, right, bottom, transform:`rotate(${rotation}deg)` }}
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
   PAPER CLIP
───────────────────────────────────────── */
const PaperClip = ({ rotation = 0, color = "#e8d0d8", scale = 1 }) => (
  <div style={{ transform:`rotate(${rotation}deg) scale(${scale})`, filter:"drop-shadow(0 2px 3px rgba(0,0,0,0.3))", pointerEvents:"none" }}>
    <svg width="20" height="48" viewBox="0 0 20 48" fill="none">
      <path
        d="M10 3C6 3 2 6 2 11 L2 35 C2 43 6 47 10 47 C14 47 18 43 18 35 L18 15 C18 10.5 15.5 8 12.5 8 L10 8 C7.5 8 5 10 5 13 L5 33 C5 36 7.2 38.5 10 38.5 C12.8 38.5 15 36 15 33 L15 17"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   STICKY NOTE
───────────────────────────────────────── */
const StickyNote = ({ color, rotation = 0, children, style = {} }) => {
  const palette = {
    yellow: { bg:"#fef08a", lines:"#e5c84a55", fold:"#e5c84a" },
    pink:   { bg:"#fda4af", lines:"#f472b655", fold:"#f472b6" },
    green:  { bg:"#86efac", lines:"#4ade8055", fold:"#4ade80" },
    blue:   { bg:"#93c5fd", lines:"#60a5fa55", fold:"#60a5fa" },
    orange: { bg:"#fdba74", lines:"#fb923c55", fold:"#fb923c" },
  };
  const c = palette[color] || palette.yellow;
  return (
    <motion.div
      whileHover={{ rotate: rotation * 0.4, scale: 1.05, zIndex: 50 }}
      transition={{ type:"spring", stiffness:300 }}
      style={{
        background: c.bg,
        borderRadius: 3,
        padding: "8px 10px 12px",
        transform: `rotate(${rotation}deg)`,
        boxShadow: "2px 4px 12px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.15)",
        position: "relative", overflow: "hidden", cursor: "default",
        ...style,
      }}
    >
      <div style={{
        position:"absolute", inset:0, borderRadius:3, pointerEvents:"none",
        backgroundImage:`repeating-linear-gradient(transparent, transparent 16px, ${c.lines} 16px, ${c.lines} 17px)`,
        backgroundPositionY:"22px",
      }}/>
      <div style={{ position:"absolute", bottom:0, right:0, width:14, height:14, opacity:0.7,
        background:`linear-gradient(135deg, transparent 50%, ${c.fold} 50%)` }}/>
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   TORN PAPER EDGE
───────────────────────────────────────── */
const TornEdge = () => (
  <div style={{ width:"100%", overflow:"hidden", height:36, marginBottom:-2 }}>
    <svg width="100%" height="36" viewBox="0 0 1200 36" preserveAspectRatio="none">
      <path
        d="M0 36 L0 20 Q18 10 36 22 Q54 32 72 16 Q90 4 108 20 Q126 30 144 14 Q162 2 180 18 Q198 30 216 12 Q234 0 252 18 Q270 32 288 14 Q306 2 324 20 Q342 30 360 12 Q378 0 396 18 Q414 28 432 10 Q450 0 468 16 Q486 28 504 12 Q522 2 540 18 Q558 30 576 14 Q594 2 612 20 Q630 30 648 10 Q666 0 684 18 Q702 28 720 12 Q738 2 756 20 Q774 30 792 12 Q810 0 828 18 Q846 30 864 14 Q882 2 900 20 Q918 30 936 10 Q954 0 972 18 Q990 28 1008 12 Q1026 2 1044 20 Q1062 32 1080 14 Q1098 2 1116 20 Q1134 30 1152 16 Q1170 4 1188 22 Q1194 26 1200 24 L1200 36 Z"
        fill="rgb(166,25,46)"
      />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   HAND-DRAWN UNDERLINE SVG
───────────────────────────────────────── */
const HandUnderline = ({ width = 72 }) => (
  <svg width={width} height={10} viewBox={`0 0 ${width} 10`} style={{ marginTop:2 }}>
    <path
      d={`M2 7 Q${width*0.28} 3, ${width*0.5} 7 Q${width*0.72} 11, ${width-2} 5`}
      stroke="rgba(255,200,210,0.8)" strokeWidth="2" fill="none" strokeLinecap="round"
    />
    <path
      d={`M6 9 Q${width*0.4} 7, ${width*0.65} 9 Q${width*0.8} 11, ${width-4} 8`}
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
    whileHover={{ y:-3, rotate:-4, scale:1.08 }}
    whileTap={{ scale:0.93 }}
    className="social-btn"
    style={{
      display:"flex", alignItems:"center", justifyContent:"center",
      borderRadius:"3px",
      background:"rgba(255,255,255,0.15)",
      border:"1.5px solid rgba(255,255,255,0.25)",
      boxShadow:"1px 2px 6px rgba(0,0,0,0.2)",
      color:"white",
      textDecoration:"none",
      flexShrink:0,
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
    whileHover={{ x:3 }}
    transition={{ type:"spring", stiffness:400 }}
    style={{
      display:"flex", alignItems:"center", gap:"0.5rem",
      fontFamily:"'Caveat', cursive",
      color:"rgba(255,255,255,0.8)",
      textDecoration:"none", lineHeight:1.5,
    }}
  >
    <span style={{
      flexShrink:0, width:6, height:6, borderRadius:"50%",
      background:"rgba(255,255,255,0.5)", display:"inline-block",
    }}/>
    <span className="nb-link-text" style={{ transition:"color 0.2s" }}
      onMouseEnter={e=>e.target.style.color="white"}
      onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.8)"}
    >{children}</span>
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
    setTimeout(()=>{ setSent(false); setVal(""); }, 2800);
  };

  return (
    <div>
      <p style={{ fontFamily:"'Caveat', cursive", fontSize:"clamp(12px,2.5vw,13px)", color:"rgba(255,255,255,0.65)", marginBottom:8 }}>
        ✏️ Drop your email — we'll write back
      </p>
      <div className="newsletter-input-row">
        <input
          type="email"
          value={val}
          onChange={e=>setVal(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&handleSend()}
          placeholder="your@email.com"
          className="newsletter-input"
          style={{
            fontFamily:"'Caveat', cursive", fontSize:"clamp(13px,2.5vw,15px)",
            background:"rgba(255,255,255,0.15)",
            borderRadius:"3px",
            border:"1.5px solid rgba(255,255,255,0.3)",
            padding:"0.5rem 0.75rem",
            color:"white", outline:"none",
            boxShadow:"inset 0 1px 3px rgba(0,0,0,0.15)",
          }}
          onFocus={e=>{ e.target.style.borderColor="rgba(255,255,255,0.6)"; e.target.style.background="rgba(255,255,255,0.2)"; }}
          onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.3)"; e.target.style.background="rgba(255,255,255,0.15)"; }}
        />
        <motion.button
          whileHover={{ scale:1.05, rotate:-1 }}
          whileTap={{ scale:0.95 }}
          onClick={handleSend}
          className="subscribe-btn"
          style={{
            fontFamily:"'Caveat', cursive", fontWeight:700,
            background: sent ? "rgba(34,197,94,0.85)" : "rgba(255,255,255,0.22)",
            color:"white",
            border:"1.5px solid rgba(255,255,255,0.35)",
            borderRadius:"3px",
            boxShadow:"2px 3px 10px rgba(0,0,0,0.2)",
            cursor:"pointer", transition:"background 0.3s",
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
    Courses:  ["Full Stack Dev","Data Science","UI/UX Design","Product Mgmt","AI & ML","Cloud & DevOps"],
    Company:  ["About Us","Careers","Press Kit","Blog","Partnerships"],
    Support:  ["Help Center","Community","Contact Us","Status Page","Refund Policy"],
    Legal:    ["Privacy Policy","Terms of Use","Cookie Policy","Accessibility"],
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
      <style>{RESPONSIVE_STYLES}</style>

      {/* Torn paper transition into footer */}
      <TornEdge />

      <footer className="footer-root">
        <RuledLines />

        {/* ── SPIRAL BINDING ─────────── */}
        <div
          className="footer-spiral"
          style={{
            position:"absolute", top:0, bottom:0, left:0, zIndex:10, width:48,
            background:"linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)",
          }}
        >
          {Array.from({ length:22 }, (_,i)=>(
            <div key={i} style={{
              position:"absolute", left:13, top: 36+i*48,
              width:14, height:14, borderRadius:"50%",
              background:"rgba(0,0,0,0.35)",
              boxShadow:"inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.1)",
              border:"1px solid rgba(0,0,0,0.3)",
            }}/>
          ))}
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:1.5, background:"rgba(255,255,255,0.1)" }}/>
        </div>

        {/* ── FLOATING STICKY NOTES ── */}
        <motion.div
          className="sticky-float-1"
          animate={{ y:[0,-6,0], rotate:[0,1,-1,0] }}
          transition={{ duration:7, repeat:Infinity, ease:"easeInOut" }}
          style={{ position:"absolute", top:24, right:32, zIndex:20, pointerEvents:"none" }}
        >
          <StickyNote color="yellow" rotation={5} style={{ width:82 }}>
            <p style={{ fontFamily:"'Caveat', cursive", fontSize:12, color:"#3a2f1a", lineHeight:1.6 }}>
              🎓 15K+<br/>Students!
            </p>
          </StickyNote>
        </motion.div>

        <motion.div
          className="sticky-float-2"
          animate={{ y:[0,5,0], rotate:[0,-1,0.5,0] }}
          transition={{ duration:8, repeat:Infinity, ease:"easeInOut", delay:1.5 }}
          style={{ position:"absolute", top:64, right:"18%", zIndex:20, pointerEvents:"none" }}
        >
          <StickyNote color="pink" rotation={-6} style={{ width:76 }}>
            <p style={{ fontFamily:"'Caveat', cursive", fontSize:12, color:"#831843", lineHeight:1.6 }}>
              ⭐ 4.8<br/>Rating
            </p>
          </StickyNote>
        </motion.div>

        {/* ── WASHI TAPE DECORATIONS ── */}
        <WashiTape className="washi-deco" color="rgba(255,220,120,0.45)" width={90} rotation={-2} top={-6} left={72}/>
        <WashiTape className="washi-deco" color="rgba(200,230,255,0.45)" width={76} rotation={3}  top={-6} right={140}/>
        <WashiTape className="washi-deco" color="rgba(180,255,200,0.4)"  width={68} rotation={-1} top={-6} left="38%"/>

        {/* ── DOODLE DECORATIONS ── */}
        <svg className="footer-doodle-1" style={{ position:"absolute", bottom:112, right:40, opacity:0.1, pointerEvents:"none" }}
          width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="28" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="5 3"/>
          <circle cx="36" cy="36" r="14" stroke="white" strokeWidth="1" fill="none"/>
          <line x1="8" y1="36" x2="64" y2="36" stroke="white" strokeWidth="1" opacity="0.5"/>
          <line x1="36" y1="8" x2="36" y2="64" stroke="white" strokeWidth="1" opacity="0.5"/>
        </svg>
        <svg className="footer-doodle-2" style={{ position:"absolute", top:80, left:56, opacity:0.1, pointerEvents:"none" }}
          width="56" height="56" viewBox="0 0 56 56">
          <rect x="6" y="6" width="44" height="44" rx="3" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
          <rect x="16" y="16" width="24" height="24" rx="2" stroke="white" strokeWidth="1" fill="none"/>
          <circle cx="28" cy="28" r="5" fill="white" opacity="0.5"/>
        </svg>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <div className="footer-content">

          {/* ── TOP ROW: Brand + Newsletter ── */}
          <div className="footer-top-row">

            {/* Brand Block */}
            <div className="footer-brand">
              {/* Logo card */}
              <div style={{ position:"relative", display:"inline-block", marginBottom:"1.5rem" }}>
                <div style={{ position:"absolute", top:"-1.25rem", left:"2rem", zIndex:20 }}>
                  <PaperClip rotation={12} color="rgba(255,255,255,0.6)"/>
                </div>
                <div style={{
                  borderRadius:"3px", padding:"1rem 1.25rem",
                  background:"rgba(255,255,255,0.12)",
                  boxShadow:"2px 4px 16px rgba(0,0,0,0.2)",
                  border:"1px solid rgba(255,255,255,0.2)",
                  transform:"rotate(-1deg)",
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                    <div style={{
                      width:40, height:40, borderRadius:"50%",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                      background:"rgba(255,255,255,0.2)",
                      boxShadow:"0 2px 10px rgba(0,0,0,0.2)",
                      fontSize:18,
                    }}>
                      <img src="/logo4.png" alt="Esperly Logo" style={{ width:30, height:30 }}
                        onError={e=>{ e.target.style.display="none"; e.target.parentNode.textContent="🎓"; }}
                      />
                    </div>
                    <div>
                      <h2 className="logo-heading" style={{
                        fontFamily:"Fraunces, Georgia, serif", fontWeight:900,
                        color:"white", lineHeight:1,
                      }}>
                        Esperly
                      </h2>
                      <HandUnderline width={72}/>
                    </div>
                  </div>
                </div>
              </div>

              <p className="brand-desc" style={{
                marginBottom:"1.25rem", lineHeight:1.7,
                fontFamily:"'Caveat', cursive", color:"rgba(255,255,255,0.75)",
              }}>
                Learn from industry experts with modern online courses designed for the future of education. 600+ courses across 6 disciplines.
              </p>

              {/* Social Icons */}
              <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                {[
                  { icon:"𝕏",  label:"Twitter / X" },
                  { icon:"in", label:"LinkedIn" },
                  { icon:"▶",  label:"YouTube" },
                  { icon:"📸", label:"Instagram" },
                  { icon:"💬", label:"Discord" },
                ].map((s,i)=><SocialBtn key={i} {...s}/>)}
              </div>
            </div>

            {/* Newsletter Block */}
            <div className="footer-newsletter-block">
              {/* Heading with washi */}
              <div style={{ position:"relative", display:"inline-block", marginBottom:"1.25rem", width:"100%" }}>
                <div style={{
                  position:"absolute", top:"-1.25rem", left:"50%",
                  transform:"translateX(-50%) rotate(-1deg)", zIndex:10,
                }}>
                  <svg width={110} height={20} viewBox="0 0 110 20">
                    <defs>
                      <pattern id="washi-nl" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="1.5" fill="rgba(255,255,255,0.38)"/>
                      </pattern>
                    </defs>
                    <rect width={110} height={20} rx={2} fill="rgba(255,200,210,0.55)"/>
                    <rect width={110} height={20} rx={2} fill="url(#washi-nl)"/>
                  </svg>
                </div>

                <div className="newsletter-card">
                  <div style={{ position:"absolute", right:"0.75rem", top:"0.75rem" }}>
                    <PaperClip rotation={-8} color="rgba(255,255,255,0.5)" scale={0.8}/>
                  </div>
                  <div style={{ marginBottom:"1rem" }}>
                    <h3 className="newsletter-heading" style={{
                      fontFamily:"Fraunces, Georgia, serif", fontWeight:900,
                      color:"white", lineHeight:1.2, marginBottom:"0.25rem",
                    }}>
                      Stay in the loop
                      <span style={{ color:"rgba(255,220,150,0.9)", fontStyle:"italic" }}> ✦</span>
                    </h3>
                    <p style={{ fontFamily:"'Caveat', cursive", fontSize:"clamp(12px,2.5vw,14px)", color:"rgba(255,255,255,0.6)" }}>
                      Course launches, tips & community news — no spam, ever.
                    </p>
                  </div>
                  <Newsletter/>
                </div>
              </div>

              {/* Mini stat sticky notes */}
              <div className="stat-notes-row">
                {[
                  { num:"15K+", label:"Learners", color:"yellow", rot:-2 },
                  { num:"600+", label:"Courses",  color:"green",  rot:1.5 },
                  { num:"75+",  label:"Experts",  color:"blue",   rot:-1 },
                  { num:"50+",  label:"Countries",color:"orange", rot:2 },
                ].map(({ num, label, color, rot }, i)=>(
                  <StickyNote key={i} color={color} rotation={rot}
                    style={{ width:"clamp(58px, 16vw, 72px)" }}>
                    <div style={{ fontFamily:"'Caveat', cursive", textAlign:"center" }}>
                      <div style={{ fontSize:"clamp(14px,3.5vw,18px)", fontWeight:700, color:"#A6192E", lineHeight:1 }}>{num}</div>
                      <div style={{ fontSize:"clamp(9px,2vw,11px)", color:"#555", marginTop:2 }}>{label}</div>
                    </div>
                  </StickyNote>
                ))}
              </div>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{ position:"relative", margin:"2rem 0" }}>
            <div style={{ width:"100%", borderTop:"2px dashed rgba(255,255,255,0.2)" }}/>
            <div style={{ position:"absolute", top:"-1.25rem", left:"50%", transform:"translateX(-50%)" }}>
              <PaperClip rotation={90} color="rgba(255,255,255,0.4)" scale={0.75}/>
            </div>
          </div>

          {/* ── LINK COLUMNS ── */}
          <div className="footer-links-grid">
            {Object.entries(links).map(([heading, items], ci)=>(
              <div key={heading} style={{ position:"relative" }}>
                <div style={{ position:"relative", display:"inline-block", marginBottom:"1rem" }}>
                  <div style={{ position:"absolute", top:"-1rem", left:"0.5rem", transform:`rotate(${tapeRots[ci]}deg)` }}>
                    <svg width={heading.length*8+20} height={18} viewBox={`0 0 ${heading.length*8+20} 18`}>
                      <defs>
                        <pattern id={`wt-col-${ci}`} width="9" height="9" patternUnits="userSpaceOnUse">
                          <circle cx="4.5" cy="4.5" r="1.3" fill="rgba(255,255,255,0.35)"/>
                        </pattern>
                      </defs>
                      <rect width={heading.length*8+20} height={18} rx={2} fill={tapeColors[ci]}/>
                      <rect width={heading.length*8+20} height={18} rx={2} fill={`url(#wt-col-${ci})`}/>
                    </svg>
                  </div>
                  <h4 className="section-col-heading" style={{
                    position:"relative", zIndex:10, paddingTop:"0.25rem",
                    fontFamily:"Fraunces, Georgia, serif", fontWeight:900,
                    color:"white", letterSpacing:"0.04em", textTransform:"uppercase",
                  }}>
                    {heading}
                  </h4>
                </div>
                <nav style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                  {items.map(item=><NbLink key={item}>{item}</NbLink>)}
                </nav>
              </div>
            ))}
          </div>

          {/* ── APP BADGES ── */}
          {/* <div className="app-badges-row">
            <p style={{ fontFamily:"'Caveat', cursive", fontSize:"clamp(12px,2.5vw,14px)", color:"rgba(255,255,255,0.65)", alignSelf:"center" }}>
              📱 Get the app:
            </p>
            {["App Store","Google Play"].map((store,i)=>(
              <motion.a
                key={i}
                href="#"
                whileHover={{ y:-2, rotate:i===0?-1:1, scale:1.04 }}
                style={{
                  display:"flex", alignItems:"center", gap:"0.5rem",
                  borderRadius:"3px", padding:"0.5rem 1rem",
                  background:"rgba(255,255,255,0.12)",
                  border:"1.5px solid rgba(255,255,255,0.2)",
                  boxShadow:"1px 2px 8px rgba(0,0,0,0.15)",
                  textDecoration:"none",
                }}
              >
                <span style={{ fontSize:"clamp(14px,3vw,18px)" }}>{i===0?"🍎":"🤖"}</span>
                <div>
                  <div className="app-store-label" style={{ color:"rgba(255,255,255,0.6)", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"monospace" }}>
                    {i===0?"Download on the":"Get it on"}
                  </div>
                  <div className="app-store-name" style={{ fontFamily:"Fraunces, Georgia, serif", fontWeight:700, color:"white" }}>
                    {store}
                  </div>
                </div>
              </motion.a>
            ))}
          </div> */}

          {/* ── BOTTOM BAR ── */}
          <div>
            <div style={{ width:"100%", marginBottom:"1.25rem", borderTop:"1px dashed rgba(255,255,255,0.15)" }}/>
            <div className="footer-bottom-bar">
              {/* Copyright */}
              <div style={{
                borderRadius:"3px", padding:"0.5rem 1rem",
                background:"rgba(255,255,255,0.1)",
                boxShadow:"1px 2px 6px rgba(0,0,0,0.15)",
                transform:"rotate(-0.5deg)",
                backgroundImage:"repeating-linear-gradient(transparent, transparent 16px, rgba(255,255,255,0.03) 16px, rgba(255,255,255,0.03) 17px)",
              }}>
                <p className="copyright-sticky" style={{ fontFamily:"'Caveat', cursive", color:"rgba(255,255,255,0.85)" }}>
                  © {currentYear} Esperly Education Pvt. Ltd. — All rights reserved ✦
                </p>
              </div>

              {/* Bottom links */}
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }}>
                {["Privacy","Terms","Cookies","Sitemap"].map((l,i)=>(
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ color:"white" }}
                    className="bottom-link"
                    style={{
                      fontFamily:"'Caveat', cursive",
                      color:"rgba(255,255,255,0.55)", textDecoration:"none", transition:"color 0.2s",
                    }}
                  >
                    {l}
                  </motion.a>
                ))}
              </div>

              {/* Made with */}
              <div className="made-with" style={{
                fontFamily:"'Caveat', cursive",
                color:"rgba(255,255,255,0.55)",
                transform:"rotate(1deg)",
              }}>
                Made with ❤️ for learners everywhere
              </div>
            </div>
          </div>
        </div>

        {/* Bottom shadow */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, pointerEvents:"none",
          height:8, background:"linear-gradient(180deg, transparent, rgba(0,0,0,0.12))",
        }}/>
      </footer>
    </>
  );
};

export default Footer;