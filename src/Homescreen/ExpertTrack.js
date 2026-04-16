import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS ─────────────────────────────────────────── */
const PAPER = "#FBF7F2";
const PAPER2 = "#F2EBD9";
const PAPER3 = "#EDE3CC";
const RULED = "#D6CEBA";
const INK = "#1C1209";
const FADED = "#7A6E5A";
const RED = "#EB6664";
const BLUE = "#3B6FA0";
const GREEN = "#2E7D52";
const AMBER = "#B05A1A";
const CLIP = "#9E9E9E";
const CLIP2 = "#BDBDBD";

/* ─── SHARED PRIMITIVES ─────────────────────────────────────── */
const UnevenGrid = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    <svg style={{ width: "100%", height: "100%" }}>
      <defs>
        <pattern id="unevenGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 25 Q50 30 100 25" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M0 75 Q50 70 100 75" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M25 0 Q30 50 25 100" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M75 0 Q70 50 75 100" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#unevenGrid)" />
    </svg>
  </div>
);

const ScribbleUnderline = ({ color = RED, width = "100%", style = {} }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none"
    style={{ width, height: 12, display: "block", ...style }}>
    <path d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

const Highlight = ({ children, color = "#FFEB3B", style = {} }) => (
  <span style={{
    background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`,
    paddingBottom: 2, ...style,
  }}>{children}</span>
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

/* ─── ANIMATION WRAPPERS ─────────────────────────────────────── */
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

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >{children}</motion.div>
  );
};

/* ─── STAT PILL ─────────────────────────────────────────────── */
const StatPill = ({ value, label, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        background: PAPER,
        border: `1px solid ${RULED}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: "0 4px 4px 0",
        padding: "clamp(10px,1.4vw,14px) clamp(14px,1.8vw,22px)",
        display: "flex", flexDirection: "column", gap: 2,
        boxShadow: "1px 2px 8px rgba(0,0,0,0.05)",
      }}>
      <span style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "clamp(20px,2.8vw,32px)", fontWeight: 900,
        color, lineHeight: 1,
      }}>{value}</span>
      <span style={{
        fontFamily: "monospace", fontSize: "clamp(9px,1vw,11px)",
        color: FADED, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>{label}</span>
    </motion.div>
  );
};

/* ─── SUPPORT ITEM ──────────────────────────────────────────── */
const SupportItem = ({ icon, title, desc, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.56, delay }}
      style={{
        display: "flex", gap: "clamp(12px,1.6vw,18px)", alignItems: "flex-start",
        background: PAPER,
        border: `1px solid ${RULED}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: "0 4px 4px 0",
        padding: "clamp(12px,1.6vw,18px) clamp(14px,1.8vw,20px)",
        boxShadow: "1px 2px 8px rgba(0,0,0,0.04)",
        position: "relative", overflow: "hidden",
      }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: RULED, opacity: 0.35 }} />
      <div style={{
        width: "clamp(32px,4vw,42px)", height: "clamp(32px,4vw,42px)",
        borderRadius: 3, background: color + "1A",
        border: `1px solid ${color}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "clamp(16px,2vw,22px)", flexShrink: 0,
      }}>{icon}</div>
      <div>
        <p style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: "clamp(13px,1.4vw,16px)", fontWeight: 700,
          color: INK, margin: "0 0 4px",
        }}>{title}</p>
        <p style={{
          fontFamily: "DM Serif Display, Georgia, serif",
          fontSize: "clamp(11px,1.1vw,13px)", color: FADED,
          lineHeight: 1.65, margin: 0,
        }}>{desc}</p>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — TRUSTED SECTION (Left: Title & Description, Right: Image)
═══════════════════════════════════════════════════════════════ */
export function TrustedSection() {
  return (
    <section style={{
      background: PAPER,
      borderTop: `1px solid ${RULED}`,
      padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "sans-serif",
    }}>
      {/* <UnevenGrid /> */}

      {/* Soft glow blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", filter: "blur(80px)", background: `radial-gradient(circle, ${GREEN}14, transparent)`, top: "-8%", left: "-4%" }} />
        <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", filter: "blur(70px)", background: `radial-gradient(circle, ${BLUE}12, transparent)`, bottom: "-5%", right: "10%" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Two-column layout: Left text, Right image */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(28px,5vw,64px)",
          alignItems: "center",
        }}
          className="trusted-layout"
        >
          {/* Left — heading + description + stats */}
          <SlideIn from="left">
            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(26px,4vw,52px)", fontWeight: 900,
              color: INK, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 6,
            }}>
              Trusted by<br />
              <span style={{ color: RED, fontStyle: "italic" }}>Teachers & Parents</span>
            </h2>
            <ScribbleUnderline color={RED} width="clamp(140px,20vw,260px)" style={{ marginBottom: "clamp(14px,2vw,24px)" }} />
            <p style={{
              fontFamily: "DM Serif Display, Georgia, serif",
              fontSize: "clamp(12px,1.3vw,15px)", color: FADED,
              lineHeight: 1.8, maxWidth: 480, marginBottom: "clamp(20px,3vw,36px)",
            }}>
              Trusted by families and educators alike, Esperly delivers a learning experience that truly
              makes a difference. Our personalized approach, expert mentors, and consistent results have
              earned the confidence of parents and teachers who want the{" "}
              <Highlight color="#C8E6C9">best for every child.</Highlight>
            </p>


          </SlideIn>

          {/* Right — hero image */}
          <SlideIn from="right" delay={0.12}>
            <FadeUp delay={0.15}>
              <div style={{
                width: "100%", aspectRatio: "4/3",
                background: `linear-gradient(135deg, ${GREEN}20, ${PAPER3})`,
                border: `1px dashed ${RULED}`,
                borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                boxShadow: "2px 6px 24px rgba(0,0,0,0.07)",
                position: "relative",
              }}>
                <img
                  src="/student1.png"
                  alt="Happy student with parent and teacher"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.target.style.display = "none"; }}
                />
              </div>
            </FadeUp>
          </SlideIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .trusted-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — SUPPORT SECTION (Reverse: Right side title & description, Left side image)
═══════════════════════════════════════════════════════════════ */
export function SupportSection() {
  return (
    <section style={{
      background: PAPER,
      padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "sans-serif",
    }}>
      {/* <UnevenGrid /> */}

      {/* Glow blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", filter: "blur(80px)", background: `radial-gradient(circle, ${BLUE}14, transparent)`, top: "-5%", right: "-4%" }} />
        <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", filter: "blur(60px)", background: `radial-gradient(circle, ${RED}10, transparent)`, bottom: "0%", left: "20%" }} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Two-column layout: Left image, Right text (REVERSED) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(28px,5vw,64px)",
          alignItems: "start",
        }}
          className="support-layout"
        >
          {/* Left — image (moved to left side) */}
          <SlideIn from="left" delay={0.12}>
            <FadeUp delay={0.15}>
              <div style={{
                width: "100%", aspectRatio: "4/3",
                background: `linear-gradient(135deg, ${BLUE}18, ${PAPER3})`,
                border: `1px dashed ${RULED}`,
                borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                boxShadow: "2px 4px 18px rgba(0,0,0,0.06)",
                position: "relative",
              }}>
                <img
                  src="/student2.png"
                  alt="Friendly support team guiding a student"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.target.style.display = "none"; }}
                />
              </div>
            </FadeUp>
          </SlideIn>

          {/* Right — heading + description + support items (moved to right side) */}
          <SlideIn from="right">
            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(26px,4vw,52px)", fontWeight: 900,
              color: INK, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 6,
            }}>
              Support from<br />
              <span style={{ color: RED, fontStyle: "italic" }}>Our Team</span>
            </h2>
            <ScribbleUnderline color={RED} width="clamp(120px,16vw,200px)" style={{ marginBottom: "clamp(14px,2vw,24px)" }} />
            <p style={{
              fontFamily: "DM Serif Display, Georgia, serif",
              fontSize: "clamp(12px,1.3vw,15px)", color: FADED,
              lineHeight: 1.8, maxWidth: 480, marginBottom: "clamp(20px,3vw,36px)",
            }}>
              At Esperly, you’re never alone in the learning journey. Our dedicated support team is always
              ready to assist with guidance, queries, and continuous encouragement—ensuring a{" "}
              <Highlight color="#B3E5FC"> smooth
                and stress-free experience</Highlight>
              {" "} for both students and parents.
            </p>
          </SlideIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .support-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DEFAULT EXPORT
═══════════════════════════════════════════════════════════════ */
export default function TrustAndSupport() {
  return (
    <>
      <TrustedSection />
      <SupportSection />
    </>
  );
}