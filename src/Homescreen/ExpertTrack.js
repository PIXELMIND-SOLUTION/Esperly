import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS (matching ExpertTrack) ──────────────────── */
const PAPER   = "#F9F5ED";
const PAPER2  = "#F2EBD9";
const PAPER3  = "#EDE3CC";
const RULED   = "#D6CEBA";
const INK     = "#1C1209";
const FADED   = "#7A6E5A";
const RED     = "#A6192E";
const BLUE    = "#3B6FA0";
const GREEN   = "#2E7D52";
const CLIP    = "#9E9E9E";
const CLIP2   = "#BDBDBD";

/* ─── SHARED PRIMITIVES ─────────────────────────────────────── */
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
      left: "clamp(20px,5vw,72px)", width: 1.5,
      background: RED, opacity: 0.2,
    }} />
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
  }}>
    {children}
  </span>
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

const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
  <svg width={size} height={size * 2.2} viewBox="0 0 24 52" fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={CLIP2} strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 4" opacity="0.6" fill="none" />
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

/* ─── TRUST CARD (image placeholder + quote) ────────────────── */
const TrustCard = ({ emoji, quote, name, role, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        background: PAPER,
        border: `1px solid ${RULED}`,
        borderRadius: 4,
        padding: "clamp(14px,2vw,22px)",
        position: "relative",
        boxShadow: "1px 3px 12px rgba(0,0,0,0.06)",
      }}>
      {/* tape */}
      <WashiTape width={38} height={12} rotate={-3}
        style={{ top: -6, left: "50%", transform: "translateX(-50%) rotate(-3deg)" }} />
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: `linear-gradient(135deg, ${color}18, ${PAPER3})`,
        border: `1px dashed ${RULED}`,
        borderRadius: 3, marginBottom: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "clamp(36px,5vw,56px)",
        position: "relative", overflow: "hidden",
      }}>
        <img src={`/parent.png`} alt={emoji} />
      </div>
      {/* quote mark */}
      <div style={{
        fontFamily: "Georgia, serif", fontSize: 48,
        color: color, opacity: 0.2, lineHeight: 0.6,
        marginBottom: 4, userSelect: "none",
      }}>"</div>
      <p style={{
        fontFamily: "DM Serif Display, Georgia, serif",
        fontSize: "clamp(12px,1.3vw,14px)", color: INK,
        lineHeight: 1.7, margin: "0 0 12px",
      }}>{quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${RULED}`, paddingTop: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: color + "28", border: `1.5px solid ${color}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}>👤</div>
        <div>
          <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(11px,1.1vw,13px)", fontWeight: 700, color: INK, margin: 0 }}>{name}</p>
          <p style={{ fontFamily: "monospace", fontSize: "clamp(9px,0.9vw,10px)", color: FADED, margin: 0, letterSpacing: "0.06em" }}>{role}</p>
        </div>
      </div>
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
        background: "",
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

const supportItems = [
  { icon: "💬", title: "Live Chat Support", desc: "Instant answers to any question—available 7 days a week for students and parents.", color: BLUE },
  { icon: "🎓", title: "Dedicated Mentors", desc: "Every learner is paired with an expert mentor who guides them through their journey.", color: GREEN },
  { icon: "📞", title: "Parent Helpline", desc: "A direct line for parents to track progress, raise concerns, and celebrate milestones.", color: RED },
  { icon: "🗓️", title: "Scheduled Check-ins", desc: "Regular touchpoints with our team to ensure everything is on track and stress-free.", color: "#B05A1A" },
];

const trustCards = [
  {
    emoji: "👨‍👩‍👧",
    quote: "Esperly's personalized approach made all the difference. My daughter went from struggling to thriving in just two months.",
    name: "Priya Sharma",
    role: "Parent · Grade 8",
    color: GREEN,
    delay: 0.1,
  },
  {
    emoji: "👩‍🏫",
    quote: "As a teacher, I've recommended Esperly to dozens of students. The consistency and quality of mentoring is unmatched.",
    name: "Mr. Arvind Nair",
    role: "School Teacher · 14 yrs exp",
    color: BLUE,
    delay: 0.2,
  },
  {
    emoji: "🧑‍💻",
    quote: "The structured tracks and real-world projects gave me the confidence to crack my first tech interview.",
    name: "Rohan Mehra",
    role: "Student · Full Stack Track",
    color: RED,
    delay: 0.3,
  },
];

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — TRUSTED BY TEACHERS & PARENTS
═══════════════════════════════════════════════════════════════ */
export function TrustedSection() {
  return (
    <section style={{
      background: PAPER,
      borderTop: `1px solid ${RULED}`,
      padding: "clamp(40px,6vw,80px) clamp(20px,5vw,60px)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "sans-serif",
    }}>
      <RuledLines count={60} topOffset={0} gap={26} />

      {/* Decorative overlays */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", filter: "blur(80px)", background: `radial-gradient(circle, ${GREEN}14, transparent)`, top: "-8%", left: "-4%" }} />
        <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", filter: "blur(70px)", background: `radial-gradient(circle, ${BLUE}12, transparent)`, bottom: "-5%", right: "10%" }} />
      </div>

      {/* Dot grid */}
      <svg style={{ position: "absolute", left: "4%", bottom: "12%", opacity: 0.07, pointerEvents: "none" }} width="100" height="100">
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r="2" fill={GREEN} />
          ))
        )}
      </svg>

      {/* Paperclip deco */}
      <div style={{ position: "absolute", top: 18, right: 50, opacity: 0.22 }} aria-hidden>
        <Paperclip size={24} color={CLIP} rotate={18} />
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <SlideIn from="left">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
            <div style={{ width: 20, height: 2.5, background: "#A6192E" }} />
            <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: "#A6192E", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Community Trust
            </span>
          </div>
          <h2 style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(24px,3.8vw,48px)", fontWeight: 900,
            color: INK, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 6,
          }}>
            Trusted by<br />
            <span style={{ color: "#A6192E", fontStyle: "italic" }}>Teachers & Parents</span>
          </h2>
          <ScribbleUnderline color="#A6192E" width="clamp(140px,20vw,260px)" style={{ marginBottom: "clamp(12px,1.8vw,20px)" }} />
          <p style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: "clamp(12px,1.3vw,15px)", color: FADED,
            lineHeight: 1.75, maxWidth: 520, marginBottom: "clamp(20px,3vw,32px)",
          }}>
            Trusted by families and educators alike, Esperly delivers a learning experience that truly makes a difference.
            Our personalized approach, expert mentors, and consistent results have earned the confidence of parents and teachers
            who want the{" "}
            <Highlight color="#C8E6C9">best for every child.</Highlight>
          </p>
        </SlideIn>

        {/* Stats row */}
        <FadeUp delay={0.1} style={{ marginBottom: "clamp(24px,4vw,48px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,1.2vw,14px)" }}>
            <StatPill value="12k+" label="Parents enrolled" color={GREEN} delay={0.15} />
            <StatPill value="98%"  label="Satisfaction rate" color={BLUE}  delay={0.22} />
            <StatPill value="340+" label="Partner teachers" color={RED}   delay={0.29} />
            <StatPill value="4.9★" label="Avg. rating"       color="#B05A1A" delay={0.36} />
          </div>
        </FadeUp>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(clamp(220px,28vw,300px), 1fr))",
          gap: "clamp(14px,2vw,24px)",
        }}>
          {trustCards.map((card) => (
            <TrustCard key={card.name} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — SUPPORT FROM OUR TEAM
═══════════════════════════════════════════════════════════════ */
export function SupportSection() {
  return (
    <section style={{
      background: '',
      padding: "clamp(40px,6vw,80px) clamp(20px,5vw,60px)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "sans-serif",
    }}>
      <RuledLines count={60} topOffset={0} gap={26} />

      {/* Decorative overlays */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", filter: "blur(80px)", background: `radial-gradient(circle, ${BLUE}14, transparent)`, top: "-5%", right: "-4%" }} />
        <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", filter: "blur(60px)", background: `radial-gradient(circle, ${RED}10, transparent)`, bottom: "0%", left: "20%" }} />
      </div>

      {/* Dot grid */}
      <svg style={{ position: "absolute", right: "4%", top: "15%", opacity: 0.07, pointerEvents: "none" }} width="100" height="100">
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r="2" fill={BLUE} />
          ))
        )}
      </svg>

      <div style={{ position: "absolute", top: 20, left: 60, opacity: 0.18 }} aria-hidden>
        <Paperclip size={22} color={CLIP2} rotate={-12} />
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(28px,5vw,64px)",
          alignItems: "start",
        }}
          className="support-layout"
        >
          {/* Left — copy + image placeholder */}
          <SlideIn from="left">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
              <div style={{ width: 20, height: 2.5, background: "#A6192E" }} />
              <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: "#A6192E", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                Always Here
              </span>
            </div>
            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(24px,3.8vw,48px)", fontWeight: 900,
              color: INK, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 6,
            }}>
              Support from<br />
              <span style={{ color: "#A6192E", fontStyle: "italic" }}>Our Team</span>
            </h2>
            <ScribbleUnderline color="#A6192E" width="clamp(120px,16vw,200px)" style={{ marginBottom: "clamp(12px,1.8vw,20px)" }} />
            <p style={{
              fontFamily: "DM Serif Display, Georgia, serif",
              fontSize: "clamp(12px,1.3vw,15px)", color: FADED,
              lineHeight: 1.75, maxWidth: 340, marginBottom: "clamp(20px,3vw,32px)",
            }}>
              At Esperly, you're never alone in the learning journey. Our dedicated support team is always ready to assist
              with guidance, queries, and continuous encouragement—ensuring a{" "}
              <Highlight color="#B3E5FC">smooth and stress-free experience</Highlight>
              {" "}for both students and parents.
            </p>

            {/* Image placeholder — friendly support team */}
            <FadeUp delay={0.18}>
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: `linear-gradient(135deg, ${BLUE}18, ${PAPER3})`,
                border: `1px dashed ${RULED}`,
                borderRadius: 4, position: "relative",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                boxShadow: "2px 4px 18px rgba(0,0,0,0.06)",
              }}>
                <img src="/teacher.png" alt="Support Team" />
              </div>
            </FadeUp>
          </SlideIn>

          {/* Right — support items list */}
          <SlideIn from="right" delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1.2vw,14px)", paddingTop: "clamp(0px,2vw,40px)" }}>
              {supportItems.map((item, i) => (
                <SupportItem key={item.title} {...item} delay={0.15 + i * 0.1} />
              ))}

              {/* CTA card */}
              <FadeUp delay={0.55}>
                <div style={{
                  background: `linear-gradient(135deg, ${BLUE}18, ${PAPER})`,
                  border: `1px solid ${BLUE}44`,
                  borderRadius: 4, padding: "clamp(14px,2vw,22px)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: 12,
                  boxShadow: `2px 4px 16px ${BLUE}14`,
                  position: "relative", marginTop: 4,
                }}>
                  <WashiTape width={36} height={11} rotate={-2}
                    color="rgba(59,111,160,0.25)"
                    style={{ top: -5, left: 20 }} />
                  <div>
                    <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(13px,1.5vw,16px)", fontWeight: 800, color: INK, margin: 0 }}>
                      Need help right now?
                    </p>
                    <p style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,11px)", color: FADED, margin: "3px 0 0", letterSpacing: "0.05em" }}>
                      Our team responds within minutes.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, rotate: -1 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: `linear-gradient(135deg, ${BLUE}, #2A5580)`,
                      color: "#fff", border: "none", borderRadius: 3,
                      padding: "clamp(9px,1.2vw,13px) clamp(18px,2.2vw,26px)",
                      fontFamily: "Fraunces, Georgia, serif",
                      fontSize: "clamp(11px,1.2vw,14px)", fontWeight: 700,
                      cursor: "pointer", letterSpacing: "0.02em",
                      boxShadow: `2px 4px 14px ${BLUE}55`,
                    }}
                  >Contact Support →</motion.button>
                </div>
              </FadeUp>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 680px) {
          .support-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DEFAULT EXPORT — both sections together
═══════════════════════════════════════════════════════════════ */
export default function TrustAndSupport() {
  return (
    <>
      <TrustedSection />
      <SupportSection />
    </>
  );
}