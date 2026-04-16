import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavImage from "../../components/NavImage";

/* SAME GRID BACKGROUND */
const UnevenGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <svg className="w-full h-full">
      <defs>
        <pattern id="unevenGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 25 Q50 30 100 25" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M0 75 Q50 70 100 75" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M25 0 Q30 50 25 100" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
          <path d="M75 0 Q70 50 75 100" stroke="#1C1209" strokeWidth="0.7" opacity="0.2" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#unevenGrid)" />
    </svg>
  </div>
);

/* FAQ DATA */
const faqs = [
  {
    q: "What services do you provide?",
    a: "We provide full-stack development, UI/UX design, and scalable cloud solutions tailored to your business."
  },
  {
    q: "How long does a project take?",
    a: "Depending on scope, most projects take between 2–8 weeks."
  },
  {
    q: "Do you offer support after delivery?",
    a: "Yes, we provide ongoing support, maintenance, and upgrades."
  },
  {
    q: "What technologies do you use?",
    a: "We use modern stacks like React, Node.js, MongoDB, and cloud platforms."
  }
];

/* FAQ ITEM */
const FAQItem = ({ item, i, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === i;

  return (
    <div
      className="border border-[#EB666420] bg-[#FCFAF5] rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : i)}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left"
      >
        <span className="font-mono text-[clamp(12px,1.2vw,14px)] text-[#1C1209]">
          {item.q}
        </span>

        <span className="text-[#EB6664] text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 sm:px-5 pb-4"
          >
            <p className="font-mono text-[clamp(11px,1.1vw,13px)] text-[#7A6E5A] leading-relaxed">
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
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#FBF7F2",
          padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
        }}
      >
        <UnevenGrid />

        <div className="max-w-[900px] mx-auto relative z-[2]">

          {/* HEADER */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-[clamp(40px,6vw,64px)]"
          >
            <h2 className="font-['Fraunces'] text-[clamp(28px,4.5vw,48px)] font-black text-[#1C1209]">
              Frequently Asked <span className="text-[#EB6664] italic">Questions</span>
            </h2>

            <p className="font-mono text-[clamp(11px,1.2vw,13px)] text-[#7A6E5A] mt-3">
              [ FAQ ] → Find answers to common queries
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