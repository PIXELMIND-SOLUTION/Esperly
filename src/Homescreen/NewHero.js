import React from "react";
import {
    GraduationCap,
    UserRound,
    MonitorSmartphone,
    ShieldCheck,
    Users,
    Star,
    ArrowRight,
} from "lucide-react";
import HeroImage from "../assets/Hero.png";
import { PiGraduationCapFill } from "react-icons/pi";

const stats = [
    { icon: UserRound, label: "expert\nTeachers", bg: "bg-orange-100", color: "text-orange-500" },
    { icon: MonitorSmartphone, label: "Personalized\nLearning", bg: "bg-emerald-100", color: "text-emerald-700" },
    { icon: ShieldCheck, label: "Better result\n& Confidence", bg: "bg-violet-100", color: "text-violet-600" },
];

const trust = [
    { icon: Users, value: "1000+", label: "Students" },
    { icon: Star, value: "50+", label: "Expert Tutors" },
    { icon: ShieldCheck, value: "95%", label: "Success" },
];

export default function NewHero() {
    return (
        <section className="min-h-screen relative overflow-hidden bg-[#fdf1e9] pt-4 sm:pt-6 lg:pt-8">
            <div className="mx-auto max-w-7xl items-center gap-10 px-4 sm:px-6 md:px-10 lg:gap-12">
                <span className="inline-flex items-center gap-2 rounded-md bg-[#EB6664]/30 px-3 py-1 text-xs font-medium text-[#EB6664] sm:px-4 sm:py-1.5 sm:text-sm">
                    <PiGraduationCapFill size={16} />
                    Online Eduction
                </span>

                <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:mt-5 sm:text-4xl md:text-5xl">
                    Online Education
                    <br />
                    Feels Like{" "}
                    <span className="text-[#EB6664]">Real Classroom Experience</span>
                </h1>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-12 md:px-10 lg:grid-cols-12 lg:gap-12 lg:py-2">

                {/* Left column — 4 columns */}
                <div className="relative z-10 order-2 lg:order-1 lg:col-span-4">

                    <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
                        Interactive live classes, expert teachers, real-time doubt
                        solving, and personalized learning — all from the comfort of
                        your home.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-5 sm:mt-7 sm:gap-6 md:gap-8">
                        {stats.map(({ icon: Icon, label, bg, color }) => (
                            <div key={label} className="flex flex-col items-center text-center">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 ${bg}`}
                                >
                                    <Icon className={color} size={20} />
                                </div>

                                <p className="mt-2 whitespace-pre-line text-xs font-medium text-gray-800 sm:text-sm">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#EB6664] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/50 transition hover:bg-orange-500 sm:mt-8 sm:px-7 sm:py-3.5 sm:text-base">
                        Book a Demo
                        <ArrowRight size={18} />
                    </button>

                    <div className="mt-8 flex flex-wrap gap-6 sm:mt-9 sm:gap-8 md:gap-10">
                        {trust.map(({ icon: Icon, value, label }) => (
                            <div
                                key={label}
                                className="flex min-w-[90px] flex-col items-center text-center"
                            >
                                <Icon
                                    className="text-[#EB6664]"
                                    size={20}
                                    fill="currentColor"
                                />

                                <p className="mt-2 text-base font-bold leading-none text-gray-900 sm:text-lg">
                                    {value}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column — 8 columns */}
                <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-8">

                    <div className="absolute right-0 top-4 h-[85%] w-[85%] rounded-[60%_40%_55%_45%/45%_55%_45%_55%] bg-orange-100/70" />

                    <img
                        src={HeroImage}
                        alt="Two students smiling while studying together with a laptop"
                        className="relative z-10 w-full max-w-xs object-cover sm:max-w-md lg:max-w-2xl"
                    />
                </div>
            </div>
        </section>
    );
}