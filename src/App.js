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
import Layout from "./AfterLogin/views/Layout";
import Sample from "./pages/teacher/sample";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryId" element={<Subcategory onSelectCourse={handleCourseSelect} />} />
        <Route path="/course-detail/:courseId" element={<CourseDetail />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
    </div>
  );
}

export default App;