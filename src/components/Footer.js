import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CORAL = "#EB6664";

/* ───────── SOCIAL BUTTON ───────── */
const SocialBtn = ({ icon: Icon, label }) => (
  <a
    href="#"
    aria-label={label}
    className="w-10 h-10 flex items-center justify-center rounded-lg
               bg-[#EB6664]/15 text-[#EB6664]
               transition-all duration-300
               hover:bg-[#EB6664] hover:text-white"
  >
    <Icon size={16} />
  </a>
);

/* ───────── FOOTER LINK ───────── */
const FooterLink = ({ children }) => (
  <a
    href="#"
    className="block text-[13px] text-gray-800 mb-4 transition-colors hover:text-[#EB6664]"
  >
    {children}
  </a>
);

/* ───────── COLUMN ───────── */
const Column = ({ title, links }) => (
  <div>
    <h4 className="text-[13px] font-medium uppercase tracking-wide text-gray-900 mb-5">
      {title}
    </h4>
    {links.map((l) => (
      <FooterLink key={l}>{l}</FooterLink>
    ))}
  </div>
);

const columns = [
  {
    title: "The Company",
    links: ["Who we are", "In the media", "Partners", "Privacy & Legal"],
  },
  {
    title: "Private Tuition",
    links: ["What we do", "How we recruit tutors", "Special needs", "FAQs"],
  },
  {
    title: "Client Experience",
    links: ["Testimonials", "Case studies", "Placements", "Refer a friend"],
  },
  {
    title: "For Clients",
    links: [
      "Make an enquiry",
      "Contact details",
      "Our site for tutors",
      "Current vacancies",
    ],
  },
];

/* ───────── MAIN FOOTER ───────── */
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-white">
      {/* ── TOP (WHITE) SECTION ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-6 md:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          {/* BRAND */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div
              className="inline-flex flex-col cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <img
                    src="/logo1.png"
                    alt="Esperly logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className="text-2xl font-semibold leading-none"
                  style={{ color: CORAL }}
                >
                  Esperly
                </span>
              </div>
              <span className="text-[10px] text-gray-800 mt-1">
                Think. Learn. Excel.
              </span>
            </div>

            <div className="flex gap-3 mt-5">
              <SocialBtn icon={BsFacebook} label="Facebook" />
              <SocialBtn icon={BsInstagram} label="Instagram" />
              <SocialBtn icon={BsLinkedin} label="LinkedIn" />
            </div>
          </div>

          {/* LINK COLUMNS */}
          {columns.map((c) => (
            <Column key={c.title} title={c.title} links={c.links} />
          ))}
        </div>
      </div>

      {/* ── CURVED WAVE ── */}
      <div className="relative -mt-px leading-[0]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-full h-[50px] sm:h-[80px] md:h-[110px]"
          aria-hidden="true"
        >
          <path
            d="M0,0 C380,130 1060,130 1440,0 L1440,121 L0,121 Z"
            fill={CORAL}
          />
        </svg>
      </div>

      {/* ── BOTTOM (CORAL) SECTION ── */}
      <div
        className="px-6 pb-8 -mt-px text-center text-white"
        style={{ backgroundColor: CORAL }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-1 text-[11px] text-white/90">
          <a href="#" className="hover:text-white hover:underline">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-white hover:underline">Terms &amp; Conditions</a>
          <span>·</span>
          <a href="#" className="hover:text-white hover:underline">Cookie Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-white hover:underline">Support</a>
          <span>.</span>
        </div>

        <p className="mt-4 text-[11px] text-white/90">
          Licence by Esperly · All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;