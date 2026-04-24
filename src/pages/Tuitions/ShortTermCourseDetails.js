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
      gradient: "from-[#EB6664] via-[#EB6664] to-[#EB6664]",
      accent: "#EB6664",
      darkAccent: "#EB6664",
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
          desc: "Our Abacus Training Course is designed to adapt to each child’s pace and ability. This individualized approach ensures dedicated attention to every learner, enabling steady progress with confidence while nurturing their complete potential.",
        },
        {
          title: "EXPERIENCED MENTORS",
          desc: "Our experienced abacus teachers bring strong expertise in early numeracy and child-focused learning methods. With personalized attention and continuous encouragement, they help each child build confidence, strengthen mental math skills, and progress at their own pace, while making complex calculations simple and engaging through structured techniques.",
        },
        {
          title: "PROGRESS TRACKING",
          desc: "We follow continuous progress tracking to monitor each child’s development in abacus learning, with regular assessments of speed, accuracy, and mental math skills to ensure steady and structured growth. Timely guidance and personalized support are provided to every learner, ensuring consistent improvement aligned with their individual progress.",
        },
        {
          title: "FRIENDLY ENVIRONMENT",
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
          desc: "Our Abacus Training Course is designed to adapt to each child’s pace and ability. This individualized approach ensures dedicated attention to every learner, enabling steady progress with confidence while nurturing their complete potential.",
        },
        {
          title: "EXPERIENCED MENTORS",
          desc: "Our experienced abacus teachers bring strong expertise in early numeracy and child-focused learning methods. With personalized attention and continuous encouragement, they help each child build confidence, strengthen mental math skills, and progress at their own pace, while making complex calculations simple and engaging through structured techniques.",
        },
        {
          title: "FRIENDLY ENVIRONMENT",
          desc: "Our online abacus classes create a friendly and engaging virtual learning environment where children feel comfortable and connected from anywhere. Through interactive sessions and supportive guidance, we ensure every student stays confident, focused, and actively involved in learning.",
        },
        {
          title: "PROGRESS TRACKING",
          desc: "We follow continuous progress tracking to monitor each child’s development in abacus learning, with regular assessments of speed, accuracy, and mental math skills to ensure steady and structured growth. Timely guidance and personalized support are provided to every learner, ensuring consistent improvement aligned with their individual progress.",
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
                <h2 className="text-3xl font-bold text-[#EB6664]">{course.whatIs.title}</h2>
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

          <section className="bg-[#fff] py-12 px-4 md:px-10">
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
                        "bg-[#ff7a78]",
                        "bg-[#ff6f6d]",
                        "bg-[#ff6462]",
                        "bg-[#f95f5d]",
                        "bg-[#EB6664]",
                        "bg-[#e05553]",
                        "bg-[#d64c4a]",
                        "bg-[#cc4341]",
                      ];

                      return (
                        <div
                          key={i}
                          className={`relative ${colors[i % colors.length]} text-white font-semibold px-5 py-3 rounded-md shadow-md`}
                          style={{
                            clipPath:
                              "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
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

                  {/* Video */}
                  <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg"
                      alt="video"
                      className="w-full h-64 md:h-72 object-cover"
                    />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
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

          <section className="bg-[#fff] py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">

              {/* Heading */}
              <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-[#EB6664]">
                {course.approach.title}
              </h2>

              {/* Desktop Tabs */}
              <div className="hidden md:block bg-white shadow-lg rounded-md overflow-hidden border">

                {/* Tabs */}
                <div className="flex border-b">
                  {course.approach.points.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`flex-1 px-4 py-3 text-sm font-semibold transition-all
                  ${activeTab === index
                          ? "bg-[#EB6664] text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {course.approach.points[activeTab].desc}
                  </p>
                </div>
              </div>

              {/* Mobile Accordion */}
              <div className="md:hidden bg-white shadow-lg rounded-md overflow-hidden border">

                {course.approach.points.map((item, index) => {
                  const isActive = activeTab === index;

                  return (
                    <div key={index} className="border-b last:border-none">

                      {/* Header */}
                      <button
                        onClick={() => setActiveTab(index)}
                        className={`w-full text-left px-4 py-3 font-semibold transition-all
                    ${isActive
                            ? "bg-[#EB6664] text-white"
                            : "bg-gray-100 text-gray-900"
                          }`}
                      >
                        {item.title}
                      </button>

                      {/* Content */}
                      <div
                        className={`transition-all duration-300 overflow-hidden
                    ${isActive ? "max-h-40 p-4" : "max-h-0"}
                  `}
                      >
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          <section className="bg-[#fff] py-14 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">

              {/* Heading */}
              <h2 className="text-center text-3xl md:text-4xl font-bold text-[#EB6664] mb-12">
                Hear from Happy Parents
              </h2>

              {/* Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {course.testimonials.map((item, i) => (
                  <div
                    key={i}
                    className={`${item.bg} rounded-2xl p-6 text-center shadow-md hover:scale-105 transition-transform duration-300`}
                  >
                    <h3 className="font-bold text-lg mb-3">{item.title}</h3>

                    <p className="text-sm text-gray-800 leading-relaxed mb-5">
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-3 justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="text-left">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-700">{item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
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