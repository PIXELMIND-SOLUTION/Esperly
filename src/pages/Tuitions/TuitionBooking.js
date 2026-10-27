import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ─── Theme (Esperly · Four Pillars) ──────────────────────────────────────────

const T = {
    coral: "#EB6664",
    coralDark: "#C94846",
    coralSoft: "rgba(235,102,100,0.10)",
    peach: "#FDF1E9",
    peachSoft: "#FFF8F3",
    peachDeep: "#FBE3D3",
    yellow: "#FCE98A",
    ink: "#111827",
    muted: "#4B5563",
    line: "#F3D9CF",
};

const themes = [
    { cardBg: "#DCE9FB", badgeBg: "#1E3A8A", iconBg: "#A9C6EE", iconColor: "#1E3A8A" },
    { cardBg: "#E9E4FB", badgeBg: "#6D4FC4", iconBg: "#C6B8F5", iconColor: "#5B3FB0" },
    { cardBg: "#FBE7D6", badgeBg: "#E8752A", iconBg: "#F9CFA0", iconColor: "#C2620F" },
    { cardBg: "#DEF3E5", badgeBg: "#1F7A3D", iconBg: "#A8E0BA", iconColor: "#1F7A3D" },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const tuitionsMenu = [
    { label: "Elementary Level", items: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"] },
    { label: "Middle Level", items: ["Class 6", "Class 7", "Class 8"] },
    { label: "Secondary Level", items: ["Class 9", "Class 10", "Class 11", "Class 12"] },
];

const boards = [
    { id: "cbse", name: "CBSE", desc: "Central Board of Secondary Education", icon: "🇮🇳" },
    { id: "icse", name: "ICSE", desc: "Indian Certificate of Secondary Education", icon: "📚" },
    { id: "ib", name: "IB", desc: "International Baccalaureate", icon: "🎓" },
    { id: "pearson", name: "Pearson Edexcel", desc: "Pearson Edexcel International", icon: "🌐" },
    { id: "cambridge", name: "Cambridge", desc: "Cambridge Assessment International", icon: "🌍" },
    { id: "state", name: "State Boards", desc: "State level curriculum", icon: "🏛️" },
];

// Subjects grouped by class level
const getSubjectsByClass = (className) => {
    const classNum = parseInt(className.replace("Class ", ""));

    if (classNum >= 1 && classNum <= 5) {
        return {
            "Core Subjects": {
                subtitle: "Structured learning designed to build strong fundamentals.",
                subjects: ["English", "Mathematics", "Science", "Hindi", "Social Studies"],
            },
            "Regional Languages": {
                subtitle: "Connect learning with cultural roots.",
                subjects: ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Gujarati", "Bengali", "Urdu"],
            },
            "Foreign Languages": {
                subtitle: "Build global communication skills from an early age.",
                subjects: ["French", "German", "Spanish", "Japanese", "Arabic", "Russian"],
            },
        };
    }

    if (classNum >= 6 && classNum <= 8) {
        return {
            "Core Subjects": {
                subtitle: "Strengthening concepts with a deeper academic focus and application-based learning.",
                subjects: ["English", "Mathematics", "Science", "Social Science", "Hindi", "Computer Science"],
            },
            "Regional Languages": {
                subtitle: "Enhancing communication and cultural understanding.",
                subjects: ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Gujarati", "Bengali", "Urdu"],
            },
            "Foreign Languages": {
                subtitle: "Building global language proficiency and confidence.",
                subjects: ["French", "German", "Spanish", "Japanese", "Arabic", "Russian"],
            },
        };
    }

    // Classes 9–12
    return {
        "Core Subjects": {
            subtitle: "Strong foundation for board examinations and higher studies.",
            subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Computer Science"],
        },
        "Science Stream": {
            subtitle: "Focused on analytical thinking, experimentation, and problem-solving.",
            subjects: ["Physics", "Chemistry", "Biology"],
        },
        "Commerce Stream": {
            subtitle: "Designed for business, finance, and entrepreneurial careers.",
            subjects: ["Accountancy", "Business Studies", "Economics", "Entrepreneurship"],
        },
        "Humanities / Arts": {
            subtitle: "Exploring society, behavior, governance, and critical thinking.",
            subjects: ["History", "Political Science", "Sociology", "Psychology"],
        },
        "Skill & Applied Subjects": {
            subtitle: "Career-oriented learning with practical exposure.",
            subjects: ["Computer Science", "Physical Education", "Data Entry Operations", "Environmental Studies (EVS)"],
        },
        "Regional Languages": {
            subtitle: "",
            subjects: ["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Gujarati", "Bengali", "Urdu"],
        },
        "Foreign Languages": {
            subtitle: "",
            subjects: ["French", "German", "Spanish", "Japanese", "Arabic", "Russian"],
        },
    };
};

const daysOptions = ["1 day per week", "2 days per week", "3 days per week", "4 days per week", "5 days per week", "6 days per week", "7 days (daily)"];
const startOptions = ["Immediately", "In a week", "In a month"];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TuitionBooking() {
    const params = new URLSearchParams(window.location.search);
    const labelParam = params.get("label") || "elementary-level";
    const itemParam = params.get("item") || "class-1";

    const formatParam = (str) => str.toLowerCase().replace(/\s+/g, "-");
    const matchedMenu = tuitionsMenu.find((m) => formatParam(m.label) === labelParam);
    const matchedItem = matchedMenu?.items.find((i) => formatParam(i) === itemParam) || matchedMenu?.items[0] || "Class 1";

    const [step, setStep] = useState(1);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedDays, setSelectedDays] = useState(null);
    const [selectedStart, setSelectedStart] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "", countryCode: "+91" });
    const [formErrors, setFormErrors] = useState({});
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

    const boardRef = useRef(null);
    const subjectRef = useRef(null);
    const scheduleRef = useRef(null);
    const contactRef = useRef(null);

    const subjectGroups = getSubjectsByClass(matchedItem);

    const scrollTo = (ref) => {
        setTimeout(() => {
            ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
    };

    const toggleSubject = (s) => {
        setSelectedSubjects((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    };

    const handleBoardSelect = (id) => {
        setSelectedBoard(id);
        if (id) { setStep(2); scrollTo(subjectRef); }
    };

    const handleSubjectsNext = () => {
        if (selectedSubjects.length === 0) return;
        setStep(3);
        scrollTo(scheduleRef);
    };

    const handleScheduleNext = () => {
        if (!selectedDays || !selectedStart) return;
        setStep(4);
        scrollTo(contactRef);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Valid email required";
        if (!formData.mobile.match(/^\d{7,12}$/)) errors.mobile = "Valid mobile number required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleContactNext = () => {
        if (!validateForm()) return;
        const generated = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(generated);
        setShowOtp(true);
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
    };

    const handleOtpDigit = (val, idx) => {
        const digits = [...otpDigits];
        digits[idx] = val.replace(/\D/, "").slice(-1);
        setOtpDigits(digits);
        if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
    };

    const handleOtpKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
            document.getElementById(`otp-${idx - 1}`)?.focus();
        }
    };

    const verifyOtp = () => {
        const entered = otpDigits.join("");
        if (entered === otp) {
            setShowOtp(false);
            setSubmitted(true);
        } else {
            setOtpError("Incorrect OTP. Please try again.");
        }
    };

    const fontStyle = (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
            .tb-page, .tb-page * { font-family: 'Poppins', sans-serif; }
            .tb-page .react-tel-input .form-control { font-family: 'Poppins', sans-serif; }
            @media (prefers-reduced-motion: reduce) { .tb-page * { transition: none !important; } }
        `}</style>
    );

    // ── Success screen ──
    if (submitted) {
        return (
            <>
                <Header />
                <div className="tb-page min-h-screen flex items-center justify-center p-6" style={{ background: T.peach }}>
                    {fontStyle}
                    <FadeUp className="text-center max-w-md w-full">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: themes[3].iconBg }}>
                            <svg className="w-12 h-12" style={{ color: themes[3].iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-extrabold mb-3" style={{ color: T.ink }}>
                            You're{" "}
                            <span className="rounded-lg px-3 py-0.5 italic" style={{ background: T.yellow, color: T.coral }}>all set!</span>
                        </h2>
                        <p className="mb-2" style={{ color: T.muted }}>Booking confirmed for <span className="font-semibold" style={{ color: T.ink }}>{matchedItem}</span></p>
                        <p className="mb-8" style={{ color: T.muted }}>Our team will reach out to <span className="font-semibold" style={{ color: T.coral }}>+{formData.mobile}</span> within 24 hours.</p>
                        <div className="rounded-3xl p-5 mb-8 text-left" style={{ background: themes[2].cardBg }}>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><p className="text-xs mb-1" style={{ color: T.muted }}>Board</p><p className="font-bold" style={{ color: T.ink }}>{boards.find(b => b.id === selectedBoard)?.name}</p></div>
                                <div><p className="text-xs mb-1" style={{ color: T.muted }}>Class</p><p className="font-bold" style={{ color: T.ink }}>{matchedItem}</p></div>
                                <div><p className="text-xs mb-1" style={{ color: T.muted }}>Subjects</p><p className="font-bold" style={{ color: T.ink }}>{selectedSubjects.join(", ")}</p></div>
                                <div><p className="text-xs mb-1" style={{ color: T.muted }}>Schedule</p><p className="font-bold" style={{ color: T.ink }}>{selectedDays} · {selectedStart}</p></div>
                            </div>
                        </div>
                        <button
                            onClick={() => window.location.href = "/"}
                            className="w-full py-4 rounded-xl text-white font-bold text-base transition-all hover:opacity-90 active:scale-95 shadow-lg"
                            style={{ background: T.coral }}
                        >
                            Back to home
                        </button>
                    </FadeUp>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="tb-page min-h-screen" style={{ background: T.peach }}>
                {fontStyle}

                {/* Sticky progress header */}
                <div className="sticky top-0 z-40 backdrop-blur-md px-4 py-4" style={{ background: "rgba(253,241,233,0.88)", borderBottom: `1px solid ${T.line}` }}>
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold mb-0.5" style={{ color: T.coral }}>Tuition booking</p>
                            <h1 className="font-extrabold text-lg" style={{ color: T.ink }}>
                                {matchedItem} <span className="font-medium text-sm" style={{ color: T.muted }}>· {matchedMenu?.label}</span>
                            </h1>
                        </div>
                        <div className="flex gap-1.5" aria-label={`Step ${step} of 4`}>
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className="h-2 rounded-full transition-all duration-500"
                                    style={{
                                        width: step === s ? "28px" : "8px",
                                        background: step >= s ? T.coral : "#E7D5CB",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4 pb-24 pt-10 space-y-16">

                    {/* Step 1 — Board Selection */}
                    <section ref={boardRef}>
                        <StepHeader number={1} title="Boards we offer" subtitle="A strong academic foundation across national and international curricula." active={true} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {boards.map((b, i) => {
                                const th = themes[i % themes.length];
                                const selected = selectedBoard === b.id;
                                return (
                                    <motion.button
                                        key={b.id}
                                        onClick={() => handleBoardSelect(b.id)}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        className="relative text-left p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:-translate-y-1"
                                        style={{
                                            backgroundColor: th.cardBg,
                                            boxShadow: selected ? `0 0 0 3px ${T.coral}, 0 12px 24px rgba(235,102,100,0.22)` : "none",
                                        }}
                                        aria-pressed={selected}
                                    >
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3" style={{ backgroundColor: th.iconBg }}>{b.icon}</div>
                                        <p className="font-extrabold text-lg mb-1" style={{ color: T.ink }}>{b.name}</p>
                                        <p className="text-xs leading-relaxed text-gray-700">{b.desc}</p>
                                        {selected && (
                                            <span className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-bold rounded-md px-2 py-1" style={{ background: T.coral }}>
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                Selected
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Step 2 — Subject Selection */}
                    {step >= 2 && (
                        <FadeUp>
                            <section ref={subjectRef} style={{ scrollMarginTop: "100px" }}>
                                <StepHeader number={2} title="Select subjects" subtitle="Choose all subjects you need help with." active={step === 2} />
                                <div className="mt-6 space-y-8">
                                    {Object.entries(subjectGroups).map(([groupName, { subtitle, subjects }], gi) => {
                                        const th = themes[gi % themes.length];
                                        return (
                                            <div key={groupName} className="rounded-3xl p-5 sm:p-6" style={{ background: T.peachSoft, border: `1px solid ${T.line}` }}>
                                                <div className="mb-4 flex items-start gap-3">
                                                    <span className="mt-1 w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: th.badgeBg }}></span>
                                                    <div>
                                                        <p className="text-base font-extrabold" style={{ color: T.ink }}>{groupName}</p>
                                                        {subtitle && <p className="text-xs mt-0.5 italic text-gray-700">{subtitle}</p>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {subjects.map((s) => {
                                                        const checked = selectedSubjects.includes(s);
                                                        return (
                                                            <button
                                                                key={`${groupName}-${s}`}
                                                                onClick={() => toggleSubject(s)}
                                                                aria-pressed={checked}
                                                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
                                                                style={checked
                                                                    ? { background: th.cardBg, boxShadow: `0 0 0 2px ${th.badgeBg}` }
                                                                    : { background: "#FFFFFF", boxShadow: `0 0 0 1px ${T.line}` }}
                                                            >
                                                                <div
                                                                    className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all"
                                                                    style={checked ? { background: th.badgeBg } : { boxShadow: "inset 0 0 0 2px #D1D5DB" }}
                                                                >
                                                                    {checked && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                                                </div>
                                                                <span className="text-sm font-medium" style={{ color: T.ink }}>{s}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {selectedSubjects.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {selectedSubjects.map(s => (
                                            <span key={s} className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: T.yellow, color: T.coralDark }}>{s}</span>
                                        ))}
                                    </div>
                                )}
                                <NextButton
                                    onClick={handleSubjectsNext}
                                    disabled={selectedSubjects.length === 0}
                                    label={`Continue with ${selectedSubjects.length} subject${selectedSubjects.length !== 1 ? "s" : ""}`}
                                />
                            </section>
                        </FadeUp>
                    )}

                    {/* Step 3 — Schedule */}
                    {step >= 3 && (
                        <FadeUp>
                            <section ref={scheduleRef} style={{ scrollMarginTop: "100px" }}>
                                <StepHeader number={3} title="Set your schedule" active={step === 3} />
                                <div className="mt-6 space-y-8">
                                    <div>
                                        <p className="text-sm font-bold mb-4" style={{ color: T.ink }}>How many days per week?</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {daysOptions.map((d) => (
                                                <RadioCard key={d} label={d} selected={selectedDays === d} onClick={() => setSelectedDays(d)} />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold mb-4" style={{ color: T.ink }}>When would you like to start?</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {startOptions.map((s) => (
                                                <RadioCard key={s} label={s} selected={selectedStart === s} onClick={() => setSelectedStart(s)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <NextButton onClick={handleScheduleNext} label="Continue to contact info" />
                            </section>
                        </FadeUp>
                    )}

                    {/* Step 4 — Contact Info */}
                    {step >= 4 && (
                        <FadeUp>
                            <section ref={contactRef} style={{ scrollMarginTop: "100px" }}>
                                <StepHeader number={4} title="Your details" subtitle="We'll use this to confirm your booking." active={step === 4} />
                                <div className="mt-6 bg-white rounded-3xl p-6 space-y-5 shadow-sm" style={{ border: `1px solid ${T.line}` }}>
                                    <InputField
                                        label="Student full name"
                                        placeholder="e.g. Rahul Sharma"
                                        value={formData.name}
                                        onChange={(v) => setFormData({ ...formData, name: v })}
                                        error={formErrors.name}
                                        icon={<UserIcon />}
                                    />
                                    <InputField
                                        label="Email address"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(v) => setFormData({ ...formData, email: v })}
                                        error={formErrors.email}
                                        icon={<MailIcon />}
                                        type="email"
                                    />
                                    <div>
                                        <label className="block text-sm font-semibold mb-2" style={{ color: T.ink }}>
                                            Mobile number <span className="text-red-500">*</span>
                                        </label>

                                        <div className="relative">
                                            <PhoneInput
                                                country={"in"}
                                                value={formData.mobile}
                                                onChange={(value) => {
                                                    setFormData({ ...formData, mobile: value });
                                                    if (formErrors.mobile) {
                                                        setFormErrors({ ...formErrors, mobile: "" });
                                                    }
                                                }}
                                                enableSearch
                                                preferredCountries={["in", "us", "gb", "au", "ca"]}
                                                inputClass={`!w-full !h-[50px] !pl-[60px] !bg-[#FDF1E9] !border-2 ${formErrors.mobile ? "!border-red-300" : "!border-transparent"} !rounded-xl !text-sm focus:!border-[#EB6664]`}
                                                buttonClass="!bg-[#FBE3D3] !border-2 !border-transparent !rounded-l-xl"
                                                containerClass="!w-full"
                                            />
                                        </div>

                                        {formErrors.mobile && (
                                            <p className="text-xs text-red-500 mt-1">{formErrors.mobile}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Booking Summary */}
                                <div className="mt-5 p-6 rounded-3xl text-white" style={{ background: T.coral }}>
                                    <p className="text-sm font-bold mb-4">Booking summary</p>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <SummaryItem label="Class" value={matchedItem} />
                                        <SummaryItem label="Board" value={boards.find(b => b.id === selectedBoard)?.name} />
                                        <SummaryItem label="Subjects" value={`${selectedSubjects.length} selected`} />
                                        <SummaryItem label="Days/week" value={selectedDays} />
                                        <SummaryItem label="Starting" value={selectedStart} />
                                    </div>
                                </div>

                                <NextButton onClick={handleContactNext} label="Send OTP & confirm" />
                            </section>
                        </FadeUp>
                    )}
                </div>

                {/* OTP Modal */}
                {showOtp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(17,24,39,0.5)", backdropFilter: "blur(8px)" }}>
                        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: themes[1].iconBg }}>
                                    <svg className="w-8 h-8" style={{ color: themes[1].iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-extrabold mb-1" style={{ color: T.ink }}>
                                    Verify your <span className="rounded-lg px-2 italic" style={{ background: T.yellow, color: T.coral }}>number</span>
                                </h3>
                                <p className="text-sm mt-2" style={{ color: T.muted }}>OTP sent to {formData.countryCode} {formData.mobile}</p>
                            </div>

                            <div className="rounded-2xl p-3 mb-6 text-center" style={{ background: themes[2].cardBg }}>
                                <p className="text-xs font-semibold mb-1" style={{ color: themes[2].iconColor }}>Your OTP (shown for demo)</p>
                                <p className="text-2xl font-extrabold tracking-[0.3em]" style={{ color: T.coral }}>{otp}</p>
                            </div>

                            <div className="flex gap-2 justify-center mb-6">
                                {[0, 1, 2, 3, 4, 5].map((idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={otpDigits[idx]}
                                        onChange={(e) => handleOtpDigit(e.target.value, idx)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                                        className="w-11 h-12 text-center text-xl font-bold rounded-xl border-2 focus:outline-none transition-all"
                                        style={{
                                            borderColor: otpDigits[idx] ? T.coral : T.line,
                                            background: otpDigits[idx] ? T.peachDeep : T.peach,
                                            color: T.coral,
                                        }}
                                    />
                                ))}
                            </div>

                            {otpError && <p className="text-red-500 text-sm text-center mb-4">{otpError}</p>}

                            <button
                                onClick={verifyOtp}
                                disabled={otpDigits.join("").length < 6}
                                className="w-full py-4 rounded-xl text-white font-bold text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ background: T.coral }}
                            >
                                Verify & confirm booking
                            </button>
                            <button onClick={() => setShowOtp(false)} className="w-full mt-3 py-3 text-sm font-semibold transition-colors hover:opacity-70" style={{ color: T.muted }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-8% 0px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

function StepHeader({ number, title, subtitle, active }) {
    return (
        <div className="flex items-start gap-4">
            <div
                className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all"
                style={active ? { background: T.coral, color: "white" } : { background: "#E7D5CB", color: "#7B6A62" }}
            >
                {String(number).padStart(2, "0")}
            </div>
            <div>
                <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: T.ink }}>{title}</h2>
                {subtitle && <p className="text-sm italic mt-0.5" style={{ color: T.muted }}>{subtitle}</p>}
            </div>
        </div>
    );
}

function RadioCard({ label, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-pressed={selected}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-left w-full"
            style={selected
                ? { background: themes[2].cardBg, boxShadow: `0 0 0 2px ${T.coral}` }
                : { background: "#FFFFFF", boxShadow: `0 0 0 1px ${T.line}` }}
        >
            <div
                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={selected ? { background: T.coral } : { boxShadow: "inset 0 0 0 2px #D1D5DB" }}
            >
                {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className="text-sm font-medium" style={{ color: T.ink }}>{label}</span>
        </button>
    );
}

function NextButton({ onClick, disabled, label }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="mt-8 w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed shadow-lg"
            style={disabled
                ? { background: "#E7D5CB", color: "#7B6A62", boxShadow: "none" }
                : { background: T.coral, color: "white" }}
        >
            {label || "Continue"}
        </button>
    );
}

function InputField({ label, placeholder, value, onChange, error, icon, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: T.ink }}>{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: T.coral }}>{icon}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-sm focus:outline-none transition-colors ${error ? "border-red-300 bg-red-50" : "border-transparent focus:border-[#EB6664]"}`}
                    style={error ? { color: T.ink } : { background: T.peach, color: T.ink }}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

function SummaryItem({ label, value }) {
    return (
        <div>
            <p className="text-xs text-white/80 mb-0.5">{label}</p>
            <p className="font-semibold text-white text-sm">{value}</p>
        </div>
    );
}

function UserIcon() {
    return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
}

function MailIcon() {
    return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
}