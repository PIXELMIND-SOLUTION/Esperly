import { useState } from "react";
import Navbar from "../../components/Navbar";
import AboutUs from "./AboutUs"
import WhatWeTeach from "./WhatWeTeach"
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const About = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Header/>
            <AboutUs />
            <WhatWeTeach />
            <Footer/>
            <LoginModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
};

export default About;