import { Route, Routes, useLocation } from "react-router-dom";
import {
  Navbar,
  Landing,
  HomeC,
  Register,
  Login,
  Detail,
  CourseForm,
  About,
  SearchHome,
} from "./components";
import AdminHome from "./components/Admin/adminHome";
import AdminNavbar from "./components/Admin/adminNavbar";

function App() {
  const location = useLocation();
  return (
    <div className="w-screen h-screen min-h-[750px] flex flex-col">
      <div className="w-full h-[80px]">
      {location.pathname.startsWith("/admindashboard") ? <AdminNavbar /> : <Navbar />}
      </div>
      <div className="w-full h-[95%]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<HomeC />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/createCourse" element={<CourseForm />} />
          <Route path="/search" element={<SearchHome />} />
          <Route path="/admindashboard" element={<AdminHome />} />
        </Routes>
      </div>
    </div>
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
