import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";
import Header from "../../components/Header";

// ─── Mock Data (keep in sync with Blogs.jsx or import from a shared file) ───
const BLOGS = [
    {
        id: 1,
        slug: "how-to-choose-the-right-tutor",
        title: "How to Choose the Right Tutor for Your Child",
        excerpt:
            "Finding the perfect tutor can feel overwhelming. Here's a step-by-step guide to help you make the right choice for your child's learning journey.",
        category: "Tutoring",
        author: "Priya Sharma",
        authorRole: "Education Consultant",
        authorBio:
            "Priya has over 12 years of experience helping families find the right educational support for their children.",
        date: "May 12, 2025",
        readTime: "5 min read",
        image:
            "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80",
        tags: ["Tutoring", "Parenting", "Education"],
        featured: true,
        content: [
            {
                type: "paragraph",
                text: "Choosing the right tutor for your child is one of the most important decisions you can make as a parent.",
            },
            {
                type: "heading",
                text: "1. Identify Your Child's Needs First",
            },
            {
                type: "paragraph",
                text: "Before searching, understand what your child actually needs — subject help or general support.",
            },
            {
                type: "quote",
                text: "The best tutors don't just teach — they listen first and teach second.",
                author: "Priya Sharma",
            },
            {
                type: "heading",
                text: "2. Look for Relevant Qualifications",
            },
            {
                type: "paragraph",
                text: "Experience matters more than degrees. Always check references.",
            },
        ],
    },

    {
        id: 2,
        slug: "top-study-techniques-for-students",
        title: "Top 7 Study Techniques That Actually Work",
        excerpt:
            "Discover science-backed strategies that improve memory and learning.",
        category: "Learning Tips",
        author: "Rahul Verma",
        authorRole: "Cognitive Psychologist",
        date: "April 28, 2025",
        readTime: "7 min read",
        image:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        featured: false,
        content: [],
    },

    {
        id: 3,
        slug: "ai-in-education-future",
        title: "The Future of AI in Personalised Education",
        excerpt:
            "AI is transforming learning with adaptive and personalized systems.",
        category: "Technology",
        author: "Ananya Singh",
        authorRole: "EdTech Researcher",
        date: "April 15, 2025",
        readTime: "6 min read",
        image:
            "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
        featured: false,
        content: [],
    },

    {
        id: 4,
        slug: "career-paths-after-12th",
        title: "Best Career Paths to Explore After Class 12",
        excerpt:
            "Explore top career options across science, commerce, and arts streams.",
        category: "Career",
        author: "Vikram Nair",
        authorRole: "Career Counsellor",
        date: "March 30, 2025",
        readTime: "8 min read",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        featured: false,
        content: [],
    },

    {
        id: 5,
        slug: "supporting-child-learning-at-home",
        title: "How Parents Can Support Learning at Home",
        excerpt:
            "Simple ways parents can improve their child’s academic success.",
        category: "Parenting",
        author: "Meera Iyer",
        authorRole: "Child Development Specialist",
        date: "March 18, 2025",
        readTime: "4 min read",
        image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        featured: false,
        content: [],
    },

    {
        id: 6,
        slug: "online-vs-offline-tutoring",
        title: "Online vs Offline Tutoring: Which Is Right?",
        excerpt:
            "Compare benefits of online and offline tutoring methods.",
        category: "Tutoring",
        author: "Priya Sharma",
        authorRole: "Education Consultant",
        date: "March 5, 2025",
        readTime: "5 min read",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        featured: false,
        content: [],
    },
];

// ─── Related card ─────────────────────────────────────────────────────────────
const RelatedCard = ({ blog, onClick }) => (
    <div
        onClick={() => onClick(blog.slug)}
        className="group cursor-pointer bg-[#FCFAF5] border border-[#EB6664]/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
        <div className="relative h-36 overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute top-2 left-2 bg-[#EB6664] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                {blog.category}
            </span>
        </div>
        <div className="p-4">
            <p className="text-xs text-[#7A6E5A] mb-1">{blog.date} · {blog.readTime}</p>
            <h4 className="text-sm font-bold text-[#1C1209] leading-snug group-hover:text-[#EB6664] transition-colors line-clamp-2">
                {blog.title}
            </h4>
        </div>
    </div>
);

// ─── Content Renderer ─────────────────────────────────────────────────────────
const ContentBlock = ({ block, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-5% 0px" });

    const base = {
        initial: { opacity: 0, y: 16 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay: index * 0.04 },
    };

    if (block.type === "heading") {
        return (
            <motion.h2 ref={ref} {...base} className="text-lg sm:text-xl font-bold text-[#1C1209] mt-8 mb-3">
                {block.text}
            </motion.h2>
        );
    }

    if (block.type === "paragraph") {
        return (
            <motion.p ref={ref} {...base} className="text-sm sm:text-base text-[#4A3F2F] leading-relaxed mb-4">
                {block.text}
            </motion.p>
        );
    }

    if (block.type === "quote") {
        return (
            <motion.blockquote
                ref={ref}
                {...base}
                className="my-6 sm:my-8 pl-5 border-l-4 border-[#EB6664] bg-[#EB6664]/5 py-4 pr-4 rounded-r-xl"
            >
                <p className="text-base sm:text-lg font-semibold text-[#1C1209] italic leading-snug mb-2">
                    "{block.text}"
                </p>
                {block.author && (
                    <p className="text-xs text-[#7A6E5A] font-medium">— {block.author}</p>
                )}
            </motion.blockquote>
        );
    }

    if (block.type === "list") {
        return (
            <motion.ul ref={ref} {...base} className="space-y-2 mb-4 pl-1">
                {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#4A3F2F]">
                        <span className="mt-1 min-w-[6px] h-[6px] w-[6px] rounded-full bg-[#EB6664] flex-shrink-0" />
                        {item}
                    </li>
                ))}
            </motion.ul>
        );
    }

    return null;
};

// ─── Blog Details Page ────────────────────────────────────────────────────────
const BlogDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const headerRef = useRef(null);
    const inView = useInView(headerRef, { once: true, margin: "-5% 0px" });

    const blog = BLOGS.find((b) => b.slug === slug) || BLOGS[0]; // fallback to first
    const related = BLOGS.filter((b) => b.slug !== blog.slug).slice(0, 3);

    return (
        <>
            <Header onOpenModal={() => setOpenModal(true)} />
            <NavImage />

            <section className="relative overflow-hidden bg-transparent py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                {/* Decorative blobs */}
                <div className="hidden sm:block absolute top-20 right-10 w-32 h-32 rounded-full bg-[#EB6664]/5 blur-3xl pointer-events-none" />
                <div className="hidden sm:block absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#3B6FA0]/5 blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">

                    {/* ── Back Button ── */}
                    <motion.button
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => navigate("/blogs")}
                        className="mb-6 sm:mb-8 flex items-center gap-2 text-sm font-semibold text-[#EB6664] hover:gap-3 transition-all"
                    >
                        ← Back to Blogs
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                        {/* ── Main Content ── */}
                        <div className="lg:col-span-2">

                            {/* Hero image */}
                            <motion.div
                                ref={headerRef}
                                initial={{ opacity: 0, y: 24 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7 }}
                                className="relative rounded-2xl overflow-hidden h-52 sm:h-72 lg:h-80 mb-6 sm:mb-8 shadow-md"
                            >
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <span className="absolute top-4 left-4 bg-[#EB6664] text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                                    {blog.category}
                                </span>
                            </motion.div>

                            {/* Meta */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex flex-wrap items-center gap-3 mb-4"
                            >
                                <span className="text-xs text-[#7A6E5A]">{blog.date}</span>
                                <span className="w-1 h-1 rounded-full bg-[#EB6664]/40 inline-block" />
                                <span className="text-xs text-[#7A6E5A]">{blog.readTime}</span>
                                <span className="w-1 h-1 rounded-full bg-[#EB6664]/40 inline-block" />
                                <div className="flex flex-wrap gap-1.5">
                                    {blog.tags?.map((tag) => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#EB6664]/10 text-[#EB6664] rounded-full font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1209] leading-tight mb-6 sm:mb-8"
                            >
                                {blog.title}
                            </motion.h1>

                            {/* Author strip */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex items-center gap-4 p-4 bg-[#FCFAF5] border border-[#EB6664]/10 rounded-xl mb-8 shadow-sm"
                            >
                                <div className="w-11 h-11 rounded-full bg-[#EB6664]/15 flex items-center justify-center text-base font-bold text-[#EB6664] flex-shrink-0">
                                    {blog.author.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-[#1C1209]">{blog.author}</p>
                                    <p className="text-xs text-[#7A6E5A]">{blog.authorRole}</p>
                                </div>
                                <button
                                    onClick={() => navigate("/contact")}
                                    className="text-xs font-semibold text-[#EB6664] border border-[#EB6664]/30 px-3 py-1.5 rounded-lg hover:bg-[#EB6664]/5 transition-colors hidden sm:block"
                                >
                                    Contact
                                </button>
                            </motion.div>

                            {/* Divider */}
                            <div className="w-full h-px bg-[#EB6664]/10 mb-8" />

                            {/* Article body */}
                            <div>
                                {blog.content?.map((block, i) => (
                                    <ContentBlock key={i} block={block} index={i} />
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-[#EB6664]/10 my-8" />

                            {/* Share + Tags row */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags?.map((tag) => (
                                        <span key={tag} className="text-xs px-3 py-1 bg-[#FCFAF5] border border-[#EB6664]/20 text-[#EB6664] rounded-full font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#7A6E5A] font-medium">Share:</span>
                                    {["𝕏", "in", "📋"].map((icon, i) => (
                                        <button
                                            key={i}
                                            className="w-8 h-8 rounded-lg bg-[#FCFAF5] border border-[#EB6664]/15 flex items-center justify-center text-xs text-[#7A6E5A] hover:border-[#EB6664]/50 hover:text-[#EB6664] transition-all"
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Author bio card */}
                            {blog.authorBio && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-8 p-5 sm:p-6 bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-full bg-[#EB6664]/15 flex items-center justify-center text-xl font-bold text-[#EB6664] flex-shrink-0">
                                            {blog.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#EB6664] uppercase tracking-wider mb-1">About the Author</p>
                                            <p className="text-base font-bold text-[#1C1209] mb-1">{blog.author}</p>
                                            <p className="text-xs text-[#7A6E5A] mb-2">{blog.authorRole}</p>
                                            <p className="text-sm text-[#4A3F2F] leading-relaxed">{blog.authorBio}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* ── Sidebar ── */}
                        <aside className="space-y-6">

                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-[#EB6664] text-white rounded-2xl p-5 sm:p-6 shadow-md"
                            >
                                <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Ready to learn?</p>
                                <h3 className="text-lg font-bold leading-snug mb-3">
                                    Find your perfect tutor on Esperly today
                                </h3>
                                <p className="text-xs leading-relaxed opacity-80 mb-4">
                                    Match with verified educators tailored to your goals, schedule, and learning style.
                                </p>
                                <button
                                    onClick={() => navigate("/contact")}
                                    className="w-full bg-white text-[#EB6664] text-sm font-bold py-2.5 rounded-xl hover:bg-white/90 transition-colors"
                                >
                                    Get Started →
                                </button>
                            </motion.div>

                            {/* Related Articles */}
                            {related.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-5 h-px bg-[#EB6664]/50" />
                                        <h3 className="text-xs font-bold text-[#EB6664] uppercase tracking-wider">Related Articles</h3>
                                        <div className="flex-1 h-px bg-[#EB6664]/10" />
                                    </div>

                                    <div className="space-y-4">
                                        {related.map((b) => (
                                            <RelatedCard key={b.id} blog={b} onClick={(s) => navigate(`/blogs/${s}`)} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Newsletter */}
                            <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl p-5 shadow-sm"
                            >
                                <h3 className="text-sm font-bold text-[#1C1209] mb-1">Stay in the loop 📬</h3>
                                <p className="text-xs text-[#7A6E5A] mb-3 leading-relaxed">
                                    Get the latest tips, guides, and stories delivered to your inbox every week.
                                </p>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-transparent text-sm text-[#1C1209] border-b border-[#EB6664]/20 focus:border-[#EB6664]/60 outline-none py-2 mb-3 placeholder:text-[#7A6E5A]/50 transition-all"
                                />
                                <button className="w-full bg-[#EB6664] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl hover:bg-[#EB6664]/90 transition-colors">
                                    Subscribe
                                </button>
                            </motion.div>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
            <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
};

export default BlogDetails;