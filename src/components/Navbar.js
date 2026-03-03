import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX, FiArrowRight, FiChevronDown, FiSearch, FiTrendingUp, FiBookOpen, FiUsers, FiStar } from "react-icons/fi";

const popularCourses = [
  { name: "Full Stack Development", tag: "Hot", students: "2.5k", icon: "💻" },
  { name: "Data Science", tag: "Popular", students: "3.1k", icon: "📊" },
  { name: "UI/UX Design", tag: null, students: "1.8k", icon: "🎨" },
  { name: "Digital Marketing", tag: null, students: "2.2k", icon: "📱" },
  { name: "Python Programming", tag: "New", students: "4.2k", icon: "🐍" },
  { name: "Spoken English", tag: null, students: "5.1k", icon: "🗣️" },
  { name: "Graphic Design", tag: null, students: "1.4k", icon: "🖌️" },
  { name: "React Development", tag: "Popular", students: "3.7k", icon: "⚛️" },
];

const categories = [
  { name: "School Tuitions", icon: "📚", count: "45+ courses" },
  { name: "Programming", icon: "💻", count: "32+ courses" },
  { name: "Design", icon: "🎨", count: "28+ courses" },
  { name: "Business", icon: "📈", count: "23+ courses" },
  { name: "Languages", icon: "🌐", count: "19+ courses" },
  { name: "Exam Preparation", icon: "✏️", count: "16+ courses" },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Teachers", path: "/teachers" },
  { name: "Contact", path: "/contact" },
  { name: "About Us", path: "/aboutus"}
];

const megaMenuVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -12 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.1
    }
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [courseMenu, setCourseMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "React Development",
    "Data Science",
    "UI/UX Design"
  ]);
  const menuRef = useRef();
  const timeoutRef = useRef();
  const searchInputRef = useRef();
  const mobileSearchInputRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      if (window.innerWidth >= 768) {
        searchInputRef.current?.focus();
      } else {
        mobileSearchInputRef.current?.focus();
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [searchOpen]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setCourseMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setCourseMenu(false), 120);
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setCourseMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allSearchResults = [
    ...popularCourses.map(c => ({ ...c, type: "course" })),
    ...categories.map(c => ({ name: c.name, icon: c.icon, count: c.count, type: "category" }))
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const trendingSearches = [
    "Full Stack Development",
    "Python Programming",
    "Data Science",
    "React Development",
    "Digital Marketing"
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
  };

  const popularCoursesForMobile = popularCourses.slice(0, 6);

  return (
    <>
      <header
        className={`nav-root sticky top-0 z-50 transition-all duration-300 font-sans ${
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
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-lg sm:rounded-[10px] flex items-center justify-center shadow-lg shadow-[#A6192E]/30 overflow-hidden">
              <img
                src="/logo1.png"
                alt="Esperly Logo"
                className="object-contain"
              />
            </div>
            <span
              className="logo-text text-xl sm:text-2xl font-bold text-[#A6192E] drop-shadow-[0_2px_6px_rgba(166,25,46,0.2)] tracking-tight"
              style={{
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Esperly
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-1 relative"
            ref={menuRef}
          >
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path}>
                {({ isActive }) => (
                  <div
                    className={`nav-link-pill relative px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 ${
                      isActive
                        ? "text-[#A6192E] font-semibold after:opacity-100"
                        : "text-gray-700"
                    } after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-[#A6192E]/10 after:opacity-0 after:transition-opacity after:duration-200 after:-z-10 hover:after:opacity-100 hover:text-[#A6192E]`}
                  >
                    {link.name}
                  </div>
                )}
              </NavLink>
            ))}

            <div className="w-px bg-gradient-to-b from-transparent via-[#A6192E]/30 to-transparent self-stretch mx-1" />

            {/* Courses trigger */}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <div className="nav-link-pill relative px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 text-gray-700 flex items-center gap-1.5 after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-[#A6192E]/10 after:opacity-0 after:transition-opacity after:duration-200 after:-z-10 hover:after:opacity-100 hover:text-[#A6192E]">
                Courses
                <motion.span
                  animate={{ rotate: courseMenu ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex text-[#A6192E]"
                >
                  <FiChevronDown size={14} />
                </motion.span>
              </div>

              {/* Mega Menu - Desktop only */}
              <AnimatePresence>
                {courseMenu && (
                  <motion.div
                    variants={megaMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="fixed left-0 top-[60px] sm:top-[68px] w-full z-40 pointer-events-auto origin-top hidden lg:block"
                  >
                    <div className="bg-[#A6192E]/10 backdrop-blur-sm pt-2 pb-8">
                      <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-white rounded-2xl border border-[#A6192E]/20 shadow-2xl shadow-[#A6192E]/20 p-8 grid grid-cols-[1fr,1px,1fr,1px,320px] gap-0">
                          {/* Column 1: Popular Courses */}
                          <motion.div variants={itemVariants} className="pr-8">
                            <p className="text-[10px] font-bold tracking-[0.1em] text-[#A6192E] uppercase mb-4">
                              Popular Courses
                            </p>
                            <div className="flex flex-col gap-0.5">
                              {popularCourses.map((c, i) => (
                                <motion.div
                                  key={i}
                                  variants={itemVariants}
                                  className="flex items-center justify-between px-3.5 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm text-gray-700 hover:bg-[#A6192E]/10 hover:text-[#A6192E] group"
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{c.icon}</span>
                                    <span>{c.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {c.tag && (
                                      <span
                                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                          c.tag === "Hot"
                                            ? "bg-red-100 text-[#A6192E]"
                                            : "bg-[#A6192E]/10 text-[#A6192E]"
                                        }`}
                                      >
                                        {c.tag}
                                      </span>
                                    )}
                                    <span className="text-xs text-[#A6192E]/60">{c.students}</span>
                                    <FiArrowRight
                                      size={13}
                                      className="opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-[#A6192E]"
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Divider */}
                          <div className="bg-gradient-to-b from-transparent via-[#A6192E]/30 to-transparent mx-1" />

                          {/* Column 2: Categories */}
                          <motion.div variants={itemVariants} className="px-8">
                            <p className="text-[10px] font-bold tracking-[0.1em] text-[#A6192E] uppercase mb-4">
                              Browse by Category
                            </p>
                            <div className="flex flex-col gap-0.5">
                              {categories.map((c, i) => (
                                <motion.div
                                  key={i}
                                  variants={itemVariants}
                                  className="flex items-center justify-between px-3.5 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm text-gray-700 hover:bg-[#A6192E]/10 hover:text-[#A6192E]"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-lg">{c.icon}</span>
                                    <span>{c.name}</span>
                                  </div>
                                  <span className="text-xs text-[#A6192E]/60">{c.count}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Divider */}
                          <div className="bg-gradient-to-b from-transparent via-[#A6192E]/30 to-transparent mx-1" />

                          {/* Column 3: CTA Card */}
                          <motion.div variants={itemVariants} className="pl-8">
                            <div className="bg-gradient-to-br from-[#A6192E] to-[#8B1527] rounded-lg p-7 h-full flex flex-col justify-between relative overflow-hidden">
                              <div className="absolute top-[-30px] right-[-30px] w-[100px] h-[100px] rounded-full bg-white/10" />
                              <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full bg-white/5" />

                              <div className="relative">
                                <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 mb-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                  <span className="text-[11px] text-white font-semibold tracking-wider">
                                    10,000+ STUDENTS
                                  </span>
                                </div>
                                <h3
                                  className="logo-text text-2xl text-white leading-tight mb-2"
                                  style={{ fontFamily: "'DM Serif Display', serif" }}
                                >
                                  Start Learning<br />Today
                                </h3>
                                <p className="text-xs text-white/70 leading-relaxed">
                                  Join thousands of students upgrading their skills with expert-led courses.
                                </p>
                              </div>

                              <button className="mt-5 bg-white text-[#A6192E] font-bold text-sm px-5 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl relative">
                                Browse All Courses <FiArrowRight size={14} />
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {/* Search Button - Desktop & Mobile */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#A6192E]/10 flex items-center justify-center cursor-pointer text-[#A6192E] transition-all duration-200 hover:bg-[#A6192E]/20 hover:scale-105"
            >
              <FiSearch size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Desktop Buttons */}
            <button className="hidden sm:block text-sm font-medium text-gray-700 px-3 py-2 rounded-full transition-colors duration-200 hover:bg-[#A6192E]/10 hover:text-[#A6192E]">
              Sign In
            </button>
            <button className="hidden sm:block relative overflow-hidden px-4 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-br from-[#A6192E] to-[#8B1527] shadow-lg shadow-[#A6192E]/30 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-3/5 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-all before:duration-700 hover:before:left-full">
              Enroll Now
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-[#A6192E]/10 text-[#A6192E] border-none cursor-pointer"
            >
              <FiMenu size={18} />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
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
              className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl shadow-[#A6192E]/20 p-5 sm:p-7 overflow-y-auto font-sans"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#A6192E] to-[#8B1527] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9L9 3L15 9V15H3V9Z" fill="white" opacity="0.9" />
                      <circle cx="9" cy="9" r="2.5" fill="white" />
                    </svg>
                  </div>
                  <span
                    className="logo-text text-xl text-[#A6192E]"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    Esperly
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer text-gray-700"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Mobile Search Bar */}
              <div className="mb-6">
                <div
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-3 px-4 py-3 bg-[#A6192E]/5 rounded-xl border border-[#A6192E]/20 cursor-pointer"
                >
                  <FiSearch className="text-[#A6192E]" size={18} />
                  <span className="text-sm text-[#A6192E]/60 flex-1">Search courses...</span>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)}>
                    {({ isActive }) => (
                      <div
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200 mb-1 ${
                          isActive
                            ? "bg-[#A6192E]/10 text-[#A6192E]"
                            : "text-gray-700 hover:bg-[#A6192E]/10 hover:text-[#A6192E]"
                        }`}
                      >
                        {link.name}
                      </div>
                    )}
                  </NavLink>
                ))}

                {/* Mobile Courses Section */}
                <div className="mt-4">
                  <p className="text-xs font-semibold text-[#A6192E] uppercase tracking-wider px-4 mb-2">
                    Popular Courses
                  </p>
                  {popularCoursesForMobile.map((course, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer hover:bg-[#A6192E]/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span>{course.icon}</span>
                        <span className="text-sm text-gray-700">{course.name}</span>
                      </div>
                      {course.tag && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            course.tag === "Hot"
                              ? "bg-red-100 text-[#A6192E]"
                              : "bg-[#A6192E]/10 text-[#A6192E]"
                          }`}
                        >
                          {course.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#A6192E]/30 to-transparent my-5" />

              <div className="flex flex-col gap-2.5">
                <button className="py-3 rounded-lg border-2 border-[#A6192E]/20 bg-white text-[#A6192E] font-semibold text-sm cursor-pointer">
                  Sign In
                </button>
                <button className="py-3 rounded-lg bg-gradient-to-br from-[#A6192E] to-[#8B1527] text-white font-semibold text-sm shadow-lg shadow-[#A6192E]/30">
                  Enroll Now
                </button>
              </div>

              <p className="mt-8 text-[11px] text-gray-400 text-center tracking-widest">
                LEARN · GROW · SUCCEED
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Search Overlay - Responsive */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#A6192E]/5 overflow-y-auto"
          >
            {/* Search Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#A6192E]/20 z-10">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-1 flex items-center gap-3 sm:gap-4 bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-lg shadow-[#A6192E]/5 border border-[#A6192E]/20">
                    <FiSearch className="text-[#A6192E] flex-shrink-0" size={20} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for courses, categories, topics..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-[#A6192E]/40 text-sm sm:text-base"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-[#A6192E]/60 hover:text-[#A6192E] transition-colors"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-[#A6192E] hover:text-[#8B1527] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Search Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              {searchQuery ? (
                /* Search Results */
                <div>
                  <p className="text-xs sm:text-sm text-[#A6192E]/80 mb-4">
                    Found {allSearchResults.length} results for "{searchQuery}"
                  </p>
                  <div className="space-y-2">
                    {allSearchResults.length > 0 ? (
                      allSearchResults.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#A6192E]/10 hover:border-[#A6192E]/30"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-2xl sm:text-3xl">{item.icon}</span>
                            <div className="flex-1">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs sm:text-sm text-[#A6192E]/80 capitalize">
                                  {item.type}
                                </span>
                                {item.students && (
                                  <span className="text-xs text-[#A6192E]/60">
                                    • {item.students} students
                                  </span>
                                )}
                                {item.count && (
                                  <span className="text-xs text-[#A6192E]/60">
                                    • {item.count}
                                  </span>
                                )}
                              </div>
                            </div>
                            <FiArrowRight className="text-[#A6192E]/40 text-xl sm:text-2xl" />
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12 sm:py-16">
                        <div className="text-6xl sm:text-7xl mb-4">🔍</div>
                        <h3 className="text-lg sm:text-xl font-semibold text-[#A6192E] mb-2">
                          No results found
                        </h3>
                        <p className="text-sm sm:text-base text-[#A6192E]/80">
                          Try different keywords or browse categories
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Search Suggestions */
                <div className="space-y-6 sm:space-y-8">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#A6192E] uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                        <FiTrendingUp className="text-[#A6192E]" /> Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, i) => (
                          <button
                            key={i}
                            onClick={() => handleSearch(search)}
                            className="px-4 py-2 bg-white rounded-full text-sm text-[#A6192E] shadow-sm hover:shadow-md transition-all border border-[#A6192E]/20"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div>
                    <h3 className="text-sm font-semibold text-[#A6192E] uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                      <FiStar className="text-[#A6192E]" /> Trending Now
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {trendingSearches.map((search, i) => (
                        <button
                          key={i}
                          onClick={() => handleSearch(search)}
                          className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl hover:shadow-md transition-all border border-[#A6192E]/10"
                        >
                          <span className="text-sm sm:text-base text-gray-800">{search}</span>
                          <span className="text-xs text-[#A6192E]/60">#{i + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-[#A6192E] uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                      <FiBookOpen className="text-[#A6192E]" /> Popular Categories
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {categories.map((cat, i) => (
                        <button
                          key={i}
                          onClick={() => handleSearch(cat.name)}
                          className="flex flex-col items-center gap-2 p-4 sm:p-5 bg-white rounded-xl hover:shadow-md transition-all border border-[#A6192E]/10"
                        >
                          <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-800 text-center">
                            {cat.name}
                          </span>
                          <span className="text-[10px] sm:text-xs text-[#A6192E]/60">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured Courses */}
                  <div>
                    <h3 className="text-sm font-semibold text-[#A6192E] uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                      <FiUsers className="text-[#A6192E]" /> Featured Courses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {popularCourses.slice(0, 4).map((course, i) => (
                        <button
                          key={i}
                          onClick={() => handleSearch(course.name)}
                          className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl hover:shadow-md transition-all border border-[#A6192E]/10"
                        >
                          <span className="text-2xl">{course.icon}</span>
                          <div className="flex-1 text-left">
                            <p className="text-sm sm:text-base font-medium text-gray-800">
                              {course.name}
                            </p>
                            <p className="text-xs text-[#A6192E]/60">{course.students} students</p>
                          </div>
                          {course.tag && (
                            <span
                              className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                course.tag === "Hot"
                                  ? "bg-red-100 text-[#A6192E]"
                                  : "bg-[#A6192E]/10 text-[#A6192E]"
                              }`}
                            >
                              {course.tag}
                            </span>
                          )}
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
    </>
  );
};

export default Navbar;