import React from "react";
import { motion } from "framer-motion";
import { FiPhoneCall } from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HERO_IMG from "../../assets/About/aboutus.png";
import SUPPORT_IMG from "../../assets/About/support.png";

/* ───────── DATA ───────── */
const paths = [
  {
    title: "Expert Tutors",
    desc: "Learn from experienced educators dedicated to helping students achieve their academic goals.",
  },
  {
    title: "Personalized Learning",
    desc: "Tailored learning approaches designed to match every student's pace, strengths.",
  },
  {
    title: "Interactive Classes",
    desc: "Engaging live sessions that make learning enjoyable, effective, and easy to understand.",
  },
  {
    title: "Progress Tracking",
    desc: "Regular assessments and performance insights to support continuous improvement and success.",
  },
];

/* ───────── FADE-IN WRAPPER ───────── */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8% 0px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const AboutUs = () => {
  return (
    <>
      <Header />

      <main className="font-['Poppins',sans-serif] bg-[#FCF4F0] overflow-x-hidden">
        {/* ═════════ HERO ═════════ */}
        <section className="relative w-full flex items-center overflow-hidden  h-[90vh]">
          <img
            src={HERO_IMG}
            alt="Student learning online with headphones"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center"
          />
          {/* dark overlay keeps the white text readable on the photo */}
          <div className="absolute inset-0 bg-black/50 sm:bg-gradient-to-r sm:from-black/65 sm:via-black/35 sm:to-black/5" />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl text-left"
            >
              <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#EB6664] shadow-sm">
                About Esperly
              </span>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Empowering Every Student to Learn Better
              </h1>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-lg">
                Esperly provides personalized learning support to help students
                build confidence, overcome challenges, and achieve their
                academic goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═════════ CONTACT PILL ═════════ */}
        <div className="flex justify-center pt-6 md:pt-8">
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-[#F8D5D1] text-[#EB6664]
                       px-4 py-2 text-sm md:text-base font-medium shadow-sm
                       transition hover:bg-[#F5C4BF]"
          >
            <FiPhoneCall className="w-4 h-4 md:w-5 md:h-5" />
            Contact
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ═════════ OUR MISSION ═════════ */}
          <section className="pt-6 md:pt-8">
            <Reveal>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#EB6664]">
                Our Mission
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl leading-tight font-bold text-black">
                Making Quality{" "}
                <span className="text-[#EB6664]">
                  Learning Accessible for Every Student
                </span>
              </h2>
            </Reveal>

            <div className="mt-5 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
              <Reveal delay={0.1} className="max-w-[780px]">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-black/85">
                  <span className="block mb-1 font-semibold text-black">
                    Empowering Students to Learn, Grow &amp; Succeed
                  </span>
                  Esperly is an online learning platform that provides
                  personalized tuition for students from Class 1 to 12. With
                  expert tutors, interactive classes, and individual attention,
                  we help students build confidence, strengthen their knowledge,
                  and achieve academic success.
                </p>
              </Reveal>

              <Reveal
                delay={0.2}
                className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[270px] mx-auto lg:mx-0 shrink-0"
              >
                <img
                  src={SUPPORT_IMG}
                  alt="Tutor helping a student - Here to Support You"
                  className="w-full h-auto object-contain"
                />
              </Reveal>
            </div>
          </section>

          {/* ═════════ WHY ESPERLY ═════════ */}
          <section className="pt-10 md:pt-14">
            <Reveal>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#EB6664]">
                Why Esperly
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl leading-tight font-bold text-black">
                Learning Paths for{" "}
                <span className="text-[#EB6664]">Every Stage of Education</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base md:text-lg leading-relaxed text-black/85 max-w-[900px]">
                From foundational learning to advanced academics, our programs
                are designed to support students at every stage of their
                educational journey.
              </p>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {paths.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08} className="h-full">
                  <div
                    className="h-full rounded-2xl border border-[#EB6664] bg-[#F8D5D1]
                               px-4 py-5 transition-all duration-300
                               hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="text-center text-base md:text-lg font-semibold text-[#EB6664] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-black/85">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ═════════ CTA BOX ═════════ */}
          <Reveal className="mt-10 md:mt-12">
            <div
              className="rounded-2xl border border-[#EB6664] bg-[#F7CAC6]
                         px-4 sm:px-6 py-6 md:py-8 text-center"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#EB6664]">
                Ready to Start Learning?
              </h3>
              <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-black/85 max-w-2xl mx-auto">
                Join Esperly and discover a smarter, more engaging way to learn,
                grow, and succeed.
              </p>
            </div>
          </Reveal>

          {/* ═════════ BUTTONS ═════════ */}
          <Reveal className="mt-8 md:mt-10 pb-10 md:pb-14">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
              <button
                className="rounded-lg bg-[#EB6664] text-white shadow-sm
                           px-7 py-2.5 sm:py-3 text-sm md:text-base font-semibold
                           transition hover:bg-[#d95755]"
              >
                Get Started
              </button>
              <button
                className="rounded-lg border border-[#EB6664] bg-[#F8D5D1]
                           text-[#EB6664] px-6 py-2.5 sm:py-3 text-sm md:text-base font-semibold
                           transition hover:bg-[#F5C4BF]"
              >
                Book a Free Demo
              </button>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AboutUs;