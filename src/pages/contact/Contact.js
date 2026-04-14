import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";
import Header from "../../components/Header";

/* ─── SVG DECORATIONS ────────────────────────────────────────── */

/* Compass/Geometry Tool SVG */
const CompassSVG = ({ size = 80, rotate = 0, style = {} }) => (
    <svg
        width={size} height={size}
        viewBox="0 0 40 40"
        fill="none"
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
        <circle cx="20" cy="20" r="18" stroke="#EB6664" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
        <line x1="20" y1="20" x2="20" y2="4" stroke="#EB6664" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="20" x2="36" y2="20" stroke="#EB6664" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2" fill="#EB6664" opacity="0.6" />
        <path d="M20 4 L17 10 L20 12 L23 10 Z" fill="#EB6664" opacity="0.5" />
    </svg>
);

/* Protractor SVG */
const ProtractorSVG = ({ size = 100, rotate = 10, style = {} }) => (
    <svg
        width={size} height={size * 0.6}
        viewBox="0 0 60 35"
        fill="none"
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
        <path d="M5 30 Q30 5 55 30" stroke="#EB6664" strokeWidth="1.2" fill="none" opacity="0.4" />
        <line x1="5" y1="30" x2="55" y2="30" stroke="#EB6664" strokeWidth="1" opacity="0.3" />
        <circle cx="30" cy="30" r="2" fill="#EB6664" opacity="0.5" />
        <line x1="30" y1="30" x2="30" y2="12" stroke="#EB6664" strokeWidth="0.8" opacity="0.4" />
    </svg>
);

/* Graph Paper Grid Component */
const GraphPaperGrid = ({ size = 20, majorEvery = 5 }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Minor grid lines */}
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <pattern id="minorGrid" width={size} height={size} patternUnits="userSpaceOnUse">
                        <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="#EB6664" strokeWidth="0.4" opacity="0.12" />
                    </pattern>
                    <pattern id="majorGrid" width={size * majorEvery} height={size * majorEvery} patternUnits="userSpaceOnUse">
                        <rect width={size * majorEvery} height={size * majorEvery} fill="url(#minorGrid)" />
                        <path d={`M ${size * majorEvery} 0 L 0 0 0 ${size * majorEvery}`} fill="none" stroke="#EB6664" strokeWidth="0.8" opacity="0.25" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#majorGrid)" />
            </svg>
        </div>
    );
};

/* Ruler SVG */
const RulerSVG = ({ width = 120, height = 20, rotate = -5, style = {} }) => (
    <svg
        width={width} height={height}
        viewBox="0 0 120 20"
        fill="none"
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
        <rect x="2" y="2" width="116" height="16" rx="1" fill="#F5E6D3" stroke="#EB6664" strokeWidth="0.8" opacity="0.7" />
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(x => (
            <g key={x}>
                <line x1={x + 6} y1="4" x2={x + 6} y2={x % 20 === 0 ? "16" : "10"} stroke="#EB6664" strokeWidth="0.6" opacity="0.5" />
                {x % 20 === 0 && x > 0 && x < 100 && (
                    <text x={x + 4} y="14" fontSize="4" fill="#EB6664" opacity="0.5" fontFamily="monospace">{x / 10}</text>
                )}
            </g>
        ))}
    </svg>
);

/* Graph Paper Corner Fold Effect */
const CornerFold = () => (
    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-[3]">
        <svg width="64" height="64" viewBox="0 0 64 64">
            <path d="M64 0 L64 64 L0 64 Z" fill="rgba(166,25,46,0.06)" />
            <path d="M64 0 L64 64 L0 64 Z" fill="none" stroke="#EB6664" strokeWidth="0.5" opacity="0.2" />
            <path d="M58 64 L64 58" stroke="#EB6664" strokeWidth="0.5" opacity="0.15" />
        </svg>
    </div>
);

/* Calculator Button SVG */
const CalculatorButtons = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ opacity: 0.15 }}>
        <rect x="5" y="5" width="30" height="30" rx="2" fill="none" stroke="#EB6664" strokeWidth="1" />
        {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
                <rect key={`${row}-${col}`} x={8 + col * 10} y={12 + row * 8} width="6" height="4" fill="#EB6664" opacity="0.3" />
            ))
        )}
    </svg>
);

const UnevenGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <pattern
            id="unevenGrid"
            width="100"   // ⬅️ increased size
            height="100"  // ⬅️ increased size
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <path
              d="M0 25 Q50 30 100 25"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
            <path
              d="M0 75 Q50 70 100 75"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />

            {/* Vertical lines */}
            <path
              d="M25 0 Q30 50 25 100"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
            <path
              d="M75 0 Q70 50 75 100"
              stroke="#1C1209"
              strokeWidth="0.7"
              opacity="0.2"
              fill="none"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#unevenGrid)" />
      </svg>
    </div>
  );
};

/* ─── CONTACT FORM COMPONENT ────────────────────────────────────────── */
const Contact = () => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const formRef = useRef(null);
    const inView = useInView(formRef, { once: true, margin: "-8% 0px" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[\d\s+\-()]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Form submitted:", formData);
            setSubmitStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header onOpenModal={() => setOpenModal(true)} />
            <NavImage />
            <section className="relative overflow-hidden"
                style={{
                    backgroundColor: "#FBF7F2",
                    padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
                }}
            >
                {/* Graph Paper Grid Background */}
                <UnevenGrid size={16} majorEvery={5} />

                {/* Graph paper blue coordinate axis hint */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <svg className="w-full h-full">
                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#EB6664" strokeWidth="2" />
                        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#EB6664" strokeWidth="2" />
                    </svg>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-[3%] right-[3%] opacity-15 pointer-events-none" aria-hidden>
                    <CompassSVG size={70} rotate={15} />
                </div>

                <div className="absolute bottom-[6%] left-[2%] opacity-12 pointer-events-none" aria-hidden>
                    <ProtractorSVG size={90} rotate={-8} />
                </div>

                <div className="absolute top-[20%] left-[1%] opacity-10 pointer-events-none">
                    <RulerSVG width={100} height={16} rotate={-12} />
                </div>

                <div className="absolute bottom-[15%] right-[4%] opacity-8 pointer-events-none">
                    <CalculatorButtons />
                </div>

                {/* Dot grid overlay */}
                <svg className="absolute left-[8%] top-[25%] opacity-8 pointer-events-none" width="100" height="100">
                    {Array.from({ length: 7 }, (_, r) =>
                        Array.from({ length: 7 }, (_, c) => (
                            <circle key={`${r}-${c}`} cx={c * 12 + 6} cy={r * 12 + 6} r="1" fill="#EB6664" />
                        ))
                    )}
                </svg>

                <div className="max-w-[1100px] mx-auto relative z-[2]">
                    {/* Header Section */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-[clamp(40px,6vw,64px)]"
                    >
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="w-6 h-[1.5px] bg-[#EB6664] opacity-50" />
                            <span className="font-mono text-[clamp(9px,1.1vw,12px)] text-[#EB6664] tracking-[0.28em] uppercase">
                                Plot Your Course
                            </span>
                            <div className="w-6 h-[1.5px] bg-[#EB6664] opacity-50" />
                        </div>

                        <h2 className="font-['Fraunces',Georgia,serif] text-[clamp(28px,4.5vw,54px)] font-black text-[#1C1209] leading-[1.05] tracking-tight mb-2.5">
                            Let's{" "}
                            <span className="text-[#EB6664] italic relative">
                                Connect
                            </span>
                        </h2>

                        <p className="font-mono text-[clamp(11px,1.2vw,13px)] text-[#7A6E5A] leading-relaxed max-w-[520px] mx-auto">
                            [ x, y ] = coordinates of conversation<br />
                            Fill out the form below and we'll reach out within 24 hours
                        </p>

                        <div className="mt-4 flex justify-center gap-2">
                            <span className="inline-block px-3 py-1 border border-[#EB6664]/30 rounded-full text-[9px] font-mono text-[#EB6664]/60">
                                ✓ Valid Input Required
                            </span>
                            <span className="inline-block px-3 py-1 border border-[#EB6664]/30 rounded-full text-[9px] font-mono text-[#EB6664]/60">
                                ⚡ Fast Response
                            </span>
                        </div>
                    </motion.div>

                    {/* Form and Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,4vw,48px)] items-start">
                        {/* Left Column - Contact Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative mb-6 p-[clamp(24px,3vw,32px)]"
                                style={{
                                    backgroundColor: "#FCFAF5",
                                    border: `1px solid #EB666420`,
                                    boxShadow: "2px 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#EB666415]" />
                                <div className="mb-4">
                                    <div className="font-mono text-2xl mb-3 text-[#EB6664] opacity-70">
                                        📍
                                    </div>
                                    <h3 className="font-mono text-[clamp(13px,1.5vw,16px)] font-bold text-[#1C1209] mb-2 tracking-tight">
                                        Coordinates
                                    </h3>
                                    <p className="font-mono text-[clamp(11px,1.2vw,13px)] text-[#7A6E5A] leading-relaxed">
                                        123 Esperly Lane<br />
                                        Tech City, TC 12345<br />
                                        India
                                    </p>
                                </div>
                            </div>

                            <div className="relative mb-6 p-[clamp(24px,3vw,32px)]"
                                style={{
                                    backgroundColor: "#FCFAF5",
                                    border: `1px solid #EB666420`,
                                    boxShadow: "2px 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#EB666415]" />
                                <div className="mb-4">
                                    <div className="font-mono text-2xl mb-3 text-[#3B6FA0] opacity-70">
                                        @
                                    </div>
                                    <h3 className="font-mono text-[clamp(13px,1.5vw,16px)] font-bold text-[#1C1209] mb-2 tracking-tight">
                                        Send a Signal
                                    </h3>
                                    <p className="font-mono text-[clamp(11px,1.2vw,13px)] text-[#7A6E5A] leading-relaxed">
                                        hello@esperly.com<br />
                                        support@esperly.com
                                    </p>
                                </div>
                            </div>

                            <div className="relative p-[clamp(24px,3vw,32px)]"
                                style={{
                                    backgroundColor: "#FCFAF5",
                                    border: `1px solid #EB666420`,
                                    boxShadow: "2px 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#EB666415]" />
                                <div className="mb-4">
                                    <div className="font-mono text-2xl mb-3 text-[#2E7D52] opacity-70">
                                        ☎
                                    </div>
                                    <h3 className="font-mono text-[clamp(13px,1.5vw,16px)] font-bold text-[#1C1209] mb-2 tracking-tight">
                                        Voice Channel
                                    </h3>
                                    <p className="font-mono text-[clamp(11px,1.2vw,13px)] text-[#7A6E5A] leading-relaxed">
                                        +91 12345 67890<br />
                                        Mon-Fri, 9am - 6pm IST
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative p-[clamp(28px,4vw,44px)]"
                                style={{
                                    backgroundColor: "#FCFAF5",
                                    border: `1px solid #EB666420`,
                                    boxShadow: "4px 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                                }}
                            >
                                <CornerFold />

                                <form onSubmit={handleSubmit} className="relative z-[1]">
                                    {/* Name Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,11px)] text-[#3A2E1A] tracking-[0.15em] mb-1.5 uppercase">
                                            Full Name
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-transparent font-mono text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-all duration-200 border-b"
                                            style={{
                                                borderBottom: `1.5px solid ${errors.name ? "#EB6664" : "#EB666430"}`,
                                                padding: "10px 4px",
                                            }}
                                            placeholder="your name"
                                        />
                                        {errors.name && (
                                            <p className="text-[#EB6664] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,11px)] text-[#3A2E1A] tracking-[0.15em] mb-1.5 uppercase">
                                            Email Address
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent font-mono text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-all duration-200 border-b"
                                            style={{
                                                borderBottom: `1.5px solid ${errors.email ? "#EB6664" : "#EB666430"}`,
                                                padding: "10px 4px",
                                            }}
                                            placeholder="hello@esperly.com"
                                        />
                                        {errors.email && (
                                            <p className="text-[#EB6664] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,11px)] text-[#3A2E1A] tracking-[0.15em] mb-1.5 uppercase">
                                            Phone Number
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-transparent font-mono text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-all duration-200 border-b"
                                            style={{
                                                borderBottom: `1.5px solid ${errors.phone ? "#EB6664" : "#EB666430"}`,
                                                padding: "10px 4px",
                                            }}
                                            placeholder="+91 12345 67890"
                                        />
                                        {errors.phone && (
                                            <p className="text-[#EB6664] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Subject Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,11px)] text-[#3A2E1A] tracking-[0.15em] mb-1.5 uppercase">
                                            Subject
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-transparent font-mono text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-all duration-200 border-b"
                                            style={{
                                                borderBottom: `1.5px solid ${errors.subject ? "#EB6664" : "#EB666430"}`,
                                                padding: "10px 4px",
                                            }}
                                            placeholder="what is this regarding?"
                                        />
                                        {errors.subject && (
                                            <p className="text-[#EB6664] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div className="mb-6">
                                        <label className="block font-mono text-[clamp(10px,1vw,11px)] text-[#3A2E1A] tracking-[0.15em] mb-1.5 uppercase">
                                            Your Message
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full bg-transparent font-mono text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-all duration-200 border-b resize-y"
                                            style={{
                                                borderBottom: `1.5px solid ${errors.message ? "#EB6664" : "#EB666430"}`,
                                                padding: "10px 4px",
                                            }}
                                            placeholder="write your message here..."
                                        />
                                        {errors.message && (
                                            <p className="text-[#EB6664] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={isSubmitting}
                                            className="w-full font-mono font-semibold tracking-[0.1em] cursor-pointer transition-all duration-200"
                                            style={{
                                                backgroundColor: "#EB6664",
                                                color: "#fff",
                                                border: "none",
                                                padding: "clamp(12px,1.5vw,14px)",
                                                fontSize: "clamp(11px,1.2vw,13px)",
                                                opacity: isSubmitting ? 0.7 : 1,
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span>SENDING...</span>
                                                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                </span>
                                            ) : (
                                                "SUBMIT →"
                                            )}
                                        </motion.button>
                                    </div>

                                    {/* Submit Status Messages */}
                                    {submitStatus === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-3 text-center border"
                                            style={{
                                                backgroundColor: "#2E7D5210",
                                                border: `1px solid #2E7D52`,
                                            }}
                                        >
                                            <p className="text-[#2E7D52] font-mono text-[clamp(10px,1vw,11px)]">
                                                ✓ Message delivered! We'll respond within 24 hours.
                                            </p>
                                        </motion.div>
                                    )}

                                    {submitStatus === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-3 text-center border"
                                            style={{
                                                backgroundColor: "#EB666410",
                                                border: `1px solid #EB6664`,
                                            }}
                                        >
                                            <p className="text-[#EB6664] font-mono text-[clamp(10px,1vw,11px)]">
                                                ✗ Transmission failed. Please try again.
                                            </p>
                                        </motion.div>
                                    )}
                                </form>

                                {/* Bottom decoration */}
                                <div className="absolute bottom-3 right-4 opacity-30">
                                    <span className="font-mono text-[8px] text-[#EB6664]">v.1.0</span>
                                </div>
                            </div>

                            {/* Note about response time */}
                            <div className="mt-4 text-center font-mono text-[clamp(9px,0.9vw,10px)] text-[#7A6E5A]">
                                <span className="inline-block mr-1.5">⏱</span>
                                avg. response time: 4 hours
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Add keyframe animation for spinner */}
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    .animate-spin {
                        animation: spin 0.6s linear infinite;
                    }
                `}</style>
            </section>
            <Footer />
            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};

export default Contact;