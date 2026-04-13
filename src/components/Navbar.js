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

  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close dropdown on outside click */
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
    `px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
      isActive
        ? "text-white bg-white/20"
        : "text-white/90 hover:text-white hover:bg-white/15"
    }`;

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#A6192E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[65px] flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden">
              <img src="/logo4.png" alt="logo" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-xl text-white font-semibold">Esperly</span>
              <span className="text-[10px] text-white/80"> {/* [#000000]/70 font-medium tracking-wide bg-white px-1 rounded */}
                Think. Learn. Excel.
              </span>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2">

            <NavLink to="/" className={navLinkClass}>HUB</NavLink>

            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {/* 🔥 HOVER DROPDOWN */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/15 rounded-full"
              >
                MORE
                <FiChevronDown
                  className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
                  size={14}
                />
              </button>

              {/* DROPDOWN */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 transition-all duration-200 ${
                  moreOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 translate-y-2 invisible"
                }`}
              >
                {moreItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#A6192E]/10"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => setEnrollOpen(true)}
              className="ml-2 px-5 py-2 rounded-full bg-white text-[#A6192E] font-semibold text-sm"
            >
              SEND ENQUIRY
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center bg-white/20 rounded-lg text-white"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white p-5">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-[#A6192E]">Esperly</h2>
                <p className="text-xs text-gray-500">Think. Learn. Excel.</p>
              </div>

              <button onClick={() => setMobileOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-2">

              <NavLink to="/" className="py-2" onClick={() => setMobileOpen(false)}>
                Hub
              </NavLink>

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}

              {/* MOBILE DROPDOWN */}
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-500 mb-2">More</p>
                <div className="bg-gray-50 rounded-lg p-2">
                  {moreItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="block py-2 px-2 text-sm hover:bg-[#A6192E]/10 rounded-md"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => {
                setEnrollOpen(true);
                setMobileOpen(false);
              }}
              className="mt-6 w-full py-3 bg-[#A6192E] text-white rounded-lg"
            >
              Send Enquiry
            </button>
          </aside>
        </div>
      )}

      <EnrollModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </>
  );
};

export default Navbar;