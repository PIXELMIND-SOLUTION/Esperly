import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NavImage from '../../components/NavImage';
import { FaDownload } from 'react-icons/fa';

// ─── Data ────────────────────────────────────────────────────────────────────

const languageTracks = [
    { label: "Primary Language", emoji: "🌐", items: ["English"] },
    { label: "Regional Languages", emoji: "🇮🇳", items: ["Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Sanskrit"] },
    { label: "Foreign Languages", emoji: "✈️", items: ["French", "German", "Spanish", "Japanese", "Mandarin", "Arabic"] }
];

const countryCodes = [
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+44", country: "GB", flag: "🇬🇧" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
    { code: "+49", country: "DE", flag: "🇩🇪" },
    { code: "+33", country: "FR", flag: "🇫🇷" },
    { code: "+81", country: "JP", flag: "🇯🇵" },
    { code: "+971", country: "AE", flag: "🇦🇪" },
    { code: "+65", country: "SG", flag: "🇸🇬" },
    { code: "+60", country: "MY", flag: "🇲🇾" },
    { code: "+86", country: "CN", flag: "🇨🇳" },
    { code: "+55", country: "BR", flag: "🇧🇷" },
    { code: "+27", country: "ZA", flag: "🇿🇦" },
    { code: "+7", country: "RU", flag: "🇷🇺" },
    { code: "+34", country: "ES", flag: "🇪🇸" },
];

const findLanguageDetails = (label, language) => {
    if (!label || !language) return null;
    const track = languageTracks.find(t => t.label.toLowerCase() === label.toLowerCase());
    if (!track) return null;
    const languageExists = track.items.some(i => i.toLowerCase() === language.toLowerCase());
    return languageExists ? { trackLabel: track.label, trackEmoji: track.emoji, language } : null;
};

const getLanguageContent = (language) => {
    const contentMap = {
        english: {
            heroTitle: "English",
            quoteOriginal: '"The limits of my language mean the limits of my world."',
            quoteEnglish: '— Ludwig Wittgenstein',
            typewriterLines: [
                "Master the art of eloquent communication.",
                "From boardrooms to classrooms, English opens every door.",
                "Build fluency. Build confidence. Build your future.",
                "We help you speak clearly, write precisely, and lead confidently through language mastery",
            ],
            flag: "🇬🇧",
            accentColor: "#EB6664",
            bgGradient: "from-slate-950 via-slate-900 to-rose-950",
            stats: [{ label: "Students", value: "12,400+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "320+" }, { label: "Countries", value: "18" }],
            tagline: "The global passport to opportunity",
            overview: "English is the world's most widely studied language — spoken by over 1.5 billion people and used in every major professional, academic, and cultural arena. Whether you're preparing for IELTS, advancing your career, or simply becoming a more confident communicator, our English program gives you the edge.",
            whatWeTeach: [
                { icon: "🔤", title: "Grammar & Syntax", desc: "Master tenses, parts of speech, sentence construction, and punctuation." },
                { icon: "🗣️", title: "Speaking & Pronunciation", desc: "IPA phonetics, accent reduction, fluency drills, and public speaking." },
                { icon: "✍️", title: "Writing Skills", desc: "Emails, essays, reports, creative writing, and academic papers." },
                { icon: "👂", title: "Listening & Comprehension", desc: "Podcasts, lectures, interviews — train your ear for real-world English." },
                { icon: "📖", title: "Reading & Vocabulary", desc: "5,000+ word building program with context-based learning." },
                { icon: "💼", title: "Business Communication", desc: "Meetings, negotiations, presentations, and professional correspondence." },
            ],
            advantages: [
                { icon: "🎓", title: "Certified Native Tutors", desc: "Learn from certified native English speakers with TEFL/CELTA qualifications." },
                { icon: "📚", title: "Age-Specific Curriculum", desc: "Tailored learning plans from kids (age 5) to senior professionals." },
                { icon: "🏆", title: "Exam Preparation", desc: "IELTS, TOEFL, Cambridge B2/C1, and PTE preparation programs." },
                { icon: "🤝", title: "Mock Interviews", desc: "Simulated HR and technical interviews with real-time feedback." },
            ],
            features: [
                { icon: "🔴", title: "Live Interactive Classes", desc: "Real-time sessions with HD video, whiteboard tools, and breakout rooms." },
                { icon: "📹", title: "Recorded Archives", desc: "Every session recorded and accessible for 6 months after the course ends." },
                { icon: "📝", title: "Weekly Assessments", desc: "Structured tests every Friday covering grammar, vocab, and speaking." },
                { icon: "💬", title: "Debate Clubs", desc: "Weekly group debates and discussion panels to sharpen fluency." },
                { icon: "📖", title: "Digital Library", desc: "5,000+ e-books, grammar guides, and audio resources at your fingertips." },
                { icon: "🏅", title: "Certified Completion", desc: "Industry-recognized certificate awarded on course completion." },
            ],
            faqs: [
                { q: "How long does it take to become fluent in English?", a: "Most students achieve conversational fluency within 3–6 months with consistent practice. Advanced proficiency typically takes 9–12 months." },
                { q: "Do I need any prior knowledge to enrol?", a: "No! We have programs for complete beginners all the way to advanced learners. A free placement test helps us put you in the right batch." },
                { q: "Are the classes live or pre-recorded?", a: "All core sessions are live and interactive. Every class is also recorded and available for 6 months so you never miss a lesson." },
                { q: "What certificate do I receive on completion?", a: "You receive an industry-recognised digital certificate that you can share on LinkedIn, job applications, and academic submissions." },
                { q: "Can I switch batches if my schedule changes?", a: "Yes! We offer flexible batch transfers with 48-hour notice. We have morning, afternoon, and evening batches available." },
            ],
            testimonials: [
                { name: "Priya M.", city: "Hyderabad", text: "Cleared my IELTS with a band 8! The tutors here are exceptional.", rating: 5, course: "Advanced" },
                { name: "Rahul S.", city: "Pune", text: "Business English module transformed the way I present at work.", rating: 5, course: "Business" },
                { name: "Kavitha R.", city: "Mysuru", text: "The curriculum is very well structured. Loved the cultural immersion sessions.", rating: 5, course: "Intermediate" },
                { name: "Siddharth B.", city: "Chennai", text: "The tutors are incredibly patient. Perfect for working professionals like me.", rating: 5, course: "Beginner" },
            ],
        },
        hindi: {
            heroTitle: "Hindi",
            quoteOriginal: '"जो भाषा दिल से निकलती है, वो दिल तक पहुँचती है।"',
            quoteEnglish: '— Hindi Proverb',
            typewriterLines: [
                "सुसंस्कृत और प्रभावशाली संवाद की कला में महारत हासिल करें।",
                "बोर्डरूम से कक्षा तक, अंग्रेज़ी हर दरवाज़ा खोलती है।",
                "फ्लुएंसी बनाएं। आत्मविश्वास बनाएं। अपना भविष्य बनाएं।",
                "हम आपको स्पष्ट बोलने, सटीक लिखने और भाषा के माध्यम से आत्मविश्वास के साथ नेतृत्व करना सिखाते हैं।",
            ],
            flag: "🇮🇳",
            accentColor: "#EB6664",
            bgGradient: "from-orange-950 via-slate-900 to-green-950",
            stats: [{ label: "Students", value: "8,200+" }, { label: "Rating", value: "4.8 ⭐" }, { label: "Tutors", value: "180+" }, { label: "States", value: "22" }],
            tagline: "Hindi — bridging 600 million hearts",
            overview: "Hindi is the official language of India, spoken by over 600 million people across the subcontinent. It unlocks access to Bollywood, literature, CBSE academics, and a culture rich in philosophy and poetry.",
            whatWeTeach: [
                { icon: "✍️", title: "Devanagari Script", desc: "Step-by-step script training with stroke-by-stroke guidance for all letters." },
                { icon: "🗣️", title: "Conversational Hindi", desc: "Practical phrases for travel, markets, family, and everyday situations." },
                { icon: "📐", title: "Grammar Foundations", desc: "Gender, cases, verb conjugations, and sentence structure." },
                { icon: "📖", title: "Reading & Writing", desc: "Paragraphs, letters, essays, and comprehension exercises." },
                { icon: "🎬", title: "Bollywood Immersion", desc: "Learn through lyrics, film dialogues, and popular culture." },
                { icon: "📜", title: "Hindi Literature", desc: "Kabir, Premchand, and modern Hindi poetry for culture lovers." },
            ],
            advantages: [
                { icon: "👥", title: "Small Batches", desc: "Max 8 students per batch for personal attention and interaction." },
                { icon: "📄", title: "Worksheets Provided", desc: "Printed and digital practice sheets delivered weekly." },
                { icon: "🎉", title: "Cultural Immersion", desc: "Monthly sessions on festivals, cooking, and folk traditions." },
                { icon: "🆓", title: "Free Demo Class", desc: "Try a complete 45-minute class before committing." },
            ],
            features: [
                { icon: "💻", title: "Live Online Classes", desc: "HD video sessions with screen sharing and interactive whiteboard." },
                { icon: "📹", title: "Recorded Access", desc: "All sessions recorded and available for 6 months." },
                { icon: "📝", title: "Practice Sheets", desc: "Weekly exercises and homework for reinforcement." },
                { icon: "🧪", title: "Monthly Tests", desc: "Comprehensive monthly evaluations to track mastery." },
                { icon: "👨‍👩‍👧", title: "Parent Meetups", desc: "Bi-monthly parent-teacher interactions to track child's progress." },
                { icon: "👥", title: "Community Forum", desc: "Learner community for peer practice and motivation." },
            ],
            faqs: [
                { q: "Do I need to know the Hindi script to start?", a: "Not at all! Our beginner module starts with the Devanagari script from scratch. You'll be reading and writing within 2 weeks." },
                { q: "Is this suitable for non-Indian learners?", a: "Absolutely! Many of our students are expats and foreign nationals learning Hindi for work or personal connections." },
                { q: "How is Hindi different from Urdu?", a: "Hindi and Urdu share spoken grammar but use different scripts and formal vocabulary. We cover this distinction in class." },
                { q: "Will I learn CBSE-level Hindi?", a: "Yes! We have dedicated academic modules for Class 6–12 aligned with CBSE/ICSE syllabi." },
                { q: "How soon can I hold a basic conversation?", a: "Most students can hold basic conversations within 4–6 weeks of starting the conversational module." },
            ],
            testimonials: [
                { name: "Ananya T.", city: "Bengaluru", text: "I could speak full Hindi sentences in just 2 months. Brilliant course!", rating: 5, course: "Conversational" },
                { name: "James R.", city: "Mumbai", text: "As an expat, this helped me connect with colleagues in a whole new way.", rating: 5, course: "Beginner" },
                { name: "Meera K.", city: "Coimbatore", text: "The script classes were fantastic — I can now read Hindi fluently!", rating: 5, course: "Starter" },
                { name: "Arun V.", city: "Hyderabad", text: "Cultural immersion sessions are the highlight. Absolutely loved it!", rating: 5, course: "Proficient" },
            ],
        },
        french: {
            heroTitle: "French",
            quoteOriginal: '"Une langue différente est une vision différente de la vie."',
            quoteEnglish: '— Federico Fellini',
            typewriterLines: [
                "Maîtrisez l'art d'une communication éloquente.",
                "Des salles de réunion aux salles de classe, l'anglais ouvre toutes les portes.",
                "Développez votre aisance. Développez votre confiance. Construisez votre avenir.",
                "Nous vous aidons à parler clairement, écrire avec précision et diriger avec confiance grâce à la maîtrise de la langue.",
            ],
            flag: "🇫🇷",
            accentColor: "#EB6664",
            bgGradient: "from-blue-950 via-slate-900 to-red-950",
            stats: [{ label: "Students", value: "6,900+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "140+" }, { label: "Countries", value: "12" }],
            tagline: "Spoken across 5 continents, loved by all",
            overview: "French is the official language of 29 countries and spoken by 300 million people worldwide. It's one of the working languages of the UN, EU, and UNESCO. Whether you dream of Paris, Quebec, or a global career, French opens extraordinary doors.",
            whatWeTeach: [
                { icon: "🔤", title: "French Grammar", desc: "Gender, conjugation, subjunctive, liaison, and sentence structure." },
                { icon: "🎙️", title: "Pronunciation & Accent", desc: "Nasal vowels, silent letters, liaisons, and authentic Parisian pronunciation." },
                { icon: "✍️", title: "Reading & Writing", desc: "Formal letters, essays, creative writing, and comprehension texts." },
                { icon: "🗣️", title: "Conversation Practice", desc: "Weekly conversation sessions with native French tutors." },
                { icon: "💼", title: "Business French", desc: "Professional correspondence, meetings, and negotiations in French." },
                { icon: "📋", title: "DELF/DALF Prep", desc: "Structured certification preparation for all CEFR levels (A1–C2)." },
            ],
            advantages: [
                { icon: "🧑‍🏫", title: "Native French Tutors", desc: "Learn from Parisian and Francophone instructors for authentic pronunciation." },
                { icon: "📊", title: "CEFR Level Tracking", desc: "Monthly placement tests mapped to official CEFR benchmarks." },
                { icon: "🗺️", title: "Study Abroad Guidance", desc: "Application support for French universities and Grande Écoles." },
                { icon: "🍷", title: "Culture & Etiquette", desc: "Dining, social norms, art history, and Francophone cinema." },
            ],
            features: [
                { icon: "🎬", title: "French Cinema Library", desc: "Access to curated collection of French films with subtitles." },
                { icon: "💻", title: "Live Immersive Classes", desc: "Virtual Paris café–style conversation sessions every weekend." },
                { icon: "🎵", title: "Music & Lyrics", desc: "Chansons françaises used to teach vocabulary in a fun way." },
                { icon: "📝", title: "Exam Mock Tests", desc: "Full-length DELF mock exams with expert feedback." },
                { icon: "📊", title: "Progress Dashboard", desc: "Live progress reports and streak tracking for motivation." },
                { icon: "🌐", title: "International Certificate", desc: "Globally recognized certificate from accredited partners." },
            ],
            faqs: [
                { q: "Is French hard to learn for Indian students?", a: "French has a structured grammar system that Indian learners tend to pick up well. The pronunciation takes practice, but our dedicated accent classes make it manageable." },
                { q: "Which DELF level should I target first?", a: "Most beginners aim for A1–A2 in 4–6 months. Our placement test will guide you to the right starting level." },
                { q: "Do you offer university application support for France?", a: "Yes! We partner with education consultants to assist with Campus France applications, visa processes, and document preparation." },
                { q: "Can I learn both European and Canadian French?", a: "Our curriculum focuses on standard French, which is understood universally. We cover regional differences including Québécois French at the advanced level." },
                { q: "What makes your pronunciation training special?", a: "We use IPA phonetics charts, audio comparison tools, and weekly recorded speaking exercises reviewed by native tutors." },
            ],
            testimonials: [
                { name: "Sneha K.", city: "Chennai", text: "Cleared DELF B2 in first attempt. The mock tests were spot-on!", rating: 5, course: "B1-B2" },
                { name: "Arjun P.", city: "Delhi", text: "Studying in Lyon now — this course gave me the confidence I needed.", rating: 5, course: "C1-C2" },
                { name: "Nisha R.", city: "Hyderabad", text: "The cinema library is amazing. Now watching French films without subtitles!", rating: 5, course: "Intermediate" },
                { name: "Vinay T.", city: "Bengaluru", text: "Brilliant structured approach. My CEFR level jumped from A2 to B2 in 8 months.", rating: 5, course: "Advanced" },
            ],
        },
        german: {
            heroTitle: "German",
            quoteOriginal: '"Wer fremde Sprachen nicht kennt, weiß nichts von seiner eigenen."',
            quoteEnglish: '— Johann Wolfgang von Goethe',
            typewriterLines: [
                "Meistern Sie die Kunst der eloquenten Kommunikation.",
                "Vom Konferenzraum bis zum Klassenzimmer – Englisch öffnet jede Tür.",
                "Bauen Sie Sprachflüssigkeit auf. Entwickeln Sie Selbstvertrauen. Gestalten Sie Ihre Zukunft.",
                "Wir helfen Ihnen, klar zu sprechen, präzise zu schreiben und mit Sprachkompetenz selbstbewusst zu führen.",
            ],
            flag: "🇩🇪",
            accentColor: "#EB6664",
            bgGradient: "from-gray-950 via-slate-900 to-yellow-950",
            stats: [{ label: "Students", value: "5,100+" }, { label: "Rating", value: "4.8 ⭐" }, { label: "Tutors", value: "95+" }, { label: "Countries", value: "8" }],
            tagline: "Germany's job market awaits you",
            overview: "German is the most spoken native language in Europe and the key to world-class engineering, research, and manufacturing careers. With 80+ million native speakers and Germany's booming labor market, German is one of the highest ROI languages you can learn.",
            whatWeTeach: [
                { icon: "⚙️", title: "German Grammar", desc: "Systematic approach to cases (Nominativ, Akkusativ, Dativ, Genitiv) and declensions." },
                { icon: "🗣️", title: "Speaking & Dialogue", desc: "Daily conversations, role-plays, and structured speaking drills every session." },
                { icon: "✍️", title: "Writing Skills", desc: "Formal letters, academic essays, and professional reports in German." },
                { icon: "🏗️", title: "Technical German", desc: "Specialized vocabulary for engineers, IT professionals, and scientists." },
                { icon: "📋", title: "Goethe-Zertifikat Prep", desc: "Official exam preparation from A1 to C2 with certified trainers." },
                { icon: "🌍", title: "Visa & Study Support", desc: "Guidance on APS, blocked account, and German university applications." },
            ],
            advantages: [
                { icon: "👥", title: "Micro Batches (4–6)", desc: "Intimate class sizes to guarantee speaking practice for each student." },
                { icon: "📄", title: "Digital Study Kits", desc: "Complete grammar handbooks, flashcard decks, and audio files provided." },
                { icon: "📝", title: "Mock Goethe Tests", desc: "Full-length Goethe Institut mock exams graded by trained evaluators." },
                { icon: "💼", title: "Job Assistance", desc: "Partner network connects graduates with German-speaking employers." },
            ],
            features: [
                { icon: "👥", title: "Micro Batches (4–6)", desc: "Intimate class sizes to guarantee speaking practice for each student." },
                { icon: "🗣️", title: "Weekly Speaking Drills", desc: "Every session includes 20-minute structured speaking exercises." },
                { icon: "🎥", title: "Lecture Recordings", desc: "All lessons recorded in HD and archived for 12 months." },
                { icon: "📝", title: "Mock Goethe Tests", desc: "Full-length Goethe Institut mock exams graded by trained evaluators." },
                { icon: "💼", title: "Job Assistance", desc: "Partner network connects graduates with German-speaking employers." },
                { icon: "📄", title: "Digital Study Kits", desc: "Complete grammar handbooks, flashcard decks, and audio files provided." },
            ],
            faqs: [
                { q: "Is German grammar really as hard as people say?", a: "German grammar is systematic — once you understand the case system, it becomes logical. Our structured approach breaks it into manageable chunks week by week." },
                { q: "How long to reach B1 level for work visa?", a: "Most dedicated students reach B1 within 6–8 months. We have an accelerated track for working professionals targeting German work visas." },
                { q: "Do you help with APS certificate process?", a: "Yes! We have tie-ups with German consultants who assist with APS verification, blocked accounts, and visa documentation." },
                { q: "What's the difference between Austrian and German?", a: "Standard German (Hochdeutsch) is taught in our courses, which is understood across Germany, Austria, and Switzerland. Regional dialects are covered at C1 level." },
                { q: "Can I find a job in Germany after completing this course?", a: "Our job assistance program connects you with German-speaking employers. Many of our graduates have secured jobs in Germany, Austria, and Switzerland." },
            ],
            testimonials: [
                { name: "Vikram N.", city: "Hyderabad", text: "Got a job offer in Munich after completing this course. Life-changing!", rating: 5, course: "C1-C2" },
                { name: "Divya C.", city: "Coimbatore", text: "Cleared Goethe B2 with distinction. The structured grammar classes were key.", rating: 5, course: "B1-B2" },
                { name: "Karan M.", city: "Pune", text: "Micro batches meant I actually got to practice speaking every class!", rating: 5, course: "A1-A2" },
                { name: "Shruti L.", city: "Delhi", text: "Now working at Siemens India. The technical German module was invaluable.", rating: 5, course: "Advanced" },
            ],
        },
        spanish: {
            heroTitle: "Spanish",
            quoteOriginal: '"Un idioma diferente es una visión diferente de la vida."',
            quoteEnglish: '— Federico Fellini',
            typewriterLines: [
                "Domina el arte de la comunicación elocuente.",
                "Desde salas de juntas hasta aulas, el inglés abre todas las puertas.",
                "Desarrolla fluidez. Construye confianza. Construye tu futuro.",
                "Te ayudamos a hablar con claridad, escribir con precisión y liderar con confianza a través del dominio del idioma.",
            ],
            flag: "🇪🇸",
            accentColor: "#EB6664",
            bgGradient: "from-red-950 via-slate-900 to-yellow-950",
            stats: [{ label: "Students", value: "7,300+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "160+" }, { label: "Countries", value: "14" }],
            tagline: "One language. Twenty nations. Infinite connections.",
            overview: "Spanish is spoken by 500 million native speakers across 20+ countries. It's the second most spoken language in the US and one of the most demanded languages in global business, healthcare, and diplomacy.",
            whatWeTeach: [
                { icon: "🔤", title: "Spanish Grammar", desc: "Ser/estar, subjunctive, gender, conjugations, and sentence structure." },
                { icon: "🗣️", title: "Conversation Practice", desc: "Weekly conversation clubs with native speakers from Spain and Latin America." },
                { icon: "✍️", title: "Writing & Reading", desc: "Formal writing, comprehension, creative expression, and literature." },
                { icon: "🎭", title: "Role-Play Sessions", desc: "Simulated real-world scenarios: markets, airports, offices, restaurants." },
                { icon: "📋", title: "DELE Exam Prep", desc: "Dedicated preparation for DELE A1–C2 certification levels." },
                { icon: "🌎", title: "Both Spanish Varieties", desc: "Learn both Castilian (Spain) and Latin American Spanish." },
            ],
            advantages: [
                { icon: "🎙️", title: "Native Speakers", desc: "Tutors from Spain, Mexico, Colombia, and Argentina for authentic exposure." },
                { icon: "🌊", title: "Travel Ready in 3 Months", desc: "Fast-track conversational program for travel and basic work." },
                { icon: "☕", title: "Conversation Clubs", desc: "Weekly online meetups with native speakers for free conversation practice." },
                { icon: "🌅", title: "Flexible Batches", desc: "Morning (6 AM), afternoon (2 PM), and evening (7 PM) options." },
            ],
            features: [
                { icon: "🎭", title: "Role-Play Sessions", desc: "Simulated real-world scenarios: markets, airports, offices, restaurants." },
                { icon: "🎬", title: "Spanish Media Library", desc: "Telenovelas, podcasts, films, and music for immersive learning." },
                { icon: "☕", title: "Conversation Clubs", desc: "Weekly online meetups with native speakers for free conversation practice." },
                { icon: "📊", title: "Progress Dashboard", desc: "Live progress reports mapped to CEFR Spanish benchmarks." },
                { icon: "🌅", title: "Flexible Batches", desc: "Morning, afternoon, and evening options available." },
                { icon: "🏅", title: "Completion Certificate", desc: "Bilingual certificate (English/Spanish) on course completion." },
            ],
            faqs: [
                { q: "Is Spanish easy for Hindi/English speakers?", a: "Spanish is widely considered one of the easiest languages for English speakers. The phonetic spelling system is very intuitive for Indian learners as well." },
                { q: "What's the difference between Spain Spanish and Latin American Spanish?", a: "We cover both! Main differences include pronunciation and some vocabulary. We teach standard Spanish first, then regional variations." },
                { q: "How quickly can I travel to a Spanish-speaking country?", a: "Our 3-month fast-track conversational program will have you comfortable navigating airports, hotels, restaurants, and basic social situations." },
                { q: "Do you prepare for DELE certification?", a: "Yes! We have specialized DELE prep tracks for A1 through C2, with mock exams, past papers, and examiner-trained tutors." },
                { q: "Are there Spanish conversation clubs included?", a: "Yes! Weekly conversation clubs with native speakers are included in all plans at no extra charge." },
            ],
            testimonials: [
                { name: "Meera J.", city: "Bengaluru", text: "Cleared DELE B2 in 6 months. The conversation clubs made all the difference!", rating: 5, course: "B1-B2" },
                { name: "Kiran D.", city: "Hyderabad", text: "Spanish opened doors I didn't even know existed. Dream job is in Barcelona!", rating: 5, course: "Advanced" },
                { name: "Pooja S.", city: "Mumbai", text: "Travelled to Mexico solo in 4 months of learning. The fast-track course is brilliant.", rating: 5, course: "Conversational" },
                { name: "Rahul A.", city: "Pune", text: "The media library with telenovelas made learning actually fun and addictive!", rating: 5, course: "Intermediate" },
            ],
        },
        telugu: {
            heroTitle: "Telugu",
            quoteOriginal: '"వేరే భాష అంటే జీవితం పట్ల వేరే దృష్టికోణం."',
            quoteEnglish: "— Federico Fellini",
            typewriterLines: [
                "స్పష్టమైన మరియు ప్రభావవంతమైన సంభాషణ కళను నేర్చుకోండి.",
                "బోర్డు గదుల నుండి తరగతి గదుల వరకు, ఇంగ్లీష్ ప్రతి తలుపును తెరుస్తుంది.",
                "ఫ్లూయెన్సీని నిర్మించండి. ఆత్మవిశ్వాసాన్ని పెంచుకోండి. మీ భవిష్యత్తును నిర్మించండి.",
                "మేము మీకు స్పష్టంగా మాట్లాడటం, ఖచ్చితంగా రాయడం మరియు భాష ద్వారా నమ్మకంగా నాయకత్వం వహించడం నేర్పిస్తాము.",
            ],
            flag: "🇮🇳",
            accentColor: "#EB6664",
            bgGradient: "from-purple-950 via-slate-900 to-pink-950",
            stats: [{ label: "Students", value: "7,300+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "160+" }, { label: "Countries", value: "14" }],
            tagline: "One language. Infinite opportunities.",
            overview: "Telugu is one of the most widely spoken languages in India, rich in literature and culture.",

            whatWeTeach: [
                { icon: "🔤", title: "Grammar & Syntax", desc: "Learn sentence structure, grammar rules, and proper usage." },
                { icon: "🗣️", title: "Speaking Practice", desc: "Daily conversations and fluency-building exercises." },
                { icon: "✍️", title: "Writing Skills", desc: "Improve writing, comprehension, and creative expression." },
                { icon: "📖", title: "Reading", desc: "Develop reading skills with structured materials." },
            ],

            advantages: [
                { icon: "🎓", title: "Expert Tutors", desc: "Learn from experienced and certified instructors." },
                { icon: "📚", title: "Structured Curriculum", desc: "Step-by-step learning path for all levels." },
                { icon: "🏆", title: "Certification", desc: "Receive recognized certificates after completion." },
            ],

            features: [
                { icon: "💻", title: "Live Classes", desc: "Interactive online sessions with expert tutors." },
                { icon: "📹", title: "Recorded Sessions", desc: "Access recordings anytime for revision." },
                { icon: "📝", title: "Weekly Tests", desc: "Regular assessments to track progress." },
            ],

            faqs: [
                { q: "Is Telugu easy to learn?", a: "Yes, with consistent practice and guidance, it becomes easy." },
                { q: "Do you provide certificates?", a: "Yes, certificates are provided after course completion." },
            ],

            testimonials: [
                { name: "Ravi K.", city: "Hyderabad", text: "Amazing course and great tutors!", rating: 5, course: "Beginner" },
                { name: "Sita M.", city: "Vijayawada", text: "Very structured and easy to follow.", rating: 5, course: "Intermediate" },
            ],
        },

        tamil: {
            heroTitle: "Tamil",
            quoteOriginal: '"வேறு மொழி என்பது வாழ்க்கையைப் பார்க்கும் வேறு பார்வை."',
            quoteEnglish: "— Federico Fellini",
            typewriterLines: [
                "தெளிவான மற்றும் செம்மையான தொடர்பின் கலைையை கற்றுக்கொள்ளுங்கள்.",
                "மாநாட்டு அறைகளிலிருந்து வகுப்பறைகள் வரை, ஆங்கிலம் ஒவ்வொரு வாயிலையும் திறக்கிறது.",
                "பழகும் திறனை வளர்த்துக்கொள்ளுங்கள். நம்பிக்கையை உருவாக்குங்கள். உங்கள் எதிர்காலத்தை கட்டியெழுப்புங்கள்.",
                "நாங்கள் உங்களை தெளிவாக பேசவும், துல்லியமாக எழுதவும், மொழி திறனின் மூலம் நம்பிக்கையுடன் முன்னிலை வகிக்கவும் உதவுகிறோம்.",
            ],
            flag: "🇮🇳",
            accentColor: "#EB6664",
            bgGradient: "from-red-950 via-slate-900 to-yellow-950",
            stats: [{ label: "Students", value: "7,300+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "160+" }, { label: "Countries", value: "14" }],
            tagline: "One language. Infinite opportunities.",
            overview: "Tamil is one of the oldest classical languages with a rich cultural heritage.",

            whatWeTeach: [
                { icon: "🔤", title: "Grammar & Syntax", desc: "Learn sentence formation and grammar rules." },
                { icon: "🗣️", title: "Speaking Practice", desc: "Improve fluency through conversations." },
                { icon: "✍️", title: "Writing Skills", desc: "Enhance writing and comprehension skills." },
            ],

            advantages: [
                { icon: "🎓", title: "Expert Tutors", desc: "Experienced instructors for better learning." },
                { icon: "📚", title: "Structured Curriculum", desc: "Well-organized lessons for all levels." },
            ],

            features: [
                { icon: "💻", title: "Live Classes", desc: "Interactive sessions." },
                { icon: "📹", title: "Recorded Sessions", desc: "Learn anytime." },
            ],

            faqs: [
                { q: "Can beginners join?", a: "Yes, we have beginner-friendly courses." },
            ],

            testimonials: [
                { name: "Arun", city: "Chennai", text: "Very helpful course!", rating: 5, course: "Beginner" },
            ],
        },

        kannada: {
            heroTitle: "Kannada",
            quoteOriginal: '"ಬೇರೆ ಭಾಷೆ ಎಂದರೆ ಜೀವನದ ಬೇರೆ ದೃಷ್ಟಿಕೋನ."',
            quoteEnglish: "— Federico Fellini",
            typewriterLines: [
                "ಸ್ಪಷ್ಟ ಮತ್ತು ಪ್ರಭಾವಿ ಸಂವಹನದ ಕಲೆಯನ್ನು ಕಲಿಯಿರಿ.",
                "ಬೋರ್ಡ್‌ರೂಮ್‌ಗಳಿಂದ ತರಗತಿಗಳವರೆಗೆ, ಇಂಗ್ಲಿಷ್ ಪ್ರತಿಯೊಂದು ಬಾಗಿಲನ್ನೂ ತೆರೆಯುತ್ತದೆ.",
                "ನಿಪುಣತೆಯನ್ನು ಬೆಳೆಸಿರಿ. ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ನಿರ್ಮಿಸಿರಿ. ನಿಮ್ಮ ಭವಿಷ್ಯವನ್ನು ಕಟ್ಟಿಕೊಳ್ಳಿ.",
                "ನಾವು ನಿಮಗೆ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಲು, ನಿಖರವಾಗಿ ಬರೆಯಲು ಮತ್ತು ಭಾಷೆಯ ಮೂಲಕ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ನಾಯಕತ್ವ ವಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
            ],
            flag: "🇮🇳",
            accentColor: "#EB6664",
            bgGradient: "from-indigo-950 via-slate-900 to-purple-950",
            stats: [{ label: "Students", value: "7,300+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "160+" }, { label: "Countries", value: "14" }],
            tagline: "One language. Infinite opportunities.",
            overview: "Kannada has a rich literary history and is widely spoken in Karnataka.",

            whatWeTeach: [
                { icon: "🔤", title: "Grammar", desc: "Learn grammar and structure." },
                { icon: "🗣️", title: "Speaking", desc: "Practice conversations." },
            ],

            advantages: [
                { icon: "🎓", title: "Expert Tutors", desc: "Learn from professionals." },
            ],

            features: [
                { icon: "💻", title: "Live Classes", desc: "Interactive sessions." },
            ],

            faqs: [
                { q: "Is Kannada difficult?", a: "No, with practice it becomes easy." },
            ],

            testimonials: [
                { name: "Ramesh", city: "Bengaluru", text: "Great learning experience!", rating: 5, course: "Beginner" },
            ],
        },

        malayalam: {
            heroTitle: "Malayalam",
            quoteOriginal: '"മറ്റൊരു ഭാഷ ജീവിതത്തെ കാണാനുള്ള മറ്റൊരു ദൃഷ്ടികോണം ആണ്."',
            quoteEnglish: "— Federico Fellini",
            typewriterLines: [
                "വ്യക്തവും പ്രഭാവശാലിയുമായ ആശയവിനിമയത്തിന്റെ കലയിൽ പ്രാവീണ്യം നേടുക.",
                "ബോർഡ്റൂമുകളിൽ നിന്ന് ക്ലാസ് മുറികളിലേക്ക്, ഇംഗ്ലീഷ് എല്ലാ വാതിലുകളും തുറക്കുന്നു.",
                "ഫ്ലൂയൻസി വികസിപ്പിക്കുക. ആത്മവിശ്വാസം വളർത്തുക. നിങ്ങളുടെ ഭാവി നിർമ്മിക്കുക.",
                "നിങ്ങൾക്ക് വ്യക്തമായി സംസാരിക്കാനും കൃത്യമായി എഴുതാനും ഭാഷയിലൂടെ ആത്മവിശ്വാസത്തോടെ നയിക്കാനും ഞങ്ങൾ സഹായിക്കുന്നു.",
            ],
            flag: "🇮🇳",
            accentColor: "#EB6664",
            bgGradient: "from-green-950 via-slate-900 to-emerald-950",
            stats: [{ label: "Students", value: "7,300+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "160+" }, { label: "Countries", value: "14" }],
            tagline: "One language. Infinite opportunities.",
            overview: "Malayalam is known for its unique script and rich literature.",

            whatWeTeach: [
                { icon: "🔤", title: "Grammar", desc: "Learn grammar basics." },
                { icon: "🗣️", title: "Speaking", desc: "Improve fluency." },
            ],

            advantages: [
                { icon: "🎓", title: "Expert Tutors", desc: "Professional teachers." },
            ],

            features: [
                { icon: "💻", title: "Live Classes", desc: "Online sessions." },
            ],

            faqs: [
                { q: "Is Malayalam hard?", a: "It becomes easy with practice." },
            ],

            testimonials: [
                { name: "Anil", city: "Kochi", text: "Very effective course!", rating: 5, course: "Beginner" },
            ],
        },

        sanskrit: {
            heroTitle: "Sanskrit",
            quoteOriginal: '"भिन्ना भाषा जीवनस्य भिन्ना दृष्टिः।"',
            quoteEnglish: "— Federico Fellini",
            typewriterLines: [
                "सुस्पष्टस्य प्रभावशालिनः संवादस्य कलां अधिगच्छत।",
                "सभा-कक्षात् कक्षा-पर्यन्तं, आङ्ग्लभाषा सर्वाणि द्वाराणि उद्घाटयति।",
                "प्रवाहिता निर्मीयताम्। आत्मविश्वासः वर्ध्यताम्। भवतः भविष्यं निर्मीयताम्।",
                "वयं भवन्तं स्पष्टं वक्तुं, शुद्धं लिखितुं, भाषया आत्मविश्वासेन नेतुं सहायं कुर्मः।",
            ],
            flag: "🕉️",
            accentColor: "#EB6664",
            bgGradient: "from-orange-950 via-slate-900 to-yellow-950",
            stats: [{ label: "Students", value: "7,300+" }, { label: "Rating", value: "4.9 ⭐" }, { label: "Tutors", value: "160+" }, { label: "Countries", value: "14" }],
            tagline: "One language. Infinite opportunities.",
            overview: "Sanskrit is the ancient classical language of India.",

            whatWeTeach: [
                { icon: "📜", title: "Grammar", desc: "Classical grammar rules." },
                { icon: "🗣️", title: "Speaking", desc: "Basic spoken Sanskrit." },
            ],

            advantages: [
                { icon: "🎓", title: "Expert Tutors", desc: "Qualified instructors." },
            ],

            features: [
                { icon: "💻", title: "Live Classes", desc: "Interactive learning." },
            ],

            faqs: [
                { q: "Is Sanskrit useful today?", a: "Yes, it builds strong language foundations." },
            ],

            testimonials: [
                { name: "Amit", city: "Delhi", text: "Very unique learning experience!", rating: 5, course: "Beginner" },
            ],
        },
    };

    const defaultContent = {
        heroTitle: language,
        quoteOriginal: `"Every language is a world. Without translation, we would inhabit parishes bordering on silence."`,
        quoteEnglish: '— George Steiner',
        typewriterLines: [
            `Discover the beauty of ${language}.`,
            "Expert tutors, flexible schedules, real results.",
            "Join thousands of learners on the path to fluency.",
            "Your journey to a new language starts today.",
        ],
        flag: "🌍",
        accentColor: "#EB6664",
        bgGradient: "from-slate-950 via-gray-900 to-slate-800",
        stats: [{ label: "Students", value: "5,000+" }, { label: "Rating", value: "4.8 ⭐" }, { label: "Tutors", value: "100+" }, { label: "Countries", value: "10" }],
        tagline: `Discover the beauty of ${language}`,
        overview: `${language} is a rich and vibrant language with millions of speakers worldwide. Our certified tutors bring years of teaching experience to help you learn in the most efficient and enjoyable way possible.`,
        whatWeTeach: [
            { icon: "🔤", title: "Grammar Foundations", desc: "Systematic grammar covering all levels from basics to advanced." },
            { icon: "🗣️", title: "Speaking Practice", desc: "Structured speaking sessions to build conversational fluency." },
            { icon: "✍️", title: "Writing Skills", desc: "From basic sentences to formal essays and professional writing." },
            { icon: "👂", title: "Listening Skills", desc: "Train your ear with native audio content and comprehension exercises." },
            { icon: "📖", title: "Reading & Vocab", desc: "Progressive vocabulary building through graded reading materials." },
            { icon: "🏆", title: "Exam Preparation", desc: "Targeted preparation for official language certifications." },
        ],
        advantages: [
            { icon: "🎓", title: "Certified Tutors", desc: `Experienced and certified ${language} instructors with 5+ years of teaching.` },
            { icon: "📅", title: "Flexible Timings", desc: "Morning, afternoon, and evening slots to fit your schedule." },
            { icon: "📊", title: "Progress Tracking", desc: "Detailed weekly reports and milestone assessments." },
            { icon: "🏅", title: "Certification", desc: "Recognised certificate awarded upon course completion." },
        ],
        features: [
            { icon: "💻", title: "Live Online Classes", desc: "HD video sessions with screen sharing and interactive whiteboard." },
            { icon: "📹", title: "Recorded Access", desc: "All sessions recorded and available for 6 months." },
            { icon: "📝", title: "Practice Sheets", desc: "Weekly exercises and homework for reinforcement." },
            { icon: "🧪", title: "Monthly Tests", desc: "Comprehensive monthly evaluations to track mastery." },
            { icon: "🆓", title: "Free Demo Class", desc: "Full 45-minute demo to experience the teaching quality." },
            { icon: "👥", title: "Community Forum", desc: "Learner community for peer practice and motivation." },
        ],
        faqs: [
            { q: `How long does it take to learn ${language}?`, a: "Most students reach conversational fluency in 3–6 months with consistent practice. Our placement test determines the best starting point." },
            { q: "Do I need prior experience?", a: "No prior knowledge needed! We have beginner programs starting from zero." },
            { q: "Are classes live or recorded?", a: "All core sessions are live and interactive, with recordings available for 6 months." },
            { q: "What certificate do I receive?", a: "An industry-recognised digital certificate awarded on completion, shareable on LinkedIn." },
            { q: "Can I switch batch timings?", a: "Yes, with 48-hour notice. We offer morning, afternoon, and evening batches." },
        ],
        testimonials: [
            { name: "Rohan V.", city: "Mumbai", text: "Amazing teachers, amazing course. Highly recommended!", rating: 5, course: "Intermediate" },
            { name: "Lakshmi S.", city: "Chennai", text: "Learned so much in just 3 months. The structured approach really works.", rating: 5, course: "Beginner" },
            { name: "Aditya K.", city: "Pune", text: "The curriculum is well-designed and the tutors are very supportive.", rating: 5, course: "Advanced" },
            { name: "Pooja M.", city: "Hyderabad", text: "Best language learning experience I've had. Totally worth it!", rating: 5, course: "Conversational" },
        ],
    };

    return contentMap[language?.toLowerCase()] || defaultContent;
};

// ─── Typewriter Component ──────────────────────────────────────────────────────

const Typewriter = ({ lines, speed = 45, pause = 2500 }) => {
    const [displayed, setDisplayed] = useState('');
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const currentLine = lines[lineIndex];
        let timeout;
        if (!deleting && charIndex < currentLine.length) {
            timeout = setTimeout(() => setCharIndex(c => c + 1), speed);
        } else if (!deleting && charIndex === currentLine.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2);
        } else if (deleting && charIndex === 0) {
            setDeleting(false);
            setLineIndex(i => (i + 1) % lines.length);
        }
        setDisplayed(currentLine.slice(0, charIndex));
        return () => clearTimeout(timeout);
    }, [charIndex, deleting, lineIndex, lines, speed, pause]);

    return (
        <span>
            {displayed}
            <span className="animate-pulse" style={{ color: '#EB6664' }}>|</span>
        </span>
    );
};

// ─── Star Rating ───────────────────────────────────────────────────────────────

const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(s => (
            <svg key={s} className="w-4 h-4" fill={s <= rating ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

// ─── FAQ Item ──────────────────────────────────────────────────────────────────

const FAQItem = ({ q, a, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`border-b border-gray-100 last:border-b-0 ${open ? 'pb-4' : ''}`}>
            <button
                className="flex items-center justify-between w-full py-5 text-left gap-4"
                onClick={() => setOpen(o => !o)}
            >
                <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center text-white" style={{ background: '#EB6664' }}>{index + 1}</span>
                    <span className="font-semibold text-gray-900 text-sm leading-snug">{q}</span>
                </div>
                <svg
                    className={`flex-shrink-0 w-5 h-5 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && <p className="text-gray-500 text-sm leading-relaxed ml-9 pr-4 pb-1">{a}</p>}
        </div>
    );
};

// ─── Enroll Modal ──────────────────────────────────────────────────────────────

const EnrollModal = ({ language, flag, onClose }) => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', countryCode: '+91' });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [ccOpen, setCcOpen] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email address required';
        if (!/^\d{7,12}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid phone number';
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setSubmitted(true);
    };

    const selectedCC = countryCodes.find(c => c.code === form.countryCode) || countryCodes[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                style={{ animation: 'modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
                onClick={e => e.stopPropagation()}
            >
                <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.88) translateY(24px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

                <div className="px-8 pt-8 pb-6 text-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)' }}>
                    <div className="text-5xl mb-3">{flag}</div>
                    <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Enrol in {language}</h2>
                    <p className="text-white/55 text-sm mt-1">Start with a free demo class — no commitment needed</p>
                </div>

                {!submitted ? (
                    <div className="px-8 py-7 space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Arjun Sharma"
                                className={`w-full border-2 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white'}`}
                                value={form.name}
                                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="e.g. arjun@email.com"
                                className={`w-full border-2 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white'}`}
                                value={form.email}
                                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mobile Number</label>
                            <div className={`flex border-2 rounded-xl overflow-visible transition ${errors.phone ? 'border-red-400' : 'border-gray-200 focus-within:border-red-400'}`}>
                                <div className="relative flex-shrink-0">
                                    <button
                                        type="button"
                                        className="flex items-center gap-1.5 px-3 py-3 bg-gray-100 hover:bg-gray-200 transition text-sm font-semibold text-gray-700 h-full border-r border-gray-200 rounded-l-xl"
                                        onClick={() => setCcOpen(o => !o)}
                                    >
                                        <span className="text-base">{selectedCC.flag}</span>
                                        <span className="text-xs">{selectedCC.code}</span>
                                        <svg className={`w-3 h-3 text-gray-400 transition-transform ${ccOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {ccOpen && (
                                        <div className="absolute top-full left-0 z-[60] bg-white border border-gray-200 rounded-2xl shadow-2xl mt-2 w-52 max-h-56 overflow-y-auto">
                                            {countryCodes.map(cc => (
                                                <button
                                                    key={cc.code + cc.country}
                                                    type="button"
                                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-rose-50 transition first:rounded-t-2xl last:rounded-b-2xl"
                                                    onClick={() => { setForm(f => ({ ...f, countryCode: cc.code })); setCcOpen(false); }}
                                                >
                                                    <span className="text-base">{cc.flag}</span>
                                                    <span className="font-semibold text-gray-800">{cc.code}</span>
                                                    <span className="text-gray-400 text-xs ml-auto">{cc.country}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    className="flex-1 px-4 py-3 text-sm text-gray-800 outline-none bg-gray-50 rounded-r-xl"
                                    value={form.phone}
                                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: '' })); }}
                                />
                            </div>
                            {errors.phone && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.phone}</p>}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full text-white font-black py-4 rounded-xl text-sm tracking-wide transition hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #EB6664, #c0504e)' }}
                        >
                            🎓 Book My Free Demo Class
                        </button>
                        <p className="text-center text-xs text-gray-400 leading-relaxed">No payment required. Our counselor will contact you within 2 hours.</p>
                    </div>
                ) : (
                    <div className="px-8 py-12 text-center">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(235,102,100,0.1)' }}>
                            <svg className="w-10 h-10" style={{ color: '#EB6664' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>You're booked! 🎉</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Thank you, <strong className="text-gray-800">{form.name}</strong>!<br />
                            We'll call you at <strong className="text-gray-800">{form.countryCode} {form.phone}</strong><br />
                            within 2 hours to confirm your free {language} demo.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-7 text-white font-bold px-10 py-3.5 rounded-xl text-sm hover:opacity-90 transition"
                            style={{ background: '#EB6664' }}
                        >
                            Close
                        </button>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const LanguageDetailsPage = () => {
    const [searchParams] = useSearchParams();
    const labelParam = searchParams.get('label');
    const languageParam = searchParams.get('language');

    const languageInfo = findLanguageDetails(labelParam, languageParam);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [languageData, setLanguageData] = useState(null);

    useEffect(() => {
        if (!labelParam || !languageParam) {
            setError('Missing required parameters. Please provide both label and language.');
            setLoading(false);
            return;
        }

        const found = findLanguageDetails(labelParam, languageParam);
        if (!found) {
            setError(`Language "${languageParam}" not found in "${labelParam}" track.`);
            setLoading(false);
            return;
        }

        const content = getLanguageContent(found.language);
        setLanguageData({ ...found, content });
        setLoading(false);
    }, [labelParam, languageParam]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading language details...</p>
                </div>
            </div>
        );
    }

    if (error || !languageData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Language Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'Language data not available'}</p>
                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Available Languages:</p>
                        {languageTracks.map((track) => (
                            <div key={track.label} className="mb-2">
                                <p className="text-xs font-medium text-blue-600">{track.label}:</p>
                                <p className="text-xs text-gray-600">{track.items.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => window.location.href = '/languages'}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse All Languages
                    </button>
                </div>
            </div>
        );
    }

    const { language, trackLabel, trackEmoji, content } = languageData;

    return (
        <>
            <Header />
            <NavImage />
            <div className="min-h-screen bg-stone-50">
                <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3.serif { font-family: 'Playfair Display', serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(0,0,0,0.09); }
        .section-title { font-family: 'Playfair Display', serif; }
      `}</style>

                {/* ══ HERO SECTION ══════════════════════════════════════════════════════════════ */}
                <section className={`relative bg-gradient-to-br ${content.bgGradient} overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
                        <span className="text-[28rem] opacity-[0.04] pr-8 leading-none">{content.flag}</span>
                    </div>
                    <div className="absolute top-0 right-0 w-1.5 h-full" style={{ background: '#EB6664' }}></div>
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }}></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">


                        <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-center min-h-[520px]">
                            <div>
                                <div className="flex items-end gap-5 mb-8">
                                    {/* <span className="text-6xl md:text-7xl leading-none drop-shadow-2xl">{content.flag}</span> */}
                                    <div>
                                        <p className="text-white/35 text-xs uppercase tracking-[0.3em] mb-1.5">{trackEmoji} {trackLabel}</p>
                                        <h1 className="text-6xl md:text-7xl xl:text-8xl font-black text-white leading-none section-title">
                                            {content.heroTitle}
                                        </h1>
                                    </div>
                                </div>

                                <blockquote className="pl-5 border-l-2 mb-2" style={{ borderColor: '#EB6664' }}>
                                    <p className="text-white/90 text-base md:text-lg italic font-light leading-relaxed">
                                        {content.quoteOriginal}
                                    </p>
                                </blockquote>
                                <p className="text-white/40 text-xs italic mb-10 pl-5">{content.quoteEnglish}</p>



                                <div className="flex flex-wrap gap-3 mb-8">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="flex items-center gap-2 text-white font-bold px-7 py-4 rounded-2xl text-sm tracking-wide shadow-xl transition hover:opacity-90 hover:scale-105 active:scale-95"
                                        style={{ background: 'linear-gradient(135deg, #EB6664, #c0504e)' }}
                                    >
                                        Enroll Now
                                    </button>
                                    <button className="flex gap-2 bg-white/8 backdrop-blur-sm text-white font-semibold px-7 py-4 rounded-2xl text-sm border border-white/15 hover:bg-white/15 transition">
                                        <FaDownload /> Download Syllabus
                                    </button>
                                </div>


                            </div>

                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="absolute -inset-6 rounded-[2.5rem] blur-3xl opacity-15" style={{ background: '#EB6664' }}></div>
                                    <div className="relative rounded-3xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>
                                        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/8" style={{ background: 'rgba(0,0,0,0.2)' }}>
                                            <div className="w-3 h-3 rounded-full bg-red-400/70"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-400/70"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-400/70"></div>
                                            <span className="ml-4 text-white/25 text-xs font-mono tracking-widest">{language.toLowerCase()}_intro.lang</span>
                                        </div>
                                        <div className="p-8">
                                            <div className="text-center mb-6">
                                                <div className="text-7xl mb-3">{content.flag}</div>
                                                <div className="text-white/50 text-xs uppercase tracking-[0.35em] font-light">{language.toUpperCase()}</div>
                                            </div>
                                            <div className="flex items-center gap-3 mb-7">
                                                <div className="flex-1 h-px bg-white/8"></div>
                                                <span className="text-white/15 text-xs">◆</span>
                                                <div className="flex-1 h-px bg-white/8"></div>
                                            </div>
                                            <div className="my-auto flex items-start">
                                                <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
                                                    <Typewriter lines={content.typewriterLines} speed={50} pause={2800} />
                                                </p>
                                            </div>
                                            <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                                    <span className="text-white/25 text-xs font-mono tracking-wider">LIVE</span>
                                                </div>
                                                <div className="flex gap-1.5">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" style={{ animationDelay: `${i * 0.25}s` }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden relative z-10 mx-6 mb-10">
                        <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-white/30 text-xs font-mono">LIVE</span>
                            </div>
                            <p className="text-white/75 text-sm leading-relaxed min-h-10">
                                <Typewriter lines={content.typewriterLines} speed={55} pause={2500} />
                            </p>
                        </div>
                    </div>
                </section>

                {/* ══ WHAT WE TEACH SECTION ═══════════════════════════════════════════════════ */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <div className="text-center mb-14">
                        <p className="text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: '#EB6664' }}>Curriculum</p>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 section-title">What You'll Master</h2>
                        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">A comprehensive syllabus designed by language experts to take you from beginner to confident speaker</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {content.whatWeTeach.map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 card-hover group cursor-default">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: 'rgba(235,102,100,0.08)' }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{item.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="mt-5 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-16" style={{ background: '#EB6664' }}></div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: '#EB6664' }}></div>
                                    <h3 className="text-2xl font-black text-gray-900 section-title">About This Program</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{content.overview}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Format", value: "Live + Recorded" },
                                    { label: "Duration", value: "60–90 mins/class" },
                                    { label: "Frequency", value: "3–5 days/week" },
                                    { label: "Certificate", value: "Yes, recognised" },
                                    { label: "Support", value: "24/7 available" },
                                    { label: "Start", value: "Within 24 hours" },
                                ].map((item, i) => (
                                    <div key={i} className="rounded-xl p-4 bg-gray-50 border border-gray-100">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-sm font-bold text-gray-800">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ ADVANTAGES SECTION ══════════════════════════════════════════════════════ */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-14">
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: '#EB6664' }}>Why Us</p>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 section-title">Why Learn {language} With Us?</h2>
                            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">What sets our program apart from every other language school</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 mb-14">
                            {content.advantages.map((adv, i) => (
                                <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 card-hover group flex gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300" style={{ background: 'rgba(235,102,100,0.08)' }}>
                                        {adv.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 mb-2">{adv.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{adv.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-3xl p-10 text-white" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)' }}>
                            <p className="text-center text-white/35 text-xs uppercase tracking-[0.3em] mb-10">By The Numbers</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                                {content.stats.map((s, i) => (
                                    <div key={i}>
                                        <div className="text-3xl md:text-4xl font-black mb-1.5 section-title" style={{ color: '#EB6664' }}>{s.value}</div>
                                        <div className="text-white/35 text-xs uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ FEATURES SECTION ════════════════════════════════════════════════════════ */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-14">
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: '#EB6664' }}>Platform</p>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 section-title">Premium Learning Features</h2>
                            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">Everything you need to master {language} — built into one seamless platform</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                            {content.features.map((feat, i) => (
                                <div key={i} className="group relative bg-white rounded-2xl p-6 border border-gray-100 card-hover overflow-hidden cursor-default">
                                    <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, #EB6664, #f59e0b)' }}></div>
                                    <div className="text-3xl mb-4">{feat.icon}</div>
                                    <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-3xl p-10 border" style={{ background: 'rgba(235,102,100,0.04)', borderColor: 'rgba(235,102,100,0.15)' }}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                {[
                                    { value: "500+", label: "Video Lessons" },
                                    { value: "2,000+", label: "Practice Exercises" },
                                    { value: "100+", label: "Live Sessions / Year" },
                                    { value: "24/7", label: "Doubt Support" },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="text-3xl md:text-4xl font-black mb-1.5 section-title" style={{ color: '#EB6664' }}>{item.value}</div>
                                        <div className="text-gray-400 text-xs uppercase tracking-widest">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ REVIEWS SECTION ═════════════════════════════════════════════════════════ */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-14">
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: '#EB6664' }}>Testimonials</p>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 section-title">What Our Students Say</h2>
                            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">Real words from real learners on their journey to fluency</p>
                        </div>

                        <div className="bg-gray-50 rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 mb-10 flex flex-col md:flex-row gap-10 items-center">
                            <div className="text-center flex-shrink-0">
                                <div className="text-7xl font-black leading-none mb-2 section-title" style={{ color: '#EB6664' }}>4.9</div>
                                <StarRating rating={5} />
                                <p className="text-xs text-gray-400 mt-2">{content.stats[0].value} students</p>
                            </div>
                            <div className="flex-1 w-full max-w-sm">
                                {[5, 4, 3, 2, 1].map(star => {
                                    const pct = star === 5 ? 82 : star === 4 ? 14 : star === 3 ? 3 : star === 2 ? 1 : 0;
                                    return (
                                        <div key={star} className="flex items-center gap-3 mb-2.5">
                                            <span className="text-xs text-gray-500 w-3 font-semibold">{star}</span>
                                            <svg className="w-3 h-3 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                <div className="h-2.5 rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #EB6664, #f59e0b)' }}></div>
                                            </div>
                                            <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {content.testimonials.map((t, i) => (
                                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 card-hover">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EB6664, #c0504e)' }}>
                                            {t.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                                    <p className="text-xs text-gray-400">{t.city}</p>
                                                </div>
                                                <span className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0" style={{ background: 'rgba(235,102,100,0.08)', color: '#EB6664' }}>{t.course}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <StarRating rating={t.rating} />
                                    <p className="text-gray-600 text-sm leading-relaxed mt-3 italic">"{t.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ══ CTA BANNER ════════════════════════════════════════════════════════════ */}
                <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EB6664 0%, #c0504e 100%)' }}>
                    <div className="absolute inset-0 opacity-[0.07] flex items-center justify-end pointer-events-none">
                        <span className="text-[20rem] leading-none pr-8 select-none">{content.flag}</span>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black text-white section-title">Ready to start your {language} journey?</h2>
                            <p className="text-white/70 mt-2 text-sm">Join {content.stats[0].value} learners already on the path to fluency.</p>
                        </div>
                        <div className="flex flex-wrap gap-3 flex-shrink-0">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-white font-black px-8 py-4 rounded-2xl text-sm transition hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-lg"
                                style={{ color: '#EB6664' }}
                            >
                                🎓 Book Free Trial
                            </button>
                            <button className="bg-white/15 text-white font-semibold px-8 py-4 rounded-2xl text-sm border border-white/25 hover:bg-white/25 transition">
                                📥 Download Brochure
                            </button>
                        </div>
                    </div>
                </div>

                {/* ══ FAQ SECTION ════════════════════════════════════════════════════════════ */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-14">
                            <p className="text-xs uppercase tracking-[0.3em] font-bold mb-3" style={{ color: '#EB6664' }}>FAQs</p>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 section-title">Frequently Asked Questions</h2>
                            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">Everything you need to know before starting your {language} journey</p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 md:px-10 py-2 mb-10">
                                {content.faqs.map((faq, i) => (
                                    <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                                ))}
                            </div>

                            <div className="rounded-3xl p-8 text-center" style={{ background: 'rgba(235,102,100,0.05)', border: '1px solid rgba(235,102,100,0.15)' }}>
                                <div className="text-3xl mb-3">💬</div>
                                <h3 className="text-xl font-black text-gray-900 mb-2 section-title">Still have questions?</h3>
                                <p className="text-gray-500 text-sm mb-7 leading-relaxed">Our academic counselors are available 9 AM – 9 PM, 7 days a week.</p>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="text-white font-bold px-7 py-3.5 rounded-xl text-sm hover:opacity-90 transition"
                                        style={{ background: '#EB6664' }}
                                    >
                                        Book Free Demo
                                    </button>
                                    <button className="bg-white font-semibold px-7 py-3.5 rounded-xl text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                                        📞 Call Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ══ MODAL ════════════════════════════════════════════════════════════════ */}
                {showModal && (
                    <EnrollModal language={language} flag={content.flag} onClose={() => setShowModal(false)} />
                )}
            </div>
            <Footer />
        </>
    );
};

export default LanguageDetailsPage;