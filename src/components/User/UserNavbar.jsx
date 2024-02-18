import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";
import LogoutButton from '../Login/LogOut';
import { useLocalStorage } from '../../CustomHook/UseLocalStorage';
import logo4 from '../../../public/img/logo4.png'

export default function UserNavbar () {
  const { user, isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const [userData] = useLocalStorage("userData", {});
  const defaultAvatarUrl = 'https://www.pngitem.com/pimgs/m/508-5087236_tab-profile-f-user-icon-white-fill-hd.png';
  
  
  return (
    <div className="flex h-[80px] w-full justify-between items-center text-white bg-black">
      <div className="flex items-center justify-start w-[50%] h-full">
        <Link to="/user/home" className="h-full">
          <div className="flex items-center justify-center h-full w-[60px]">
            <img className="w-32" src={logo4} alt="Logo" />
          </div>
        </Link>

        <Link to="/home" className="h-full">
          <div className="flex items-center justify-evenly h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1 className="text-[20px]">Cursos</h1>
            <FaDiscourse className="text-[40px]" />
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-end w-[50%] h-full">
        <Link to="/cart">
          <div className="flex items-center justify-evenly h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <img style={{width:'38px'}} src="src\assets\fotos\cart.png" alt="" />
          </div>
        </Link>

        <Link to="/favorite">
          <div className="flex items-center justify-evenly h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <FaHeart className="text-[25px]"/>
          </div>
        </Link>

        <Link to="/configuracion">
          <div className="flex items-center justify-evenly h-full w-[150px] transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-white border-t-[4px]">
            <h1 className="text-[28px]">⚙</h1>
            <img src={userData?.img || user?.picture || defaultAvatarUrl} style={{width:'28px', borderRadius:'50%', position:'relative', top:'2px', left:'-20px'}} alt="" />
          </div>
        </Link>

        <Link to="/" onClick={() => logout()}>
          <div className="flex items-center justify-evenly h-10 w-200 transition-colors duration-300 ease-in-out border-b-4 border-black hover:border-none border-t-[4px]">
            <LogoutButton />
          </div>
        </Link>
      </div>
    </div>
  );
};
