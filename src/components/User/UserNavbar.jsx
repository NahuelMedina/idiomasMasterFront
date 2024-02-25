import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaDiscourse } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";
import LogoutButton from "../Login/LogOut";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useTranslation } from "react-i18next";
import { TiShoppingCart } from "react-icons/ti";

export default function UserNavbar() {
  const { user, isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const [userData] = useLocalStorage("userData", {});
  const { t, i18n } = useTranslation();

  const defaultAvatarUrl =
    "https://www.pngitem.com/pimgs/m/508-5087236_tab-profile-f-user-icon-white-fill-hd.png";
  const [lang, setLang] =useLocalStorage("lang", "")

    
 const handleLanguageChange = (e) => {
  const selectedLang = e.target.value;
  i18n.changeLanguage(selectedLang);
  localStorage.setItem("lang", selectedLang); 
};
useEffect(() => {
  const storedLang = localStorage.getItem("lang");
  if (storedLang ) {
    i18n.changeLanguage(storedLang);
  } 
}, [i18n]); 


  return (
    <div className="flex h-[70px] fixed z-20  top-0 w-full items-center justify-between text-white bg-[#000000d2] backdrop-blur-sm border-[#ffffff] border-b-2 border-solid">
      <div className="flex ml-2 items-center justify-around h-full gap-10">
        <Link
          to={"/user/home"}
          className="h-full flex justify-center items-center"
        >
          <img className="w-16" src="/img/logo4.png" alt="Logo" />
        </Link>

        <Link to={"/home"} className="h-full flex items-center">
          <h1>{t("CURSOS")}</h1>
          <FaDiscourse className="text-[30px] ml-1" />
        </Link>
      </div>
      <div className="flex ml-2 items-center gap-10 justify-around ">
        <select
          className="appearance-none text-white bg-[#2D2D2D] font-semibold backdrop-blur-sm  border-2 border-gray-300 rounded-lg py-2 px-4  leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
          onChange={handleLanguageChange} defaultValue={lang} 
        >
          <option value="es">
         {t("ESPAÑOL")}
          </option>
          <option value="en">
             {t("ENGLISH")}
          </option>
          <option value="it">
          {t("ITALIAN")}
          </option>
          <option value="fr">
          {t("FRENCH")}
          </option>
        </select>
          </div>

      <div className="flex items-center justify-around h-full w-[40%]">
        {/* <Link to="/cart">
          <img className="w-[38px]" src="public\img\cart.png" alt="" />
        </Link> */}
        <Link to="/cart">
          <div className="flex items-center justify-evenly h-20 w-[50px] mx-5 ">
            {/* <img style={{ width: '38px' }} src="img\cart.png" alt="" /> */}
            <TiShoppingCart className="text-[30px]"/>
          </div>
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
        {/* <Link to="/" onClick={() => logout()}>
        </Link> */}
        <LogoutButton />
      </div>
    </div>
  );
}
