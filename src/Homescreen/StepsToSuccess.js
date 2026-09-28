import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  Target,
  UserPlus,
  ClipboardCheck,
  Presentation,
  FileText,
  UserCheck,
  Users,
  ClipboardList,
  LineChart,
  Gauge,
} from "lucide-react";

// Replace with your actual image path
import heroImg from "../assets/steps.png";

const RED = "#EB6664";

const steps = [
  {
    id: "01",
    icon: UserPlus,
    title: "Sign-up",
    body: "Quick registration to get started.",
  },
  {
    id: "02",
    icon: ClipboardCheck,
    title: "Free Assessment",
    body: "Identify learning level and needs.",
  },
  {
    id: "03",
    icon: Presentation,
    title: "Demo Class",
    body: "Experience our teaching approach.",
  },
  {
    id: "04",
    icon: FileText,
    title: "Personalized Learning Plan",
    body: "Personalized roadmap for success.",
  },
  {
    id: "05",
    icon: UserCheck,
    title: "Expert Tutor Match",
    body: "Connect with the right mentor.",
  },
  {
    id: "06",
    icon: Users,
    title: "Live Interactive Class",
    body: "Interactive sessions with experts.",
  },
  {
    id: "07",
    icon: ClipboardList,
    title: "Practice & Assignment",
    body: "Assignments and regular exercises.",
  },
  {
    id: "08",
    icon: LineChart,
    title: "Progress Tracking",
    body: "Monitor growth with feedback.",
  },
  {
    id: "09",
    icon: Gauge,
    title: "Skill Development",
    body: "Build confidence and life skills.",
  },
];

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const StepCard = ({ step, index }) => {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ribbon */}
      <div className="relative z-10 w-full max-w-[140px]">
        <div
          className="rounded-t-lg px-2 py-2.5 text-center text-sm font-bold text-white sm:py-3 sm:text-base"
          style={{ background: `linear-gradient(180deg, #F2938F 0%, ${RED} 100%)` }}
        >
          {step.id}
        </div>
        <div
          className="mx-auto h-0 w-0"
          style={{
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderTop: `10px solid ${RED}`,
          }}
        />
      </div>

      {/* Card body */}
      <div className="-mt-1 flex w-full max-w-[140px] flex-1 flex-col items-center rounded-xl bg-[#FBDDDB] px-3 pb-4 pt-3 text-center sm:rounded-2xl sm:px-4 sm:pb-5 sm:pt-4">
        <h4 className="text-xs font-bold leading-snug text-gray-900 sm:text-sm">
          {step.title}
        </h4>

        <div className="my-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 sm:my-3 sm:h-10 sm:w-10">
          <Icon size={17} className="text-gray-700" />
        </div>

        <p className="text-[10px] leading-relaxed text-gray-600 sm:text-[11px]">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
};

export default function StepsToSuccess() {
  return (
    <section className="relative overflow-hidden bg-[#fdf1e9] px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p className="flex items-center gap-1 text-sm font-bold sm:text-base" style={{ color: RED }}>
            Esperly
            <Sparkles size={14} className="text-current" />
          </p>

          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Steps to Student <span style={{ color: RED }}>Success</span>
          </h2>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Simple Steps to Better Learning &amp; Lasting Success
          </p>
        </FadeUp>

        {/* Hero image banner */}
        <FadeUp delay={0.1} className="relative mt-6 overflow-hidden rounded-2xl sm:mt-8 sm:rounded-3xl">
          <img
            src={heroImg}
            alt="Students learning together"
            className="h-56 w-full object-cover sm:h-72 lg:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

          {/* Goal overlay */}
          <div className="absolute left-4 top-5 max-w-[220px] sm:left-8 sm:top-8 sm:max-w-xs">
            <p className="flex items-center gap-1.5 text-base font-extrabold text-gray-900 sm:text-lg">
              <Target size={18} style={{ color: RED }} />
              Goal
            </p>
            <p className="mt-1 text-lg font-extrabold leading-snug sm:text-2xl" style={{ color: RED }}>
              Academic Success &amp; Confidence
            </p>
          </div>

          {/* Rotated decorative text */}
          <p
            className="absolute right-3 top-4 hidden select-none text-right text-xs font-semibold italic leading-tight sm:right-6 sm:top-6 sm:block sm:text-sm"
            style={{ color: `${RED}99`, transform: "rotate(8deg)" }}
          >
            Better
            <br />
            Learning
            <br />
            Brighter
            <br />
            Future
          </p>
        </FadeUp>

        {/* Steps ribbon row */}
        <div className="-mt-6 grid grid-cols-3 gap-3 px-1 sm:-mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:-mt-14 lg:grid-cols-9 lg:gap-3">
          {steps.map((s, i) => (
            <StepCard step={s} index={i} key={s.id} />
          ))}
        </div>
      </div>
    </section>
  );
}