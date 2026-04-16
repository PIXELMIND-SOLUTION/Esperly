import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── TESTIMONIAL CARD WITH MAIN IMAGE FIRST ─────────────────────────── */
const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className="bg-[#FBF7F2] border border-[#D6CEBA] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col w-[300px] sm:w-[340px] lg:w-[380px] flex-shrink-0"
      whileHover={{ y: -8 }}
    >
      {/* Main Image - Full width at top */}
      <div className="relative w-full h-48 sm:h-48 lg:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={testimonial.mainImage}
          alt={testimonial.name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Overlay gradient for text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Quote mark overlay on image */}
        <div
          className="absolute bottom-3 right-4 font-serif text-5xl sm:text-6xl opacity-20 pointer-events-none text-white"
        >
          "
        </div>

        {/* Rating Badge on image */}
        {testimonial.rating && (
          <div className="absolute bottom-3 left-3 z-20 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-white text-xs font-medium">{testimonial.rating}.0</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Star rating row (if any) */}
        {testimonial.rating && (
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="text-sm sm:text-base"
                style={{ color: i < testimonial.rating ? "#F5C842" : "#D6CEBA" }}
              >
                ★
              </span>
            ))}
          </div>
        )}

        {/* Testimonial text */}
        <p className="font-serif text-sm sm:text-base text-[#1C1209] leading-relaxed mb-4 relative z-10 italic line-clamp-4 min-h-[85px]">
          "{testimonial.quote}"
        </p>

        {/* Author section */}
        <div className="flex items-center gap-3 sm:gap-4 border-t border-[#D6CEBA] pt-4 mt-auto">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm sm:text-base flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${testimonial.accentColor}22, ${testimonial.accentColor}66)`,
              border: `2px solid ${testimonial.accentColor}`,
              color: testimonial.accentColor,
            }}
          >
            {testimonial.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-serif font-bold text-[#1C1209] text-sm sm:text-base truncate">
              {testimonial.name}
            </p>
            <p className="font-mono text-[#7A6E5A] text-[10px] sm:text-xs mt-0.5 truncate">
              {testimonial.occupation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── CONTINUOUS SCROLL CAROUSEL ─────────────────────────────────── */
const TestimonialCarousel = ({
  title,
  accentText,
  testimonials,
  accentColor,
  direction = "left",
  speed = 0.6
}) => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Create triple array for seamless infinite scroll
  const tripledTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isClient || !scrollRef.current) return;

    const container = scrollRef.current;
    const scrollContent = container.children[0];

    if (!scrollContent) return;

    // Calculate total width of one set of testimonials
    const totalWidth = scrollContent.scrollWidth / 3;

    // Set initial scroll position based on direction
    if (direction === "right") {
      container.scrollLeft = totalWidth * 2;
    } else {
      container.scrollLeft = 0;
    }

    let scrollPosition = direction === "right" ? totalWidth * 2 : 0;

    const animate = () => {
      if (!container) return;

      if (direction === "left") {
        scrollPosition += speed;
        if (scrollPosition >= totalWidth * 2) {
          scrollPosition = totalWidth;
          container.scrollLeft = totalWidth;
        }
      } else {
        scrollPosition -= speed;
        if (scrollPosition <= totalWidth) {
          scrollPosition = totalWidth * 2;
          container.scrollLeft = totalWidth * 2;
        }
      }

      container.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, direction, speed, testimonials.length]);

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-[#FBF7F2] overflow-hidden">
      {/* Background decoration */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-[100px] opacity-10 top-[-10%] right-[-5%]" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
        <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full blur-[80px] opacity-8 bottom-0 left-[10%]" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
      </div> */}

      {/* Grid pattern overlay */}
      {/* <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1C1209" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#1C1209] leading-tight tracking-tight mb-3">
            {title}{" "}
            <span className="italic" style={{ color: accentColor }}>{accentText}</span>
          </h2>
          <div className="flex justify-center">
            <svg viewBox="0 0 200 12" className="w-36 sm:w-48 lg:w-60 h-3">
              <path
                d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
                stroke={accentColor}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Continuous Scroll Container */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 sm:gap-6 lg:gap-8 py-4" style={{ width: 'max-content' }}>
            {tripledTestimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={`${testimonial.name}-${idx}`}
                testimonial={testimonial}
                index={idx}
              />
            ))}
          </div>
        </div>        
      </div>

      <style>{`
        .overflow-x-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

/* ─── TESTIMONIALS DATA WITH MAIN IMAGES ─────────────────────────── */
const teacherTestimonials = [
  {
    name: "Meera Iyer",
    occupation: "Mathematics Faculty · 8 yrs exp",
    quote: "Esperly gave me a platform where my teaching style actually matters. Students come prepared, ask deeper questions, and the mentoring tools help me track their growth week by week.",
    avatar: "MI",
    accentColor: "#3B6FA0",
    mainImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: null,
  },
  {
    name: "Rajan Pillai",
    occupation: "Physics Mentor · IIT Bombay alum",
    quote: "I've taught in colleges and coaching centres — nothing compares to the depth of engagement here. The students are serious, and the platform keeps me organised without extra overhead.",
    avatar: "RP",
    accentColor: "#2E7D52",
    mainImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: null,
  },
  {
    name: "Ananya Krishnan",
    occupation: "English & Communication · 5 yrs",
    quote: "The session feedback loop is the best feature. I can see exactly where a student struggled and tailor the very next class to fix it. That's real teaching, not just delivery.",
    avatar: "AK",
    accentColor: "#A6192E",
    mainImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: null,
  },
  {
    name: "Priya Sharma",
    occupation: "Science Mentor · 10 yrs exp",
    quote: "The platform's analytics help me understand each student's learning pattern. I can customize my approach and see remarkable improvement in just weeks.",
    avatar: "PS",
    accentColor: "#F5C842",
    mainImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: null,
  },
  {
    name: "Vikram Singh",
    occupation: "Chemistry Faculty · IIT Delhi",
    quote: "Teaching on Esperly has transformed my career. The engagement tools and real-time feedback make every session productive and impactful.",
    avatar: "VS",
    accentColor: "#3B6FA0",
    mainImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: null,
  },
  {
    name: "Deepa Menon",
    occupation: "Biology Mentor · 12 yrs exp",
    quote: "The flexibility and resources on Esperly are unmatched. I can focus on teaching while the platform handles everything else seamlessly.",
    avatar: "DM",
    accentColor: "#2E7D52",
    mainImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: null,
  },
];

const parentTestimonials = [
  {
    name: "Sunita Reddy",
    occupation: "Parent of Aryan, Grade 11 · Mumbai",
    quote: "We were sceptical about online mentoring, but within a month my son's confidence in maths shot up. The mentor communicates with us too — that transparency is priceless.",
    avatar: "SR",
    accentColor: "#2E7D52",
    mainImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    name: "Vikram Bose",
    occupation: "Parent of Diya, Grade 9 · Bangalore",
    quote: "Esperly isn't just tutoring — it's mentoring. My daughter talks about her mentor the way I used to talk about my favourite teacher. That relationship is what makes the difference.",
    avatar: "VB",
    accentColor: "#3B6FA0",
    mainImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    name: "Kavitha Nair",
    occupation: "Parent of twins, Grade 10 · Hyderabad",
    quote: "Two children, two completely different learning styles — and Esperly matched each of them with the right mentor. The personalisation is something no classroom can offer.",
    avatar: "KN",
    accentColor: "#A6192E",
    mainImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    occupation: "Student, Grade 12 · Delhi",
    quote: "My mentor didn't just teach me physics; he taught me how to think. I went from average to top of my class in just 4 months.",
    avatar: "RM",
    accentColor: "#F5C842",
    mainImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    occupation: "Parent of Riya, Grade 8 · Pune",
    quote: "The weekly progress reports and parent-teacher meetings keep us completely in the loop. We've seen tremendous growth in our daughter's confidence.",
    avatar: "NG",
    accentColor: "#2E7D52",
    mainImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    name: "Arjun Kapoor",
    occupation: "Student, Grade 10 · Chennai",
    quote: "The personalized attention and doubt-clearing sessions have helped me improve my grades from 70% to 92% in just one semester!",
    avatar: "AK",
    accentColor: "#3B6FA0",
    mainImage: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=400&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop",
    rating: 5,
  },
];

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <div className="w-full">
      {/* Section 1: Teachers Testimonials - Continuous Scroll Left to Right */}
      <TestimonialCarousel
        title="Mentors Who"
        accentText="Truly Care"
        testimonials={teacherTestimonials}
        accentColor="#EB6664"
        direction="left"
        speed={0.7}
      />

      {/* Section 2: Student/Parent Feedbacks - Continuous Scroll Right to Left */}
      <TestimonialCarousel
        title="Parents & Students"
        accentText="Love Us"
        testimonials={parentTestimonials}
        accentColor="#EB6664"
        direction="right"
        speed={0.7}
      />
    </div>
  );
}