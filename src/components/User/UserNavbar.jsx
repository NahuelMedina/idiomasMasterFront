import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";
import LogoutButton from "../Login/LogOut";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";

export default function UserNavbar() {
  const { user, isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const [userData] = useLocalStorage("userData", {});
  const defaultAvatarUrl =
    "https://www.pngitem.com/pimgs/m/508-5087236_tab-profile-f-user-icon-white-fill-hd.png";

  return (
    <div className="flex h-[80px] fixed z-20  top-0 w-full items-center justify-between text-white bg-[#000000e1] border-[#ffffff] border-b-2 border-solid">
      <div className="flex ml-2 items-center justify-around h-full gap-10">
        <Link to="/" className="h-full flex justify-center items-center">
          <img className="w-16" src="public\img\logo4.png" alt="Logo" />
        </Link>

        <Link to="/user/home" className="h-full flex items-center">
          Cursos
          <FaDiscourse className="text-[30px] ml-1" />
        </Link>
      </div>

      <div className="flex items-center justify-around h-full w-[40%]">
        <Link to="/cart">
          <img className="w-[38px]" src="public\img\cart.png" alt="" />
        </Link>

        <Link to="/favorite">
          <FaHeart className="text-[25px] text-red-700" />
        </Link>

        <Link
          to="/configuracion"
          className="flex items-center text-[28px] justify-center gap-9"
        >
          ⚙
          <img
            src={userData?.img || user?.picture || defaultAvatarUrl}
            style={{
              width: "28px",
              borderRadius: "50%",
              position: "relative",
              top: "2px",
              left: "-20px",
            }}
            alt=""
          />
        </Link>
        <Link to="/" onClick={() => logout()}>
          <LogoutButton />
        </Link>
      </div>
    </div>
  );
}
