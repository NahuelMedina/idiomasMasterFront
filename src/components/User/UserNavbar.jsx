import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { FaDiscourse } from "react-icons/fa6";
import { BsFillInfoSquareFill } from "react-icons/bs";
import "../"



export default function UserNavbar () {
  const location = useLocation();
  return (
    <div className="flex h-[80px] w-full justify-between items-center text-white bg-black">
      <div className="flex items-center justify-evenly w-[700px] h-full ">
        <Link to="/" className="h-full">
          <div className="flex items-center justify-center h-full w-[60px]">
            <img
              className="w-32"
              src="img/logo4.png"
            ></img>
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
      </div>
      
      {location.pathname !== "/register" && location.pathname !== "/login" ? (
        <div className=" relative flex flex-row items-center justify-evenly w-[400px] h-full mr-[80px]">
          <Link
            to="/login"
            className=" w-full h-full flex flex-row items-center"
          >
            <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
              <h1 className="text-[20px]">Ingresa</h1>
              <IoLogIn  className="text-[40px]" />
            </div>
          </Link>

          <Link
            to="/register"
            className=" w-full h-full flex flex-row items-center"
          >
            <div className="flex items-center justify-evenly h-full w-full transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
              <h1 className="text-[20px]">Registrate</h1>
              <PiStudentBold className="text-[40px]" />
            </div>
          </Link>
        </div>
      ) : (
        <Link></Link>
      )}
    </div>
  );
};
