import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const R1    = "#A6192E";
const R2    = "#8B1527";
const CREAM = "#FDF8F5";

const steps = [
  {
    num: "1", title: "Discover", side: "left", figure: "explorer",
    desc: "The student becomes aware of Esperly through social media, a friend, or a school counsellor. They explore courses, mentors, and success stories.",
    stat: "Day 1", statLabel: "of the journey",
  },
  {
    num: "2", title: "Shortlist", side: "right", figure: "reader",
    desc: "They weigh options — comparing courses, mentors, and pricing. They may attend a free demo class or chat with a counsellor.",
    stat: "3 Options", statLabel: "narrowed down",
  },
  {
    num: "3", title: "Enroll", side: "left", figure: "achiever",
    desc: "The student picks their path and officially enrolls. A personal mentor is assigned, schedule is set, and the real journey begins.",
    stat: "Week 1", statLabel: "mentor assigned",
  },
  {
    num: "4", title: "Learn & Build", side: "right", figure: "builder",
    desc: "Through live classes, hands-on projects, and midnight voice notes, the student transforms. They ship real work and gain real confidence.",
    stat: "47 Sessions", statLabel: "completed",
  },
  {
    num: "5", title: "Succeed", side: "left", figure: "winner",
    desc: "Dream offer. First salary. The student graduates into a professional — and many return as mentors, closing the circle.",
    stat: "₹18 LPA", statLabel: "dream package",
  },
];

const Figure = ({ type }) => {
  const C = R1, D = R2;
  const figs = {
    explorer: (
      <g>
        <ellipse cx="40" cy="10" rx="10" ry="7" fill="#2a0a0f"/>
        <circle cx="40" cy="20" r="10" fill={C}/>
        <circle cx="37" cy="20" r="1.5" fill="white"/><circle cx="43" cy="20" r="1.5" fill="white"/>
        <path d="M37 24 Q40 27 43 24" stroke="white" strokeWidth="1.5" fill="none"/>
        <rect x="32" y="32" width="16" height="20" rx="5" fill={C}/>
        <rect x="20" y="34" width="13" height="5" rx="2.5" fill={D}/>
        <rect x="14" y="30" width="8" height="13" rx="2" fill="white"/>
        <rect x="15" y="32" width="6" height="9" rx="1" fill="#60a5fa"/>
        <rect x="47" y="34" width="13" height="5" rx="2.5" fill={D}/>
        <rect x="33" y="52" width="7" height="18" rx="3" fill={D}/>
        <rect x="40" y="52" width="7" height="18" rx="3" fill={D}/>
        <ellipse cx="36" cy="71" rx="6" ry="3" fill="#1a0608"/>
        <ellipse cx="44" cy="71" rx="6" ry="3" fill="#1a0608"/>
      </g>
    ),
    reader: (
      <g>
        <ellipse cx="40" cy="10" rx="10" ry="6" fill="#2a0a0f"/>
        <circle cx="40" cy="7" r="4" fill="#2a0a0f"/>
        <circle cx="40" cy="20" r="10" fill={C}/>
        <circle cx="37" cy="20" r="1.5" fill="white"/><circle cx="43" cy="20" r="1.5" fill="white"/>
        <path d="M37 24 Q40 27 43 24" stroke="white" strokeWidth="1.5" fill="none"/>
        <rect x="30" y="32" width="20" height="20" rx="5" fill={C}/>
        <rect x="18" y="40" width="13" height="5" rx="2.5" fill={D}/>
        <rect x="49" y="34" width="11" height="5" rx="2.5" fill={D}/>
        <rect x="12" y="40" width="30" height="6" rx="2" fill="white"/>
        <rect x="12" y="34" width="28" height="6" rx="2" fill={R1} opacity="0.7"/>
        <rect x="12" y="28" width="26" height="6" rx="2" fill={R2} opacity="0.6"/>
        <rect x="31" y="52" width="7" height="19" rx="3" fill={D}/>
        <rect x="42" y="52" width="7" height="19" rx="3" fill={D}/>
        <ellipse cx="35" cy="72" rx="6" ry="3" fill="#1a0608"/>
        <ellipse cx="46" cy="72" rx="6" ry="3" fill="#1a0608"/>
      </g>
    ),
    achiever: (
      <g>
        <circle cx="40" cy="14" r="13" fill="white" stroke={C} strokeWidth="2.5"/>
        <path d="M32 14 L38 20 L48 8" stroke={C} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="30" y="30" width="20" height="20" rx="5" fill={C}/>
        <rect x="16" y="26" width="15" height="5" rx="2.5" fill={D} transform="rotate(-28 23 28)"/>
        <rect x="49" y="26" width="15" height="5" rx="2.5" fill={D} transform="rotate(28 56 28)"/>
        <rect x="31" y="50" width="7" height="19" rx="3" fill={D}/>
        <rect x="42" y="50" width="7" height="19" rx="3" fill={D}/>
        <ellipse cx="35" cy="70" rx="6" ry="3" fill="#1a0608"/>
        <ellipse cx="46" cy="70" rx="6" ry="3" fill="#1a0608"/>
      </g>
    ),
    builder: (
      <g>
        <ellipse cx="40" cy="10" rx="10" ry="6" fill="#2a0a0f"/>
        <circle cx="40" cy="19" r="10" fill={C}/>
        <circle cx="37" cy="19" r="1.5" fill="white"/><circle cx="43" cy="19" r="1.5" fill="white"/>
        <rect x="30" y="31" width="20" height="18" rx="5" fill={C}/>
        <rect x="18" y="42" width="14" height="5" rx="2.5" fill={D}/>
        <rect x="48" y="42" width="14" height="5" rx="2.5" fill={D}/>
        <rect x="14" y="50" width="52" height="30" rx="5" fill="#e5e7eb"/>
        <rect x="16" y="52" width="48" height="22" rx="3" fill="#1e293b"/>
        <rect x="19" y="55" width="22" height="2" rx="1" fill={C} opacity="0.9"/>
        <rect x="19" y="59" width="34" height="2" rx="1" fill="#60a5fa" opacity="0.8"/>
        <rect x="19" y="63" width="16" height="2" rx="1" fill="#34d399" opacity="0.8"/>
        <rect x="19" y="67" width="28" height="2" rx="1" fill={C} opacity="0.6"/>
        <rect x="14" y="80" width="52" height="4" rx="2" fill="#d1d5db"/>
      </g>
    ),
    winner: (
      <g>
        <path d="M26 2 L54 2 L54 26 Q54 40 40 44 Q26 40 26 26 Z" fill="#fbbf24"/>
        <path d="M26 6 Q17 6 17 18 Q17 28 26 28" stroke="#f59e0b" strokeWidth="5" fill="none"/>
        <path d="M54 6 Q63 6 63 18 Q63 28 54 28" stroke="#f59e0b" strokeWidth="5" fill="none"/>
        <rect x="36" y="44" width="8" height="10" rx="2" fill="#fbbf24"/>
        <rect x="26" y="54" width="28" height="5" rx="2" fill="#f59e0b"/>
        <text x="40" y="30" textAnchor="middle" fontSize="16" fill={C} fontWeight="900">★</text>
        <ellipse cx="40" cy="12" rx="8" ry="5" fill="#2a0a0f"/>
        <circle cx="40" cy="68" r="9" fill={C}/>
        <rect x="31" y="79" width="18" height="16" rx="5" fill={C}/>
        <rect x="18" y="76" width="14" height="5" rx="2.5" fill={D} transform="rotate(-30 25 78)"/>
        <rect x="48" y="76" width="14" height="5" rx="2.5" fill={D} transform="rotate(30 55 78)"/>
        <rect x="32" y="95" width="7" height="12" rx="3" fill={D}/>
        <rect x="41" y="95" width="7" height="12" rx="3" fill={D}/>
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      {figs[type] || figs.explorer}
    </svg>
  );
};

const Tree = ({ size = 60, shade = 0 }) => {
  const greens = ["#5a9e5a","#4a8e4a","#6db56d","#3d7a3d","#5c9c5c"];
  const g = greens[shade % greens.length];
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="52" width="8" height="28" rx="3" fill="#7a5230" opacity="0.75"/>
      <circle cx="30" cy="32" r="24" fill={g} opacity="0.80"/>
      <circle cx="18" cy="42" r="15" fill={g} opacity="0.68"/>
      <circle cx="42" cy="42" r="15" fill={g} opacity="0.68"/>
      <circle cx="30" cy="17" r="12" fill={g} opacity="0.60"/>
    </svg>
  );
};

const Cloud = ({ w = 100, op = 0.5 }) => (
  <svg width={w} height={w * 0.55} viewBox="0 0 110 60" xmlns="http://www.w3.org/2000/svg" opacity={op}>
    <ellipse cx="55" cy="44" rx="50" ry="18" fill="white"/>
    <circle cx="32" cy="34" r="20" fill="white"/>
    <circle cx="58" cy="26" r="24" fill="white"/>
    <circle cx="78" cy="36" r="18" fill="white"/>
  </svg>
);

const StepCard = ({ step, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-5% 0px -5% 0px" });
  const isLeft = step.side === "left";
  const tops = ["2%", "21%", "41%", "61%", "80%"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -48 : 48 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute flex items-center gap-2 sm:gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      style={{
        top: tops[index],
        ...(isLeft ? { left: 0 } : { right: 0 }),
        maxWidth: "45%",
        zIndex: 10,
      }}
    >
      {/* Figure */}
      <motion.div
        className="flex-shrink-0"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "clamp(36px,5.5vw,68px)", height: "clamp(50px,7.5vw,92px)" }}
      >
        <Figure type={step.figure} />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          boxShadow: `0 4px 24px ${R1}18, 0 1px 6px rgba(0,0,0,0.06)`,
          border: "1px solid rgba(255,255,255,0.75)",
          minWidth: "clamp(100px,16vw,210px)",
        }}
      >
        <div style={{ height: 2, background: `linear-gradient(90deg,${R1},${R2})` }} />
        <div style={{ padding: "clamp(8px,1.4vw,16px)" }}>
          <div className="flex items-baseline gap-1 mb-1 flex-wrap">
            <span style={{ color: R1, fontFamily: "Georgia,serif", fontSize: "clamp(14px,2vw,22px)", fontWeight: 900, lineHeight: 1 }}>
              {step.num}.
            </span>
            <span style={{ color: R1, fontFamily: "Georgia,serif", fontSize: "clamp(13px,1.9vw,20px)", fontWeight: 900, lineHeight: 1.1 }}>
              {step.title}
            </span>
          </div>

          <p className="text-gray-500 leading-snug mb-2" style={{ fontFamily: "Georgia,serif", fontSize: "clamp(9px,1.15vw,12px)", display: "none" }} id={`desc-${index}`}>
            {step.desc}
          </p>
          <p className="text-gray-500 leading-snug mb-2 hidden sm:block" style={{ fontFamily: "Georgia,serif", fontSize: "clamp(9px,1.15vw,12px)" }}>
            {step.desc}
          </p>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${R1}0d`, border: `1px solid ${R1}22` }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: R1 }} />
            <span style={{ color: R1, fontSize: "clamp(9px,1.2vw,12px)", fontWeight: 800 }}>{step.stat}</span>
            <span className="text-gray-400 hidden sm:inline" style={{ fontSize: "clamp(8px,1vw,11px)" }}>{step.statLabel}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WindingRoad = () => (
  <svg viewBox="0 0 200 1000" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
    <path d="M100 10 C100 10 100 90 70 150 C40 210 20 240 20 310 C20 380 80 410 100 470 C120 530 160 555 160 630 C160 705 80 735 65 805 C50 875 100 930 100 990"
      stroke="#b8c8b0" strokeWidth="58" fill="none" strokeLinecap="round"/>
    <path d="M100 10 C100 10 100 90 70 150 C40 210 20 240 20 310 C20 380 80 410 100 470 C120 530 160 555 160 630 C160 705 80 735 65 805 C50 875 100 930 100 990"
      stroke="#5a7a3a" strokeWidth="50" fill="none" strokeLinecap="round"/>
    <path d="M100 10 C100 10 100 90 70 150 C40 210 20 240 20 310 C20 380 80 410 100 470 C120 530 160 555 160 630 C160 705 80 735 65 805 C50 875 100 930 100 990"
      stroke="#6d9448" strokeWidth="40" fill="none" strokeLinecap="round"/>
    <path d="M100 10 C100 10 100 90 70 150 C40 210 20 240 20 310 C20 380 80 410 100 470 C120 530 160 555 160 630 C160 705 80 735 65 805 C50 875 100 930 100 990"
      stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="16,12" opacity="0.85"/>

    {[
      { cx: 100, cy: 10  },
      { cx: 20,  cy: 310 },
      { cx: 100, cy: 470 },
      { cx: 160, cy: 630 },
      { cx: 65,  cy: 805 },
    ].map(({ cx, cy }, i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="18" fill="white" opacity="0.95" style={{ filter: `drop-shadow(0 2px 5px ${R1}40)` }}/>
        <circle cx={cx} cy={cy} r="14" fill={R1}/>
        <text x={cx} y={cy + 4.5} textAnchor="middle" fontSize="10" fontWeight="900" fill="white" fontFamily="Georgia,serif">0{i+1}</text>
      </g>
    ))}

    <rect x="90" y="978" width="20" height="2.5" rx="1" fill={R1}/>
    <rect x="90" y="964" width="2.5" height="24" fill={R1}/>
    <path d="M92.5 964 L112 972 L92.5 980 Z" fill={R1}/>
  </svg>
);

export default function StudentJourney() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -20]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: CREAM }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lora:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${CREAM}; }
        ::-webkit-scrollbar-thumb { background: ${R1}; border-radius: 4px; }
      `}</style>

      {/* ── HERO ── */}
      <motion.section
        style={{
          background: `linear-gradient(150deg,#F0E8E4 0%,${CREAM} 55%,#e8f0e4 100%)`,
          padding: "clamp(36px,6vw,72px) clamp(16px,5vw,56px) clamp(24px,4vw,48px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Clouds */}
        <div className="absolute top-2 right-4 sm:right-10 pointer-events-none"><Cloud w={120} op={0.5}/></div>
        <div className="absolute top-6 right-32 sm:right-48 pointer-events-none"><Cloud w={78} op={0.35}/></div>
        {/* Trees */}
        <div className="absolute top-3 right-1 sm:right-4 pointer-events-none opacity-70"><Tree size={52} shade={0}/></div>
        <div className="absolute bottom-0 right-12 sm:right-20 pointer-events-none opacity-50"><Tree size={38} shade={2}/></div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 border"
          style={{ background: `${R1}0e`, borderColor: `${R1}28`, fontFamily: "Lora,serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: R1 }}/>
          <span style={{ color: R1, fontSize: "clamp(9px,1.4vw,12px)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Esperly Platform
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16,1,0.3,1] }}
          style={{
            fontFamily: "Playfair Display,Georgia,serif",
            fontSize: "clamp(40px,9vw,96px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "#1a0608",
            marginBottom: "clamp(10px,1.5vw,16px)",
          }}
        >
          <span style={{ display: "block" }}>The Student</span>
          <span style={{ display: "block", fontStyle: "italic", color: R1 }}>Journey</span>
        </motion.h1>

        

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-7 rounded-full border-2 flex items-start justify-center pt-1"
            style={{ borderColor: `${R1}50` }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: R1 }}/>
          </motion.div>
          <span style={{ color: R1, opacity: 0.5, fontSize: "clamp(8px,1.1vw,10px)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 28, background: `linear-gradient(to bottom,transparent,${CREAM})` }}/>
      </motion.section>

      {/* ── ROAD SECTION ── */}
      <section
        style={{
          background: `linear-gradient(180deg,${CREAM} 0%,#e8f0e4 18%,#dce9d8 45%,#e8f0e4 72%,${CREAM} 100%)`,
          padding: "clamp(8px,1.5vw,20px) clamp(6px,1.5vw,20px) clamp(32px,6vw,80px)",
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 820,
            height: "clamp(980px,130vw,1700px)",
          }}
        >
          {/* Background trees */}
          {[
            { l: "1%",  t: "4%",  s: 48,  sh: 0, d: 0   },
            { l: "87%", t: "7%",  s: 58,  sh: 1, d: 0.3 },
            { l: "2%",  t: "27%", s: 40,  sh: 2, d: 0.1 },
            { l: "85%", t: "34%", s: 50,  sh: 0, d: 0.4 },
            { l: "1%",  t: "54%", s: 54,  sh: 3, d: 0.2 },
            { l: "86%", t: "58%", s: 44,  sh: 2, d: 0.5 },
            { l: "3%",  t: "78%", s: 48,  sh: 1, d: 0.1 },
            { l: "84%", t: "80%", s: 42,  sh: 0, d: 0.3 },
            { l: "7%",  t: "92%", s: 36,  sh: 4, d: 0.2 },
            { l: "80%", t: "93%", s: 44,  sh: 2, d: 0.4 },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ left: t.l, top: t.t }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.68, scale: 1 }}
              transition={{ delay: t.d, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Tree size={t.s} shade={t.sh}/>
            </motion.div>
          ))}

          {/* Road */}
          <div className="absolute pointer-events-none" style={{ left: "25%", right: "25%", top: "1%", bottom: "1%" }}>
            <WindingRoad/>
          </div>

          {/* Step cards */}
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i}/>
          ))}

          {/* Start badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute"
            style={{ left: "50%", top: "-0.8%", transform: "translateX(-50%)", zIndex: 20 }}
          >
            <div
              className="px-3 py-1.5 rounded-full text-white font-black uppercase tracking-widest"
              style={{
                background: `linear-gradient(135deg,${R1},${R2})`,
                fontFamily: "Lora,serif",
                fontSize: "clamp(9px,1.3vw,12px)",
                boxShadow: `0 3px 14px ${R1}50`,
              }}
            >
              Start Here ↓
            </div>
          </motion.div>

          {/* Finish badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute text-center"
            style={{ left: "50%", bottom: "0.5%", transform: "translateX(-50%)", zIndex: 20 }}
          >
            <div
              className="px-4 py-2.5 rounded-xl border border-white/80"
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                boxShadow: `0 6px 24px ${R1}22`,
              }}
            >
              <div style={{ fontSize: "clamp(20px,3vw,28px)", marginBottom: 2 }}>🏆</div>
              <p style={{ color: R1, fontFamily: "Georgia,serif", fontSize: "clamp(12px,1.8vw,16px)", fontWeight: 900, margin: 0 }}>
                You Made It!
              </p>
              <p style={{ color: "#9ca3af", fontSize: "clamp(9px,1.1vw,11px)", margin: "2px 0 0" }}>Career Launched</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section style={{ background: CREAM, padding: "clamp(12px,3vw,36px) clamp(12px,4vw,40px) clamp(36px,6vw,72px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(135deg,${R1} 0%,${R2} 100%)` }}
        >
          {/* Dot pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px,transparent 0)", backgroundSize: "20px 20px" }}/>
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(110deg,transparent 30%,rgba(255,255,255,0.07) 50%,transparent 70%)" }}
            animate={{ x: ["-100%","200%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
          />

          <div className="relative text-center" style={{ padding: "clamp(28px,5vw,64px) clamp(20px,4vw,56px)" }}>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
              className="font-black text-white leading-tight"
              style={{
                fontFamily: "Playfair Display,Georgia,serif",
                fontSize: "clamp(24px,5vw,52px)",
                marginBottom: "clamp(8px,1.2vw,12px)",
              }}
            >
              Where Will Your Road Lead?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "Lora,serif",
                fontSize: "clamp(12px,1.7vw,16px)",
                color: "rgba(255,255,255,0.68)",
                maxWidth: 420,
                margin: "0 auto clamp(24px,3.5vw,40px)",
                lineHeight: 1.6,
              }}
            >
              Thousands of students have walked this road. Your chapter is next.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6" style={{ marginBottom: "clamp(20px,3vw,36px)" }}>
              {[{ n: "15K+", l: "Students" }, { n: "500+", l: "Mentors" }, { n: "₹18L", l: "Avg Package" }].map((s, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="font-black text-white" style={{ fontFamily: "monospace", fontSize: "clamp(20px,4vw,38px)", margin: "0 0 2px" }}>{s.n}</p>
                  <p className="text-white uppercase tracking-wider" style={{ fontFamily: "Lora,serif", fontSize: "clamp(8px,1.2vw,11px)", opacity: 0.55, margin: 0 }}>{s.l}</p>
                  <motion.div
                    className="h-0.5 w-6 mx-auto mt-1.5 rounded-full bg-white"
                    style={{ opacity: 0.38 }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.45 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="font-black rounded-xl tracking-wide"
                style={{
                  background: "white",
                  color: R1,
                  padding: "clamp(10px,1.8vw,14px) clamp(22px,3.5vw,36px)",
                  fontSize: "clamp(12px,1.6vw,15px)",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 3px 16px rgba(0,0,0,0.16)",
                }}
              >
                Begin Your Journey →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="font-bold text-white rounded-xl tracking-wide"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.38)",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  padding: "clamp(10px,1.8vw,14px) clamp(22px,3.5vw,36px)",
                  fontSize: "clamp(12px,1.6vw,15px)",
                  cursor: "pointer",
                }}
              >
                View All Courses
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}