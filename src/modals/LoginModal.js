import { useState, useEffect } from "react";

const LoginModal = ({ isOpen = false, onClose }) => {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep("role");
      setRole("");
      setUserId("");
      setPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const closeModal = () => onClose && onClose();

  const getTheme = () => {
    if (step === "role") return "bg-yellow-100 rotate-[-1deg]";
    if (role === "teacher") return "bg-blue-100 rotate-[1deg]";
    if (role === "student") return "bg-green-100 rotate-[-2deg]";
    if (step === "register") return "bg-purple-100 rotate-[1deg]";
  };

  return (
    <div
      className="fixed inset-0 z-[8888] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      {/* 📓 NOTEBOOK BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(white,white_28px,#e5e7eb_29px)]" />

      {/* 📝 STICKY NOTE */}
      <div
        className={`relative w-full max-w-sm sm:max-w-md p-6 rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.3)] ${getTheme()}`}
      >
        {/* 📌 PIN */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md" />

        {/* 📎 PAPER CLIP */}
        <div className="absolute -top-2 left-4 text-xl rotate-12">📎</div>

        {/* ❌ CLOSE */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          ✕
        </button>

        {/* ================= ROLE ================= */}
        {step === "role" && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
              Choose Your Role
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setRole("teacher");
                  setStep("login");
                }}
                className="w-full py-2 bg-blue-500 text-white rounded shadow-md hover:scale-[1.02]"
              >
                👨‍🏫 Teacher
              </button>

              <button
                onClick={() => {
                  setRole("student");
                  setStep("login");
                }}
                className="w-full py-2 bg-green-500 text-white rounded shadow-md hover:scale-[1.02]"
              >
                🎓 Student
              </button>

              <button
                onClick={() => setStep("register")}
                className="w-full py-2 bg-purple-500 text-white rounded shadow-md hover:scale-[1.02]"
              >
                📝 Register
              </button>
            </div>
          </>
        )}

        {/* ================= LOGIN ================= */}
        {step === "login" && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {role === "teacher" ? "Teacher Login" : "Student Login"}
            </h2>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 rounded bg-white/80 shadow-inner text-sm"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 pr-10 rounded bg-white/80 shadow-inner text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  👁
                </button>
              </div>

              <button className="w-full py-2 bg-[#059669] text-white rounded shadow-md">
                Login
              </button>
            </form>

            <button
              onClick={() => setStep("role")}
              className="mt-3 text-sm text-gray-600 underline w-full"
            >
              ← Back
            </button>
          </>
        )}

        {/* ================= REGISTER ================= */}
        {step === "register" && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Create Account
            </h2>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded bg-white/80 shadow-inner text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-white/80 shadow-inner text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-white/80 shadow-inner text-sm"
              />

              <button className="w-full py-2 bg-purple-500 text-white rounded shadow-md">
                Register
              </button>
            </form>

            <button
              onClick={() => setStep("role")}
              className="mt-3 text-sm text-gray-600 underline w-full"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;