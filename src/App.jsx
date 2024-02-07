import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Navbar, Landing, FalsoHome, Register, Login } from "./components";
=======
import "./App.css";
import { Navbar, Landing, FalsoHome, Detail } from "./components";

>>>>>>> 3f73ac229de72e66f06dae29e63c58a9d2a969dd
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<FalsoHome />} />
<<<<<<< HEAD
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
=======
        <Route path="/detail/:id" element={<Detail />} />
>>>>>>> 3f73ac229de72e66f06dae29e63c58a9d2a969dd
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
