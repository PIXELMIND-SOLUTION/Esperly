import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ChevronRight, Phone, Mail, Play, CheckCircle, 
  Award, Clock, Users, BookOpen, Sparkles, 
  Star, ArrowRight, Shield, Target, Heart, Brain
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const COURSES = {
  Abacus: {
    hero: {
      tagline: "Mental Math Mastery",
      gradient: "from-[#EB6664] via-[#D95553] to-[#C74442]",
      accent: "#EB6664",
      darkAccent: "#D95553",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🧮",
    },
    trainingModes: ["Online One-on-One", "Group Batch"],
    duration: "3-6 Months",
    description: "Transform your child's mathematical ability with ancient abacus techniques that build lightning-fast mental calculation skills.",
    stats: [
      { icon: Brain, label: "Brain Development", value: "2x Faster" },
      { icon: Target, label: "Accuracy", value: "99%" },
      { icon: Star, label: "Student Rating", value: "4.9/5" },
    ],
    whatIs: {
      title: "What is Abacus?",
      points: [
        "Traditional manual tool that revolutionized mental math",
        "Uses bead movements to represent numbers and calculations",
        "Develops photographic memory for numbers",
        "Enables split-second mental calculations",
        "Builds strong mathematical foundation",
      ],
    },
    benefits: [
      { icon: "🧠", title: "Dual Brain Activation", desc: "Uses both left and right brain hemispheres" },
      { icon: "⚡", title: "Lightning Fast", desc: "Calculate faster than calculators" },
      { icon: "🎯", title: "Pinpoint Accuracy", desc: "Eliminate careless mistakes" },
      { icon: "💪", title: "Boosted Confidence", desc: "Master math with ease" },
    ],
    approach: [
      {
        title: "Personalized Learning Path",
        icon: "🎯",
        desc: "Every child gets a customized learning plan based on their current skill level and learning pace.",
      },
      {
        title: "Expert Mentors",
        icon: "👨‍🏫",
        desc: "Certified abacus trainers with years of experience in child development.",
      },
      {
        title: "Gamified Progress",
        icon: "🎮",
        desc: "Fun challenges and rewards keep children motivated throughout the journey.",
      },
      {
        title: "Real-time Analytics",
        icon: "📊",
        desc: "Track your child's speed, accuracy, and improvement with detailed reports.",
      },
    ],
    faqs: [
      { q: "What is the right age to start abacus?", a: "Children aged 5-12 years benefit the most from abacus training." },
      { q: "How long does it take to see results?", a: "Most children show significant improvement within 2-3 months." },
      { q: "Is online training effective?", a: "Yes, our interactive platform makes online learning highly effective." },
    ],
  },
  "Phonics Classes": {
    hero: {
      tagline: "Read Like a Pro",
      gradient: "from-[#EB6664] via-[#D95553] to-[#C74442]",
      accent: "#EB6664",
      darkAccent: "#D95553",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🔤",
    },
    trainingModes: ["Online One-on-One", "Group Batch"],
    duration: "4-8 Months",
    description: "Master the art of reading through scientific phonics methods that make learning to read natural and fun.",
    stats: [
      { icon: BookOpen, label: "Reading Level", value: "2x Grade" },
      { icon: Users, label: "Success Rate", value: "98%" },
      { icon: Star, label: "Parent Rating", value: "4.9/5" },
    ],
    whatIs: {
      title: "What are Phonics Classes?",
      points: [
        "Scientific method of teaching reading through sound-letter relationships",
        "Builds decoding skills for unfamiliar words",
        "Develops strong spelling and writing abilities",
        "Creates confident, fluent readers",
      ],
    },
    benefits: [
      { icon: "📖", title: "Early Reading", desc: "Start reading independently within weeks" },
      { icon: "✍️", title: "Perfect Spelling", desc: "Spell complex words with ease" },
      { icon: "🗣️", title: "Clear Pronunciation", desc: "Speak with perfect diction" },
      { icon: "🎯", title: "Comprehension", desc: "Understand what you read deeply" },
    ],
    approach: [
      {
        title: "Multi-Sensory Learning",
        icon: "🎨",
        desc: "Visual, auditory, and kinesthetic activities for complete engagement.",
      },
      {
        title: "Rhyme & Rhythm",
        icon: "🎵",
        desc: "Musical methods that make learning sounds memorable and fun.",
      },
      {
        title: "Story-Based Practice",
        icon: "📚",
        desc: "Real stories that apply phonics skills in meaningful contexts.",
      },
      {
        title: "Progress Milestones",
        icon: "🏆",
        desc: "Celebrate achievements with certificates and rewards.",
      },
    ],
    faqs: [
      { q: "What age is best for phonics?", a: "Ages 3-7 is the ideal window for phonics instruction." },
      { q: "How is phonics different from whole language?", a: "Phonics teaches decoding skills vs memorizing whole words." },
      { q: "Can phonics help with dyslexia?", a: "Yes, systematic phonics is proven to help dyslexic learners." },
    ],
  },
  "Public Speaking": {
    hero: {
      tagline: "Own the Stage",
      gradient: "from-[#EB6664] via-[#D95553] to-[#C74442]",
      accent: "#EB6664",
      darkAccent: "#D95553",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🎤",
    },
    trainingModes: ["Online One-on-One", "Group Batch"],
    duration: "3-6 Months",
    description: "Transform nervous speakers into confident orators who command attention and inspire audiences.",
    stats: [
      { icon: Users, label: "Students Trained", value: "5000+" },
      { icon: Award, label: "Success Rate", value: "95%" },
      { icon: Star, label: "Rating", value: "4.8/5" },
    ],
    whatIs: {
      title: "What is Public Speaking Training?",
      points: [
        "Master the art of confident communication",
        "Learn voice modulation and body language",
        "Structure compelling speeches and presentations",
        "Overcome stage fright and anxiety",
      ],
    },
    benefits: [
      { icon: "🎯", title: "Confidence Boost", desc: "Speak without fear in any situation" },
      { icon: "💬", title: "Clear Communication", desc: "Express ideas effectively" },
      { icon: "🏆", title: "Leadership Skills", desc: "Inspire and influence others" },
      { icon: "🤝", title: "Better Relationships", desc: "Connect with any audience" },
    ],
    approach: [
      {
        title: "Safe Practice Environment",
        icon: "🛡️",
        desc: "Supportive space to make mistakes and improve without judgment.",
      },
      {
        title: "Real-World Scenarios",
        icon: "🌍",
        desc: "Practice debates, presentations, and impromptu speaking.",
      },
      {
        title: "Video Feedback",
        icon: "📹",
        desc: "Record and review sessions to track improvement.",
      },
      {
        title: "Peer Learning",
        icon: "👥",
        desc: "Learn from fellow students in group sessions.",
      },
    ],
    faqs: [
      { q: "Can shy kids learn public speaking?", a: "Absolutely! Our program is designed for introverts." },
      { q: "How soon will I see improvement?", a: "Most students show confidence gains within 4 weeks." },
      { q: "Are there competitions?", a: "Yes, we organize regular speaking contests." },
    ],
  },
  "Personality Development": {
    hero: {
      tagline: "Shine From Within",
      gradient: "from-[#EB6664] via-[#D95553] to-[#C74442]",
      accent: "#EB6664",
      darkAccent: "#D95553",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🌟",
    },
    trainingModes: ["Online One-on-One", "Group Batch"],
    duration: "4-8 Months",
    description: "Holistic development program that builds character, confidence, and social skills for lifelong success.",
    stats: [
      { icon: Heart, label: "Happier Kids", value: "92%" },
      { icon: Users, label: "Better Social Skills", value: "96%" },
      { icon: Star, label: "Parent Satisfaction", value: "4.9/5" },
    ],
    whatIs: {
      title: "What is Personality Development?",
      points: [
        "Holistic growth of character and soft skills",
        "Build emotional intelligence and empathy",
        "Develop leadership and teamwork abilities",
        "Create a positive self-image and mindset",
      ],
    },
    benefits: [
      { icon: "🌈", title: "Emotional Intelligence", desc: "Understand and manage emotions" },
      { icon: "🤝", title: "Social Confidence", desc: "Make friends and connect easily" },
      { icon: "🎯", title: "Goal Setting", desc: "Set and achieve personal goals" },
      { icon: "💪", title: "Resilience", desc: "Bounce back from challenges" },
    ],
    approach: [
      {
        title: "Values-Based Learning",
        icon: "💎",
        desc: "Core values integrated into every activity.",
      },
      {
        title: "Role-Play Scenarios",
        icon: "🎭",
        desc: "Practice real-life social situations safely.",
      },
      {
        title: "Reflection Journals",
        icon: "📓",
        desc: "Track personal growth and insights.",
      },
      {
        title: "Parent Involvement",
        icon: "👨‍👩‍👧",
        desc: "Regular updates and home activities.",
      },
    ],
    faqs: [
      { q: "What age is this for?", a: "Designed for children aged 6-16 years." },
      { q: "Can it help with school performance?", a: "Yes, confidence improves classroom participation." },
      { q: "How long is the program?", a: "Typically 6-8 months for complete transformation." },
    ],
  },
  "Vedic Maths": {
    hero: {
      tagline: "Ancient Wisdom, Modern Speed",
      gradient: "from-[#EB6664] via-[#D95553] to-[#C74442]",
      accent: "#EB6664",
      darkAccent: "#D95553",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🕉️",
    },
    trainingModes: ["Online One-on-One", "Group Batch"],
    duration: "3-6 Months",
    description: "Discover 16 ancient sutras that make complex calculations simple and lightning-fast.",
    stats: [
      { icon: Clock, label: "Speed Increase", value: "10x" },
      { icon: Target, label: "Accuracy", value: "98%" },
      { icon: Star, label: "Student Love", value: "4.9/5" },
    ],
    whatIs: {
      title: "What is Vedic Maths?",
      points: [
        "Ancient Indian mathematical system from Vedas",
        "16 sutras that simplify all calculations",
        "Mental math techniques for complex problems",
        "Builds intuitive number sense",
      ],
    },
    benefits: [
      { icon: "⚡", title: "Lightning Speed", desc: "Calculate 10x faster" },
      { icon: "🧠", title: "Mental Agility", desc: "Sharpen your mind" },
      { icon: "🎯", title: "Exam Excellence", desc: "Ace competitive exams" },
      { icon: "😊", title: "Math Love", desc: "Fall in love with numbers" },
    ],
    approach: [
      {
        title: "Sutra by Sutra",
        icon: "📜",
        desc: "Master each formula through practical application.",
      },
      {
        title: "Speed Drills",
        icon: "⏱️",
        desc: "Regular timed practices to build speed.",
      },
      {
        title: "Pattern Recognition",
        icon: "🔍",
        desc: "Learn to see mathematical patterns instantly.",
      },
      {
        title: "Competition Prep",
        icon: "🏅",
        desc: "Prepare for Olympiads and competitive exams.",
      },
    ],
    faqs: [
      { q: "Is Vedic Maths different from school math?", a: "It complements and enhances school mathematics." },
      { q: "Will it confuse my child?", a: "No, it provides alternative, simpler methods." },
      { q: "How soon will results show?", a: "Speed improvements visible within 4 weeks." },
    ],
  },
  "English Grammar": {
    hero: {
      tagline: "Write Right, Speak Bright",
      gradient: "from-[#EB6664] via-[#D95553] to-[#C74442]",
      accent: "#EB6664",
      darkAccent: "#D95553",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "📝",
    },
    trainingModes: ["Online One-on-One", "Group Batch"],
    duration: "3-6 Months",
    description: "Master English grammar through engaging lessons and practical application.",
    stats: [
      { icon: BookOpen, label: "Grade Improvement", value: "2 Levels" },
      { icon: Users, label: "Success Rate", value: "94%" },
      { icon: Star, label: "Rating", value: "4.8/5" },
    ],
    whatIs: {
      title: "What is English Grammar Training?",
      points: [
        "Complete mastery of English language rules",
        "Build strong writing and speaking foundation",
        "Excel in school and competitive exams",
        "Communicate with confidence and clarity",
      ],
    },
    benefits: [
      { icon: "✍️", title: "Perfect Writing", desc: "Write error-free essays and papers" },
      { icon: "💬", title: "Fluent Speech", desc: "Speak English naturally" },
      { icon: "📚", title: "Better Grades", desc: "Excel in English exams" },
      { icon: "🎯", title: "Career Ready", desc: "Prepare for professional success" },
    ],
    approach: [
      {
        title: "Concept-Based Learning",
        icon: "💡",
        desc: "Understand the 'why' behind every rule.",
      },
      {
        title: "Practical Application",
        icon: "✍️",
        desc: "Apply grammar in real writing and speaking.",
      },
      {
        title: "Error Analysis",
        icon: "🔍",
        desc: "Learn from mistakes systematically.",
      },
      {
        title: "Creative Writing",
        icon: "🎨",
        desc: "Express yourself through stories and essays.",
      },
    ],
    faqs: [
      { q: "Is this for non-native speakers?", a: "Perfect for ESL learners of all levels." },
      { q: "How does it help with school?", a: "Directly improves essay and test scores." },
      { q: "Can it help with IELTS?", a: "Yes, comprehensive exam preparation included." },
    ],
  },
};

const ALL_ITEMS = Object.keys(COURSES);

export default function ShortTermCourseDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get initial selected course from URL params
  const initialItem = searchParams.get("item");
  const [selected, setSelected] = useState(() => {
    // Validate if the item from URL exists in COURSES
    if (initialItem && COURSES[initialItem]) {
      return initialItem;
    }
    return "Abacus";
  });
  
  const course = COURSES[selected];
  const [isVisible, setIsVisible] = useState({});

  // Update URL when selected changes
  useEffect(() => {
    const label = searchParams.get("label") || "Short Term Courses";
    const type = searchParams.get("type") || "course";
    
    // Update URL params
    setSearchParams({ 
      label: label, 
      type: type, 
      item: selected 
    });
  }, [selected, setSearchParams]);

  // Sync selected state with URL changes (for browser back/forward)
  useEffect(() => {
    const itemFromUrl = searchParams.get("item");
    if (itemFromUrl && COURSES[itemFromUrl] && itemFromUrl !== selected) {
      setSelected(itemFromUrl);
    }
  }, [searchParams]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [selected]); // Re-run when selected changes to ensure sections are observed

  const switchCourse = (courseName) => {
    if (courseName === selected) return;
    
    setSelected(courseName);
    // Reset visibility for smooth transition
    setIsVisible({});
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle navigation from other components
  const handleCallNow = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleEmailNow = () => {
    window.location.href = "mailto:info@esperly.com?subject=Enquiry about " + selected;
  };

  const handleBookDemo = () => {
    navigate("/contact", { state: { course: selected, demoRequest: true } });
  };

  const handleExploreOther = () => {
    navigate("/courses");
  };

  if (!course) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

       {/* Hero Section */}
<div className={`relative overflow-hidden bg-gradient-to-br ${course.hero.gradient}`}>
  
  {/* Background Blur Effects */}
  <div className="absolute inset-0 opacity-30 pointer-events-none">
    <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-white rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-white rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/2 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-2xl" />
  </div>

  {/* Container */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
    
    <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">

      {/* LEFT CONTENT */}
      <div className="text-white text-center md:text-left">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-5 sm:mb-6">
          <Sparkles size={14} />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            Short Term Course
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          {selected}
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-xl mb-5 sm:mb-6 text-white/90">
          {course.hero.tagline}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {course.trainingModes.map((mode, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 sm:px-4 sm:py-2"
            >
              <Users size={14} />
              <span className="text-xs sm:text-sm font-medium">{mode}</span>
            </div>
          ))}

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 sm:px-4 sm:py-2">
            <Clock size={14} />
            <span className="text-xs sm:text-sm font-medium">
              Duration: {course.duration}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT (CTA CARD) */}
      <div className="w-full max-w-md mx-auto md:ml-auto">
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 shadow-lg">
          
          <p className="text-white/90 text-sm mb-4 text-center md:text-left">
            Ready to begin?
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            
            <button
              onClick={handleCallNow}
              className="w-full bg-white text-[#EB6664] font-semibold py-2.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Call Now
            </button>

            <button
              onClick={handleEmailNow}
              className="w-full border border-white text-white font-semibold py-2.5 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Email
            </button>

          </div>
        </div>

      </div>
    </div>
  </div>
</div>

        <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
          
          {/* What Is Section */}
          <section id="whatis" className={`transform transition-all duration-700 ${isVisible.whatis ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.hero.gradient} flex items-center justify-center`}>
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{course.whatIs.title}</h2>
                <p className="text-gray-500">Everything you need to know</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {course.whatIs.points.map((point, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${course.hero.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section - Card Grid */}
          <section id="benefits" className={`transform transition-all duration-700 delay-100 ${isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${course.hero.lightBg} mb-4`}>
                <Award size={16} style={{ color: course.hero.accent }} />
                <span className="text-sm font-semibold uppercase" style={{ color: course.hero.accent }}>Why Choose Us</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Amazing Benefits for Your Child</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Watch your child transform with our expert-led program</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.benefits.map((benefit, idx) => (
                <div key={idx} className="group text-center p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.hero.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-500">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Approach */}
          <section id="approach" className={`transform transition-all duration-700 delay-200 ${isVisible.approach ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.hero.gradient} flex items-center justify-center`}>
                <Target size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Our Unique Approach</h2>
                <p className="text-gray-500">How we deliver excellence</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {course.approach.map((item, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.hero.gradient} flex items-center justify-center text-2xl`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-4 border-l-2" style={{ borderColor: course.hero.accent }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className={`transform transition-all duration-700 delay-300 ${isVisible.faqs ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500">Got questions? We've got answers</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {course.faqs.map((faq, idx) => (
                <div key={idx} className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer p-5">
                      <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                      <ChevronRight size={18} className="text-gray-400 group-open:rotate-90 transition-transform" style={{ color: course.hero.accent }} />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-gray-600 border-t border-gray-100 pt-4">{faq.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative overflow-hidden rounded-3xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${course.hero.gradient}`} />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative py-16 px-8 text-center text-white">
              <div className="text-6xl mb-4">{course.hero.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your {selected} Journey?
              </h2>
              <p className="text-white/90 mb-8 max-w-md mx-auto">
                Book a free demo class today and see the difference expert-led learning can make for your child.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={handleBookDemo}
                  className="bg-white text-[#EB6664] font-bold py-3 px-8 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Play size={18} />
                  Book Free Demo
                </button>
                <button 
                  onClick={handleExploreOther}
                  className="border-2 border-white/60 text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Explore Other Courses
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}