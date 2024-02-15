import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { FaUserGraduate } from "react-icons/fa";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Importa useAuth0 desde el paquete de Auth0
import LogoutButton from '../Login/LogOut';

export const Navbar = () => {
  const { isAuthenticated } = useAuth0(); // Obtiene las funciones de autenticación de Auth0
  
  const logout = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log("User disconnected.");
      });
    }
  
    setAuth(null);
    localStorage.removeItem("auth");
    history.push("/home");
  };

  return (
    <div className="flex h-[80px] w-full justify-between items-center text-white bg-black">
      <div className="flex items-center justify-evenly w-[700px] h-full ">
        <Link to="/" className="h-full">
          <div className="flex items-center justify-center h-full w-[60px]">
            <img
              className="w-32"
              src="src\assets\logo\logo4.png"
              alt="Logo"
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

        {isAuthenticated && (
          <>
            <Link to="/createCourse" className="h-full">
              <div className="flex items-center justify-center h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
                <h1>Crear Curso</h1>
              </div>
            </Link>
          </>
        )}
      </div>

      {!isAuthenticated && (
        <Link to="/login" className="h-full">
          <div className="flex items-center justify-center h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1>Iniciar sesión</h1>
          </div>
        </Link>
      )}

      {isAuthenticated && (
        <div className="relative flex flex-row items-center justify-evenly w-[200px] h-full mr-[80px]">
          <Link to="/configuracion">
            <h2 className="text-[30px]">⚙️</h2>
          </Link>
          <Link to="/" onClick={() => logout()} className=" w-full h-full flex flex-row items-center">
            <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
              <LogoutButton />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

