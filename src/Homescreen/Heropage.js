import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import BookSessionModal from "../modals/BookSession";

const HeroPage = () => {
  const { scrollYProgress } = useScroll();
  const [openModal, setOpenModal] = useState(false);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.9, 0.8]);
  const decor1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const decor2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const decor3Y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative overflow-hidden min-h-svh flex items-center justify-center font-sans">

      {/* Background */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: 'url("/ban.png")' }} />
      <div className="absolute inset-0 z-0 bg-black/55" />

      {/* Decor — top-left circles */}
      <motion.div style={{ y: decor1Y }} className="absolute top-0 left-0 pointer-events-none z-[1]">
        <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
          <circle cx="0" cy="0" r="290" stroke="#A6192E" strokeWidth="1" strokeDasharray="6 10" opacity="0.25" />
          <circle cx="0" cy="0" r="205" stroke="#A6192E" strokeWidth="0.8" opacity="0.18" />
          <circle cx="62" cy="62" r="11" fill="#A6192E" opacity="0.20" />
          <circle cx="125" cy="32" r="5" fill="#A6192E" opacity="0.22" />
          <circle cx="32" cy="138" r="7" fill="#8B1527" opacity="0.16" />
        </svg>
      </motion.div>

      {/* Decor — bottom-right circles */}
      <motion.div style={{ y: decor2Y }} className="absolute bottom-0 right-0 pointer-events-none z-[1]">
        <svg width="400" height="340" viewBox="0 0 400 340" fill="none">
          <circle cx="400" cy="340" r="310" stroke="#A6192E" strokeWidth="1" strokeDasharray="6 10" opacity="0.22" />
          <circle cx="400" cy="340" r="220" stroke="#A6192E" strokeWidth="0.8" opacity="0.16" />
          <circle cx="325" cy="272" r="9" fill="#A6192E" opacity="0.18" />
          <circle cx="368" cy="185" r="5" fill="#8B1527" opacity="0.20" />
          <circle cx="258" cy="312" r="6" fill="#A6192E" opacity="0.16" />
        </svg>
      </motion.div>

      {/* Decor — dot grid top-right */}
      <motion.div style={{ y: decor1Y }} className="absolute top-10 right-10 pointer-events-none z-[1] hidden md:block">
        <svg width="165" height="165" viewBox="0 0 165 165" fill="none">
          {[0, 1, 2, 3, 4].map((col) =>
            [0, 1, 2, 3, 4].map((row) => (
              <circle key={`${col}-${row}`} cx={col * 30 + 15} cy={row * 30 + 15} r="2.8" fill="#A6192E" opacity={0.14 + (col + row) * 0.018} />
            ))
          )}
        </svg>
      </motion.div>

      {/* Decor — dot grid bottom-left */}
      <motion.div style={{ y: decor2Y }} className="absolute bottom-10 left-10 pointer-events-none z-[1] hidden md:block">
        <svg width="135" height="135" viewBox="0 0 135 135" fill="none">
          {[0, 1, 2, 3].map((col) =>
            [0, 1, 2, 3].map((row) => (
              <circle key={`${col}-${row}`} cx={col * 32 + 16} cy={row * 32 + 16} r="2.8" fill="#A6192E" opacity={0.16 + (col + row) * 0.022} />
            ))
          )}
        </svg>
      </motion.div>

      {/* Decor — vertical dashed left */}
      <motion.div style={{ y: decor3Y }} className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-[1] hidden lg:block">
        <svg width="2" height="200" viewBox="0 0 2 200">
          <line x1="1" y1="0" x2="1" y2="200" stroke="#A6192E" strokeWidth="1.5" strokeDasharray="4 9" opacity="0.30" />
        </svg>
      </motion.div>

      {/* Decor — vertical dashed right */}
      <motion.div style={{ y: decor3Y }} className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-[1] hidden lg:block">
        <svg width="2" height="200" viewBox="0 0 2 200">
          <line x1="1" y1="0" x2="1" y2="200" stroke="#A6192E" strokeWidth="1.5" strokeDasharray="4 9" opacity="0.30" />
        </svg>
      </motion.div>

      {/* Decor — horizontal dashed top */}
      <motion.div style={{ y: decor1Y }} className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-[1] hidden md:block">
        <svg width="200" height="2" viewBox="0 0 200 2">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#A6192E" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
        </svg>
      </motion.div>

      {/* Decor — horizontal dashed bottom */}
      <motion.div style={{ y: decor2Y }} className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-[1] hidden md:block">
        <svg width="200" height="2" viewBox="0 0 200 2">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#A6192E" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 px-4 sm:px-10 md:px-16"
        >
          {/* Title */}
          <motion.h1
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white font-bold leading-tight tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] text-2xl sm:text-3xl md:text-4xl lg:text-[2.55rem]"
          >
            Every Student is Unique, and so is their Learning Journey
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.28 }}
            className="h-[3px] w-[72px] rounded-full mx-auto my-5 sm:my-6"
            style={{ background: "linear-gradient(90deg, transparent, #EB6664, transparent)" }}
          />

          {/* Description with quotes */}
          <div className="relative max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto px-6 sm:px-8">
            <span className="absolute -top-5 -left-1 sm:-top-6 sm:-left-4 text-white/80 text-2xl sm:text-3xl md:text-4xl font-serif leading-none">"</span>
            <span className="absolute -bottom-6 -right-1 sm:-bottom-8 sm:-right-4 text-white/80 text-2xl sm:text-3xl md:text-4xl font-serif leading-none">"</span>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-white/85 leading-[1.88] font-normal mx-auto [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] text-sm sm:text-base md:text-[1.06rem]"
            >
              Every Student is Unique, and so is their Learning Journey. That&apos;s the idea that sparked
              Esperly. We want to create a space where students could learn at their own pace, on their
              own schedule, and with complete support — no matter where they are in the world.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            className="mt-10 sm:mt-9 flex justify-center flex-wrap gap-4"
          >
            <button
              className="bg-[#EB6664] text-white font-semibold rounded-full px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base tracking-wide whitespace-nowrap cursor-pointer border-none transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                boxShadow: "0 6px 28px rgba(166,25,46,0.50), 0 1px 0 rgba(255,255,255,0.18) inset",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget).style.boxShadow =
                  "0 10px 36px rgba(166,25,46,0.65), 0 1px 0 rgba(255,255,255,0.18) inset";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.boxShadow =
                  "0 6px 28px rgba(166,25,46,0.50), 0 1px 0 rgba(255,255,255,0.18) inset";
              }}
              onClick={() => setOpenModal(true)}
            >
              Begin with a Free Session
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Modal */}
      {openModal && (
        <BookSessionModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default HeroPage;