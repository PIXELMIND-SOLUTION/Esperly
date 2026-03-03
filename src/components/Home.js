import Hero from "../pages/Home/Hero"
import WhatYouLookingFor from "../pages/Home/WhatYouLookinFor";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <WhatYouLookingFor/>
        </>
    )
};

export default Home;