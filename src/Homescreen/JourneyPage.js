import React, { useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── STEP DATA ─── */
const steps = [
  { 
    id: "01", 
    title: "Sign Up", 
    desc: "Quick and easy registration to get started with Esperly.",
    icon: "📝",
    detail: "Fill out basic info & learning goals"
  },
  { 
    id: "02", 
    title: "Initial Assessment", 
    desc: "Understand the student's current level and learning needs.",
    icon: "📊",
    detail: "Diagnostic test & learning style analysis"
  },
  { 
    id: "03", 
    title: "Free Demo Class", 
    desc: "Experience our teaching methodology before you commit.",
    icon: "🎓",
    detail: "Interactive session with expert mentor"
  },
  { 
    id: "04", 
    title: "Personalized Plan", 
    desc: "Create a tailored learning roadmap for success.",
    icon: "🎯",
    detail: "Custom curriculum & goal setting"
  },
  { 
    id: "05", 
    title: "Mentor Matching", 
    desc: "Get paired with the perfect expert tutor for your needs.",
    icon: "🤝",
    detail: "Based on subject, style & personality"
  },
  { 
    id: "06", 
    title: "Regular Learning", 
    desc: "Attend engaging live classes with structured lessons.",
    icon: "📚",
    detail: "Live sessions & interactive materials"
  },
  { 
    id: "07", 
    title: "Practice & Revision", 
    desc: "Reinforce concepts with assignments and practice tests.",
    icon: "✍️",
    detail: "Homework, quizzes & doubt clearing"
  },
  { 
    id: "08", 
    title: "Growth & Review", 
    desc: "Achieve continuous academic improvement with regular reviews.",
    icon: "📈",
    detail: "Progress tracking & parent updates"
  },
];

/* ─── STEP CARD COLORS ─── */
const stepColors = [
  "bg-green-50", "bg-rose-50", "bg-emerald-50", "bg-orange-50",
  "bg-cyan-50", "bg-blue-50", "bg-purple-50", "bg-lime-50",
];

/* ─── NOTEBOOK RULED LINES ─── */
const RuledLines = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {Array.from({ length: 90 }).map((_, i) => (
      <div
        key={i}
        className="absolute left-0 right-0 h-px"
        style={{ top: i * 26, backgroundColor: "#D6CEBA", opacity: 0.4 }}
      />
    ))}
    <div
      className="absolute top-0 bottom-0 w-[2px]"
      style={{ left: "clamp(20px, 5vw, 72px)", backgroundColor: "#A6192E", opacity: 0.2 }}
    />
  </div>
);

const UnevenGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <pattern
            id="unevenGrid"
            width="100"   // ⬅️ increased size
            height="100"  // ⬅️ increased size
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <path
              d="M0 25 Q50 30 100 25"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
            <path
              d="M0 75 Q50 70 100 75"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />

            {/* Vertical lines */}
            <path
              d="M25 0 Q30 50 25 100"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
            <path
              d="M75 0 Q70 50 75 100"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#unevenGrid)" />
      </svg>
    </div>
  );
};

/* ─── WASHI TAPE ─── */
const WashiTape = ({ rotate = -2, top = -10, left = "40%" }) => (
  <div
    className="absolute w-14 h-[18px] rounded-sm shadow-sm"
    style={{
      background: "rgba(200,195,170,0.6)",
      transform: `rotate(${rotate}deg)`,
      top,
      left,
    }}
  />
);

/* ─── SCRIBBLE UNDERLINE ─── */
const ScribbleUnderline = ({ color = "#A6192E", width = "100%" }) => (
  <svg width={width} height="12" style={{ display: "block" }}>
    <path
      d="M2 7 C30 3, 60 10, 100 6 C140 2, 170 9, 200 5"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── STAMP / BADGE ─── */
const Stamp = ({ text, color = "#A6192E", rotate = -6 }) => (
  <div
    className="inline-block rounded-sm px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] bg-white/50"
    style={{
      border: `1.5px solid ${color}`,
      color,
      transform: `rotate(${rotate}deg)`,
    }}
  >
    {text}
  </div>
);

/* ─── STEP NUMBER CIRCLE ─── */
const StepNumber = ({ num, isActive = false }) => (
  <div
    className={`flex items-center justify-center rounded-full font-black transition-all duration-300 flex-shrink-0 w-10 h-10 text-lg ${
      isActive 
        ? "bg-[#EB6664] text-white shadow-[0_0_0_4px_rgba(166,25,46,0.12)]" 
        : "bg-white text-[#EB6664] border-2 border-[#EB6664]"
    }`}
    style={{ fontFamily: "Fraunces, serif" }}
  >
    {num}
  </div>
);

/* ─── SINGLE STEP CARD ─── */
const StepCard = ({ step, index, isActive, onClick, isLast, activeIndex }) => {
  const bgColor = stepColors[index % stepColors.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="relative flex gap-3 md:gap-6 cursor-pointer group w-full"
      onClick={() => onClick(index)}
    >
      {/* Left Column - Step Number & Connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <StepNumber num={step.id} isActive={isActive} />
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-[60px] md:min-h-[80px] mt-2 transition-all duration-300"
            style={{
              backgroundColor: index < activeIndex ? "#EB6664" : "#EB666440",
            }}
          />
        )}
      </div>

      {/* Right Column - Card Content */}
      <motion.div
        className={`flex-1 relative rounded-lg transition-all duration-300 overflow-hidden mb-3 md:mb-6 ${bgColor} ${
          isActive ? "shadow-lg scale-[1.01] border-l-4 border-[#EB6664]" : "shadow-sm"
        }`}
        style={{
          boxShadow: isActive ? "0 12px 32px rgba(166,25,46,0.15)" : "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <WashiTape rotate={index % 2 === 0 ? -2 : 2} top={-8} left="30%" />

        <div className="p-4 md:p-5 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl md:text-3xl">{step.icon}</span>
            <h3 className="font-bold leading-tight text-[#1C1209] text-base md:text-xl" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
              {step.title}
            </h3>
          </div>

          <ScribbleUnderline color="#A6192E" width="100px" />

          <p className="mt-2 md:mt-3 leading-relaxed text-[#7A6E5A] text-xs md:text-sm" style={{ fontFamily: "Georgia, serif" }}>
            {step.desc}
          </p>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-[#A6192E]/20 flex items-center gap-2 flex-wrap">
              <Stamp text="DETAILS" color="#3B6FA0" rotate={-3} />
              <span className="text-[#1C1209] text-[10px] md:text-xs font-mono">
                {step.detail}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── HORIZONTAL PROGRESS BAR (Desktop only) ─── */
const HorizontalProgress = ({ steps, activeIndex, onStepClick }) => {
  const progressWidth = ((activeIndex + 1) / steps.length) * 100;

  return (
    <div className="hidden lg:block mb-12">
      <div className="relative flex justify-between items-center px-4">
        <div className="absolute left-0 right-0 h-1 rounded-full top-6 bg-[#A6192E]/20" />
        <div
          className="absolute left-0 h-1 rounded-full transition-all duration-500 top-6"
          style={{ width: `${progressWidth}%`, background: "linear-gradient(90deg, #EB6664, #EB6664)" }}
        />
        
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => onStepClick(idx)}
            className="relative z-10 flex flex-col items-center gap-2 transition-all duration-300 group"
          >
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-300 bg-white ${
                idx === activeIndex ? "w-14 h-14 shadow-[0_0_0_4px_rgba(166,25,46,0.12)]" : "w-11 h-11"
              }`}
              style={{
                border: `2px solid ${idx <= activeIndex ? "#EB6664" : "#EB6664"}`,
                backgroundColor: idx === activeIndex ? "#A6192E10" : "white",
              }}
            >
              <span
                className={`font-bold ${idx === activeIndex ? "text-xl" : "text-base"}`}
                style={{
                  fontFamily: "Fraunces, serif",
                  color: idx <= activeIndex ? "#EB6664" : "#EB6664",
                }}
              >
                {step.id}
              </span>
            </div>
            <span
              className={`text-[9px] font-medium whitespace-nowrap transition-all duration-300 hidden xl:block ${
                idx === activeIndex ? "text-[#EB6664] opacity-100" : "text-[#7A6E5A] opacity-60"
              }`}
              style={{ fontFamily: "monospace", letterSpacing: "0.08em" }}
            >
              {step.title}
            </span>
            {idx === activeIndex && (
              <motion.div
                layoutId="activeDot"
                className="w-1.5 h-1.5 rounded-full absolute -bottom-4 bg-[#EB6664]"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};



/* ─── MAIN COMPONENT ─── */
export default function NotebookJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStepClick = (index) => {
    setActiveStep(index);
    if (window.innerWidth < 768) {
      const section = document.getElementById("journey-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const goNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      if (window.innerWidth < 768) {
        const section = document.getElementById("journey-section");
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const goPrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      if (window.innerWidth < 768) {
        const section = document.getElementById("journey-section");
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      id="journey-section"
      className="relative overflow-hidden min-h-screen py-[clamp(40px,6vw,50px)] px-[clamp(16px,5vw,50px)] bg-[#FBF7F2]"
      style={{ paddingBottom: isMobile ? "0px" : "clamp(60px,8vw,50px)" }}
    >
      <UnevenGrid />

      {/* Decorative corner doodles */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-10 pointer-events-none hidden sm:block">
        <svg width="60" height="60" viewBox="0 0 80 80" className="md:w-20 md:h-20">
          <circle cx="40" cy="40" r="30" stroke="#A6192E" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
          <circle cx="40" cy="40" r="18" stroke="#A6192E" strokeWidth="1" fill="none" />
          <line x1="10" y1="40" x2="70" y2="40" stroke="#A6192E" strokeWidth="1" opacity="0.5" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="#A6192E" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Pencil decoration */}
      <div className="absolute bottom-8 left-4 opacity-10 pointer-events-none hidden lg:block">
        <svg width="100" height="20" viewBox="0 0 200 36" fill="none">
          <rect x="20" y="8" width="148" height="20" rx="2" fill="#F5D87A" />
          <rect x="20" y="8" width="148" height="20" rx="2" stroke="#C8A820" strokeWidth="1" />
          <rect x="158" y="9" width="24" height="18" rx="2" fill="#F4A7A7" />
          <rect x="153" y="8" width="8" height="20" fill="#8C7B6B" />
          <polygon points="20,8 20,28 2,18" fill="#E8C06A" />
          <polygon points="6,12 6,24 2,18" fill="#2A1F0E" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          {/* <div className="flex items-center justify-start gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
            <div className="w-6 md:w-8 h-[2px] bg-[#A6192E]" />
            <span className="font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#A6192E]">
              Your Path to Success
            </span>
            <Stamp text="JOURNEY" color="#3B6FA0" rotate={3} />
          </div> */}

          <h2
            className="font-black leading-[1.1] mb-2 md:mb-3 text-[#1C1209] text-[clamp(24px,5vw,52px)]"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
            Esperly's{" "}
            <span className="bg-gradient-to-r from-[#FFEB3B] via-[#FFEB3B] to-transparent px-1 text-[#EB6664]" style={{ backgroundSize: "100% 0.3em", backgroundPosition: "0 100%", backgroundRepeat: "no-repeat" }}>
              Structured Onboarding
            </span>
          </h2>

          <p className="max-w-2xl mx-auto italic text-[#7A6E5A] text-[clamp(13px,1.5vw,18px)]" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            A step-by-step journey designed to transform learning into lasting success
          </p>

          <div className="flex justify-center mt-2">
            <ScribbleUnderline color="#EB6664" width="160px" />
          </div>
        </div>

        {/* Horizontal Progress Bar (Desktop only) */}
        <HorizontalProgress 
          steps={steps} 
          activeIndex={activeStep} 
          onStepClick={handleStepClick} 
        />

        {/* Mobile Current Step Title */}
        <div className="lg:hidden text-center mb-6">
          <div className="inline-block px-3 py-1 rounded-full mb-2 bg-[#EB6664]/10">
            <span className="font-mono text-xs font-bold text-[#EB6664]">
              Step {activeStep + 1}
            </span>
          </div>
          <h3 className="font-bold text-xl text-[#1C1209]" style={{ fontFamily: "Fraunces, serif" }}>
            {steps[activeStep].title}
          </h3>
        </div>

        {/* Vertical Timeline Steps - ALL STEPS VISIBLE ON MOBILE */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[23px] md:left-[27px] top-0 bottom-0 w-0.5 rounded-full bg-[#EB6664]/20 hidden sm:block" />

          {steps.map((step, idx) => (
            <StepCard
              key={step.id}
              step={step}
              index={idx}
              isActive={idx === activeStep}
              onClick={handleStepClick}
              isLast={idx === steps.length - 1}
              activeIndex={activeStep}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12 pt-3 border-t border-[#A6192E]/15"
        >
          <button className="px-6 md:px-8 py-2.5 md:py-3 rounded-md font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 bg-[#EB6664] text-white text-[clamp(13px,1.2vw,16px)]" style={{ fontFamily: "Fraunces, serif", letterSpacing: "0.05em" }}>
            Start Your Journey →
          </button>
          <p className="text-[9px] md:text-[10px] font-mono mt-3 text-[#7A6E5A] tracking-[0.1em]">
            Join thousands of successful learners
          </p>
        </motion.div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {/* {isMobile && (
        <MobileNav
          activeStep={activeStep}
          totalSteps={steps.length}
          onNext={goNext}
          onPrev={goPrev}
          onStepClick={handleStepClick}
        />
      )} */}
    </section>
  );
}