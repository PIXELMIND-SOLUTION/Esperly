import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { BsGeoAlt, BsEnvelopeFill, BsPersonLinesFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HERO_IMG from "../../assets/Contact/contactus.png"; // update to your hero image path

/* ───────── DATA ───────── */
const INFO = [
  {
    icon: BsGeoAlt,
    title: "Our Location",
    lines: [
      { text: "123 Esperly Lane" },
      { text: "Tech City, TC 12345" },
      { text: "India" },
    ],
  },
  {
    icon: BsEnvelopeFill,
    title: "Email Us",
    lines: [
      { text: "hello@esperly.com", href: "mailto:hello@esperly.com" },
      { text: "support@esperly.com", href: "mailto:support@esperly.com" },
    ],
  },
  {
    icon: BsPersonLinesFill,
    title: "Call Us",
    lines: [
      { text: "+91 12345 67890", href: "tel:+911234567890" },
      { text: "Mon–Fri, 9am – 6pm IST" },
    ],
  },
];

/* ───────── FADE-IN WRAPPER ───────── */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5% 0px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ───────── PHONE INPUT STYLES ───────── */
const phoneStyles = `
  .phone-field .react-tel-input { width: 100%; }
  .phone-field .react-tel-input .form-control {
    width: 100%;
    height: 48px;
    background: #fff;
    border: 1px solid #EB6664;
    border-radius: 12px;
    padding-left: 58px;
    font-size: 14px;
    color: #000;
    box-shadow: none;
    transition: box-shadow .2s ease;
  }
  .phone-field .react-tel-input .form-control:focus {
    border-color: #EB6664;
    box-shadow: 0 0 0 2px rgba(235, 102, 100, 0.3);
  }
  .phone-field .react-tel-input .flag-dropdown {
    background: transparent;
    border: none;
    border-radius: 12px 0 0 12px;
  }
  .phone-field .react-tel-input .flag-dropdown.open {
    background: transparent;
    border-radius: 12px 0 0 12px;
  }
  .phone-field .react-tel-input .selected-flag {
    background: transparent !important;
    border-radius: 12px 0 0 12px;
    padding: 0 8px 0 14px;
  }
  .phone-field .react-tel-input .country-list {
    border-radius: 12px;
    border: 1px solid rgba(235, 102, 100, 0.25);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
  }
  .phone-field .react-tel-input .country-list .country:hover { background: rgba(235, 102, 100, 0.08); }
  .phone-field .react-tel-input .country-list .country.highlight { background: rgba(235, 102, 100, 0.15); }
  .phone-field.has-error .react-tel-input .form-control { border-color: #ef4444; }
  @media (min-width: 640px) {
    .phone-field .react-tel-input .form-control { height: 52px; font-size: 15px; }
  }
`;

const Contact = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [phone, setPhone] = useState("");

  const scrollToForm = (e) => {
    e.preventDefault();
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (formData.phone.length < 7)
      newErrors.phone = "Please enter a valid phone number";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: replace with your API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setPhone("");
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field) =>
    `w-full rounded-xl border bg-white px-4 text-sm sm:text-[15px] text-black outline-none
     transition focus:ring-2 focus:ring-[#EB6664]/30 ${
       errors[field] ? "border-red-500" : "border-[#EB6664]"
     }`;

  const labelClass = "block mb-1.5 text-sm font-medium text-[#EB6664]";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <>
      <Header onOpenModal={() => setOpenModal(true)} />

      <main className="font-['Poppins',sans-serif] bg-[#FCF4F0] overflow-x-hidden">
        <style>{phoneStyles}</style>

        {/* ═════════ HERO ═════════ */}
        <section className="relative w-full flex items-end overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]">
          <img
            src={HERO_IMG}
            alt="Student learning online with headphones"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center"
          />
          {/* dark overlay keeps the white text readable on the photo */}
          <div className="absolute inset-0 bg-black/50 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/40 sm:to-black/10" />

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8 sm:pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#EB6664] shadow-sm">
                Contact Us
              </span>

              <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                We&apos;d Love to{" "}
                <span className="text-[#F8D5D1]">Hear From You</span>
              </h1>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-white/85 max-w-lg">
                Questions about our programs, tutors, or learning plans? Our team
                is ready to help and typically responds within 24 hours.
              </p>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 max-w-xs sm:max-w-none">
                <a
                  href="#contact-form"
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EB6664] px-6 py-2.5 sm:py-3
                             text-sm md:text-base font-semibold text-white shadow-sm transition hover:bg-[#d95755]"
                >
                  Send a Message <FiArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/60 bg-white/10 px-6 py-2.5 sm:py-3
                             text-sm md:text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <FiPhone className="h-4 w-4 md:h-5 md:w-5" />
                  Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ═════════ INTRO ═════════ */}
          <section className="pt-8 md:pt-12">
            <Reveal>
              <span className="inline-block rounded-lg bg-[#F8D5D1] px-3 py-1 text-sm sm:text-base md:text-lg font-medium text-[#EB6664]">
                Contact Us
              </span>

              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black">
                Start the <span className="text-[#EB6664]">Conversation</span>
              </h2>

              <p className="mt-3 md:mt-4 max-w-[1100px] text-sm sm:text-base md:text-lg leading-relaxed text-black/85">
                Have questions about our programs, tutors, or learning plans? Our
                team is here to help. Reach out to us, and we&apos;ll guide you in
                finding the right learning path for your child.
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-6 md:mt-8 flex justify-center">
              <p className="rounded-xl border border-[#EB6664] px-4 py-2.5 sm:px-8 sm:py-3 text-center text-sm sm:text-base md:text-xl text-[#EB6664]">
                Submit your details below, and we&apos;ll reach out to help you get
                started with Esperly.
              </p>
            </Reveal>
          </section>

          {/* ═════════ CORAL PANEL ═════════ */}
          <Reveal className="mt-10 md:mt-14 pb-10 md:pb-12">
            <div
              id="contact-form"
              className="scroll-mt-24 rounded-2xl bg-[#EF918C] p-5 sm:p-8 lg:p-10"
            >
              <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold leading-tight text-white">
                Ready to Unlock Your Child&apos;s Full Potential?
              </h2>

              <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-12 items-start">
                {/* ── Left: intro + info cards ── */}
                <div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 max-w-[500px]">
                    At Esperly, we combine academic excellence, creative learning,
                    and personalized guidance to help every student grow with
                    confidence. Join us and start your journey toward success
                    today.
                  </p>

                  <div className="mt-5 space-y-3 sm:space-y-4">
                    {INFO.map(({ icon: Icon, title, lines }) => (
                      <div
                        key={title}
                        className="flex items-start gap-4 sm:gap-5 rounded-2xl bg-white px-5 sm:px-8 py-4 sm:py-5
                                   transition-shadow duration-300 hover:shadow-md"
                      >
                        <Icon className="mt-1 h-5 w-5 shrink-0 text-[#EB6664]" />
                        <div className="min-w-0">
                          <h3 className="text-base md:text-lg font-medium text-black">
                            {title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-black/85 break-words">
                            {lines.map((l, i) =>
                              l.href ? (
                                <a
                                  key={i}
                                  href={l.href}
                                  className="block transition-colors hover:text-[#EB6664]"
                                >
                                  {l.text}
                                </a>
                              ) : (
                                <span key={i} className="block">
                                  {l.text}
                                </span>
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right: form ── */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl bg-white p-5 sm:p-7 lg:max-w-[560px] lg:ml-auto w-full shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name :
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${fieldClass("name")} h-11 sm:h-12 lg:h-[52px]`}
                      />
                      {errors.name && <p className={errorClass}>✗ {errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address :
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${fieldClass("email")} h-11 sm:h-12 lg:h-[52px]`}
                      />
                      {errors.email && <p className={errorClass}>✗ {errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={labelClass}>Contact Number :</label>
                      <div className={`phone-field ${errors.phone ? "has-error" : ""}`}>
                        <PhoneInput
                          country="in"
                          value={phone}
                          onChange={handlePhoneChange}
                          preferredCountries={["in", "us", "gb", "au", "ca"]}
                          enableSearch
                          searchPlaceholder="Search country..."
                          autoFormat
                        />
                      </div>
                      {errors.phone && <p className={errorClass}>✗ {errors.phone}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Your Message :
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`${fieldClass("message")} py-3 resize-none sm:min-h-[110px]`}
                      />
                      {errors.message && <p className={errorClass}>✗ {errors.message}</p>}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 sm:mt-8 flex h-12 sm:h-14 w-full items-center justify-center gap-2 rounded-xl
                               bg-[#EB6664] text-sm sm:text-base font-medium text-white transition
                               hover:bg-[#d95755] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Get Started Today <FiArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-black/50">
                    We respect your privacy and will never share your details.
                  </p>

                  {/* Status messages */}
                  <div aria-live="polite">
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-center"
                      >
                        <p className="text-xs sm:text-sm text-green-700">
                          ✓ Message sent! We&apos;ll respond within 24 hours.
                        </p>
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center"
                      >
                        <p className="text-xs sm:text-sm text-red-600">
                          ✗ Something went wrong. Please try again.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
      <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Contact;