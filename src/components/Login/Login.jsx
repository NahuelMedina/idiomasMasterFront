import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, setUserdata } from "../../redux/action/actions";
import LoginButton from "../../googleLogin";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useEffect, useState } from "react";
import { getmailUser } from "../Admin/userData";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userData);
  const { t , i18n} = useTranslation()

  const [userData, setUserDataLocally] = useLocalStorage("userData", {
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataLocally({ ...userData, [name]: value });
  };

  const buttonDisabled = () => {
    let buttonAux = false;

    for (const user in userData) {
      if (userData[user].length <= 0) {
        buttonAux = true;
        return buttonAux;
      }
    }
  };
  console.log(userData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form with data:", userData);
      const response = await getmailUser({
        email: userData.email,
        password: userData.password,
      });
      console.log("Response from server:", response.data);

      if (response.status === 200) {
        const updatedUserData = {
          ...userData,
          ...response.data,
          isAuthenticated: true,
        };
        setUserDataLocally(updatedUserData);
        dispatch(setUserdata(updatedUserData));
        Swal.fire({
          icon: 'success',
          title: t("LOGUEADO"), 
          showConfirmButton: false,
          timer: 2200
        });;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: t("ERROR_AL_INGRESAR"),
        text: t("ERROR_AL_INICIAR_SESION")
      })
    }
  };

  return (
    <div className="w-full h-full mt-[80px] bg-[#FFFFFF] text-[#000000] flex justify-center items-center animate-fade animate-once animate-ease-in">
      <div className="flex m-5 h-[95%]">
        <div className="w-3/5 h-full">
          <img
            className="h-full object-cover rounded-l-md"
            src="img\image-login.jpg"
            alt=""
          />
        </div>
        <div className="w-2/5 h-full">
          <h1 className="absolute top-32 right-60 text-3xl font-bold text-[#FFFFFF]">
          {t("INICIAR_SESION")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="h-full w-full flex justify-center items-center flex-col bg-[#1E68AD] text-[#FFFFFF] text-lg pt-10 font-medium rounded-r-md m-0" // Añadir clase m-0 aquí
          >
            <div className="flex flex-col gap-2 w-2/4 h-2/6 text-center items-center">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C] w-60"
                name="email"
                placeholder="Email..."
                id="email"
                type="email"
              />
              <label htmlFor="password"><h1>{t("CONTRASENA")}</h1></label>
              <input
                onChange={handleChange}
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C] w-60 mb-2" // Añadir margen inferior aquí
                name="password"
                placeholder={t("CONTRASENA")}
                id="password"
                type="password"
              />
            </div>
            <input
              disabled={buttonDisabled()}
              className="mb-8 bg-[#FFFFFF] text-[#000000] w-40 h-11 rounded-lg cursor-pointer disabled:opacity-30 transition-colors hover:bg-[#FF6B6C] hover:text-[#FFFFFF]"
              type="submit"
              value={t("INICIAR_SESION")}
            />
            <LoginButton />
            <div>
              <div className="mt-2 ">
                <ul>
                  <li className="flex m-2">
                  <h1>{t("NO_TIENES_CUENTA")}</h1>
                    <Link
                      className="text-[#000000] ml-2 font-semibold text-l hover:text-[#FF6B6C] transition-colors"
                      to="/register"
                    >
                      <h1>{t("REGISTRATE")}</h1>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
