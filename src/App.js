import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./pages/About/AboutUs";
import About from "./pages/About/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About/>}/>
      </Routes>
    </>
  );
}
export default App;