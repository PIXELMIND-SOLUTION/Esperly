import { useState } from "react";
import Navbar from "../../components/Navbar";
import AboutUs from "./AboutUs"
import WhatWeTeach from "./WhatWeTeach"
import LoginModal from "../../modals/LoginModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavImage from "../../components/NavImage";

const About = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Header/>
            <NavImage/>
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