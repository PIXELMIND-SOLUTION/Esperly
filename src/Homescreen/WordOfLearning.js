import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  GraduationCap,
  Sparkles,
  Globe2,
  School,
  BookOpen,
  Calculator,
  FlaskConical,
  PenLine,
  Award,
  Backpack,
  Mic,
  MessageSquare,
  Brain,
  Smile,
  Music,
  Palette,
  Feather,
  MapPin,
  PersonStanding,
  Heart,
} from "lucide-react";

// Replace with your actual image paths
import academicImg from "../assets/wol1.png";
import essentialImg from "../assets/wol2.png";
import creativeImg from "../assets/wol3.png";
import languageImg from "../assets/wol4.png";

const RED = "#EB6664";

const pillars = [
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    body: "Build strong foundations for a brighter future through personalized academic support and concept-based learning.",
    cardBg: "#FBEFC9",
    iconBg: "#F4C542",
    iconColor: "#5A4500",
    image: academicImg,
    tags: [
      [School, "School"],
      [BookOpen, "Textbooks"],
      [Award, "Learning"],
      [Award, "Achievement"],
      [Backpack, "Elementary"],
      [Calculator, "Maths"],
      [FlaskConical, "Science"],
      [PenLine, "Writing"],
    ],
  },
  {
    icon: Sparkles,
    title: "Essential Skills",
    body: "Develop confidence, communication, and problem-solving abilities that prepare students for real-world success.",
    cardBg: "#DCEBFB",
    iconBg: "#5FA8F0",
    iconColor: "#0B3A66",
    image: essentialImg,
    tags: [
      [Calculator, "Abacus"],
      [MessageSquare, "Communication"],
      [Mic, "Speaking"],
      [PenLine, "Grammar"],
      [Brain, "Phonics"],
      [Award, "Confidence"],
      [Calculator, "Mental Math"],
      [Smile, "Skills"],
    ],
  },
  {
    icon: PersonStanding,
    title: "Creative Expression",
    body: "Encourage imagination, self-expression, and emotional growth through engaging creative activities.",
    cardBg: "#F9E2F5",
    iconBg: "#D274CB",
    iconColor: "#5A1656",
    image: creativeImg,
    tags: [
      [Music, "Dance"],
      [Music, "Zumba"],
      [PenLine, "Drawing"],
      [Palette, "Painting"],
      [Mic, "Singing"],
      [MapPin, "Creativity"],
      [PersonStanding, "Yoga"],
      [Heart, "Wellness"],
    ],
  },
  {
    icon: Globe2,
    title: "Language Mastery",
    body: "Strengthen communication skills and open global opportunities through multilingual learning.",
    cardBg: "#DFF3E5",
    iconBg: "#4FAE6E",
    iconColor: "#0F3A20",
    image: languageImg,
    tags: [
      [Feather, "English"],
      [Feather, "Kannada"],
      [Feather, "Telugu"],
      [Feather, "French"],
      [Feather, "Hindi"],
      [Feather, "German"],
      [Feather, "Tamil"],
      [Feather, "Spanish"],
    ],
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
  const half = Math.ceil(p.tags.length / 2);
  const colA = p.tags.slice(0, half);
  const colB = p.tags.slice(half);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl p-5 sm:rounded-3xl sm:p-6"
      style={{ backgroundColor: p.cardBg }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11"
            style={{ backgroundColor: p.iconBg }}
          >
            <Icon size={20} color={p.iconColor} />
          </div>

          <h3 className="mt-3 text-base font-extrabold text-gray-900 sm:text-lg">
            {p.title}
          </h3>

          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-gray-700 sm:text-sm">
            {p.body}
          </p>
        </div>

        <img
          src={p.image}
          alt={p.title}
          className="h-20 w-16 shrink-0 object-contain sm:h-24 sm:w-20"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:mt-5">
        {[colA, colB].map((col, ci) => (
          <div key={ci} className="flex flex-col gap-2">
            {col.map(([TagIcon, label], i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-700 sm:text-xs">
                <TagIcon size={13} className="shrink-0 text-gray-600" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function WordOfLearning() {
  return (
    <section className="relative overflow-hidden bg-[#fdf1e9] px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="text-sm font-bold sm:text-base" style={{ color: RED }}>
            A world Of Learning
          </p>

          <h2 className="mt-2 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            One platform Every Dimension Of{" "}
            <span style={{ color: RED }}>GROWTH</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            From academics and essential skills to creativity and language
            mastery, Esperly supports every aspect of your child's growth.
          </p>
        </FadeUp>

        <div className="relative mt-8 sm:mt-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {pillars.map((p, i) => (
              <PillarCard p={p} index={i} key={p.title} />
            ))}
          </div>

          {/* Center Esperly badge */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-xs font-bold text-white shadow-lg sm:flex md:h-20 md:w-20 md:text-sm"
            style={{ backgroundColor: RED }}
          >
            Esperly
          </div>
        </div>
      </div>
    </section>
  );
}