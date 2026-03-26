import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import EsperlyExperience from "../pages/Home/EsperlyExperiance";
import Hero from "../pages/Home/Hero"
import StudentJourney from "../pages/Home/StudentJourney";
import WhatWeTeach from "../pages/Home/WhatWeTeach";
import WhatYouLookingFor from "../pages/Home/WhatYouLookinFor";
import Navbar from "./Navbar";

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <Hero />
            <WhatWeTeach />
            <EsperlyExperience />
            {/* <StudentJourney /> */}
            {/* <WhatYouLookingFor/> */}


            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
};

export default Home;