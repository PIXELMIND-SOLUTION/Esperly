import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    FiUsers, FiAward, FiBookOpen, FiTarget,
    FiGlobe, FiClock, FiHeart, FiStar,
    FiTrendingUp, FiSmile, FiUserCheck, FiZap,
    FiChevronRight
} from "react-icons/fi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavImage from "../../components/NavImage";
import Navbar from "../../components/Navbar";

const AboutUs = () => {
    const refs = {
        story: useRef(null),
        why: useRef(null),
        stats: useRef(null),
    };

    const storyInView = useInView(refs.story, { once: true, margin: "-10% 0px" });
    const whyInView = useInView(refs.why, { once: true, margin: "-10% 0px" });
    const statsInView = useInView(refs.stats, { once: true, margin: "-10% 0px" });

    const stats = [
        { icon: FiUsers, value: "10,000+", label: "Happy Students", color: "#EB6664" },
        { icon: FiBookOpen, value: "500+", label: "Expert Tutors", color: "#EB6664" },
        { icon: FiGlobe, value: "25+", label: "Countries Worldwide", color: "#EB6664" },
        { icon: FiStar, value: "4.9", label: "Average Rating", color: "#EB6664" },
    ];

    const whyPoints = [
        { icon: FiUserCheck, title: "Personalized Attention", desc: "One-on-one sessions tailored to each student's unique learning style and pace." },
        { icon: FiClock, title: "Flexible Timing", desc: "Learn anytime, anywhere, across the globe, on a schedule that fits your life." },
        { icon: FiBookOpen, title: "Comprehensive Coverage", desc: "Complete curriculum support from foundational to advanced topics across all major boards." },
        { icon: FiGlobe, title: "Global Access", desc: "Wherever you are, quality tuition is just a click away with our worldwide reach." },
    ];

    const values = [
        { icon: FiHeart, title: "Passion", desc: "We love what we do, and it shows in every engaging and supportive session." },
        { icon: FiTrendingUp, title: "Excellence", desc: "We strive for the highest quality in education and student outcomes." },
        { icon: FiSmile, title: "Empathy", desc: "Understanding and supporting each student's unique journey and challenges." },
        { icon: FiZap, title: "Innovation", desc: "Modern techniques and technology for effective and engaging modern learners." },
    ];

    return (
        <>
            <Header />
            <NavImage/>
            <div className="min-h-screen bg-white">

                {/* Hero Section with Image */}
                <section className="relative overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=600&fit=crop"
                            alt="Students learning together"
                            className="w-full h-full object-cover"
                        />
                        <div className=" absolute inset-0 bg-[#EB6664]/50 backdrop-blur-xs backdrop-saturate-150 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-center text-white"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6"
                            >
                                <FiHeart className="w-4 h-4" />
                                Welcome to Esperly
                            </motion.div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                Esperly:{" "}
                                <span className="text-white">
                                    Your Learning, Your Way
                                </span>
                            </h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <button className="bg-white text-[#EB6664] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                                    Contact Us <FiChevronRight className="w-4 h-4" />
                                </button>
                                {/* <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                                    Contact Us
                                </button> */}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
                            <path d="M0 120 L60 110 C120 100 240 80 360 75 C480 70 600 80 720 85 C840 90 960 90 1080 85 C1200 80 1320 70 1380 65 L1440 60 L1440 120 L0 120 Z" fill="currentColor" />
                        </svg>
                    </div>
                </section>

                {/* Our Story Section */}
                <section ref={refs.story} className="py-16 md:py-12 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={storyInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            <div>
                                <div className="inline-flex items-center gap-2 bg-[#EB6664]/10 text-[#EB6664] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                    <FiHeart className="w-4 h-4" />
                                    Our Story
                                </div>
                                {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Every student is unique, and so is their learning journey
                                </h2> */}
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Every student is unique, and so is their learning journey. That's the idea that sparked Esperly. We wanted to create a space where students could learn
                                    at their own pace, on their own schedule, and with complete support—no matter where they are
                                    in the world.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    What started as a vision to make tuition more personal, interactive, and flexible has grown
                                    into a platform that brings one-on-one online learning right to your screen.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    At Esperly, we provide personalized online tuition for students from Class 1 to 12, across
                                    all major boards. Our tutors focus on understanding each student's strengths and challenges,
                                    designing lessons that make learning not just effective, but engaging and enjoyable.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Whether it's tackling a tricky math problem, exploring science concepts, or mastering language skills,
                                    our experienced educators guide students step by step, helping them gain confidence, clarity, and curiosity.
                                </p>
                            </div>
                            <div>
                                <div className="relative">
                                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#EB6664]/20 rounded-full blur-2xl"></div>
                                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#EB6664]/10 rounded-full blur-2xl"></div>
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
                                        alt="Students learning together"
                                        className="relative rounded-2xl shadow-xl w-full object-cover h-96"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Why Esperly Section */}
                <section ref={refs.why} className="py-12 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={whyInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center gap-2 bg-[#EB6664]/10 text-[#EB6664] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <FiStar className="w-4 h-4" />
                                Why Choose Us
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Why Esperly?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                We believe that learning should be exciting, accessible, and empowering
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {whyPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={whyInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4"
                                    style={{ borderTopColor: "#EB6664" }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#EB6664]/10 text-[#EB6664] flex items-center justify-center mb-4">
                                        <point.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{point.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={storyInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-12 bg-gradient-to-r from-[#EB6664]/5 to-[#EB6664]/10 rounded-2xl p-6 md:p-8 border border-[#EB6664]/20"
                    >
                        <p className="text-gray-700 leading-relaxed italic text-center text-lg">
                            "We believe that learning should be exciting, accessible, and empowering. At Esperly, we are committed
                            to supporting every student on their journey to academic success and beyond."
                        </p>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="py-12 md:py-12 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-[#EB6664]/10 via-[#EB6664]/5 to-[#EB6664]/10 rounded-2xl p-8 md:p-12 shadow-xl border border-[#EB6664]/20"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Join us
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Let’s make learning a journey students look forward to every day.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-[#EB6664] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d45555] transition-all transform hover:scale-105 shadow-lg">
                                    Get Started Free
                                </button>
                                <button className="border-2 border-[#EB6664] text-[#EB6664] px-8 py-3 rounded-lg font-semibold hover:bg-[#EB6664]/10 transition-all">
                                    Meet Our Tutors
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;