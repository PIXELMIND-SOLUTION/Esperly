import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";

// ─── DATA ────────────────────────────────────────────────────────────────────

const tuitionsMenu = [
  {
    label: "Elementary  Level",
    type: "class",
    items: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
  },
  {
    label: "Middle Level",
    type: "class",
    items: ["Class 6", "Class 7", "Class 8"],
  },
  {
    label: "Secondary Level",
    type: "class",
    items: ["Class 9", "Class 10", "Class 11", "Class 12"],
  },
  {
    label: "Short Term Courses",
    type: "course",
    items: [
      "Abacus",
      "Phonics Classes",
      "Public Speaking",
      "Personality Development",
      "Vedic Maths",
      "English Grammar",
    ],
  },
];

const learningBoosters = [
  "Dance",
  "Drawing",
  "Singing",
  "Yoga",
  "Zumba",
  "Painting",
];

const languageTracks = [
  {
    label: "Primary Language",
    items: ["English"]
  },
  {
    label: "Regional Languages",
    items: ["Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Sanskrit"]
  },
  {
    label: "Foreign Languages",
    items: ["French", "German", "Spanish"]
  }
];

const moreItems = [
  { label: "About Us", path: "/aboutus" },
  { label: "Blogs", path: "/blogs" },
  { label: "FAQ's", path: "/faqs" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Refund Policy", path: "/refund-policy" },
];

// ─── TUITIONS DROPDOWN (cascading flyout) ────────────────────────────────────

const TuitionsDropdown = ({ open }) => {
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setActiveGroup(null);
    if (!open) setActiveType(null);
  }, [open]);

  const goToTuition = (label, item) => {
    const fmt = (s) => s.toLowerCase().replace(/\s+/g, "-");
    navigate(`/tuition?label=${fmt(label)}&item=${fmt(item)}`);
  };

  return (
    <div
      className={`absolute left-0 top-full mt-2 z-50 transition-all duration-200 ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
        }`}
    >
      <div className="flex bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[190px]">
        {/* Level list */}
        <ul className="py-2 min-w-[190px]">
          {tuitionsMenu.map((group) => (
            <li
              key={group.label}
              className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 select-none ${activeGroup === group.label
                ? "bg-[#EB6664]/10 text-[#EB6664] font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-[#EB6664]"
                }`}
              onMouseEnter={() => {
                setActiveGroup(group.label);
                setActiveType(group.type);
              }}
            >
              {group.label}
              <FiChevronRight size={13} className="ml-2 text-gray-400 flex-shrink-0" />
            </li>
          ))}
        </ul>

        {/* Sub-items panel */}
        {activeGroup && activeType && (
          <ul className="py-2 min-w-[170px] border-l border-gray-100 bg-white">
            {tuitionsMenu
              .find((g) => g.label === activeGroup && g.type === activeType)
              ?.items.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-[#EB6664]/10 hover:text-[#EB6664] cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    if (activeType !== 'course') {
                      goToTuition(activeGroup, item);
                    } else {
                      navigate(`/course?label=${encodeURIComponent(activeGroup)}&type=course&item=${encodeURIComponent(item)}`);
                    }
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// ─── SIMPLE FLAT DROPDOWN ────────────────────────────────────────────────────

const BoostersDropdown = ({ open, items, pathPrefix = "" }) => (
  <div
    className={`absolute left-0 top-full mt-2 z-50 transition-all duration-200 ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
      }`}
  >
    <ul className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[190px]">
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const path = typeof item === "object" ? item.path : `${pathPrefix}/${label.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <li key={label}>
            <NavLink
              to={`/booster/${label}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EB6664]/10 hover:text-[#EB6664] transition-colors duration-150"
            >
              {label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  </div>
);


const MoreDropdown = ({ open, items, pathPrefix = "" }) => (
  <div
    className={`absolute left-0 top-full mt-2 z-50 transition-all duration-200 ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
      }`}
  >
    <ul className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[190px]">
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const path = typeof item === "object" ? item.path : `${pathPrefix}/${label.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <li key={label}>
            <NavLink
              to={path}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EB6664]/10 hover:text-[#EB6664] transition-colors duration-150"
            >
              {label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  </div>
);

// ─── LANGUAGE TRACKS CASCADING DROPDOWN ─────────────────────────────────────

const LanguageTracksDropdown = ({ open }) => {
  const [activeGroup, setActiveGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setActiveGroup(null);
  }, [open]);

  return (
    <div
      className={`absolute left-0 top-full mt-2 z-50 transition-all duration-200 ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
        }`}
    >
      <div className="flex bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[180px]">
        {/* Category list */}
        <ul className="py-2 min-w-[190px]">
          {languageTracks.map((group) => (
            <li
              key={group.label}
              className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 select-none ${activeGroup === group.label
                ? "bg-[#EB6664]/10 text-[#EB6664] font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-[#EB6664]"
                }`}
              onMouseEnter={() => setActiveGroup(group.label)}
            >
              {group.label}
              <FiChevronRight size={13} className="ml-2 text-gray-400" />
            </li>
          ))}
        </ul>

        {/* Sub-items panel */}
        {activeGroup && (
          <ul className="py-2 min-w-[170px] border-l border-gray-100 bg-white">
            {languageTracks
              .find((g) => g.label === activeGroup)
              ?.items.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-[#EB6664]/10 hover:text-[#EB6664] cursor-pointer transition-colors duration-150"
                  onClick={() => navigate(`/language?label=${encodeURIComponent(activeGroup)}&language=${encodeURIComponent(item)}`)}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'tuitions' | 'boosters' | 'language' | 'more'

  // Mobile accordion
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileTuitionGroup, setMobileTuitionGroup] = useState(null);
  const [mobileLanguageGroup, setMobileLanguageGroup] = useState(null);

  const isScrolledRef = useRef(false);
  const navigate = useNavigate();
  const closeTimer = useRef(null);

  const [activeGroup, setActiveGroup] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const goToTuition = (label, item) => {
    const fmt = (s) => s.toLowerCase().replace(/\s+/g, "-");
    navigate(`/tuition?label=${fmt(label)}&item=${fmt(item)}`);
  };

  // ── Scroll listener ──
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 80 && !isScrolledRef.current) {
        isScrolledRef.current = true;
        setScrolled(true);
      } else if (y <= 80 && isScrolledRef.current) {
        isScrolledRef.current = false;
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Dropdown helpers ──
  const openDropdown = (name) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
      ? "text-white bg-white/20"
      : "text-white/90 hover:text-white hover:bg-white/15"
    }`;

  // ── Dropdown nav item ──
  const DropdownNavItem = ({ id, label, children }) => (
    <div
      className="relative"
      onMouseEnter={() => openDropdown(id)}
      onMouseLeave={scheduleClose}
    >
      <button
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15 transition-all duration-300"
        onClick={() => setActiveDropdown(activeDropdown === id ? null : id)}
      >
        {label}
        <FiChevronDown
          size={13}
          className={`transition-transform duration-200 ${activeDropdown === id ? "rotate-180" : ""}`}
        />
      </button>
      {children}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${scrolled
          ? "h-[70px] bg-[#EB6664] backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.18)]"
          : "h-[200px] bg-transparent border-none shadow-none"
          }`}
      >
        {/* Glass overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none bg-[#EB6664]/75 backdrop-blur-xl backdrop-saturate-150 ${scrolled ? "opacity-100" : "opacity-0"
            }`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
          <div className="flex items-center justify-between transition-all duration-700 ease-in-out">

            {/* ── LOGO ── */}
            <div
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
              onClick={() => navigate("/")}
            >
              <div
                className={`overflow-hidden flex-shrink-0 transition-all duration-700 ease-in-out ${scrolled ? "w-9 h-9 rounded-lg" : "w-[68px] h-[68px] rounded-xl"
                  }`}
              >
                <img
                  src="/logo4.png"
                  alt="logo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className={`text-white font-semibold tracking-tight transition-all duration-700 ease-in-out ${scrolled ? "text-[17px]" : "text-2xl"
                    }`}
                >
                  Esperly
                </span>
                <span className="text-white/60 text-[10px] tracking-wide">
                  Think. Learn. Excel.
                </span>
              </div>
            </div>

            {/* ── RIGHT: Nav + Actions ── */}
            <div className="flex items-center justify-end gap-3">

              {/* Desktop nav — visible when scrolled */}
              <div
                className={`hidden lg:flex items-center gap-1 transition-all duration-700 ease-in-out ${scrolled
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
              >
                <NavLink to="/" className={navLinkClass}>HUB</NavLink>

                {/* TUITIONS */}
                <DropdownNavItem id="tuitions" label="TUITIONS">
                  <TuitionsDropdown open={activeDropdown === "tuitions"} />
                </DropdownNavItem>

                {/* LEARNING BOOSTERS */}
                <DropdownNavItem id="boosters" label="LEARNING BOOSTERS">
                  <BoostersDropdown
                    open={activeDropdown === "boosters"}
                    items={learningBoosters}
                    pathPrefix="/boosters"
                  />
                </DropdownNavItem>

                {/* LANGUAGE TRACKS */}
                <DropdownNavItem id="language" label="LANGUAGE TRACKS">
                  <LanguageTracksDropdown open={activeDropdown === "language"} />
                </DropdownNavItem>

                {/* MORE */}
                <DropdownNavItem id="more" label="MORE">
                  <MoreDropdown
                    open={activeDropdown === "more"}
                    items={moreItems}
                  />
                </DropdownNavItem>
              </div>

              {/* Contact Us — hero only */}
              <span
                className={`text-white font-semibold text-xl hidden sm:block transition-all duration-700 ease-in-out cursor-pointer ${scrolled
                  ? "opacity-0 w-0 overflow-hidden pointer-events-none"
                  : "opacity-100 w-auto"
                  }`}
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </span>

              {/* Send Enquiry — scrolled desktop */}
              <button
                onClick={() => navigate("/contact")}
                className={`hidden lg:block px-5 py-2 rounded-full bg-white text-[#EB6664] font-semibold text-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-white/90 ${scrolled
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
              >
                SEND ENQUIRY
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className={`w-9 h-9 flex items-center justify-center bg-white/15 backdrop-blur-sm rounded-lg text-white hover:bg-white/25 transition-all duration-300 ${scrolled ? "lg:hidden" : "lg:flex"
                  }`}
              >
                <FiMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${mobileOpen ? "visible" : "invisible"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${mobileOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Drawer header */}
          <div className="flex justify-between items-center px-5 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EB6664] overflow-hidden flex-shrink-0">
                <img src="/logo4.png" alt="logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#EB6664] leading-tight">Esperly</h2>
                <p className="text-[10px] text-black tracking-wide">Think. Learn. Excel.</p>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-1">

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? "bg-[#EB6664]/10 text-[#EB6664]" : "text-gray-700 hover:bg-gray-50 hover:text-[#EB6664]"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                Hub
              </NavLink>

              {/* Mobile Tuitions accordion */}
              <MobileAccordion
                label="Tuitions"
                expanded={mobileExpanded === "tuitions"}
                onToggle={() => setMobileExpanded(mobileExpanded === "tuitions" ? null : "tuitions")}
              >
                {tuitionsMenu.map((group) => (
                  <div key={group.label}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-[#EB6664] transition-colors"
                      onClick={() => {
                        setMobileTuitionGroup(mobileTuitionGroup === group.label ? null : group.label);
                        setActiveGroup(group.label);
                        setActiveType(group.type);
                      }}
                    >
                      {group.label}
                      <FiChevronDown
                        size={12}
                        className={`transition-transform ${mobileTuitionGroup === group.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileTuitionGroup === group.label && (
                      <div className="pl-4 pb-1 flex flex-col gap-0.5">
                        {group.items.map((item) => (
                          <button
                            key={item}
                            className="text-left px-3 py-1.5 text-sm text-gray-600 hover:text-[#EB6664] hover:bg-[#EB6664]/5 rounded-lg transition-colors"
                            onClick={() => {
                              if (activeType !== 'course') {
                                goToTuition(activeGroup, item);
                                setMobileOpen(false);
                              } else {
                                navigate(`/course?label=${encodeURIComponent(activeGroup)}&type=course&item=${encodeURIComponent(item)}`);
                                setMobileOpen(false);
                              }
                            }}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </MobileAccordion>

              {/* Learning Boosters */}
              <MobileAccordion
                label="Learning Boosters"
                expanded={mobileExpanded === "boosters"}
                onToggle={() => setMobileExpanded(mobileExpanded === "boosters" ? null : "boosters")}
              >
                {learningBoosters.map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#EB6664] hover:bg-[#EB6664]/5 rounded-lg transition-colors"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate(`/booster/${item}`)
                    }}
                  >
                    {item}
                  </button>
                ))}
              </MobileAccordion>

              {/* Language Tracks - Mobile with nested accordion */}
              <MobileAccordion
                label="Language Tracks"
                expanded={mobileExpanded === "language"}
                onToggle={() => setMobileExpanded(mobileExpanded === "language" ? null : "language")}
              >
                {languageTracks.map((group) => (
                  <div key={group.label}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-[#EB6664] transition-colors"
                      onClick={() =>
                        setMobileLanguageGroup(mobileLanguageGroup === group.label ? null : group.label)
                      }
                    >
                      {group.label}
                      <FiChevronDown
                        size={12}
                        className={`transition-transform ${mobileLanguageGroup === group.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileLanguageGroup === group.label && (
                      <div className="pl-4 pb-1 flex flex-col gap-0.5">
                        {group.items.map((item) => (
                          <button
                            key={item}
                            className="text-left px-3 py-1.5 text-sm text-gray-600 hover:text-[#EB6664] hover:bg-[#EB6664]/5 rounded-lg transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </MobileAccordion>

              {/* More section */}
              <div className="mt-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-4 mb-2">
                  More
                </p>
                <div className="flex flex-col gap-1">
                  {moreItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                          ? "bg-[#EB6664]/10 text-[#EB6664]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#EB6664]"
                        }`
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="px-5 py-5 border-t border-gray-100">
            <button
              onClick={() => {
                navigate("/contact");
                setMobileOpen(false);
              }}
              className="w-full py-3 bg-[#EB6664] text-white rounded-xl font-semibold text-sm hover:bg-[#C05656] active:scale-[0.98] transition-all duration-200 shadow-md"
            >
              Send Enquiry
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

// ─── MOBILE ACCORDION HELPER ─────────────────────────────────────────────────

const MobileAccordion = ({ label, expanded, onToggle, children }) => (
  <div>
    <button
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${expanded ? "bg-[#EB6664]/10 text-[#EB6664]" : "text-gray-700 hover:bg-gray-50 hover:text-[#EB6664]"
        }`}
      onClick={onToggle}
    >
      {label}
      <FiChevronDown
        size={14}
        className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      />
    </button>
    {expanded && (
      <div className="ml-3 mt-1 mb-1 border-l-2 border-[#EB6664]/20 pl-2 flex flex-col gap-0.5">
        {children}
      </div>
    )}
  </div>
);

export default Navbar;