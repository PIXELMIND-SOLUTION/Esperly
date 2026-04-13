import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

/* ───────── SOCIAL BUTTON (BRAND HOVER) ───────── */
const SocialBtn = ({ icon: Icon, type }) => {
  const colors = {
    facebook: "hover:bg-[#1877F2]",
    instagram: "hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500",
    linkedin: "hover:bg-[#0077B5]",
  };

  return (
    <a
      href="#"
      className={`w-10 h-10 flex items-center justify-center rounded-md 
      bg-white/10 border border-white/20 text-white 
      transition-all duration-300 ${colors[type]}`}
    >
      <Icon size={16} />
    </a>
  );
};

/* ───────── LINK ───────── */
const FooterLink = ({ children }) => (
  <a
    href="#"
    className="block text-white/70 hover:text-white text-sm mb-2 transition"
  >
    {children}
  </a>
);

/* ───────── MAIN FOOTER ───────── */
const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="bg-[#A6192E] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">

        {/* EVEN GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* COLUMN 1 (BRAND) */}
          <div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 rounded-lg overflow-hidden shadow">
                <img src="/logo4.png" alt="logo" />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-xl text-white font-semibold">Esperly</span>
                <span className="text-[10px] text-white/80">
                  Think. Learn. Excel.
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mb-6 mt-2">
              <SocialBtn icon={BsFacebook} type="facebook" />
              <SocialBtn icon={BsInstagram} type="instagram" />
              <SocialBtn icon={BsLinkedin} type="linkedin" />
            </div>

            {/* Address */}
            <p className="text-sm text-white/70 leading-relaxed">
              © 2026 Esperly <br />
              Hyderabad, India
            </p>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">
              THE COMPANY
            </h4>
            <FooterLink>Who we are</FooterLink>
            <FooterLink>In the media</FooterLink>
            <FooterLink>Partners</FooterLink>
            <FooterLink>Privacy & Legal</FooterLink>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">
              PRIVATE TUITION
            </h4>
            <FooterLink>What we do</FooterLink>
            <FooterLink>How we recruit tutors</FooterLink>
            <FooterLink>Special needs</FooterLink>
            <FooterLink>FAQs</FooterLink>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">
              CLIENT EXPERIENCE
            </h4>
            <FooterLink>Testimonials</FooterLink>
            <FooterLink>Case studies</FooterLink>
            <FooterLink>Placements</FooterLink>
            <FooterLink>Refer a friend</FooterLink>
          </div>

          {/* COLUMN 5 */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">
              FOR CLIENTS
            </h4>
            <FooterLink>Make an enquiry</FooterLink>
            <FooterLink>Contact details</FooterLink>            
            <FooterLink>Our site for tutors</FooterLink>
            <FooterLink>Current vacancies</FooterLink>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;