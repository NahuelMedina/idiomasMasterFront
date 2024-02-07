import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Landing } from "./components";
import FalsoHome from "./components/pagination/FalsoHome";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
       // <Route path="/" element={<Landing />} />
        <Route path="/home" element={<FalsoHome />} />
      </Routes>
    </>
  );
}

export default App;

{
  /*     
        <Route path="/home" element={} />
        <Route path="/login" element={} />
        <Route path="/form" element={} />
        <Route path="/about" element={} />
        <Route path="/buyPremium" element={} />
        <Route path="/detail:id" element={} /> 
*/
}
