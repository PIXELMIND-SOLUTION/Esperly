import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  FiMusic, FiGlobe, FiBook, FiPenTool, FiCode, FiBarChart2,
  FiArrowRight, FiMic, FiHeart, FiAward, FiUsers,
  FiTrendingUp, FiClock, FiStar, FiCamera, FiCoffee,
  FiMonitor, FiSpeaker, FiHeadphones, FiFilm
} from "react-icons/fi";

const tuitionCategories = [
  { 
    name: "Music Classes", 
    icon: FiMusic, 
    color: "from-red-600 to-red-700",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "24+ classes",
    level: "All Ages",
    description: "Learn instruments, vocals & music theory",
    bgElements: ["♪", "♫", "♩"]
  },
  { 
    name: "Language Learning", 
    icon: FiGlobe, 
    color: "from-red-500 to-red-700",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "32+ classes",
    level: "Beginner to Fluent",
    description: "Master new languages with experts",
    bgElements: ["A", "B", "C"]
  },
  { 
    name: "Academic Tuitions", 
    icon: FiBook, 
    color: "from-red-600 to-red-800",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "56+ classes",
    level: "K-12 & College",
    description: "Mathematics, Science, Literature & more",
    bgElements: ["∑", "√", "∞"]
  },
  { 
    name: "Art & Craft", 
    icon: FiPenTool, 
    color: "from-red-500 to-red-600",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "18+ classes",
    level: "All Levels",
    description: "Drawing, painting, pottery & crafts",
    bgElements: ["🎨", "✏️", "🖌️"]
  },
  { 
    name: "Coding for Kids", 
    icon: FiCode, 
    color: "from-red-600 to-red-700",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "15+ classes",
    level: "Ages 8-16",
    description: "Fun programming classes for young minds",
    bgElements: ["{ }", "</>", "[]"]
  },
  { 
    name: "Competitive Exams", 
    icon: FiBarChart2, 
    color: "from-red-500 to-red-700",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "42+ classes",
    level: "Advanced",
    description: "JEE, NEET, UPSC, Banking & more",
    bgElements: ["★", "✪", "⬤"]
  },
  { 
    name: "Dance Classes", 
    icon: FiHeart, 
    color: "from-red-500 to-red-600",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "12+ classes",
    level: "All Ages",
    description: "Classical, contemporary & western dance",
    bgElements: ["💃", "🕺", "✨"]
  },
  { 
    name: "Public Speaking", 
    icon: FiMic, 
    color: "from-red-600 to-red-700",
    pattern: "bg-gradient-to-br from-red-500/20 to-red-600/20",
    courses: "10+ classes",
    level: "All Levels",
    description: "Communication & presentation skills",
    bgElements: ["🗣️", "🎤", "📢"]
  },
];

const featuredCategories = [
  {
    title: "Interactive Learning",
    icon: FiMonitor,
    color: "from-red-500 to-red-600",
    description: "Engage with live sessions and collaborative projects",
    features: ["Live Classes", "Group Discussions", "Q&A Sessions"]
  },
  {
    title: "Expert Teachers",
    icon: FiUsers,
    color: "from-red-600 to-red-700",
    description: "Learn from certified industry professionals",
    features: ["10+ Years Avg Exp", "Verified Experts", "Personal Mentoring"]
  },
  {
    title: "Flexible Schedule",
    icon: FiClock,
    color: "from-red-500 to-red-600",
    description: "Learn at your own pace with flexible timing",
    features: ["24/7 Access", "Self-Paced", "Weekend Batches"]
  }
];

const stats = [
  { number: "500+", label: "Expert Teachers", icon: FiUsers, color: "from-red-500 to-red-600" },
  { number: "15K+", label: "Active Students", icon: FiAward, color: "from-red-600 to-red-700" },
  { number: "200+", label: "Daily Classes", icon: FiTrendingUp, color: "from-red-500 to-red-600" },
];

const ParallaxSection = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 150]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const WhatYouLookingFor = () => {
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-white via-red-50 to-white">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #A6192E 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-red-200/30"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 12}%`,
              top: `${5 + i * 15}%`,
              rotate: `${i * 45}deg`,
              borderRadius: i % 2 === 0 ? '0%' : '50%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          style={{ opacity: heroOpacity }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold mb-6 shadow-lg shadow-red-600/30">
              ✦ DISCOVER YOUR PATH ✦
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-800 via-red-600 to-red-800 bg-clip-text text-transparent">
                What would you like to learn?
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-red-700/80 max-w-2xl mx-auto leading-relaxed">
              Explore our extensive collection of expert-led classes designed to help you master new skills and achieve your goals.
            </p>
          </motion.div>
        </motion.div>

        {/* Categories Grid with Premium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-20">
          {tuitionCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <ParallaxSection key={index} speed={0.1 * (index % 4)}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer relative h-80 rounded-2xl overflow-hidden bg-white border-2 border-red-100 hover:border-red-300 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Pattern Background */}
                  <div className={`absolute inset-0 ${category.pattern} opacity-50`}>
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(45deg, #A6192E 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }} />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {category.bgElements.map((el, i) => (
                      <span key={i} className="text-2xl text-red-200/30 font-bold">
                        {el}
                      </span>
                    ))}
                  </div>

                  {/* Floating Circles */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-red-200/20 to-red-300/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-red-300/20 to-red-400/20"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, -90, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between bg-gradient-to-b from-transparent via-white/50 to-white/90 backdrop-blur-[1px]">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="flex gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-1">
                        {category.name}
                      </h3>
                      
                      <p className="text-sm text-red-700 mb-3 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs mb-4">
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                          {category.courses}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                          {category.level}
                        </span>
                      </div>
                      
                      <motion.div 
                        className="flex items-center gap-2 text-sm font-semibold text-red-600"
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        Explore Now
                        <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(166,25,46,0.1) 50%, transparent 70%)',
                    }}
                    animate={{
                      x: ['100%', '-100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                </motion.div>
              </ParallaxSection>
            );
          })}
        </div>

        {/* Featured Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {featuredCategories.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ParallaxSection key={index} speed={0.15 * (index + 1)}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="relative h-64 rounded-xl overflow-hidden group bg-white border-2 border-red-100 hover:border-red-300 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* Pattern Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`} />
                  
                  {/* Animated Background Lines */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-red-500 to-transparent" />
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500 to-transparent" />
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute top-4 right-4 opacity-10">
                    {[...Array(3)].map((_, i) => (
                      <Icon key={i} size={20} className="text-red-700 mb-1" />
                    ))}
                  </div>

                  <div className="absolute inset-0 p-5 flex flex-col">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-red-900 mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-red-700 mb-3">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-1.5">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-red-600">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${feature.color}`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ParallaxSection>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ParallaxSection key={index} speed={0.15 * (index + 1)}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative h-36 rounded-xl overflow-hidden group bg-white border-2 border-red-100 hover:border-red-300 shadow-lg"
                >
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-between p-5">
                    <div>
                      <h3 className="text-2xl font-bold text-red-900 mb-1">{stat.number}</h3>
                      <p className="text-sm text-red-700">{stat.label}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Progress Bar Animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-600"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              </ParallaxSection>
            );
          })}
        </div>

        {/* Premium CTA Banner */}
        <ParallaxSection speed={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-64 rounded-2xl overflow-hidden group bg-gradient-to-r from-red-600 to-red-700"
          >
            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }} />
            </div>

            {/* Floating Shapes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-white/10"
                style={{
                  width: `${30 + i * 20}px`,
                  height: `${30 + i * 20}px`,
                  left: `${10 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                  rotate: `${i * 30}deg`,
                  borderRadius: i % 2 === 0 ? '0%' : '50%',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Animated overlay */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            
            <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mb-4"
              >
                <FiStar size={30} className="text-white" />
              </motion.div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Ready to Start Your Journey?
              </h3>
              <p className="text-base sm:text-lg text-red-100 mb-6 max-w-2xl">
                Join thousands of learners and transform your future with expert-led classes
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-red-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  View Programs
                </motion.button>
              </div>
            </div>
          </motion.div>
        </ParallaxSection>

        {/* Bottom Decorative Element */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-200 to-red-300 flex items-center justify-center">
              <FiHeadphones className="text-red-700" size={20} />
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-300 to-red-400 flex items-center justify-center">
              <FiFilm className="text-red-800" size={20} />
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
              <FiCamera className="text-white" size={20} />
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <FiCoffee className="text-white" size={20} />
            </div>
          </motion.div>
          <p className="text-sm text-red-600 mt-4 tracking-wider">EXPLORE • LEARN • GROW</p>
        </div>
      </div>
    </section>
  );
};

export default WhatYouLookingFor;