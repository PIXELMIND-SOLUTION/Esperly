import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

/* ─── ANIMATION WRAPPERS ─────────────────────────────────────── */
const SlideIn = ({ children, from = "left", delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── SHARED PRIMITIVES ─────────────────────────────────────── */
const ScribbleUnderline = ({ color = "#EB6664", widthClass = "w-52" }) => (
  <svg
    viewBox="0 0 200 12"
    preserveAspectRatio="none"
    className={`${widthClass} h-3 block mb-5`}
  >
    <path
      d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const Highlight = ({ children, colorClass = "from-transparent via-transparent to-yellow-200" }) => (
  <span
    className="relative inline"
    style={{
      background: "linear-gradient(180deg, transparent 40%, #C8E6C988 40%)",
      paddingBottom: 2,
    }}
  >
    {children}
  </span>
);

const HighlightBlue = ({ children }) => (
  <span
    style={{
      background: "linear-gradient(180deg, transparent 40%, #B3E5FC88 40%)",
      paddingBottom: 2,
    }}
  >
    {children}
  </span>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — TRUSTED SECTION
═══════════════════════════════════════════════════════════════ */
export function TrustedSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-[#D6CEBA] font-sans"
      style={{ background: "transparent", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)" }}
    >
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-80 h-80 rounded-full"
          style={{
            filter: "blur(80px)",
            background: "radial-gradient(circle, #2E7D5214, transparent)",
            top: "-8%",
            left: "-4%",
          }}
        />
        <div
          className="absolute w-60 h-60 rounded-full"
          style={{
            filter: "blur(70px)",
            background: "radial-gradient(circle, #3B6FA012, transparent)",
            bottom: "-5%",
            right: "10%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16 items-center">

          {/* Left — heading + description */}
          <SlideIn from="left">
            <h2
              className="font-black leading-[1.05] tracking-tight mb-1.5"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "clamp(22px,4vw,42px)",
                color: "#1C1209",
              }}
            >
              Trusted by <span className="italic" style={{ color: "#EB6664" }}>Teachers & Parents</span>
            </h2>

            <ScribbleUnderline color="#EB6664" widthClass="w-[clamp(140px,20vw,260px)]" />

            <p
              className="leading-[1.8] mb-8"
              style={{
                fontFamily: "DM Serif Display, Georgia, serif",
                fontSize: "clamp(15px,1.3vw,18px)",
                color: "#7A6E5A",
                maxWidth: 480,
              }}
            >
              <Highlight> Trusted by families and educators alike, Esperly delivers a learning experience that truly
                makes a difference. Our personalized approach, expert mentors, and consistent results have
                earned the confidence of parents and teachers who want the{" "}
                best for every child.</Highlight>
            </p>
          </SlideIn>

          {/* Right — hero image */}
          <SlideIn from="right" delay={0.12}>
            <FadeUp delay={0.15}>
              <div
                className="w-full rounded-md overflow-hidden relative border border-dashed border-[#D6CEBA]"
                style={{
                  aspectRatio: "4/3",
                  background: "linear-gradient(135deg, #2E7D5220, #EDE3CC)",
                  boxShadow: "2px 6px 24px rgba(0,0,0,0.07)",
                }}
              >
                <img
                  src="/student1.png"
                  alt="Happy student with parent and teacher"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            </FadeUp>
          </SlideIn>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — SUPPORT SECTION
═══════════════════════════════════════════════════════════════ */
export function SupportSection() {
  return (
    <section
      className="relative overflow-hidden font-sans"
      style={{ background: "transparent", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)" }}
    >
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            filter: "blur(80px)",
            background: "radial-gradient(circle, #3B6FA014, transparent)",
            top: "-5%",
            right: "-4%",
          }}
        />
        <div
          className="absolute w-[220px] h-[220px] rounded-full"
          style={{
            filter: "blur(60px)",
            background: "radial-gradient(circle, #EB666410, transparent)",
            bottom: "0%",
            left: "20%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16 items-center">

          {/* Left — image */}
          <SlideIn from="left" delay={0.12}>
            <FadeUp delay={0.15}>
              <div
                className="w-full rounded overflow-hidden relative border border-dashed border-[#D6CEBA]"
                style={{
                  aspectRatio: "4/3",
                  background: "linear-gradient(135deg, #3B6FA018, #EDE3CC)",
                  boxShadow: "2px 4px 18px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src="/student2.png"
                  alt="Friendly support team guiding a student"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            </FadeUp>
          </SlideIn>

          {/* Right — heading + description */}
          <SlideIn from="right">
            <h2
              className="font-black leading-[1.05] tracking-tight mb-1.5"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "clamp(22px,4vw,42px)",
                color: "#1C1209",
              }}
            >
              Support from <span className="italic" style={{ color: "#EB6664" }}>Our Team</span>
            </h2>

            <ScribbleUnderline color="#EB6664" widthClass="w-[clamp(120px,16vw,200px)]" />

            <p
              className="leading-[1.8]"
              style={{
                fontFamily: "DM Serif Display, Georgia, serif",
                fontSize: "clamp(15px,1.3vw,18px)",
                color: "#7A6E5A",
                maxWidth: 480,
                marginBottom: "clamp(20px,3vw,36px)",
              }}
            >
              <HighlightBlue>At Esperly, you're never alone in the learning journey. Our dedicated support team is always
              ready to assist with guidance, queries, and continuous encouragement—ensuring a{" "}
              smooth and stress-free experience
              {" "}for both students and parents.</HighlightBlue>
            </p>
          </SlideIn>

        </div>
      </div>
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