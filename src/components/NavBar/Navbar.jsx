import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { FaUserGraduate } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { gapi } from "gapi-script";
import LogoutButton from '../Login/LogOut';


export const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const logOut = () => {
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

  useEffect(() => {
    console.log("Valor actualizado de auth:", auth);
  }, [auth]);

  const location = useLocation();
  return (
    <div className="flex h-20 w-screen justify-between items-center text-white bg-black">
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
          <Link to="/configuracion">
            <h2 className="text-[30px]">⚙️</h2>
          </Link>
          {/* Agregar el enlace para cerrar sesión */}
          <Link>
        </Link>
          <Link to="/" onClick={logOut} className=" w-full h-full flex flex-row items-center">
            <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <LogoutButton />
            </div>
          </Link>
        </div>
      ) : (
        <Link></Link>
      )}
    </div>
  );
};
