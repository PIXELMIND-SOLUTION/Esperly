import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-[10px] font-bold text-[#3A2E1A] tracking-widest mb-1.5 uppercase">
      {label} {required && <span className="text-[#EB6664]">*</span>}
    </label>
    {children}
    {error && <p className="text-[#EB6664] text-[11px] mt-1">✗ {error}</p>}
  </div>
);

const inputCls = (err) =>
  `w-full bg-transparent text-sm text-[#1C1209] outline-none border-b py-2 transition-all placeholder:text-[#7A6E5A]/50 ${err ? "border-[#EB6664]" : "border-[#EB6664]/20 focus:border-[#EB6664]/60"
  }`;

const selectCls = (err) =>
  `w-full bg-transparent text-sm text-[#1C1209] outline-none border-b py-2 transition-all appearance-none cursor-pointer ${err ? "border-[#EB6664]" : "border-[#EB6664]/20 focus:border-[#EB6664]/60"
  }`;

const SESSION_TYPES = [
  { value: "1on1", label: "1-on-1", icon: "👤", desc: "Personal attention" },
  { value: "group", label: "Group", icon: "👥", desc: "Learn together" },
];

const GRADES = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12",
];

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center text-center py-8 px-4"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
      className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-5 text-4xl"
    >
      ✓
    </motion.div>
    <h3 className="text-xl font-bold text-[#1C1209] mb-2">Session Booked!</h3>
    <p className="text-sm text-[#7A6E5A] max-w-xs leading-relaxed mb-7">
      We've received your request. Our team will reach out within 2 business hours to confirm your session.
    </p>
    <div className="flex flex-col gap-2.5 w-full max-w-xs">
      <button
        onClick={onClose}
        className="w-full bg-[#EB6664] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#EB6664]/90 transition-colors"
      >
        Done
      </button>
      <button
        onClick={onClose}
        className="w-full border border-[#EB6664]/25 text-[#EB6664] font-semibold py-2.5 rounded-xl text-sm hover:bg-[#EB6664]/5 transition-colors"
      >
        Book Another Session
      </button>
    </div>
  </motion.div>
);

// ─── Main Modal ───────────────────────────────────────────────────────────────
const BookSessionModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    studentName: "",
    mobile: "",
    email: "",
    className: "",
    grade: "",
    type: "",
    message: "",
  });

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const reset = () => {
    setForm({ studentName: "", mobile: "", email: "", className: "", grade: "", type: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handlePhone = (value) => {
    setForm((p) => ({ ...p, mobile: value }));
    if (errors.mobile) setErrors((p) => ({ ...p, mobile: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.studentName.trim()) e.studentName = "Student name is required";
    if (!form.mobile || form.mobile.length < 7) e.mobile = "Valid mobile number is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.className.trim()) e.className = "Class / School is required";
    if (!form.grade) e.grade = "Please select a grade";
    if (!form.type) e.type = "Please choose a session type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Session booked:", form);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(28,18,9,0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => e.target === overlayRef.current && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#FEFCF8] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "92vh" }}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#EB6664] via-[#EB6664]/70 to-[#EB6664]/30 flex-shrink-0" />

            {/* Corner deco */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EB6664]/5 rotate-45 translate-x-12 -translate-y-12" />
            </div>

            {/* Header */}
            {!submitted && (
              <div className="px-5 sm:px-7 pt-5 pb-4 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-px bg-[#EB6664]/50" />
                      <span className="text-[10px] font-bold text-[#EB6664] tracking-widest uppercase">
                        Esperly
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#1C1209] leading-tight">
                      Book a Session
                    </h2>
                    <p className="text-xs text-[#7A6E5A] mt-0.5">
                      Fill in the details and we'll get back to you shortly
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A6E5A] hover:bg-[#EB6664]/10 hover:text-[#EB6664] transition-all text-lg leading-none flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Scrollable body */}
            <div
              className="flex-1 overflow-y-auto px-5 sm:px-7 pb-2"
              style={{ overscrollBehavior: "contain" }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessScreen key="success" onClose={handleClose} />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5 pb-2"
                  >
                    {/* Student Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Student Name" required error={errors.studentName}>
                        <input
                          name="studentName"
                          value={form.studentName}
                          onChange={handleChange}
                          placeholder="Arjun Sharma"
                          className={inputCls(errors.studentName)}
                        />
                      </Field>
                      <Field label="Email Address" required error={errors.email}>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="arjun@email.com"
                          className={inputCls(errors.email)}
                        />
                      </Field>
                    </div>

                    {/* Mobile */}
                    <Field label="Mobile Number" required error={errors.mobile}>
                      <div className="phone-input-wrap">
                        <style>{`
                          .phone-input-wrap .react-tel-input .form-control {
                            width:100%;height:38px;background:transparent;border:none;
                            border-bottom:1px solid rgba(235,102,100,0.2);border-radius:0;
                            padding-left:54px;font-size:14px;color:#1C1209;
                          }
                          .phone-input-wrap .react-tel-input .form-control:focus{
                            border-bottom-color:rgba(235,102,100,0.6);box-shadow:none;
                          }
                          .phone-input-wrap .react-tel-input .flag-dropdown{
                            background:transparent;border:none;
                            border-bottom:1px solid rgba(235,102,100,0.2);border-radius:0;
                          }
                          .phone-input-wrap .react-tel-input .selected-flag{background:transparent!important;padding:0 8px 0 10px;}
                          .phone-input-wrap .react-tel-input .country-list{
                            background:#FCFAF5;border:1px solid rgba(235,102,100,0.15);
                            border-radius:12px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);z-index:99;
                          }
                          .phone-input-wrap .react-tel-input .country-list .country:hover{background:rgba(235,102,100,0.05);}
                          .phone-input-wrap .react-tel-input .country-list .country.highlight{background:rgba(235,102,100,0.1);}
                        `}</style>
                        <PhoneInput
                          country="in"
                          value={form.mobile}
                          onChange={handlePhone}
                          preferredCountries={["in", "us", "gb", "au", "ca"]}
                          enableSearch
                          searchPlaceholder="Search country..."
                          autoFormat
                        />
                      </div>
                    </Field>

                    {/* Class + Grade */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Class / School" required error={errors.className}>
                        <input
                          name="className"
                          value={form.className}
                          onChange={handleChange}
                          placeholder="e.g. Delhi Public School"
                          className={inputCls(errors.className)}
                        />
                      </Field>
                      <Field label="Grade" required error={errors.grade}>
                        <div className="relative">
                          <select
                            name="grade"
                            value={form.grade}
                            onChange={handleChange}
                            className={selectCls(errors.grade)}
                          >
                            <option value="">Select grade</option>
                            {GRADES.map((g) => (
                              <option key={g}>{g}</option>
                            ))}
                          </select>
                          <span className="absolute right-0 top-2.5 text-[#EB6664]/50 pointer-events-none text-xs">▼</span>
                        </div>
                      </Field>
                    </div>

                    {/* Session Type */}
                    <Field label="Session Type" required error={errors.type}>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {SESSION_TYPES.map(({ value, label, icon, desc }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setForm((p) => ({ ...p, type: value }));
                              if (errors.type) setErrors((p) => ({ ...p, type: "" }));
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${form.type === value
                                ? "border-[#EB6664] bg-[#EB6664]/5"
                                : "border-[#EB6664]/15 hover:border-[#EB6664]/40"
                              }`}
                          >
                            <span className="text-xl">{icon}</span>
                            <div>
                              <p className={`text-sm font-bold leading-none ${form.type === value ? "text-[#EB6664]" : "text-[#1C1209]"}`}>
                                {label}
                              </p>
                              <p className="text-[10px] text-[#7A6E5A] mt-0.5">{desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </Field>

                    {/* Message */}
                    <Field label="Message (optional)">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us your goals, preferred subjects, or anything else we should know..."
                        className={`${inputCls(false)} resize-none`}
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="px-5 sm:px-7 py-4 border-t border-[#EB6664]/10 flex gap-3 flex-shrink-0">
                <button
                  onClick={handleClose}
                  className="flex-1 border border-[#EB6664]/25 text-[#7A6E5A] font-semibold py-3 rounded-xl text-sm hover:bg-[#EB6664]/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#EB6664] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#EB6664]/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Book Session →"
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookSessionModal;