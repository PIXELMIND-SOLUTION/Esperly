import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const EnrollModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[8888] p-4"
        >
          {/* BOARD BACKGROUND */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#999_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SINGLE STICKY NOTE */}
          <motion.div
            initial={{ scale: 0.85, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 50 }}
            className="relative w-full max-w-sm sm:max-w-md bg-yellow-100 rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-5 sm:p-6 rotate-[-1deg]"
          >
            {/* 📌 PIN */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md" />

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Enroll Now
            </h2>

            {/* FORM */}
            <form className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded bg-white/70 focus:outline-none text-sm sm:text-base"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 rounded bg-white/70 focus:outline-none text-sm sm:text-base"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 rounded bg-white/70 focus:outline-none text-sm sm:text-base"
              />

              <select className="w-full p-2 rounded bg-white/70 focus:outline-none text-sm sm:text-base">
                <option>Select Course</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>Programming</option>
              </select>

              <textarea
                rows="3"
                placeholder="Message"
                className="w-full p-2 rounded bg-white/70 focus:outline-none resize-none text-sm sm:text-base"
              />

              <button
                type="submit"
                className="w-full bg-[#A6192E] text-white py-2.5 rounded-md text-sm sm:text-base font-medium hover:bg-[#8e1427] transition shadow-md"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollModal;