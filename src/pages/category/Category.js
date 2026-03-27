import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CATEGORIES } from "../../data/categories";
import Navbar from "../../components/Navbar";

const CategoryCard = React.memo(({ cat, index, onClick }) => {
  const [hov, setHov] = React.useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onClick={() => onClick(cat)}
      className="cursor-pointer"
      role="button"
      aria-label={`Explore ${cat.title}`}
    >
      <div
        className="relative rounded-lg overflow-hidden h-[clamp(190px,20vw,265px)] transition-all duration-300"
        style={{
          border: `1.5px solid rgba(212,204,186,${hov ? 0.9 : 0.5})`,
          boxShadow: hov
            ? "0 18px 42px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.1)"
            : "0 3px 14px rgba(0,0,0,0.07)",
        }}
      >
        <motion.img
          src={cat.img}
          alt={cat.title}
          loading="lazy"
          animate={{ scale: hov ? 1.1 : 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full h-full object-cover block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <motion.div
          animate={{ opacity: hov ? 0.18 : 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: cat.accent }}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          {cat.badge && (
            <span
              className="font-dm-mono text-[9px] font-medium text-white uppercase tracking-wider px-2 py-1 rounded-sm"
              style={{ background: cat.accent, boxShadow: `0 2px 6px ${cat.accent}66` }}
            >
              {cat.badge}
            </span>
          )}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl">{cat.icon}</span>
            <h3 className="font-fraunces text-sm sm:text-base lg:text-lg font-extrabold text-white tracking-tight">
              {cat.title}
            </h3>
          </div>
          <p className="font-lora italic text-[10px] sm:text-[11px] text-white/70 mb-2 leading-tight">
            {cat.tagline}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-dm-mono text-[8px] sm:text-[9px] text-white/50 tracking-wide">
              {cat.count}
            </span>
            <motion.div
              animate={{
                background: hov ? cat.accent : "rgba(255,255,255,0.14)",
                x: hov ? 2 : 0,
              }}
              className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-xs text-white backdrop-blur-sm transition-colors duration-300"
            >
              →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default function Category({ onSelectCategory }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        className="relative bg-cream py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden min-h-screen"
      >
        {/* Ruled lines background */}
        <div className="ruled-lines">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="ruled-line"
              style={{ top: i * 32 }}
            />
          ))}
          <div className="ruled-vertical" />
        </div>

        {/* Ambient dots */}
        <svg
          className="absolute left-[2.5%] bottom-[8%] opacity-5 w-[90px] h-[90px]"
          viewBox="0 0 90 90"
          aria-hidden
        >
          {Array.from({ length: 5 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={c * 16 + 8}
                cy={r * 16 + 8}
                r="1.4"
                fill="#A6192E"
              />
            ))
          )}
        </svg>
        <svg
          className="absolute right-[2.5%] top-[5%] opacity-4 w-[72px] h-[72px]"
          viewBox="0 0 72 72"
          aria-hidden
        >
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={c * 16 + 8}
                cy={r * 16 + 8}
                r="1.4"
                fill="#3B6FA0"
              />
            ))
          )}
        </svg>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-0.5 bg-rust" />
              <span className="font-dm-mono text-[10px] sm:text-[11px] text-rust tracking-[0.2em] uppercase">
                Discover · Learn · Grow
              </span>
              <div className="w-5 h-0.5 bg-rust" />
            </div>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-charcoal tracking-tighter">
                  All{" "}
                  <span className="text-rust italic relative">
                    Categories
                    <svg
                      viewBox="0 0 200 10"
                      className="w-full h-2.5 absolute -bottom-1 left-0"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 7C30 3 60 9 100 5.5C140 2 170 8 198 5"
                        stroke="#A6192E"
                        strokeWidth="2.8"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>
                <p className="font-lora italic text-sm sm:text-base text-stone mt-2">
                  Click any card to explore its topics
                </p>
              </div>
              <div className="font-dm-mono text-[10px] sm:text-xs text-stone border border-stone/30 rounded px-3 py-1.5 bg-white/50 whitespace-nowrap">
                {CATEGORIES.length} categories ·{" "}
                {CATEGORIES.reduce((a, c) => a + c.subcategories.length, 0)} topics
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          {inView && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 sm:gap-4 lg:gap-5">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} onClick={onSelectCategory} />
              ))}
            </div>
          )}

          {/* Footer rule */}
          <div className="flex items-center gap-4 mt-12 sm:mt-16">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone/30 to-transparent" />
            <span className="font-dm-mono text-[9px] text-stone tracking-[0.14em] uppercase">
              End of catalogue
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-stone/30 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}