import { Link, NavLink, useLocation } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { FaUserGraduate } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";



export const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex h-20 justify-between items-center text-white bg-black">
      <div className="flex items-center justify-evenly w-[700px] h-full ">
        <Link to="/" className="h-full">
          <div className="flex items-center justify-center h-full w-[60px]">
            <img
              className="w-32"
              src="src\assets\logo\logo4.png"
            ></img>
          </div>
        </Link>

        <Link to="/about" className="h-full">
          <div className="flex items-center justify-center h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1>Sobre Nosotros</h1>
          </div>
        </Link>
        <Link to="/home" className="h-full">
          <div className="flex items-center justify-center h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1>Cursos</h1>
          </div>
        </Link>

        <Link to="/createCourse" className="h-full">
          <div className="flex items-center justify-center h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1>Crear Curso</h1>
          </div>
        </Link>
      </div>
      <div>
        {location.pathname !== "/" ? <SearchBar></SearchBar> : <Link></Link>}
      </div>
      <div>
        <Link to='/cart' > 
            {location.pathname !=='/' && location.pathname !== '/createCourse' ? (
              <TiShoppingCart />
           ) : null }
        </Link>
      </div>
      {location.pathname !== "/register" && location.pathname !== "/login" ? (
        <div className=" relative flex flex-row items-center justify-evenly w-[200px] h-full mr-[80px]">
          <Link
            to="/register"
            className=" w-full h-full flex flex-row items-center"
          >
            <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
              <h1>Registrate</h1>
              <FaUserGraduate className="text-[40px]" />
            </div>
          </Link>
        </div>
      ) : (
        <Link></Link>
      )}
    </div>
  );
};
