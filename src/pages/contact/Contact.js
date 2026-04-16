import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";
import Header from "../../components/Header";

const Contact = () => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const formRef = useRef(null);
    const inView = useInView(formRef, { once: true, margin: "-8% 0px" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[\d\s+\-()]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Form submitted:", formData);
            setSubmitStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header onOpenModal={() => setOpenModal(true)} />
            <NavImage />
            <section className="relative overflow-hidden bg-[#FBF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">


                {/* Decorative Circles */}
                <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#EB6664]/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#3B6FA0]/5 blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-[#2E7D52]/5 blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header Section */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-8 h-px bg-[#EB6664]/50" />
                            <span className="text-xs font-semibold text-[#EB6664] tracking-wider uppercase">
                                Get in Touch
                            </span>
                            <div className="w-8 h-px bg-[#EB6664]/50" />
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1209] mb-4">
                            Let's{" "}
                            <span className="text-[#EB6664] italic">
                                Connect
                            </span>
                        </h2>

                        <p className="text-sm sm:text-base text-[#7A6E5A] max-w-2xl mx-auto">
                            Have a question or need a little guidance? We’re here for you! Whether it’s choosing the
                            right course, finding the perfect tutor, or just clarifying your doubts, our team is ready to help.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            <span className="px-3 py-1 border border-[#EB6664]/30 rounded-full text-xs text-[#EB6664]/70">
                                Fill out the form below, and we’ll get back to you quickly—because at Esperly, your learning
                                journey matters to us!
                            </span>
                        </div>
                    </motion.div>

                    {/* Form and Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column - Contact Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="space-y-6"
                        >
                            {/* Address Card */}
                            <div className="bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">📍</div>
                                    <div>
                                        <h3 className="font-semibold text-[#1C1209] text-lg mb-2">
                                            Our Location
                                        </h3>
                                        <p className="text-sm text-[#7A6E5A] leading-relaxed">
                                            123 Esperly Lane<br />
                                            Tech City, TC 12345<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">@</div>
                                    <div>
                                        <h3 className="font-semibold text-[#1C1209] text-lg mb-2">
                                            Email Us
                                        </h3>
                                        <p className="text-sm text-[#7A6E5A] leading-relaxed">
                                            hello@esperly.com<br />
                                            support@esperly.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Card */}
                            <div className="bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">☎</div>
                                    <div>
                                        <h3 className="font-semibold text-[#1C1209] text-lg mb-2">
                                            Call Us
                                        </h3>
                                        <p className="text-sm text-[#7A6E5A] leading-relaxed">
                                            +91 12345 67890<br />
                                            Mon-Fri, 9am - 6pm IST
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl p-6 sm:p-8 shadow-lg relative">
                                {/* Corner Decoration */}
                                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#EB6664]/5 transform rotate-45 translate-x-8 -translate-y-8" />
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                                            Full Name
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full bg-transparent text-sm text-[#1C1209] outline-none border-b transition-all py-2 ${errors.name
                                                ? "border-[#EB6664] focus:border-[#EB6664]"
                                                : "border-[#EB6664]/20 focus:border-[#EB6664]/60"
                                                }`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="text-[#EB6664] text-xs mt-1">
                                                ✗ {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                                            Email Address
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full bg-transparent text-sm text-[#1C1209] outline-none border-b transition-all py-2 ${errors.email
                                                ? "border-[#EB6664] focus:border-[#EB6664]"
                                                : "border-[#EB6664]/20 focus:border-[#EB6664]/60"
                                                }`}
                                            placeholder="hello@esperly.com"
                                        />
                                        {errors.email && (
                                            <p className="text-[#EB6664] text-xs mt-1">
                                                ✗ {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                                            Contact Number
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full bg-transparent text-sm text-[#1C1209] outline-none border-b transition-all py-2 ${errors.phone
                                                ? "border-[#EB6664] focus:border-[#EB6664]"
                                                : "border-[#EB6664]/20 focus:border-[#EB6664]/60"
                                                }`}
                                            placeholder="+91 12345 67890"
                                        />
                                        {errors.phone && (
                                            <p className="text-[#EB6664] text-xs mt-1">
                                                ✗ {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#3A2E1A] tracking-wide mb-1.5 uppercase">
                                            Your Message
                                            <span className="text-[#EB6664] ml-0.5">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className={`w-full bg-transparent text-sm text-[#1C1209] outline-none border-b transition-all py-2 resize-y ${errors.message
                                                ? "border-[#EB6664] focus:border-[#EB6664]"
                                                : "border-[#EB6664]/20 focus:border-[#EB6664]/60"
                                                }`}
                                            placeholder="Write your message here..."
                                        />
                                        {errors.message && (
                                            <p className="text-[#EB6664] text-xs mt-1">
                                                ✗ {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#EB6664] text-white font-semibold py-3 rounded-xl hover:bg-[#EB6664]/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>SENDING...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>SUBMIT</span>
                                                <span>→</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Submit Status Messages */}
                                    {submitStatus === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-3 text-center bg-green-50 border border-green-200 rounded-xl"
                                        >
                                            <p className="text-green-700 text-sm">
                                                ✓ Message sent! We'll respond within 24 hours.
                                            </p>
                                        </motion.div>
                                    )}

                                    {submitStatus === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 p-3 text-center bg-red-50 border border-red-200 rounded-xl"
                                        >
                                            <p className="text-red-600 text-sm">
                                                ✗ Something went wrong. Please try again.
                                            </p>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Keyframes for spinner animation */}
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    .animate-spin {
                        animation: spin 0.6s linear infinite;
                    }
                `}</style>
            </section>
            <Footer />
            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};

export default Contact;