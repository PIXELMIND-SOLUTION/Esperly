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
import JourneyPage from "../Homescreen/JourneyPage";

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <NavImage />
            {/* <Hero /> */}
            <HeroPage />
            <PillarsPage />
            <BookDesign />
            <JourneyPage />
            <MeetImg />
            {/* <MeetScreen/> */}
            {/* <WhatWeTeach />
            <ZoomDesign/>
            <AdScroller />
            <ExperienceSection />
            <PillarsSection />
            <TracksSection />
            <StoriesSection /> */}
            {/* <EsperlyExperience /> */}
            {/* <StudentJourney /> */}
            {/* <WhatYouLookingFor/> */}
            <Footer />



        </>
    )
};

export default Home;