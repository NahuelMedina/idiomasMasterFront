import { Route, Routes } from "react-router-dom";
import {
  Navbar,
  Landing,
  Register,
  Login,
  Detail,
} from "./components";
import CourseForm from "./components/CourseForm/CourseForm";
import { About } from "./components/About/About";
import HomeC from "./components/pagination/HomeC";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeC />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/createCourse" element={<CourseForm />} />
      </Routes>
    </>
  );
}

export default App;

{
  /*     
        <Route path="/home" element={} />
        <Route path="/login" element={} />
        <Route path="/about" element={} />
        <Route path="/buyPremium" element={} />
        <Route path="/detail:id" element={} /> 
*/
}
