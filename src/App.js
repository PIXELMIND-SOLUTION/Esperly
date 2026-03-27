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

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";
    const all = document.querySelectorAll("*");
    all.forEach(el => {
      el.style.cursor = "none";
    });
  }, []);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSelectedCourse(null);
    navigate("/category");
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    navigate("/course-detail");
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedCourse(null);
    navigate("/category");
  };

  const handleBackToSubcategories = () => {
    setSelectedCourse(null);
    navigate("/category");
  };

  return (
    <div className="cursor-none">
      <CustomCursor />
      <RollingPencil/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/category" 
          element={
            selectedCategory ? (
              <Subcategory
                category={selectedCategory}
                onBack={handleBackToCategories}
                onSelectCourse={handleCourseSelect}
              />
            ) : (
              <Category onSelectCategory={handleCategorySelect} />
            )
          } 
        />
        <Route 
          path="/course-detail" 
          element={
            selectedCourse ? (
              <CourseDetail
                course={selectedCourse}
                category={selectedCategory}
                onBack={handleBackToSubcategories}
              />
            ) : (
              <Category onSelectCategory={handleCategorySelect} />
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default App;