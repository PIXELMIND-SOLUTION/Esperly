import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import {
  BookOpen,
  Sparkles,
  Lightbulb,
  Images,
  HelpCircle,
  MessageSquareQuote,
  Star,
  CalendarDays,
  Clock,
  Users,
  Award,
  ChevronDown,
  Check,
  PenLine,
  X,
  ShieldCheck,
  Repeat,
  Trophy,
  SearchX,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UserRound,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";

const RED = "#EB6664";

/* ── Pillars-style palettes ── */
const PALETTES = [
  { cardBg: "#DCE9FB", badgeBg: "#1E3A8A", iconBg: "#A9C6EE", iconColor: "#1E3A8A" }, // blue
  { cardBg: "#DEF3E5", badgeBg: "#1F7A3D", iconBg: "#A8E0BA", iconColor: "#1F7A3D" }, // green
  { cardBg: "#FBE7D6", badgeBg: "#E8752A", iconBg: "#F9CFA0", iconColor: "#C2620F" }, // orange
  { cardBg: "#E9E4FB", badgeBg: "#6D4FC4", iconBg: "#C6B8F5", iconColor: "#5B3FB0" }, // purple
  { cardBg: "#FDE3E2", badgeBg: "#EB6664", iconBg: "#F8B9B8", iconColor: "#C94442" }, // coral
];

const learningBoostersData = {
  dance: {
    id: "dance",
    title: "Dance Classes",
    tagline: "Express yourself through movement",
    description: "Our dance classes help children develop coordination, rhythm, and self-expression while having fun.",
    longDescription: "Dance is not just about learning steps; it's about building confidence, discipline, and creativity. Our expert instructors guide students through age-appropriate techniques, helping them discover their unique style while improving physical fitness and social skills.",
    images: [
      "https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&q=80",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&q=80",
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&q=80",
    ],
    bgGradient: "from-rose-600/80 via-orange-500/60 to-transparent",
    duration: "12 weeks", sessions: "2 sessions per week", ageGroup: "5–16 years", price: "₹2,499", level: "Beginner to Advanced",
    benefits: ["Improves physical fitness and flexibility", "Enhances coordination and balance", "Boosts self-confidence and expression", "Develops musicality and rhythm sense", "Builds teamwork and social skills"],
    curriculum: ["Basic footwork and body movements", "Rhythm and timing exercises", "Choreography basics", "Performance techniques", "Freestyle expression"],
    instructor: { name: "Priya Sharma", experience: "8+ years", specialty: "Contemporary & Hip-Hop" },
    schedule: "Monday & Wednesday — 4:00 PM to 5:30 PM",
    faqs: [
      { q: "Do I need prior dance experience?", a: "Not at all! Our classes are designed for all levels, from complete beginners to those with some experience. We group students by skill level to ensure everyone progresses comfortably." },
      { q: "What should my child wear to class?", a: "Comfortable, flexible clothing like leggings or joggers with a fitted top. Shoes depend on the dance style — we'll provide guidance after enrollment." },
      { q: "How many students are in each batch?", a: "We keep batches small — a maximum of 12 students — to ensure every child gets personal attention from the instructor." },
      { q: "Can parents watch the classes?", a: "Yes! Parents are welcome to observe the first class. After that, we recommend letting children settle in independently, which helps them focus better." },
      { q: "Is there a performance at the end of the course?", a: "Absolutely! We host a mini showcase at the end of every 12-week cycle where students perform for family and friends." },
    ],
    reviews: [
      { name: "Ananya R.", avatar: "A", rating: 5, date: "Oct 2024", text: "My daughter has transformed completely! She was shy before joining but now she performs on stage with full confidence. Priya ma'am is absolutely wonderful with kids." },
      { name: "Karthik M.", avatar: "K", rating: 5, date: "Sep 2024", text: "The quality of teaching is exceptional. Small batch sizes mean my son actually gets corrected and guided — not just herded around. Worth every rupee." },
      { name: "Sunita P.", avatar: "S", rating: 4, date: "Aug 2024", text: "Very well-structured program. My child looks forward to every class. Would love if there were more sessions per week though!" },
      { name: "Deepa V.", avatar: "D", rating: 5, date: "Jul 2024", text: "The end-of-course showcase was the highlight of our year. Seeing my child perform with such poise made us so proud. Highly recommend!" },
    ],
  },
  drawing: {
    id: "drawing",
    title: "Drawing Classes",
    tagline: "Bring your imagination to life",
    description: "Learn the fundamentals of drawing, from basic shapes to advanced sketching techniques.",
    longDescription: "Drawing is the foundation of all visual arts. Our structured program takes students from basic line work to complex compositions, teaching them to observe, analyze, and recreate the world around them with confidence.",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&q=80",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&q=80",
    ],
    bgGradient: "from-blue-700/80 via-purple-500/60 to-transparent",
    duration: "10 weeks", sessions: "1 session per week", ageGroup: "4–14 years", price: "₹1,999", level: "All Levels",
    benefits: ["Develops fine motor skills", "Enhances observation and focus", "Stimulates creative thinking", "Builds patience and attention to detail", "Provides emotional outlet"],
    curriculum: ["Line and shape fundamentals", "Shading and texture techniques", "Perspective drawing", "Still life and nature drawing", "Character and cartoon drawing"],
    instructor: { name: "Vikram Mehta", experience: "10+ years", specialty: "Sketching & Illustration" },
    schedule: "Tuesday — 3:30 PM to 5:00 PM",
    faqs: [
      { q: "What art supplies do we need?", a: "For the first class, just bring a pencil and notebook. We'll share a complete materials list after. Basic supplies cost around ₹300–500 and are available at any stationery store." },
      { q: "Is this suitable for very young children (4–5 years)?", a: "Yes! For younger children, we focus on fun mark-making and shape recognition rather than strict technique. It's all about building a love for art." },
      { q: "Will my child's artwork be displayed anywhere?", a: "We compile a digital portfolio for each student and also hold an art exhibition at the end of each term for families to view." },
      { q: "What if my child misses a class?", a: "We offer one makeup session per term for missed classes with prior notice. Our instructors also share reference notes for any missed content." },
    ],
    reviews: [
      { name: "Meghna T.", avatar: "M", rating: 5, date: "Nov 2024", text: "Vikram sir has an incredible way of explaining perspective and shading to kids. My 9-year-old now draws things that genuinely surprise me every week!" },
      { name: "Ravi S.", avatar: "R", rating: 5, date: "Oct 2024", text: "The structured curriculum is what sets this apart. There's clear progression every week and kids can see their own improvement, which keeps them motivated." },
      { name: "Preethi N.", avatar: "P", rating: 4, date: "Sep 2024", text: "Really good program. My daughter completed the 10-week course and her observation skills have visibly improved. Already enrolled for the next batch!" },
    ],
  },
  singing: {
    id: "singing",
    title: "Singing Classes",
    tagline: "Find your voice, own the stage",
    description: "Professional vocal training covering breathing techniques, pitch control, and performance skills.",
    longDescription: "Discover the joy of singing with our expert-led classes. Students learn proper vocal techniques, ear training, and performance skills while exploring various musical genres. Whether beginner or advanced, every voice finds its place here.",
    images: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
    ],
    bgGradient: "from-pink-700/80 via-red-500/60 to-transparent",
    duration: "12 weeks", sessions: "2 sessions per week", ageGroup: "6–18 years", price: "₹2,999", level: "Beginner to Advanced",
    benefits: ["Improves breathing and posture", "Enhances memory and concentration", "Builds confidence and stage presence", "Develops musical ear", "Reduces stress and anxiety"],
    curriculum: ["Vocal warm-up exercises", "Breathing techniques", "Pitch and tone control", "Song interpretation", "Microphone technique"],
    instructor: { name: "Neha Gupta", experience: "12+ years", specialty: "Classical & Bollywood" },
    schedule: "Thursday & Saturday — 5:00 PM to 6:30 PM",
    faqs: [
      { q: "My child is very shy. Will singing classes help?", a: "Absolutely — in fact, shy children often benefit the most. We start with group exercises so no one feels singled out, and confidence builds naturally over time." },
      { q: "Do you teach only Bollywood songs?", a: "We cover a wide range — Bollywood, classical ragas, folk, and even some English songs. The curriculum is designed to build versatile vocal skills." },
      { q: "Is there a minimum age requirement?", a: "We accept students from age 6. For younger children, we focus on musical play, basic pitch matching, and simple nursery rhymes before moving to formal training." },
      { q: "Will students get to perform publicly?", a: "Yes! We organise a recital at the end of every 12-week cycle. Students also get opportunities to perform at school events and local competitions." },
    ],
    reviews: [
      { name: "Lalitha K.", avatar: "L", rating: 5, date: "Nov 2024", text: "Neha ma'am is a gem. My son went from not being able to hold a single note to performing a full Bollywood song at his school annual day. Truly life-changing!" },
      { name: "Arun B.", avatar: "A", rating: 5, date: "Oct 2024", text: "The breathing and posture techniques taught here have genuinely improved my daughter's overall confidence, not just her singing. Highly professional setup." },
      { name: "Jaya M.", avatar: "J", rating: 4, date: "Sep 2024", text: "Great classes with a very patient instructor. My child was terrified of performing but now actually volunteers to sing in front of people. Remarkable progress!" },
      { name: "Suresh P.", avatar: "S", rating: 5, date: "Aug 2024", text: "Best investment we made. The small batch means individual attention is guaranteed. You can actually hear the improvement week over week." },
    ],
  },
  yoga: {
    id: "yoga",
    title: "Yoga Classes",
    tagline: "Mind, body & soul harmony",
    description: "Holistic yoga sessions combining asanas, breathing exercises, and meditation for overall wellness.",
    longDescription: "Yoga for children helps build body awareness, improve concentration, and manage stress. Our classes are designed to be fun and engaging while teaching proper alignment and mindfulness techniques that benefit students both on and off the mat.",
    images: [
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    ],
    bgGradient: "from-green-700/80 via-teal-500/60 to-transparent",
    duration: "8 weeks", sessions: "2 sessions per week", ageGroup: "5–16 years", price: "₹1,799", level: "All Levels",
    benefits: ["Improves flexibility and strength", "Enhances focus and concentration", "Reduces stress and anxiety", "Promotes better sleep", "Develops body awareness"],
    curriculum: ["Basic asanas (poses)", "Pranayama (breathing)", "Sun salutations", "Mindfulness meditation", "Relaxation techniques"],
    instructor: { name: "Anjali Nair", experience: "7+ years", specialty: "Children's Yoga & Mindfulness" },
    schedule: "Wednesday & Friday — 4:30 PM to 5:30 PM",
    faqs: [
      { q: "Do children need a yoga mat?", a: "Yes, a basic yoga mat is required. We recommend a non-slip mat of at least 4mm thickness. Good-quality mats are available for around ₹500–800 online." },
      { q: "Is yoga safe for children with health conditions?", a: "We recommend consulting your paediatrician first. Our instructor is trained in adaptive yoga and can modify poses for children with specific physical considerations." },
      { q: "How soon will we see results?", a: "Most parents report improved sleep and focus within 2–3 weeks. Flexibility and strength improvements are typically visible by week 4–5." },
      { q: "Will meditation be part of the sessions?", a: "Yes, every session ends with a 5–10 minute guided relaxation or mindfulness exercise. These are kept simple and age-appropriate." },
    ],
    reviews: [
      { name: "Padma R.", avatar: "P", rating: 5, date: "Oct 2024", text: "My hyperactive 8-year-old is now able to sit quietly and breathe through difficult emotions. The mindfulness component of these classes is gold. Thank you Anjali ma'am!" },
      { name: "Vikram D.", avatar: "V", rating: 5, date: "Sep 2024", text: "The improvement in my daughter's posture and flexibility is visible. More importantly, she sleeps better and is less anxious about exams. Wonderful program." },
      { name: "Chitra S.", avatar: "C", rating: 4, date: "Aug 2024", text: "Very calm and encouraging teaching style. My kids actually look forward to these sessions, which says everything. Would love if the course were longer than 8 weeks!" },
    ],
  },
  zumba: {
    id: "zumba",
    title: "Zumba Classes",
    tagline: "Dance your way to fitness",
    description: "High-energy dance fitness classes combining international music with fun, effective workouts.",
    longDescription: "Zumba for kids is all about having fun while staying active. Our classes feature kid-friendly routines set to upbeat music, helping children develop coordination, burn energy, and build healthy habits that last a lifetime.",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200&q=80",
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&q=80",
    ],
    bgGradient: "from-yellow-600/80 via-orange-500/60 to-transparent",
    duration: "10 weeks", sessions: "2 sessions per week", ageGroup: "7–16 years", price: "₹2,299", level: "Beginner to Intermediate",
    benefits: ["Improves cardiovascular health", "Boosts energy and endurance", "Enhances coordination and rhythm", "Burns calories while having fun", "Builds social connections"],
    curriculum: ["Warm-up and stretching", "Basic Zumba steps", "Choreographed routines", "Cool-down exercises", "Fun dance games"],
    instructor: { name: "Rahul Verma", experience: "6+ years", specialty: "Zumba Kids & Kids Jr." },
    schedule: "Monday & Thursday — 5:30 PM to 6:30 PM",
    faqs: [
      { q: "Is Zumba too intense for young children?", a: "Not at all. Zumba Kids is specifically designed to be age-appropriate with shorter, fun routines. The energy levels and movements are calibrated for children, not adults." },
      { q: "What should children wear and bring?", a: "Comfortable athletic wear and supportive sports shoes are ideal. Children should bring a water bottle — sessions are energetic and hydration is important!" },
      { q: "Will my child lose weight from Zumba?", a: "Zumba is primarily about fitness, fun, and coordination. Children burn energy and build endurance. We don't focus on weight loss but on building healthy active habits." },
      { q: "Can children with two left feet join?", a: "100%! Rahul sir is brilliant with beginners and makes the routines easy to follow. The focus is always on having fun — coordination improves naturally." },
    ],
    reviews: [
      { name: "Kavitha L.", avatar: "K", rating: 5, date: "Nov 2024", text: "My son used to hate any kind of exercise. Now he pesters me to drop him early for Zumba class! Rahul sir makes it so fun that kids don't even realise they're working out." },
      { name: "Harish N.", avatar: "H", rating: 5, date: "Oct 2024", text: "Incredible energy in every class. My daughter has made new friends and is visibly fitter. Her stamina during school sports has improved too. Amazing results!" },
      { name: "Rekha T.", avatar: "R", rating: 4, date: "Sep 2024", text: "Fun and energetic classes. My kids are always smiling when they come out. Great instructor who clearly loves what he does." },
    ],
  },
  painting: {
    id: "painting",
    title: "Painting Classes",
    tagline: "Colors that speak louder than words",
    description: "Explore watercolor, acrylic, and mixed media techniques in a vibrant creative environment.",
    longDescription: "Painting allows children to express emotions and ideas through colors and textures. Our classes cover multiple mediums and techniques, encouraging experimentation while building fundamental skills in composition, color theory, and artistic expression.",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
    ],
    bgGradient: "from-indigo-700/80 via-purple-500/60 to-transparent",
    duration: "12 weeks", sessions: "1 session per week", ageGroup: "5–15 years", price: "₹2,199", level: "All Levels",
    benefits: ["Enhances creativity and imagination", "Improves fine motor skills", "Develops color sense and composition", "Builds patience and focus", "Provides therapeutic outlet"],
    curriculum: ["Color theory basics", "Watercolor techniques", "Acrylic painting", "Texture and mixed media", "Canvas painting projects"],
    instructor: { name: "Meera Iyer", experience: "9+ years", specialty: "Watercolor & Acrylics" },
    schedule: "Saturday — 10:00 AM to 12:00 PM",
    faqs: [
      { q: "Are art supplies included in the fee?", a: "Basic supplies (canvas, brushes, paints) for the first two classes are included. After that, students will need their own kit. We provide a recommended list with budget options." },
      { q: "My child has never painted before — is that okay?", a: "Perfectly fine! We start with the absolute basics of color mixing and brush control. Even children with no prior experience produce beautiful work by week 3." },
      { q: "Are the finished artworks kept by the student?", a: "Yes! Every painting belongs to the student. We also photograph all work to build a digital portfolio that parents receive at the end of the course." },
      { q: "What styles of painting will be taught?", a: "We cover watercolor, acrylic, and mixed media. Students also get to try techniques inspired by famous artists like Monet, Van Gogh, and Madhubani painters." },
    ],
    reviews: [
      { name: "Shalini K.", avatar: "S", rating: 5, date: "Nov 2024", text: "Meera ma'am is a phenomenal teacher. My 7-year-old produced a watercolor landscape in week 4 that I genuinely framed and put up in our living room. Stunning!" },
      { name: "Balaji R.", avatar: "B", rating: 5, date: "Oct 2024", text: "The variety of techniques taught is impressive. My daughter has learned watercolor, acrylic, and even some mixed media. Her creativity has exploded since joining." },
      { name: "Nithya V.", avatar: "N", rating: 5, date: "Sep 2024", text: "Best thing we did this year. My son is calmer, more patient, and incredibly proud of his artwork. The digital portfolio at the end was a beautiful touch." },
      { name: "Ganesh M.", avatar: "G", rating: 4, date: "Aug 2024", text: "Excellent program. Only reason for 4 stars instead of 5 is I wish the Saturday session were longer — the kids are always reluctant to leave!" },
    ],
  },
};

/* ── Fade-up wrapper (same as Pillars) ── */
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

/* ── Star Rating ── */
const StarRating = ({ rating, size = "sm" }) => {
  const sz = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sz} ${s <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  );
};

/* ── Pillar-style section card ── */
const SectionCard = ({ id, icon: Icon, title, palette, index = 0, children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.section
      ref={ref}
      className="relative rounded-2xl p-5 pt-12 sm:rounded-3xl sm:p-6 sm:pt-6 lg:p-7"
      style={{ backgroundColor: palette.cardBg }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white sm:left-4 sm:top-4 sm:h-7 sm:w-7 sm:text-xs"
        style={{ backgroundColor: palette.badgeBg }}
      >
        {id}
      </span>

      <div className="flex items-center gap-3 sm:justify-center sm:pt-1">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14"
          style={{ backgroundColor: palette.iconBg }}
        >
          <Icon size={24} color={palette.iconColor} />
        </div>
        <h2 className="text-lg font-extrabold leading-snug text-gray-900 sm:text-xl lg:text-2xl">{title}</h2>
      </div>

      <div className="mt-5 sm:mt-6">{children}</div>
    </motion.section>
  );
};

/* ── Small sidebar card ── */
const SideCard = ({ icon: Icon, title, palette, index = 0, children }) => (
  <FadeUp delay={index * 0.06}>
    <div className="rounded-2xl p-5 sm:rounded-3xl sm:p-6" style={{ backgroundColor: palette.cardBg }}>
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: palette.iconBg }}
        >
          <Icon size={22} color={palette.iconColor} />
        </div>
        <h3 className="text-base font-extrabold text-gray-900 sm:text-lg">{title}</h3>
      </div>
      {children}
    </div>
  </FadeUp>
);

/* ── FAQ Item ── */
const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl ${
        open ? "border-[#EB6664]/40 bg-white shadow-sm" : "border-white/60 bg-white/70 hover:bg-white"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5"
        aria-expanded={open}
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#EB6664] text-[11px] font-bold text-white">
            {index + 1}
          </span>
          <span className={`text-sm font-bold leading-snug transition-colors sm:text-base ${open ? "text-[#EB6664]" : "text-gray-900"}`}>
            {faq.q}
          </span>
        </div>
        <div
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open ? "rotate-180 border-[#EB6664] bg-[#EB6664]" : "border-gray-200 bg-gray-50"
          }`}
        >
          <ChevronDown size={14} className={open ? "text-white" : "text-gray-500"} />
        </div>
      </button>
      <div className={`transition-all duration-300 ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="px-4 pb-4 pl-[52px] text-xs leading-relaxed text-gray-700 sm:px-5 sm:pb-5 sm:pl-[56px] sm:text-sm">{faq.a}</p>
      </div>
    </div>
  );
};

/* ── Review Card ── */
const ReviewCard = ({ review }) => (
  <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl sm:p-5">
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#EB6664] text-sm font-bold text-white">
          {review.avatar}
        </div>
        <div>
          <p className="text-sm font-extrabold leading-tight text-gray-900">{review.name}</p>
          <p className="mt-0.5 text-[11px] text-gray-500">{review.date}</p>
        </div>
      </div>
      <StarRating rating={review.rating} />
    </div>
    <p className="text-xs italic leading-relaxed text-gray-700 sm:text-sm">"{review.text}"</p>
  </div>
);

/* ── Hero Carousel ── */
const HeroCarousel = ({ booster, onBook }) => {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const images = booster.images;

  const next = useCallback(() => setCur((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!paused) timer.current = setInterval(next, 3000);
    return () => clearInterval(timer.current);
  }, [paused, next]);

  const chips = [
    { label: booster.ageGroup, icon: Users },
    { label: booster.duration, icon: Clock },
    { label: booster.sessions, icon: CalendarDays },
    { label: booster.level, icon: Award },
  ];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(480px, 68vh, 720px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === cur ? 1 : 0 }}>
          <img
            src={img}
            alt={`${booster.title} ${i + 1}`}
            className="h-full w-full object-cover"
            style={{
              filter: "brightness(0.75) saturate(1.1)",
              transform: i === cur ? "scale(1.03)" : "scale(1.06)",
              transition: "transform 5s ease-out",
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 35%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 35%)" }} />

      <div className="absolute inset-0 z-10 flex flex-col justify-center px-5 pb-16 sm:px-10 sm:pb-14 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <span
              className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white sm:mb-4"
              style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EB6664]" /> Learning Booster
            </span>

            <h1
              className="mb-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
            >
              {booster.title}
            </h1>

            <span
              className="mb-3 inline-block rounded-lg px-3 py-1 text-base font-extrabold italic sm:px-4 sm:py-1.5 sm:text-xl"
              style={{ backgroundColor: "#FCE98A", color: RED }}
            >
              {booster.tagline}
            </span>

            <p className="mb-5 hidden max-w-xl text-sm leading-relaxed text-white/75 sm:block sm:text-base">{booster.description}</p>

            <div className="mb-6 flex flex-wrap gap-2 sm:gap-2.5">
              {chips.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1"
                    style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                  >
                    <Icon size={13} className="text-[#FCE98A]" />
                    <span className="whitespace-nowrap text-[11px] font-semibold text-white sm:text-xs">{s.label}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onBook}
              className="inline-flex items-center gap-2 rounded-full bg-[#EB6664] px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#d45553] active:scale-95 sm:px-8 sm:text-base"
              style={{ boxShadow: "0 4px 24px rgba(235,102,100,0.55)" }}
            >
              Book Class Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 right-4 z-10 flex gap-2 rounded-xl border border-white/15 p-1.5 sm:right-8"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            aria-label={`Show image ${i + 1}`}
            className={`overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              i === cur ? "border-[#EB6664] shadow-lg" : "border-white/20 opacity-60 hover:opacity-80"
            }`}
            style={{ width: i === cur ? 48 : 36, height: i === cur ? 32 : 24 }}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-white/10">
        <div className="h-full bg-[#EB6664] transition-all duration-500" style={{ width: `${((cur + 1) / images.length) * 100}%` }} />
      </div>
    </div>
  );
};

/* ── Input class (modal) ── */
const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20";

/* ── Main Component ── */
export default function BoosterDetails() {
  const { boosterId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const emptyForm = { studentName: "", parentName: "", email: "", phone: "", age: "", preferredBatch: "", message: "" };
  const [formData, setFormData] = useState(emptyForm);

  const booster = learningBoostersData[boosterId?.toLowerCase()];

  if (!booster) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdf1e9] p-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDE3E2]">
            <SearchX size={30} color="#C94442" />
          </div>
          <h1 className="mb-2 text-xl font-extrabold text-gray-900">Booster Not Found</h1>
          <p className="mb-6 text-sm text-gray-600">The learning booster you're looking for doesn't exist.</p>
          <Link
            to="/boosters"
            className="inline-block rounded-xl bg-[#EB6664] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#d45553]"
          >
            View All Boosters
          </Link>
        </div>
      </div>
    );
  }

  const avgRating = (booster.reviews.reduce((s, r) => s + r.rating, 0) / booster.reviews.length).toFixed(1);
  const avgRounded = Math.round(Number(avgRating));

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setStep(1);
      setSuccess(false);
      setFormData(emptyForm);
    }, 2200);
  };
  const closeModal = () => {
    setShowModal(false);
    setStep(1);
    setSuccess(false);
  };

  const quickInfo = [
    { icon: Clock, label: "Duration", value: booster.duration, p: PALETTES[0] },
    { icon: CalendarDays, label: "Sessions", value: booster.sessions, p: PALETTES[1] },
    { icon: Users, label: "Age Group", value: booster.ageGroup, p: PALETTES[2] },
    { icon: Award, label: "Level", value: booster.level, p: PALETTES[3] },
  ];

  return (
    <>
      <Header />
      <NavImage />

      <div className="bg-[#fdf1e9]">
        <HeroCarousel booster={booster} onBook={() => setShowModal(true)} />

        {/* Quick Info Strip */}
        <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 sm:-mt-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {quickInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <FadeUp key={idx} delay={idx * 0.07}>
                  <div
                    className="flex h-full flex-col items-center rounded-2xl p-3 text-center shadow-md transition-shadow hover:shadow-lg sm:rounded-3xl sm:p-4"
                    style={{ backgroundColor: info.p.cardBg }}
                  >
                    <div
                      className="mb-2 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12"
                      style={{ backgroundColor: info.p.iconBg }}
                    >
                      <Icon size={20} color={info.p.iconColor} />
                    </div>
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-600 sm:text-xs">{info.label}</p>
                    <p className="text-xs font-extrabold leading-snug text-gray-900 sm:text-sm">{info.value}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>

        {/* Section intro */}
        <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8">
          <FadeUp className="text-center">
            <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">Everything About</h2>
            <span className="mt-2 inline-flex items-center gap-3">
              <span className="hidden h-px w-8 rotate-[-8deg] bg-[#EB6664]/60 sm:block" />
              <span
                className="rounded-lg px-4 py-1.5 text-xl font-extrabold italic sm:text-2xl lg:text-3xl"
                style={{ backgroundColor: "#FCE98A", color: RED }}
              >
                {booster.title}
              </span>
              <span className="hidden h-px w-8 rotate-[8deg] bg-[#EB6664]/60 sm:block" />
            </span>
            <p className="mx-auto mt-3 max-w-2xl text-sm italic text-gray-600 sm:mt-4 sm:text-base">"{booster.tagline}"</p>
          </FadeUp>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left */}
            <div className="space-y-5 sm:space-y-6 lg:col-span-2">
              {/* About */}
              <SectionCard id="01" icon={BookOpen} title="About This Program" palette={PALETTES[0]}>
                <p className="rounded-xl bg-white/70 p-4 text-sm leading-relaxed text-gray-700 sm:rounded-2xl sm:p-5 sm:text-base">
                  {booster.longDescription}
                </p>
              </SectionCard>

              {/* Benefits */}
              <SectionCard id="02" icon={Sparkles} title="Benefits" palette={PALETTES[1]}>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {booster.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-white/70 p-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#1F7A3D] text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-xs font-medium leading-snug text-gray-800 sm:text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Curriculum */}
              <SectionCard id="03" icon={Lightbulb} title="What You'll Learn" palette={PALETTES[2]}>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {booster.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-white/70 p-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#E8752A] text-[11px] font-bold text-white">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium leading-snug text-gray-800 sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Gallery */}
              <SectionCard id="04" icon={Images} title="Gallery" palette={PALETTES[3]}>
                <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3 sm:gap-3">
                  {booster.images.map((img, i) => (
                    <div key={i} className="aspect-video overflow-hidden rounded-xl sm:rounded-2xl">
                      <img
                        src={img}
                        alt={`${booster.title} ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* FAQs */}
              <SectionCard id="05" icon={HelpCircle} title="Frequently Asked Questions" palette={PALETTES[4]}>
                <div className="space-y-2.5">
                  {booster.faqs.map((faq, idx) => (
                    <FaqItem key={idx} faq={faq} index={idx} />
                  ))}
                </div>
              </SectionCard>

              {/* Reviews */}
              <SectionCard id="06" icon={MessageSquareQuote} title="Parent Reviews" palette={PALETTES[0]}>
                <div className="mb-5 flex items-center justify-center gap-3 self-start rounded-2xl bg-white/80 px-4 py-2.5 sm:mx-auto sm:w-fit">
                  <div>
                    <p className="text-2xl font-extrabold leading-none text-amber-500">{avgRating}</p>
                    <p className="mt-0.5 text-[10px] text-gray-500">{booster.reviews.length} reviews</p>
                  </div>
                  <div>
                    <StarRating rating={avgRounded} size="md" />
                    <p className="mt-1 text-[10px] font-bold text-amber-600">Excellent</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {booster.reviews.map((review, idx) => (
                    <ReviewCard key={idx} review={review} />
                  ))}
                </div>

                <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-white/70 pt-5 sm:flex-row sm:items-center">
                  <p className="text-sm text-gray-700">Enrolled in this program? Share your experience!</p>
                  <button className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-[#EB6664]/40 bg-white px-4 py-2 text-sm font-bold text-[#EB6664] transition-colors hover:bg-rose-50">
                    <PenLine size={16} />
                    Write a Review
                  </button>
                </div>
              </SectionCard>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Instructor */}
              <SideCard icon={UserRound} title="Your Instructor" palette={PALETTES[3]}>
                <div className="flex items-center gap-3 rounded-xl bg-white/70 p-3 sm:gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#6D4FC4] text-xl font-bold text-white shadow-md sm:h-16 sm:w-16">
                    {booster.instructor.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-gray-900 sm:text-base">{booster.instructor.name}</p>
                    <p className="mt-0.5 text-xs text-gray-600">{booster.instructor.experience} experience</p>
                    <p className="mt-0.5 text-xs font-semibold text-[#5B3FB0]">{booster.instructor.specialty}</p>
                  </div>
                </div>
              </SideCard>

              {/* Schedule */}
              <SideCard icon={CalendarDays} title="Class Schedule" palette={PALETTES[2]} index={1}>
                <p className="rounded-xl bg-white/70 p-3 text-sm font-bold leading-relaxed text-gray-800">{booster.schedule}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <p className="text-xs font-semibold text-green-800">First class free trial available!</p>
                </div>
              </SideCard>

              {/* Rating summary */}
              <SideCard icon={Star} title="Student Rating" palette={PALETTES[1]} index={2}>
                <div className="mb-4 flex items-center gap-4">
                  <div className="text-4xl font-extrabold text-amber-500">{avgRating}</div>
                  <div>
                    <StarRating rating={avgRounded} size="md" />
                    <p className="mt-1 text-xs text-gray-600">Based on {booster.reviews.length} reviews</p>
                  </div>
                </div>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = booster.reviews.filter((r) => r.rating === star).length;
                  const pct = Math.round((count / booster.reviews.length) * 100);
                  return (
                    <div key={star} className="mb-1.5 flex items-center gap-2">
                      <span className="w-3 text-xs font-medium text-gray-700">{star}</span>
                      <Star className="h-3 w-3 text-amber-400" fill="currentColor" strokeWidth={0} />
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/80">
                        <div className="h-full rounded-full bg-amber-400 transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-[10px] text-gray-600">{pct}%</span>
                    </div>
                  );
                })}
              </SideCard>

              {/* Sticky CTA */}
              <FadeUp delay={0.1}>
                <div className="lg:sticky lg:top-6">
                  <div className="rounded-2xl bg-white p-4 shadow-lg sm:rounded-3xl sm:p-5">
                    <div className="mb-3 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Course Fee</p>
                        <p className="text-2xl font-extrabold text-[#EB6664] sm:text-3xl">{booster.price}</p>
                      </div>
                      <span className="rounded-md bg-[#FCE98A] px-2 py-1 text-[10px] font-extrabold uppercase text-[#EB6664]">
                        Limited seats
                      </span>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#EB6664] py-3.5 text-base font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-[#d45553] active:scale-95 sm:text-lg"
                    >
                      Book Your Class Now <ArrowRight size={18} />
                    </button>
                    <p className="mt-2 text-center text-xs text-gray-500">Register today to reserve your spot!</p>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { icon: Trophy, label: "Expert Tutors", p: PALETTES[2] },
                      { icon: ShieldCheck, label: "Verified Classes", p: PALETTES[1] },
                      { icon: Repeat, label: "Flexible Batches", p: PALETTES[0] },
                    ].map((b, i) => {
                      const Icon = b.icon;
                      return (
                        <div key={i} className="rounded-xl p-2 text-center sm:rounded-2xl sm:p-3" style={{ backgroundColor: b.p.cardBg }}>
                          <div
                            className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: b.p.iconBg }}
                          >
                            <Icon size={16} color={b.p.iconColor} />
                          </div>
                          <p className="text-[10px] font-bold leading-tight text-gray-800">{b.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-[#fdf1e9] shadow-2xl sm:max-w-lg sm:rounded-3xl"
          >
            {success ? (
              <div className="p-10 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#A8E0BA]">
                  <CheckCircle2 size={40} color="#1F7A3D" />
                </div>
                <h3 className="mb-2 text-xl font-extrabold text-gray-900">Booking Confirmed!</h3>
                <p className="text-sm leading-relaxed text-gray-600">We'll contact you within 24 hours to confirm your class schedule.</p>
              </div>
            ) : (
              <>
                <div className="relative h-32 overflow-hidden rounded-t-3xl sm:h-36">
                  <img src={booster.images[0]} alt={booster.title} className="h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${booster.bgGradient} to-black/60`} />
                  <div className="absolute inset-0 flex items-start justify-between px-5 pt-5 sm:px-6">
                    <div>
                      <h3 className="text-lg font-extrabold text-white sm:text-xl">Book {booster.title}</h3>
                      <p className="mt-0.5 text-xs text-white/85">Fill in details to reserve your spot</p>
                    </div>
                    <button
                      onClick={closeModal}
                      aria-label="Close"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-5 flex items-center gap-2 sm:left-6">
                    {[1, 2].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold transition-all ${
                            step >= s ? "bg-[#FCE98A] text-[#EB6664]" : "bg-white/30 text-white"
                          }`}
                        >
                          {s}
                        </div>
                        {s < 2 && <div className={`h-0.5 w-8 rounded-full transition-all ${step > s ? "bg-[#FCE98A]" : "bg-white/30"}`} />}
                      </div>
                    ))}
                    <span className="ml-1 text-[11px] font-medium text-white/80">{step === 1 ? "Personal Details" : "Batch & Preferences"}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
                  {step === 1 ? (
                    <>
                      {[
                        { label: "Student's Full Name", name: "studentName", type: "text", placeholder: "Enter student name" },
                        { label: "Parent / Guardian Name", name: "parentName", type: "text", placeholder: "Enter parent name" },
                        { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
                        { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter mobile number" },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="mb-1.5 block text-xs font-bold text-gray-800 sm:text-sm">{f.label} *</label>
                          <input
                            type={f.type}
                            name={f.name}
                            value={formData[f.name]}
                            onChange={handleChange}
                            required
                            placeholder={f.placeholder}
                            className={inputCls}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-gray-800 sm:text-sm">Student's Age *</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          min="3"
                          max="18"
                          placeholder="Age in years"
                          className={inputCls}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-gray-800 sm:text-sm">Preferred Batch *</label>
                        <select name="preferredBatch" value={formData.preferredBatch} onChange={handleChange} required className={inputCls}>
                          <option value="">Select a batch</option>
                          <option>Morning Batch (9 AM – 10:30 AM)</option>
                          <option>Afternoon Batch (3 PM – 4:30 PM)</option>
                          <option>Evening Batch (5 PM – 6:30 PM)</option>
                          <option>Weekend Batch (Saturday / Sunday)</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-gray-800 sm:text-sm">Any Special Requests?</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="3"
                          placeholder="Tell us if you have any specific requirements..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                      <div className="space-y-2 rounded-2xl p-4" style={{ backgroundColor: PALETTES[2].cardBg }}>
                        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-600">Booking Summary</p>
                        {[
                          { k: "Course", v: booster.title },
                          { k: "Duration", v: booster.duration },
                          { k: "Schedule", v: booster.schedule },
                        ].map((r) => (
                          <div key={r.k} className="flex justify-between text-sm">
                            <span className="text-gray-600">{r.k}</span>
                            <span className="ml-4 text-right font-bold text-gray-900">{r.v}</span>
                          </div>
                        ))}
                        <div className="flex justify-between border-t border-white/70 pt-2 text-sm">
                          <span className="text-gray-600">Fee</span>
                          <span className="font-extrabold text-[#EB6664]">{booster.price}</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 pt-1">
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    )}
                    <button
                      type="submit"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#EB6664] py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-[#d45553] active:scale-95"
                    >
                      {step === 1 ? (
                        <>
                          Continue <ArrowRight size={16} />
                        </>
                      ) : (
                        <>
                          Confirm Booking <Check size={16} strokeWidth={3} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}