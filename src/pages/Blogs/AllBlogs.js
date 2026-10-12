import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiStar, FiArrowRight } from "react-icons/fi";
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HERO_IMG from "../../assets/Blogs/Bloghero.png";
import F_BLOG from "../../assets/Blogs/fblog.png";
import BLOG_1 from "../../assets/Blogs/blog1.png";
import BLOG_2 from "../../assets/Blogs/blog2.png";
import BLOG_3 from "../../assets/Blogs/blog3.png";
import BLOG_4 from "../../assets/Blogs/blog4.png";
import BLOG_5 from "../../assets/Blogs/blog5.png";
import AUTHOR from "../../assets/Blogs/author.png";

/* ───────── DATA ───────── */
const CATEGORIES = [
  "All",
  "Study Tips",
  "Exam Prep",
  "Parent Guides",
  "Student Success",
  "Career Guidance",
];

const BLOGS = [
  {
    id: 1,
    slug: "how-to-choose-the-right-tutor",
    title: "How to choose the right tutorial for your child",
    excerpt:
      "Practical strategies, study techniques, and insights designed to support every student's learning journey.",
    category: "Tutoring",
    topics: ["Parent Guides", "Student Success"],
    author: "Priya Sharma",
    authorRole: "Education Consultant",
    authorImg: AUTHOR,
    image: F_BLOG,
    featured: true,
  },
  {
    id: 2,
    slug: "top-study-techniques-for-students",
    title: "Top 7 Study Techniques That Actually Work",
    excerpt:
      "From spaced repetition to the Pomodoro technique, discover science-backed strategies that can transform how students learn and retain information.",
    category: "Learning Tips",
    topics: ["Study Tips", "Exam Prep"],
    image: BLOG_1,
  },
  {
    id: 3,
    slug: "ai-in-education-future",
    title: "The Future of AI in Personalised Education",
    excerpt:
      "Artificial intelligence is reshaping the classroom. Explore how adaptive learning platforms are making education more personal and effective than ever before.",
    category: "Technology",
    topics: ["Student Success"],
    image: BLOG_2,
  },
  {
    id: 4,
    slug: "career-paths-after-12th",
    title: "Best Career Paths to Explore After Class 12",
    excerpt:
      "Unsure what to do after school? We break down the most rewarding career options across science, commerce, and arts streams for students.",
    category: "Career",
    topics: ["Career Guidance", "Exam Prep"],
    image: BLOG_3,
  },
  {
    id: 5,
    slug: "supporting-child-learning-at-home",
    title: "How Parents Can Support Learning at Home",
    excerpt:
      "The home environment plays a crucial role in academic success. Practical tips for parents to nurture curiosity and build good study habits.",
    category: "Parenting",
    topics: ["Parent Guides"],
    image: BLOG_4,
  },
  {
    id: 6,
    slug: "online-vs-offline-tutoring",
    title: "Online vs Offline Tutoring: Which Is Right for You?",
    excerpt:
      "Both formats have their merits. We compare the benefits and limitations of online and in-person tutoring to help parents choose the best option.",
    category: "Tutoring",
    topics: ["Parent Guides", "Student Success"],
    image: BLOG_5,
  },
];

/* ───────── FADE-IN WRAPPER ───────── */
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5% 0px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ───────── FEATURED CARD ───────── */
const FeaturedCard = ({ blog, onClick }) => (
  <Reveal>
    <article
      role="link"
      tabIndex={0}
      onClick={() => onClick(blog.slug)}
      onKeyDown={(e) => e.key === "Enter" && onClick(blog.slug)}
      className="group cursor-pointer rounded-2xl border border-[#EB6664] bg-[#F7C8C4]
                 p-3 sm:p-4 grid grid-cols-1 md:grid-cols-[minmax(0,300px)_1fr]
                 lg:grid-cols-[minmax(0,360px)_1fr] gap-4 md:gap-5
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB6664]/60"
    >
      <div className="overflow-hidden rounded-xl h-[190px] sm:h-[240px] md:h-full md:min-h-[210px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[#EB6664]">
            <FiStar className="w-3.5 h-3.5 fill-current" />
            Featured
          </span>
          <span className="text-xs md:text-sm text-[#EB6664]/80">
            {blog.category}
          </span>
        </div>

        <h2 className="mt-2 text-lg sm:text-xl lg:text-[22px] font-semibold text-black leading-snug max-w-lg">
          {blog.title}
        </h2>

        <p className="mt-2 text-sm md:text-base text-black/80 leading-relaxed max-w-2xl">
          {blog.excerpt}
        </p>

        <div className="mt-5 md:mt-auto pt-2 flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src={blog.authorImg}
              alt={blog.author}
              className="w-9 h-9 rounded-full object-cover bg-[#EB6664]/20"
            />
            <div className="leading-tight">
              <p className="text-sm font-medium text-black">{blog.author}</p>
              <p className="text-xs text-black/70">{blog.authorRole}</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[#EB6664] whitespace-nowrap transition-all group-hover:gap-2.5">
            Read Article <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </span>
        </div>
      </div>
    </article>
  </Reveal>
);

/* ───────── BLOG CARD ───────── */
const BlogCard = ({ blog, index, onClick }) => (
  <Reveal delay={(index % 3) * 0.08} className="h-full">
    <article
      role="link"
      tabIndex={0}
      onClick={() => onClick(blog.slug)}
      onKeyDown={(e) => e.key === "Enter" && onClick(blog.slug)}
      className="group cursor-pointer h-full flex flex-col overflow-hidden rounded-2xl bg-[#EAE5E2]
                 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB6664]/60"
    >
      <div className="overflow-hidden h-[160px] sm:h-[170px] lg:h-[180px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <span className="self-start ml-0.5 mt-0.5 rounded-md bg-[#F8D5D1] px-2.5 py-0.5 text-xs text-[#EB6664] font-medium">
        {blog.category}
      </span>

      <div className="flex flex-col flex-1 px-5 lg:px-6 pt-3 pb-4">
        <h3 className="text-base lg:text-[17px] font-semibold leading-snug text-black transition-colors group-hover:text-[#EB6664] line-clamp-2">
          {blog.title}
        </h3>

        <p className="mt-2 text-[13px] lg:text-sm leading-relaxed text-black/75 line-clamp-4">
          {blog.excerpt}
        </p>

        <span className="mt-auto pt-3 self-end inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[#EB6664] transition-all group-hover:gap-2.5">
          Read <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </span>
      </div>
    </article>
  </Reveal>
);

/* ───────── PAGE ───────── */
const AllBlogs = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.trim().toLowerCase();

  const matches = (b) => {
    const matchCat = activeCategory === "All" || b.topics.includes(activeCategory);
    const matchSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  };

  const featured = BLOGS.find((b) => b.featured && matches(b));
  const filtered = BLOGS.filter((b) => !b.featured && matches(b));
  const hasResults = Boolean(featured) || filtered.length > 0;

  const handleNavigate = (slug) => navigate(`/blogs/${slug}`);

  return (
    <>
      <Header onOpenModal={() => setOpenModal(true)} />

      <main className="font-['Poppins',sans-serif] bg-[#FCF4F0] overflow-x-hidden">
        {/* ═════════ HERO ═════════ */}
        <section className="relative w-full flex items-end overflow-hidden h-[90vh]">
          <img
            src={HERO_IMG}
            alt="Student learning online with headphones"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center"
          />
          {/* soft light overlay keeps the dark text readable on the photo */}
          <div className="absolute inset-0 bg-white/40 sm:bg-gradient-to-r sm:from-white/70 sm:via-white/30 sm:to-transparent" />

          <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-24 pb-8 sm:pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#EB6664] shadow-sm">
                Our Blogs
              </span>

              <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black">
                &quot;<span className="text-[#EB6664]">Learning</span> Insights&quot;
              </h1>

              <p className="mt-3 text-sm sm:text-base text-black/70 max-w-xl leading-relaxed">
                Helpful tips, learning strategies, and resources to support every
                student&apos;s academic journey.
              </p>

              <div className="mt-5 relative w-full max-w-[560px]">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search learning resources"
                  aria-label="Search learning resources"
                  className="w-full h-11 pl-10 sm:pl-11 pr-4 rounded-lg bg-white text-sm text-black shadow-sm
                             outline-none placeholder:text-black/50 focus:ring-2 focus:ring-[#EB6664]/40"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* ═════════ CATEGORY PILLS ═════════ */}
          <div
            className="pt-8 md:pt-12 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2.5 overflow-x-auto sm:flex-wrap sm:overflow-visible
                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 whitespace-nowrap rounded-lg border border-[#EB6664] px-4 py-1.5
                            text-sm md:text-base font-medium transition-colors ${
                              activeCategory === cat
                                ? "bg-[#EB6664] text-white"
                                : "bg-transparent text-black hover:bg-[#F8D5D1]"
                            }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ═════════ FEATURED ═════════ */}
          {featured && (
            <div className="mt-6 md:mt-8">
              <FeaturedCard blog={featured} onClick={handleNavigate} />
            </div>
          )}

          {/* ═════════ GRID ═════════ */}
          {filtered.length > 0 && (
            <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} onClick={handleNavigate} />
              ))}
            </div>
          )}

          {/* ═════════ EMPTY STATE ═════════ */}
          {!hasResults && (
            <div className="text-center py-20">
              <p className="text-base font-semibold text-black">No articles found</p>
              <p className="text-sm mt-1 text-black/70">
                Try a different search term or category.
              </p>
            </div>
          )}

          {/* ═════════ VIEW MORE ═════════ */}
          {hasResults && (
            <div className="mt-8 md:mt-12 pb-10 md:pb-14 flex justify-center">
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-[#EB6664] text-white
                           px-5 py-2.5 text-sm md:text-base font-semibold shadow-sm
                           transition hover:bg-[#d95755]"
              >
                View More Articles <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default AllBlogs;