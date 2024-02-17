import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";
import LogoutButton from '../Login/LogOut';

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  
  return (
    <div className="flex h-[80px] w-full justify-between items-center text-white bg-black">
      <div className="flex items-center justify-start w-[50%] h-full">
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

      <div className="flex items-center justify-end w-[50%] h-full">
        {isAuthenticated && (
          <Link to='/favorite'>
            <button title="Favoritos"><FaHeart className="text-red-600 mr-10 mt-1.5 text-[30px]" /> </button>
          </Link>
        )}
        {isAuthenticated && (
          <Link to='/cart'>
            <img style={{width:'68px'}} src="src\assets\fotos\cart.png" alt="" />
          </Link>
        )}
        {isAuthenticated && (
          <div className="relative flex flex-row items-center justify-evenly w-[200px] h-full mr-[80px]">
            <Link to="/configuracion">
              <h2 className="text-[30px]">⚙️</h2>
            </Link>
          </div>
        )}
        {!isAuthenticated && location.pathname !== "/register" && location.pathname !== "/login" && (
          <div className=" relative flex flex-row items-center justify-evenly w-[400px] h-full mr-[80px]">
            <Link to="/login" className=" w-full h-full flex flex-row items-center">
              <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
                <h1 className="text-[20px]">Ingresa</h1>
                <IoLogIn className="text-[40px]" />
              </div>
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <Link to="/" onClick={() => logout()} className=" w-full h-full flex flex-row items-center">
            <div className="flex items-center justify-evenly h-10 w-200 transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-none border-t-[4px]">
              <LogoutButton />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
