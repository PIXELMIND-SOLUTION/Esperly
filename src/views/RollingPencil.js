import React from 'react';
import { motion } from 'framer-motion';

const StationeryItem = ({ children, delay = 0, duration = 20, pathX, pathY }) => (
    <motion.div
        initial={{ x: "-10vw", y: "10vh" }}
        animate={{
            x: pathX,
            y: pathY,
            rotate: [0, 720, 1440, 2160, 2880],
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            repeatType: "mirror", // Makes it "roll back" for a smoother loop
            ease: "easeInOut",
            delay: delay,
        }}
        className="absolute pointer-events-none"
    >
        {children}
    </motion.div>
);

const RollingPencil = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">

            {/* --- THE PENCIL --- */}
            <StationeryItem
                duration={18}
                pathX={["10vw", "80vw", "20vw", "90vw"]}
                pathY={["10vh", "60vh", "80vh", "20vh"]}
            >
                <div className="relative w-32 h-5 flex items-center">
                    <div className="w-4 h-full bg-pink-400 rounded-l-sm border-r border-black/10" />
                    <div className="w-2 h-full bg-gray-300" />
                    <div className="flex-grow h-full bg-yellow-400 shadow-inner" />
                    <div className="w-6 h-full bg-[#f3d2b3]" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }} />
                    <div className="absolute right-0 w-2 h-2 bg-gray-900" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }} />
                    <div className="absolute -bottom-2 w-full h-1 bg-black/5 blur-sm" />
                </div>
            </StationeryItem>

            {/* --- THE PEN --- */}
            {/* <StationeryItem
                delay={2}
                duration={22}
                pathX={["90vw", "20vw", "70vw", "5vw"]}
                pathY={["80vh", "10vh", "30vh", "70vh"]}
            >
                <div className="relative w-36 h-6 flex items-center">

                    <div className="w-10 h-full bg-blue-700 rounded-l-full relative">

                        <div className="absolute top-0 left-2 w-6 h-1 bg-gray-400 rounded-full" />
                    </div>

                    <div className="flex-grow h-full bg-blue-600 border-l border-blue-800" />

                    <div className="w-8 h-full bg-gray-800 opacity-90" />

                    <div className="w-4 h-full bg-gray-300" style={{ clipPath: 'polygon(0% 20%, 100% 50%, 0% 80%)' }} />

                    <div className="absolute -bottom-3 w-full h-1.5 bg-black/10 blur-md" />
                </div>
            </StationeryItem> */}

        </div>
    );
};

export default RollingPencil;