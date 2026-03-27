import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";

const SubCard = React.memo(({ sub, accent, delay, onClick }) => {
    const [hov, setHov] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            onHoverStart={() => setHov(true)}
            onHoverEnd={() => setHov(false)}
            onClick={() => onClick(sub)}
            className="cursor-pointer"
            role="button"
            aria-label={`Explore ${sub.title}`}
        >
            <div
                className="rounded-lg overflow-hidden transition-all duration-300 bg-paper"
                style={{
                    border: hov ? `2px solid ${accent}` : "1.5px solid rgba(212,204,186,0.65)",
                    boxShadow: hov
                        ? "0 16px 40px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)"
                        : "0 2px 10px rgba(0,0,0,0.06)",
                }}
            >
                {/* Image area */}
                <div className="relative h-36 sm:h-40 overflow-hidden">
                    <motion.img
                        src={sub.img}
                        alt={sub.title}
                        loading="lazy"
                        animate={{ scale: hov ? 1.09 : 1 }}
                        transition={{ duration: 0.45 }}
                        className="w-full h-full object-cover block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Level badge */}
                    <div className="absolute top-2 left-2 font-dm-mono text-[8px] font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded tracking-wider uppercase border border-white/20">
                        {sub.level}
                    </div>

                    {/* Icon */}
                    <div className="absolute top-2 right-2 text-2xl filter drop-shadow-lg">
                        {sub.icon}
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span
                                    key={s}
                                    className="text-[10px]"
                                    style={{
                                        color: s <= Math.round(sub.rating) ? "#F5A623" : "rgba(255,255,255,0.3)",
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="font-dm-mono text-[9px] text-white/80">{sub.rating}</span>
                    </div>
                </div>

                {/* Text block */}
                <div className="p-3 sm:p-4">
                    <h4 className="font-fraunces text-sm sm:text-base font-extrabold text-charcoal mb-2 leading-tight">
                        {sub.title}
                    </h4>

                    {/* Stats row */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {[
                            { icon: "📚", val: `${sub.courses} courses` },
                            { icon: "⏱️", val: sub.duration },
                            { icon: "👥", val: `${(sub.students / 1000).toFixed(1)}k students` },
                        ].map((stat) => (
                            <div key={stat.val} className="flex items-center gap-1">
                                <span className="text-[10px]">{stat.icon}</span>
                                <span className="font-dm-mono text-[8px] sm:text-[9px] text-stone tracking-wide">
                                    {stat.val}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-fraunces text-sm sm:text-base font-black" style={{ color: accent }}>
                                ₹{sub.price.toLocaleString()}
                            </span>
                            <span className="font-dm-mono text-[8px] text-stone ml-1">/course</span>
                        </div>

                        <motion.div
                            animate={{
                                background: hov ? accent : "rgba(0,0,0,0.06)",
                                color: hov ? "#fff" : "#1A1008",
                            }}
                            className="px-3 py-1.5 rounded font-dm-mono text-[9px] font-medium uppercase tracking-wider transition-all duration-200 flex items-center gap-1 cursor-pointer"
                            style={{
                                border: hov ? `1.5px solid ${accent}` : "1.5px solid transparent",
                            }}
                        >
                            View <span className="text-xs">→</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
});

const FilterBar = ({ active, onChange, accent }) => {
    const filters = ["All", "Beginner", "Intermediate", "Advanced"];

    return (
        <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
                <motion.button
                    key={f}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onChange(f)}
                    className="font-dm-mono text-[10px] font-medium uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200"
                    style={{
                        border: `1.5px solid ${active === f ? accent : "#D4CCBA"}`,
                        background: active === f ? accent : "rgba(255,255,255,0.5)",
                        color: active === f ? "#fff" : "#7A6E5A",
                    }}
                >
                    {f}
                </motion.button>
            ))}
        </div>
    );
};

export default function Subcategory({ category, onBack, onSelectCourse }) {
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState("All");
    const { accent, icon, title, tagline, subcategories } = category;

    const filtered =
        filter === "All"
            ? subcategories
            : subcategories.filter((s) => s.level === filter || s.level === "All Levels");

    return (
        <>
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <section className="relative bg-cream min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
                {/* Ruled lines */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 28 }, (_, i) => (
                        <div
                            key={i}
                            className="absolute left-0 right-0 h-px bg-stone/25"
                            style={{ top: i * 34 }}
                        />
                    ))}
                    <div
                        className="absolute top-0 bottom-0 w-px opacity-20"
                        style={{ left: "clamp(24px,4vw,52px)", background: accent }}
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Back button */}
                    <motion.button
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onBack}
                        className="flex items-center gap-2 font-dm-mono text-[10px] tracking-wider uppercase mb-8 transition-colors"
                        style={{ color: accent }}
                    >
                        <span className="text-sm">←</span> All Categories
                    </motion.button>

                    {/* Hero header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 sm:mb-12"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-5 h-0.5" style={{ background: accent }} />
                            <span className="font-dm-mono text-[9px] uppercase tracking-wider" style={{ color: accent }}>
                                Browse Topics
                            </span>
                            <div className="w-5 h-0.5" style={{ background: accent }} />
                        </div>

                        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                            <div className="flex items-center gap-4 flex-wrap">
                                <motion.div
                                    initial={{ scale: 0.7, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0"
                                    style={{ background: accent, boxShadow: `0 6px 22px ${accent}55` }}
                                >
                                    {icon}
                                </motion.div>
                                <div>
                                    <h1 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-charcoal tracking-tight">
                                        {title}
                                    </h1>
                                    <p className="font-lora italic text-sm sm:text-base text-stone mt-1">{tagline}</p>
                                </div>
                            </div>

                            {/* Stats pills */}
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { label: "Topics", val: subcategories.length },
                                    {
                                        label: "Total Courses",
                                        val: subcategories.reduce((a, s) => a + s.courses, 0),
                                    },
                                    {
                                        label: "Students",
                                        val: `${(subcategories.reduce((a, s) => a + s.students, 0) / 1000).toFixed(0)}k+`,
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded text-center"
                                        style={{ border: `1px solid ${accent}22` }}
                                    >
                                        <div
                                            className="font-fraunces text-base sm:text-lg font-black"
                                            style={{ color: accent }}
                                        >
                                            {stat.val}
                                        </div>
                                        <div className="font-dm-mono text-[8px] text-stone uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Filter row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-between flex-wrap gap-3 mb-8 pb-4"
                        style={{ borderBottom: `1.5px solid ${accent}22` }}
                    >
                        <FilterBar active={filter} onChange={setFilter} accent={accent} />
                        <span className="font-dm-mono text-[9px] text-stone tracking-wide">
                            {filtered.length} topics shown
                        </span>
                    </motion.div>

                    {/* Subcategory grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
                        >
                            {filtered.map((sub, i) => (
                                <SubCard
                                    key={sub.title}
                                    sub={sub}
                                    accent={accent}
                                    delay={i * 0.045}
                                    onClick={(sub) =>
                                        onSelectCourse({
                                            ...sub,
                                            categoryTitle: title,
                                            categoryAccent: accent,
                                            categoryIcon: icon,
                                        })
                                    }
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="flex items-center gap-4 mt-12 sm:mt-16">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-stone/30" />
                        <span className="font-dm-mono text-[9px] text-stone tracking-wider uppercase">
                            {title} · {subcategories.length} topics
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-stone/30 to-transparent" />
                    </div>
                </div>
            </section>
            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}