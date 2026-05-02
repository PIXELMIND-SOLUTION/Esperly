import { useState, useEffect, useRef } from "react";
import pdf from "../assets/brochure.pdf";

const OTP_LENGTH = 6;

function BrochureModal({ onClose }) {
  const [step, setStep] = useState("form"); // "form" | "otp" | "success"
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  /* countdown for resend */
  const startResendTimer = () => {
    setResendTimer(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  /* ── Step 1: submit name + mobile ── */
  const handleFormSubmit = async () => {
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Enter a valid 10-digit mobile number.");
    setSending(true);
    /* TODO: replace with real OTP send API */
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    startResendTimer();
    setStep("otp");
  };

  /* ── OTP input handling ── */
  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < OTP_LENGTH - 1) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (text.length === OTP_LENGTH) {
      setOtp(text.split(""));
      otpRefs.current[OTP_LENGTH - 1]?.focus();
    }
    e.preventDefault();
  };

  /* ── Step 2: verify OTP ── */
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return setError("Enter all 6 digits.");
    setError("");
    setVerifying(true);
    /* TODO: replace with real OTP verify API */
    await new Promise((r) => setTimeout(r, 1000));
    setVerifying(false);
    /* For demo, accept any 6-digit code */
    setStep("success");
    triggerDownload();
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = "brochure.pdf";
    link.click();
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    startResendTimer();
    setError("");
  };

  /* ── backdrop click ── */
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header stripe */}
        <div className="bg-gradient-to-r from-[#EB6664] to-[#e04e4c] px-6 py-5">
          <p className="text-xs font-semibold tracking-widest text-red-100 uppercase mb-1">Company Brochure</p>
          <h2 className="text-xl font-bold text-white leading-tight">
            {step === "form" && "Get your free brochure"}
            {step === "otp" && "Verify your number"}
            {step === "success" && "You're all set!"}
          </h2>
          {step === "otp" && (
            <p className="text-sm text-red-100 mt-1">OTP sent to +91 {mobile}</p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Body */}
        <div className="px-6 py-6">

          {/* ── STEP 1: Form ── */}
          {step === "form" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Fill in your details and we'll verify your number to download the brochure.
              </p>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Eg. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20 outline-none text-sm text-gray-800 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Mobile Number
                </label>
                <div className="flex">
                  <span className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500 font-medium">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                    className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20 outline-none text-sm text-gray-800 transition"
                  />
                </div>
              </div>
              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
              <button
                onClick={handleFormSubmit}
                disabled={sending}
                className="w-full py-3 rounded-xl bg-[#EB6664] hover:bg-[#d95a58] active:scale-[0.98] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {sending ? "Sending OTP…" : "Send OTP →"}
              </button>
            </div>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === "otp" && (
            <div className="space-y-5">
              <p className="text-sm text-gray-500">
                Enter the 6-digit code sent to your mobile number.
              </p>
              <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 border-gray-200 focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20 outline-none text-gray-800 transition"
                  />
                ))}
              </div>
              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
              <button
                onClick={handleVerify}
                disabled={verifying || otp.join("").length < OTP_LENGTH}
                className="w-full py-3 rounded-xl bg-[#EB6664] hover:bg-[#d95a58] active:scale-[0.98] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {verifying ? "Verifying…" : "Verify & Download"}
              </button>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <button
                  onClick={() => { setStep("form"); setOtp(Array(OTP_LENGTH).fill("")); setError(""); }}
                  className="hover:text-[#EB6664] transition"
                >
                  ← Change number
                </button>
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0 || sending}
                  className="hover:text-[#EB6664] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : sending ? "Sending…" : "Resend OTP"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === "success" && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-base">Download started!</p>
                <p className="text-sm text-gray-500 mt-1">
                  Hi <span className="font-semibold text-gray-700">{name}</span>, your brochure is downloading now.
                </p>
              </div>
              <button
                onClick={triggerDownload}
                className="text-xs text-[#EB6664] hover:underline"
              >
                Didn't start? Click here to retry
              </button>
              <button
                onClick={onClose}
                className="block w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition mt-1"
              >
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BrochureModal;