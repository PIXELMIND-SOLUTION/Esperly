import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiTwitter,
  FiLinkedin,
  FiLink,
  FiCheck,
} from "react-icons/fi";
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

/* ───────── DATA (keep in sync with AllBlogs or move to a shared file) ───────── */
const BLOGS = [
  {
    id: 1,
    slug: "how-to-choose-the-right-tutor",
    title: "How to choose the right tutorial for your child",
    excerpt:
      "Practical strategies, study techniques, and insights designed to support every student's learning journey.",
    category: "Tutoring",
    author: "Priya Sharma",
    authorRole: "Education Consultant",
    authorImg: AUTHOR,
    authorBio:
      "Priya has over 12 years of experience helping families find the right educational support for their children.",
    date: "May 12, 2025",
    readTime: "5 min read",
    image: F_BLOG,
    tags: ["Tutoring", "Parenting", "Education"],
    content: [
      {
        type: "paragraph",
        text: "Choosing the right tutor for your child is one of the most important decisions you can make as a parent.",
      },
      { type: "heading", text: "1. Identify Your Child's Needs First" },
      {
        type: "paragraph",
        text: "Before searching, understand what your child actually needs — subject help or general support.",
      },
      {
        type: "quote",
        text: "The best tutors don't just teach — they listen first and teach second.",
        author: "Priya Sharma",
      },
      { type: "heading", text: "2. Look for Relevant Qualifications" },
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
      "From spaced repetition to the Pomodoro technique, discover science-backed strategies that can transform how students learn and retain information.",
    category: "Learning Tips",
    author: "Rahul Verma",
    authorRole: "Cognitive Psychologist",
    date: "April 28, 2025",
    readTime: "7 min read",
    image: BLOG_1,
    content: [],
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
    image: BLOG_2,
    content: [],
  },
  {
    id: 4,
    slug: "career-paths-after-12th",
    title: "Best Career Paths to Explore After Class 12",
    excerpt:
      "Unsure what to do after school? We break down the most rewarding career options across science, commerce, and arts streams for students.",
    category: "Career",
    author: "Vikram Nair",
    authorRole: "Career Counsellor",
    date: "March 30, 2025",
    readTime: "8 min read",
    image: BLOG_3,
    content: [],
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
    image: BLOG_4,
    content: [],
  },
  {
    id: 6,
    slug: "online-vs-offline-tutoring",
    title: "Online vs Offline Tutoring: Which Is Right for You?",
    excerpt:
      "Both formats have their merits. We compare the benefits and limitations of online and in-person tutoring to help parents choose the best option.",
    category: "Tutoring",
    author: "Priya Sharma",
    authorRole: "Education Consultant",
    date: "March 5, 2025",
    readTime: "5 min read",
    image: BLOG_5,
    content: [],
  },
];

/* ───────── SMALL HELPERS ───────── */
const Avatar = ({ src, name, className = "" }) =>
  src ? (
    <img
      src={src}
      alt={name}
      className={`rounded-full object-cover bg-[#EB6664]/20 shrink-0 ${className}`}
    />
  ) : (
    <div
      className={`rounded-full bg-[#F8D5D1] text-[#EB6664] font-semibold flex items-center justify-center shrink-0 ${className}`}
    >
      {name.charAt(0)}
    </div>
  );

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5% 0px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ───────── RELATED CARD ───────── */
const RelatedCard = ({ blog, onClick }) => (
  <article
    role="link"
    tabIndex={0}
    onClick={() => onClick(blog.slug)}
    onKeyDown={(e) => e.key === "Enter" && onClick(blog.slug)}
    className="group cursor-pointer flex gap-3 rounded-xl bg-[#EAE5E2] p-2.5
               transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
               focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB6664]/60"
  >
    <img
      src={blog.image}
      alt={blog.title}
      className="w-24 h-20 sm:w-28 sm:h-[88px] rounded-lg object-cover shrink-0"
    />
    <div className="min-w-0 flex flex-col justify-center">
      <span className="self-start rounded-md bg-[#F8D5D1] px-2 py-0.5 text-[11px] font-medium text-[#EB6664]">
        {blog.category}
      </span>
      <h4 className="mt-1.5 text-sm font-semibold leading-snug text-black line-clamp-2 transition-colors group-hover:text-[#EB6664]">
        {blog.title}
      </h4>
      <p className="mt-1 text-xs text-black/60">{blog.readTime}</p>
    </div>
  </article>
);

/* ───────── CONTENT BLOCKS ───────── */
const ContentBlock = ({ block, index }) => {
  const motionProps = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-5% 0px" },
    transition: { duration: 0.45, delay: Math.min(index * 0.04, 0.2) },
  };

  if (block.type === "heading") {
    return (
      <motion.h2
        {...motionProps}
        className="mt-8 mb-3 text-lg sm:text-xl font-semibold text-black"
      >
        {block.text}
      </motion.h2>
    );
  }

  if (block.type === "paragraph") {
    return (
      <motion.p
        {...motionProps}
        className="mb-4 text-sm sm:text-base leading-relaxed text-black/80"
      >
        {block.text}
      </motion.p>
    );
  }

  if (block.type === "quote") {
    return (
      <motion.blockquote
        {...motionProps}
        className="my-6 rounded-r-xl border-l-4 border-[#EB6664] bg-[#F8D5D1]/60 py-4 pl-5 pr-4"
      >
        <p className="text-base sm:text-lg font-medium italic leading-snug text-black">
          &quot;{block.text}&quot;
        </p>
        {block.author && (
          <p className="mt-2 text-xs sm:text-sm font-medium text-[#EB6664]">
            — {block.author}
          </p>
        )}
      </motion.blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <motion.ul {...motionProps} className="mb-4 space-y-2">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm sm:text-base text-black/80"
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#EB6664] shrink-0" />
            {item}
          </li>
        ))}
      </motion.ul>
    );
  }

  return null;
};

/* ───────── PAGE ───────── */
const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const blog = BLOGS.find((b) => b.slug === slug) || BLOGS[0]; // fallback to first
  const related = BLOGS.filter((b) => b.slug !== blog.slug).slice(0, 3);

  // scroll to top when opening another article
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blog.slug]);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const share = (type) => {
    const url = encodeURIComponent(pageUrl);
    const text = encodeURIComponent(blog.title);
    if (type === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
    } else if (type === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <Header onOpenModal={() => setOpenModal(true)} />

      <main className="font-['Poppins',sans-serif] bg-[#FCF4F0] overflow-x-hidden">
        {/* ═════════ HERO ═════════ */}
        <section className="relative w-full flex items-end overflow-hidden min-h-[320px] sm:min-h-[380px] lg:min-h-[440px]">
          <img
            src={HERO_IMG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center"
          />
          <div className="absolute inset-0 bg-black/55 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/40 sm:to-black/10" />

          <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 pb-8 sm:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => navigate("/blogs")}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90
                           transition-all hover:gap-3 hover:text-white"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to Blogs
              </button>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 text-xs sm:text-sm font-medium text-[#EB6664] shadow-sm">
                  {blog.category}
                </span>
                <span className="text-xs sm:text-sm text-white/80">
                  {blog.date} · {blog.readTime}
                </span>
              </div>

              <h1 className="mt-3 max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                {blog.title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ═════════ BODY ═════════ */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 lg:gap-10">
            {/* ── Article ── */}
            <article className="min-w-0">
              <Reveal>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[210px] sm:h-[300px] lg:h-[360px] rounded-2xl object-cover"
                />
              </Reveal>

              {/* Author strip */}
              <Reveal delay={0.05} className="mt-5">
                <div className="flex items-center gap-3 rounded-2xl border border-[#EB6664] bg-[#F7C8C4] p-3 sm:p-4">
                  <Avatar
                    src={blog.authorImg}
                    name={blog.author}
                    className="w-10 h-10 sm:w-11 sm:h-11 text-base"
                  />
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="text-sm sm:text-base font-semibold text-black">
                      {blog.author}
                    </p>
                    <p className="text-xs sm:text-sm text-black/70">
                      {blog.authorRole}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/contact")}
                    className="hidden sm:inline-flex rounded-lg border border-[#EB6664] bg-transparent px-4 py-1.5
                               text-sm font-semibold text-[#EB6664] transition hover:bg-[#EB6664] hover:text-white"
                  >
                    Contact
                  </button>
                </div>
              </Reveal>

              {/* Body */}
              <div className="mt-6 sm:mt-8">
                <p className="mb-5 text-base sm:text-lg font-medium leading-relaxed text-black">
                  {blog.excerpt}
                </p>

                {blog.content?.length > 0 ? (
                  blog.content.map((block, i) => (
                    <ContentBlock key={i} block={block} index={i} />
                  ))
                ) : (
                  <p className="rounded-xl bg-[#F8D5D1]/60 px-4 py-3 text-sm text-black/70">
                    The full article is on its way. Check back soon for more.
                  </p>
                )}
              </div>

              <div className="my-8 h-px w-full bg-[#EB6664]/20" />

              {/* Tags + share */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[#EB6664] px-3 py-1 text-xs sm:text-sm font-medium text-[#EB6664]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-black/70">
                    Share
                  </span>
                  <button
                    onClick={() => share("twitter")}
                    aria-label="Share on X"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8D5D1] text-[#EB6664] transition hover:bg-[#EB6664] hover:text-white"
                  >
                    <FiTwitter className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => share("linkedin")}
                    aria-label="Share on LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8D5D1] text-[#EB6664] transition hover:bg-[#EB6664] hover:text-white"
                  >
                    <FiLinkedin className="h-4 w-4" />
                  </button>
                  <button
                    onClick={copyLink}
                    aria-label="Copy link"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8D5D1] text-[#EB6664] transition hover:bg-[#EB6664] hover:text-white"
                  >
                    {copied ? <FiCheck className="h-4 w-4" /> : <FiLink className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Author bio */}
              {blog.authorBio && (
                <Reveal className="mt-8">
                  <div className="flex items-start gap-4 rounded-2xl bg-[#EAE5E2] p-5 sm:p-6">
                    <Avatar
                      src={blog.authorImg}
                      name={blog.author}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-lg"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#EB6664]">
                        About the Author
                      </p>
                      <p className="mt-1 text-base font-semibold text-black">
                        {blog.author}
                      </p>
                      <p className="text-xs sm:text-sm text-black/60">
                        {blog.authorRole}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-black/80">
                        {blog.authorBio}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              {/* CTA */}
              <Reveal>
                <div className="rounded-2xl bg-[#EB6664] p-5 sm:p-6 text-white shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Ready to learn?
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">
                    Find your perfect tutor on Esperly today
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    Match with verified educators tailored to your goals,
                    schedule, and learning style.
                  </p>
                  <button
                    onClick={() => navigate("/contact")}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5
                               text-sm font-semibold text-[#EB6664] transition hover:bg-[#F8D5D1]"
                  >
                    Get Started <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>

              {/* Related */}
              {related.length > 0 && (
                <Reveal delay={0.05}>
                  <h3 className="mb-3 text-sm sm:text-base font-semibold text-[#EB6664]">
                    Related Articles
                  </h3>
                  <div className="space-y-3">
                    {related.map((b) => (
                      <RelatedCard
                        key={b.id}
                        blog={b}
                        onClick={(s) => navigate(`/blogs/${s}`)}
                      />
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Newsletter */}
              <Reveal delay={0.1}>
                <form
                  onSubmit={(e) => e.preventDefault()} // TODO: connect to your newsletter API
                  className="rounded-2xl border border-[#EB6664] bg-[#F8D5D1] p-5"
                >
                  <h3 className="text-base font-semibold text-[#EB6664]">
                    Stay in the loop
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-black/75">
                    Get the latest tips, guides, and stories delivered to your
                    inbox every week.
                  </p>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="mt-3 h-10 w-full rounded-lg bg-white px-3 text-sm text-black outline-none
                               placeholder:text-black/40 focus:ring-2 focus:ring-[#EB6664]/40"
                  />
                  <button
                    type="submit"
                    className="mt-3 w-full rounded-lg bg-[#EB6664] py-2.5 text-sm font-semibold text-white transition hover:bg-[#d95755]"
                  >
                    Subscribe
                  </button>
                </form>
              </Reveal>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default BlogDetails;