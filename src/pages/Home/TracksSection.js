import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS ─────────────────────────────────────────── */
const PAPER = "#F9F5ED";
const PAPER2 = "#F2EBD9";
const PAPER3 = "#EDE3CC";
const RULED = "#D6CEBA";
const INK = "#1C1209";
const FADED = "#7A6E5A";
const RED = "#A6192E";
const BLUE = "#3B6FA0";
const GREEN = "#2E7D52";
const CLIP = "#9E9E9E";
const CLIP2 = "#BDBDBD";

const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
  <svg width={size} height={size * 2.2} viewBox="0 0 24 52" fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={CLIP2} strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 4" opacity="0.6" fill="none" />
  </svg>
);

const WashiTape = ({ width = 60, height = 18, color = "rgba(200,195,170,0.55)", rotate = -2, style = {} }) => (
  <div style={{
    width, height, background: color,
    borderLeft: "1px solid rgba(180,170,140,0.3)",
    borderRight: "1px solid rgba(180,170,140,0.3)",
    transform: `rotate(${rotate}deg)`,
    position: "absolute", ...style,
  }} />
);

const Highlight = ({ children, color = "#FFEB3B", style = {} }) => (
  <span style={{
    background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`,
    paddingBottom: 2, ...style,
  }}>
    {children}
  </span>
);

const ScribbleUnderline = ({ color = RED, width = "100%", style = {} }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none"
    style={{ width, height: 12, display: "block", ...style }}>
    <path d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const RuledLines = ({ count = 20, topOffset = 60, gap = 26 }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} style={{
        position: "absolute", left: 0, right: 0,
        top: topOffset + i * gap, height: 1,
        background: RULED, opacity: 0.45,
      }} />
    ))}
    <div style={{
      position: "absolute", top: 0, bottom: 0,
      left: "clamp(40px,6vw,72px)", width: 1.5,
      background: RED, opacity: 0.2,
    }} />
  </div>
);

const TrackPill = ({ tr, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.52, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "clamp(10px,1.5vw,16px)",
        background: hovered ? PAPER : PAPER2,
        border: `1px solid ${RULED}`, borderLeft: `4px solid ${tr.color}`,
        borderRadius: "0 3px 3px 0",
        padding: "clamp(10px,1.4vw,16px) clamp(12px,1.6vw,20px)",
        cursor: "default", position: "relative",
        transition: "background 0.25s, box-shadow 0.25s",
        boxShadow: hovered ? `2px 4px 20px ${tr.color}28` : "1px 2px 6px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: RULED, opacity: 0.4 }} />
      <span style={{ fontSize: "clamp(18px,2.2vw,24px)", color: tr.color, flexShrink: 0 }}>{tr.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "Fraunces, Georgia, serif", color: INK,
          fontSize: "clamp(12px,1.4vw,16px)", fontWeight: 600, margin: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{tr.name}</p>
        <p style={{
          fontFamily: "monospace", fontSize: "clamp(9px,1vw,10px)",
          color: FADED, margin: "2px 0 0", fontStyle: "italic",
        }}>{tr.note}</p>
      </div>
      {index === 0 && (
        <div style={{ position: "absolute", top: -4, right: 24, opacity: 0.4 }}>
          <Paperclip size={14} color={CLIP} rotate={12} />
        </div>
      )}
      <div style={{
        fontFamily: "monospace", fontSize: "clamp(9px,1vw,11px)",
        color: tr.color, background: tr.color + "18",
        border: `1px solid ${tr.color}44`, borderRadius: 2,
        padding: "2px 8px", letterSpacing: "0.1em", flexShrink: 0, fontWeight: 700,
      }}>{tr.hours}</div>
    </motion.div>
  );
};

const tracks = [
  { name: "Full Stack Dev", hours: "240h", icon: "⬡", color: RED, note: "Most popular" },
  { name: "Data Science", hours: "200h", icon: "⬢", color: BLUE, note: "High demand" },
  { name: "UI/UX Design", hours: "160h", icon: "⬣", color: GREEN, note: "Creative track" },
  { name: "Product Management", hours: "180h", icon: "⬡", color: RED, note: "Leadership" },
  { name: "AI & ML", hours: "220h", icon: "⬢", color: "#6A0DAD", note: "Future-ready" },
  { name: "Cloud & DevOps", hours: "190h", icon: "⬣", color: "#B05A1A", note: "Infrastructure" },
];

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
      filter: "blur(1px)",
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

const heroBubbles = [
  { size: "200px", fill: "rgba(166,25,46,0.10)", left: "3%", top: "8%", floatY: "-24px", floatX: 14, dur: 7, delay: 0, opacity: 0.45 },
  { size: "130px", fill: "rgba(166,25,46,0.07)", left: "78%", top: "4%", floatY: "-30px", floatX: -12, dur: 8.5, delay: 1, opacity: 0.4 },
  { size: "95px", fill: "rgba(166,25,46,0.13)", left: "58%", top: "68%", floatY: "-18px", floatX: 9, dur: 6, delay: 2, opacity: 0.5 },
  { size: "65px", fill: "rgba(166,25,46,0.09)", left: "18%", top: "72%", floatY: "-14px", floatX: -7, dur: 5, delay: 0.5, opacity: 0.45 },
];

const PenSVG = ({ size = 140, rotate = 20, style = {} }) => (
  <svg width={size} height={size * 0.14} viewBox="0 0 220 30" fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <rect x="30" y="5" width="150" height="20" rx="10" fill={RED} />
    <rect x="30" y="5" width="150" height="20" rx="10" stroke="#C8203A" strokeWidth="1" />
    <rect x="35" y="7" width="140" height="5" rx="3" fill="rgba(255,255,255,0.15)" />
    <rect x="155" y="3" width="5" height="22" rx="2" fill={CLIP} stroke={CLIP2} strokeWidth="0.5" />
    <circle cx="157.5" cy="25" r="3" fill={CLIP} />
    <rect x="45" y="5" width="30" height="20" rx="2" fill="#C8203A" opacity="0.5" />
    {[0, 3, 6, 9, 12, 15, 18, 21, 24, 27].map(x => (
      <line key={x} x1={47 + x} y1="5" x2={47 + x} y2="25" stroke="#C8203A" strokeWidth="0.5" opacity="0.5" />
    ))}
    <polygon points="30,8 30,22 8,15" fill="#C0C0C0" />
    <polygon points="15,11 15,19 8,15" fill="#888" />
    <line x1="8" y1="15" x2="30" y2="10" stroke="#999" strokeWidth="0.5" />
    <line x1="8" y1="15" x2="30" y2="20" stroke="#999" strokeWidth="0.5" />
    <rect x="178" y="5" width="22" height="20" rx="10" fill="#C8203A" />
  </svg>
);

const SlideIn = ({ children, from = "left", delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >{children}</motion.div>
  );
};

export default function TracksSection() {
  return (
    <section style={{
      background: PAPER2,
      borderTop: `1px solid ${RULED}`,
      borderBottom: `1px solid ${RULED}`,
      padding: "clamp(40px,6vw,80px) clamp(20px,5vw,60px)",
      position: "relative",
      overflow: "hidden",
    }}>
      <RuledLines count={28} topOffset={0} gap={26} />

      {/* Decorative overlays */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", filter: "blur(90px)", background: `radial-gradient(circle, ${BLUE}14, transparent)`, top: "-10%", right: "-5%" }} />
        <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", filter: "blur(70px)", background: `radial-gradient(circle, ${GREEN}12, transparent)`, bottom: "-5%", left: "30%" }} />
        {heroBubbles.map((b, i) => (
          <Bubble key={i} style={{ ...b, opacity: (b.opacity || 0.4) * 0.4, top: `${30 + i * 20}%`, left: `${5 + i * 30}%` }} />
        ))}
      </div>

      {/* Decorative dots grid */}
      <svg style={{ position: "absolute", right: "5%", top: "10%", opacity: 0.07, pointerEvents: "none" }} width="100" height="100">
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r="2" fill={BLUE} />
          ))
        )}
      </svg>

      <div style={{ position: "absolute", bottom: 20, right: 30, opacity: 0.12 }} aria-hidden>
        <PenSVG size={180} rotate={-8} />
      </div>
      <div style={{ position: "absolute", top: 20, right: 60, opacity: 0.28 }} aria-hidden>
        <Paperclip size={26} color={CLIP} rotate={25} />
      </div>
      <div style={{ position: "absolute", top: 40, right: 80, opacity: 0.18 }} aria-hidden>
        <Paperclip size={20} color={CLIP2} rotate={-5} />
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="tracks-layout" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(28px, 5vw, 64px)",
          alignItems: "start",
        }}>
          <SlideIn from="left">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ width: 20, height: 2.5, background: BLUE }} />
              <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: BLUE, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                Learning Tracks
              </span>
            </div>
            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(24px,3.8vw,48px)", fontWeight: 900,
              color: INK, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 8,
            }}>
              Choose Your<br />
              <span style={{ color: BLUE, fontStyle: "italic" }}>Expert Track</span>
            </h2>
            <ScribbleUnderline color={BLUE} width="clamp(120px,18vw,220px)" style={{ marginBottom: "clamp(14px,2vw,22px)" }} />
            <p style={{
              fontFamily: "DM Serif Display, Georgia, serif",
              fontSize: "clamp(12px,1.3vw,15px)", color: FADED,
              lineHeight: 1.75, maxWidth: 340, marginBottom: "clamp(20px,3vw,32px)",
            }}>
              Every track is designed with industry experts, built around outcomes, not just content.{" "}
              <Highlight color="#B3E5FC">Structured. Mentored. Real.</Highlight>
            </p>
            <div style={{ display: "inline-block", position: "relative" }}>
              <WashiTape width={44} height={14} rotate={-2}
                style={{ top: -7, left: "50%", transform: "translateX(-50%) rotate(-2deg)" }} />
              <motion.button
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: `linear-gradient(135deg, ${RED}, #8B1527)`,
                  color: "#fff", border: "none", borderRadius: 3,
                  padding: "clamp(11px,1.4vw,15px) clamp(22px,2.8vw,34px)",
                  fontFamily: "Fraunces, Georgia, serif",
                  fontSize: "clamp(12px,1.4vw,15px)", fontWeight: 700,
                  cursor: "pointer", letterSpacing: "0.02em",
                  boxShadow: `2px 4px 16px ${RED}70`,
                  position: "relative", zIndex: 1,
                }}
              >Explore All Tracks →</motion.button>
            </div>
          </SlideIn>

          <SlideIn from="right" delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,1vw,10px)" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                {["All", "Dev", "Design", "Data"].map((tab, i) => (
                  <div key={tab} style={{
                    padding: "4px 12px", background: i === 0 ? PAPER : PAPER3,
                    border: `1px solid ${RULED}`,
                    borderBottom: i === 0 ? `1px solid ${PAPER}` : `1px solid ${RULED}`,
                    borderRadius: "3px 3px 0 0",
                    fontFamily: "monospace", fontSize: 10,
                    color: i === 0 ? RED : FADED, letterSpacing: "0.08em", cursor: "default",
                  }}>{tab}</div>
                ))}
              </div>
              <div style={{
                border: `1px solid ${RULED}`,
                borderRadius: "0 3px 3px 3px", overflow: "hidden",
                background: PAPER, padding: "clamp(8px,1.2vw,14px)",
                display: "flex", flexDirection: "column", gap: "clamp(6px,0.9vw,10px)",
              }}>
                {tracks.map((tr, i) => <TrackPill tr={tr} index={i} key={tr.name} />)}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}