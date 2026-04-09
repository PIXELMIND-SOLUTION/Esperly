import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FiMenu, FiX, FiChevronDown, FiChevronRight
} from "react-icons/fi";
import EnrollModal from "../modals/EnrollModal";

/* ─── Data ──────────────────────────────────────────────────── */
const tuitionsItems = [
  {
    name: "Primary School", icon: "📚", desc: "Grades 1–5", path: "/tuitions/primary",
    children: [
      { name: "Mathematics", icon: "📐", path: "/tuitions/primary/math" },
      { name: "English",     icon: "📖", path: "/tuitions/primary/english" },
      { name: "Science",     icon: "🔬", path: "/tuitions/primary/science" },
      { name: "EVS",         icon: "🌿", path: "/tuitions/primary/evs" },
    ],
  },
  {
    name: "Middle School", icon: "🏫", desc: "Grades 6–8", path: "/tuitions/middle",
    children: [
      { name: "Algebra",          icon: "🔢", path: "/tuitions/middle/algebra" },
      { name: "Physics Basics",   icon: "⚡", path: "/tuitions/middle/physics" },
      { name: "Chemistry Intro",  icon: "⚗️", path: "/tuitions/middle/chemistry" },
      { name: "History",          icon: "🏛️", path: "/tuitions/middle/history" },
    ],
  },
  {
    name: "High School", icon: "🎓", desc: "Grades 9–12", path: "/tuitions/highschool",
    children: [
      { name: "Advanced Math", icon: "📊", path: "/tuitions/highschool/math" },
      { name: "Physics",       icon: "🔭", path: "/tuitions/highschool/physics" },
      { name: "Chemistry",     icon: "⚗️", path: "/tuitions/highschool/chemistry" },
      { name: "Biology",       icon: "🧬", path: "/tuitions/highschool/biology" },
    ],
  },
  { name: "JEE Preparation", icon: "🔭", desc: "Engineering entrance", path: "/tuitions/jee"    },
  { name: "NEET Preparation", icon: "🩺", desc: "Medical entrance",    path: "/tuitions/neet"   },
  { name: "Board Exams",      icon: "📝", desc: "CBSE / ICSE / State", path: "/tuitions/boards" },
];

const learningBoostersItems = [
  { name: "Flash Cards",        icon: "🃏", desc: "Quick memory revision",      path: "/boosters/flashcards" },
  {
    name: "Practice Tests", icon: "✅", desc: "Mock & chapter tests", path: "/boosters/tests",
    children: [
      { name: "Chapter Tests",    icon: "📄", path: "/boosters/tests/chapter" },
      { name: "Mock Exams",       icon: "📋", path: "/boosters/tests/mock" },
      { name: "Previous Papers",  icon: "🗂️", path: "/boosters/tests/previous" },
    ],
  },
  { name: "Mind Maps",          icon: "🗺️", desc: "Visual concept maps",        path: "/boosters/mindmaps" },
  { name: "Live Doubt Sessions",icon: "🎙️", desc: "Ask experts in real time",   path: "/boosters/doubt"    },
  { name: "Video Summaries",    icon: "🎬", desc: "Bite-sized video lessons",    path: "/boosters/videos"   },
  {
    name: "AI Tutoring", icon: "🤖", desc: "Personalized AI help", path: "/boosters/ai",
    children: [
      { name: "Math AI Tutor",     icon: "📐", path: "/boosters/ai/math"    },
      { name: "Science AI Tutor",  icon: "🔬", path: "/boosters/ai/science" },
      { name: "Writing Assistant", icon: "✍️", path: "/boosters/ai/writing" },
    ],
  },
];

const languageTracksItems = [
  { name: "English Mastery",  icon: "🇬🇧", desc: "Grammar, writing & speaking", path: "/language/english"  },
  { name: "Hindi Proficiency",icon: "🇮🇳", desc: "Literature & language",        path: "/language/hindi"    },
  { name: "French",           icon: "🇫🇷", desc: "Beginner to advanced",          path: "/language/french"   },
  { name: "German",           icon: "🇩🇪", desc: "Beginner to advanced",          path: "/language/german"   },
  { name: "Spanish",          icon: "🇪🇸", desc: "Conversational & academic",     path: "/language/spanish"  },
  { name: "Sanskrit",         icon: "📜", desc: "Classical language",             path: "/language/sanskrit" },
];

const moreItems = [
  { name: "About Us", icon: "🏢", path: "/aboutus" },
  { name: "FAQs",     icon: "❓", path: "/faqs"     },
  { name: "Blog",     icon: "✍️", path: "/blog"     },
  { name: "Careers",  icon: "💼", path: "/careers"  },
  { name: "Press",    icon: "📰", path: "/press"    },
  { name: "Contact",  icon: "📬", path: "/contact"  },
];

/* ─── Animation variants ────────────────────────────────────── */
const notebookVariants = {
  hidden:  { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.03, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.16 } },
};

const rowVariants = {
  hidden:  { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

const subMenuVariants = {
  hidden:  { opacity: 0, x: -8, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, x: -6, scale: 0.97, transition: { duration: 0.14 } },
};

/* ─── NotebookRow ───────────────────────────────────────────── */
const NotebookRow = ({ item, onNavigate, onClose, index }) => {
  const [subOpen, setSubOpen] = useState(false);
  const subTimeoutRef = useRef();
  const hasChildren = item.children?.length > 0;

  const showSub = () => { clearTimeout(subTimeoutRef.current); setSubOpen(true); };
  const hideSub = () => { subTimeoutRef.current = setTimeout(() => setSubOpen(false), 100); };

  return (
    <motion.div
      variants={rowVariants}
      className="relative"
      onMouseEnter={hasChildren ? showSub : undefined}
      onMouseLeave={hasChildren ? hideSub : undefined}
    >
      {index > 0 && <div className="mx-3 h-px bg-[#A6192E]/8" />}

      <div
        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-150 group hover:bg-[#A6192E]/6"
        onClick={() => { if (!hasChildren) { onNavigate(item.path); onClose(); } }}
      >
        <div className="w-0.5 h-6 rounded-full bg-[#A6192E]/20 group-hover:bg-[#A6192E]/60 transition-colors duration-150 flex-shrink-0" />
        <span className="text-base leading-none w-5 text-center flex-shrink-0">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-gray-800 group-hover:text-[#A6192E] transition-colors leading-tight truncate">{item.name}</p>
          {item.desc && <p className="text-[11px] text-gray-400 mt-0.5 leading-tight truncate">{item.desc}</p>}
        </div>
        {hasChildren && <FiChevronRight size={12} className="text-[#A6192E]/40 group-hover:text-[#A6192E] transition-colors flex-shrink-0" />}
      </div>

      <AnimatePresence>
        {hasChildren && subOpen && (
          <motion.div
            variants={subMenuVariants}
            initial="hidden" animate="visible" exit="exit"
            className="absolute left-full top-0 z-50 w-52"
            style={{ marginLeft: "4px" }}
            onMouseEnter={showSub}
            onMouseLeave={hideSub}
          >
            <div className="bg-white rounded-2xl border border-[#A6192E]/15 shadow-xl shadow-[#A6192E]/12 py-2 overflow-hidden">
              <div className="px-4 pb-1.5 pt-1">
                <p className="text-[10px] font-semibold text-[#A6192E]/50 uppercase tracking-widest">{item.name}</p>
                <div className="mt-1 h-px bg-[#A6192E]/15" />
              </div>
              {item.children.map((child, ci) => (
                <div key={ci}>
                  {ci > 0 && <div className="mx-3 h-px bg-[#A6192E]/8" />}
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-[#A6192E]/6 transition-colors group"
                    onClick={() => { onNavigate(child.path); onClose(); }}
                  >
                    <div className="w-0.5 h-5 rounded-full bg-[#A6192E]/15 group-hover:bg-[#A6192E]/50 transition-colors flex-shrink-0" />
                    <span className="text-sm leading-none">{child.icon}</span>
                    <p className="text-[13px] text-gray-700 group-hover:text-[#A6192E] transition-colors leading-tight">{child.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── NotebookDropdown ──────────────────────────────────────── */
const NotebookDropdown = ({ items, onNavigate, onClose, label }) => (
  <motion.div
    variants={notebookVariants}
    initial="hidden" animate="visible" exit="exit"
    className="absolute left-0 z-50 w-64 origin-top-left"
    style={{ top: "calc(100% + 8px)" }}
  >
    <div className="bg-white rounded-2xl border border-[#A6192E]/15 shadow-xl shadow-[#A6192E]/12 overflow-hidden">
      <div className="px-4 py-2.5 bg-[#A6192E]/5 border-b border-[#A6192E]/12">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full border border-[#A6192E]/30 bg-white" />
            ))}
          </div>
          <p className="text-[11px] text-[#A6192E]/70 uppercase tracking-[0.12em]">{label}</p>
        </div>
      </div>
      <div className="py-1.5">
        {items.map((item, i) => (
          <NotebookRow key={i} item={item} onNavigate={onNavigate} onClose={onClose} index={i} />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── NavDropdown ───────────────────────────────────────────── */
const NavDropdown = ({ label, items, navigate }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const timeoutRef = useRef();

  const show = () => { clearTimeout(timeoutRef.current); setOpen(true); };
  const hide = () => { timeoutRef.current = setTimeout(() => setOpen(false), 130); };

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        className={`relative px-3 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center gap-1.5
          ${open ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/15"}`}
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <FiChevronDown size={13} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <NotebookDropdown items={items} onNavigate={navigate} onClose={() => setOpen(false)} label={label} />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Navbar ───────────────────────────────────────────── */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);

  const navigate = useNavigate();

  /* Lock body scroll when overlays are open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const toggleMobile = (section) => { 
    setMobileExpanded(p => p === section ? null : section); 
    setMobileSubExpanded(null); 
  };
  
  const toggleMobileSub = (e, key) => { 
    e.stopPropagation(); 
    setMobileSubExpanded(p => p === key ? null : key); 
  };

  /* ─── Mobile Accordion ──────────────────────────────────── */
  const MobileAccordion = ({ label, items, section }) => (
    <div>
      <div
        className="flex items-center justify-between px-4 py-3 rounded-lg font-medium cursor-pointer text-gray-700 hover:bg-[#A6192E]/10 hover:text-[#A6192E] transition-all duration-200"
        onClick={() => toggleMobile(section)}
      >
        <span className="text-sm">{label}</span>
        <motion.span animate={{ rotate: mobileExpanded === section ? 180 : 0 }} transition={{ duration: 0.22 }} className="text-[#A6192E]">
          <FiChevronDown size={14} />
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {mobileExpanded === section && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden ml-2 pl-3 border-l-2 border-[#A6192E]/20 mb-1"
          >
            {items.map((item, i) => (
              <div key={i}>
                <div
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#A6192E]/8 transition-colors"
                  onClick={() => { if (!item.children) { navigate(item.path || "#"); closeMobile(); } }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{item.icon}</span>
                    <div>
                      <p className="text-[13px] text-gray-700 leading-tight">{item.name}</p>
                      {item.desc && <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>}
                    </div>
                  </div>
                  {item.children && (
                    <motion.span
                      animate={{ rotate: mobileSubExpanded === `${section}-${i}` ? 90 : 0 }}
                      transition={{ duration: 0.18 }}
                      onClick={(e) => toggleMobileSub(e, `${section}-${i}`)}
                      className="text-[#A6192E]/50 p-1"
                    >
                      <FiChevronRight size={13} />
                    </motion.span>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {item.children && mobileSubExpanded === `${section}-${i}` && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden ml-4 pl-3 border-l border-[#A6192E]/20"
                    >
                      {item.children.map((child, ci) => (
                        <div
                          key={ci}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#A6192E]/8 transition-colors"
                          onClick={() => { navigate(child.path); closeMobile(); }}
                        >
                          <span className="text-sm">{child.icon}</span>
                          <p className="text-[12px] text-gray-600">{child.name}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 bg-[#A6192E] transition-shadow duration-300"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] sm:h-[68px] flex items-center justify-between gap-4">

          {/* Logo - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg sm:rounded-[10px] flex items-center justify-center overflow-hidden shadow-lg shadow-black/20">
              <img src="/logo4.png" alt="Esperly Logo" className="object-contain" />
            </div>
            <span
              className="text-xl sm:text-2xl text-white tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Esperly
            </span>
          </motion.div>

          {/* Desktop Navigation - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex items-center gap-2"
          >
            <NavLink to="/">
              {({ isActive }) => (
                <div className={`relative px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all duration-200
                  ${isActive
                    ? "text-white bg-white/20"
                    : "text-white/90 hover:text-white hover:bg-white/15"
                  }`}
                >
                  HUB
                </div>
              )}
            </NavLink>

            <NavDropdown label="TUITIONS" items={tuitionsItems} navigate={navigate} />
            <NavDropdown label="LEARNING BOOSTERS" items={learningBoostersItems} navigate={navigate} />
            <NavDropdown label="LANGUAGE TRACKS" items={languageTracksItems} navigate={navigate} />
            <NavDropdown label="MORE" items={moreItems} navigate={navigate} />

            {/* Send Enquiry Button */}
            <button
              onClick={() => setEnrollOpen(true)}
              className="ml-2 relative overflow-hidden px-5 py-2 rounded-full font-semibold text-sm text-[#A6192E] bg-white shadow-lg shadow-black/20 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-3/5 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
            >
              SEND ENQUIRY
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all duration-200"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* ── Mobile Sidebar ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl overflow-y-auto flex flex-col"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {/* Drawer header */}
              <div className="sticky top-0 bg-white z-10 px-5 pt-5 pb-3 border-b border-[#A6192E]/10">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#A6192E] flex items-center justify-center overflow-hidden">
                      <img src="/logo1.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl text-[#A6192E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      Esperly
                    </span>
                  </div>
                  <button
                    onClick={closeMobile}
                    aria-label="Close menu"
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Nav items */}
              <div className="px-4 py-3 flex flex-col gap-0.5 flex-1">
                <NavLink to="/" onClick={closeMobile}>
                  {({ isActive }) => (
                    <div className={`flex items-center font-semibold px-4 py-3 rounded-lg text-sm cursor-pointer transition-all duration-200
                      ${isActive ? "bg-[#A6192E]/10 text-[#A6192E]" : "text-gray-700 hover:bg-[#A6192E]/10 hover:text-[#A6192E]"}`}>
                      Hub
                    </div>
                  )}
                </NavLink>

                <MobileAccordion label="Tuitions" items={tuitionsItems} section="tuitions" />
                <MobileAccordion label="Learning Boosters" items={learningBoostersItems} section="boosters" />
                <MobileAccordion label="Language Tracks" items={languageTracksItems} section="language" />
                <MobileAccordion label="More" items={moreItems} section="more" />
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#A6192E]/30 to-transparent mx-5 my-2" />

              {/* Send Enquiry Button in Mobile */}
              <div className="px-5 pb-8">
                <button
                  onClick={() => { setEnrollOpen(true); closeMobile(); }}
                  className="w-full py-3 rounded-xl bg-[#A6192E] text-white font-semibold text-sm shadow-lg shadow-[#A6192E]/30 hover:bg-[#8B1527] transition-colors"
                >
                  Send Enquiry
                </button>
                <p className="mt-4 text-[11px] text-gray-400 text-center tracking-widest">LEARN · GROW · SUCCEED</p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <EnrollModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </>
  );
};

export default Navbar;