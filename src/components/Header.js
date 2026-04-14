import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import EnrollModal from "../modals/EnrollModal";

/* ─── Nav Items ───────────────── */
const navItems = [
  { label: "TUITIONS", path: "/tuitions" },
  { label: "LEARNING BOOSTERS", path: "/boosters" },
  { label: "LANGUAGE TRACKS", path: "/language" },
];

/* ─── MORE Items ──────────────── */
const moreItems = [
  { label: "About Us", path: "/aboutus" },
  { label: "Courses", path: "/courses" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  /* Close dropdown outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold transition ${isActive
      ? "text-white bg-white/20"
      : "text-white/90 hover:text-white hover:bg-white/15"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center font-semibold px-4 py-3 rounded-lg text-sm transition ${isActive
      ? "bg-[#A6192E]/10 text-[#A6192E]"
      : "text-gray-700 hover:bg-[#A6192E]/10 hover:text-[#A6192E]"
    }`;

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#EB6664]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/logo4.png" className="w-8 h-8" />
            <span className="text-white text-xl">Esperly</span>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-2">

            <NavLink to="/" className={navLinkClass}>HUB</NavLink>

            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {/* MORE DROPDOWN */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15 rounded-full"
              >
                MORE
                <FiChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${moreOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${moreOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible"
                  }`}
              >
                {moreItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#A6192E]/10 hover:text-[#A6192E]"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => setEnrollOpen(true)}
              className="ml-2 px-5 py-2 rounded-full text-sm text-[#EB6664] bg-white font-semibold"
            >
              SEND ENQUIRY
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* ── SIDEBAR DRAWER ── */}
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
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-[#EB6664]/10 text-[#EB6664]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#EB6664]"
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
                      ? "bg-[#EB6664]/10 text-[#EB6664]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#EB6664]"
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

          {/* CTA at bottom */}
          <div className="px-5 py-5 border-t border-gray-100">
            <button
              onClick={() => {
                setEnrollOpen(true);
                setMobileOpen(false);
              }}
              className="w-full py-3 bg-[#EB6664] text-white rounded-xl font-semibold text-sm hover:bg-[#C05656] active:scale-[0.98] transition-all duration-200 shadow-md"
            >
              Send Enquiry
            </button>
          </div>
        </aside>
      </div>

      <EnrollModal
        isOpen={enrollOpen}
        onClose={() => setEnrollOpen(false)}
      />
    </>
  );
};

export default Header;