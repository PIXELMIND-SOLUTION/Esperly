import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiChevronDown } from "react-icons/fi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HERO_IMG from "../../assets/Faqs/faqhero.png";        // update to your hero image path
import FAQ_IMG from "../../assets/Faqs/faqillustration.png"; // update to your illustration path

/* ───────── DATA ───────── */
const INITIAL_COUNT = 10;

const faqs = [
  {
    q: "What is Esperly, and how does it work?",
    a: "Esperly is an online tuition platform that connects students with experienced tutors for personalized, one-on-one learning. You can choose your child's class, subject, and preferred schedule, and start learning from the comfort of home.",
  },
  {
    q: "Which subjects are available?",
    a: "We cover all major subjects, including Mathematics, Science, English, Social Studies, and more, based on your child's board and grade.",
  },
  {
    q: "Which classes and boards does Esperly support?",
    a: "We support all major boards, including CBSE, ICSE, State Boards, and international curricula, for students from Class 1 to 12.",
  },
  {
    q: "How is one-on-one tuition better than group classes?",
    a: "One-on-one tuition ensures personalized attention, faster doubt resolution, and lessons tailored to your child's pace and learning style.",
  },
  {
    q: "Can Esperly help with exam preparation?",
    a: "Yes. We provide board exam preparation, competitive exam guidance, and regular assessments to track your child's progress.",
  },
  {
    q: "How are tutors selected and trained?",
    a: "All tutors are experienced, qualified educators trained to deliver engaging, interactive online lessons.",
  },
  {
    q: "Can I choose my child's tutor?",
    a: "Yes. Tutors are matched based on subject, grade, and learning preferences.",
  },
  {
    q: "What if my child and the tutor are not a good fit?",
    a: "We offer tutor reassignment to ensure your child receives the most suitable guidance.",
  },
  {
    q: "Are tutors available for extra doubt-clearing sessions?",
    a: "Yes. Tutors can provide additional sessions if scheduled in advance.",
  },
  {
    q: "How do tutors personalize the learning experience?",
    a: "Tutors assess your child's strengths and areas for improvement and design lessons to build understanding, confidence, and curiosity.",
  },
  {
    q: "How long is each session, and how often can my child attend?",
    a: "Sessions typically last 30–60 minutes, with flexible frequency based on your child's needs.",
  },
  {
    q: "Can classes be scheduled according to my child's convenience?",
    a: "Yes. Esperly offers flexible scheduling, including weekdays and weekends.",
  },
  {
    q: "Can I reschedule or cancel a class?",
    a: "Yes. Classes can be rescheduled with prior notice.",
  },
  {
    q: "Is a trial class available?",
    a: "Yes. Every student can book a trial class before enrolling in a package.",
  },
  {
    q: "Can international students attend classes?",
    a: "Yes. Esperly is accessible globally, allowing students from any location or time zone to join.",
  },
  {
    q: "What devices or software are needed?",
    a: "You can attend classes on a computer, tablet, or smartphone with a stable internet connection. No extra software is required.",
  },
  {
    q: "Is the platform safe for children?",
    a: "Yes. Our platform is secure, private, and child-friendly.",
  },
  {
    q: "How can I track my child's progress?",
    a: "Parents receive regular updates, performance reports, and feedback to monitor learning outcomes.",
  },
  {
    q: "Do students get assignments or practice material?",
    a: "Yes. Tutors provide worksheets, practice questions, and notes to reinforce learning.",
  },
  {
    q: "How can I communicate with the tutor outside class?",
    a: "Tutors are available for clarifications or guidance via the platform between sessions.",
  },
];

/* ───────── FADE-IN WRAPPER ───────── */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5% 0px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ───────── FAQ ITEM ───────── */
const FAQItem = ({ item, index, isOpen, onToggle }) => (
  <div
    className={`rounded-2xl border border-[#EB6664] transition-colors duration-300 ${
      isOpen ? "bg-[#FCDDDA]" : "bg-white/40 hover:bg-[#FCDDDA]/50"
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      className="flex w-full items-center gap-3 rounded-2xl px-3 sm:px-4 py-3 text-left
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB6664]/60"
    >
      <span
        className={`flex h-7 min-w-7 sm:h-8 sm:min-w-8 shrink-0 items-center justify-center rounded-full px-1
                    text-xs sm:text-sm font-medium transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#EB6664] text-white"
                        : "bg-[#F8D5D1] text-[#EB6664]"
                    }`}
      >
        {index + 1}.
      </span>

      <span className="flex-1 text-sm sm:text-base lg:text-[17px] leading-snug text-black">
        {item.q}
      </span>

      <FiChevronDown
        className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#EB6664] transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-panel-${index}`}
          role="region"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <p className="px-4 sm:px-5 pb-4 text-xs sm:text-sm leading-relaxed text-black/80">
            {item.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ───────── PAGE ───────── */
const FAQPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? faqs : faqs.slice(0, INITIAL_COUNT);

  const toggleShowAll = () => {
    if (showAll && openIndex !== null && openIndex >= INITIAL_COUNT) {
      setOpenIndex(0);
    }
    setShowAll((s) => !s);
  };

  return (
    <>
      <Header />

      {/* NOTE: overflow-x-clip (not overflow-x-hidden) so position: sticky keeps working */}
      <main className="font-['Poppins',sans-serif] bg-[#FCF4F0] overflow-x-clip">
        {/* ═════════ HERO ═════════ */}
        <section className="relative w-full flex items-end overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]">
          <img
            src={HERO_IMG}
            alt="Student learning online with headphones"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center"
          />
          {/* dark overlay keeps the white text readable on the photo */}
          <div className="absolute inset-0 bg-black/50 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/40 sm:to-black/10" />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8 sm:pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#EB6664] shadow-sm">
                FAQ&apos;s
              </span>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Your Questions,{" "}
                <span className="text-[#F8D5D1]">Answered</span>
              </h1>

              <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-white/85">
                Quick, clear answers about how Esperly works, so you can get
                started with confidence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═════════ FAQ SECTION ═════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 pb-10 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-9 gap-y-8">
            {/*
              LEFT COLUMN
              - mobile: `contents` so intro / list / extras can be re-ordered in one column
              - desktop: a block that stretches to the full height of the FAQ list,
                which gives the sticky card room to slide along while you scroll
            */}
            <div className="contents lg:block lg:col-start-1 lg:row-start-1">
              {/* Intro (scrolls away normally) */}
              <Reveal className="order-1">
                <span className="inline-block rounded-lg bg-[#F8D5D1] px-3 py-1 text-sm sm:text-base md:text-lg font-medium text-[#EB6664]">
                  FAQ&apos;s
                </span>

                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black">
                  Frequently Asked{" "}
                  <span className="text-[#EB6664]">Questions</span>
                </h2>

                <p className="mt-3 md:mt-4 max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-black/85">
                  Everything you need to know about Esperly&apos;s classes,
                  tutors, schedules, and learning experience.
                </p>
              </Reveal>

              {/* Illustration + help card (sticky, follows the FAQ scroll) */}
              <div
                className="order-3 lg:mt-8 lg:top-28
                           lg:[@media(min-height:700px)]:sticky"
              >
                <Reveal>
                  <img
                    src={FAQ_IMG}
                    alt="Student thinking while studying on a laptop"
                    className="mx-auto lg:mx-0 w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[400px] h-auto object-contain"
                  />
                </Reveal>

                <Reveal delay={0.1} className="mt-6 lg:mt-6">
                  <div className="flex items-start gap-4 rounded-2xl border border-[#EB6664] bg-[#FCDDDA] p-4 sm:p-6 lg:max-w-[458px]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EB6664] text-white">
                      <FiBookOpen className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-black">
                        Still have questions?
                      </h3>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-black/80">
                        Our team is here to help you choose the right learning
                        path.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => navigate("/contact")}
                          className="rounded-lg bg-[#EB6664] px-4 py-2 text-sm sm:text-base font-semibold text-white
                                     transition hover:bg-[#d95755]"
                        >
                          Contact Us
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate("/contact")}
                          className="rounded-lg border border-[#EB6664] bg-transparent px-4 py-2 text-sm sm:text-base
                                     font-semibold text-[#EB6664] transition hover:bg-[#EB6664] hover:text-white"
                        >
                          Book A Free Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* ── Accordion ── */}
            <div className="order-2 lg:col-start-2 lg:row-start-1">
              <div className="space-y-2.5 sm:space-y-3">
                {visible.map((item, i) => (
                  <Reveal key={item.q} delay={(i % INITIAL_COUNT) * 0.03}>
                    <FAQItem
                      item={item}
                      index={i}
                      isOpen={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                  </Reveal>
                ))}
              </div>

              {faqs.length > INITIAL_COUNT && (
                <div className="mt-5 flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={toggleShowAll}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#EB6664]
                               transition hover:gap-3"
                  >
                    {showAll
                      ? "Show fewer questions"
                      : `Show ${faqs.length - INITIAL_COUNT} more questions`}
                    <FiChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        showAll ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FAQPage;