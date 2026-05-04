import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ChevronRight, Phone, Mail, Play, CheckCircle,
  Award, Clock, Users, BookOpen, Sparkles,
  Star, ArrowRight, Shield, Target, Heart, Brain,
  ChevronDown,
  BarChart3,
  Smile, X, ChevronLeft
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";
import video from "../../assets/esperlyIntro.mp4"
import SchoolBack from "../../views/schollback";
import { AnimatePresence, motion } from "framer-motion";
import abacus1 from "../../assets/abacus/1.png";
import abacus2 from "../../assets/abacus/2.png";
import abacus3 from "../../assets/abacus/3.png";
import abacus4 from "../../assets/abacus/4.png";

const COURSES = {
  Abacus: {
    hero: {
      tagline: "Mental Math Mastery",
      gradient: "from-[#EB6664] via-[#EB6664] to-[#EB6664]",
      accent: "#EB6664",
      darkAccent: "#EB6664",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🧮",
      image: "https://i.pinimg.com/736x/82/e4/dd/82e4dd99794717f18052f971ff21de1a.jpg",
    },
    trainingModes: ['Online Classes (One-on-One)', 'Group Batch'],
    duration: 'Depending on Level',
    ageGroup: '5 to 12 Years',
    topics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Abacus Techniques', 'Mental Math Development'],
    phone: '+91 9876543210',
    email: 'support@esperly.com',
    description: "Transform your child's mathematical ability with ancient abacus techniques that build lightning-fast mental calculation skills.",
    stats: [
      { icon: Brain, label: "Brain Development", value: "2x Faster" },
      { icon: Target, label: "Accuracy", value: "99%" },
      { icon: Star, label: "Student Rating", value: "4.9/5" },
    ],
    whatIs: {
      title: "What is an Abacus?",
      points: [
        "Traditional manual tool used for calculations",
        "Made of a frame with rods/wires and movable beads",
        "Beads represent different place values",
        "Calculations are done by moving beads",
        "Supports addition, subtraction, multiplication, and division",
        "Develops mental arithmetic and numerical understanding",
        "Improves focus, accuracy, and concentration",
        "Still widely used in basic math education today"
      ],
    },
    benefits: {
      title: "Benefits of Abacus Training",
      subtitle: "Abacus learning is a powerful method that helps children build a strong foundation in mathematics and cognitive skills from an early age.",
      benefits: [
        { title: "Brain Development Focus" },
        { title: "Hands-on Learning Method" },
        { title: "Fast Mental Calculation Training" },
        { title: "Concept-Based Structured Learning" },
        { title: "Strong Focus on the Basics of Mathematics" },
        { title: "Improves Concentration & Memory" },
        { title: "Boosts Speed & Accuracy" },
        { title: "Confidence Building Program" },
      ],
    },
    approach: {
      title: "Our Unique Approach at ESPERLY",
      points: [
        {
          title: "CUSTOMISED PROGRAM",
          icon: Brain,
          image:
            abacus1,
          // Child using abacus — individualized learning, hands-on practice
          desc: "Our Abacus Training Course is designed to adapt to each child's pace and ability. This individualized approach ensures dedicated attention to every learner, enabling steady progress with confidence while nurturing their complete potential.",
        },
        {
          title: "EXPERIENCED MENTORS",
          icon: Users,
          image:
            abacus2,
          // Teacher guiding a young student one-on-one
          desc: "Our experienced abacus teachers bring strong expertise in early numeracy and child-focused learning methods. With personalized attention and continuous encouragement, they help each child build confidence, strengthen mental math skills, and progress at their own pace, while making complex calculations simple and engaging through structured techniques.",
        },
        {
          title: "PROGRESS TRACKING",
          icon: BarChart3,
          image:
            abacus3,
          // Classroom assessment / student writing / structured learning environment
          desc: "We follow continuous progress tracking to monitor each child's development in abacus learning, with regular assessments of speed, accuracy, and mental math skills to ensure steady and structured growth. Timely guidance and personalized support are provided to every learner, ensuring consistent improvement aligned with their individual progress.",
        },
        {
          title: "FRIENDLY ENVIRONMENT",
          icon: Smile,
          image:
            abacus4,
          // Happy kids learning together online / smiling child at laptop
          desc: "Our online abacus classes create a friendly and engaging virtual learning environment where children feel comfortable and connected from anywhere. Through interactive sessions and supportive guidance, we ensure every student stays confident, focused, and actively involved in learning.",
        },
      ],
    },
    testimonials: [
      {
        title: "Very Organised",
        desc: "I got to know about HomeShiksha from a parent and I thought of giving a try for my kid's tuition. It's very organised and they gave 3 teachers for demo and I chose the best amongst the three. The team is approachable and provide updates on time.",
        name: "Geetha Sridhara",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/40?img=1",
        bg: "bg-[#e9a6ad]",
      },
      {
        title: "Very Good Personal Tutor",
        desc: "Really very happy with this institution as I could get a very good personal tutor for my daughter. We could see a difference within a month in our daughter's learning curve.",
        name: "KanchyKanz",
        location: "Mumbai, India",
        image: "https://i.pravatar.cc/40?img=2",
        bg: "bg-[#c9c9e8]",
      },
      {
        title: "Friendly Staff",
        desc: "Very good institute and friendly staff. We recently hired a shadow teacher and she has very good knowledge and idea about what she need to work on based on the child needs.",
        name: "Sowjanya Balireddy",
        location: "Hyderabad, India",
        image: "https://i.pravatar.cc/40?img=3",
        bg: "bg-[#b7c7e8]",
      },
    ],
    faqs: [
      {
        q: "How will my child stay engaged in an online abacus class?",
        a: "Classes are highly interactive with games, visuals, storytelling methods, and real-time teacher participation to keep children engaged and attentive throughout the session. Activities are designed to make learning fun and reduce screen fatigue.",
      },
      {
        q: "What kind of practice is given at home?",
        a: "Mental math exercises and short daily worksheets are shared to strengthen speed, accuracy, and visualization skills. Regular practice helps children build confidence and improve calculation ability step by step.",
      },
      {
        q: "What if my child misses a class?",
        a: "Recorded support or a makeup session is usually provided so the child can catch up easily without missing any learning progress or concept continuity.",
      },
      {
        q: "Do children need any special materials for learning the abacus online?",
        a: "Yes, a physical abacus kit and basic stationery are provided or recommended for daily practice at home to support hands-on learning along with online sessions.",
      },
      {
        q: "How do parents track each child’s progress online?",
        a: "Teachers monitor performance through live sessions, regular tests, assignments, and periodic assessments, along with detailed feedback shared with parents for clear progress tracking.",
      },
      {
        q: "Can abacus learning help in school exams?",
        a: "Yes, it improves calculation speed, concentration, memory, and accuracy, which directly helps children perform better in school mathematics exams and competitive learning tasks.",
      },
    ],
    gallery: [
      "https://i.pinimg.com/1200x/fe/8b/79/fe8b79cd30fe0e65f91e98cac7458771.jpg",
      "https://i.pinimg.com/1200x/b3/22/e1/b322e16b709acc359a063a2e7552762b.jpg",
      "https://i.pinimg.com/1200x/fe/8b/79/fe8b79cd30fe0e65f91e98cac7458771.jpg",
      "https://i.pinimg.com/1200x/fe/8b/79/fe8b79cd30fe0e65f91e98cac7458771.jpg",
      "https://i.pinimg.com/1200x/b3/22/e1/b322e16b709acc359a063a2e7552762b.jpg",
      "https://i.pinimg.com/1200x/fe/8b/79/fe8b79cd30fe0e65f91e98cac7458771.jpg",
    ],
  },
  "Phonics Classes": {
    hero: {
      tagline: "Read Like a Pro",
      gradient: "from-[#EB6664] via-[#EB6664] to-[#EB6664]",
      accent: "#EB6664",
      darkAccent: "#EB6664",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🔤",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
    },
    trainingModes: ['Online Classes (One-on-One)', 'Group Batch'],
    duration: 'Depending on Level',
    ageGroup: '5 to 12 Years',
    topics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Abacus Techniques', 'Mental Math Development'],
    phone: '+91 9876543210',
    email: 'support@esperly.com',
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
    benefits: {
      title: "Benefits of Phonics Training",
      subtitle: "Phonics learning is a powerful method that helps children build a strong foundation in reading and literacy skills from an early age.",
      benefits: [
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
      ],
    },
    approach: {
      title: "Our Unique Approach at ESPERLY",
      points: [
        {
          title: "CUSTOMISED PROGRAM",
          icon: Brain,
          image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
          desc: "Our Abacus Training Course is designed to adapt to each child’s pace and ability. This individualized approach ensures dedicated attention to every learner, enabling steady progress with confidence while nurturing their complete potential.",
        },
        {
          title: "EXPERIENCED MENTORS",
          icon: Users,
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
          desc: "Our experienced abacus teachers bring strong expertise in early numeracy and child-focused learning methods. With personalized attention and continuous encouragement, they help each child build confidence, strengthen mental math skills, and progress at their own pace, while making complex calculations simple and engaging through structured techniques.",
        },
        {
          title: "PROGRESS TRACKING",
          icon: BarChart3,
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
          desc: "We follow continuous progress tracking to monitor each child’s development in abacus learning, with regular assessments of speed, accuracy, and mental math skills to ensure steady and structured growth. Timely guidance and personalized support are provided to every learner, ensuring consistent improvement aligned with their individual progress.",
        },
        {
          title: "FRIENDLY ENVIRONMENT",
          icon: Smile,
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
          desc: "Our online abacus classes create a friendly and engaging virtual learning environment where children feel comfortable and connected from anywhere. Through interactive sessions and supportive guidance, we ensure every student stays confident, focused, and actively involved in learning.",
        },
      ],
    },
    testimonials: [
      {
        title: "Very Organised",
        desc: "I got to know about HomeShiksha from a parent and I thought of giving a try for my kid's tuition. It's very organised and they gave 3 teachers for demo and I chose the best amongst the three. The team is approachable and provide updates on time.",
        name: "Geetha Sridhara",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/40?img=1",
        bg: "bg-[#e9a6ad]",
      },
      {
        title: "Very Good Personal Tutor",
        desc: "Really very happy with this institution as I could get a very good personal tutor for my daughter. We could see a difference within a month in our daughter's learning curve.",
        name: "KanchyKanz",
        location: "Mumbai, India",
        image: "https://i.pravatar.cc/40?img=2",
        bg: "bg-[#c9c9e8]",
      },
      {
        title: "Friendly Staff",
        desc: "Very good institute and friendly staff. We recently hired a shadow teacher and she has very good knowledge and idea about what she need to work on based on the child needs.",
        name: "Sowjanya Balireddy",
        location: "Hyderabad, India",
        image: "https://i.pravatar.cc/40?img=3",
        bg: "bg-[#b7c7e8]",
      },
    ],
    faqs: [
      { q: "What age is best for phonics?", a: "Ages 3-7 is the ideal window for phonics instruction." },
      { q: "How is phonics different from whole language?", a: "Phonics teaches decoding skills vs memorizing whole words." },
      { q: "Can phonics help with dyslexia?", a: "Yes, systematic phonics is proven to help dyslexic learners." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80",
    ],
  },
  "Public Speaking": {
    hero: {
      tagline: "Own the Stage",
      gradient: "from-[#EB6664] via-[#EB6664] to-[#EB6664]",
      accent: "#EB6664",
      darkAccent: "#EB6664",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🎤",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80",
    },
    trainingModes: ['Online Classes (One-on-One)', 'Group Batch'],
    duration: 'Depending on Level',
    ageGroup: '5 to 12 Years',
    topics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Abacus Techniques', 'Mental Math Development'],
    phone: '+91 9876543210',
    email: 'support@esperly.com',
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
    benefits: {
      title: "Benefits of Phonics Training",
      subtitle: "Phonics learning is a powerful method that helps children build a strong foundation in reading and literacy skills from an early age.",
      benefits: [
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
      ],
    },
    approach: {
      title: "Our Unique Approach at ESPERLY",
      points: [
        {
          title: "Personalized Learning Path",
          desc: "Every child gets a customized learning plan based on their current skill level and learning pace.",
        },
        {
          title: "Expert Mentors",
          desc: "Certified abacus trainers with years of experience in child development.",
        },
        {
          title: "Gamified Progress",
          desc: "Fun challenges and rewards keep children motivated throughout the journey.",
        },
        {
          title: "Real-time Analytics",
          desc: "Track your child's speed, accuracy, and improvement with detailed reports.",
        },
      ],
    },
    testimonials: [
      {
        title: "Very Organised",
        desc: "I got to know about HomeShiksha from a parent and I thought of giving a try for my kid's tuition. It's very organised and they gave 3 teachers for demo and I chose the best amongst the three. The team is approachable and provide updates on time.",
        name: "Geetha Sridhara",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/40?img=1",
        bg: "bg-[#e9a6ad]",
      },
      {
        title: "Very Good Personal Tutor",
        desc: "Really very happy with this institution as I could get a very good personal tutor for my daughter. We could see a difference within a month in our daughter's learning curve.",
        name: "KanchyKanz",
        location: "Mumbai, India",
        image: "https://i.pravatar.cc/40?img=2",
        bg: "bg-[#c9c9e8]",
      },
      {
        title: "Friendly Staff",
        desc: "Very good institute and friendly staff. We recently hired a shadow teacher and she has very good knowledge and idea about what she need to work on based on the child needs.",
        name: "Sowjanya Balireddy",
        location: "Hyderabad, India",
        image: "https://i.pravatar.cc/40?img=3",
        bg: "bg-[#b7c7e8]",
      },
    ],
    faqs: [
      { q: "Can shy kids learn public speaking?", a: "Absolutely! Our program is designed for introverts." },
      { q: "How soon will I see improvement?", a: "Most students show confidence gains within 4 weeks." },
      { q: "Are there competitions?", a: "Yes, we organize regular speaking contests." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80",
    ],
  },
  "Personality Development": {
    hero: {
      tagline: "Shine From Within",
      gradient: "from-[#EB6664] via-[#EB6664] to-[#EB6664]",
      accent: "#EB6664",
      darkAccent: "#EB6664",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🌟",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80",
    },
    trainingModes: ['Online Classes (One-on-One)', 'Group Batch'],
    duration: 'Depending on Level',
    ageGroup: '5 to 12 Years',
    topics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Abacus Techniques', 'Mental Math Development'],
    phone: '+91 9876543210',
    email: 'support@esperly.com',
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
    benefits: {
      title: "Benefits of Phonics Training",
      subtitle: "Phonics learning is a powerful method that helps children build a strong foundation in reading and literacy skills from an early age.",
      benefits: [
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
      ],
    },
    approach: {
      title: "Our Unique Approach at ESPERLY",
      points: [
        {
          title: "Personalized Learning Path",
          desc: "Every child gets a customized learning plan based on their current skill level and learning pace.",
        },
        {
          title: "Expert Mentors",
          desc: "Certified abacus trainers with years of experience in child development.",
        },
        {
          title: "Gamified Progress",
          desc: "Fun challenges and rewards keep children motivated throughout the journey.",
        },
        {
          title: "Real-time Analytics",
          desc: "Track your child's speed, accuracy, and improvement with detailed reports.",
        },
      ],
    },
    testimonials: [
      {
        title: "Very Organised",
        desc: "I got to know about HomeShiksha from a parent and I thought of giving a try for my kid's tuition. It's very organised and they gave 3 teachers for demo and I chose the best amongst the three. The team is approachable and provide updates on time.",
        name: "Geetha Sridhara",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/40?img=1",
        bg: "bg-[#e9a6ad]",
      },
      {
        title: "Very Good Personal Tutor",
        desc: "Really very happy with this institution as I could get a very good personal tutor for my daughter. We could see a difference within a month in our daughter's learning curve.",
        name: "KanchyKanz",
        location: "Mumbai, India",
        image: "https://i.pravatar.cc/40?img=2",
        bg: "bg-[#c9c9e8]",
      },
      {
        title: "Friendly Staff",
        desc: "Very good institute and friendly staff. We recently hired a shadow teacher and she has very good knowledge and idea about what she need to work on based on the child needs.",
        name: "Sowjanya Balireddy",
        location: "Hyderabad, India",
        image: "https://i.pravatar.cc/40?img=3",
        bg: "bg-[#b7c7e8]",
      },
    ],
    faqs: [
      { q: "What age is this for?", a: "Designed for children aged 6-16 years." },
      { q: "Can it help with school performance?", a: "Yes, confidence improves classroom participation." },
      { q: "How long is the program?", a: "Typically 6-8 months for complete transformation." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80",
    ],
  },
  "Vedic Maths": {
    hero: {
      tagline: "Ancient Wisdom, Modern Speed",
      gradient: "from-[#EB6664] via-[#EB6664] to-[#EB6664]",
      accent: "#EB6664",
      darkAccent: "#EB6664",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "🕉️",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80",
    },
    trainingModes: ['Online Classes (One-on-One)', 'Group Batch'],
    duration: 'Depending on Level',
    ageGroup: '5 to 12 Years',
    topics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Abacus Techniques', 'Mental Math Development'],
    phone: '+91 9876543210',
    email: 'support@esperly.com',
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
    benefits: {
      title: "Benefits of Phonics Training",
      subtitle: "Phonics learning is a powerful method that helps children build a strong foundation in reading and literacy skills from an early age.",
      benefits: [
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
      ],
    },
    approach: {
      title: "Our Unique Approach at ESPERLY",
      points: [
        {
          title: "Personalized Learning Path",
          desc: "Every child gets a customized learning plan based on their current skill level and learning pace.",
        },
        {
          title: "Expert Mentors",
          desc: "Certified abacus trainers with years of experience in child development.",
        },
        {
          title: "Gamified Progress",
          desc: "Fun challenges and rewards keep children motivated throughout the journey.",
        },
        {
          title: "Real-time Analytics",
          desc: "Track your child's speed, accuracy, and improvement with detailed reports.",
        },
      ],
    },
    testimonials: [
      {
        title: "Very Organised",
        desc: "I got to know about HomeShiksha from a parent and I thought of giving a try for my kid's tuition. It's very organised and they gave 3 teachers for demo and I chose the best amongst the three. The team is approachable and provide updates on time.",
        name: "Geetha Sridhara",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/40?img=1",
        bg: "bg-[#e9a6ad]",
      },
      {
        title: "Very Good Personal Tutor",
        desc: "Really very happy with this institution as I could get a very good personal tutor for my daughter. We could see a difference within a month in our daughter's learning curve.",
        name: "KanchyKanz",
        location: "Mumbai, India",
        image: "https://i.pravatar.cc/40?img=2",
        bg: "bg-[#c9c9e8]",
      },
      {
        title: "Friendly Staff",
        desc: "Very good institute and friendly staff. We recently hired a shadow teacher and she has very good knowledge and idea about what she need to work on based on the child needs.",
        name: "Sowjanya Balireddy",
        location: "Hyderabad, India",
        image: "https://i.pravatar.cc/40?img=3",
        bg: "bg-[#b7c7e8]",
      },
    ],
    faqs: [
      { q: "Is Vedic Maths different from school math?", a: "It complements and enhances school mathematics." },
      { q: "Will it confuse my child?", a: "No, it provides alternative, simpler methods." },
      { q: "How soon will results show?", a: "Speed improvements visible within 4 weeks." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80",
    ],
  },
  "English Grammar": {
    hero: {
      tagline: "Write Right, Speak Bright",
      gradient: "from-[#EB6664] via-[#EB6664] to-[#EB6664]",
      accent: "#EB6664",
      darkAccent: "#EB6664",
      lightBg: "bg-[#EB6664]/5",
      badge: "bg-[#EB6664]/10 text-[#EB6664]",
      icon: "📝",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
    },
    trainingModes: ['Online Classes (One-on-One)', 'Group Batch'],
    duration: 'Depending on Level',
    ageGroup: '5 to 12 Years',
    topics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Abacus Techniques', 'Mental Math Development'],
    phone: '+91 9876543210',
    email: 'support@esperly.com',
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
    benefits: {
      title: "Benefits of Phonics Training",
      subtitle: "Phonics learning is a powerful method that helps children build a strong foundation in reading and literacy skills from an early age.",
      benefits: [
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
        { title: "Brain Development Focus" },
        { title: "Lightning Fast" },
        { title: "Pinpoint Accuracy" },
        { title: "Boosted Confidence" },
      ],
    },
    approach: {
      title: "Our Unique Approach at ESPERLY",
      points: [
        {
          title: "Personalized Learning Path",
          desc: "Every child gets a customized learning plan based on their current skill level and learning pace.",
        },
        {
          title: "Expert Mentors",
          desc: "Certified abacus trainers with years of experience in child development.",
        },
        {
          title: "Gamified Progress",
          desc: "Fun challenges and rewards keep children motivated throughout the journey.",
        },
        {
          title: "Real-time Analytics",
          desc: "Track your child's speed, accuracy, and improvement with detailed reports.",
        },
      ],
    },
    testimonials: [
      {
        title: "Very Organised",
        desc: "I got to know about HomeShiksha from a parent and I thought of giving a try for my kid's tuition. It's very organised and they gave 3 teachers for demo and I chose the best amongst the three. The team is approachable and provide updates on time.",
        name: "Geetha Sridhara",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/40?img=1",
        bg: "bg-[#e9a6ad]",
      },
      {
        title: "Very Good Personal Tutor",
        desc: "Really very happy with this institution as I could get a very good personal tutor for my daughter. We could see a difference within a month in our daughter's learning curve.",
        name: "KanchyKanz",
        location: "Mumbai, India",
        image: "https://i.pravatar.cc/40?img=2",
        bg: "bg-[#c9c9e8]",
      },
      {
        title: "Friendly Staff",
        desc: "Very good institute and friendly staff. We recently hired a shadow teacher and she has very good knowledge and idea about what she need to work on based on the child needs.",
        name: "Sowjanya Balireddy",
        location: "Hyderabad, India",
        image: "https://i.pravatar.cc/40?img=3",
        bg: "bg-[#b7c7e8]",
      },
    ],
    faqs: [
      { q: "Is this for non-native speakers?", a: "Perfect for ESL learners of all levels." },
      { q: "How does it help with school?", a: "Directly improves essay and test scores." },
      { q: "Can it help with IELTS?", a: "Yes, comprehensive exam preparation included." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80",
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

  const [activeTab, setActiveTab] = useState(0);

  const [activeTabApproach, setActiveTabApproach] = useState(0);

  /* STATES */
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  /* SHOW ONLY 3 INITIALLY */
  const visibleImages = showAllGallery
    ? course.gallery
    : course.gallery.slice(0, 3);

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

  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId;
    let scrollAmount = 0;
    const speed = 0.5; // px per frame — adjust for faster/slower

    const scroll = () => {
      scrollAmount += speed;
      // When we've scrolled half the total width, reset to 0 (seamless loop)
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(scroll); };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, [course.testimonials]);

  if (!course) return null;

  return (
    <>
      <Header />
      <NavImage />
      <div className="min-h-screen bg-[transparent]">

        {/* Hero Section */}
        <div className="relative overflow-hidden min-h-[520px] sm:min-h-[600px]">

          {/* Background Image */}
          <img
            src={course.hero.image}
            alt={selected}
            className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          />

          {/* Overlays — lighter so image breathes */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Decorative accent line top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#EB6664] via-[#f0a08a] to-transparent" />

          {/* Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-end min-h-[520px] sm:min-h-[600px] pb-14 sm:pb-16 pt-16">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EB6664]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#EB6664]/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#EB6664]/20" />
              </div>
              <span className="text-[#EB6664] text-[10px] font-bold uppercase tracking-[0.3em]">
                Short Term Course
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[3.5rem] sm:text-[3rem] md:text-[4.5rem] font-black text-white uppercase leading-none tracking-tighter mb-2">
              {selected}
            </h1>

            {/* Tagline */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-[#EB6664]/60" />
              <p className="text-white/60 text-sm sm:text-base font-light tracking-wide italic">
                {course.hero.tagline}
              </p>
            </div>

            {/* Colorful Glassy Metadata Cards */}
            <div className="flex flex-wrap gap-3 mb-8">

              {/* Training Modes — Green pastel */}
              <div className="flex flex-col gap-1 px-5 py-3.5 rounded-2xl relative overflow-hidden
        border border-[#66BB6A]/40
        backdrop-blur-md
        shadow-lg shadow-[#66BB6A]/20">
                <div className="absolute inset-0 bg-[#e8f5e9]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#66BB6A]/20 via-[#66BB6A]/5 to-transparent" />
                <span className="relative text-[#2e7d32] text-[9px] font-bold uppercase tracking-[0.22em]">
                  Training Modes
                </span>
                <span className="relative text-[#1b5e20] text-sm font-bold leading-snug">
                  {course.trainingModes.join(' / ')}
                </span>
              </div>

              {/* Duration — Violet pastel */}
              <div className="flex flex-col gap-1 px-5 py-3.5 rounded-2xl relative overflow-hidden
        border border-[#9C27B0]/40
        backdrop-blur-md
        shadow-lg shadow-[#9C27B0]/20">
                <div className="absolute inset-0 bg-[#f3e5f5]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#9C27B0]/20 via-[#9C27B0]/5 to-transparent" />
                <span className="relative text-[#6a1b9a] text-[9px] font-bold uppercase tracking-[0.22em]">
                  Duration
                </span>
                <span className="relative text-[#4a148c] text-sm font-bold leading-snug">
                  {course.duration}
                </span>
              </div>

              {/* Age Group — Amber pastel */}
              <div className="flex flex-col gap-1 px-5 py-3.5 rounded-2xl relative overflow-hidden
        border border-[#FFA726]/40
        backdrop-blur-md
        shadow-lg shadow-[#FFA726]/20">
                <div className="absolute inset-0 bg-[#fff8e1]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFA726]/20 via-[#FFA726]/5 to-transparent" />
                <span className="relative text-[#e65100] text-[9px] font-bold uppercase tracking-[0.22em]">
                  Age Group
                </span>
                <span className="relative text-[#bf360c] text-sm font-bold leading-snug">
                  {course.ageGroup}
                </span>
              </div>

              {/* Topics — Blue pastel */}
              <div className="flex flex-col gap-1 px-5 py-3.5 rounded-2xl relative overflow-hidden
        border border-[#1E88E5]/40
        backdrop-blur-md
        shadow-lg shadow-[#1E88E5]/20">
                <div className="absolute inset-0 bg-[#e3f2fd]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E88E5]/20 via-[#1E88E5]/5 to-transparent" />
                <span className="relative text-[#1565c0] text-[9px] font-bold uppercase tracking-[0.22em]">
                  Topics Covered
                </span>
                <span className="relative text-[#0d47a1] text-sm font-bold leading-snug">
                  {course.topics.join(' · ')}
                </span>
              </div>

            </div>

            {/* Premium Pastel CTA Section */}
            <div className="w-full max-w-xl space-y-5">

              {/* Call Card — Coral Pastel */}
              <div
                className="group relative overflow-hidden rounded-3xl border border-[#EB6664]/30
    shadow-lg shadow-[#EB6664]/15 transition-all duration-300
    hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#EB6664]/20"
              >

                {/* Background Layers */}
                <div className="absolute inset-0 bg-[#fff1f0]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#EB6664]/15 via-[#EB6664]/5 to-transparent" />

                <div className="relative p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  {/* Left */}
                  <div className="flex items-center gap-4">

                    {/* Icon */}
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl
          bg-gradient-to-br from-[#EB6664] to-[#ff8d8b]
          shadow-lg shadow-[#EB6664]/20"
                    >
                      <Phone size={20} className="text-white" />
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#c85b59] font-bold mb-1">
                        Call Support
                      </p>

                      <a
                        href={`tel:${course.phone}`}
                        className="text-[#7a2e2c] text-base sm:text-lg font-bold hover:text-[#EB6664] transition-colors duration-200"
                      >
                        {course.phone}
                      </a>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={handleCallNow}
                    className="inline-flex items-center justify-center gap-2 rounded-full
        bg-[#EB6664] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em]
        text-white shadow-lg shadow-[#EB6664]/20 transition-all duration-300
        hover:scale-[1.03] hover:bg-[#d94d4b]"
                  >
                    <Phone size={14} />
                    Call Now
                  </button>
                </div>
              </div>

              {/* Email Card — Blue Pastel */}
              <div
                className="group relative overflow-hidden rounded-3xl border border-[#1E88E5]/30
    shadow-lg shadow-[#1E88E5]/15 transition-all duration-300
    hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1E88E5]/20"
              >

                {/* Background Layers */}
                <div className="absolute inset-0 bg-[#eef7ff]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E88E5]/15 via-[#1E88E5]/5 to-transparent" />

                <div className="relative p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  {/* Left */}
                  <div className="flex items-center gap-4">

                    {/* Icon */}
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl
          bg-gradient-to-br from-[#1E88E5] to-[#64B5F6]
          shadow-lg shadow-[#1E88E5]/20"
                    >
                      <Mail size={20} className="text-white" />
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#1565c0] font-bold mb-1">
                        Email Address
                      </p>

                      <a
                        href={`mailto:${course.email}`}
                        className="text-[#0d47a1] text-base sm:text-lg font-bold hover:text-[#1E88E5] transition-colors duration-200 break-all"
                      >
                        {course.email}
                      </a>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={handleEmailNow}
                    className="inline-flex items-center justify-center gap-2 rounded-full
        bg-[#1E88E5] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em]
        text-white shadow-lg shadow-[#1E88E5]/20 transition-all duration-300
        hover:scale-[1.03] hover:bg-[#1565c0]"
                  >
                    <Mail size={14} />
                    Email Now
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">

          {/* What Is Section */}
          <section
            id="whatis"
            className={`transform transition-all duration-700 ${isVisible.whatis
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
              }`}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">

              {/* Icon Box */}
              <div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${course.hero.gradient}
      flex items-center justify-center shadow-lg shadow-[#EB6664]/15`}
              >
                <BookOpen size={20} className="text-white" />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#EB6664] tracking-tight leading-tight">
                  {course.whatIs.title}
                </h2>

                <p className="text-gray-500 text-xs md:text-sm mt-0.5">
                  Everything you need to know
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">

              {course.whatIs.points.map((point, idx) => {

                const styles = [
                  {
                    border: "border-[#66BB6A]/25",
                    bg: "bg-[#e8f5e9]",
                    gradient: "from-[#66BB6A]/15 via-[#66BB6A]/5 to-transparent",
                    icon: "from-[#66BB6A] to-[#81C784]",
                    shadow: "shadow-[#66BB6A]/10",
                    title: "text-[#2e7d32]",
                  },
                  {
                    border: "border-[#1E88E5]/25",
                    bg: "bg-[#e3f2fd]",
                    gradient: "from-[#1E88E5]/15 via-[#1E88E5]/5 to-transparent",
                    icon: "from-[#1E88E5] to-[#64B5F6]",
                    shadow: "shadow-[#1E88E5]/10",
                    title: "text-[#1565c0]",
                  },
                  {
                    border: "border-[#FFA726]/25",
                    bg: "bg-[#fff8e1]",
                    gradient: "from-[#FFA726]/15 via-[#FFA726]/5 to-transparent",
                    icon: "from-[#FFA726] to-[#FFCC80]",
                    shadow: "shadow-[#FFA726]/10",
                    title: "text-[#ef6c00]",
                  },
                  {
                    border: "border-[#9C27B0]/25",
                    bg: "bg-[#f3e5f5]",
                    gradient: "from-[#9C27B0]/15 via-[#9C27B0]/5 to-transparent",
                    icon: "from-[#9C27B0] to-[#BA68C8]",
                    shadow: "shadow-[#9C27B0]/10",
                    title: "text-[#7b1fa2]",
                  },
                ];

                const style = styles[idx % styles.length];

                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden rounded-2xl border ${style.border}
          shadow-md ${style.shadow} transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-lg`}
                  >

                    {/* Background */}
                    <div className={`absolute inset-0 ${style.bg}`} />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`}
                    />

                    {/* Content */}
                    <div className="relative p-4 flex items-start gap-3">

                      {/* Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${style.icon}
              flex items-center justify-center flex-shrink-0
              shadow-sm ${style.shadow}
              transition-transform duration-300 group-hover:scale-105`}
                      >
                        <CheckCircle size={16} className="text-white" />
                      </div>

                      {/* Text */}
                      <div>
                        <p
                          className={`leading-relaxed text-sm md:text-[15px] font-semibold ${style.title}`}
                        >
                          {point}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </section>

          <section className="bg-[transparent] py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">

              {/* Heading */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#EB6664]">
                  {course.benefits.title}
                </h2>

                <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
                  {course.benefits.subtitle}
                </p>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE */}
                <div className="flex flex-col justify-center h-full">
                  <p className="text-gray-700 mb-6 text-sm md:text-base">
                    Other than Mental Math, it also improves academic performance with the
                    development of crucial life skills such as:
                  </p>

                  <div className="space-y-3">
                    {course.benefits.benefits.map((item, i) => {

                      const colors = [
                        {
                          bg: "bg-[#e8f5e9]",
                          border: "border-[#66BB6A]/30",
                          text: "text-[#2e7d32]",
                          shadow: "shadow-[#66BB6A]/15",
                        },
                        {
                          bg: "bg-[#e3f2fd]",
                          border: "border-[#1E88E5]/30",
                          text: "text-[#1565c0]",
                          shadow: "shadow-[#1E88E5]/15",
                        },
                        {
                          bg: "bg-[#fff8e1]",
                          border: "border-[#FFA726]/30",
                          text: "text-[#ef6c00]",
                          shadow: "shadow-[#FFA726]/15",
                        },
                        {
                          bg: "bg-[#f3e5f5]",
                          border: "border-[#9C27B0]/30",
                          text: "text-[#7b1fa2]",
                          shadow: "shadow-[#9C27B0]/15",
                        },
                        {
                          bg: "bg-[#ffebee]",
                          border: "border-[#EF5350]/30",
                          text: "text-[#c62828]",
                          shadow: "shadow-[#EF5350]/15",
                        },
                        {
                          bg: "bg-[#e0f7fa]",
                          border: "border-[#00ACC1]/30",
                          text: "text-[#00838f]",
                          shadow: "shadow-[#00ACC1]/15",
                        },
                        {
                          bg: "bg-[#f1f8e9]",
                          border: "border-[#7CB342]/30",
                          text: "text-[#558b2f]",
                          shadow: "shadow-[#7CB342]/15",
                        },
                        {
                          bg: "bg-[#fce4ec]",
                          border: "border-[#EC407A]/30",
                          text: "text-[#ad1457]",
                          shadow: "shadow-[#EC407A]/15",
                        },
                      ];

                      const style = colors[i % colors.length];

                      return (
                        <div
                          key={i}
                          className={`relative ${style.bg} ${style.border} border ${style.text}
        font-bold px-5 py-3 rounded-xl shadow-md ${style.shadow}
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                          style={{
                            clipPath:
                              "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)",
                          }}
                        >
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-center justify-center h-full">

                  <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg">

                    <video
                      className="w-full h-64 md:h-96 object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={video} />
                    </video>

                    {/* Play Icon Overlay (optional) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-0 h-0 border-l-[14px] border-l-[#EB6664] border-y-[10px] border-y-transparent ml-1"></div>
                      </div>
                    </div>

                  </div>

                  {/* CTA Button */}
                  <button className="mt-6 bg-[#EB6664] hover:bg-[#EB6664] text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition-all">
                    Book a Free Demo
                  </button>

                </div>
              </div>
            </div>
          </section>

          <section className="relative py-10 md:py-12 px-3 sm:px-4 md:px-6 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-52 md:w-72 h-52 md:h-72 bg-[#EB6664]/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-52 md:w-72 h-52 md:h-72 bg-orange-200/20 blur-3xl rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">

              {/* Heading */}
              <div className="text-center mb-7 md:mb-10">

                <span className="inline-block px-3 py-1 rounded-full bg-[#EB6664]/10 text-[#EB6664] text-[10px] sm:text-xs font-semibold mb-3 tracking-wide">
                  OUR LEARNING METHOD
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto">
                  {course.approach.title}
                </h2>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-[1fr_0.9fr] gap-5 xl:gap-7 items-start">

                {/* LEFT IMAGE */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTabApproach}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="sticky top-24"
                  >
                    <div className="relative overflow-hidden rounded-[26px] shadow-xl border border-gray-200 bg-white">

                      <img
                        src={
                          course.approach.points[activeTabApproach].image ||
                          "https://via.placeholder.com/700x500"
                        }
                        alt={course.approach.points[activeTabApproach].title}
                        className="w-full h-[480px] xl:h-[520px] object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* RIGHT ACCORDION */}
                <div className="space-y-3">

                  {course.approach.points.map((item, index) => {

                    const Icon = item.icon || Brain;
                    const isActive = activeTabApproach === index;

                    return (
                      <motion.div
                        key={index}
                        layout
                        className={`rounded-2xl border overflow-hidden transition-all duration-300
              ${isActive
                            ? "bg-[#EB6664] border-[#EB6664] shadow-lg shadow-[#EB6664]/15"
                            : "bg-white border-gray-200 hover:border-[#EB6664]/30"
                          }`}
                      >

                        {/* Header */}
                        <button
                          onClick={() => setActiveTabApproach(index)}
                          className="w-full px-4 xl:px-5 py-4 flex items-center justify-between gap-3 text-left"
                        >

                          <div className="flex items-center gap-3 min-w-0">

                            {/* Icon */}
                            <div
                              className={`w-11 h-11 xl:w-12 xl:h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-[#EB6664]/10 text-[#EB6664]"
                                }`}
                            >
                              <Icon size={20} />
                            </div>

                            {/* Text */}
                            <div className="min-w-0">

                              <h3
                                className={`font-bold text-sm xl:text-base leading-snug truncate
                      ${isActive
                                    ? "text-white"
                                    : "text-gray-900"
                                  }`}
                              >
                                {item.title}
                              </h3>

                              <p
                                className={`text-xs mt-1
                      ${isActive
                                    ? "text-white/80"
                                    : "text-gray-500"
                                  }`}
                              >
                                Tap to explore
                              </p>
                            </div>
                          </div>

                          {/* Arrow */}
                          <motion.div
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown
                              size={18}
                              className={
                                isActive
                                  ? "text-white"
                                  : "text-gray-500"
                              }
                            />
                          </motion.div>
                        </button>

                        {/* Content */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 xl:px-5 pb-4">

                                <div className="h-px bg-white/20 mb-3" />

                                <p className="text-sm leading-relaxed text-white">
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* MOBILE + TABLET */}
              <div className="lg:hidden">

                {/* Active Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTabApproach}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="overflow-hidden rounded-[24px] shadow-lg mb-4 border border-gray-200"
                  >
                    <img
                      src={
                        course.approach.points[activeTabApproach].image ||
                        "https://via.placeholder.com/700x500"
                      }
                      alt=""
                      className="w-full h-[220px] sm:h-[300px] object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Accordion */}
                <div className="space-y-3">

                  {course.approach.points.map((item, index) => {

                    const Icon = item.icon || Brain;
                    const isActive = activeTabApproach === index;

                    return (
                      <div
                        key={index}
                        className={`rounded-2xl overflow-hidden border transition-all duration-300
              ${isActive
                            ? "bg-[#EB6664] border-[#EB6664] shadow-lg shadow-[#EB6664]/15"
                            : "bg-white border-gray-200"
                          }`}
                      >

                        {/* Header */}
                        <button
                          onClick={() => setActiveTabApproach(index)}
                          className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left"
                        >

                          <div className="flex items-center gap-3 min-w-0">

                            {/* Icon */}
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-[#EB6664]/10 text-[#EB6664]"
                                }`}
                            >
                              <Icon size={18} />
                            </div>

                            {/* Title */}
                            <h3
                              className={`font-bold text-sm sm:text-[15px] leading-snug
                    ${isActive
                                  ? "text-white"
                                  : "text-gray-900"
                                }`}
                            >
                              {item.title}
                            </h3>
                          </div>

                          {/* Arrow */}
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 flex-shrink-0
                  ${isActive
                                ? "rotate-180 text-white"
                                : "text-gray-500"
                              }`}
                          />
                        </button>

                        {/* Content */}
                        <div
                          className={`transition-all duration-300 overflow-hidden
                ${isActive
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="px-4 pb-4">

                            <div className="h-px bg-white/20 mb-3" />

                            <p className="text-sm leading-relaxed text-white">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-transparent py-10 md:py-14 px-3 sm:px-4 md:px-6 overflow-hidden">

            <div className="max-w-7xl mx-auto">

              {/* Heading */}
              <div className="text-center mb-8 md:mb-12">

                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EB6664]/10 text-[#EB6664] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase mb-4">
                  Testimonials
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#EB6664] leading-tight">
                  Hear from Happy Parents
                </h2>

                <p className="text-gray-500 text-sm md:text-base mt-3 max-w-2xl mx-auto">
                  Real experiences shared by parents whose children transformed through our learning programs.
                </p>
              </div>

              {/* Slider Wrapper */}
              <div className="relative">

                {/* Left Fade */}
                <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

                {/* Right Fade */}
                <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track */}
                <div
                  ref={scrollRef}
                  className="flex gap-4 md:gap-6 overflow-x-hidden py-2"
                  style={{ scrollBehavior: "auto" }}
                >

                  {[...course.testimonials, ...course.testimonials].map((item, i) => {

                    const colors = [
                      {
                        bg: "bg-[#e8f5e9]",
                        border: "border-[#66BB6A]/25",
                        shadow: "shadow-[#66BB6A]/10",
                        title: "text-[#2e7d32]",
                      },
                      {
                        bg: "bg-[#e3f2fd]",
                        border: "border-[#1E88E5]/25",
                        shadow: "shadow-[#1E88E5]/10",
                        title: "text-[#1565c0]",
                      },
                      {
                        bg: "bg-[#fff8e1]",
                        border: "border-[#FFA726]/25",
                        shadow: "shadow-[#FFA726]/10",
                        title: "text-[#ef6c00]",
                      },
                      {
                        bg: "bg-[#f3e5f5]",
                        border: "border-[#9C27B0]/25",
                        shadow: "shadow-[#9C27B0]/10",
                        title: "text-[#7b1fa2]",
                      },
                    ];

                    const style = colors[i % colors.length];

                    return (
                      <div
                        key={i}
                        className={`
                ${style.bg}
                ${style.border}
                ${style.shadow}
                relative border rounded-[28px]
                p-5 md:p-6
                flex-shrink-0
                w-[280px]
                sm:w-[320px]
                md:w-[360px]
                min-h-[260px]
                md:min-h-[280px]
                flex flex-col justify-between
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
              `}
                      >

                        {/* Quote Icon */}
                        <div className="absolute top-5 right-5 text-5xl font-black text-black/5 leading-none">
                          "
                        </div>

                        {/* Top */}
                        <div>

                          <h3 className={`font-extrabold text-lg md:text-xl mb-3 ${style.title}`}>
                            {item.title}
                          </h3>

                          <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed line-clamp-6">
                            {item.desc}
                          </p>
                        </div>

                        {/* Bottom User */}
                        <div className="flex items-center gap-3 pt-5 mt-5 border-t border-black/5">

                          {/* Avatar */}
                          <div className="relative flex-shrink-0">

                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                            />

                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                          </div>

                          {/* User Info */}
                          <div className="min-w-0">

                            <p className="font-bold text-sm md:text-base text-gray-900 truncate">
                              {item.name}
                            </p>

                            <p className="text-xs md:text-sm text-gray-500 truncate">
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>


          {/* Gallery Section */}
          <section className="py-10 md:py-14 px-3 sm:px-4 md:px-6 bg-transparent overflow-hidden">

            <div className="max-w-7xl mx-auto">

              {/* Heading */}
              <div className="text-center mb-8 md:mb-10">

                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EB6664]/10 text-[#EB6664] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase mb-4">
                  Photo Gallery
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#EB6664] tracking-tight">
                  Gallery
                </h2>

                <p className="text-gray-500 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
                  Explore classrooms, activities, and engaging learning experiences from our programs.
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

                {visibleImages.map((image, index) => {

                  const colors = [
                    {
                      border: "border-[#66BB6A]/25",
                      shadow: "shadow-[#66BB6A]/10",
                      glow: "bg-[#66BB6A]/20",
                    },
                    {
                      border: "border-[#1E88E5]/25",
                      shadow: "shadow-[#1E88E5]/10",
                      glow: "bg-[#1E88E5]/20",
                    },
                    {
                      border: "border-[#FFA726]/25",
                      shadow: "shadow-[#FFA726]/10",
                      glow: "bg-[#FFA726]/20",
                    },
                    {
                      border: "border-[#9C27B0]/25",
                      shadow: "shadow-[#9C27B0]/10",
                      glow: "bg-[#9C27B0]/20",
                    },
                  ];

                  const style = colors[index % colors.length];

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`
              group relative overflow-hidden rounded-[28px]
              border ${style.border}
              shadow-xl ${style.shadow}
              cursor-pointer
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-2xl
            `}
                    >

                      {/* Glow */}
                      <div
                        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full
              blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500
              ${style.glow}`}
                      />

                      {/* Image */}
                      <div className="relative overflow-hidden">

                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-[240px] sm:h-[260px] md:h-[280px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                        {/* Number */}
                        {/* <div
                          className="absolute top-4 left-4 px-3 py-1 rounded-full
                bg-white/90 backdrop-blur-md text-[#EB6664]
                text-xs font-bold shadow-md"
                        >
                          0{index + 1}
                        </div>                         */}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View More */}
              {course.gallery.length > 3 && (
                <div className="flex justify-center mt-8">

                  <button
                    onClick={() => setShowAllGallery(!showAllGallery)}
                    className="group relative overflow-hidden rounded-full px-7 py-3.5
          bg-[#EB6664] text-white font-bold text-sm tracking-wide
          shadow-lg shadow-[#EB6664]/20
          transition-all duration-300 hover:scale-105"
                  >

                    <span className="relative z-10">
                      {showAllGallery ? "Show Less" : "View All Images"}
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#EB6664] to-[#ff8c8a] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </button>
                </div>
              )}
            </div>

            {/* GALLERY MODAL */}
            {selectedImage !== null && (
              <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">

                {/* Close */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
        flex items-center justify-center text-white transition-all z-50"
                >
                  <X size={22} />
                </button>

                {/* Prev */}
                <button
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === 0
                        ? visibleImages.length - 1
                        : selectedImage - 1
                    )
                  }
                  className="absolute left-3 md:left-6 w-11 h-11 md:w-14 md:h-14 rounded-full
        bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={28} />
                </button>

                {/* Image */}
                <div className="max-w-6xl w-full flex items-center justify-center">

                  <img
                    src={visibleImages[selectedImage]}
                    alt=""
                    className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                  />
                </div>

                {/* Next */}
                <button
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === visibleImages.length - 1
                        ? 0
                        : selectedImage + 1
                    )
                  }
                  className="absolute right-3 md:right-6 w-11 h-11 md:w-14 md:h-14 rounded-full
        bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                >
                  <ChevronRight size={28} />
                </button>

                {/* Count */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold">
                  {selectedImage + 1} / {visibleImages.length}
                </div>
              </div>
            )}
          </section>

          {/* FAQs */}
          <section id="faqs" className={`transform transition-all duration-700 delay-300 ${isVisible.faqs ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#EB6664] mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500">Got questions? We've got answers</p>
            </div>
            <div className="max-w-5xl mx-auto space-y-4">
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
            <div className={`absolute inset-0 bg-[#EB6664]`} />
            <div className="absolute inset-0 bg-black/0" />
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