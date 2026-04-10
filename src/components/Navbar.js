import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import EnrollModal from "../modals/EnrollModal";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const navigate = useNavigate();

  /* Lock body scroll when mobile overlay is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 bg-[#A6192E] transition-shadow duration-300"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] sm:h-[68px] flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
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

            {/* Send Enquiry Button */}
            <button
              onClick={() => setEnrollOpen(true)}
              className="ml-2 relative overflow-hidden px-5 py-2 rounded-full font-semibold text-sm text-[#A6192E] bg-white shadow-lg shadow-black/20 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-3/5 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-all before:duration-700 hover:before:left-full"
            >
              SEND ENQUIRY
            </button>
          </div>

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
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMobile}
          />

          {/* Drawer */}
          <aside
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
          </aside>
        </div>
      )}

      <EnrollModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </>
  );
};

export default Navbar;