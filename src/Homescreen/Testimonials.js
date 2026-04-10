import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";

/* ─── COLOUR TOKENS ─────────────────────────────────────────── */
const PAPER = "#F9F5ED";
const PAPER2 = "#F2EBD9";
const RULED = "#D6CEBA";
const INK = "#1C1209";
const FADED = "#7A6E5A";
const RED = "#A6192E";
const BLUE = "#3B6FA0";
const GREEN = "#2E7D52";
const YELLOW = "#F5C842";
const CLIP = "#9E9E9E";
const PENCIL = "#8C7B6B";

const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
  <svg width={size} height={size * 2.2} viewBox="0 0 24 52" fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke="#BDBDBD" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 4" opacity="0.6" fill="none" />
  </svg>
);

const Stamp = ({ text, color = RED, rotate = -8, style = {} }) => (
  <div style={{
    display: "inline-block",
    border: `2.5px solid ${color}`,
    borderRadius: 4,
    padding: "3px 10px",
    fontFamily: "monospace",
    fontSize: "clamp(9px,1vw,11px)",
    color, letterSpacing: "0.18em",
    textTransform: "uppercase", fontWeight: 700,
    transform: `rotate(${rotate}deg)`, opacity: 0.75,
    ...style,
  }}>
    {text}
  </div>
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

const TestimonialCard = ({ t }) => (
  <motion.div key={t.name}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.5 }}
    style={{
      background: PAPER, border: `1px solid ${RULED}`,
      borderRadius: 3, padding: "clamp(28px,3.5vw,44px) clamp(24px,3vw,40px)",
      position: "relative", overflow: "hidden",
      boxShadow: `3px 6px 24px ${t.accentColor}20`,
    }}
  >
    <RuledLines count={14} topOffset={0} gap={28} />
    <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", zIndex: 4 }}>
      <div style={{
        width: 14, height: 14, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${t.accentColor}, ${t.accentColor}cc)`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.4)",
      }} />
      <div style={{ width: 1.5, height: 12, background: PENCIL, margin: "0 auto" }} />
    </div>
    <div style={{ position: "absolute", top: 16, right: 20, opacity: 0.35 }}>
      <Paperclip size={22} color={CLIP} rotate={-15} />
    </div>
    <div style={{
      fontFamily: "Georgia, serif",
      fontSize: "clamp(72px,10vw,120px)", color: t.accentColor,
      opacity: 0.1, lineHeight: 0.7,
      position: "absolute", top: 20, left: 20,
      pointerEvents: "none", zIndex: 0,
    }}>"</div>
    <p style={{
      fontFamily: "Fraunces, Georgia, serif",
      fontSize: "clamp(14px,1.7vw,20px)", color: INK,
      lineHeight: 1.75, marginBottom: 28,
      position: "relative", zIndex: 1, paddingTop: 18, fontStyle: "italic",
    }}>{t.quote}</p>
    <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: `linear-gradient(135deg, ${t.accentColor}33, ${t.accentColor}88)`,
        border: `2px solid ${t.accentColor}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "monospace", fontWeight: 700, color: t.accentColor, fontSize: 14, flexShrink: 0,
      }}>{t.avatar}</div>
      <div>
        <p style={{ fontFamily: "Fraunces, Georgia, serif", color: INK, fontSize: "clamp(13px,1.5vw,17px)", fontWeight: 700, margin: 0 }}>{t.name}</p>
        <p style={{ fontFamily: "monospace", color: FADED, fontSize: "clamp(9px,1vw,11px)", margin: "2px 0 0", letterSpacing: "0.08em" }}>
          {t.role} · {t.meta}
        </p>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <Stamp text="verified" color={t.accentColor} rotate={4} style={{ fontSize: 8 }} />
      </div>
    </div>
  </motion.div>
);

/* ─── TEACHER TESTIMONIALS ───────────────────────────────────── */
const teacherTestimonials = [
  {
    name: "Meera Iyer",
    role: "Mathematics Faculty",
    meta: "8 yrs experience",
    quote: "Esperly gave me a platform where my teaching style actually matters. Students come prepared, ask deeper questions, and the mentoring tools help me track their growth week by week.",
    avatar: "MI",
    accentColor: BLUE,
  },
  {
    name: "Rajan Pillai",
    role: "Physics Mentor",
    meta: "IIT Bombay alum",
    quote: "I've taught in colleges and coaching centres — nothing compares to the depth of engagement here. The students are serious, and the platform keeps me organised without extra overhead.",
    avatar: "RP",
    accentColor: GREEN,
  },
  {
    name: "Ananya Krishnan",
    role: "English & Communication",
    meta: "5 yrs on Esperly",
    quote: "The session feedback loop is the best feature. I can see exactly where a student struggled and tailor the very next class to fix it. That's real teaching, not just delivery.",
    avatar: "AK",
    accentColor: RED,
  },
];

/* ─── PARENT TESTIMONIALS ────────────────────────────────────── */
const parentTestimonials = [
  {
    name: "Sunita Reddy",
    role: "Parent of Aryan, Grade 11",
    meta: "Mumbai",
    quote: "We were sceptical about online mentoring, but within a month my son's confidence in maths shot up. The mentor communicates with us too — that transparency is priceless.",
    avatar: "SR",
    accentColor: GREEN,
  },
  {
    name: "Vikram Bose",
    role: "Parent of Diya, Grade 9",
    meta: "Bangalore",
    quote: "Esperly isn't just tutoring — it's mentoring. My daughter talks about her mentor the way I used to talk about my favourite teacher. That relationship is what makes the difference.",
    avatar: "VB",
    accentColor: BLUE,
  },
  {
    name: "Kavitha Nair",
    role: "Parent of twins, Grade 10",
    meta: "Hyderabad",
    quote: "Two children, two completely different learning styles — and Esperly matched each of them with the right mentor. The personalisation is something no classroom can offer.",
    avatar: "KN",
    accentColor: RED,
  },
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
    <rect x="155" y="3" width="5" height="22" rx="2" fill={CLIP} stroke="#BDBDBD" strokeWidth="0.5" />
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

const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >{children}</motion.div>
  );
};

/* ─── REUSABLE TESTIMONIAL BLOCK ─────────────────────────────── */
const TestimonialBlock = ({
  label,
  heading,
  headingAccent,
  accentColor,
  testimonials,
  active,
  setActive,
}) => (
  <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 2 }}>
    <FadeUp style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,48px)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 20, height: 2, background: "#A6192E" }} />
        <span style={{ fontFamily: "monospace", fontSize: "clamp(9px,1vw,12px)", color: "#A6192E", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          {label}
        </span>
        <div style={{ width: 20, height: 2, background: "#A6192E" }} />
      </div>
      <h2 style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "clamp(24px,3.8vw,50px)", fontWeight: 900,
        color: INK, lineHeight: 1.05, letterSpacing: "-0.02em",
      }}>
        {heading}{" "}
        <span style={{ color: "#A6192E", fontStyle: "italic" }}>{headingAccent}</span>
      </h2>
      <ScribbleUnderline color={"#A6192E"} width="clamp(140px,20vw,240px)" style={{ margin: "8px auto 0" }} />
    </FadeUp>

    <AnimatePresence mode="wait">
      <TestimonialCard key={active} t={testimonials[active]} />
    </AnimatePresence>

    {/* Controls */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 24 }}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setActive(p => (p - 1 + testimonials.length) % testimonials.length)}
        style={{
          width: 38, height: 38, borderRadius: "50%",
          border: `1.5px solid ${RULED}`, background: PAPER2, color: INK,
          fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "1px 2px 6px rgba(0,0,0,0.08)", fontFamily: "Georgia, serif",
        }}
      >←</motion.button>
      <div style={{ display: "flex", gap: 8 }}>
        {testimonials.map((t, i) => (
          <motion.div key={i}
            onClick={() => setActive(i)}
            animate={{ width: i === active ? 24 : 8, background: i === active ? t.accentColor : RULED }}
            style={{ height: 8, borderRadius: 999, cursor: "pointer" }}
          />
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setActive(p => (p + 1) % testimonials.length)}
        style={{
          width: 38, height: 38, borderRadius: "50%",
          border: `1.5px solid ${RULED}`, background: PAPER2, color: INK,
          fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "1px 2px 6px rgba(0,0,0,0.08)", fontFamily: "Georgia, serif",
        }}
      >→</motion.button>
    </div>
  </div>
);

/* ─── DIVIDER ─────────────────────────────────────────────────── */
const SectionDivider = () => (
  <div style={{
    display: "flex", alignItems: "center", gap: 16,
    maxWidth: 780, margin: "clamp(40px,6vw,72px) auto",
    position: "relative", zIndex: 2,
  }}>
    <div style={{ flex: 1, height: 1, background: RULED }} />
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: RULED }} />
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: RED, opacity: 0.4 }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: RULED }} />
    </div>
    <div style={{ flex: 1, height: 1, background: RULED }} />
  </div>
);

/* ─── MAIN EXPORT ─────────────────────────────────────────────── */
export default function Testimonioals() {
  const [activeTeacher, setActiveTeacher] = useState(0);
  const [activeParent, setActiveParent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTeacher(p => (p + 1) % teacherTestimonials.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveParent(p => (p + 1) % parentTestimonials.length), 4800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
      position: "relative",
      overflow: "hidden",
      background: PAPER,
    }}>
      <RuledLines count={60} topOffset={0} gap={26} />

      {/* Decorative overlays */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", filter: "blur(100px)", background: `radial-gradient(circle, ${BLUE}10, transparent)`, top: "-15%", left: "-8%" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", filter: "blur(80px)", background: `radial-gradient(circle, ${GREEN}12, transparent)`, bottom: "0%", right: "-5%" }} />
        {heroBubbles.map((b, i) => (
          <Bubble key={i} style={{ ...b, opacity: (b.opacity || 0.4) * 0.35, top: `${15 + i * 25}%`, left: `${60 + i * 12}%` }} />
        ))}
      </div>

      {/* Decorative wave top-right */}
      <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.12, pointerEvents: "none" }}>
        <svg width="280" height="180" viewBox="0 0 280 180">
          <path d="M280 0 C200 50, 120 30, 60 100 C30 135, 10 160, 0 180"
            stroke={YELLOW} strokeWidth="2" fill="none" />
          <circle cx="150" cy="60" r="4" fill={YELLOW} opacity="0.6" />
        </svg>
      </div>

      {/* Dots grid left */}
      <svg style={{ position: "absolute", left: "4%", bottom: "12%", opacity: 0.08, pointerEvents: "none" }} width="80" height="80">
        {Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 16 + 8} cy={r * 16 + 8} r="2" fill={RED} />
          ))
        )}
      </svg>

      <div style={{ position: "absolute", top: 24, left: 32, opacity: 0.1 }} aria-hidden>
        <PenSVG size={200} rotate={-5} />
      </div>

      {/* ── TEACHER TESTIMONIALS ── */}
      <TestimonialBlock
        label="Teacher Voices"
        heading="Mentors Who"
        headingAccent="Truly Care"
        accentColor={BLUE}
        testimonials={teacherTestimonials}
        active={activeTeacher}
        setActive={setActiveTeacher}
      />

      <SectionDivider />

      {/* ── PARENT TESTIMONIALS ── */}
      <TestimonialBlock
        label="Parent Voices"
        heading="Parents/Students"
        headingAccent="Feedback"
        accentColor={GREEN}
        testimonials={parentTestimonials}
        active={activeParent}
        setActive={setActiveParent}
      />
    </section>
  );
}