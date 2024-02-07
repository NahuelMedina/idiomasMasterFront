import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing, Navbar } from "./components";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
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
