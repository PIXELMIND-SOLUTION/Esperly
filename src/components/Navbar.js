import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FiMenu, FiX, FiArrowRight, FiChevronDown, FiSearch,
  FiTrendingUp, FiBookOpen, FiUsers, FiStar, FiChevronRight
} from "react-icons/fi";
import EnrollModal from "../modals/EnrollModal";
import LoginModal from "../modals/LoginModal";

/* ─── Data ──────────────────────────────────────────────────── */
const popularCourses = [
  { id: "sub1", name: "Fundamentals", tag: "Beginner", icon: "🌱", students: 8400 },
  { id: "sub2", name: "Core Concepts", tag: "Beginner", icon: "🧱", students: 6100 },
  { id: "sub3", name: "Problem Solving", tag: "Intermediate", icon: "🧩", students: 12300 },
  { id: "sub4", name: "Applied Practice", tag: "Intermediate", icon: "🔧", students: 9800 },
  { id: "sub5", name: "Advanced Theory", tag: "Advanced", icon: "🚀", students: 4500 },
  { id: "sub6", name: "Exam Mastery", tag: "Advanced", icon: "🏆", students: 15200 },
  { id: "sub7", name: "Quick Revision", tag: "Beginner", icon: "⚡", students: 22000 },
  { id: "sub8", name: "Project Work", tag: "Advanced", icon: "🗂️", students: 3300 },
];

const categories = [
  { id: "math", name: "Math", icon: "📐", count: "42 topics" },
  { id: "science", name: "Science", icon: "🔬", count: "38 topics" },
  { id: "english", name: "English", icon: "📖", count: "29 topics" },
  { id: "history", name: "History", icon: "🏛️", count: "33 topics" },
  { id: "coding", name: "Computer Science", icon: "💻", count: "51 topics" },
  { id: "physics", name: "Physics", icon: "⚡", count: "27 topics" },
  { id: "chemistry", name: "Chemistry", icon: "⚗️", count: "24 topics" },
  { id: "economics", name: "Economics", icon: "📊", count: "19 topics" },
];

const tuitionsItems = [
  {
    name: "Primary School", icon: "📚", desc: "Grades 1–5", path: "/tuitions/primary",
    children: [
      { name: "Mathematics", icon: "📐", path: "/tuitions/primary/math" },
      { name: "English", icon: "📖", path: "/tuitions/primary/english" },
      { name: "Science", icon: "🔬", path: "/tuitions/primary/science" },
      { name: "EVS", icon: "🌿", path: "/tuitions/primary/evs" },
    ]
  },
  {
    name: "Middle School", icon: "🏫", desc: "Grades 6–8", path: "/tuitions/middle",
    children: [
      { name: "Algebra", icon: "🔢", path: "/tuitions/middle/algebra" },
      { name: "Physics Basics", icon: "⚡", path: "/tuitions/middle/physics" },
      { name: "Chemistry Intro", icon: "⚗️", path: "/tuitions/middle/chemistry" },
      { name: "History", icon: "🏛️", path: "/tuitions/middle/history" },
    ]
  },
  {
    name: "High School", icon: "🎓", desc: "Grades 9–12", path: "/tuitions/highschool",
    children: [
      { name: "Advanced Math", icon: "📊", path: "/tuitions/highschool/math" },
      { name: "Physics", icon: "🔭", path: "/tuitions/highschool/physics" },
      { name: "Chemistry", icon: "⚗️", path: "/tuitions/highschool/chemistry" },
      { name: "Biology", icon: "🧬", path: "/tuitions/highschool/biology" },
    ]
  },
  { name: "JEE Preparation", icon: "🔭", desc: "Engineering entrance", path: "/tuitions/jee" },
  { name: "NEET Preparation", icon: "🩺", desc: "Medical entrance", path: "/tuitions/neet" },
  { name: "Board Exams", icon: "📝", desc: "CBSE / ICSE / State", path: "/tuitions/boards" },
];

const learningBoostersItems = [
  { name: "Flash Cards", icon: "🃏", desc: "Quick memory revision", path: "/boosters/flashcards" },
  {
    name: "Practice Tests", icon: "✅", desc: "Mock & chapter tests", path: "/boosters/tests",
    children: [
      { name: "Chapter Tests", icon: "📄", path: "/boosters/tests/chapter" },
      { name: "Mock Exams", icon: "📋", path: "/boosters/tests/mock" },
      { name: "Previous Papers", icon: "🗂️", path: "/boosters/tests/previous" },
    ]
  },
  { name: "Mind Maps", icon: "🗺️", desc: "Visual concept maps", path: "/boosters/mindmaps" },
  { name: "Live Doubt Sessions", icon: "🎙️", desc: "Ask experts in real time", path: "/boosters/doubt" },
  { name: "Video Summaries", icon: "🎬", desc: "Bite-sized video lessons", path: "/boosters/videos" },
  {
    name: "AI Tutoring", icon: "🤖", desc: "Personalized AI help", path: "/boosters/ai",
    children: [
      { name: "Math AI Tutor", icon: "📐", path: "/boosters/ai/math" },
      { name: "Science AI Tutor", icon: "🔬", path: "/boosters/ai/science" },
      { name: "Writing Assistant", icon: "✍️", path: "/boosters/ai/writing" },
    ]
  },
];

const languageTracksItems = [
  { name: "English Mastery", icon: "🇬🇧", desc: "Grammar, writing & speaking", path: "/language/english" },
  { name: "Hindi Proficiency", icon: "🇮🇳", desc: "Literature & language", path: "/language/hindi" },
  { name: "French", icon: "🇫🇷", desc: "Beginner to advanced", path: "/language/french" },
  { name: "German", icon: "🇩🇪", desc: "Beginner to advanced", path: "/language/german" },
  { name: "Spanish", icon: "🇪🇸", desc: "Conversational & academic", path: "/language/spanish" },
  { name: "Sanskrit", icon: "📜", desc: "Classical language", path: "/language/sanskrit" },
];

const moreItems = [
  { name: "About Us", icon: "🏢", path: "/aboutus" },
  { name: "FAQs", icon: "❓", path: "/faqs" },
  { name: "Blog", icon: "✍️", path: "/blog" },
  { name: "Careers", icon: "💼", path: "/careers" },
  { name: "Press", icon: "📰", path: "/press" },
  { name: "Contact", icon: "📬", path: "/contact" },
];

const trendingSearches = ["Full Stack Development", "Python Programming", "Data Science", "React Development", "Digital Marketing"];

/* ─── Animation variants ────────────────────────────────────── */
const notebookVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.03, delayChildren: 0.05 }
  },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.16 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

const subMenuVariants = {
  hidden: { opacity: 0, x: -8, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -6, scale: 0.97, transition: { duration: 0.14 } },
};

/* ─── NotebookRow — single row with optional sub-panel ─────── */
const NotebookRow = ({ item, onNavigate, onClose, index }) => {
  const [subOpen, setSubOpen] = useState(false);
  const rowRef = useRef();
  const subTimeoutRef = useRef();

  const showSub = () => { clearTimeout(subTimeoutRef.current); setSubOpen(true); };
  const hideSub = () => { subTimeoutRef.current = setTimeout(() => setSubOpen(false), 100); };

  const hasChildren = item.children && item.children.length > 0;

  return (
    <motion.div
      ref={rowRef}
      variants={rowVariants}
      className="relative"
      onMouseEnter={hasChildren ? showSub : undefined}
      onMouseLeave={hasChildren ? hideSub : undefined}
    >
      {/* Ruled line (notebook feel) */}
      {index > 0 && (
        <div className="mx-3 h-px bg-[#A6192E]/8" />
      )}
      <div
        className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-150 group
          ${hasChildren ? "hover:bg-[#A6192E]/6" : "hover:bg-[#A6192E]/6"}`}
        onClick={() => { if (!hasChildren) { onNavigate(item.path); onClose(); } }}
      >
        {/* Left red margin line indicator */}
        <div className="w-0.5 h-6 rounded-full bg-[#A6192E]/20 group-hover:bg-[#A6192E]/60 transition-colors duration-150 flex-shrink-0" />

        <span className="text-base leading-none w-5 text-center flex-shrink-0">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-gray-800 group-hover:text-[#A6192E] transition-colors leading-tight truncate">{item.name}</p>
          {item.desc && (
            <p className="text-[11px] text-gray-400 mt-0.5 leading-tight truncate">{item.desc}</p>
          )}
        </div>
        {hasChildren && (
          <FiChevronRight size={12} className="text-[#A6192E]/40 group-hover:text-[#A6192E] transition-colors flex-shrink-0" />
        )}
      </div>

      {/* Sub-panel */}
      <AnimatePresence>
        {hasChildren && subOpen && (
          <motion.div
            variants={subMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-full top-0 z-50 w-52"
            style={{ marginLeft: "4px" }}
            onMouseEnter={showSub}
            onMouseLeave={hideSub}
          >
            <div className="bg-white rounded-2xl border border-[#A6192E]/15 shadow-xl shadow-[#A6192E]/12 py-2 overflow-hidden">
              {/* Notebook header line */}
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

/* ─── NotebookDropdown — the main notebook-style panel ─────── */
const NotebookDropdown = ({ items, onNavigate, onClose, label }) => (
  <motion.div
    variants={notebookVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="absolute left-0 z-50 w-64 origin-top-left"
    style={{ top: "calc(100% + 8px)" }}
  >
    <div className="bg-white rounded-2xl border border-[#A6192E]/15 shadow-xl shadow-[#A6192E]/12 overflow-hidden">
      {/* Notebook header — like a sticky label */}
      <div className="px-4 py-2.5 bg-[#A6192E]/5 border-b border-[#A6192E]/12">
        <div className="flex items-center gap-2">
          {/* Notebook spiral holes */}
          <div className="flex flex-col gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full border border-[#A6192E]/30 bg-white" />
            ))}
          </div>
          <p className="text-[11px] font-bold text-[#A6192E]/70 uppercase tracking-[0.12em]">{label}</p>
        </div>
      </div>
      {/* Items */}
      <div className="py-1.5">
        {items.map((item, i) => (
          <NotebookRow key={i} item={item} onNavigate={onNavigate} onClose={onClose} index={i} />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── NavDropdown wrapper ───────────────────────────────────── */
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
      <div className={`relative px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 flex items-center gap-1.5
        ${open ? "text-[#A6192E] bg-[#A6192E]/10" : "text-gray-700 hover:text-[#A6192E] hover:bg-[#A6192E]/8"}`}
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex text-[#A6192E]">
          <FiChevronDown size={13} />
        </motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <NotebookDropdown
            items={items}
            onNavigate={navigate}
            onClose={() => setOpen(false)}
            label={label}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Navbar ───────────────────────────────────────────── */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(["React Development", "Data Science", "UI/UX Design"]);
  const [openModal, setOpenModal] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);

  const searchInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [searchOpen]);

  const allSearchResults = [
    ...popularCourses.map(c => ({ ...c, type: "course" })),
    ...categories.map(c => ({ name: c.name, icon: c.icon, count: c.count, type: "category" }))
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
  };

  const toggleMobile = (section) => {
    setMobileExpanded(prev => prev === section ? null : section);
    setMobileSubExpanded(null);
  };
  const toggleMobileSub = (e, key) => {
    e.stopPropagation();
    setMobileSubExpanded(prev => prev === key ? null : key);
  };

  /* ─── Mobile Accordion with sub-items ───────────────────── */
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
                  onClick={() => {
                    if (!item.children) { navigate(item.path || "#"); setOpen(false); }
                  }}
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
                          onClick={() => { navigate(child.path); setOpen(false); }}
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
      <header
        className={`sticky top-0 z-50 transition-all duration-300 font-sans ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#A6192E]/20 shadow-lg shadow-[#A6192E]/5"
            : "bg-white/75 backdrop-blur-md border-b border-[#A6192E]/10"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] sm:h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg sm:rounded-[10px] flex items-center justify-center shadow-lg shadow-[#A6192E]/30 overflow-hidden">
              <img src="/logo1.png" alt="Esperly Logo" className="object-contain" />
            </div>
            <span
              className="text-xl sm:text-2xl font-bold text-[#A6192E] drop-shadow-[0_2px_6px_rgba(166,25,46,0.2)] tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Esperly
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex items-center gap-0.5"
          >
            <NavLink to="/">
              {({ isActive }) => (
                <div className={`relative px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200
                  ${isActive ? "text-[#A6192E] bg-[#A6192E]/10 font-semibold" : "text-gray-700 hover:text-[#A6192E] hover:bg-[#A6192E]/8"}`}
                >
                  Hub
                </div>
              )}
            </NavLink>

            <NavDropdown label="Tuitions" items={tuitionsItems} navigate={navigate} />
            <NavDropdown label="Learning Boosters" items={learningBoostersItems} navigate={navigate} />
            <NavDropdown label="Language Tracks" items={languageTracksItems} navigate={navigate} />
            <NavDropdown label="More" items={moreItems} navigate={navigate} />
          </motion.nav>

          {/* Right actions */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <button
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#A6192E]/10 flex items-center justify-center text-[#A6192E] transition-all duration-200 hover:bg-[#A6192E]/20 hover:scale-105"
            >
              <FiSearch size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className="hidden sm:block text-sm font-medium text-gray-700 px-3 py-2 rounded-full transition-colors duration-200 hover:bg-[#A6192E]/10 hover:text-[#A6192E]"
            >
              Sign In
            </button>

            <button
              onClick={() => setOpen1(true)}
              className="hidden sm:block relative overflow-hidden px-4 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-br from-[#A6192E] to-[#8B1527] shadow-lg shadow-[#A6192E]/30 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-3/5 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
            >
              Enroll Now
            </button>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-[#A6192E]/10 text-[#A6192E]"
            >
              <FiMenu size={18} />
            </button>
          </motion.div>
        </div>
      </header>

      {/* ── Mobile Sidebar ── */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[#A6192E]/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl shadow-[#A6192E]/20 overflow-y-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {/* Sidebar header */}
              <div className="sticky top-0 bg-white z-10 px-5 pt-5 pb-3 border-b border-[#A6192E]/10">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#A6192E] to-[#8B1527] flex items-center justify-center overflow-hidden">
                      <img src="/logo1.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl text-[#A6192E] font-bold" style={{ fontFamily: "'DM Serif Display', serif" }}>Esperly</span>
                  </div>
                  <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                    <FiX size={18} />
                  </button>
                </div>
                {/* Mobile search */}
                <div
                  onClick={() => { setOpen(false); setSearchOpen(true); }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-[#A6192E]/5 rounded-xl border border-[#A6192E]/20 cursor-pointer"
                >
                  <FiSearch className="text-[#A6192E]" size={16} />
                  <span className="text-sm text-[#A6192E]/50">Search courses...</span>
                </div>
              </div>

              <div className="px-4 py-3 flex flex-col gap-0.5">
                <NavLink to="/" onClick={() => setOpen(false)}>
                  {({ isActive }) => (
                    <div className={`flex items-center px-4 py-3 rounded-lg font-medium text-sm cursor-pointer transition-all duration-200
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

              <div className="h-px bg-gradient-to-r from-transparent via-[#A6192E]/30 to-transparent mx-5 my-2" />

              <div className="px-5 pb-8 flex flex-col gap-2.5">
                <button
                  onClick={() => { setOpenModal(true); setOpen(false); }}
                  className="py-3 rounded-lg border-2 border-[#A6192E]/20 bg-white text-[#A6192E] font-semibold text-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setOpen1(true); setOpen(false); }}
                  className="py-3 rounded-lg bg-gradient-to-br from-[#A6192E] to-[#8B1527] text-white font-semibold text-sm shadow-lg shadow-[#A6192E]/30"
                >
                  Enroll Now
                </button>
                <p className="mt-4 text-[11px] text-gray-400 text-center tracking-widest">LEARN · GROW · SUCCEED</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Search Overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#f5526a] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#A6192E]/20 z-10">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-md border border-[#A6192E]/20">
                    <FiSearch className="text-[#A6192E] flex-shrink-0" size={18} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for courses, categories, topics..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-[#A6192E]/40 text-sm sm:text-base"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="text-[#A6192E]/60 hover:text-[#A6192E]">
                        <FiX size={16} />
                      </button>
                    )}
                  </div>
                  <button onClick={() => setSearchOpen(false)} className="px-4 py-3 text-sm font-medium text-[#A6192E] hover:text-[#8B1527]">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              {searchQuery ? (
                <div>
                  <p className="text-xs sm:text-sm text-white/80 mb-4">Found {allSearchResults.length} results for "{searchQuery}"</p>
                  <div className="space-y-2">
                    {allSearchResults.length > 0 ? allSearchResults.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#A6192E]/10 hover:border-[#A6192E]/30"
                        onClick={() => {
                          if (item.type === "course") navigate(`/course-detail/full-stack-dev`);
                          else navigate(`/category/${item.name.toLowerCase().replace(/ /g, '-')}`);
                          setSearchOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-2xl sm:text-3xl">{item.icon}</span>
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-[#A6192E]/70 capitalize">{item.type}</span>
                              {item.students && <span className="text-xs text-[#A6192E]/50">· {item.students.toLocaleString()} students</span>}
                              {item.count && <span className="text-xs text-[#A6192E]/50">· {item.count}</span>}
                            </div>
                          </div>
                          <FiArrowRight className="text-[#A6192E]/40" size={18} />
                        </div>
                      </motion.div>
                    )) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
                        <p className="text-sm text-white/80">Try different keywords or browse categories</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 sm:space-y-8">
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FiTrendingUp size={14} /> Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s, i) => (
                          <button key={i} onClick={() => handleSearch(s)} className="px-4 py-2 bg-white rounded-full text-sm text-[#A6192E] border border-[#A6192E]/20 hover:shadow-md transition-all">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FiStar size={14} /> Trending Now
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {trendingSearches.map((s, i) => (
                        <button key={i} onClick={() => handleSearch(s)} className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl hover:shadow-md transition-all border border-[#A6192E]/10">
                          <span className="text-sm text-gray-800">{s}</span>
                          <span className="text-xs text-[#A6192E]/50">#{i + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FiBookOpen size={14} /> Popular Categories
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {categories.map((cat, i) => (
                        <button key={i} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-md transition-all border border-[#A6192E]/10" onClick={() => { navigate(`/category/${cat.name.toLowerCase()}`); setSearchOpen(false); }}>
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="text-xs font-medium text-gray-800 text-center">{cat.name}</span>
                          <span className="text-[10px] text-[#A6192E]/60">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FiUsers size={14} /> Featured Courses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {popularCourses.slice(0, 4).map((course, i) => (
                        <button key={i} className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl hover:shadow-md transition-all border border-[#A6192E]/10" onClick={() => { navigate(`/course-detail/full-stack-dev`); setSearchOpen(false); }}>
                          <span className="text-2xl">{course.icon}</span>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-800">{course.name}</p>
                            <p className="text-xs text-[#A6192E]/60">{course.students.toLocaleString()} students</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${course.tag === "Hot" ? "bg-red-100 text-[#A6192E]" : "bg-[#A6192E]/10 text-[#A6192E]"}`}>
                            {course.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      <EnrollModal isOpen={open1} onClose={() => setOpen1(false)} />
    </>
  );
};

export default Navbar;