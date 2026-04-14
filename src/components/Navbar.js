import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import EnrollModal from "../modals/EnrollModal";

const navItems = [
  { label: "TUITIONS", path: "/tuitions" },
  { label: "LEARNING BOOSTERS", path: "/boosters" },
  { label: "LANGUAGE TRACKS", path: "/language" },
];

const moreItems = [
  { label: "About Us", path: "/aboutus" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef();
  const isScrolledRef = useRef(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
      ? "text-white bg-white/20"
      : "text-white/90 hover:text-white hover:bg-white/15"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${scrolled
            ? "h-[70px] bg-[#EB6664] backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.18)]"
            : "h-[200px] bg-transparent border-none shadow-none"
          }`}
      >
        {/* Glass overlay — fades in independently */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none bg-[#EB6664]/75 backdrop-blur-xl backdrop-saturate-150 ${scrolled ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* ── SINGLE INNER LAYOUT ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
          <div className="flex items-center justify-between transition-all duration-700 ease-in-out">

            {/* ── LEFT: LOGO ── */}
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

              <div className="flex flex-col leading-tight overflow-hidden">
                <span
                  className={`text-white font-semibold tracking-tight transition-all duration-700 ease-in-out ${scrolled ? "text-[17px]" : "text-2xl"
                    }`}
                >
                  Esperly
                </span>
                <span
                  className={`text-white/60 text-[10px] tracking-wide transition-all duration-500 ease-in-out overflow-hidden`}
                >
                  Think. Learn. Excel.
                </span>
              </div>
            </div>

            {/* ── CENTER: Desktop nav links (scrolled only) ── */}
            <div
              className={`hidden lg:flex items-center gap-1 transition-all duration-700 ease-in-out ${scrolled
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-3 pointer-events-none"
                }`}
            >
              <NavLink to="/" className={navLinkClass}>HUB</NavLink>
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}

              {/* MORE dropdown */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15 rounded-full transition-all duration-300"
                >
                  MORE
                  <FiChevronDown
                    className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""
                      }`}
                    size={14}
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg py-2 z-50 transition-all duration-200 ${moreOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                    }`}
                >
                  {moreItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#A6192E]/10 hover:text-[#A6192E] transition-colors"
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Actions ── */}
            <div className="flex items-center justify-end gap-3">

              {/* Site name — hero only, desktop */}
              <span
                className={`text-white font-semibold text-xl hidden sm:block transition-all duration-700 ease-in-out ${scrolled
                    ? "opacity-0 w-0 overflow-hidden pointer-events-none"
                    : "opacity-100 w-auto"
                  }`}
              >
                Contact Us
              </span>

              {/* Enquiry button — scrolled desktop only */}
              <button
                onClick={() => setEnrollOpen(true)}
                className={`hidden lg:block px-5 py-2 rounded-full bg-white text-[#A6192E] font-semibold text-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-white/90 ${scrolled
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
              >
                SEND ENQUIRY
              </button>

              {/* Hamburger — always visible on ALL screen sizes */}
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

      {/* ── SIDEBAR DRAWER — works for ALL screen sizes ── */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${mobileOpen ? "visible" : "invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${mobileOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Drawer header */}
          <div className="flex justify-between items-center px-5 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                <img src="/logo4.png" alt="logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#A6192E] leading-tight">Esperly</h2>
                <p className="text-[10px] text-gray-400 tracking-wide">Think. Learn. Excel.</p>
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
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-[#A6192E]/10 text-[#A6192E]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#A6192E]"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                Hub
              </NavLink>

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-[#A6192E]/10 text-[#A6192E]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#A6192E]"
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}

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
                          ? "bg-[#A6192E]/10 text-[#A6192E]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#A6192E]"
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

          {/* CTA at bottom */}
          <div className="px-5 py-5 border-t border-gray-100">
            <button
              onClick={() => {
                setEnrollOpen(true);
                setMobileOpen(false);
              }}
              className="w-full py-3 bg-[#A6192E] text-white rounded-xl font-semibold text-sm hover:bg-[#8B1527] active:scale-[0.98] transition-all duration-200 shadow-md"
            >
              Send Enquiry
            </button>
          </div>
        </aside>
      </div>

      <EnrollModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </>
  );
};

export default Navbar;