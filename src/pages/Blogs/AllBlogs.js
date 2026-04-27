import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";
import Header from "../../components/Header";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Learning Tips", "Tutoring", "Career", "Technology", "Parenting"];

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
    date: "May 12, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    slug: "top-study-techniques-for-students",
    title: "Top 7 Study Techniques That Actually Work",
    excerpt:
      "From spaced repetition to the Pomodoro technique, discover science-backed strategies that can transform how students learn and retain information.",
    category: "Learning Tips",
    author: "Rahul Verma",
    authorRole: "Cognitive Psychologist",
    date: "April 28, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    featured: false,
  },
  {
    id: 3,
    slug: "ai-in-education-future",
    title: "The Future of AI in Personalised Education",
    excerpt:
      "Artificial intelligence is reshaping the classroom. Explore how adaptive learning platforms are making education more personal and effective than ever before.",
    category: "Technology",
    author: "Ananya Singh",
    authorRole: "EdTech Researcher",
    date: "April 15, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    slug: "career-paths-after-12th",
    title: "Best Career Paths to Explore After Class 12",
    excerpt:
      "Unsure what to do after school? We break down the most rewarding career options across science, commerce, and arts streams for 2025 graduates.",
    category: "Career",
    author: "Vikram Nair",
    authorRole: "Career Counsellor",
    date: "March 30, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    slug: "supporting-child-learning-at-home",
    title: "How Parents Can Support Learning at Home",
    excerpt:
      "The home environment plays a crucial role in academic success. Practical tips for parents to nurture curiosity and build good study habits.",
    category: "Parenting",
    author: "Meera Iyer",
    authorRole: "Child Development Specialist",
    date: "March 18, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    featured: false,
  },
  {
    id: 6,
    slug: "online-vs-offline-tutoring",
    title: "Online vs Offline Tutoring: Which Is Right for You?",
    excerpt:
      "Both formats have their merits. We compare the benefits and limitations of online and in-person tutoring to help you decide what suits your child best.",
    category: "Tutoring",
    author: "Priya Sharma",
    authorRole: "Education Consultant",
    date: "March 5, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    featured: false,
  },
];

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ blog, index, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onClick={() => onClick(blog.slug)}
      className="group cursor-pointer bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 sm:h-48">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 bg-[#EB6664] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
          {blog.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#7A6E5A] mb-3">
          <span>{blog.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#EB6664]/40 inline-block" />
          <span>{blog.readTime}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#1C1209] leading-snug mb-2 group-hover:text-[#EB6664] transition-colors line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#7A6E5A] leading-relaxed flex-1 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Author + CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EB6664]/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#EB6664]/15 flex items-center justify-center text-xs font-bold text-[#EB6664]">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1C1209] leading-none">{blog.author}</p>
              <p className="text-[10px] text-[#7A6E5A]">{blog.authorRole}</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#EB6664] flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <span>→</span>
          </span>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Featured Card ────────────────────────────────────────────────────────────
const FeaturedCard = ({ blog, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      onClick={() => onClick(blog.slug)}
      className="group cursor-pointer bg-[#FCFAF5] border border-[#EB6664]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="relative overflow-hidden h-52 sm:h-64 lg:h-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-4 left-4 bg-[#EB6664] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
          ⭐ Featured · {blog.category}
        </span>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-2 text-xs text-[#7A6E5A] mb-3">
          <span>{blog.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#EB6664]/40 inline-block" />
          <span>{blog.readTime}</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1209] leading-tight mb-3 group-hover:text-[#EB6664] transition-colors">
          {blog.title}
        </h2>

        <p className="text-sm text-[#7A6E5A] leading-relaxed mb-6">{blog.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EB6664]/15 flex items-center justify-center text-sm font-bold text-[#EB6664]">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1C1209]">{blog.author}</p>
              <p className="text-xs text-[#7A6E5A]">{blog.authorRole}</p>
            </div>
          </div>
          <button className="bg-[#EB6664] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-[#EB6664]/90 transition-colors flex items-center gap-1.5">
            Read Article <span>→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Blogs Page ───────────────────────────────────────────────────────────────
const AllBlogs = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-8% 0px" });

  const featured = BLOGS.find((b) => b.featured);
  const rest = BLOGS.filter((b) => !b.featured);

  const filtered = rest.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleNavigate = (slug) => navigate(`/blogs/${slug}`);

  return (
    <>
      <Header onOpenModal={() => setOpenModal(true)} />
      <NavImage />

      <section className="relative overflow-hidden bg-transparent py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="hidden sm:block absolute top-20 right-10 w-32 h-32 rounded-full bg-[#EB6664]/5 blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#3B6FA0]/5 blur-3xl pointer-events-none" />
        <div className="hidden lg:block absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-[#2E7D52]/5 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* ── Header ── */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 sm:w-8 h-px bg-[#EB6664]/50" />
              <span className="text-xs sm:text-sm font-semibold text-[#EB6664] tracking-wider uppercase">
                Our Blog
              </span>
              <div className="w-6 sm:w-8 h-px bg-[#EB6664]/50" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1209] mb-3 sm:mb-4 px-4">
              Insights &{" "}
              <span className="text-[#EB6664] italic">Stories</span>
            </h2>

            <p className="text-sm sm:text-base text-[#7A6E5A] max-w-2xl mx-auto px-4">
              Tips, guides, and stories from our educators and experts — designed to help
              learners, parents, and tutors thrive together.
            </p>
          </motion.div>

          {/* ── Search + Filter ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10 items-center"
          >
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EB6664]/50 text-sm">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FCFAF5] border border-[#EB6664]/20 rounded-xl text-[#1C1209] outline-none focus:border-[#EB6664]/60 transition-all placeholder:text-[#7A6E5A]/60"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeCategory === cat
                      ? "bg-[#EB6664] text-white border-[#EB6664]"
                      : "bg-[#FCFAF5] text-[#7A6E5A] border-[#EB6664]/20 hover:border-[#EB6664]/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Featured Post ── */}
          {featured && activeCategory === "All" && !searchQuery && (
            <div className="mb-8 sm:mb-10">
              <FeaturedCard blog={featured} onClick={handleNavigate} />
            </div>
          )}

          {/* ── Grid ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} onClick={handleNavigate} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#7A6E5A]">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-base font-semibold text-[#1C1209]">No articles found</p>
              <p className="text-sm mt-1">Try a different search term or category.</p>
            </div>
          )}

          {/* ── Load More (Static UI) ── */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-10 sm:mt-14"
            >
              <button className="inline-flex items-center gap-2 border border-[#EB6664]/30 text-[#EB6664] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#EB6664]/5 transition-all">
                Load More Articles <span>↓</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default AllBlogs;