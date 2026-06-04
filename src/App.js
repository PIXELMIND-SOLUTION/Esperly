// App.tsx
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./pages/About/About";
import CustomCursor from "./views/CustomCursor";
import { useEffect, useState } from "react";
import Contact from "./pages/contact/Contact";
import Category from "./pages/category/Category";
import CourseDetail from "./pages/category/CourseDetails";
import Subcategory from "./pages/category/SubCategory";
import RollingPencil from "./views/RollingPencil";
import Teachers from "./pages/teacher/Teachers";
import BusBanner from "./views/BusBanner";
import ScrollToTop from "./views/ScrollToTop";
import FAQPage from "./pages/contact/FAQPage";
import WhatsAppButton from "./views/WhatsAppButton";
import SideScroller from "./views/SideScroller";
import TuitionBooking from "./pages/Tuitions/TuitionBooking";
import BoosterDetails from './pages/Tuitions/LearningBoostersDetails'
import LanguageDetailPage from "./pages/Tuitions/LanguageDetails";
import LanguageDetailsPage from "./pages/Tuitions/LanguageDetails";
import ShortTermCourseDetails from "./pages/Tuitions/ShortTermCourseDetails";
import SchoolBack from "./views/schollback";
import AllBlogs from "./pages/Blogs/AllBlogs";
import BlogDetails from "./pages/Blogs/BlogDetails";
import MathsBack from "./views/MathsBack";
import FloatingButtons from "./views/Brochure";
import DownloadBrochureButton from "./views/Brochure";
import ImageBack from "./views/ImageBack";
import SingleImageBack from "./views/SingleImageBack";

/* ── helpers ── */
const fromSession = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const toSession = (key, value) => {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota errors — silently ignore */ }
};

const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(() => fromSession("selectedCourse"));
  const navigate = useNavigate();

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    toSession("selectedCourse", course);
    navigate("/course-detail");
  };

  const handleBackToSubcategories = () => {
    setSelectedCourse(null);
    toSession("selectedCourse", null);
    navigate(-1);
  };

  return (
    <div>
      <ScrollToTop />
      {/* <CustomCursor /> */}
      {/* <RollingPencil /> */}
      {/* <BusBanner /> */}
      {/* <WhatsAppButton /> */}
      <DownloadBrochureButton />
      <WhatsAppButton />
      {/* <SideScroller /> */}
      <SingleImageBack>
        {/* <ImageBack> */}
          {/* <SchoolBack> */}
          {/* <MathsBack> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:categoryId" element={<Subcategory onSelectCourse={handleCourseSelect} />} />
            <Route path="/course-detail/:courseId" element={<CourseDetail />} />
            <Route path="/faqs" element={<FAQPage />} />

            {/* Tuition booking — matches /tuition?label=elementary-level&item=class-1 */}
            <Route path="/tuition" element={<TuitionBooking />} />
            <Route path="/booster/:boosterId" element={<BoosterDetails />} />
            <Route path="/language" element={<LanguageDetailsPage />} />
            <Route path="/course" element={<ShortTermCourseDetails />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/blogs/:slug" element={<BlogDetails />} />
          </Routes>
          {/* </MathsBack> */}
          {/* </SchoolBack> */}
        {/* </ImageBack> */}
      </SingleImageBack>
    </div>
  );
};

export default App;