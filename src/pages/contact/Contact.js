import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import Navbar from "../../components/Navbar";

/* ─── COLOUR TOKENS (matching stationery theme) ─────────────────────────────────────────── */
const PAPER = "#F9F5ED";   // aged cream paper
const PAPER2 = "#F2EBD9";   // slightly darker paper
const PAPER3 = "#EDE3CC";   // notepaper
const RULED = "#D6CEBA";   // ruled line colour
const INK = "#1C1209";   // dark ink
const INK2 = "#3A2E1A";   // medium ink
const FADED = "#7A6E5A";   // faded ink / muted
const RED = "#A6192E";   // Primary theme color
const RED2 = "#C8203A";   // secondary red
const PENCIL = "#8C7B6B";   // pencil graphite
const CLIP = "#9E9E9E";   // paperclip metal
const CLIP2 = "#BDBDBD";   // paperclip highlight
const YELLOW = "#F5C842";   // sticky note yellow
const BLUE = "#3B6FA0";   // blue pen ink
const GREEN = "#2E7D52";   // green highlighter
const TAPE = "rgba(200,195,170,0.55)"; // scotch tape

/* ─── SVG DECORATIONS ────────────────────────────────────────── */

/* Paperclip SVG */
const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
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
            stroke={CLIP2}
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
        <rect x="30" y="5" width="150" height="20" rx="10" fill={RED} />
        <rect x="30" y="5" width="150" height="20" rx="10" stroke={RED2} strokeWidth="1" />
        <rect x="35" y="7" width="140" height="5" rx="3" fill="rgba(255,255,255,0.15)" />
        <rect x="155" y="3" width="5" height="22" rx="2" fill={CLIP} stroke={CLIP2} strokeWidth="0.5" />
        <circle cx="157.5" cy="25" r="3" fill={CLIP} />
        <rect x="45" y="5" width="30" height="20" rx="2" fill={RED2} opacity="0.5" />
        {[0, 3, 6, 9, 12, 15, 18, 21, 24, 27].map(x => (
            <line key={x} x1={47 + x} y1="5" x2={47 + x} y2="25" stroke={RED2} strokeWidth="0.5" opacity="0.5" />
        ))}
        <polygon points="30,8 30,22 8,15" fill="#C0C0C0" />
        <polygon points="15,11 15,19 8,15" fill="#888" />
        <line x1="8" y1="15" x2="30" y2="10" stroke="#999" strokeWidth="0.5" />
        <line x1="8" y1="15" x2="30" y2="20" stroke="#999" strokeWidth="0.5" />
        <rect x="178" y="5" width="22" height="20" rx="10" fill={RED2} />
    </svg>
);

/* Washi tape strip */
const WashiTape = ({ width = 60, height = 18, color = TAPE, rotate = -2, style = {} }) => (
    <div style={{
        width, height,
        background: color,
        borderLeft: "1px solid rgba(180,170,140,0.3)",
        borderRight: "1px solid rgba(180,170,140,0.3)",
        transform: `rotate(${rotate}deg)`,
        position: "absolute",
        ...style,
    }} />
);

/* Ruled paper lines overlay */
const RuledLines = ({ count = 20, topOffset = 60, gap = 26 }) => (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: count }, (_, i) => (
            <div key={i} style={{
                position: "absolute",
                left: 0, right: 0,
                top: topOffset + i * gap,
                height: 1,
                background: RULED,
                opacity: 0.55,
            }} />
        ))}
        {/* Red margin line */}
        <div style={{
            position: "absolute",
            top: 0, bottom: 0,
            left: "clamp(40px,6vw,72px)",
            width: 1.5,
            background: RED,
            opacity: 0.25,
        }} />
    </div>
);

/* Stamp / badge */
const Stamp = ({ text, color = RED, rotate = -8, style = {} }) => (
    <div style={{
        display: "inline-block",
        border: `2.5px solid ${color}`,
        borderRadius: 4,
        padding: "3px 10px",
        fontFamily: "monospace",
        fontSize: "clamp(9px,1vw,11px)",
        color,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontWeight: 700,
        transform: `rotate(${rotate}deg)`,
        opacity: 0.75,
        ...style,
    }}>
        {text}
    </div>
);

/* Hand-drawn underline SVG */
const ScribbleUnderline = ({ color = RED, width = "100%", style = {} }) => (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ width, height: 12, display: "block", ...style }}>
        <path
            d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
            stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
    </svg>
);

/* Highlighter mark */
const Highlight = ({ children, color = "#FFEB3B", style = {} }) => (
    <span style={{
        background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`,
        paddingBottom: 2,
        ...style,
    }}>
        {children}
    </span>
);

/* ─── CONTACT FORM COMPONENT ────────────────────────────────────────── */
const Contact = () => {
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
        // Clear error for this field when user starts typing
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

        // Simulate API call
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
            <Navbar />
            <section style={{
                background: PAPER2,
                padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background ruled lines */}
                <RuledLines count={40} topOffset={0} gap={26} />

                {/* Decorative elements */}
                <div style={{ position: "absolute", top: "5%", right: "5%", opacity: 0.12 }} aria-hidden>
                    <PenSVG size={140} rotate={-8} />
                </div>

                <div style={{ position: "absolute", bottom: "8%", left: "3%", opacity: 0.1 }} aria-hidden>
                    <Paperclip size={32} color={CLIP} rotate={-15} />
                </div>

                <div style={{ position: "absolute", top: "15%", left: "2%", opacity: 0.08 }}>
                    <Paperclip size={24} color={CLIP2} rotate={25} />
                </div>

                {/* Dot grid decoration */}
                <svg style={{ position: "absolute", right: "6%", bottom: "12%", opacity: 0.08 }} width="120" height="120">
                    {Array.from({ length: 6 }, (_, r) =>
                        Array.from({ length: 6 }, (_, c) => (
                            <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r="1.2" fill={RED} />
                        ))
                    )}
                </svg>

                <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
                    {/* Header Section */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,64px)" }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
                            <div style={{ width: 20, height: 2, background: RED }} />
                            <span style={{
                                fontFamily: "monospace",
                                fontSize: "clamp(9px,1.1vw,12px)",
                                color: RED,
                                letterSpacing: "0.28em",
                                textTransform: "uppercase",
                            }}>
                                Get In Touch
                            </span>
                            <div style={{ width: 20, height: 2, background: RED }} />
                        </div>

                        <h2 style={{
                            fontFamily: "Fraunces, Georgia, serif",
                            fontSize: "clamp(28px,4.5vw,54px)",
                            fontWeight: 900,
                            color: INK,
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                            marginBottom: 10,
                        }}>
                            Write to Us on{" "}
                            <span style={{ color: RED, fontStyle: "italic", position: "relative" }}>
                                Paper
                                <ScribbleUnderline color={RED} width="100%" style={{ marginTop: 2 }} />
                            </span>
                        </h2>

                        <p style={{
                            fontFamily: "DM Serif Display, Georgia, serif",
                            fontSize: "clamp(12px,1.3vw,15px)",
                            color: FADED,
                            lineHeight: 1.75,
                            maxWidth: 520,
                            margin: "0 auto",
                        }}>
                            Have a question? Want to start your learning journey?<br />
                            Drop us a message and we'll get back to you within 24 hours.
                        </p>

                        <div style={{ marginTop: 16 }}>
                            <Stamp text="Quick Response" color={GREEN} rotate={-3} />
                        </div>
                    </motion.div>

                    {/* Form and Info Grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "clamp(24px,4vw,48px)",
                        alignItems: "start",
                    }}>
                        {/* Left Column - Contact Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{
                                background: PAPER,
                                border: `1px solid ${RULED}`,
                                borderRadius: 3,
                                padding: "clamp(24px,3vw,32px)",
                                position: "relative",
                                marginBottom: 24,
                                boxShadow: "3px 5px 16px rgba(0,0,0,0.08)",
                            }}>
                                <WashiTape
                                    width={48} height={14} color={TAPE} rotate={-2}
                                    style={{ top: -8, left: "50%", transform: "translateX(-50%) rotate(-2deg)" }}
                                />

                                <div style={{ position: "absolute", top: 12, right: 12, opacity: 0.3 }}>
                                    <Paperclip size={24} color={CLIP} rotate={-10} />
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <div style={{
                                        fontSize: 32,
                                        marginBottom: 12,
                                        color: RED,
                                    }}>
                                        📬
                                    </div>
                                    <h3 style={{
                                        fontFamily: "Fraunces, Georgia, serif",
                                        fontSize: "clamp(16px,1.8vw,20px)",
                                        fontWeight: 700,
                                        color: INK,
                                        marginBottom: 8,
                                    }}>
                                        Send us a letter
                                    </h3>
                                    <p style={{
                                        fontFamily: "Georgia, serif",
                                        fontSize: "clamp(12px,1.2vw,14px)",
                                        color: FADED,
                                        lineHeight: 1.6,
                                    }}>
                                        123 Esperly Lane<br />
                                        Tech City, TC 12345<br />
                                        India
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                background: PAPER,
                                border: `1px solid ${RULED}`,
                                borderRadius: 3,
                                padding: "clamp(24px,3vw,32px)",
                                position: "relative",
                                marginBottom: 24,
                                boxShadow: "3px 5px 16px rgba(0,0,0,0.08)",
                            }}>
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{
                                        fontSize: 32,
                                        marginBottom: 12,
                                        color: BLUE,
                                    }}>
                                        ✉️
                                    </div>
                                    <h3 style={{
                                        fontFamily: "Fraunces, Georgia, serif",
                                        fontSize: "clamp(16px,1.8vw,20px)",
                                        fontWeight: 700,
                                        color: INK,
                                        marginBottom: 8,
                                    }}>
                                        Email us
                                    </h3>
                                    <p style={{
                                        fontFamily: "Georgia, serif",
                                        fontSize: "clamp(12px,1.2vw,14px)",
                                        color: FADED,
                                        lineHeight: 1.6,
                                    }}>
                                        hello@esperly.com<br />
                                        support@esperly.com
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                background: PAPER,
                                border: `1px solid ${RULED}`,
                                borderRadius: 3,
                                padding: "clamp(24px,3vw,32px)",
                                position: "relative",
                                boxShadow: "3px 5px 16px rgba(0,0,0,0.08)",
                            }}>
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{
                                        fontSize: 32,
                                        marginBottom: 12,
                                        color: GREEN,
                                    }}>
                                        📞
                                    </div>
                                    <h3 style={{
                                        fontFamily: "Fraunces, Georgia, serif",
                                        fontSize: "clamp(16px,1.8vw,20px)",
                                        fontWeight: 700,
                                        color: INK,
                                        marginBottom: 8,
                                    }}>
                                        Call us
                                    </h3>
                                    <p style={{
                                        fontFamily: "Georgia, serif",
                                        fontSize: "clamp(12px,1.2vw,14px)",
                                        color: FADED,
                                        lineHeight: 1.6,
                                    }}>
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
                            <div style={{
                                background: PAPER,
                                border: `1px solid ${RULED}`,
                                borderRadius: 3,
                                padding: "clamp(28px,4vw,44px)",
                                position: "relative",
                                boxShadow: "4px 6px 24px rgba(0,0,0,0.12)",
                            }}>
                                {/* Decorative tape at top */}
                                <WashiTape
                                    width={72} height={16} color={TAPE} rotate={3}
                                    style={{ top: -12, left: "30%", transform: "translateX(-30%) rotate(3deg)" }}
                                />
                                <WashiTape
                                    width={64} height={16} color={TAPE} rotate={-2}
                                    style={{ top: -10, right: "20%", transform: "translateX(20%) rotate(-2deg)" }}
                                />

                                {/* Ruled lines inside form */}
                                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 3 }}>
                                    {Array.from({ length: 25 }, (_, i) => (
                                        <div key={i} style={{
                                            position: "absolute",
                                            left: 0, right: 0,
                                            top: 52 + i * 28,
                                            height: 1,
                                            background: RULED,
                                            opacity: 0.35,
                                        }} />
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1 }}>
                                    {/* Name Field */}
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{
                                            display: "block",
                                            fontFamily: "monospace",
                                            fontSize: "clamp(10px,1vw,12px)",
                                            color: INK2,
                                            letterSpacing: "0.1em",
                                            marginBottom: 6,
                                            textTransform: "uppercase",
                                        }}>
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{
                                                width: "100%",
                                                background: "transparent",
                                                border: `1px solid ${errors.name ? RED : RULED}`,
                                                borderRadius: 2,
                                                padding: "12px 14px",
                                                fontFamily: "Georgia, serif",
                                                fontSize: "clamp(12px,1.2vw,14px)",
                                                color: INK,
                                                transition: "border-color 0.2s",
                                                outline: "none",
                                            }}
                                            placeholder="Your name"
                                        />
                                        {errors.name && (
                                            <p style={{
                                                color: RED,
                                                fontSize: "clamp(10px,0.9vw,11px)",
                                                marginTop: 4,
                                                fontFamily: "monospace",
                                            }}>
                                                ✗ {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{
                                            display: "block",
                                            fontFamily: "monospace",
                                            fontSize: "clamp(10px,1vw,12px)",
                                            color: INK2,
                                            letterSpacing: "0.1em",
                                            marginBottom: 6,
                                            textTransform: "uppercase",
                                        }}>
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{
                                                width: "100%",
                                                background: "transparent",
                                                border: `1px solid ${errors.email ? RED : RULED}`,
                                                borderRadius: 2,
                                                padding: "12px 14px",
                                                fontFamily: "Georgia, serif",
                                                fontSize: "clamp(12px,1.2vw,14px)",
                                                color: INK,
                                                transition: "border-color 0.2s",
                                                outline: "none",
                                            }}
                                            placeholder="hello@esperly.com"
                                        />
                                        {errors.email && (
                                            <p style={{
                                                color: RED,
                                                fontSize: "clamp(10px,0.9vw,11px)",
                                                marginTop: 4,
                                                fontFamily: "monospace",
                                            }}>
                                                ✗ {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{
                                            display: "block",
                                            fontFamily: "monospace",
                                            fontSize: "clamp(10px,1vw,12px)",
                                            color: INK2,
                                            letterSpacing: "0.1em",
                                            marginBottom: 6,
                                            textTransform: "uppercase",
                                        }}>
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{
                                                width: "100%",
                                                background: "transparent",
                                                border: `1px solid ${errors.phone ? RED : RULED}`,
                                                borderRadius: 2,
                                                padding: "12px 14px",
                                                fontFamily: "Georgia, serif",
                                                fontSize: "clamp(12px,1.2vw,14px)",
                                                color: INK,
                                                transition: "border-color 0.2s",
                                                outline: "none",
                                            }}
                                            placeholder="+91 12345 67890"
                                        />
                                        {errors.phone && (
                                            <p style={{
                                                color: RED,
                                                fontSize: "clamp(10px,0.9vw,11px)",
                                                marginTop: 4,
                                                fontFamily: "monospace",
                                            }}>
                                                ✗ {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Subject Field */}
                                    <div style={{ marginBottom: 20 }}>
                                        <label style={{
                                            display: "block",
                                            fontFamily: "monospace",
                                            fontSize: "clamp(10px,1vw,12px)",
                                            color: INK2,
                                            letterSpacing: "0.1em",
                                            marginBottom: 6,
                                            textTransform: "uppercase",
                                        }}>
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            style={{
                                                width: "100%",
                                                background: "transparent",
                                                border: `1px solid ${errors.subject ? RED : RULED}`,
                                                borderRadius: 2,
                                                padding: "12px 14px",
                                                fontFamily: "Georgia, serif",
                                                fontSize: "clamp(12px,1.2vw,14px)",
                                                color: INK,
                                                transition: "border-color 0.2s",
                                                outline: "none",
                                            }}
                                            placeholder="What is this regarding?"
                                        />
                                        {errors.subject && (
                                            <p style={{
                                                color: RED,
                                                fontSize: "clamp(10px,0.9vw,11px)",
                                                marginTop: 4,
                                                fontFamily: "monospace",
                                            }}>
                                                ✗ {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div style={{ marginBottom: 24 }}>
                                        <label style={{
                                            display: "block",
                                            fontFamily: "monospace",
                                            fontSize: "clamp(10px,1vw,12px)",
                                            color: INK2,
                                            letterSpacing: "0.1em",
                                            marginBottom: 6,
                                            textTransform: "uppercase",
                                        }}>
                                            Your Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            style={{
                                                width: "100%",
                                                background: "transparent",
                                                border: `1px solid ${errors.message ? RED : RULED}`,
                                                borderRadius: 2,
                                                padding: "12px 14px",
                                                fontFamily: "Georgia, serif",
                                                fontSize: "clamp(12px,1.2vw,14px)",
                                                color: INK,
                                                transition: "border-color 0.2s",
                                                outline: "none",
                                                resize: "vertical",
                                            }}
                                            placeholder="Write your message here..."
                                        />
                                        {errors.message && (
                                            <p style={{
                                                color: RED,
                                                fontSize: "clamp(10px,0.9vw,11px)",
                                                marginTop: 4,
                                                fontFamily: "monospace",
                                            }}>
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
                                            style={{
                                                width: "100%",
                                                background: RED,
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 3,
                                                padding: "clamp(12px,1.5vw,16px)",
                                                fontFamily: "Fraunces, Georgia, serif",
                                                fontSize: "clamp(12px,1.4vw,15px)",
                                                fontWeight: 700,
                                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                                letterSpacing: "0.02em",
                                                boxShadow: `2px 4px 12px ${RED}80`,
                                                position: "relative",
                                                opacity: isSubmitting ? 0.7 : 1,
                                                transition: "opacity 0.2s",
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                                    <span>Sending...</span>
                                                    <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
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
                                            style={{
                                                marginTop: 16,
                                                padding: "12px",
                                                background: `${GREEN}15`,
                                                border: `1px solid ${GREEN}`,
                                                borderRadius: 3,
                                                textAlign: "center",
                                            }}
                                        >
                                            <p style={{
                                                color: GREEN,
                                                fontFamily: "monospace",
                                                fontSize: "clamp(10px,1vw,12px)",
                                            }}>
                                                ✓ Message sent successfully! We'll get back to you soon.
                                            </p>
                                        </motion.div>
                                    )}

                                    {submitStatus === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                marginTop: 16,
                                                padding: "12px",
                                                background: `${RED}15`,
                                                border: `1px solid ${RED}`,
                                                borderRadius: 3,
                                                textAlign: "center",
                                            }}
                                        >
                                            <p style={{
                                                color: RED,
                                                fontFamily: "monospace",
                                                fontSize: "clamp(10px,1vw,12px)",
                                            }}>
                                                ✗ Something went wrong. Please try again.
                                            </p>
                                        </motion.div>
                                    )}
                                </form>

                                {/* Bottom stamp */}
                                <div style={{
                                    position: "absolute",
                                    bottom: 16,
                                    right: 20,
                                    opacity: 0.5,
                                }}>
                                    <Stamp text="Confidential" color={BLUE} rotate={4} style={{ fontSize: 7 }} />
                                </div>
                            </div>

                            {/* Note about response time */}
                            <div style={{
                                marginTop: 16,
                                textAlign: "center",
                                fontFamily: "monospace",
                                fontSize: "clamp(9px,0.9vw,11px)",
                                color: FADED,
                                fontStyle: "italic",
                            }}>
                                <span style={{ display: "inline-block", marginRight: 6 }}>⏱️</span>
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
      `}</style>
            </section>
        </>
    );
};

export default Contact;