import { useState, useEffect } from "react";

const LoginModal = ({ isOpen = false, onClose }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageFlip, setPageFlip] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setUserId("");
      setPassword("");
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle modal open animation
  useEffect(() => {
    if (isOpen) {
      setPageFlip(false);
      setTimeout(() => setPageFlip(true), 50);
    } else {
      setPageFlip(false);
    }
  }, [isOpen]);

  const closeModal = () => {
    setPageFlip(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        
        .animate-shimmer {
          animation: shimmer 1.6s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[8888] bg-black/75 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn"
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        {/* Notebook Container */}
        <div className="relative w-[min(750px,95vw)] max-h-[90vh] drop-shadow-[8px_12px_20px_rgba(0,0,0,0.4)]">
          
          {/* Spiral Binding - Left Side */}
          <div className="absolute -left-[30px] top-5 bottom-5 w-[55px] z-20 flex flex-col justify-around items-center gap-3">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),inset_2px_2px_4px_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.2)] relative"
              >
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-gray-400 to-gray-500 shadow-inner" />
                <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
            ))}
          </div>

          {/* Spiral Binding - Right Side (for open notebook) */}
          <div className="absolute -right-[30px] top-5 bottom-5 w-[55px] z-20 flex flex-col justify-around items-center gap-3 opacity-70">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),inset_2px_2px_4px_rgba(255,255,255,0.5)]"
              />
            ))}
          </div>

          {/* Notebook Pages Container */}
          <div className={`relative transition-all duration-500 ${pageFlip ? "translate-x-2" : ""}`}>
            
            {/* Back Cover Shadow */}
            <div className="absolute -inset-1 bg-black/20 rounded-lg blur-sm" />
            
            {/* Notebook Pages Stack Effect */}
            <div className="absolute -right-1 top-2 bottom-2 w-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-r-md shadow-md" />
            
            {/* Main Notebook Content */}
            <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-lg shadow-xl overflow-hidden">
              
              {/* Torn Paper Edge Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent to-amber-100/50 pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-3 -right-3 w-8 h-8 bg-amber-100 border-2 border-rose-700 rounded-full flex items-center justify-center z-30 hover:bg-rose-700 hover:text-amber-100 hover:rotate-90 transition-all duration-300 shadow-lg text-rose-700 text-sm"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Notebook Content */}
              <div className="p-6 md:p-8">
                
                {/* Header with Sticker Effect */}
                <div className="text-center mb-6 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-r from-amber-300/30 to-amber-400/30 rounded-full blur-md" />
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-rose-400/20 blur-xl" />
                    <h1 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-800 via-amber-800 to-rose-800 bg-clip-text text-transparent font-['Playfair_Display']">
                      The Grand Ledger
                    </h1>
                  </div>
                  <p className="text-sm text-amber-700/70 mt-1 italic">Register of Authorized Scribes</p>
                </div>

                {/* Decorative Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  <div className="w-2 h-2 bg-amber-500 rotate-45" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                </div>

                {/* Form Area with Lined Paper Effect */}
                <div className="relative bg-white/80 rounded-lg p-6 shadow-inner">
                  {/* Lined Paper Lines */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-8 right-8 h-px bg-rose-200/40"
                        style={{ top: `${28 + i * 32}px` }}
                      />
                    ))}
                    {/* Vertical Margin Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-rose-300/40" />
                  </div>

                  <div className="relative z-10">
                    <p className="text-center text-lg font-semibold text-rose-800 mb-1">Sign the Register</p>
                    <p className="text-center text-sm text-amber-700 italic mb-6">Present your credentials to enter</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Scribe ID Field */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
                          Scribe ID
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-3 py-2.5 pr-10 bg-amber-50/80 border-b-2 border-rose-300 focus:border-rose-600 rounded-none outline-none transition-colors font-['Crimson_Text'] text-gray-800 placeholder:text-amber-400/60"
                            placeholder="e.g., quill.master"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            autoComplete="username"
                          />
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" />
                            <circle cx="12" cy="7" r="4" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
                          Cipher
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2.5 pr-10 bg-amber-50/80 border-b-2 border-rose-300 focus:border-rose-600 rounded-none outline-none transition-colors font-['Crimson_Text'] text-gray-800 placeholder:text-amber-400/60"
                            placeholder="Your secret cipher"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400 hover:text-rose-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeWidth="2" />
                                <path d="M1 1l22 22" strokeWidth="2" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" strokeWidth="2" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading || !userId || !password}
                        className="w-full mt-4 py-3 bg-gradient-to-r from-rose-700 to-rose-800 text-amber-100 font-semibold rounded-md hover:shadow-lg hover:from-rose-800 hover:to-rose-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        {isLoading && (
                          <span className="inline-block w-4 h-4 border-2 border-amber-100/30 border-t-amber-100 rounded-full animate-spin-slow mr-2" />
                        )}
                        <span className="relative z-10">
                          {isLoading ? "Verifying..." : "Enter the Archives"}
                        </span>
                        {!isLoading && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                        )}
                      </button>
                    </form>

                    {/* Footer Link */}
                    <p className="text-center text-xs text-amber-600 mt-4">
                      No record?{" "}
                      <a href="#" className="text-rose-600 hover:text-rose-700 border-b border-dotted border-rose-300 hover:border-solid transition-colors">
                        Request admission
                      </a>
                    </p>
                  </div>
                </div>

                {/* Bottom Stamp */}
                <div className="text-center mt-4">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-amber-500/60 font-['Playfair_Display']">
                    Est. MDCCCXLVII · All Rights Reserved
                  </p>
                </div>
              </div>

              {/* Page Corner Fold Effect */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-amber-100 to-transparent rounded-bl-lg pointer-events-none" />
            </div>
          </div>

          {/* Notebook Binding Tape */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent rounded-full" />
        </div>
      </div>
    </>
  );
};

export default LoginModal;