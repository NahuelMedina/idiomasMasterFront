import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";



export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth0();
 const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log("User disconnected.");
      });
    }

    logout({ returnTo: window.location.origin });
    localStorage.removeItem("auth");
    navigate("/home");
  };

  return (
    <div className="flex h-[80px] w-full justify-between items-center text-white bg-black">
      <div className="flex items-center justify-evenly w-[700px] h-full ">
        <Link to="/" className="h-full">
          <div className="flex items-center justify-center h-full w-[60px]">
            <img className="w-32" src="src/assets/logo/logo4.png" alt="Logo" />
          </div>
        </Link>

        <Link to="/about" className="h-full">
          <div className="flex items-center justify-evenly h-full w-[250px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1 className="text-[20px]">Sobre Nosotros</h1>
            <BsFillInfoSquareFill className="text-[40px]" />
          </div>
        </Link>

        <Link to="/home" className="h-full">
          <div className="flex items-center justify-evenly h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1 className="text-[20px]">Cursos</h1>
            <FaDiscourse className="text-[40px]" />
          </div>
        </Link>

        {isAuthenticated && (
          <Link to="/createCourse" className="h-full">
            <div className="flex items-center justify-center h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
              <h1>Crear Curso</h1>
            </div>
          </Link>
        )}
      </div>

      <Link to='/favorite'>
        <button title="Favoritos"><FaHeart className=" text-red-600 m-6 text-[40px]" /> </button>
      </Link>
      {isAuthenticated && (
        <Link to='/cart'>
          <img style={{width:'38px'}} src="src\assets\fotos\cart.png" alt="" />
        </Link>
      )}

      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <div className=" relative flex flex-row items-center justify-evenly w-[400px] h-full mr-[80px]">
          <Link to="/login" className=" w-full h-full flex flex-row items-center">
            <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
              <h1 className="text-[20px]">Ingresa</h1>
              <IoLogIn className="text-[40px]" />
            </div>
          </Link>
          <button onClick={handleLogout} className="w-full h-full flex flex-row items-center">
            <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
              <h1>Cerrar Sesión</h1>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
