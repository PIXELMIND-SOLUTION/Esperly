import EsperlyExperience from "../pages/Home/EsperlyExperiance";
import Hero from "../pages/Home/Hero"
import StudentJourney from "../pages/Home/StudentJourney";
import WhatWeTeach from "../pages/Home/WhatWeTeach";
import WhatYouLookingFor from "../pages/Home/WhatYouLookinFor";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <WhatWeTeach />
            <EsperlyExperience/>
            {/* <StudentJourney /> */}
            {/* <WhatYouLookingFor/> */}
        </>
    )
};

export default Home;