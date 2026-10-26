import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Phone, Mail, Check, ChevronDown, Sparkles, Heart, Pencil, GraduationCap,
  MousePointerClick, BookOpen, Volume2, Trophy, Brain, Users, BarChart3, Smile,
  Mic, Lightbulb, Star, MessageCircle, Calculator, Zap, Target,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavImage from "../../components/NavImage";
import abacus1 from "../../assets/abacus/1.png";
import abacus2 from "../../assets/abacus/2.png";
import abacus3 from "../../assets/abacus/3.png";
import abacus4 from "../../assets/abacus/4.png";

/* ================================================================== */
/*  HELPERS                                                            */
/* ================================================================== */
const u = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const av = (n) => `https://i.pravatar.cc/80?img=${n}`;

/* Placeholder photos — replace with your own assets */
const P = {
  shelf: u("1507842217343-583bb7270b66", 1800),
  kidBook: u("1503454537195-1dcabb73ffb9", 1000),
  kidLaptop: u("1588072432836-e10032774350", 900),
  blocks: u("1596464716127-f2a82984de30", 900),
  girls: u("1497633762265-9d179a990aa6", 1400),
  g1: u("1456735190827-d1262f71b8a3", 900),
  g2: u("1517842645767-c639042777db", 900),
  g3: u("1513542789411-b6a5d4f31634", 900),
  classroom: u("1509062522246-3755977927d7"),
  students: u("1522202176988-66273c2fd55f", 1400),
  stage: u("1504384308090-c894fdcc538d", 1470),
  books: u("1524995997946-a1c2e315a42f", 1470),
  kids: u("1503676260728-1c00da094a0b", 1470),
  smile: u("1516321318423-f06f85e504b3", 1400),
  desk: u("1454165804606-c3d57bc86b40", 1400),
};

const CONTACT = { phone: "+91 9876543210", email: "support@esperly.com" };
const MODES = ["Online Classes (One-on-One)", "Group Batch"];

/* ================================================================== */
/*  COURSES — every course feeds the same page design                  */
/* ================================================================== */
const COURSES = {
  Abacus: {
    ...CONTACT,
    heroImage: "https://i.pinimg.com/736x/82/e4/dd/82e4dd99794717f18052f971ff21de1a.jpg",
    tagline: "Mental Math Mastery",
    trainingModes: MODES,
    duration: "Depending on Level",
    ageGroup: "5 to 12 Years",
    topics: ["Addition", "Subtraction", "Multiplication", "Division", "Abacus Techniques", "Mental Math Development"],
    short: "Abacus",
    powerSub: "Building Lightning-Fast Mental Math",
    power: [
      "Builds Fast Mental Calculation Skills",
      "Improves Focus, Accuracy and Concentration",
      "Strengthens Number Sense and Memory",
      "Builds Confidence in Mathematics",
    ],
    powerImg: abacus1,
    whyB: "Abacus Training?",
    whyIntro:
      "Abacus learning is a powerful method that helps children build a strong foundation in mathematics and cognitive skills from an early age.",
    why: [
      "Brain development focus",
      "Hands-on learning method",
      "Fast mental calculation training",
      "Concept-based structured learning",
      "Strong focus on the basics of mathematics",
      "Improves concentration and memory",
      "Boosts speed and accuracy",
      "Confidence building program",
    ],
    whyImg1: abacus2,
    whyImg2: abacus3,
    approachTitle: "Our Unique Approach",
    approachIntro: "Personal attention, structured techniques, and regular assessments help every child progress at their own pace.",
    approachImg: abacus1,
    tabs: [
      { title: "Customised Program", icon: Brain, image: abacus1, desc: "Our Abacus Training Course is designed to adapt to each child's pace and ability. This individualized approach ensures dedicated attention to every learner, enabling steady progress with confidence while nurturing their complete potential." },
      { title: "Experienced Mentors", icon: Users, image: abacus2, desc: "Our experienced abacus teachers bring strong expertise in early numeracy and child-focused learning methods. With personalized attention and continuous encouragement, they help each child build confidence and progress at their own pace." },
      { title: "Progress Tracking", icon: BarChart3, image: abacus3, desc: "We follow continuous progress tracking to monitor each child's development, with regular assessments of speed, accuracy, and mental math skills to ensure steady and structured growth." },
      { title: "Friendly Environment", icon: Smile, image: abacus4, desc: "Our online abacus classes create a friendly and engaging virtual learning environment where children feel comfortable and connected from anywhere, staying confident, focused, and actively involved." },
    ],
    testimonialsTitle: "Building Confident Young Mathematicians",
    testimonialsSub: "Hear from parents whose children improved their calculation speed, focus, and confidence through our abacus journey.",
    testimonials: [
      { title: "Faster Calculations", text: "My daughter now solves sums in her head faster than I can on a calculator. Her confidence in maths has completely changed within a few months.", name: "Ananya Sharma", loc: "Hyderabad, India", img: av(47) },
      { title: "Better Focus", text: "The structured levels and daily practice sheets helped my son concentrate for longer. His school maths scores have improved noticeably.", name: "Priya Reddy", loc: "Bangalore, India", img: av(45) },
      { title: "Clear Progress", text: "Regular assessments and feedback let us see exactly how our child is improving in speed and accuracy after every level.", name: "Rahul Verma", loc: "Mumbai, India", img: av(12) },
    ],
    gallery: [
      "https://i.pinimg.com/1200x/fe/8b/79/fe8b79cd30fe0e65f91e98cac7458771.jpg",
      "https://i.pinimg.com/1200x/b3/22/e1/b322e16b709acc359a063a2e7552762b.jpg",
      abacus4,
    ],
    gallerySub: "Explore engaging abacus sessions, practice activities, and joyful moments as children build strong mental math skills.",
    faqTitleB: "About Abacus",
    faqSub: "Get quick answers to frequently asked questions about our abacus classes.",
    faqImg: "https://i.pinimg.com/1200x/fe/8b/79/fe8b79cd30fe0e65f91e98cac7458771.jpg",
    faqs: [
      { q: "How will my child stay engaged in an online abacus class?", a: "Classes are highly interactive with games, visuals, storytelling methods, and real-time teacher participation to keep children engaged. Activities are designed to make learning fun and reduce screen fatigue." },
      { q: "What kind of practice is given at home?", a: "Mental math exercises and short daily worksheets are shared to strengthen speed, accuracy, and visualization skills." },
      { q: "What if my child misses a class?", a: "Recorded support or a makeup session is usually provided so the child can catch up without missing any concept continuity." },
      { q: "Do children need any special materials?", a: "A physical abacus kit and basic stationery are provided or recommended for daily practice at home." },
      { q: "How do parents track each child's progress?", a: "Teachers monitor performance through live sessions, regular tests, and assignments, with detailed feedback shared with parents." },
      { q: "Can abacus learning help in school exams?", a: "Yes, it improves calculation speed, concentration, memory, and accuracy, which directly helps in school mathematics." },
    ],
    ctaPill: "Start Calculating With Confidence",
    ctaTitle: "Ready to Begin Your Abacus Journey?",
    ctaText: "Help your child build lightning-fast mental math skills through engaging abacus lessons.",
  },

  "Phonics Classes": {
    ...CONTACT,
    heroImage: P.shelf,
    tagline: "Build Strong Reading & Speaking Skills",
    trainingModes: MODES,
    duration: "3 to 6 Months (Based on Learning Level)",
    ageGroup: "4 to 8 Years",
    topics: ["Letter Recognition", "Phonics Sounds", "Sound Blending", "Sight Words", "Reading Fluency", "Pronunciation Practice", "Vocabulary Building", "Sentence Reading"],
    short: "Phonics",
    powerSub: "Helping Children Read With Confidence",
    power: [
      "Develops Strong Letter & Sound Recognition",
      "Improves Reading Fluency and Pronunciation",
      "Strengthens Spelling and Vocabulary Skills",
      "Builds Confidence in Reading and Communication",
    ],
    powerImg: P.kidBook,
    whyB: "Phonics Learning?",
    whyIntro:
      "Phonics gives children the tools they need to read independently, communicate clearly, and enjoy learning with confidence.",
    why: [
      "Improves reading fluency and word recognition",
      "Enhances pronunciation and speaking confidence",
      "Strengthens spelling and writing abilities",
      "Expands vocabulary and language understanding",
      "Develops listening and comprehension skills",
      "Encourages independent reading habits",
      "Builds confidence in classroom participation",
      "Creates a strong foundation for future learning",
    ],
    whyImg1: P.kidLaptop,
    whyImg2: P.blocks,
    approachTitle: "Interactive Learning",
    approachIntro: "Through stories, word games, activities, and engaging exercises, children learn phonics in a fun and memorable way.",
    approachImg: P.girls,
    tabs: [
      { title: "Interactive Activities", icon: MousePointerClick, desc: "Hands-on games and sound-matching activities keep children curious while they practise letters, sounds, and blending." },
      { title: "Story-Based Learning", icon: BookOpen, desc: "Short, colourful stories introduce new sounds and words in context, so children remember what they read." },
      { title: "Speaking & Reading Practice", icon: Volume2, desc: "Guided read-aloud sessions build clear pronunciation, fluency, and the confidence to speak up." },
      { title: "Progress & Encouragement", icon: Trophy, heading: "Strong Reading Foundation", desc: "We focus on building essential phonics skills that help children recognize sounds, blend words, and read fluently, creating a solid foundation for lifelong learning." },
    ],
    testimonialsTitle: "Building Confident Young Readers",
    testimonialsSub: "Hear from parents whose children improved their reading abilities, language skills, and confidence through our phonics learning journey.",
    testimonials: [
      { title: "Improved Reading Confidence", text: "My son struggled with reading simple words before joining the phonics program. Within a few weeks, he started recognizing sounds confidently and now enjoys reading storybooks on his own.", name: "Ananya Sharma", loc: "Hyderabad, India", img: av(47) },
      { title: "Fun & Engaging Classes", text: "The interactive activities and storytelling sessions kept my daughter excited for every class. She learned phonics naturally, which made a huge difference in her learning.", name: "Priya Reddy", loc: "Bangalore, India", img: av(45) },
      { title: "Noticeable Progress", text: "We could clearly see improvements in our child's pronunciation, spelling, and reading skills. The structured approach and regular feedback helped us track every milestone.", name: "Rahul Verma", loc: "Mumbai, India", img: av(12) },
    ],
    gallery: [P.g1, P.g2, P.g3],
    gallerySub: "Explore engaging phonics activities, interactive learning sessions, and joyful moments as children build strong reading and communication skills.",
    faqTitleB: "About Phonics",
    faqSub: "Get quick answers to frequently asked questions about our phonics classes.",
    faqImg: P.classroom,
    faqs: [
      { q: "At what age can children start learning phonics?", a: "Children can begin phonics from around 4 years of age, once they show interest in letters, sounds, and stories." },
      { q: "How long does it take to see progress in reading?", a: "Most children show clear improvement in sound recognition and blending within the first 4 to 6 weeks of regular classes." },
      { q: "Are phonics classes suitable for beginners?", a: "Yes. Every batch starts from letter sounds, so complete beginners can join and learn at their own pace." },
      { q: "Can phonics help with dyslexia?", a: "Systematic phonics is widely used to support learners who find reading difficult. Talk to our team about your child's needs." },
    ],
    ctaPill: "Start Reading With Confidence",
    ctaTitle: "Ready to Begin Your Phonics Journey?",
    ctaText: "Help your child build strong reading and communication skills through engaging phonics lessons.",
  },

  "Public Speaking": {
    ...CONTACT,
    heroImage: P.stage,
    tagline: "Own the Stage",
    trainingModes: MODES,
    duration: "Depending on Level",
    ageGroup: "5 to 12 Years",
    topics: ["Voice Modulation", "Body Language", "Speech Structure", "Storytelling", "Stage Confidence", "Debate Basics", "Impromptu Speaking", "Vocabulary & Expression"],
    short: "Public Speaking",
    powerSub: "Helping Children Speak With Confidence",
    power: [
      "Builds Confidence On Stage and Off It",
      "Improves Voice Modulation and Body Language",
      "Teaches How to Structure a Speech",
      "Overcomes Stage Fright and Anxiety",
    ],
    powerImg: P.stage,
    whyB: "Public Speaking Training?",
    whyIntro:
      "Public speaking turns nervous speakers into confident communicators who can share ideas clearly and inspire their audience.",
    why: [
      "Speak clearly and with confidence",
      "Learn voice modulation and body language",
      "Structure compelling speeches and presentations",
      "Overcome stage fright and anxiety",
      "Think and respond quickly on the spot",
      "Build strong vocabulary and expression",
      "Develop leadership and stage presence",
      "Prepare for debates, contests and school events",
    ],
    whyImg1: P.students,
    whyImg2: P.smile,
    approachTitle: "Learning By Speaking",
    approachIntro: "Children practise real speaking situations in a supportive setting, with feedback after every session.",
    approachImg: P.stage,
    tabs: [
      { title: "Speaking Exercises", icon: Mic, desc: "Short daily speaking drills build clear delivery, steady pace, and comfortable eye contact." },
      { title: "Storytelling Practice", icon: BookOpen, desc: "Children learn to open strongly, build a message, and close with impact through story-led speeches." },
      { title: "Stage Presence Coaching", icon: Users, desc: "Posture, gestures, and voice control are coached step by step so children feel natural in front of an audience." },
      { title: "Feedback & Encouragement", icon: Trophy, heading: "Strong Speaking Foundation", desc: "Every session ends with kind, specific feedback so children know what to keep doing and what to improve next." },
    ],
    testimonialsTitle: "Building Confident Young Speakers",
    testimonialsSub: "Hear from parents whose children found their voice and stage confidence through our public speaking program.",
    testimonials: [
      { title: "No More Stage Fear", text: "My daughter used to freeze when asked to speak in class. After a few weeks she volunteered to present at the school assembly.", name: "Meera Iyer", loc: "Hyderabad, India", img: av(44) },
      { title: "Clear and Confident", text: "His voice, posture, and way of explaining things have improved a lot. Teachers at school have noticed the change too.", name: "Karthik Nair", loc: "Chennai, India", img: av(13) },
      { title: "Fun Sessions", text: "The speaking games and contests keep my son motivated. He now looks forward to every class.", name: "Sneha Patel", loc: "Mumbai, India", img: av(49) },
    ],
    gallery: [P.stage, P.students, P.smile],
    gallerySub: "Explore speaking practice, stage activities, and proud moments as children build strong communication skills.",
    faqTitleB: "About Public Speaking",
    faqSub: "Get quick answers to frequently asked questions about our public speaking classes.",
    faqImg: P.students,
    faqs: [
      { q: "Can shy kids learn public speaking?", a: "Absolutely! Our program is designed to support shy and introverted children at their own pace." },
      { q: "How soon will I see improvement?", a: "Most students show confidence gains within 4 weeks of regular classes." },
      { q: "Are there competitions?", a: "Yes, we organize regular speaking contests so children can practise in a real setting." },
      { q: "Will my child need to prepare at home?", a: "Short practice tasks are shared after each class so children can rehearse and build the habit." },
    ],
    ctaPill: "Start Speaking With Confidence",
    ctaTitle: "Ready to Begin Your Public Speaking Journey?",
    ctaText: "Help your child find their voice through engaging, supportive public speaking lessons.",
  },

  "Personality Development": {
    ...CONTACT,
    heroImage: P.stage,
    tagline: "Shine From Within",
    trainingModes: MODES,
    duration: "6 to 8 Months",
    ageGroup: "6 to 16 Years",
    topics: ["Emotional Intelligence", "Leadership", "Teamwork", "Communication Skills", "Positive Mindset", "Etiquette", "Confidence Building", "Social Skills"],
    short: "Personality Development",
    powerSub: "Helping Children Grow With Confidence",
    power: [
      "Builds Emotional Intelligence and Empathy",
      "Develops Leadership and Teamwork",
      "Creates a Positive Self-Image and Mindset",
      "Improves Social and Communication Skills",
    ],
    powerImg: P.smile,
    whyB: "Personality Development?",
    whyIntro:
      "A holistic program that builds character, confidence, and social skills that children carry into school and life.",
    why: [
      "Grows character and soft skills together",
      "Builds emotional intelligence and empathy",
      "Develops leadership and teamwork abilities",
      "Creates a positive self-image and mindset",
      "Improves communication and social skills",
      "Teaches good manners and etiquette",
      "Boosts classroom participation",
      "Prepares children for lifelong success",
    ],
    whyImg1: P.students,
    whyImg2: P.kids,
    approachTitle: "Growing Through Activity",
    approachIntro: "Role plays, group tasks, and guided reflection help children practise the skills they are learning.",
    approachImg: P.smile,
    tabs: [
      { title: "Group Activities", icon: Users, desc: "Team challenges teach cooperation, listening, and sharing responsibility." },
      { title: "Role Play & Stories", icon: BookOpen, desc: "Children act out everyday situations to understand feelings and choose kind, confident responses." },
      { title: "Confidence Coaching", icon: Lightbulb, desc: "Small speaking and decision-making tasks help children trust their own voice and ideas." },
      { title: "Progress & Encouragement", icon: Trophy, heading: "Strong Personal Foundation", desc: "Regular feedback and gentle goal-setting help children see their own growth and keep going." },
    ],
    testimonialsTitle: "Building Confident Young Personalities",
    testimonialsSub: "Hear from parents whose children grew in confidence, kindness, and leadership through our program.",
    testimonials: [
      { title: "Happier and More Confident", text: "Our son is more open, makes friends easily, and speaks up in class. We can see the change at home too.", name: "Lakshmi Rao", loc: "Hyderabad, India", img: av(48) },
      { title: "Better Social Skills", text: "The group activities helped my daughter learn teamwork and patience. She is far more comfortable around new people.", name: "Arjun Menon", loc: "Kochi, India", img: av(15) },
      { title: "Visible Growth", text: "The mentors gave useful feedback after each module, which made it easy for us to support her progress.", name: "Divya Singh", loc: "Delhi, India", img: av(43) },
    ],
    gallery: [P.smile, P.students, P.kids],
    gallerySub: "Explore group activities, role plays, and joyful moments as children grow in confidence and character.",
    faqTitleB: "About Personality Development",
    faqSub: "Get quick answers to frequently asked questions about our personality development program.",
    faqImg: P.smile,
    faqs: [
      { q: "What age is this for?", a: "Designed for children aged 6 to 16 years, with activities adjusted to each age group." },
      { q: "Can it help with school performance?", a: "Yes, confidence improves classroom participation and willingness to ask questions." },
      { q: "How long is the program?", a: "Typically 6 to 8 months for a complete journey." },
      { q: "Is it suitable for shy children?", a: "Yes. Activities start small and build up gradually so every child feels comfortable." },
    ],
    ctaPill: "Start Growing With Confidence",
    ctaTitle: "Ready to Begin Your Personality Journey?",
    ctaText: "Help your child build character, confidence, and social skills through engaging lessons.",
  },

  "Vedic Maths": {
    ...CONTACT,
    heroImage: P.kids,
    tagline: "Ancient Wisdom, Modern Speed",
    trainingModes: MODES,
    duration: "Depending on Level",
    ageGroup: "5 to 12 Years",
    topics: ["16 Vedic Sutras", "Fast Multiplication", "Quick Addition & Subtraction", "Squares & Cubes", "Division Shortcuts", "Mental Calculation", "Number Patterns", "Problem Solving"],
    short: "Vedic Maths",
    powerSub: "Making Calculations Simple and Fast",
    power: [
      "Simplifies Complex Calculations",
      "Builds Intuitive Number Sense",
      "Improves Speed and Accuracy",
      "Builds Confidence in Mathematics",
    ],
    powerImg: P.desk,
    whyB: "Vedic Maths?",
    whyIntro:
      "Vedic Maths uses 16 ancient sutras to turn long calculations into quick mental steps, so children enjoy numbers more.",
    why: [
      "Ancient Indian system from the Vedas",
      "16 sutras that simplify calculations",
      "Mental math techniques for complex problems",
      "Builds intuitive number sense",
      "Improves speed and accuracy",
      "Complements school mathematics",
      "Strengthens memory and concentration",
      "Reduces fear of maths",
    ],
    whyImg1: P.kidLaptop,
    whyImg2: P.desk,
    approachTitle: "Learning By Doing",
    approachIntro: "Each sutra is taught with examples, shortcuts, and practice so children understand why it works.",
    approachImg: P.kids,
    tabs: [
      { title: "Sutra-Based Lessons", icon: Calculator, desc: "Each lesson introduces one sutra with clear examples and quick practice problems." },
      { title: "Speed Practice", icon: Zap, desc: "Timed drills and games build quick recall and mental calculation habits." },
      { title: "Problem Solving", icon: Target, desc: "Children apply shortcuts to school-style questions to see how they save time." },
      { title: "Progress & Encouragement", icon: Trophy, heading: "Strong Maths Foundation", desc: "Regular tests and feedback show children how much faster and more accurate they are becoming." },
    ],
    testimonialsTitle: "Building Confident Young Mathematicians",
    testimonialsSub: "Hear from parents whose children gained speed and confidence in maths through Vedic Maths.",
    testimonials: [
      { title: "Maths Is Fun Now", text: "My son used to avoid multiplication tables. Now he races me with the shortcuts he has learnt.", name: "Suresh Kumar", loc: "Hyderabad, India", img: av(11) },
      { title: "Faster in Exams", text: "She finishes her maths papers earlier and double-checks her answers with a different method.", name: "Pooja Desai", loc: "Pune, India", img: av(41) },
      { title: "Clear Methods", text: "The teacher explains the logic behind each trick, so my child understands it and does not just memorise.", name: "Imran Khan", loc: "Bangalore, India", img: av(14) },
    ],
    gallery: [P.kids, P.desk, P.kidLaptop],
    gallerySub: "Explore Vedic Maths sessions, speed drills, and joyful moments as children discover faster ways to calculate.",
    faqTitleB: "About Vedic Maths",
    faqSub: "Get quick answers to frequently asked questions about our Vedic Maths classes.",
    faqImg: P.kids,
    faqs: [
      { q: "Is Vedic Maths different from school math?", a: "It complements and enhances school mathematics with alternative, simpler methods." },
      { q: "Will it confuse my child?", a: "No. Children learn the school method first and use shortcuts as an additional tool." },
      { q: "How soon will results show?", a: "Speed improvements are usually visible within 4 weeks." },
      { q: "Do children need prior knowledge?", a: "Basic addition and subtraction are enough to begin." },
    ],
    ctaPill: "Start Calculating Faster",
    ctaTitle: "Ready to Begin Your Vedic Maths Journey?",
    ctaText: "Help your child enjoy maths with simple, fast techniques from ancient wisdom.",
  },

  "English Grammar": {
    ...CONTACT,
    heroImage: P.books,
    tagline: "Write Right, Speak Bright",
    trainingModes: MODES,
    duration: "Depending on Level",
    ageGroup: "5 to 12 Years",
    topics: ["Parts of Speech", "Tenses", "Sentence Structure", "Punctuation", "Vocabulary", "Essay Writing", "Comprehension", "Spoken English"],
    short: "English Grammar",
    powerSub: "Helping Children Write and Speak With Confidence",
    power: [
      "Builds Strong Writing and Speaking Foundations",
      "Improves Sentence Structure and Punctuation",
      "Strengthens Vocabulary and Comprehension",
      "Builds Confidence in Communication",
    ],
    powerImg: P.books,
    whyB: "English Grammar Training?",
    whyIntro:
      "Strong grammar helps children write clearly, speak accurately, and do better in school and competitive exams.",
    why: [
      "Complete mastery of English language rules",
      "Builds a strong writing foundation",
      "Improves spoken English accuracy",
      "Helps in school and competitive exams",
      "Strengthens essay and letter writing",
      "Expands vocabulary and comprehension",
      "Supports ESL learners of all levels",
      "Communicate with confidence and clarity",
    ],
    whyImg1: P.kidLaptop,
    whyImg2: P.blocks,
    approachTitle: "Learning With Practice",
    approachIntro: "Short lessons, examples, and writing tasks make grammar rules easy to understand and remember.",
    approachImg: P.books,
    tabs: [
      { title: "Concept Lessons", icon: BookOpen, desc: "Each rule is explained with simple examples before children try it themselves." },
      { title: "Writing Practice", icon: Pencil, desc: "Guided sentence, paragraph, and essay tasks turn rules into everyday writing habits." },
      { title: "Speaking Practice", icon: MessageCircle, desc: "Children use new grammar in conversation so accuracy carries over into speech." },
      { title: "Progress & Encouragement", icon: Star, heading: "Strong Language Foundation", desc: "Regular tests and clear feedback help children see which areas to revise and celebrate what they've mastered." },
    ],
    testimonialsTitle: "Building Confident Young Writers",
    testimonialsSub: "Hear from parents whose children improved their writing, speaking, and exam scores through our grammar classes.",
    testimonials: [
      { title: "Better Writing", text: "Her essays are now well structured and almost free of grammar mistakes. Her English teacher has noticed.", name: "Nisha Gupta", loc: "Hyderabad, India", img: av(46) },
      { title: "Clear Explanations", text: "Grammar finally makes sense to my son. The examples and practice tasks are easy to follow.", name: "Vikram Joshi", loc: "Pune, India", img: av(17) },
      { title: "Good Exam Results", text: "We saw real improvement in her school English marks within a couple of months.", name: "Farah Ali", loc: "Bangalore, India", img: av(42) },
    ],
    gallery: [P.books, P.g1, P.g3],
    gallerySub: "Explore grammar lessons, writing practice, and joyful moments as children build strong English skills.",
    faqTitleB: "About English Grammar",
    faqSub: "Get quick answers to frequently asked questions about our English grammar classes.",
    faqImg: P.classroom,
    faqs: [
      { q: "Is this for non-native speakers?", a: "Yes, it works well for ESL learners of all levels." },
      { q: "How does it help with school?", a: "It directly improves essay writing, comprehension, and test scores." },
      { q: "Can it help with IELTS?", a: "Yes, comprehensive exam preparation is included for older learners." },
      { q: "How is progress tracked?", a: "Through regular tests, writing assignments, and feedback shared with parents." },
    ],
    ctaPill: "Start Writing With Confidence",
    ctaTitle: "Ready to Begin Your English Grammar Journey?",
    ctaText: "Help your child build strong writing and speaking skills through engaging grammar lessons.",
  },
};

/* ================================================================== */
/*  STYLE TOKENS                                                       */
/* ================================================================== */
const PASTEL = {
  green: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]", dot: "bg-[#66BB6A]" },
  blue: { bg: "bg-[#e3f2fd]", text: "text-[#1E88E5]", dot: "bg-[#1E88E5]" },
  pink: { bg: "bg-[#fce4ec]", text: "text-[#9C27B0]", dot: "bg-[#9C27B0]" },
  yellow: { bg: "bg-[#fff8e1]", text: "text-[#FFA726]", dot: "bg-[#FFA726]" },
};
const POWER_BG = ["bg-[#e8f5e9]", "bg-[#e3f2fd]", "bg-[#fce4ec]", "bg-[#fff8e1]"];
const FAQ_STYLES = [
  { bg: "bg-[#fce4ec]", ic: "text-[#EB6664]" },
  { bg: "bg-[#e3f2fd]", ic: "text-[#1E88E5]" },
  { bg: "bg-[#e8f5e9]", ic: "text-[#2e7d32]" },
  { bg: "bg-[#fff8e1]", ic: "text-[#FFA726]" },
];
const TITLE_COLORS = ["text-[#1E88E5]", "text-[#1E88E5]", "text-gray-900"];

const Pill = ({ children }) => (
  <span className="inline-block rounded-md bg-[#EB6664]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#EB6664] sm:text-xs">
    {children}
  </span>
);

/* ================================================================== */
/*  COURSE PAGE (single design used by every course)                   */
/* ================================================================== */
function CourseDetail({ name, c, onCall, onEmail, onDemo, onExplore }) {
  const [tab, setTab] = useState(c.tabs.length - 1);
  const [openFaq, setOpenFaq] = useState(0);
  const active = c.tabs[tab];

  const meta = [
    { label: "Training Modes", value: c.trainingModes.join(" / "), c: PASTEL.green, strong: true },
    { label: "Duration", value: c.duration, c: PASTEL.blue },
    { label: "Age Group", value: c.ageGroup, c: PASTEL.pink },
    { label: "Topics Covered", value: c.topics.join(" · "), c: PASTEL.yellow, strong: true },
  ];

  return (
    <div className="min-h-screen bg-[#fdf5f1] text-gray-900">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        <img src={c.heroImage} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-10 sm:pt-16">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#EB6664]">Short Term Course</p>
          <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-[#EB6664] sm:text-5xl md:text-6xl">
            {name}
          </h1>
          <p className="mt-3 text-base text-white sm:text-lg">{c.tagline}</p>

          <div className="mt-8 flex max-w-xl flex-col gap-3 rounded-3xl bg-white/25 p-3 backdrop-blur-sm sm:gap-4">
            {meta.map((m) => (
              <div key={m.label} className={`rounded-2xl px-5 py-3.5 shadow-sm ${m.c.bg}`}>
                <p className={`flex items-center gap-2 text-sm font-semibold ${m.c.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${m.c.dot}`} />
                  {m.label}
                </p>
                <p className={`mt-1 text-sm leading-snug ${m.strong ? "font-medium text-gray-800" : m.c.text}`}>{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onCall} className="inline-flex items-center gap-2 rounded-xl bg-[#EB6664] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d94d4b]">
              <Phone size={16} /> Call Now
            </button>
            <button onClick={onEmail} className="inline-flex items-center gap-2 rounded-xl bg-[#fce4ec] px-6 py-3 text-sm font-semibold text-[#EB6664] shadow-lg transition hover:bg-white">
              <Mail size={16} /> EMAIL Now
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 md:space-y-24 md:py-20">
        {/* ======================= THE POWER OF … ======================= */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl md:text-4xl">The Power of {c.short}</h2>
            <p className="mt-3 text-sm text-gray-700 md:text-base">{c.powerSub}</p>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {c.power.map((p, i) => (
                <div key={p} className={`flex items-center gap-4 rounded-xl px-5 py-6 shadow-sm ${POWER_BG[i % 4]}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#2e7d32]">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </span>
                  <p className="text-sm font-semibold text-gray-900 sm:text-[15px]">{p}</p>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img src={c.powerImg} alt={name} className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px]" />
            </div>
          </div>
        </section>

        {/* ======================= WHY CHOOSE ======================= */}
        <section>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
              Why Choose <span className="text-[#EB6664]">{c.whyB}</span>
            </h2>
            <p className="mt-4 text-sm font-medium text-gray-800 md:text-base">{c.whyIntro}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-3">
              {c.why.map((w, i) => (
                <div key={w} className={`flex items-center gap-4 rounded-full px-6 py-4 sm:pr-16 ${i % 2 === 0 ? "bg-[#fce4ec]" : "bg-[#e8f5e9]"}`}>
                  <Check size={16} className="shrink-0 text-gray-900" strokeWidth={2.5} />
                  <p className="text-sm font-medium text-gray-900">{w}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-start lg:justify-end">
                <button onClick={onDemo} className="rounded-xl bg-[#EB6664] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#d94d4b]">
                  Get Started Today
                </button>
              </div>
              <img src={c.whyImg1} alt="" className="h-48 w-full rounded-2xl object-cover shadow-md sm:h-56 lg:ml-4 lg:w-[88%]" />
              <img src={c.whyImg2} alt="" className="h-48 w-full rounded-2xl object-cover shadow-md sm:h-56 lg:ml-auto lg:w-[88%]" />
            </div>
          </div>
        </section>

        {/* ======================= TEACHING APPROACH ======================= */}
        <section>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Pill>Our Teaching Approach</Pill>
            <h2 className="mt-4 text-2xl font-extrabold uppercase tracking-tight sm:text-3xl md:text-4xl">{c.approachTitle}</h2>
            <p className="mt-4 text-sm text-gray-800 md:text-base">{c.approachIntro}</p>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <img
              src={active.image || c.approachImg}
              alt={active.title}
              className="h-[260px] w-full rounded-2xl object-cover shadow-lg sm:h-[360px] lg:h-[450px]"
            />
            <div className="space-y-3">
              {c.tabs.map((a, i) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.title}
                    onClick={() => setTab(i)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-5 py-4 text-left text-sm font-medium transition ${
                      tab === i ? "border-[#EB6664] bg-white text-[#EB6664]" : "border-gray-400 bg-white text-gray-900 hover:border-[#EB6664]"
                    }`}
                  >
                    <Icon size={16} /> {a.title}
                  </button>
                );
              })}
              <div className="mt-4 rounded-lg bg-[#fce4ec] p-5">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase text-[#EB6664]">
                  <Sparkles size={14} /> {active.heading || active.title}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-gray-800 sm:text-[13px]">{active.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= TESTIMONIALS ======================= */}
        <section>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Pill>Voice of Happy Parents</Pill>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl md:text-4xl">{c.testimonialsTitle}</h2>
            <p className="mt-3 text-xs text-gray-700 sm:text-sm">{c.testimonialsSub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {c.testimonials.map((t, i) => (
              <div key={t.name} className="flex flex-col justify-between rounded-2xl bg-[#fbd9d8] p-6 shadow-sm">
                <div>
                  <h3 className={`text-center text-lg font-bold ${TITLE_COLORS[i % 3]}`}>{t.title}</h3>
                  <p className="mx-auto mt-6 max-w-xs text-xs leading-relaxed text-gray-800">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="mx-auto mt-8 flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-700">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================= GALLERY ======================= */}
        <section>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Pill>Experience Gallery</Pill>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl md:text-4xl">
              Moments of <span className="text-[#EB6664]">Learning &amp; Growth</span>
            </h2>
            <p className="mt-3 text-xs text-gray-700 sm:text-sm">{c.gallerySub}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.gallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-3xl shadow-md">
                <img src={src} alt={`Gallery ${i + 1}`} className="h-60 w-full object-cover transition duration-500 hover:scale-105 sm:h-72 lg:h-80" />
              </div>
            ))}
          </div>
        </section>

        {/* ======================= FAQ ======================= */}
        <section>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Pill>Need More Information</Pill>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl md:text-4xl">
              Common Questions <span className="text-[#EB6664]">{c.faqTitleB}</span>
            </h2>
            <p className="mt-3 text-xs text-gray-700 sm:text-sm">{c.faqSub}</p>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <img src={c.faqImg} alt="" className="h-64 w-full rounded-2xl object-cover shadow-lg sm:h-80 lg:h-[420px]" />
            <div className="space-y-4">
              {c.faqs.map((f, i) => {
                const open = openFaq === i;
                const s = FAQ_STYLES[i % 4];
                return (
                  <div key={i} className={`overflow-hidden rounded-2xl ${s.bg}`}>
                    <button onClick={() => setOpenFaq(open ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                      <span className="text-sm font-semibold text-gray-900 sm:text-[15px]">{f.q}</span>
                      <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${s.ic} ${open ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed text-gray-700">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================= CTA ======================= */}
        <section className="relative overflow-hidden rounded-2xl border-2 border-[#EB6664] bg-white/60 px-5 py-12 text-center sm:px-10 sm:py-14">
          <Pencil size={14} className="absolute left-[8%] top-[22%] hidden -rotate-45 text-[#EB6664]/60 sm:block" />
          <Heart size={14} className="absolute right-[6%] top-[20%] hidden fill-[#EB6664]/60 text-[#EB6664]/60 sm:block" />
          <GraduationCap size={14} className="absolute bottom-[18%] left-[28%] hidden text-[#EB6664]/60 sm:block" />
          <Sparkles size={14} className="absolute bottom-[14%] right-[8%] hidden text-[#EB6664]/60 sm:block" />

          <span className="inline-block rounded-md bg-[#EB6664]/10 px-4 py-1.5 text-xs font-semibold text-[#EB6664]">{c.ctaPill}</span>
          <h2 className="mx-auto mt-5 inline-block border-b-2 border-[#EB6664] pb-2 text-xl font-bold sm:text-2xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gray-800">{c.ctaText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={onExplore} className="rounded-full bg-[#EB6664] px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#d94d4b]">
              View All Courses
            </button>
            <button onClick={onDemo} className="rounded-full border border-[#EB6664] bg-white px-8 py-3 text-sm font-bold text-[#EB6664] transition hover:bg-[#EB6664]/10">
              Schedule a Free Trial
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */
export default function ShortTermCourseDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialItem = searchParams.get("item");
  const [selected, setSelected] = useState(() =>
    initialItem && COURSES[initialItem] ? initialItem : "Abacus"
  );

  // Keep the URL in sync with the selected course
  useEffect(() => {
    const label = searchParams.get("label") || "Short Term Courses";
    const type = searchParams.get("type") || "course";
    setSearchParams({ label, type, item: selected });
  }, [selected, setSearchParams]);

  // Sync state when the URL changes (browser back/forward, header links)
  useEffect(() => {
    const itemFromUrl = searchParams.get("item");
    if (itemFromUrl && COURSES[itemFromUrl] && itemFromUrl !== selected) {
      setSelected(itemFromUrl);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const course = COURSES[selected];
  if (!course) return null;

  const handleCallNow = () => {
    window.location.href = `tel:${course.phone.replace(/\s/g, "")}`;
  };
  const handleEmailNow = () => {
    window.location.href = `mailto:${course.email}?subject=Enquiry about ${selected}`;
  };
  const handleBookDemo = () => {
    navigate("/contact", { state: { course: selected, demoRequest: true } });
  };
  const handleExploreOther = () => navigate("/courses");

  return (
    <>
      <Header />
      <NavImage />
      <CourseDetail
        key={selected}
        name={selected}
        c={course}
        onCall={handleCallNow}
        onEmail={handleEmailNow}
        onDemo={handleBookDemo}
        onExplore={handleExploreOther}
      />
      <Footer />
    </>
  );
}