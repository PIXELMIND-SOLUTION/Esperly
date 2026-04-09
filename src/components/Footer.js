import React from "react";
import { motion } from "motion/react";

/* ───────── SOCIAL BUTTON (UPDATED) ───────── */
const SocialBtn = ({ icon, label, type }) => {
  const colors = {
    twitter: "hover:bg-black",
    linkedin: "hover:bg-[#0077B5]",
    youtube: "hover:bg-[#FF0000]",
    instagram: "hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500",
    discord: "hover:bg-[#5865F2]",
  };

  return (
    <motion.a
      href="#"
      aria-label={label}
      whileHover={{ y: -4, scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center w-10 h-10 rounded-full 
      bg-white/15 border border-white/25 text-white 
      transition-all duration-300 shadow-md ${colors[type]}`}
    >
      <span className="font-semibold text-sm">{icon}</span>
    </motion.a>
  );
};

/* ───────── LINK ───────── */
const NbLink = ({ children }) => (
  <motion.a
    href="#"
    whileHover={{ x: 3 }}
    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition font-medium"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
    {children}
  </motion.a>
);

/* ───────── MAIN FOOTER ───────── */
const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Courses: ["Full Stack Dev", "Data Science", "UI/UX", "AI & ML"],
    Company: ["About Us", "Careers", "Blog"],
    Support: ["Help Center", "Contact", "Refund Policy"],
    Legal: ["Privacy", "Terms", "Cookies"],
  };

  return (
    <>
      {/* Roboto Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />

      <footer className="bg-[#a6192e] text-white font-[Roboto]">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16 py-12">

          {/* ── TOP SECTION (4:8 Layout) ── */}
          <div className="flex flex-col md:flex-row gap-10">

            {/* LEFT - BRAND */}
            <div className="w-full md:w-4/12">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/logo4.png"
                  alt="logo"
                  className="w-10 h-10 object-contain"
                />
                <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                  Esperly
                </h2>
              </div>

              <p className="text-white/90 text-sm leading-relaxed mb-5 font-medium">
                Learn from industry experts with modern courses designed for the future.
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex gap-3 flex-wrap">
                <SocialBtn icon="𝕏" label="X" type="twitter" />
                <SocialBtn icon="in" label="LinkedIn" type="linkedin" />
                <SocialBtn icon="▶" label="YouTube" type="youtube" />
                <SocialBtn icon="📸" label="Instagram" type="instagram" />
              </div>
            </div>

            {/* RIGHT - LINKS */}
            {/* RIGHT - LINKS */}
<div className="w-full md:w-8/12">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    {Object.entries(links).map(([title, items]) => (
      <div key={title}>
        
        {/* TITLE */}
        <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-white">
          {title}
        </h4>

        {/* LINKS */}
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <NbLink key={item}>{item}</NbLink>
          ))}
        </div>

      </div>
    ))}

  </div>
</div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/30 my-8" />

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80 font-medium">

            <p>© {year} Esperly. All rights reserved.</p>

            <div className="flex gap-4 flex-wrap">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a key={item} href="#" className="hover:text-white transition font-medium">
                  {item}
                </a>
              ))}
            </div>

            <p className="font-semibold">Made with ❤️</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;