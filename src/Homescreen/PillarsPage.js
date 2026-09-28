import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { UserRound, Target, Lightbulb, TrendingUp } from "lucide-react";

// Replace these with your actual image paths
import mentorshipImg from "../assets/Hero.png";
import personalizedImg from "../assets/Hero.png";
import masteryImg from "../assets/Hero.png";
import trackingImg from "../assets/Hero.png";

const RED = "#EB6664";

const pillars = [
  {
    id: "01",
    icon: UserRound,
    title: "Dedication Mentorship",
    body: "Every student receives personalized guidance from experienced mentors who provide continuous support, motivation, and academic direction throughout their learning journey.",
    cardBg: "#DCE9FB",
    badgeBg: "#1E3A8A",
    iconBg: "#A9C6EE",
    iconColor: "#1E3A8A",
    image: mentorshipImg,
  },
  {
    id: "02",
    icon: Target,
    title: "Personalized Learning",
    body: "One-on-one guidance from expert mentors to help students stay focused, confident, and on track toward their goals.",
    cardBg: "#E9E4FB",
    badgeBg: "#6D4FC4",
    iconBg: "#C6B8F5",
    iconColor: "#5B3FB0",
    image: personalizedImg,
  },
  {
    id: "03",
    icon: Lightbulb,
    title: "Concept Mastery",
    body: "Our mentors work closely with students, offering personalized support, regular feedback, and strategic guidance for lasting academic success.",
    cardBg: "#FBE7D6",
    badgeBg: "#E8752A",
    iconBg: "#F9CFA0",
    iconColor: "#C2620F",
    image: masteryImg,
  },
  {
    id: "04",
    icon: TrendingUp,
    title: "Structured Progress Tracking",
    body: "Expert mentors provide individualized guidance, helping students overcome challenges, build confidence, and achieve their full potential.",
    cardBg: "#DEF3E5",
    badgeBg: "#1F7A3D",
    iconBg: "#A8E0BA",
    iconColor: "#1F7A3D",
    image: trackingImg,
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

const PillarCard = ({ p, index }) => {
  const Icon = p.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6"
      style={{ backgroundColor: p.cardBg }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Number badge */}
      <span
        className="absolute top-3 left-3 sm:top-4 sm:left-4 flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white sm:h-7 sm:w-7 sm:text-xs"
        style={{ backgroundColor: p.badgeBg }}
      >
        {p.id}
      </span>

      {/* Icon avatar */}
      <div className="flex justify-center pt-4 sm:pt-2">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
          style={{ backgroundColor: p.iconBg }}
        >
          <Icon size={30} color={p.iconColor} />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-center text-base font-extrabold leading-snug text-gray-900 sm:mt-5 sm:text-lg">
        {p.title}
      </h3>

      {/* Body */}
      <p className="mt-2 text-center text-xs leading-relaxed text-gray-700 sm:mt-3 sm:text-sm">
        {p.body}
      </p>

      {/* Illustration */}
      <div className="mt-5 overflow-hidden rounded-xl sm:mt-6 sm:rounded-2xl">
        <img
          src={p.image}
          alt={p.title}
          className="h-28 w-full object-cover sm:h-32 lg:h-36"
        />
      </div>
    </motion.div>
  );
};

export default function PillarsSection() {
  return (
    <section className="relative overflow-hidden bg-[#fdf1e9] px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            The Four Pillars of
          </h2>

          <span className="mt-2 inline-flex items-center gap-3">
            <span className="hidden h-px w-8 rotate-[-8deg] bg-[#EB6664]/60 sm:block" />
            <span
              className="rounded-lg px-4 py-1.5 text-2xl font-extrabold italic sm:text-3xl lg:text-4xl"
              style={{ backgroundColor: "#FCE98A", color: RED }}
            >
              Esperly
            </span>
            <span className="hidden h-px w-8 rotate-[8deg] bg-[#EB6664]/60 sm:block" />
          </span>

          <h3 className="mt-6 text-xl font-extrabold text-gray-900 sm:mt-8 sm:text-2xl lg:text-3xl">
            The Esperly Learning Framework
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm italic text-gray-600 sm:mt-4 sm:text-base">
            "A complete learning ecosystem built to help every student learn,
            grow, and succeed with confidence."
          </p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {pillars.map((p, i) => (
            <PillarCard p={p} index={i} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}