import { useState, useEffect } from "react";

const LoginModal = ({ isOpen = false, onClose }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setUserId("");
      setPassword("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const closeModal = () => {
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[8888] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      {/* BOARD BACKGROUND */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 🟩 STICKY NOTE */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#d1fae5] rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.3)] p-6 rotate-[-1deg]">

        {/* PIN */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md" />

        {/* CLOSE */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Quick Login
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* USER ID */}
          <div>
            <label className="text-xs text-gray-600">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-white/80 focus:outline-none text-sm"
              placeholder="Enter your ID"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 pr-10 rounded bg-white/80 focus:outline-none text-sm"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                👁
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading || !userId || !password}
            className="w-full mt-3 py-2 bg-[#059669] text-white rounded-md text-sm font-medium hover:bg-[#047857] transition"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-600 mt-4 text-center">
          New here?{" "}
          <span className="text-[#059669] cursor-pointer">
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;