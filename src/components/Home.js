import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import EsperlyExperience from "../pages/Home/EsperlyExperiance";
import Hero from "../pages/Home/Hero"
import StudentJourney from "../pages/Home/StudentJourney";
import WhatWeTeach from "../pages/Home/WhatWeTeach";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdScroller from "../pages/Home/AdBanner";
import ExperienceSection from "../pages/Home/ExperianceSection";
import Pillars from "../pages/Home/Pillars";
import TracksSection from "../pages/Home/TracksSection";
import StoriesSection from "../pages/Home/StoriesSection";
import NavImage from "./NavImage";
import ZoomDesign from "../pages/Home/ZoomDesign";
import HeroPage from "../Homescreen/Heropage";
import PillarsPage from "../Homescreen/PillarsPage";
import BookDesign from "../Homescreen/BookDesign";
import MeetScreen from "../Homescreen/MeetScreen";
import MeetImg from "../Homescreen/MeetImg";
import StaircaseChart3D from "../Homescreen/JourneyPage";
import StepsImage from '../Homescreen/StepImage'
import ExperianceCount from "../Homescreen/ExperianceCount";
import TrustAndSupport from "../Homescreen/ExpertTrack";
import Testimonioals from "../Homescreen/Testimonials";
import ScrollBanner from "../Homescreen/ScrolleBanner";
import FlashBanner from "../Homescreen/FlashBanner";
import MeetVideo from "../Homescreen/MeetVideo";
import OnboardingJourney from "../Homescreen/JourneyPage";
import NewHero from "../Homescreen/NewHero";
import Header from "./Header";
import WordOfLearning from "../Homescreen/WordOfLearning";
import StepsToSuccess from "../Homescreen/StepsToSuccess";
import Impact from "../Homescreen/Impact";
import TeacherTestimonials from "../Homescreen/TeacherTestimonials";
import ParentTestimonials from "../Homescreen/ParentTestimonials";
import TrustSupport from "../Homescreen/ExpertTrack";

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Header />
            <main className="pt-[70px]">
                {/* <Navbar /> */}
                {/* <NavImage /> */}
                {/* <Hero /> */}
                {/* <HeroPage /> */}
                <NewHero />
                <PillarsPage />
                <WordOfLearning />
                {/* <BookDesign /> */}
                <FlashBanner />
                <StepsToSuccess />
                {/* <StepsImage /> */}
                {/* <OnboardingJourney/> */}
                {/* <StaircaseChart3D /> */}
                <Impact />
                {/* <ExperianceCount /> */}
                {/* <MeetImg /> */}
                {/* <MeetVideo /> */}
                <TrustSupport />
                <ScrollBanner />
                <TeacherTestimonials />
                <ParentTestimonials />
                {/* <Testimonioals /> */}
                {/* <MeetScreen/> */}
                {/* <WhatWeTeach />
            <ZoomDesign/>
            <AdScroller />
            <ExperienceSection />
            <PillarsSection />
            <TracksSection /> */}
                {/* <StoriesSection /> */}
                {/* <EsperlyExperience /> */}
                {/* <StudentJourney /> */}
                {/* <WhatYouLookingFor/> */}
                <Footer />
            </main>



        </>
    )
};

export default Home;