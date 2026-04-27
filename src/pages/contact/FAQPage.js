import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavImage from "../../components/NavImage";

/* FAQ DATA - Updated with Esperly content */
const faqs = [
  {
    q: "What is Esperly, and how does it work?",
    a: "Esperly is an online tuition platform offering one-on-one personalized classes for students from Class 1 to 12. Our experienced tutors provide interactive lessons designed to help each student learn effectively at their own pace."
  },
  {
    q: "Which classes and boards does Esperly support?",
    a: "We support all major boards, including CBSE, ICSE, State Boards, and international curricula, for students from Class 1 to 12."
  },
  {
    q: "Which subjects are available?",
    a: "We cover all major subjects, including Mathematics, Science, English, Social Studies, and more, based on your child's board and grade."
  },
  {
    q: "How is one-on-one tuition better than group classes?",
    a: "One-on-one tuition ensures personalized attention, faster doubt resolution, and lessons tailored to your child's pace and learning style."
  },
  {
    q: "Can Esperly help with exam preparation?",
    a: "Yes. We provide board exam preparation, competitive exam guidance, and regular assessments to track your child's progress."
  },
  {
    q: "How are tutors selected and trained?",
    a: "All tutors are experienced, qualified educators trained to deliver engaging, interactive online lessons."
  },
  {
    q: "Can I choose my child's tutor?",
    a: "Yes. Tutors are matched based on subject, grade, and learning preferences."
  },
  {
    q: "What if my child and the tutor are not a good fit?",
    a: "We offer tutor reassignment to ensure your child receives the most suitable guidance."
  },
  {
    q: "Are tutors available for extra doubt-clearing sessions?",
    a: "Yes. Tutors can provide additional sessions if scheduled in advance."
  },
  {
    q: "How do tutors personalize the learning experience?",
    a: "Tutors assess your child's strengths and areas for improvement and design lessons to build understanding, confidence, and curiosity."
  },
  {
    q: "How long is each session, and how often can my child attend?",
    a: "Sessions typically last 30–60 minutes, with flexible frequency based on your child's needs."
  },
  {
    q: "Can classes be scheduled according to my child's convenience?",
    a: "Yes. Esperly offers flexible scheduling, including weekdays and weekends."
  },
  {
    q: "Can I reschedule or cancel a class?",
    a: "Yes. Classes can be rescheduled with prior notice."
  },
  {
    q: "Is a trial class available?",
    a: "Yes. Every student can book a trial class before enrolling in a package."
  },
  {
    q: "Can international students attend classes?",
    a: "Yes. Esperly is accessible globally, allowing students from any location or time zone to join."
  },
  {
    q: "What devices or software are needed?",
    a: "You can attend classes on a computer, tablet, or smartphone with a stable internet connection. No extra software is required."
  },
  {
    q: "Is the platform safe for children?",
    a: "Yes. Our platform is secure, private, and child-friendly."
  },
  {
    q: "How can I track my child's progress?",
    a: "Parents receive regular updates, performance reports, and feedback to monitor learning outcomes."
  },
  {
    q: "Do students get assignments or practice material?",
    a: "Yes. Tutors provide worksheets, practice questions, and notes to reinforce learning."
  },
  {
    q: "How can I communicate with the tutor outside class?",
    a: "Tutors are available for clarifications or guidance via the platform between sessions."
  }
];

/* FAQ ITEM */
const FAQItem = ({ item, i, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === i;

  return (
    <div
      className="border border-[#EB6664]/20 bg-[#F9F5F0] rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : i)}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left"
      >
        <span className="text-[clamp(14px,1.2vw,16px)] text-[#1C1209] font-normal">
          {item.q}
        </span>

        <span className="text-[#EB6664] text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="px-4 sm:px-5 pb-4"
          >
            <p className="text-[clamp(13px,1.1vw,14px)] text-[#5a5a5a] leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* MAIN PAGE */
const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <>
      <Header />
      <NavImage />

      <section
        className="relative overflow-hidden bg-[transparent]"
        style={{
          padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
        }}
      >
        <div className="max-w-[900px] mx-auto relative z-[2]">

          {/* HEADER */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-[clamp(40px,6vw,64px)]"
          >
            <h2 className="text-[clamp(28px,4.5vw,48px)] font-bold text-[#1C1209]">
              Frequently Asked <span className="text-[#EB6664]">Questions</span>
            </h2>

            <p className="text-[clamp(13px,1.2vw,14px)] text-[#7A6E5A] mt-3 font-normal">
              Everything you need to know about Esperly
            </p>
          </motion.div>

          {/* FAQ LIST */}
          <div className="flex flex-col gap-4">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                i={i}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQPage;