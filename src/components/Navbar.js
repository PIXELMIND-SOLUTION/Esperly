import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX, FiArrowRight, FiChevronDown } from "react-icons/fi";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const popularCourses = [
  { name: "Full Stack Development", tag: "Hot" },
  { name: "Data Science", tag: "Popular" },
  { name: "UI/UX Design", tag: null },
  { name: "Digital Marketing", tag: null },
  { name: "Python Programming", tag: "New" },
  { name: "Spoken English", tag: null },
  { name: "Graphic Design", tag: null },
  { name: "React Development", tag: "Popular" },
];

const categories = [
  { name: "School Tuitions", icon: "📚" },
  { name: "Programming", icon: "💻" },
  { name: "Design", icon: "🎨" },
  { name: "Business", icon: "📈" },
  { name: "Languages", icon: "🌐" },
  { name: "Exam Preparation", icon: "✏️" },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Teachers", path: "/teachers" },
  { name: "Contact", path: "/contact" },
];

/* ─────────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────────── */

// Mega menu container — unrolls from top like a scroll
const megaMenuVariants = {
  hidden: {
    clipPath: "inset(0% 0% 100% 0%)",
    opacity: 0,
    y: -12,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [courseMenu, setCourseMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef();
  const timeoutRef = useRef();

  /* Scroll detection for navbar glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Delayed close for hover intent */
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setCourseMenu(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setCourseMenu(false), 120);
  };

  /* Close dropdown when clicked outside */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setCourseMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-root { font-family: 'DM Sans', sans-serif; }
        .logo-text { font-family: 'DM Serif Display', serif; }

        .nav-link-pill {
          position: relative;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .nav-link-pill::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: #f0fdfa;
          opacity: 0;
          transition: opacity 0.2s;
          z-index: -1;
        }
        .nav-link-pill:hover::after { opacity: 1; }
        .nav-link-pill:hover { color: #0d9488; }
        .nav-link-pill.active {
          color: #0d9488;
          font-weight: 600;
        }
        .nav-link-pill.active::after { opacity: 1; }

        .course-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          font-size: 0.875rem;
          color: #374151;
        }
        .course-item:hover {
          background: #f0fdfa;
          color: #0d9488;
        }
        .course-item:hover .arrow-icon { opacity: 1; transform: translateX(0); }
        .arrow-icon {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.18s, transform 0.18s;
          color: #14b8a6;
          flex-shrink: 0;
        }

        .cat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.875rem;
          color: #374151;
          transition: background 0.18s, color 0.18s;
        }
        .cat-item:hover {
          background: #f0fdfa;
          color: #0d9488;
        }

        .tag-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 100px;
          background: #ccfbf1;
          color: #0d9488;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .tag-badge.hot { background: #fef3c7; color: #d97706; }

        .enroll-btn {
          position: relative;
          overflow: hidden;
          padding: 9px 22px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.875rem;
          color: white;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          box-shadow: 0 2px 16px rgba(20,184,166,0.35);
          transition: box-shadow 0.2s, transform 0.18s;
          cursor: pointer;
          border: none;
          letter-spacing: 0.02em;
        }
        .enroll-btn:hover {
          box-shadow: 0 4px 24px rgba(20,184,166,0.5);
          transform: translateY(-1px);
        }
        .enroll-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.4s ease;
        }
        .enroll-btn:hover::before { left: 150%; }

        .divider-v {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #e5e7eb, transparent);
          align-self: stretch;
        }

        /* Mobile sidebar */
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          margin-bottom: 4px;
          text-decoration: none;
        }
        .mobile-link:hover, .mobile-link.active {
          background: #f0fdfa;
          color: #0d9488;
        }
      `}</style>

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <header
        className="nav-root sticky top-0 z-50"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid rgba(229,231,235,0.5)",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.35s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 shrink-0"
          >
            {/* Icon mark */}
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #5eead4, #0d9488)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(20,184,166,0.35)",
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L9 3L15 9V15H3V9Z" fill="white" opacity="0.9"/>
                <circle cx="9" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
            <span className="logo-text text-2xl" style={{ color: "#0f4c45", letterSpacing: "-0.02em" }}>
              Esperly
            </span>
          </motion.div>

          {/* ── Desktop Nav ── */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-1 relative"
            ref={menuRef}
          >
            {navLinks.map((link, i) => (
              <NavLink key={link.path} to={link.path}>
                {({ isActive }) => (
                  <div className={`nav-link-pill ${isActive ? "active" : ""}`}>
                    {link.name}
                  </div>
                )}
              </NavLink>
            ))}

            <div className="divider-v mx-1" />

            {/* Courses trigger */}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <div
                className="nav-link-pill flex items-center gap-1.5"
                style={{ userSelect: "none" }}
              >
                Courses
                <motion.span
                  animate={{ rotate: courseMenu ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", color: "#9ca3af" }}
                >
                  <FiChevronDown size={14} />
                </motion.span>
              </div>

              {/* ── MEGA MENU ── */}
              <AnimatePresence>
                {courseMenu && (
                  <motion.div
                    variants={megaMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      position: "fixed",
                      left: 0,
                      top: 68,
                      width: "100%",
                      zIndex: 40,
                      pointerEvents: "auto",
                      originY: 0,
                    }}
                  >
                    {/* Backdrop */}
                    <div style={{
                      background: "rgba(15,76,69,0.04)",
                      backdropFilter: "blur(4px)",
                      paddingTop: 8,
                      paddingBottom: 32,
                    }}>
                      <div className="max-w-7xl mx-auto px-6">
                        <div style={{
                          background: "rgba(255,255,255,0.98)",
                          borderRadius: 24,
                          border: "1px solid rgba(94,234,212,0.3)",
                          boxShadow: "0 24px 64px rgba(15,76,69,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                          padding: "32px 36px",
                          display: "grid",
                          gridTemplateColumns: "1fr 1px 1fr 1px 320px",
                          gap: 0,
                        }}>

                          {/* ── Column 1: Popular Courses ── */}
                          <motion.div variants={itemVariants} style={{ paddingRight: 32 }}>
                            <p style={{
                              fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                              color: "#0d9488", textTransform: "uppercase", marginBottom: 16,
                            }}>
                              Popular Courses
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              {popularCourses.map((c, i) => (
                                <motion.div
                                  key={i}
                                  variants={itemVariants}
                                  className="course-item"
                                >
                                  <span>{c.name}</span>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    {c.tag && (
                                      <span className={`tag-badge ${c.tag === "Hot" ? "hot" : ""}`}>
                                        {c.tag}
                                      </span>
                                    )}
                                    <FiArrowRight size={13} className="arrow-icon" />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Divider */}
                          <div style={{ background: "linear-gradient(to bottom, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent)", margin: "0 4px" }} />

                          {/* ── Column 2: Categories ── */}
                          <motion.div variants={itemVariants} style={{ paddingLeft: 32, paddingRight: 32 }}>
                            <p style={{
                              fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                              color: "#0d9488", textTransform: "uppercase", marginBottom: 16,
                            }}>
                              Browse by Category
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              {categories.map((c, i) => (
                                <motion.div key={i} variants={itemVariants} className="cat-item">
                                  <span style={{ fontSize: 18 }}>{c.icon}</span>
                                  <span>{c.name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Divider */}
                          <div style={{ background: "linear-gradient(to bottom, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent)", margin: "0 4px" }} />

                          {/* ── Column 3: CTA Card ── */}
                          <motion.div variants={itemVariants} style={{ paddingLeft: 32 }}>
                            <div style={{
                              background: "linear-gradient(145deg, #0d9488 0%, #0f766e 50%, #0f4c45 100%)",
                              borderRadius: 18,
                              padding: "28px 24px",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              position: "relative",
                              overflow: "hidden",
                            }}>
                              {/* Decorative circles */}
                              <div style={{
                                position: "absolute", top: -30, right: -30,
                                width: 100, height: 100, borderRadius: "50%",
                                background: "rgba(255,255,255,0.08)",
                              }} />
                              <div style={{
                                position: "absolute", bottom: -20, left: -20,
                                width: 80, height: 80, borderRadius: "50%",
                                background: "rgba(255,255,255,0.06)",
                              }} />

                              <div style={{ position: "relative" }}>
                                <div style={{
                                  display: "inline-flex", alignItems: "center", gap: 6,
                                  background: "rgba(255,255,255,0.15)",
                                  borderRadius: 100, padding: "4px 12px",
                                  marginBottom: 14,
                                }}>
                                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5eead4" }} />
                                  <span style={{ fontSize: "11px", color: "#ccfbf1", fontWeight: 600, letterSpacing: "0.06em" }}>
                                    10,000+ STUDENTS
                                  </span>
                                </div>

                                <h3 className="logo-text" style={{
                                  fontSize: "1.4rem", color: "white", lineHeight: 1.25,
                                  marginBottom: 10,
                                }}>
                                  Start Learning<br />Today
                                </h3>
                                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                                  Join thousands of students upgrading their skills with expert-led courses.
                                </p>
                              </div>

                              <button
                                style={{
                                  marginTop: 20,
                                  background: "white",
                                  color: "#0d9488",
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                  padding: "10px 20px",
                                  borderRadius: 100,
                                  border: "none",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 6,
                                  transition: "transform 0.2s, box-shadow 0.2s",
                                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                                  position: "relative",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)"; }}
                              >
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

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:flex items-center gap-3"
          >
            <button
              style={{
                fontSize: "0.85rem", fontWeight: 500, color: "#0d9488",
                background: "none", border: "none", cursor: "pointer",
                padding: "8px 12px", borderRadius: 100,
                transition: "background 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0fdfa"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              Sign In
            </button>
            <button className="enroll-btn">Enroll Now</button>
          </motion.div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: "#f0fdfa", color: "#0d9488", border: "none", cursor: "pointer" }}
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* ═══════════════ MOBILE SIDEBAR ═══════════════ */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(15,76,69,0.3)", backdropFilter: "blur(4px)" }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="nav-root"
              style={{
                position: "absolute", left: 0, top: 0,
                height: "100%", width: 300,
                background: "white",
                boxShadow: "4px 0 40px rgba(0,0,0,0.12)",
                padding: "28px 20px",
                overflowY: "auto",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: "linear-gradient(135deg, #5eead4, #0d9488)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9L9 3L15 9V15H3V9Z" fill="white" opacity="0.9"/>
                      <circle cx="9" cy="9" r="2.5" fill="white"/>
                    </svg>
                  </div>
                  <span className="logo-text" style={{ fontSize: "1.3rem", color: "#0f4c45" }}>Esperly</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "#f3f4f6", border: "none", borderRadius: 10,
                    width: 34, height: 34, display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", color: "#374151",
                  }}
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {navLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} className="mobile-link" onClick={() => setOpen(false)}>
                    {({ isActive }) => (
                      <div className={`mobile-link ${isActive ? "active" : ""}`} style={{ width: "100%", textDecoration: "none" }}>
                        {link.name}
                      </div>
                    )}
                  </NavLink>
                ))}
                <div className="mobile-link" style={{ color: "#374151" }}>Courses</div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #e5e7eb, transparent)", margin: "20px 0" }} />

              {/* Mobile CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  style={{
                    padding: "12px", borderRadius: 14, border: "1.5px solid #e5e7eb",
                    background: "white", color: "#0d9488", fontWeight: 600, fontSize: "0.9rem",
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Sign In
                </button>
                <button className="enroll-btn" style={{ padding: "12px", borderRadius: 14, width: "100%", fontFamily: "'DM Sans', sans-serif" }}>
                  Enroll Now
                </button>
              </div>

              {/* Bottom tagline */}
              <p style={{ marginTop: 32, fontSize: "11px", color: "#9ca3af", textAlign: "center", letterSpacing: "0.05em" }}>
                LEARN · GROW · SUCCEED
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;