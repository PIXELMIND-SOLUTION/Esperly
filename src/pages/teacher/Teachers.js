import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUsers, FiAward, FiStar,
    FiChevronRight, FiChevronLeft,
    FiEyeOff, FiLock, FiUnlock,
} from "react-icons/fi";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";

/* ─── SINGLE STICKY PALETTE ──────────────────────────────────────── */
const STICKY = {
    bg: "#FFF9C4",
    border: "#F9A825",
    shadow: "#E65100",
    line: "#FFE082",
    dark: "#5D4037",
};

/* ─── DATA ───────────────────────────────────────────────────────── */
const teachersData = [
    {
        id: 1, course: "Mathematics", icon: "📐",
        hiddenDetails: { name: "Dr. Arjun Mehta", experience: "12+ years", qualification: "PhD in Mathematics", achievements: "Published 20+ research papers", students: "5,000+", rating: 4.9 },
    },
    {
        id: 2, course: "Physics", icon: "⚛️",
        hiddenDetails: { name: "Prof. Sarah Johnson", experience: "10+ years", qualification: "PhD in Physics", achievements: "NASA Research Associate", students: "4,200+", rating: 4.8 },
    },
    {
        id: 3, course: "Chemistry", icon: "🧪",
        hiddenDetails: { name: "Dr. Michael Chen", experience: "15+ years", qualification: "PhD in Organic Chemistry", achievements: "3 Patent Holder", students: "3,800+", rating: 4.9 },
    },
    {
        id: 4, course: "Biology", icon: "🧬",
        hiddenDetails: { name: "Dr. Emily Rodriguez", experience: "8+ years", qualification: "PhD in Molecular Biology", achievements: "Published in Nature", students: "3,200+", rating: 4.7 },
    },
    {
        id: 5, course: "Computer Science", icon: "💻",
        hiddenDetails: { name: "Prof. David Kumar", experience: "11+ years", qualification: "MS in CS, Stanford", achievements: "Ex-Google Engineer", students: "6,500+", rating: 4.9 },
    },
    {
        id: 6, course: "English Literature", icon: "📖",
        hiddenDetails: { name: "Dr. Lisa Thompson", experience: "14+ years", qualification: "PhD in English Literature", achievements: "Award-winning Author", students: "2,900+", rating: 4.8 },
    },
    {
        id: 7, course: "Economics", icon: "📈",
        hiddenDetails: { name: "Dr. Robert Williams", experience: "16+ years", qualification: "PhD in Economics", achievements: "Former World Bank Consultant", students: "4,100+", rating: 4.8 },
    },
    {
        id: 8, course: "History", icon: "🏛️",
        hiddenDetails: { name: "Prof. James Anderson", experience: "20+ years", qualification: "PhD in Ancient History", achievements: "Best History Educator Award", students: "2,500+", rating: 4.7 },
    },
];

/* ─── STABLE TILTS ───────────────────────────────────────────────── */
const TILTS = [-2.4, 1.7, -1.1, 2.0, -0.7, 2.6, -1.9, 1.3];
const getTilt = (id) => TILTS[(id - 1) % TILTS.length];

/* ─── PAPERCLIP SVG ──────────────────────────────────────────────── */
const Paperclip = ({ height = 46, rotate = -18 }) => (
    <svg
        width={height * 0.52}
        height={height}
        viewBox="0 0 22 42"
        fill="none"
        style={{
            transform: `rotate(${rotate}deg)`,
            filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.30))",
            display: "block",
        }}
    >
        {/* Main body */}
        <path
            d="M11 4 C6 4 3 8 3 13 L3 31 C3 37 7 40 11 40 C15 40 19 37 19 31 L19 15 C19 10 16.5 7.5 13 7.5 C9.5 7.5 7.5 10 7.5 15 L7.5 29 C7.5 32 9 34 11 34 C13 34 14.5 32 14.5 29 L14.5 16"
            stroke="#8d8d8d"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Shine */}
        <path
            d="M10 4.5 C7 5.5 4 9 4 13"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.1"
            strokeLinecap="round"
        />
    </svg>
);

/* ─── RULED LINES ────────────────────────────────────────────────── */
const StickyLines = ({ startY = 58, count = 8, gap = 22 }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="absolute left-0 right-0"
                style={{ top: `${startY + i * gap}px`, height: "1px", background: STICKY.line, opacity: 0.45 }}
            />
        ))}
    </div>
);

/* ─── TEACHER CARD ───────────────────────────────────────────────── */
const TeacherCard = React.memo(({ teacher, index, isRevealed, onToggleReveal }) => {
    const tilt = getTilt(teacher.id);
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 55, rotate: tilt - 4 }}
            animate={{ opacity: 1, y: 0, rotate: hovered ? 0 : tilt }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative"
            style={{ zIndex: hovered ? 30 : index + 1 }}
        >
            {/* Paperclip — top right */}
            <div
                className="absolute z-40 pointer-events-none select-none"
                style={{ top: "-20px", right: "8px" }}
            >
                <Paperclip height={48} rotate={index % 2 === 0 ? -16 : 20} />
            </div>

            {/* Lift + shadow on hover */}
            <motion.div
                animate={{
                    scale: hovered ? 1.03 : 1,
                    y: hovered ? -10 : 0,
                    filter: hovered
                        ? "drop-shadow(4px 14px 22px rgba(230,81,0,0.35))"
                        : "drop-shadow(2px 5px 10px rgba(230,81,0,0.18))",
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
            >
                {/* Sticky body */}
                <div
                    className="relative overflow-hidden"
                    style={{
                        background: STICKY.bg,
                        border: `1px solid ${STICKY.border}55`,
                        borderRadius: "2px 2px 5px 5px",
                        minHeight: "270px",
                    }}
                >
                    {/* Top-left fold */}
                    <div
                        className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${STICKY.shadow}15 0%, transparent 60%)` }}
                    />

                    {/* Ruled lines */}
                    <StickyLines startY={58} count={9} gap={21} />

                    {/* Header strip */}
                    <div
                        className="relative flex items-center justify-between px-3 pt-2.5 pb-2"
                        style={{
                            background: `linear-gradient(135deg, ${STICKY.border}28, ${STICKY.border}14)`,
                            borderBottom: `1.5px solid ${STICKY.border}40`,
                        }}
                    >
                        <span className="text-[30px] leading-none select-none drop-shadow-sm">
                            {teacher.icon}
                        </span>
                        <div className="flex gap-1.5 items-center">
                            {[0, 1, 2].map(i => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: STICKY.border, opacity: 0.35 + i * 0.18 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Course title */}
                    <div className="px-3 pt-3 pb-1 relative z-10">
                        <h3
                            className="text-[15px] sm:text-[16px] font-black leading-snug"
                            style={{ color: STICKY.dark, fontFamily: "'Kalam', cursive" }}
                        >
                            {teacher.course}
                        </h3>
                        <div className="w-8 h-[2px] mt-1 rounded-full" style={{ background: STICKY.border }} />
                    </div>

                    {/* Stats */}
                    <div
                        className="px-3 pt-1 pb-1 flex flex-wrap gap-2 text-[11px] relative z-10"
                        style={{ color: STICKY.dark, opacity: 0.65 }}
                    >
                        <span className="flex items-center gap-1"><FiUsers size={10} /> {teacher.hiddenDetails.students}</span>
                        <span className="flex items-center gap-1"><FiStar size={10} /> {teacher.hiddenDetails.rating}★</span>
                        <span className="flex items-center gap-1"><FiAward size={10} /> Certified</span>
                    </div>

                    {/* Revealed details */}
                    <AnimatePresence initial={false}>
                        {isRevealed && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden relative z-10"
                            >
                                <div
                                    className="mx-3 mt-1.5 mb-1 p-2 rounded space-y-1.5"
                                    style={{
                                        background: `${STICKY.border}18`,
                                        border: `1px dashed ${STICKY.border}55`,
                                    }}
                                >
                                    {[
                                        ["🎓", "Name", teacher.hiddenDetails.name],
                                        ["⏱️", "Exp", teacher.hiddenDetails.experience],
                                        ["📜", "Qual", teacher.hiddenDetails.qualification],
                                        ["🏆", "Award", teacher.hiddenDetails.achievements],
                                    ].map(([icon, label, val]) => (
                                        <div key={label} className="flex items-start gap-1.5">
                                            <span className="text-[11px] shrink-0 mt-0.5">{icon}</span>
                                            <span
                                                className="text-[10px] font-bold shrink-0 w-8 mt-0.5 opacity-55"
                                                style={{ color: STICKY.dark, fontFamily: "'Kalam', cursive" }}
                                            >{label}</span>
                                            <span
                                                className="text-[11px] leading-relaxed break-words font-bold"
                                                style={{ color: STICKY.dark, fontFamily: "'Kalam', cursive" }}
                                            >{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Reveal button */}
                    <div className="px-3 pb-3 pt-2 relative z-10">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => onToggleReveal(teacher.id)}
                            className="w-full py-2 text-[12px] font-black flex items-center justify-center gap-1.5 transition-all duration-200"
                            style={{
                                fontFamily: "'Kalam', cursive",
                                background: isRevealed
                                    ? `linear-gradient(135deg, ${STICKY.border}, ${STICKY.shadow})`
                                    : `${STICKY.border}22`,
                                color: isRevealed ? "white" : STICKY.dark,
                                border: `1.5px solid ${isRevealed ? "transparent" : STICKY.border}`,
                                borderRadius: "3px",
                                boxShadow: isRevealed ? `0 3px 8px ${STICKY.shadow}40` : "none",
                                letterSpacing: "0.02em",
                            }}
                        >
                            {isRevealed
                                ? <><FiLock size={12} /> Hide Details</>
                                : <><FiUnlock size={12} /> Reveal Details</>
                            }
                        </motion.button>
                    </div>

                    {/* Bottom-right page curl */}
                    <div
                        className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
                        style={{
                            background: `linear-gradient(315deg, ${STICKY.shadow}22 0%, transparent 55%)`,
                            borderTop: `1px solid ${STICKY.border}30`,
                            borderLeft: `1px solid ${STICKY.border}30`,
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
});

/* ─── STAT CARD ──────────────────────────────────────────────────── */
const StatCard = ({ icon, label, value, desc, delay, idx }) => {
    const tilt = TILTS[(idx * 2) % TILTS.length];
    return (
        <motion.div
            initial={{ opacity: 0, y: 28, rotate: tilt }}
            animate={{ opacity: 1, y: 0, rotate: tilt }}
            whileHover={{ rotate: 0, y: -7, scale: 1.07 }}
            transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ filter: "drop-shadow(2px 5px 10px rgba(230,81,0,0.22))" }}
        >
            {/* Paperclip */}
            <div
                className="absolute z-10 pointer-events-none"
                style={{ top: "-18px", left: "50%", transform: "translateX(-50%)" }}
            >
                <Paperclip height={40} rotate={idx % 2 === 0 ? -10 : 12} />
            </div>

            <div
                className="relative overflow-hidden pt-3 pb-3 px-2 sm:px-3 text-center"
                style={{
                    background: STICKY.bg,
                    border: `1px solid ${STICKY.border}50`,
                    borderRadius: "2px",
                    minHeight: "100px",
                }}
            >
                <StickyLines startY={42} count={5} gap={20} />
                <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl mb-1 select-none">{icon}</div>
                    <div
                        className="text-lg sm:text-2xl font-black leading-none"
                        style={{ color: STICKY.dark, fontFamily: "'Kalam', cursive" }}
                    >{value}</div>
                    <div
                        className="text-[11px] sm:text-xs font-bold mt-1"
                        style={{ color: STICKY.dark, fontFamily: "'Kalam', cursive", opacity: 0.85 }}
                    >{label}</div>
                    <div
                        className="text-[10px] mt-0.5 opacity-50"
                        style={{ color: STICKY.dark, fontFamily: "'Kalam', cursive" }}
                    >{desc}</div>
                </div>
                {/* curl */}
                <div
                    className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
                    style={{ background: `linear-gradient(315deg, ${STICKY.shadow}20 0%, transparent 55%)` }}
                />
            </div>
        </motion.div>
    );
};

/* ─── NOTEBOOK PAGE ──────────────────────────────────────────────── */
const NotebookPage = ({ children }) => (
    <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{
            background: "#f6f0e6",
            boxShadow:
                "0 2px 0 #b8a888, 0 6px 0 #c8b898, 0 16px 48px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.85)",
            border: "1px solid #d0c4b0",
        }}
    >
        {/* Red cover header */}
        <div
            className="relative px-4 sm:px-8 lg:px-12 py-5 sm:py-7"
            style={{
                background: "linear-gradient(135deg, #A6192E 0%, #7d1222 55%, #5c0d18 100%)",
                borderBottom: "3px solid #5c0d18",
            }}
        >
            {/* Faint ruled lines on cover */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0 pointer-events-none"
                    style={{ top: `${14 + i * 16}px`, height: "1px", background: "rgba(255,255,255,0.06)" }}
                />
            ))}

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse shrink-0" />
                        <span
                            className="text-yellow-200 text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase"
                            style={{ fontFamily: "'Kalam', cursive" }}
                        >
                            Faculty Directory
                        </span>
                        <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse shrink-0" />
                    </div>
                    <h1
                        className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                        }}
                    >
                        Meet Our Expert Faculty
                    </h1>
                </div>

                <div
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded self-start sm:self-center"
                    style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.22)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <FiLock size={12} className="text-yellow-300 shrink-0" />
                    <span
                        className="text-white/90 text-[11px] sm:text-xs font-bold whitespace-nowrap"
                        style={{ fontFamily: "'Kalam', cursive" }}
                    >
                        Click cards to reveal
                    </span>
                </div>
            </div>
        </div>

        {/* Paper area */}
        <div className="relative">
            {/* Red margin line */}
            <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{ left: "36px", width: "1.5px", background: "#F4AEBE", opacity: 0.45, zIndex: 1 }}
            />
            {/* Horizontal rules */}
            {Array.from({ length: 32 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0 pointer-events-none"
                    style={{ top: `${i * 28 + 14}px`, height: "1px", background: "#b0c4de", opacity: 0.18 }}
                />
            ))}

            <div className="relative z-10 px-3 sm:px-6 lg:px-10 py-8 sm:py-10">
                {children}
            </div>
        </div>
    </div>
);

/* ─── BACKGROUND DOODLES ─────────────────────────────────────────── */
const BackgroundDoodles = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {["✦", "✧", "★", "✩", "✦", "✧", "✩"].map((s, i) => (
            <motion.div
                key={i}
                className="absolute text-red-900/[0.06]"
                style={{
                    fontSize: `${16 + (i % 4) * 12}px`,
                    left: `${8 + i * 13}%`,
                    top: `${12 + (i % 5) * 17}%`,
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
            >
                {s}
            </motion.div>
        ))}
    </div>
);

/* ─── MAIN ───────────────────────────────────────────────────────── */
const Teachers = () => {
    const [openModal, setOpenModal] = useState(false);
    const [revealedDetails, setRevealedDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const teachersPerPage = 8;
    const totalPages = Math.ceil(teachersData.length / teachersPerPage);
    const currentTeachers = teachersData.slice(
        currentPage * teachersPerPage,
        (currentPage + 1) * teachersPerPage
    );

    const handleToggleReveal = useCallback(
        (id) => setRevealedDetails((prev) => ({ ...prev, [id]: !prev[id] })),
        []
    );

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Playfair+Display:wght@700;900&display=swap');`}</style>

            <Navbar onOpenModal={() => setOpenModal(true)} />

            <div
                className="min-h-screen relative"
                style={{ background: "linear-gradient(145deg, #f0e8da 0%, #e8dcc8 50%, #dfd0b8 100%)" }}
            >
                {/* Paper noise */}
                <div
                    className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "180px",
                    }}
                />
                <BackgroundDoodles />

                <div className="relative z-10 px-2 sm:px-5 lg:px-10 xl:px-16 py-6 sm:py-10 max-w-[1440px] mx-auto">
                    <NotebookPage>

                        {Array.from({ length: 32 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute left-0 right-0 pointer-events-none"
                                style={{ top: `${i * 28 + 14}px`, height: "1px", background: "#b0c4de", opacity: 0.18 }}
                            />
                        ))}

                        {/* Teacher Cards Grid */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-10 lg:gap-12 mb-12">
                            {currentTeachers.map((teacher, idx) => (
                                <TeacherCard
                                    key={teacher.id}
                                    teacher={teacher}
                                    index={idx}
                                    isRevealed={!!revealedDetails[teacher.id]}
                                    onToggleReveal={handleToggleReveal}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-10">
                                <motion.button
                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                                    disabled={currentPage === 0}
                                    className="p-2 sm:p-2.5 border-2 transition-all"
                                    style={{
                                        borderColor: currentPage === 0 ? "#d4ccc0" : "#A6192E",
                                        color: currentPage === 0 ? "#c0b8b0" : "#A6192E",
                                        background: "rgba(255,255,255,0.55)",
                                        borderRadius: "3px",
                                        cursor: currentPage === 0 ? "not-allowed" : "pointer",
                                    }}
                                ><FiChevronLeft size={18} /></motion.button>

                                {Array.from({ length: totalPages }).map((_, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                                        onClick={() => setCurrentPage(idx)}
                                        className="w-8 h-8 sm:w-9 sm:h-9 font-black text-sm transition-all"
                                        style={{
                                            fontFamily: "'Kalam', cursive",
                                            background: currentPage === idx ? "#A6192E" : "rgba(166,25,46,0.09)",
                                            color: currentPage === idx ? "white" : "#A6192E",
                                            border: `2px solid ${currentPage === idx ? "#A6192E" : "rgba(166,25,46,0.3)"}`,
                                            borderRadius: "3px",
                                        }}
                                    >{idx + 1}</motion.button>
                                ))}

                                <motion.button
                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className="p-2 sm:p-2.5 border-2 transition-all"
                                    style={{
                                        borderColor: currentPage === totalPages - 1 ? "#d4ccc0" : "#A6192E",
                                        color: currentPage === totalPages - 1 ? "#c0b8b0" : "#A6192E",
                                        background: "rgba(255,255,255,0.55)",
                                        borderRadius: "3px",
                                        cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                                    }}
                                ><FiChevronRight size={18} /></motion.button>
                            </div>
                        )}

                        {/* Dashed divider */}
                        <div className="flex items-center gap-3 mb-10">
                            <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, #A6192E28 0, #A6192E28 7px, transparent 7px, transparent 14px)" }} />
                            <span className="text-red-800/30 text-base select-none">✦</span>
                            <div className="flex-1 h-px" style={{ background: "repeating-linear-gradient(90deg, #A6192E28 0, #A6192E28 7px, transparent 7px, transparent 14px)" }} />
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mt-2 mb-10">
                            {[
                                { icon: "👨‍🏫", label: "Expert Teachers", value: "50+", desc: "Certified Pros", delay: 0.25, idx: 0 },
                                { icon: "🎓", label: "Years Combined", value: "150+", desc: "Rich Experience", delay: 0.35, idx: 1 },
                                { icon: "📚", label: "Subjects", value: "25+", desc: "Comprehensive", delay: 0.45, idx: 2 },
                                { icon: "⭐", label: "Avg Rating", value: "4.8", desc: "Satisfaction", delay: 0.55, idx: 3 },
                            ].map((s) => <StatCard key={s.label} {...s} />)}
                        </div>

                        {/* Footer note */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap items-center justify-center gap-2 text-center pt-2 pb-1"
                        >
                            <FiEyeOff size={12} className="text-red-800/40 shrink-0" />
                            <p className="text-[11px] sm:text-xs text-red-900/45" style={{ fontFamily: "'Kalam', cursive" }}>
                                Teacher details are protected — click{" "}
                                <span className="font-bold text-red-800/60">"Reveal Details"</span>{" "}
                                on any card to view full information
                            </p>
                            <FiLock size={12} className="text-red-800/40 shrink-0" />
                        </motion.div>

                        <div className="mt-4 text-center pb-2">
                            <span className="text-[11px] text-red-900/25" style={{ fontFamily: "'Kalam', cursive" }}>
                                ✧ Esperly Faculty Directory · Confidential · 2024 ✧
                            </span>
                        </div>

                    </NotebookPage>
                </div>
            </div>
            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};

export default Teachers;