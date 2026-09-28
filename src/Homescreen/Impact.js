import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Users,
  Presentation,
  Clock,
  Star,
  Video,
  User,
  BarChart3,
  GraduationCap,
  ArrowRight,
  Heart,
} from "lucide-react";

// Replace with your actual image paths
import studyImg from "../assets/steps.png";
import callThumbImg from "../assets/Hero.png";

const RED = "#EB6664";

const stats = [
  { icon: Users, value: "1000+", label: "Active Listeners" },
  { icon: Presentation, value: "50+", label: "Expert tutors" },
  { icon: Clock, value: "5000+", label: "Learning Hours" },
  { icon: Star, value: "95%", label: "Parents Satisfaction" },
];

const features = [
  {
    icon: Video,
    title: "Interactive Live Classes",
    body: "Engaging Sessions with expert teachers.",
    bg: "#FBE9B0",
    iconBg: "#F4C542",
  },
  {
    icon: User,
    title: "Personalized Learning",
    body: "Tailored Plans For every situation's needs.",
    bg: "#DCEBFB",
    iconBg: "#5FA8F0",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    body: "Monitor growth with regular report.",
    bg: "#F6E1F6",
    iconBg: "#C86FD8",
  },
  {
    icon: GraduationCap,
    title: "Expert Tutors",
    body: "Learn from Experienced and Passionate educations.",
    bg: "#DFF3E5",
    iconBg: "#4FAE6E",
  },
];

const books = [
  { label: "Maths", color: "#F4C542" },
  { label: "Science", color: "#5FA8F0" },
  { label: "English", color: "#E8752A" },
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

const StatCard = ({ s, index }) => {
  const Icon = s.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 rounded-xl bg-[#FBDDDB] px-4 py-3.5 sm:rounded-2xl sm:px-5 sm:py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Icon size={22} style={{ color: RED }} className="shrink-0" />
      <div>
        <p className="text-lg font-extrabold leading-none text-gray-900 sm:text-xl" style={{ color: RED }}>
          {s.value}
        </p>
        <p className="mt-1 text-[11px] text-gray-700 sm:text-xs">{s.label}</p>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ f, index }) => {
  const Icon = f.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col rounded-xl p-4 sm:rounded-2xl sm:p-5"
      style={{ backgroundColor: f.bg }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start justify-between">
        <h4 className="max-w-[75%] text-sm font-extrabold leading-snug text-gray-900 sm:text-base">
          {f.title}
        </h4>
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9"
          style={{ backgroundColor: f.iconBg }}
        >
          <Icon size={16} className="text-white" />
        </div>
      </div>

      <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-700 sm:text-sm">
        {f.body}
      </p>

      <button
        className="mt-3 flex h-7 w-7 items-center justify-center self-end rounded-full text-white transition hover:opacity-90 sm:h-8 sm:w-8"
        style={{ backgroundColor: RED }}
        aria-label={`Learn more about ${f.title}`}
      >
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
};

export default function Impact() {
  return (
    <section className="relative overflow-hidden bg-[#fdf1e9] px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm"
            style={{ backgroundColor: "#FBDDDB", color: RED }}
          >
            Our Impact
          </span>

          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Leaning made simple,
            <br />
            <span style={{ color: RED }}>Results Made Visible</span>
          </h2>

          <p className="mt-3 text-sm text-gray-700 sm:text-base">
            Real support . Expert guidance. Measurable Progress.
          </p>
        </FadeUp>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
          {stats.map((s, i) => (
            <StatCard s={s} index={i} key={s.label} />
          ))}
        </div>

        {/* Image + features */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-2 lg:gap-8">
          {/* Image column */}
          <FadeUp delay={0.1} className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <img
              src={studyImg}
              alt="Student attending an online class"
              className="h-72 w-full object-cover sm:h-96 lg:h-full"
            />

            {/* Sticky note */}
            <div
              className="absolute left-4 top-4 rotate-[-6deg] rounded-md bg-white/90 px-3 py-2 text-xs font-semibold shadow-md sm:left-6 sm:top-6"
              style={{ color: RED }}
            >
              <span className="flex items-center gap-1">
                Learn Grow Succeed <Heart size={12} className="fill-current" />
              </span>
            </div>

            {/* Video call thumbnail */}
            <div className="absolute right-4 top-4 h-16 w-24 bg-white overflow-hidden rounded-lg border-2 border-white shadow-md sm:right-6 sm:top-6 sm:h-20 sm:w-28">
              <img
                src={callThumbImg}
                alt="Tutor on a video call"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Book stack */}
            <div className="absolute bottom-4 left-4 flex flex-col-reverse gap-1 sm:bottom-6 sm:left-6">
              {books.map((b) => (
                <div
                  key={b.label}
                  className="flex h-6 w-20 items-center rounded-sm px-2 text-[10px] font-semibold text-white shadow sm:h-7 sm:w-24 sm:text-xs"
                  style={{ backgroundColor: b.color }}
                >
                  {b.label}
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <FeatureCard f={f} index={i} key={f.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}