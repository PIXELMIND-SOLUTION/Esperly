import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
    const allSubjects = Object.values(subjectGroups).flatMap(g => g.subjects);

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

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #EB6664, #F4956A)" }}>
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        You're all set!
                    </h2>
                    <p className="text-gray-500 mb-2">Booking confirmed for <span className="font-semibold text-gray-700">{matchedItem}</span></p>
                    <p className="text-gray-500 mb-8">Our team will reach out to <span className="font-semibold" style={{ color: "#EB6664" }}>{formData.mobile}</span> within 24 hours.</p>
                    <div className="bg-white rounded-2xl border border-rose-100 p-5 mb-8 text-left shadow-sm">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><p className="text-gray-400 text-xs mb-1">Board</p><p className="font-semibold text-gray-700">{boards.find(b => b.id === selectedBoard)?.name}</p></div>
                            <div><p className="text-gray-400 text-xs mb-1">Class</p><p className="font-semibold text-gray-700">{matchedItem}</p></div>
                            <div><p className="text-gray-400 text-xs mb-1">Subjects</p><p className="font-semibold text-gray-700">{selectedSubjects.join(", ")}</p></div>
                            <div><p className="text-gray-400 text-xs mb-1">Schedule</p><p className="font-semibold text-gray-700">{selectedDays} · {selectedStart}</p></div>
                        </div>
                    </div>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all hover:opacity-90 active:scale-95"
                        style={{ background: "linear-gradient(135deg, #EB6664, #F4956A)" }}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

                {/* Header */}
                <div className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-rose-100 px-4 py-4">
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Tuition Booking</p>
                            <h1 className="font-bold text-gray-800 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {matchedItem} · {matchedMenu?.label}
                            </h1>
                        </div>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4].map((s) => (
                                <div
                                    key={s}
                                    className="h-2 rounded-full transition-all duration-500"
                                    style={{
                                        width: step === s ? "28px" : "8px",
                                        background: step >= s ? "linear-gradient(90deg, #EB6664, #F4956A)" : "#e5e7eb",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4 pb-24 pt-8 space-y-16">

                    {/* Step 1 — Board Selection */}
                    <section ref={boardRef}>
                        <StepHeader number={1} title="Boards We Offer" subtitle="A strong academic foundation across national and international curriculam." active={true} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {boards.map((b) => (
                                <button
                                    key={b.id}
                                    onClick={() => handleBoardSelect(b.id)}
                                    className={`group text-left p-5 rounded-2xl border-2 transition-all duration-300 ${selectedBoard === b.id
                                        ? "border-transparent shadow-lg scale-[1.02]"
                                        : "border-rose-100 bg-white hover:border-rose-300 hover:shadow-md"
                                        }`}
                                    style={selectedBoard === b.id ? { background: "linear-gradient(135deg, #EB6664, #F4956A)", color: "white" } : {}}
                                >
                                    <div className="text-3xl mb-3">{b.icon}</div>
                                    <p className={`font-bold text-lg mb-1 ${selectedBoard === b.id ? "text-white" : "text-gray-800"}`}>{b.name}</p>
                                    <p className={`text-xs leading-relaxed ${selectedBoard === b.id ? "text-rose-100" : "text-gray-400"}`}>{b.desc}</p>
                                    {selectedBoard === b.id && (
                                        <div className="mt-3 flex items-center gap-1 text-white text-xs font-medium">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                            Selected
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Step 2 — Subject Selection */}
                    {step >= 2 && (
                        <section ref={subjectRef} style={{ scrollMarginTop: "100px" }}>
                            <StepHeader number={2} title="Select Subjects" subtitle="Choose all subjects you need help with" active={step === 2} />
                            <div className="mt-6 space-y-8">
                                {Object.entries(subjectGroups).map(([groupName, { subtitle, subjects }]) => (
                                    <div key={groupName}>
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold text-gray-700 uppercase tracking-widest">{groupName}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 italic">{subtitle}</p>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {subjects.map((s) => {
                                                const checked = selectedSubjects.includes(s);
                                                return (
                                                    <button
                                                        key={`${groupName}-${s}`}
                                                        onClick={() => toggleSubject(s)}
                                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left ${checked ? "border-transparent shadow-md" : "border-gray-100 bg-white hover:border-rose-200"}`}
                                                        style={checked ? { background: "linear-gradient(135deg, #FFF1F1, #FFF3EE)", borderColor: "#EB6664" } : {}}
                                                    >
                                                        <div
                                                            className="w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all"
                                                            style={checked ? { background: "linear-gradient(135deg, #EB6664, #F4956A)", borderColor: "transparent" } : { borderColor: "#d1d5db" }}
                                                        >
                                                            {checked && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                                        </div>
                                                        <span className={`text-sm font-medium ${checked ? "text-rose-700" : "text-gray-600"}`}>{s}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {selectedSubjects.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {selectedSubjects.map(s => (
                                        <span key={s} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#FFEAEA", color: "#EB6664" }}>{s}</span>
                                    ))}
                                </div>
                            )}
                            <NextButton
                                onClick={handleSubjectsNext}
                                disabled={selectedSubjects.length === 0}
                                label={`Continue with ${selectedSubjects.length} subject${selectedSubjects.length !== 1 ? "s" : ""}`}
                            />
                        </section>
                    )}

                    {/* Step 3 — Schedule */}
                    {step >= 3 && (
                        <section ref={scheduleRef} style={{ scrollMarginTop: "100px" }}>
                            <StepHeader number={3} title="Set your Schedule" active={step === 3} />
                            <div className="mt-6 space-y-8">
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">How many days per week?</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {daysOptions.map((d) => (
                                            <RadioCard key={d} label={d} selected={selectedDays === d} onClick={() => setSelectedDays(d)} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">When would you like to start?</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {startOptions.map((s) => (
                                            <RadioCard key={s} label={s} selected={selectedStart === s} onClick={() => setSelectedStart(s)} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <NextButton onClick={handleScheduleNext} disabled={!selectedDays || !selectedStart} label="Continue to Contact Info" />
                        </section>
                    )}

                    {/* Step 4 — Contact Info */}
                    {step >= 4 && (
                        <section ref={contactRef} style={{ scrollMarginTop: "100px" }}>
                            <StepHeader number={4} title="Your Details" subtitle="We'll use this to confirm your booking" active={step === 4} />
                            <div className="mt-6 bg-white rounded-2xl border border-rose-100 p-6 space-y-5 shadow-sm">
                                <InputField
                                    label="Student Full Name"
                                    placeholder="e.g. Rahul Sharma"
                                    value={formData.name}
                                    onChange={(v) => setFormData({ ...formData, name: v })}
                                    error={formErrors.name}
                                    icon={<UserIcon />}
                                />
                                <InputField
                                    label="Email Address"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(v) => setFormData({ ...formData, email: v })}
                                    error={formErrors.email}
                                    icon={<MailIcon />}
                                    type="email"
                                />
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                                        Mobile Number <span className="text-red-500">*</span>
                                    </label>

                                    <div className={`relative ${formErrors.mobile ? "border-red-300" : ""}`}>
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
                                            inputClass="!w-full !h-[50px] !pl-[60px] !bg-gray-50 !border-2 !border-gray-100 !rounded-xl !text-sm focus:!border-rose-300"
                                            buttonClass="!bg-gray-50 !border-2 !border-gray-100 !rounded-l-xl"
                                            containerClass="!w-full"
                                        />
                                    </div>

                                    {formErrors.mobile && (
                                        <p className="text-xs text-red-500 mt-1">{formErrors.mobile}</p>
                                    )}
                                </div>
                            </div>

                            {/* Booking Summary */}
                            <div className="mt-5 p-5 rounded-2xl text-white" style={{ background: "linear-gradient(135deg, #EB6664, #F4956A)" }}>
                                <p className="text-xs font-semibold uppercase tracking-widest text-rose-100 mb-3">Booking Summary</p>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <SummaryItem label="Class" value={matchedItem} />
                                    <SummaryItem label="Board" value={boards.find(b => b.id === selectedBoard)?.name} />
                                    <SummaryItem label="Subjects" value={`${selectedSubjects.length} selected`} />
                                    <SummaryItem label="Days/Week" value={selectedDays} />
                                    <SummaryItem label="Starting" value={selectedStart} />
                                </div>
                            </div>

                            <NextButton onClick={handleContactNext} label="Send OTP & Confirm →" />
                        </section>
                    )}
                </div>

                {/* OTP Modal */}
                {showOtp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
                        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #EB6664, #F4956A)" }}>
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Verify your number</h3>
                                <p className="text-gray-400 text-sm">OTP sent to {formData.countryCode} {formData.mobile}</p>
                            </div>

                            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-6 text-center">
                                <p className="text-xs text-rose-500 font-medium mb-1">Your OTP (shown for demo)</p>
                                <p className="text-2xl font-bold tracking-[0.3em]" style={{ color: "#EB6664" }}>{otp}</p>
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
                                            borderColor: otpDigits[idx] ? "#EB6664" : "#e5e7eb",
                                            background: otpDigits[idx] ? "#FFF1F1" : "#f9fafb",
                                            color: "#EB6664"
                                        }}
                                    />
                                ))}
                            </div>

                            {otpError && <p className="text-red-500 text-sm text-center mb-4">{otpError}</p>}

                            <button
                                onClick={verifyOtp}
                                disabled={otpDigits.join("").length < 6}
                                className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ background: "linear-gradient(135deg, #EB6664, #F4956A)" }}
                            >
                                Verify & Confirm Booking
                            </button>
                            <button onClick={() => setShowOtp(false)} className="w-full mt-3 py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors">
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

function StepHeader({ number, title, subtitle, active }) {
    return (
        <div className="flex items-start gap-4">
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all"
                style={active ? { background: "linear-gradient(135deg, #EB6664, #F4956A)", color: "white" } : { background: "#f3f4f6", color: "#9ca3af" }}
            >
                {number}
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
                {subtitle && <p className="text-sm italic text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
}

function RadioCard({ label, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left w-full ${selected ? "shadow-md border-transparent" : "border-gray-100 bg-white hover:border-rose-200"}`}
            style={selected ? { background: "linear-gradient(135deg, #FFF1F1, #FFF3EE)", borderColor: "#EB6664" } : {}}
        >
            <div
                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                style={selected ? { borderColor: "#EB6664", background: "#EB6664" } : { borderColor: "#d1d5db" }}
            >
                {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className={`text-sm font-medium ${selected ? "text-rose-700" : "text-gray-600"}`}>{label}</span>
        </button>
    );
}

function NextButton({ onClick, disabled, label }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="mt-8 w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: disabled ? "#e5e7eb" : "linear-gradient(135deg, #EB6664, #F4956A)", color: disabled ? "#9ca3af" : "white" }}
        >
            {label || "Continue →"}
        </button>
    );
}

function InputField({ label, placeholder, value, onChange, error, icon, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-sm focus:outline-none transition-colors ${error ? "border-red-300 bg-red-50" : "border-gray-100 bg-gray-50 focus:border-rose-300"}`}
                />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

function SummaryItem({ label, value }) {
    return (
        <div>
            <p className="text-xs text-rose-200 mb-0.5">{label}</p>
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