import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";

const generateCourseData = (sub) => ({
    instructor: {
        name: "Dr. Arjun Mehta",
        title: "Senior Educator & Industry Expert",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
        students: `${(sub.students * 2.4 / 1000).toFixed(1)}k`,
        courses: Math.floor(sub.courses / 6),
        rating: sub.rating,
    },
    description: `Master ${sub.title} from the ground up with hands-on projects, real-world case studies, and expert mentorship. This course is carefully structured to take you from fundamentals to professional-level proficiency, with a curriculum refined through feedback from thousands of students.`,
    whatYouLearn: [
        `Core fundamentals of ${sub.title}`,
        "Real-world projects and case studies",
        "Industry best practices and workflows",
        "Problem-solving and critical thinking",
        "Assessment techniques and exam strategies",
        "Live doubt-clearing sessions",
    ],
    curriculum: [
        { module: "Module 1", title: "Foundations & Concepts", lessons: 8, duration: "3 hrs" },
        { module: "Module 2", title: "Core Techniques", lessons: 12, duration: "5 hrs" },
        { module: "Module 3", title: "Advanced Topics", lessons: 10, duration: "4.5 hrs" },
        { module: "Module 4", title: "Practical Projects", lessons: 6, duration: "6 hrs" },
        { module: "Module 5", title: "Mock Tests & Review", lessons: 8, duration: "4 hrs" },
    ],
    features: [
        { icon: "🎥", label: "HD Video Lectures", val: `${sub.courses * 3}+ lessons` },
        { icon: "📄", label: "Study Material", val: "PDF notes included" },
        { icon: "🏆", label: "Certificate", val: "On completion" },
        { icon: "♾️", label: "Lifetime Access", val: "Learn at your pace" },
        { icon: "📱", label: "Mobile App", val: "iOS & Android" },
        { icon: "🤝", label: "Live Sessions", val: "Weekly Q&A" },
    ],
    reviews: [
        {
            name: "Priya S.",
            rating: 5,
            text: "Absolutely transformed my understanding. The structured approach and live sessions are a game-changer!",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=75",
        },
        {
            name: "Rohan K.",
            rating: 5,
            text: "Best investment I've made. Cleared my exam on the first attempt after following this course.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=75",
        },
        {
            name: "Ananya M.",
            rating: 4,
            text: "Very comprehensive content. The practice tests are especially helpful for consolidating knowledge.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=75",
        },
    ],
});

const Stars = ({ rating, size = 12 }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <span
                key={s}
                style={{ fontSize: size }}
                className={s <= Math.round(rating) ? "text-amber-500" : "text-stone/30"}
            >
                ★
            </span>
        ))}
    </div>
);

const CurriculumItem = ({ item, accent, delay }) => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.38 }}
            className="border-b border-stone/20"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full bg-transparent border-none cursor-pointer flex items-center justify-between py-3 sm:py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${accent}18`, border: `1.5px solid ${accent}44` }}
                    >
                        <span className="font-dm-mono text-[10px] font-semibold" style={{ color: accent }}>
                            {item.module.split(" ")[1]}
                        </span>
                    </div>
                    <span className="font-fraunces text-sm font-bold text-charcoal">{item.title}</span>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:flex gap-3">
                        <span className="font-dm-mono text-[9px] text-stone">{item.lessons} lessons</span>
                        <span className="font-dm-mono text-[9px] text-stone">{item.duration}</span>
                    </div>
                    <motion.span
                        animate={{ rotate: open ? 45 : 0 }}
                        className="text-base font-mono leading-none"
                        style={{ color: accent }}
                    >
                        +
                    </motion.span>
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-3 pl-10">
                            {Array.from({ length: item.lessons }, (_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 py-1.5 border-t border-stone/20 first:border-t-0"
                                >
                                    <span className="text-[10px]" style={{ color: accent }}>
                                        ▶
                                    </span>
                                    <span className="font-lora text-xs text-clay">
                                        Lesson {i + 1}:{" "}
                                        {[
                                            "Introduction",
                                            "Core Concepts",
                                            "Practice",
                                            "Advanced Topics",
                                            "Assessment",
                                            "Project Work",
                                            "Review",
                                        ][i % 7]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function CourseDetail({ course, category, onBack }) {
    const [openModal, setOpenModal] = useState(false);
    const accent = course.categoryAccent || category?.accent || "#A6192E";
    const data = generateCourseData(course);
    const [enrolled, setEnrolled] = useState(false);
    const [wishlist, setWishlist] = useState(false);

    return (
        <>
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <div className="bg-cream min-h-screen">
                {/* Hero Banner */}
                <div className="relative h-[260px] sm:h-[320px] lg:h-[420px] overflow-hidden">
                    <motion.img
                        src={course.img}
                        alt={course.title}
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full object-cover block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${accent}33 0%, transparent 70%)` }} />

                    {/* Ruled lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 12 }, (_, i) => (
                            <div
                                key={i}
                                className="absolute left-0 right-0 h-px bg-white/5"
                                style={{ top: i * 36 }}
                            />
                        ))}
                    </div>

                    {/* Back button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        whileHover={{ x: -3 }}
                        onClick={onBack}
                        className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-12 flex items-center gap-2 font-dm-mono text-[10px] tracking-wider uppercase text-white/80 bg-black/30 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded cursor-pointer z-10"
                    >
                        <span>←</span> Back
                    </motion.button>

                    {/* Hero content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
                        <div className="max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-2 mb-3 font-dm-mono text-[9px] text-white/60 uppercase tracking-wider flex-wrap"
                            >
                                <span>All Categories</span>
                                <span style={{ color: accent }}>›</span>
                                <span>{course.categoryTitle || category?.title}</span>
                                <span style={{ color: accent }}>›</span>
                                <span className="text-white/80">{course.title}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.55 }}
                                className="font-fraunces text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight max-w-3xl"
                            >
                                <span className="text-2xl sm:text-3xl lg:text-4xl mr-2">{course.icon}</span>
                                {course.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45 }}
                                className="flex items-center gap-4 flex-wrap mt-3"
                            >
                                <div className="flex items-center gap-1.5">
                                    <Stars rating={course.rating} size={12} />
                                    <span className="font-dm-mono text-[10px] text-amber-400 font-semibold">
                                        {course.rating}
                                    </span>
                                    <span className="font-dm-mono text-[9px] text-white/50">
                                        ({(course.students / 1000).toFixed(1)}k reviews)
                                    </span>
                                </div>
                                {[
                                    { icon: "👥", val: `${(course.students / 1000).toFixed(1)}k students` },
                                    { icon: "⏱️", val: course.duration },
                                    { icon: "📊", val: course.level },
                                ].map((m) => (
                                    <div key={m.val} className="flex items-center gap-1.5">
                                        <span className="text-xs">{m.icon}</span>
                                        <span className="font-dm-mono text-[9px] text-white/70">{m.val}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="font-fraunces text-xl sm:text-2xl font-black text-charcoal mb-4 flex items-center gap-2">
                                    <div className="w-1 h-5 rounded" style={{ background: accent }} />
                                    About This Course
                                </h2>
                                <p className="font-lora text-sm sm:text-base text-clay leading-relaxed">
                                    {data.description}
                                </p>
                            </motion.section>

                            {/* What You'll Learn */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18 }}
                            >
                                <h2 className="font-fraunces text-xl sm:text-2xl font-black text-charcoal mb-4 flex items-center gap-2">
                                    <div className="w-1 h-5 rounded" style={{ background: accent }} />
                                    What You'll Learn
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {data.whatYouLearn.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.22 + i * 0.05 }}
                                            className="flex items-start gap-2"
                                        >
                                            <div
                                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                style={{ background: `${accent}18`, border: `1.5px solid ${accent}55` }}
                                            >
                                                <span className="text-[8px]" style={{ color: accent }}>
                                                    ✓
                                                </span>
                                            </div>
                                            <span className="font-lora text-xs sm:text-sm text-clay leading-relaxed">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Curriculum */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                            >
                                <h2 className="font-fraunces text-xl sm:text-2xl font-black text-charcoal mb-4 flex items-center gap-2">
                                    <div className="w-1 h-5 rounded" style={{ background: accent }} />
                                    Curriculum
                                </h2>
                                <div
                                    className="bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6"
                                    style={{ border: `1.5px solid ${accent}22` }}
                                >
                                    {data.curriculum.map((item, i) => (
                                        <CurriculumItem key={i} item={item} accent={accent} delay={0.28 + i * 0.06} />
                                    ))}
                                </div>
                            </motion.section>

                            {/* Reviews */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.32 }}
                            >
                                <h2 className="font-fraunces text-xl sm:text-2xl font-black text-charcoal mb-4 flex items-center gap-2">
                                    <div className="w-1 h-5 rounded" style={{ background: accent }} />
                                    Student Reviews
                                </h2>

                                {/* Rating summary */}
                                <div
                                    className="bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-center gap-6"
                                    style={{ border: `1.5px solid ${accent}22` }}
                                >
                                    <div className="text-center min-w-[100px]">
                                        <div className="font-fraunces text-4xl sm:text-5xl font-black" style={{ color: accent }}>
                                            {course.rating}
                                        </div>
                                        <Stars rating={course.rating} size={14} />
                                        <div className="font-dm-mono text-[8px] text-stone mt-1">Course Rating</div>
                                    </div>
                                    <div className="flex-1 min-w-[160px]">
                                        {[5, 4, 3, 2, 1].map((n) => (
                                            <div key={n} className="flex items-center gap-2 mb-1">
                                                <div className="flex-1 h-1.5 rounded-full bg-stone/20 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width:
                                                                n === 5 ? "72%" : n === 4 ? "20%" : n === 3 ? "6%" : n === 2 ? "2%" : "1%",
                                                        }}
                                                        transition={{ delay: 0.5 + (5 - n) * 0.08, duration: 0.5 }}
                                                        className="h-full rounded-full"
                                                        style={{ background: accent }}
                                                    />
                                                </div>
                                                <span className="font-dm-mono text-[8px] text-stone whitespace-nowrap">
                                                    {n} ★
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Review cards */}
                                <div className="space-y-3">
                                    {data.reviews.map((rev, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.38 + i * 0.08 }}
                                            className="bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-5"
                                            style={{ border: "1.5px solid rgba(212,204,186,0.6)" }}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <img
                                                    src={rev.avatar}
                                                    alt={rev.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    style={{ border: `2px solid ${accent}33` }}
                                                />
                                                <div>
                                                    <div className="font-fraunces text-sm font-bold text-charcoal">{rev.name}</div>
                                                    <Stars rating={rev.rating} size={10} />
                                                </div>
                                            </div>
                                            <p className="font-lora italic text-xs sm:text-sm text-clay leading-relaxed">
                                                {rev.text}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                        {/* Right Column - Sticky Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="lg:sticky lg:top-6"
                        >
                            <div
                                className="bg-white/70 backdrop-blur-xl rounded-xl overflow-hidden"
                                style={{
                                    border: `1.5px solid ${accent}33`,
                                    boxShadow: "0 20px 52px rgba(0,0,0,0.1), 0 4px 14px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div className="relative h-32 overflow-hidden">
                                    <img
                                        src={course.img}
                                        alt={course.title}
                                        className="w-full h-full object-cover block"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-2 left-3 font-dm-mono text-[8px] text-white/70 uppercase tracking-wider">
                                        {course.courses} courses available
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    {/* Price */}
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-fraunces text-3xl sm:text-4xl font-black" style={{ color: accent }}>
                                                ₹{course.price.toLocaleString()}
                                            </span>
                                            <span className="font-dm-mono text-[10px] text-stone line-through">
                                                ₹{(course.price * 2.4).toFixed(0)}
                                            </span>
                                            <span className="bg-forest/10 border border-forest/40 text-forest font-dm-mono text-[8px] px-2 py-0.5 rounded tracking-wide">
                                                58% OFF
                                            </span>
                                        </div>
                                        <div className="font-dm-mono text-[9px] text-rust mt-1">⚡ 2 days left at this price</div>
                                    </div>

                                    {/* Enroll button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setEnrolled(!enrolled)}
                                        className="w-full py-3 rounded-lg font-fraunces text-base font-bold text-white transition-colors mb-2"
                                        style={{ background: enrolled ? "#2E7D52" : accent }}
                                    >
                                        {enrolled ? "✓ Enrolled!" : "Enrol Now"}
                                    </motion.button>

                                    {/* Wishlist button */}
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setWishlist(!wishlist)}
                                        className="w-full py-2.5 rounded-lg font-dm-mono text-[10px] font-medium uppercase tracking-wider transition-all mb-4"
                                        style={{
                                            background: "transparent",
                                            border: `1.5px solid ${wishlist ? accent : "#D4CCBA"}`,
                                            color: wishlist ? accent : "#7A6E5A",
                                        }}
                                    >
                                        {wishlist ? "♥ Wishlisted" : "♡ Add to Wishlist"}
                                    </motion.button>

                                    <div className="h-px bg-stone/20 mb-4" />

                                    {/* Features */}
                                    <div className="space-y-2.5">
                                        {data.features.map((f) => (
                                            <div key={f.label} className="flex items-center gap-2.5">
                                                <span className="text-sm flex-shrink-0">{f.icon}</span>
                                                <div>
                                                    <div className="font-fraunces text-xs font-bold text-charcoal">{f.label}</div>
                                                    <div className="font-dm-mono text-[8px] text-stone">{f.val}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-stone/20 my-4" />

                                    {/* Instructor */}
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={data.instructor.avatar}
                                            alt={data.instructor.name}
                                            className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                                            style={{ border: `2px solid ${accent}44` }}
                                        />
                                        <div>
                                            <div className="font-fraunces text-sm font-bold text-charcoal">
                                                {data.instructor.name}
                                            </div>
                                            <div className="font-lora italic text-[10px] text-stone">{data.instructor.title}</div>
                                            <div className="flex gap-2 mt-1">
                                                {[
                                                    { val: data.instructor.students, label: "students" },
                                                    { val: data.instructor.courses, label: "courses" },
                                                ].map((s) => (
                                                    <div key={s.label} className="flex gap-1 items-baseline">
                                                        <span className="font-dm-mono text-[10px] font-semibold" style={{ color: accent }}>
                                                            {s.val}
                                                        </span>
                                                        <span className="font-dm-mono text-[7px] text-stone">{s.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}