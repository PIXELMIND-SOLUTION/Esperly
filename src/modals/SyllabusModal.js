import { useState, useRef, useEffect } from "react";
import {
  FiBook,
  FiUser,
  FiPhone,
  FiSend,
  FiShield,
  FiDownload,
  FiCheckCircle,
  FiArrowLeft,
  FiRefreshCw,
  FiFileText,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";

const PRIMARY = "#EB6664";
const PRIMARY_LIGHT = "rgba(235,102,100,0.10)";
const PRIMARY_BORDER = "rgba(235,102,100,0.25)";

const DEMO_OTP = "123456";

const steps = [
  { icon: FiUser, label: "Details" },
  { icon: FiShield, label: "Verify" },
  { icon: FiDownload, label: "Download" },
];

export default function SyllabusModal({ subjectName = "Advanced Mathematics", isOpen = true, onClose }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    setTimer(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Please enter your full name";
    if (!/^\d{10}$/.test(phone)) errs.phone = "Enter a valid 10-digit number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendOTP = () => {
    if (!validate()) return;
    setStep(2);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    startTimer();
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (val, idx) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = v;
    setOtp(next);
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    txt.split("").forEach((c, i) => { next[i] = c; });
    setOtp(next);
    const last = Math.min(txt.length, 5);
    otpRefs.current[last]?.focus();
  };

  const handleVerify = () => {
    const entered = otp.join("");
    if (entered !== DEMO_OTP) {
      setOtpError("Incorrect OTP. Please try again.");
      return;
    }
    clearInterval(timerRef.current);
    setStep(3);
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    startTimer();
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const handleDownload = () => {
    setDownloaded(true);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <FiBook size={12} color="#fff" />
            <span>{subjectName}</span>
          </div>
          <div style={styles.headerTitle}>Download Syllabus</div>
          <div style={styles.headerSub}>Verify your details to access the PDF</div>
        </div>

        <div style={styles.body}>
          {/* Stepper */}
          <div style={styles.stepper}>
            {steps.map((s, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              const Icon = s.icon;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      ...styles.stepDot,
                      background: done ? PRIMARY : active ? "#fff" : "#f5f5f5",
                      border: `2px solid ${done || active ? PRIMARY : "#e0e0e0"}`,
                      color: done ? "#fff" : active ? PRIMARY : "#bbb",
                    }}>
                      {done ? <FiCheck size={13} /> : <Icon size={13} />}
                    </div>
                    <span style={{ fontSize: 10, color: active ? PRIMARY : done ? PRIMARY : "#bbb", fontWeight: active || done ? 600 : 400 }}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div style={{ ...styles.stepLine, background: step > n ? PRIMARY : "#eee" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <Field label="Full Name" icon={<FiUser size={15} color={PRIMARY} />} error={errors.name}>
                <input
                  style={inputStyle(!!errors.name)}
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })); }}
                />
              </Field>

              <Field label="Mobile Number" icon={<FiPhone size={15} color={PRIMARY} />} error={errors.phone}>
                <div style={{ display: "flex", gap: 8 }}>
                  <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    style={{ ...inputStyle(false), width: "auto", paddingRight: 28, cursor: "pointer", flexShrink: 0 }}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <input
                    style={{ ...inputStyle(!!errors.phone), flex: 1 }}
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit number"
                    value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g, "")); setErrors(p => ({ ...p, phone: "" })); }}
                  />
                </div>
              </Field>

              <button style={styles.btnPrimary} onClick={handleSendOTP}>
                <FiSend size={15} /> Send OTP
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div style={styles.otpSentBar}>
                <FiAlertCircle size={14} color={PRIMARY} />
                <span>OTP sent to <strong>{countryCode} {phone}</strong></span>
              </div>

              <label style={styles.label}><FiShield size={14} color={PRIMARY} /> Enter 6-digit OTP</label>
              <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={el => otpRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={e => handleOtpChange(e.target.value, i)}
                    onKeyDown={e => handleOtpKey(e, i)}
                    onPaste={handleOtpPaste}
                    style={styles.otpBox}
                  />
                ))}
              </div>

              {otpError && (
                <div style={styles.errorText}>
                  <FiAlertCircle size={12} /> {otpError}
                </div>
              )}

              <div style={styles.demoBar}>
                <FiShield size={12} color="#b07000" /> Demo OTP: <strong>123456</strong>
              </div>

              <button style={{ ...styles.btnPrimary, marginTop: 14 }} onClick={handleVerify}>
                <FiCheckCircle size={15} /> Verify & Continue
              </button>

              <div style={styles.resendRow}>
                Didn't receive?{" "}
                <span
                  onClick={timer === 0 ? handleResend : undefined}
                  style={{ color: timer === 0 ? PRIMARY : "#bbb", cursor: timer === 0 ? "pointer" : "default", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 3 }}
                >
                  <FiRefreshCw size={11} /> Resend OTP
                </span>
                {timer > 0 && <span style={{ color: "#aaa" }}> ({timer}s)</span>}
              </div>

              <div style={{ textAlign: "center", marginTop: 10 }}>
                <button style={styles.btnGhost} onClick={() => { clearInterval(timerRef.current); setStep(1); }}>
                  <FiArrowLeft size={13} /> Change number
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ textAlign: "center" }}>
              <div style={styles.successRing}>
                <FiCheckCircle size={32} color={PRIMARY} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#222", marginBottom: 4 }}>
                Identity Verified!
              </div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
                Your syllabus is ready to download
              </div>

              <div style={styles.fileCard}>
                <div style={styles.fileIcon}>
                  <FiFileText size={20} color="#fff" />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>
                    {subjectName} — Syllabus.pdf
                  </div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>2.4 MB · PDF Document</div>
                </div>
              </div>

              <button
                style={{
                  ...styles.btnPrimary,
                  background: downloaded ? "#2ecc71" : PRIMARY,
                  justifyContent: "center",
                }}
                onClick={handleDownload}
                disabled={downloaded}
              >
                {downloaded
                  ? <><FiCheck size={15} /> Downloaded!</>
                  : <><FiDownload size={15} /> Download Syllabus</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, error, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={styles.label}>
        {icon} {label}
      </label>
      {children}
      {error && <div style={styles.errorText}><FiAlertCircle size={12} /> {error}</div>}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "10px 13px",
  fontSize: 14,
  border: `1.5px solid ${hasError ? "#E24B4A" : "#eee"}`,
  borderRadius: 10,
  background: "#fff",
  color: "#222",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
});

const styles = {
  overlay: {
    minHeight: 520,
    background: "rgba(235,102,100,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: "1rem",
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    border: `1.5px solid ${PRIMARY_BORDER}`,
    width: "100%",
    maxWidth: 420,
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(235,102,100,0.15)",
  },
  header: {
    background: PRIMARY,
    padding: "1.3rem 1.5rem 1.1rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.22)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 20,
    marginBottom: 10,
    border: "1px solid rgba(255,255,255,0.3)",
  },
  headerTitle: { fontSize: 18, fontWeight: 700, color: "#fff" },
  headerSub: { fontSize: 13, color: "rgba(255,255,255,0.80)", marginTop: 3 },
  body: { padding: "1.3rem 1.5rem" },
  stepper: { display: "flex", alignItems: "flex-start", marginBottom: "1.4rem" },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .3s",
    flexShrink: 0,
  },
  stepLine: {
    flex: 1,
    height: 2,
    borderRadius: 2,
    margin: "0 6px",
    marginTop: -18,
    transition: "background .3s",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#555",
    fontWeight: 500,
    marginBottom: 6,
  },
  btnPrimary: {
    width: "100%",
    padding: "11px 16px",
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 10,
    cursor: "pointer",
    border: "none",
    background: PRIMARY,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "opacity .15s, transform .1s",
  },
  btnGhost: {
    background: "transparent",
    border: `1.5px solid ${PRIMARY}`,
    color: PRIMARY,
    padding: "7px 16px",
    fontSize: 13,
    fontWeight: 500,
    borderRadius: 8,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  otpSentBar: {
    background: PRIMARY_LIGHT,
    border: `1px solid ${PRIMARY_BORDER}`,
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    color: "#c04a48",
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 7,
  },
  otpBox: {
    width: 44,
    height: 48,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700,
    border: "1.5px solid #eee",
    borderRadius: 10,
    color: PRIMARY,
    outline: "none",
    background: "#fff",
    flexShrink: 0,
    fontFamily: "inherit",
  },
  demoBar: {
    background: "#fff8f0",
    border: "1px solid #ffd6a0",
    borderRadius: 8,
    padding: "7px 12px",
    fontSize: 12,
    color: "#b07000",
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  resendRow: {
    fontSize: 12,
    color: "#999",
    marginTop: 10,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  errorText: {
    fontSize: 12,
    color: "#c0392b",
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  successRing: {
    width: 68,
    height: 68,
    borderRadius: "50%",
    background: PRIMARY_LIGHT,
    border: `2px solid ${PRIMARY_BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
  },
  fileCard: {
    background: "#fff5f5",
    border: `1.5px solid ${PRIMARY_BORDER}`,
    borderRadius: 12,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    textAlign: "left",
  },
  fileIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: PRIMARY,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
};