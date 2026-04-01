import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import EsperlyExperience from "../pages/Home/EsperlyExperiance";
import Hero from "../pages/Home/Hero"
import StudentJourney from "../pages/Home/StudentJourney";
import WhatWeTeach from "../pages/Home/WhatWeTeach";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdScroller from "../pages/Home/AdBanner";

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <Hero />
            <WhatWeTeach />
            <AdScroller/>
            <EsperlyExperience />
            {/* <StudentJourney /> */}
            {/* <WhatYouLookingFor/> */}
            <Footer/>


            
        </>
    )
};

export default Home;