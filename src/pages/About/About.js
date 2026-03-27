import { useState } from "react";
import Navbar from "../../components/Navbar";
import AboutUs from "./AboutUs"
import WhatWeTeach from "./WhatWeTeach"
import LoginModal from "../../modals/LoginModal";

const About = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Navbar onOpenModal={() => setOpenModal(true)} />
            <AboutUs />
            <WhatWeTeach />
            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
};

export default About;