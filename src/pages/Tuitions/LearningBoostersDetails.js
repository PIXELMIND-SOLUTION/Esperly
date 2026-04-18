import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NavImage from '../../components/NavImage';

const learningBoostersData = {
    dance: {
        id: "dance",
        title: "Dance Classes",
        tagline: "Express yourself through movement",
        description: "Our dance classes help children develop coordination, rhythm, and self-expression while having fun.",
        longDescription: "Dance is not just about learning steps; it's about building confidence, discipline, and creativity. Our expert instructors guide students through age-appropriate techniques, helping them discover their unique style while improving physical fitness and social skills.",
        images: [
            "https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&q=80",
            "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&q=80",
            "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&q=80",
        ],
        bgGradient: "from-rose-600/80 via-orange-500/60 to-transparent",
        duration: "12 weeks", sessions: "2 sessions per week", ageGroup: "5–16 years", price: "₹2,499", level: "Beginner to Advanced",
        benefits: ["Improves physical fitness and flexibility", "Enhances coordination and balance", "Boosts self-confidence and expression", "Develops musicality and rhythm sense", "Builds teamwork and social skills"],
        curriculum: ["Basic footwork and body movements", "Rhythm and timing exercises", "Choreography basics", "Performance techniques", "Freestyle expression"],
        instructor: { name: "Priya Sharma", experience: "8+ years", specialty: "Contemporary & Hip-Hop" },
        schedule: "Monday & Wednesday — 4:00 PM to 5:30 PM",
        faqs: [
            { q: "Do I need prior dance experience?", a: "Not at all! Our classes are designed for all levels, from complete beginners to those with some experience. We group students by skill level to ensure everyone progresses comfortably." },
            { q: "What should my child wear to class?", a: "Comfortable, flexible clothing like leggings or joggers with a fitted top. Shoes depend on the dance style — we'll provide guidance after enrollment." },
            { q: "How many students are in each batch?", a: "We keep batches small — a maximum of 12 students — to ensure every child gets personal attention from the instructor." },
            { q: "Can parents watch the classes?", a: "Yes! Parents are welcome to observe the first class. After that, we recommend letting children settle in independently, which helps them focus better." },
            { q: "Is there a performance at the end of the course?", a: "Absolutely! We host a mini showcase at the end of every 12-week cycle where students perform for family and friends." },
        ],
        reviews: [
            { name: "Ananya R.", avatar: "A", rating: 5, date: "Oct 2024", text: "My daughter has transformed completely! She was shy before joining but now she performs on stage with full confidence. Priya ma'am is absolutely wonderful with kids." },
            { name: "Karthik M.", avatar: "K", rating: 5, date: "Sep 2024", text: "The quality of teaching is exceptional. Small batch sizes mean my son actually gets corrected and guided — not just herded around. Worth every rupee." },
            { name: "Sunita P.", avatar: "S", rating: 4, date: "Aug 2024", text: "Very well-structured program. My child looks forward to every class. Would love if there were more sessions per week though!" },
            { name: "Deepa V.", avatar: "D", rating: 5, date: "Jul 2024", text: "The end-of-course showcase was the highlight of our year. Seeing my child perform with such poise made us so proud. Highly recommend!" },
        ],
    },
    drawing: {
        id: "drawing",
        title: "Drawing Classes",
        tagline: "Bring your imagination to life",
        description: "Learn the fundamentals of drawing, from basic shapes to advanced sketching techniques.",
        longDescription: "Drawing is the foundation of all visual arts. Our structured program takes students from basic line work to complex compositions, teaching them to observe, analyze, and recreate the world around them with confidence.",
        images: [
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
            "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&q=80",
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&q=80",
        ],
        bgGradient: "from-blue-700/80 via-purple-500/60 to-transparent",
        duration: "10 weeks", sessions: "1 session per week", ageGroup: "4–14 years", price: "₹1,999", level: "All Levels",
        benefits: ["Develops fine motor skills", "Enhances observation and focus", "Stimulates creative thinking", "Builds patience and attention to detail", "Provides emotional outlet"],
        curriculum: ["Line and shape fundamentals", "Shading and texture techniques", "Perspective drawing", "Still life and nature drawing", "Character and cartoon drawing"],
        instructor: { name: "Vikram Mehta", experience: "10+ years", specialty: "Sketching & Illustration" },
        schedule: "Tuesday — 3:30 PM to 5:00 PM",
        faqs: [
            { q: "What art supplies do we need?", a: "For the first class, just bring a pencil and notebook. We'll share a complete materials list after. Basic supplies cost around ₹300–500 and are available at any stationery store." },
            { q: "Is this suitable for very young children (4–5 years)?", a: "Yes! For younger children, we focus on fun mark-making and shape recognition rather than strict technique. It's all about building a love for art." },
            { q: "Will my child's artwork be displayed anywhere?", a: "We compile a digital portfolio for each student and also hold an art exhibition at the end of each term for families to view." },
            { q: "What if my child misses a class?", a: "We offer one makeup session per term for missed classes with prior notice. Our instructors also share reference notes for any missed content." },
        ],
        reviews: [
            { name: "Meghna T.", avatar: "M", rating: 5, date: "Nov 2024", text: "Vikram sir has an incredible way of explaining perspective and shading to kids. My 9-year-old now draws things that genuinely surprise me every week!" },
            { name: "Ravi S.", avatar: "R", rating: 5, date: "Oct 2024", text: "The structured curriculum is what sets this apart. There's clear progression every week and kids can see their own improvement, which keeps them motivated." },
            { name: "Preethi N.", avatar: "P", rating: 4, date: "Sep 2024", text: "Really good program. My daughter completed the 10-week course and her observation skills have visibly improved. Already enrolled for the next batch!" },
        ],
    },
    singing: {
        id: "singing",
        title: "Singing Classes",
        tagline: "Find your voice, own the stage",
        description: "Professional vocal training covering breathing techniques, pitch control, and performance skills.",
        longDescription: "Discover the joy of singing with our expert-led classes. Students learn proper vocal techniques, ear training, and performance skills while exploring various musical genres. Whether beginner or advanced, every voice finds its place here.",
        images: [
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
        ],
        bgGradient: "from-pink-700/80 via-red-500/60 to-transparent",
        duration: "12 weeks", sessions: "2 sessions per week", ageGroup: "6–18 years", price: "₹2,999", level: "Beginner to Advanced",
        benefits: ["Improves breathing and posture", "Enhances memory and concentration", "Builds confidence and stage presence", "Develops musical ear", "Reduces stress and anxiety"],
        curriculum: ["Vocal warm-up exercises", "Breathing techniques", "Pitch and tone control", "Song interpretation", "Microphone technique"],
        instructor: { name: "Neha Gupta", experience: "12+ years", specialty: "Classical & Bollywood" },
        schedule: "Thursday & Saturday — 5:00 PM to 6:30 PM",
        faqs: [
            { q: "My child is very shy. Will singing classes help?", a: "Absolutely — in fact, shy children often benefit the most. We start with group exercises so no one feels singled out, and confidence builds naturally over time." },
            { q: "Do you teach only Bollywood songs?", a: "We cover a wide range — Bollywood, classical ragas, folk, and even some English songs. The curriculum is designed to build versatile vocal skills." },
            { q: "Is there a minimum age requirement?", a: "We accept students from age 6. For younger children, we focus on musical play, basic pitch matching, and simple nursery rhymes before moving to formal training." },
            { q: "Will students get to perform publicly?", a: "Yes! We organise a recital at the end of every 12-week cycle. Students also get opportunities to perform at school events and local competitions." },
        ],
        reviews: [
            { name: "Lalitha K.", avatar: "L", rating: 5, date: "Nov 2024", text: "Neha ma'am is a gem. My son went from not being able to hold a single note to performing a full Bollywood song at his school annual day. Truly life-changing!" },
            { name: "Arun B.", avatar: "A", rating: 5, date: "Oct 2024", text: "The breathing and posture techniques taught here have genuinely improved my daughter's overall confidence, not just her singing. Highly professional setup." },
            { name: "Jaya M.", avatar: "J", rating: 4, date: "Sep 2024", text: "Great classes with a very patient instructor. My child was terrified of performing but now actually volunteers to sing in front of people. Remarkable progress!" },
            { name: "Suresh P.", avatar: "S", rating: 5, date: "Aug 2024", text: "Best investment we made. The small batch means individual attention is guaranteed. You can actually hear the improvement week over week." },
        ],
    },
    yoga: {
        id: "yoga",
        title: "Yoga Classes",
        tagline: "Mind, body & soul harmony",
        description: "Holistic yoga sessions combining asanas, breathing exercises, and meditation for overall wellness.",
        longDescription: "Yoga for children helps build body awareness, improve concentration, and manage stress. Our classes are designed to be fun and engaging while teaching proper alignment and mindfulness techniques that benefit students both on and off the mat.",
        images: [
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=80",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
        ],
        bgGradient: "from-green-700/80 via-teal-500/60 to-transparent",
        duration: "8 weeks", sessions: "2 sessions per week", ageGroup: "5–16 years", price: "₹1,799", level: "All Levels",
        benefits: ["Improves flexibility and strength", "Enhances focus and concentration", "Reduces stress and anxiety", "Promotes better sleep", "Develops body awareness"],
        curriculum: ["Basic asanas (poses)", "Pranayama (breathing)", "Sun salutations", "Mindfulness meditation", "Relaxation techniques"],
        instructor: { name: "Anjali Nair", experience: "7+ years", specialty: "Children's Yoga & Mindfulness" },
        schedule: "Wednesday & Friday — 4:30 PM to 5:30 PM",
        faqs: [
            { q: "Do children need a yoga mat?", a: "Yes, a basic yoga mat is required. We recommend a non-slip mat of at least 4mm thickness. Good-quality mats are available for around ₹500–800 online." },
            { q: "Is yoga safe for children with health conditions?", a: "We recommend consulting your paediatrician first. Our instructor is trained in adaptive yoga and can modify poses for children with specific physical considerations." },
            { q: "How soon will we see results?", a: "Most parents report improved sleep and focus within 2–3 weeks. Flexibility and strength improvements are typically visible by week 4–5." },
            { q: "Will meditation be part of the sessions?", a: "Yes, every session ends with a 5–10 minute guided relaxation or mindfulness exercise. These are kept simple and age-appropriate." },
        ],
        reviews: [
            { name: "Padma R.", avatar: "P", rating: 5, date: "Oct 2024", text: "My hyperactive 8-year-old is now able to sit quietly and breathe through difficult emotions. The mindfulness component of these classes is gold. Thank you Anjali ma'am!" },
            { name: "Vikram D.", avatar: "V", rating: 5, date: "Sep 2024", text: "The improvement in my daughter's posture and flexibility is visible. More importantly, she sleeps better and is less anxious about exams. Wonderful program." },
            { name: "Chitra S.", avatar: "C", rating: 4, date: "Aug 2024", text: "Very calm and encouraging teaching style. My kids actually look forward to these sessions, which says everything. Would love if the course were longer than 8 weeks!" },
        ],
    },
    zumba: {
        id: "zumba",
        title: "Zumba Classes",
        tagline: "Dance your way to fitness",
        description: "High-energy dance fitness classes combining international music with fun, effective workouts.",
        longDescription: "Zumba for kids is all about having fun while staying active. Our classes feature kid-friendly routines set to upbeat music, helping children develop coordination, burn energy, and build healthy habits that last a lifetime.",
        images: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
            "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200&q=80",
            "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&q=80",
        ],
        bgGradient: "from-yellow-600/80 via-orange-500/60 to-transparent",
        duration: "10 weeks", sessions: "2 sessions per week", ageGroup: "7–16 years", price: "₹2,299", level: "Beginner to Intermediate",
        benefits: ["Improves cardiovascular health", "Boosts energy and endurance", "Enhances coordination and rhythm", "Burns calories while having fun", "Builds social connections"],
        curriculum: ["Warm-up and stretching", "Basic Zumba steps", "Choreographed routines", "Cool-down exercises", "Fun dance games"],
        instructor: { name: "Rahul Verma", experience: "6+ years", specialty: "Zumba Kids & Kids Jr." },
        schedule: "Monday & Thursday — 5:30 PM to 6:30 PM",
        faqs: [
            { q: "Is Zumba too intense for young children?", a: "Not at all. Zumba Kids is specifically designed to be age-appropriate with shorter, fun routines. The energy levels and movements are calibrated for children, not adults." },
            { q: "What should children wear and bring?", a: "Comfortable athletic wear and supportive sports shoes are ideal. Children should bring a water bottle — sessions are energetic and hydration is important!" },
            { q: "Will my child lose weight from Zumba?", a: "Zumba is primarily about fitness, fun, and coordination. Children burn energy and build endurance. We don't focus on weight loss but on building healthy active habits." },
            { q: "Can children with two left feet join?", a: "100%! Rahul sir is brilliant with beginners and makes the routines easy to follow. The focus is always on having fun — coordination improves naturally." },
        ],
        reviews: [
            { name: "Kavitha L.", avatar: "K", rating: 5, date: "Nov 2024", text: "My son used to hate any kind of exercise. Now he pesters me to drop him early for Zumba class! Rahul sir makes it so fun that kids don't even realise they're working out." },
            { name: "Harish N.", avatar: "H", rating: 5, date: "Oct 2024", text: "Incredible energy in every class. My daughter has made new friends and is visibly fitter. Her stamina during school sports has improved too. Amazing results!" },
            { name: "Rekha T.", avatar: "R", rating: 4, date: "Sep 2024", text: "Fun and energetic classes. My kids are always smiling when they come out. Great instructor who clearly loves what he does." },
        ],
    },
    painting: {
        id: "painting",
        title: "Painting Classes",
        tagline: "Colors that speak louder than words",
        description: "Explore watercolor, acrylic, and mixed media techniques in a vibrant creative environment.",
        longDescription: "Painting allows children to express emotions and ideas through colors and textures. Our classes cover multiple mediums and techniques, encouraging experimentation while building fundamental skills in composition, color theory, and artistic expression.",
        images: [
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80",
            "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
        ],
        bgGradient: "from-indigo-700/80 via-purple-500/60 to-transparent",
        duration: "12 weeks", sessions: "1 session per week", ageGroup: "5–15 years", price: "₹2,199", level: "All Levels",
        benefits: ["Enhances creativity and imagination", "Improves fine motor skills", "Develops color sense and composition", "Builds patience and focus", "Provides therapeutic outlet"],
        curriculum: ["Color theory basics", "Watercolor techniques", "Acrylic painting", "Texture and mixed media", "Canvas painting projects"],
        instructor: { name: "Meera Iyer", experience: "9+ years", specialty: "Watercolor & Acrylics" },
        schedule: "Saturday — 10:00 AM to 12:00 PM",
        faqs: [
            { q: "Are art supplies included in the fee?", a: "Basic supplies (canvas, brushes, paints) for the first two classes are included. After that, students will need their own kit. We provide a recommended list with budget options." },
            { q: "My child has never painted before — is that okay?", a: "Perfectly fine! We start with the absolute basics of color mixing and brush control. Even children with no prior experience produce beautiful work by week 3." },
            { q: "Are the finished artworks kept by the student?", a: "Yes! Every painting belongs to the student. We also photograph all work to build a digital portfolio that parents receive at the end of the course." },
            { q: "What styles of painting will be taught?", a: "We cover watercolor, acrylic, and mixed media. Students also get to try techniques inspired by famous artists like Monet, Van Gogh, and Madhubani painters." },
        ],
        reviews: [
            { name: "Shalini K.", avatar: "S", rating: 5, date: "Nov 2024", text: "Meera ma'am is a phenomenal teacher. My 7-year-old produced a watercolor landscape in week 4 that I genuinely framed and put up in our living room. Stunning!" },
            { name: "Balaji R.", avatar: "B", rating: 5, date: "Oct 2024", text: "The variety of techniques taught is impressive. My daughter has learned watercolor, acrylic, and even some mixed media. Her creativity has exploded since joining." },
            { name: "Nithya V.", avatar: "N", rating: 5, date: "Sep 2024", text: "Best thing we did this year. My son is calmer, more patient, and incredibly proud of his artwork. The digital portfolio at the end was a beautiful touch." },
            { name: "Ganesh M.", avatar: "G", rating: 4, date: "Aug 2024", text: "Excellent program. Only reason for 4 stars instead of 5 is I wish the Saturday session were longer — the kids are always reluctant to leave!" },
        ],
    },
};

/* ── Star Rating ── */
const StarRating = ({ rating, size = "sm" }) => {
    const sz = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`${sz} ${s <= rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

/* ── FAQ Item ── */
const FaqItem = ({ faq, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${open ? "border-[#EB6664]/30 bg-rose-50/40" : "border-gray-100 bg-white hover:border-rose-200"}`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left"
            >
                <div className="flex items-start gap-3 min-w-0">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white mt-0.5 bg-[#EB6664]">{index + 1}</span>
                    <span className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${open ? "text-[#EB6664]" : "text-gray-800"}`}>{faq.q}</span>
                </div>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border ${open ? "bg-[#EB6664] border-[#EB6664] rotate-180" : "bg-gray-50 border-gray-200"}`}>
                    <svg className={`w-3.5 h-3.5 transition-colors ${open ? "text-white" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div className={`transition-all duration-300 ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-gray-600 leading-relaxed pl-[52px]">{faq.a}</p>
            </div>
        </div>
    );
};

/* ── Review Card ── */
const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-[#EB6664] to-[#d45553] shadow-sm">
                    {review.avatar}
                </div>
                <div>
                    <p className="font-bold text-gray-800 text-sm leading-tight">{review.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{review.date}</p>
                </div>
            </div>
            <StarRating rating={review.rating} />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed italic">"{review.text}"</p>
    </div>
);

/* ── Hero Carousel ── */
const HeroCarousel = ({ booster, onBook }) => {
    const [cur, setCur] = useState(0);
    const [paused, setPaused] = useState(false);
    const timer = useRef(null);
    const images = booster.images;

    const next = useCallback(() => setCur((c) => (c + 1) % images.length), [images.length]);
    const prev = () => setCur((c) => (c - 1 + images.length) % images.length);

    useEffect(() => {
        if (!paused) timer.current = setInterval(next, 3000);
        return () => clearInterval(timer.current);
    }, [paused, next]);

    return (
        <div
            className="relative w-full min-h-screen overflow-hidden"
            style={{ height: "clamp(440px, 62vh, 700px)" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {images.map((img, i) => (
                <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === cur ? 1 : 0 }}>
                    <img src={img} alt={`${booster.title} ${i + 1}`} className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.75) saturate(1.1)", transform: i === cur ? "scale(1.03)" : "scale(1.06)", transition: "transform 5s ease-out" }} />
                </div>
            ))}
            {/* <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.18) 100%)" }} /> */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 30%, transparent 65%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 35%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, rgba(255,255,255,0.04) 0%, transparent 40%)" }} />

            <div className="absolute inset-0 flex flex-col justify-center pb-10 sm:pb-14 px-5 sm:px-10 lg:px-16 z-10">
                <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 mb-3 sm:mb-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white border border-white/25"
                        style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EB6664] animate-pulse" /> Learning Booster
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-2"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.8)" }}>
                        {booster.title}
                    </h1>
                    <p className="text-base sm:text-xl font-semibold mb-2" style={{ color: "rgba(255,255,255,0.88)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>{booster.tagline}</p>
                    <p className="text-sm sm:text-base leading-relaxed mb-5 max-w-xl hidden sm:block" style={{ color: "rgba(255,255,255,0.68)", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>{booster.description}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6">
                        {[{ label: booster.ageGroup, icon: "👧" }, { label: booster.duration, icon: "⏰" }, { label: booster.sessions, icon: "📅" }, { label: booster.level, icon: "⭐" }].map((s, i) => (
                            <div key={i} className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-white/15"
                                style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                                <span className="text-xs leading-none">{s.icon}</span>
                                <span className="text-white text-[11px] sm:text-xs font-semibold whitespace-nowrap">{s.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <button onClick={onBook} className="bg-[#EB6664] hover:bg-[#d45553] text-white px-6 sm:px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
                            style={{ boxShadow: "0 4px 24px rgba(235,102,100,0.55), 0 1px 0 rgba(255,255,255,0.15) inset" }}>
                            Book Class Now →
                        </button>
                    </div>
                </div>
            </div>

            {/* {[
                { onClick: prev, side: "left-3 sm:left-5", path: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" },
                { onClick: next, side: "right-3 sm:right-5", path: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" },
            ].map((arrow, i) => (
                <button key={i} onClick={arrow.onClick}
                    className={`absolute ${arrow.side} top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10 border border-white/20`}
                    style={{ background: "rgba(0,0,0,0.30)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d={arrow.path} clipRule="evenodd" /></svg>
                </button>
            ))} */}

            <div className="absolute bottom-4 right-4 sm:right-8 flex gap-2 z-10 p-1.5 rounded-xl border border-white/15"
                style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
                {images.map((img, i) => (
                    <button key={i} onClick={() => setCur(i)}
                        className={`rounded-lg overflow-hidden transition-all duration-300 border-2 ${i === cur ? "border-[#EB6664] shadow-lg" : "border-white/20 opacity-55 hover:opacity-80"}`}
                        style={{ width: i === cur ? 48 : 36, height: i === cur ? 32 : 24 }}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* <div className="absolute top-4 right-4 sm:right-8 rounded-full px-3 py-1 text-white text-xs font-bold z-10 border border-white/15 tabular-nums"
                style={{ background: "rgba(0,0,0,0.32)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                {cur + 1} <span className="text-white/40">/</span> {images.length}
            </div> */}

            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10">
                <div className="h-full bg-[#EB6664] transition-all duration-500" style={{ width: `${((cur + 1) / images.length) * 100}%` }} />
            </div>
        </div>
    );
};

/* ── Section Header ── */
const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-2 mb-5 sm:mb-6">
        <div className="w-1 h-6 rounded-full bg-[#EB6664]" />
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{title}</h2>
    </div>
);

/* ── Main Component ── */
export default function BoosterDetails() {
    const { boosterId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({ studentName: "", parentName: "", email: "", phone: "", age: "", preferredBatch: "", message: "" });

    const booster = learningBoostersData[boosterId?.toLowerCase()];

    if (!booster) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm w-full">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-xl font-bold text-gray-800 mb-2">Booster Not Found</h1>
                    <p className="text-gray-500 text-sm mb-6">The learning booster you're looking for doesn't exist.</p>
                    <Link to="/boosters" className="inline-block bg-[#EB6664] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#d45553] transition-colors">View All Boosters</Link>
                </div>
            </div>
        );
    }

    const avgRating = (booster.reviews.reduce((s, r) => s + r.rating, 0) / booster.reviews.length).toFixed(1);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) { setStep(2); return; }
        setSuccess(true);
        setTimeout(() => { setShowModal(false); setStep(1); setSuccess(false); setFormData({ studentName: "", parentName: "", email: "", phone: "", age: "", preferredBatch: "", message: "" }); }, 2200);
    };
    const closeModal = () => { setShowModal(false); setStep(1); setSuccess(false); };

    return (
        <>
            <Header />
            <NavImage />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50/30">
                <HeroCarousel booster={booster} onBook={() => setShowModal(true)} />

                {/* Quick Info Strip */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-10">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[{ icon: "⏰", label: "Duration", value: booster.duration }, { icon: "📅", label: "Sessions", value: booster.sessions }, { icon: "👧", label: "Age Group", value: booster.ageGroup }, { icon: "⭐", label: "Level", value: booster.level }].map((info, idx) => (
                            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="text-xl sm:text-2xl mb-1">{info.icon}</div>
                                <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{info.label}</p>
                                <p className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">{info.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                        {/* Left */}
                        <div className="lg:col-span-2 space-y-5 sm:space-y-6">

                            {/* About */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-100">
                                <SectionHeader title="About This Program" />
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{booster.longDescription}</p>
                            </div>

                            {/* Benefits */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-100">
                                <SectionHeader title="Benefits" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {booster.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-green-50/60 border border-green-100">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[11px] font-bold mt-0.5">✓</span>
                                            <span className="text-xs sm:text-sm text-gray-700 leading-snug">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Curriculum */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-100">
                                <SectionHeader title="What You'll Learn" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {booster.curriculum.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50/60 border border-rose-100">
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 text-white bg-[#EB6664]">{idx + 1}</span>
                                            <span className="text-xs sm:text-sm text-gray-700 leading-snug">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gallery */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                                <SectionHeader title="Gallery" />
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {booster.images.map((img, i) => (
                                        <div key={i} className="aspect-video rounded-xl overflow-hidden">
                                            <img src={img} alt={`${booster.title} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── FAQs ── */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-100">
                                <SectionHeader title="Frequently Asked Questions" />
                                <div className="space-y-2.5">
                                    {booster.faqs.map((faq, idx) => (
                                        <FaqItem key={idx} faq={faq} index={idx} />
                                    ))}
                                </div>
                            </div>

                            {/* ── Reviews ── */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-100">
                                {/* Header row with aggregate */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 sm:mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-6 rounded-full bg-[#EB6664]" />
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Reviews</h2>
                                    </div>
                                    {/* Aggregate score */}
                                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-2.5 self-start sm:self-auto">
                                        <div>
                                            <p className="text-2xl font-extrabold text-amber-500 leading-none">{avgRating}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{booster.reviews.length} reviews</p>
                                        </div>
                                        <div>
                                            <StarRating rating={Math.round(avgRating)} size="md" />
                                            <p className="text-[10px] text-amber-600 font-semibold mt-1">Excellent</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {booster.reviews.map((review, idx) => (
                                        <ReviewCard key={idx} review={review} />
                                    ))}
                                </div>

                                {/* CTA to leave review */}
                                <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <p className="text-sm text-gray-500">Enrolled in this program? Share your experience!</p>
                                    <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EB6664]/30 text-[#EB6664] text-sm font-semibold hover:bg-rose-50 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        Write a Review
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-5">

                            {/* Instructor */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                                <SectionHeader title="Your Instructor" />
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-[#EB6664] to-[#d45553] flex items-center justify-center text-white text-xl font-bold shadow-md">
                                        {booster.instructor.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-800 text-sm sm:text-base">{booster.instructor.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{booster.instructor.experience} experience</p>
                                        <p className="text-xs text-[#EB6664] font-medium mt-0.5">{booster.instructor.specialty}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="rounded-2xl p-5 sm:p-6 border border-rose-100 bg-gradient-to-br from-rose-50 to-orange-50">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xl">📅</span>
                                    <h2 className="text-base sm:text-lg font-bold text-gray-800">Class Schedule</h2>
                                </div>
                                <p className="text-sm font-semibold text-gray-700 leading-relaxed">{booster.schedule}</p>
                                <div className="mt-3 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-xs text-green-700 font-medium">First class free trial available!</p>
                                </div>
                            </div>

                            {/* Rating summary sidebar card */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1 h-6 rounded-full bg-[#EB6664]" />
                                    <h2 className="text-base sm:text-lg font-bold text-gray-800">Student Rating</h2>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-4xl font-extrabold text-amber-500">{avgRating}</div>
                                    <div>
                                        <StarRating rating={Math.round(avgRating)} size="md" />
                                        <p className="text-xs text-gray-400 mt-1">Based on {booster.reviews.length} reviews</p>
                                    </div>
                                </div>
                                {/* Distribution bars */}
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = booster.reviews.filter(r => r.rating === star).length;
                                    const pct = Math.round((count / booster.reviews.length) * 100);
                                    return (
                                        <div key={star} className="flex items-center gap-2 mb-1.5">
                                            <span className="text-xs text-gray-500 w-3">{star}</span>
                                            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                                            </div>
                                            <span className="text-[10px] text-gray-400 w-6 text-right">{pct}%</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Sticky CTA */}
                            <div className="lg:sticky lg:top-6">
                                <button onClick={() => setShowModal(true)}
                                    className="w-full bg-[#EB6664] text-white py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:bg-[#d45553] transition-all hover:scale-[1.02] active:scale-95">
                                    Book Your Class Now
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-2">Limited seats · Register today!</p>
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {[{ icon: "🏆", label: "Expert Tutors" }, { icon: "✅", label: "Verified Classes" }, { icon: "🔄", label: "Flexible Batches" }].map((b, i) => (
                                        <div key={i} className="bg-white rounded-xl p-2 text-center border border-gray-100 shadow-sm">
                                            <div className="text-base mb-0.5">{b.icon}</div>
                                            <p className="text-[10px] text-gray-500 font-medium leading-tight">{b.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
                    onClick={(e) => e.target === e.currentTarget && closeModal()}>
                    <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">
                        {success ? (
                            <div className="p-10 text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">✅</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">We'll contact you within 24 hours to confirm your class schedule.</p>
                            </div>
                        ) : (
                            <>
                                <div className="relative h-28 sm:h-32 rounded-t-3xl sm:rounded-t-2xl overflow-hidden">
                                    <img src={booster.images[0]} alt={booster.title} className="w-full h-full object-cover" />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${booster.bgGradient} to-black/60`} />
                                    <div className="absolute inset-0 flex items-center justify-between px-5 sm:px-6">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-white">Book {booster.title}</h3>
                                            <p className="text-xs text-white/80 mt-0.5">Fill in details to reserve your spot</p>
                                        </div>
                                        <button onClick={closeModal} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-xl hover:bg-white/30 transition-colors">×</button>
                                    </div>
                                    <div className="absolute bottom-3 left-5 sm:left-6 flex items-center gap-2">
                                        {[1, 2].map((s) => (
                                            <div key={s} className="flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "bg-white text-gray-800" : "bg-white/30 text-white"}`}>{s}</div>
                                                {s < 2 && <div className={`h-0.5 w-8 rounded-full transition-all ${step > s ? "bg-white" : "bg-white/30"}`} />}
                                            </div>
                                        ))}
                                        <span className="text-[11px] text-white/70 ml-1">{step === 1 ? "Personal Details" : "Batch & Preferences"}</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                                    {step === 1 ? (
                                        <>
                                            {[
                                                { label: "Student's Full Name", name: "studentName", type: "text", placeholder: "Enter student name" },
                                                { label: "Parent / Guardian Name", name: "parentName", type: "text", placeholder: "Enter parent name" },
                                                { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
                                                { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter mobile number" },
                                            ].map((f) => (
                                                <div key={f.name}>
                                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">{f.label} *</label>
                                                    <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} required placeholder={f.placeholder}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20 outline-none transition-all bg-gray-50 focus:bg-white" />
                                                </div>
                                            ))}
                                            <div>
                                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Student's Age *</label>
                                                <input type="number" name="age" value={formData.age} onChange={handleChange} required min="3" max="18" placeholder="Age in years"
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20 outline-none transition-all bg-gray-50 focus:bg-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Preferred Batch *</label>
                                                <select name="preferredBatch" value={formData.preferredBatch} onChange={handleChange} required
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20 outline-none transition-all bg-gray-50 focus:bg-white">
                                                    <option value="">Select a batch</option>
                                                    <option>Morning Batch (9 AM – 10:30 AM)</option>
                                                    <option>Afternoon Batch (3 PM – 4:30 PM)</option>
                                                    <option>Evening Batch (5 PM – 6:30 PM)</option>
                                                    <option>Weekend Batch (Saturday / Sunday)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Any Special Requests?</label>
                                                <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us if you have any specific requirements..."
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#EB6664] focus:ring-2 focus:ring-[#EB6664]/20 outline-none transition-all resize-none bg-gray-50 focus:bg-white" />
                                            </div>
                                            <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 space-y-2">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Booking Summary</p>
                                                {[{ k: "Course", v: booster.title }, { k: "Duration", v: booster.duration }, { k: "Schedule", v: booster.schedule }].map((r) => (
                                                    <div key={r.k} className="flex justify-between text-sm">
                                                        <span className="text-gray-500">{r.k}</span>
                                                        <span className="font-semibold text-gray-800 text-right ml-4">{r.v}</span>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between text-sm pt-2 border-t border-rose-200">
                                                    <span className="text-gray-500">Fee</span>
                                                    <span className="font-extrabold text-[#EB6664]">{booster.price}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="flex gap-3 pt-1">
                                        {step === 2 && (
                                            <button type="button" onClick={() => setStep(1)}
                                                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                                ← Back
                                            </button>
                                        )}
                                        <button type="submit"
                                            className="flex-1 py-3 rounded-xl bg-[#EB6664] text-white text-sm font-bold hover:bg-[#d45553] transition-all hover:scale-[1.02] active:scale-95 shadow-md">
                                            {step === 1 ? "Continue →" : "Confirm Booking ✓"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}