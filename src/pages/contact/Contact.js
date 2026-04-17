import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";
import Header from "../../components/Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

  const formRef = useRef(null);
  const inView = useInView(formRef, { once: true, margin: "-8% 0px" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value, countryData) => {
    setPhone(value);
    setFormData(prev => ({ ...prev, phone: value }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (formData.phone.length < 7) newErrors.phone = "Please enter a valid phone number";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
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

  const inputClass = (field) =>
    `w-full bg-transparent text-sm sm:text-base text-[#1C1209] outline-none border-b transition-all py-2 ${
      errors[field]
        ? "border-[#EB6664] focus:border-[#EB6664]"
        : "border-[#EB6664]/20 focus:border-[#EB6664]/60"
    }`;

  return (
    <>
      <Header onOpenModal={() => setOpenModal(true)} />
      <NavImage />

      <section className="relative overflow-hidden bg-[#FBF7F2] py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs - hidden on mobile */}
        <div className="hidden sm:block absolute top-20 right-10 w-32 h-32 rounded-full bg-[#EB6664]/5 blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#3B6FA0]/5 blur-3xl pointer-events-none" />
        <div className="hidden lg:block absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-[#2E7D52]/5 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 sm:w-8 h-px bg-[#EB6664]/50" />
              <span className="text-xs sm:text-sm font-semibold text-[#EB6664] tracking-wider uppercase">
                Get in Touch
              </span>
              <div className="w-6 sm:w-8 h-px bg-[#EB6664]/50" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1209] mb-3 sm:mb-4 px-4">
              Let's{" "}
              <span className="text-[#EB6664] italic">Connect</span>
            </h2>

            <p className="text-sm sm:text-base text-[#7A6E5A] max-w-2xl mx-auto px-4">
              Have a question or need a little guidance? We're here for you! Whether it's choosing the
              right course, finding the perfect tutor, or just clarifying your doubts, our team is ready to help.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-6 px-4">
              <span className="px-3 py-1.5 sm:py-1 border border-[#EB6664]/30 rounded-full text-xs sm:text-sm text-[#EB6664]/70 text-center">
                Fill out the form below, and we'll get back to you quickly—because at Esperly, your learning journey matters to us!
              </span>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left — Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4 sm:space-y-6 px-4 sm:px-0"
            >
              {[
                {
                  icon: "📍",
                  title: "Our Location",
                  content: (
                    <>123 Esperly Lane<br />Tech City, TC 12345<br />India</>
                  ),
                },
                {
                  icon: "@",
                  title: "Email Us",
                  content: (
                    <>hello@esperly.com<br />support@esperly.com</>
                  ),
                },
                {
                  icon: "☎",
                  title: "Call Us",
                  content: (
                    <>+91 12345 67890<br />Mon–Fri, 9am – 6pm IST</>
                  ),
                },
              ].map(({ icon, title, content }) => (
                <div
                  key={title}
                  className="bg-[#FCFAF5] border border-[#EB6664]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl">{icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1C1209] text-base sm:text-lg mb-1 sm:mb-2">{title}</h3>
                      <p className="text-xs sm:text-sm text-[#7A6E5A] leading-relaxed">{content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-[#FCFAF5] border border-[#EB6664]/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg relative overflow-hidden mx-4 sm:mx-0">
                {/* Corner decoration - hidden on mobile */}
                <div className="hidden sm:block absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#EB6664]/5 rotate-45 translate-x-8 -translate-y-8" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                      Full Name <span className="text-[#EB6664]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p className="text-[#EB6664] text-xs mt-1">✗ {errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                      Email Address <span className="text-[#EB6664]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hello@esperly.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-[#EB6664] text-xs mt-1">✗ {errors.email}</p>
                    )}
                  </div>

                  {/* Phone with country code */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                      Contact Number <span className="text-[#EB6664]">*</span>
                    </label>
                    <div className={`transition-all ${
                      errors.phone ? "border-red-500" : ""
                    }`}>
                      <style jsx global>{`
                        .phone-input-container {
                          width: 100%;
                        }
                        .phone-input-container .react-tel-input {
                          width: 100%;
                        }
                        .phone-input-container .react-tel-input .form-control {
                          width: 100%;
                          height: 44px;
                          background: transparent;
                          border: none;
                          border-bottom: 2px solid rgba(235, 102, 100, 0.2);
                          border-radius: 0;
                          padding-left: 58px;
                          font-size: 14px;
                          color: #1C1209;
                          transition: all 0.3s ease;
                        }
                        .phone-input-container .react-tel-input .form-control:focus {
                          border-bottom-color: rgba(235, 102, 100, 0.6);
                          box-shadow: none;
                        }
                        .phone-input-container .react-tel-input .flag-dropdown {
                          background: transparent;
                          border: none;
                          border-bottom: 2px solid rgba(235, 102, 100, 0.2);
                          border-radius: 0;
                          top: 0;
                        }
                        .phone-input-container .react-tel-input .flag-dropdown.open {
                          background: #FCFAF5;
                          border-color: rgba(235, 102, 100, 0.6);
                        }
                        .phone-input-container .react-tel-input .selected-flag {
                          background: transparent !important;
                          padding: 0 8px 0 12px;
                        }
                        .phone-input-container .react-tel-input .country-list {
                          background: #FCFAF5;
                          border: 1px solid rgba(235, 102, 100, 0.15);
                          border-radius: 12px;
                          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                        }
                        .phone-input-container .react-tel-input .country-list .country {
                          padding: 8px 12px;
                        }
                        .phone-input-container .react-tel-input .country-list .country:hover {
                          background: rgba(235, 102, 100, 0.05);
                        }
                        .phone-input-container .react-tel-input .country-list .country.highlight {
                          background: rgba(235, 102, 100, 0.1);
                        }
                        @media (max-width: 640px) {
                          .phone-input-container .react-tel-input .form-control {
                            height: 40px;
                            font-size: 13px;
                            padding-left: 52px;
                          }
                          .phone-input-container .react-tel-input .selected-flag {
                            padding: 0 6px 0 10px;
                          }
                        }
                      `}</style>
                      <div className="phone-input-container">
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={handlePhoneChange}
                          inputClass="!w-full"
                          containerClass="!w-full"
                          preferredCountries={['in', 'us', 'gb', 'au', 'ca']}
                          enableSearch={true}
                          searchPlaceholder="Search country..."
                          autoFormat={true}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-[#EB6664] text-xs mt-1">✗ {errors.phone}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                      Your Message <span className="text-[#EB6664]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Write your message here..."
                      className={`${inputClass("message")} resize-y`}
                    />
                    {errors.message && (
                      <p className="text-[#EB6664] text-xs mt-1">✗ {errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#EB6664] text-white font-semibold py-3 sm:py-3.5 rounded-xl hover:bg-[#EB6664]/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 sm:mt-6 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT</span>
                        <span>→</span>
                      </>
                    )}
                  </button>

                  {/* Status messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 text-center bg-green-50 border border-green-200 rounded-xl"
                    >
                      <p className="text-green-700 text-xs sm:text-sm">
                        ✓ Message sent! We'll respond within 24 hours.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 text-center bg-red-50 border border-red-200 rounded-xl"
                    >
                      <p className="text-red-600 text-xs sm:text-sm">
                        ✗ Something went wrong. Please try again.
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Contact;