import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./pages/About/AboutUs";
import About from "./pages/About/About";
import CustomCursor from "./views/CustomCursor";
import { useEffect } from "react";
import "./App.css";
import Contact from "./pages/contact/Contact";
import Category from "./pages/category/Category";

function App() {

  useEffect(() => {
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    const all = document.querySelectorAll("*");
    all.forEach(el => {
      el.style.cursor = "none";
    });
  }, []);
  return (
    <div className="cursor-none">
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </div>
  );
}
export default App;