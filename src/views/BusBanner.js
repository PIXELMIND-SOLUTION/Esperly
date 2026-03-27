import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BusBanner = () => {
  const [cycle, setCycle] = useState(0);

  const images = [
    "/1.png",
    "/2.png",
    "/3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 28000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[cycle % images.length];

  return (
    <div className="fixed bottom-0 left-0 w-full h-[80px] sm:h-[100px] md:h-[120px] pointer-events-none z-40 overflow-hidden">
      <Bus key={cycle} image={currentImage} />
    </div>
  );
};

const Bus = ({ image }) => {
  return (
    <motion.div
      initial={{ x: "-50vw" }}
      animate={{ x: "120vw" }}
      transition={{
        duration: 18,
        ease: "linear",
      }}
      className="absolute bottom-2 flex items-end"
    >
      {/* 🖼️ BANNER (NOW FRONT) */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="bg-white shadow-lg rounded-md overflow-hidden border border-gray-300"
      >
        <img
          src={image}
          alt="banner"
          className="h-12 sm:h-16 md:h-20 w-[160px] sm:w-[240px] md:w-[400px] object-cover"
        />
      </motion.div>

      {/* CONNECTOR */}
      <div className="w-3 sm:w-4 md:w-6 h-[2px] bg-gray-600 mx-1" />

      {/* 🚍 BUS (NOW BACK) */}
      <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 bg-yellow-400 rounded-xl shadow-lg border border-yellow-600">

        {/* Windows */}
        <div className="absolute top-1 sm:top-2 left-2 sm:left-3 flex gap-1 sm:gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 sm:w-5 sm:h-4 md:w-6 md:h-5 bg-blue-200 rounded-sm border border-blue-400"
            />
          ))}
        </div>

        {/* Door */}
        <div className="absolute right-1 sm:right-2 top-1 sm:top-2 w-3 h-6 sm:w-5 sm:h-8 md:w-6 md:h-10 bg-yellow-500 border border-yellow-700 rounded-sm" />

        {/* Wheels */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-2 left-2 sm:left-3 md:left-4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-black rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-2 right-2 sm:right-3 md:right-4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-black rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default BusBanner;