import { useState, useEffect } from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaPaperclip,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md p-3 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      {/* 📓 Notebook Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(white,white_28px,#e5e7eb_29px)]" />

      {/* 📝 Sticky Note */}
      <div
        className={`relative w-full max-w-sm sm:max-w-md md:max-w-lg p-5 sm:p-6 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] transition-all ${getTheme()}`}
      >
        {/* 📌 Pin */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md" />

        {/* 📎 Clip */}
        <FaPaperclip className="absolute -top-2 left-4 text-gray-700 text-lg rotate-12" />

        {/* ❌ Close */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          <IoClose />
        </button>

        {/* ================= ROLE ================= */}
        {step === "role" && (
          <>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 text-center">
              Choose Your Role
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Teacher */}
              <div
                onClick={() => {
                  setRole("teacher");
                  setStep("login");
                }}
                className="cursor-pointer bg-blue-200 p-4 rounded-lg shadow-lg rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all text-center"
              >
                <FaChalkboardTeacher className="text-2xl mx-auto mb-2 text-blue-800" />
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  Teacher
                </p>
              </div>

              {/* Student */}
              <div
                onClick={() => {
                  setRole("student");
                  setStep("login");
                }}
                className="cursor-pointer bg-green-200 p-4 rounded-lg shadow-lg rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all text-center"
              >
                <FaUserGraduate className="text-2xl mx-auto mb-2 text-green-800" />
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  Student
                </p>
              </div>

              {/* Register */}
              <div
                onClick={() => setStep("register")}
                className="cursor-pointer bg-purple-200 p-4 rounded-lg shadow-lg rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all text-center"
              >
                <FaUserPlus className="text-2xl mx-auto mb-2 text-purple-800" />
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  Register
                </p>
              </div>
            </div>
          </>
        )}

        {/* ================= LOGIN ================= */}
        {step === "login" && (
          <>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
              {role === "teacher" ? "Teacher Login" : "Student Login"}
            </h2>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2.5 rounded bg-white/80 shadow-inner text-sm outline-none focus:ring-2 focus:ring-green-400"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 pr-10 rounded bg-white/80 shadow-inner text-sm outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button className="w-full py-2.5 bg-[#059669] text-white rounded-md shadow-md hover:bg-[#047857] transition">
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
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
              Create Account
            </h2>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2.5 rounded bg-white/80 shadow-inner text-sm outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-2.5 rounded bg-white/80 shadow-inner text-sm outline-none focus:ring-2 focus:ring-purple-400"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-2.5 rounded bg-white/80 shadow-inner text-sm outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button className="w-full py-2.5 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition">
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