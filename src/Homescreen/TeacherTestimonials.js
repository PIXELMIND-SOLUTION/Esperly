import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GraduationCap, ShieldCheck, Star, Heart, MonitorCheck } from "lucide-react";

// Replace with your actual image paths
import mentorHeroImg from "../assets/mentor.png";
import meeraImg from "../assets/mentor1.png";
import ananyaImg from "../assets/mentor1.png";
import rajanImg from "../assets/mentor1.png";
import priyaImg from "../assets/mentor1.png";

const RED = "#EB6664";

const mentors = [
    { name: "Meera Iyer", subject: "Mathematics - 8 Years Experience", image: meeraImg },
    { name: "Ananya Krishnan", subject: "English & Communication - 5 Years Experience", image: ananyaImg },
    { name: "Rajan Pillai", subject: "Physics - 9 Years Experience", image: rajanImg },
    { name: "Priya Shanrma", subject: "Science - 10 Years Experience", image: priyaImg },
];

const FadeUp = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-8% 0px" });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
};

const MentorCard = ({ m, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-8% 0px" });
    return (
        <motion.div
            ref={ref}
            className="relative pt-9 sm:pt-10"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="rounded-2xl bg-[#FBDDDB] px-4 pb-5 pt-12 text-center sm:rounded-3xl sm:px-5 sm:pb-6 sm:pt-14">
                <h4 className="text-sm font-extrabold text-gray-900 sm:text-base">{m.name}</h4>
                <p className="mx-auto mt-2 max-w-auto text-xs leading-relaxed text-gray-600 sm:text-sm">
                    {m.subject}
                </p>
                <div className="mt-3 flex justify-center gap-0.5 sm:mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} style={{ color: RED }} className="fill-current" />
                    ))}
                </div>
            </div>

            <img
                src={m.image}
                alt={m.name}
                className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-[#fdf1e9] object-cover shadow-md sm:h-24 sm:w-24"
            />
        </motion.div>
    );
};

export default function TeacherTestimonials() {
    return (
        <section className="relative overflow-hidden bg-[#fdf1e9] px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-7xl">
                <FadeUp>
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm"
                        style={{ backgroundColor: "#FBDDDB", color: RED }}
                    >
                        Our Mentors
                    </span>

                    <h2 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                        Meet Our <span style={{ color: RED }}>Expert Mentors</span>
                    </h2>
                </FadeUp>

                {/* Hero image + intro */}
                <div className="mt-8 grid grid-cols-1 items-center gap-8 sm:mt-10 lg:grid-cols-2 lg:gap-12">

                    <FadeUp delay={0.15}>
                        <p className="text-base leading-relaxed text-gray-800 sm:text-lg">
                            Learn from dedicated educators who provide personalized
                            guidance, simplify complex concepts, and help students unlock
                            their full potential through engaging and effective learning
                            experiences simplify complex concepts, and help students unlock
                            their full potential through engaging and effective learning
                            experiences.
                        </p>

                        <div className="mt-6 flex max-w-xs items-center gap-3 rounded-xl bg-[#FBDDDB] px-4 py-3.5 sm:mt-8 sm:rounded-2xl sm:px-5 sm:py-4">
                            <span
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-11 sm:w-11"
                                style={{ backgroundColor: `${RED}22` }}
                            >
                                <MonitorCheck size={24} style={{ color: RED }} />
                            </span>
                            <p className="text-sm text-gray-800 sm:text-base">
                                <span className="text-xl font-extrabold sm:text-2xl" style={{ color: RED }}>
                                    50+{" "}
                                </span>
                                Expert tutors
                            </p>
                        </div>
                    </FadeUp>


                    <FadeUp delay={0.1} className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
                        <img
                            src={mentorHeroImg}
                            alt="Expert mentor"
                            className="h-full w-full object-cover sm:h-full"
                        />


                    </FadeUp>
                </div>

                {/* Mentor cards */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {mentors.map((m, i) => (
                        <MentorCard m={m} index={i} key={m.name} />
                    ))}
                </div>
            </div>
        </section>
    );
}