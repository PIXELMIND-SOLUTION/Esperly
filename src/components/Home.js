import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import EsperlyExperience from "../pages/Home/EsperlyExperiance";
import Hero from "../pages/Home/Hero"
import StudentJourney from "../pages/Home/StudentJourney";
import WhatWeTeach from "../pages/Home/WhatWeTeach";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <Hero />
            <WhatWeTeach />
            <EsperlyExperience />
            {/* <StudentJourney /> */}
            {/* <WhatYouLookingFor/> */}


            
        </>
    )
};

export default Home;