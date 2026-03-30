import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";

/* ─── SVG DECORATIONS ────────────────────────────────────────── */

/* Paperclip SVG */
const Paperclip = ({ size = 48, color = "#9E9E9E", rotate = 0, style = {} }) => (
    <svg
        width={size} height={size * 2.2}
        viewBox="0 0 24 52"
        fill="none"
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
        <path
            d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
        />
        <path
            d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
            stroke="#BDBDBD"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="2 4"
            opacity="0.6"
            fill="none"
        />
    </svg>
);

/* Pen SVG */
const PenSVG = ({ size = 120, rotate = -15, style = {} }) => (
    <svg
        width={size} height={size * 0.14}
        viewBox="0 0 220 30"
        fill="none"
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
        <rect x="30" y="5" width="150" height="20" rx="10" fill="#A6192E" />
        <rect x="30" y="5" width="150" height="20" rx="10" stroke="#C8203A" strokeWidth="1" />
        <rect x="35" y="7" width="140" height="5" rx="3" fill="rgba(255,255,255,0.15)" />
        <rect x="155" y="3" width="5" height="22" rx="2" fill="#9E9E9E" stroke="#BDBDBD" strokeWidth="0.5" />
        <circle cx="157.5" cy="25" r="3" fill="#9E9E9E" />
        <rect x="45" y="5" width="30" height="20" rx="2" fill="#C8203A" opacity="0.5" />
        {[0, 3, 6, 9, 12, 15, 18, 21, 24, 27].map(x => (
            <line key={x} x1={47 + x} y1="5" x2={47 + x} y2="25" stroke="#C8203A" strokeWidth="0.5" opacity="0.5" />
        ))}
        <polygon points="30,8 30,22 8,15" fill="#C0C0C0" />
        <polygon points="15,11 15,19 8,15" fill="#888" />
        <line x1="8" y1="15" x2="30" y2="10" stroke="#999" strokeWidth="0.5" />
        <line x1="8" y1="15" x2="30" y2="20" stroke="#999" strokeWidth="0.5" />
        <rect x="178" y="5" width="22" height="20" rx="10" fill="#C8203A" />
    </svg>
);

/* Washi tape strip */
const WashiTape = ({ width = 60, height = 18, color = "rgba(200,195,170,0.55)", rotate = -2, style = {} }) => (
    <div className="absolute"
        style={{
            width, height,
            backgroundColor: color,
            borderLeft: "1px solid rgba(180,170,140,0.3)",
            borderRight: "1px solid rgba(180,170,140,0.3)",
            transform: `rotate(${rotate}deg)`,
            ...style,
        }}
    />
);

/* Ruled paper lines overlay */
const RuledLines = ({ count = 20, topOffset = 60, gap = 26 }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: count }, (_, i) => (
            <div key={i} className="absolute left-0 right-0"
                style={{
                    top: topOffset + i * gap,
                    height: 1,
                    backgroundColor: "#D6CEBA",
                    opacity: 0.55,
                }}
            />
        ))}
        {/* Red margin line */}
        <div className="absolute top-0 bottom-0 w-[1.5px] opacity-25"
            style={{
                left: "clamp(40px,6vw,72px)",
                backgroundColor: "#A6192E",
            }}
        />
    </div>
);

/* Stamp / badge */
const Stamp = ({ text, color = "#A6192E", rotate = -8, style = {} }) => (
    <div className="inline-block rounded-[4px] font-mono uppercase font-bold tracking-[0.18em]"
        style={{
            border: `2.5px solid ${color}`,
            padding: "3px 10px",
            fontSize: "clamp(9px,1vw,11px)",
            color,
            transform: `rotate(${rotate}deg)`,
            opacity: 0.75,
            ...style,
        }}
    >
        {text}
    </div>
);

/* Hand-drawn underline SVG */
const ScribbleUnderline = ({ color = "#A6192E", width = "100%", style = {} }) => (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ width, height: 12, display: "block", ...style }}>
        <path
            d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
            stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
    </svg>
);

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
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <section className="relative overflow-hidden"
                style={{
                    backgroundColor: "#F2EBD9",
                    padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
                }}
            >
                {/* Background ruled lines */}
                <RuledLines count={40} topOffset={0} gap={26} />

                {/* Decorative elements */}
                <div className="absolute top-[5%] right-[5%] opacity-12 pointer-events-none" aria-hidden>
                    <PenSVG size={140} rotate={-8} />
                </div>

                <div className="absolute bottom-[8%] left-[3%] opacity-10 pointer-events-none" aria-hidden>
                    <Paperclip size={32} color="#9E9E9E" rotate={-15} />
                </div>

                <div className="absolute top-[15%] left-[2%] opacity-8 pointer-events-none">
                    <Paperclip size={24} color="#BDBDBD" rotate={25} />
                </div>

                {/* Dot grid decoration */}
                <svg className="absolute right-[6%] bottom-[12%] opacity-8 pointer-events-none" width="120" height="120">
                    {Array.from({ length: 6 }, (_, r) =>
                        Array.from({ length: 6 }, (_, c) => (
                            <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r="1.2" fill="#A6192E" />
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
                            <div className="w-5 h-[2px] bg-[#A6192E]" />
                            <span className="font-mono text-[clamp(9px,1.1vw,12px)] text-[#A6192E] tracking-[0.28em] uppercase">
                                Get In Touch
                            </span>
                            <div className="w-5 h-[2px] bg-[#A6192E]" />
                        </div>

                        <h2 className="font-['Fraunces',Georgia,serif] text-[clamp(28px,4.5vw,54px)] font-black text-[#1C1209] leading-[1.05] tracking-tight mb-2.5">
                            Write to Us on{" "}
                            <span className="text-[#A6192E] italic relative">
                                Paper
                                <ScribbleUnderline color="#A6192E" width="100%" style={{ marginTop: 2 }} />
                            </span>
                        </h2>

                        <p className="font-['DM_Serif_Display',Georgia,serif] text-[clamp(12px,1.3vw,15px)] text-[#7A6E5A] leading-relaxed max-w-[520px] mx-auto">
                            Have a question? Want to start your learning journey?<br />
                            Drop us a message and we'll get back to you within 24 hours.
                        </p>

                        <div className="mt-4">
                            <Stamp text="Quick Response" color="#2E7D52" rotate={-3} />
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
                            <div className="relative mb-6 rounded-[3px] p-[clamp(24px,3vw,32px)]"
                                style={{
                                    backgroundColor: "#F9F5ED",
                                    border: `1px solid #D6CEBA`,
                                    boxShadow: "3px 5px 16px rgba(0,0,0,0.08)",
                                }}
                            >
                                <WashiTape
                                    width={48} height={14} color="rgba(200,195,170,0.55)" rotate={-2}
                                    style={{ top: -8, left: "50%", transform: "translateX(-50%) rotate(-2deg)" }}
                                />

                                <div className="absolute top-3 right-3 opacity-30">
                                    <Paperclip size={24} color="#9E9E9E" rotate={-10} />
                                </div>

                                <div className="mb-5">
                                    <div className="text-3xl mb-3 text-[#A6192E]">
                                        📬
                                    </div>
                                    <h3 className="font-['Fraunces',Georgia,serif] text-[clamp(16px,1.8vw,20px)] font-bold text-[#1C1209] mb-2">
                                        Send us a letter
                                    </h3>
                                    <p className="font-serif text-[clamp(12px,1.2vw,14px)] text-[#7A6E5A] leading-relaxed">
                                        123 Esperly Lane<br />
                                        Tech City, TC 12345<br />
                                        India
                                    </p>
                                </div>
                            </div>

                            <div className="relative mb-6 rounded-[3px] p-[clamp(24px,3vw,32px)]"
                                style={{
                                    backgroundColor: "#F9F5ED",
                                    border: `1px solid #D6CEBA`,
                                    boxShadow: "3px 5px 16px rgba(0,0,0,0.08)",
                                }}
                            >
                                <div className="mb-5">
                                    <div className="text-3xl mb-3 text-[#3B6FA0]">
                                        ✉️
                                    </div>
                                    <h3 className="font-['Fraunces',Georgia,serif] text-[clamp(16px,1.8vw,20px)] font-bold text-[#1C1209] mb-2">
                                        Email us
                                    </h3>
                                    <p className="font-serif text-[clamp(12px,1.2vw,14px)] text-[#7A6E5A] leading-relaxed">
                                        hello@esperly.com<br />
                                        support@esperly.com
                                    </p>
                                </div>
                            </div>

                            <div className="relative rounded-[3px] p-[clamp(24px,3vw,32px)]"
                                style={{
                                    backgroundColor: "#F9F5ED",
                                    border: `1px solid #D6CEBA`,
                                    boxShadow: "3px 5px 16px rgba(0,0,0,0.08)",
                                }}
                            >
                                <div className="mb-5">
                                    <div className="text-3xl mb-3 text-[#2E7D52]">
                                        📞
                                    </div>
                                    <h3 className="font-['Fraunces',Georgia,serif] text-[clamp(16px,1.8vw,20px)] font-bold text-[#1C1209] mb-2">
                                        Call us
                                    </h3>
                                    <p className="font-serif text-[clamp(12px,1.2vw,14px)] text-[#7A6E5A] leading-relaxed">
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
                            <div className="relative rounded-[3px] p-[clamp(28px,4vw,44px)]"
                                style={{
                                    backgroundColor: "#F9F5ED",
                                    border: `1px solid #D6CEBA`,
                                    boxShadow: "4px 6px 24px rgba(0,0,0,0.12)",
                                }}
                            >
                                {/* Decorative tape at top */}
                                <WashiTape
                                    width={72} height={16} color="rgba(200,195,170,0.55)" rotate={3}
                                    style={{ top: -12, left: "30%", transform: "translateX(-30%) rotate(3deg)" }}
                                />
                                <WashiTape
                                    width={64} height={16} color="rgba(200,195,170,0.55)" rotate={-2}
                                    style={{ top: -10, right: "20%", transform: "translateX(20%) rotate(-2deg)" }}
                                />

                                {/* Ruled lines inside form */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3px]">
                                    {Array.from({ length: 25 }, (_, i) => (
                                        <div key={i} className="absolute left-0 right-0"
                                            style={{
                                                top: 52 + i * 28,
                                                height: 1,
                                                backgroundColor: "#D6CEBA",
                                                opacity: 0.35,
                                            }}
                                        />
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} className="relative z-[1]">
                                    {/* Name Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,12px)] text-[#3A2E1A] tracking-[0.1em] mb-1.5 uppercase">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-transparent rounded-[2px] font-serif text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-colors duration-200"
                                            style={{
                                                border: `1px solid ${errors.name ? "#A6192E" : "#D6CEBA"}`,
                                                padding: "12px 14px",
                                            }}
                                            placeholder="Your name"
                                        />
                                        {errors.name && (
                                            <p className="text-[#A6192E] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,12px)] text-[#3A2E1A] tracking-[0.1em] mb-1.5 uppercase">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent rounded-[2px] font-serif text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-colors duration-200"
                                            style={{
                                                border: `1px solid ${errors.email ? "#A6192E" : "#D6CEBA"}`,
                                                padding: "12px 14px",
                                            }}
                                            placeholder="hello@esperly.com"
                                        />
                                        {errors.email && (
                                            <p className="text-[#A6192E] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,12px)] text-[#3A2E1A] tracking-[0.1em] mb-1.5 uppercase">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-transparent rounded-[2px] font-serif text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-colors duration-200"
                                            style={{
                                                border: `1px solid ${errors.phone ? "#A6192E" : "#D6CEBA"}`,
                                                padding: "12px 14px",
                                            }}
                                            placeholder="+91 12345 67890"
                                        />
                                        {errors.phone && (
                                            <p className="text-[#A6192E] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Subject Field */}
                                    <div className="mb-5">
                                        <label className="block font-mono text-[clamp(10px,1vw,12px)] text-[#3A2E1A] tracking-[0.1em] mb-1.5 uppercase">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-transparent rounded-[2px] font-serif text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-colors duration-200"
                                            style={{
                                                border: `1px solid ${errors.subject ? "#A6192E" : "#D6CEBA"}`,
                                                padding: "12px 14px",
                                            }}
                                            placeholder="What is this regarding?"
                                        />
                                        {errors.subject && (
                                            <p className="text-[#A6192E] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div className="mb-6">
                                        <label className="block font-mono text-[clamp(10px,1vw,12px)] text-[#3A2E1A] tracking-[0.1em] mb-1.5 uppercase">
                                            Your Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full bg-transparent rounded-[2px] font-serif text-[clamp(12px,1.2vw,14px)] text-[#1C1209] outline-none transition-colors duration-200 resize-y"
                                            style={{
                                                border: `1px solid ${errors.message ? "#A6192E" : "#D6CEBA"}`,
                                                padding: "12px 14px",
                                            }}
                                            placeholder="Write your message here..."
                                        />
                                        {errors.message && (
                                            <p className="text-[#A6192E] text-[clamp(10px,0.9vw,11px)] mt-1 font-mono">
                                                ✗ {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={isSubmitting}
                                            className="w-full rounded-[3px] font-['Fraunces',Georgia,serif] font-bold tracking-[0.02em] cursor-pointer transition-opacity duration-200"
                                            style={{
                                                backgroundColor: "#A6192E",
                                                color: "#fff",
                                                border: "none",
                                                padding: "clamp(12px,1.5vw,16px)",
                                                fontSize: "clamp(12px,1.4vw,15px)",
                                                boxShadow: `2px 4px 12px #A6192E80`,
                                                opacity: isSubmitting ? 0.7 : 1,
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span>Sending...</span>
                                                    <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                </span>
                                            ) : (
                                                "Send Message →"
                                            )}
                                        </motion.button>
                                    </div>

                                    {/* Submit Status Messages */}
                                    {submitStatus === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-3 rounded-[3px] text-center"
                                            style={{
                                                backgroundColor: "#2E7D5215",
                                                border: `1px solid #2E7D52`,
                                            }}
                                        >
                                            <p className="text-[#2E7D52] font-mono text-[clamp(10px,1vw,12px)]">
                                                ✓ Message sent successfully! We'll get back to you soon.
                                            </p>
                                        </motion.div>
                                    )}

                                    {submitStatus === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-3 rounded-[3px] text-center"
                                            style={{
                                                backgroundColor: "#A6192E15",
                                                border: `1px solid #A6192E`,
                                            }}
                                        >
                                            <p className="text-[#A6192E] font-mono text-[clamp(10px,1vw,12px)]">
                                                ✗ Something went wrong. Please try again.
                                            </p>
                                        </motion.div>
                                    )}
                                </form>

                                {/* Bottom stamp */}
                                <div className="absolute bottom-4 right-5 opacity-50">
                                    <Stamp text="Confidential" color="#3B6FA0" rotate={4} style={{ fontSize: 7 }} />
                                </div>
                            </div>

                            {/* Note about response time */}
                            <div className="mt-4 text-center font-mono text-[clamp(9px,0.9vw,11px)] text-[#7A6E5A] italic">
                                <span className="inline-block mr-1.5">⏱️</span>
                                Usually replies within 24 hours
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