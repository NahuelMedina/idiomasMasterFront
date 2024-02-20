import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, setUserdata } from "../../redux/action/actions";
import LoginButton from "../../googleLogin";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useEffect, useState } from "react";
import { getmailUser } from "../Admin/userData";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userData);

  const [userData, setUserDataLocally] = useLocalStorage("userData", {
    email: "",
    password: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: "green",
    color: "white",
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
        Toast.fire({
          icon: "success",
          title: "Logueado con exito",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="w-full h-screen mt-[80px] bg-[#FFFFFF] text-[#000000] flex justify-center items-center animate-fade animate-once animate-ease-in">
      <div className="flex m-5 h-[95%]">
        <div className="w-[70%] h-full">
          <img
            className="h-full object-cover rounded-l-md"
            src="img\image-login.jpg"
            alt=""
          />
        </div>
        <div className="w-[40%] h-full">
          <form
            onSubmit={handleSubmit}
            className="h-full w-full flex justify-center items-center flex-col bg-[#1E68AD] text-[#FFFFFF] font-medium rounded-r-md" // Añadir clase m-0 aquí
          >
            <img className="w-[20%]" src="/public/img/logo4.png" alt="" />
            <h2 className="font-bold text-3xl mb-[30px]">Iniciar Sesion</h2>
            <div className="flex flex-col gap-3 w-[330px] h-2/6 ">
              <label htmlFor="email">E-mail</label>
              <input
                onChange={handleChange}
                className="text-black h-[40px] w-[330px] pl-1 rounded-sm focus:border-2 border-[#FF6B6C]  focus:rounded-sm  "
                name="email"
                id="email"
                type="email"
              />
              <label htmlFor="password">Contraseña</label>
              <input
                onChange={handleChange}
                className="text-black h-[40px] w-[330px] pl-1 rounded-sm focus:border-2 border-[#FF6B6C] focus:rounded-sm" // Añadir margen inferior aquí
                name="password"
                id="password"
                type="password"
              />
            </div>
            <input
              disabled={buttonDisabled()}
              className=" bg-[#FFFFFF] text-[#000000] w-[330px] h-[40px] rounded-sm cursor-pointer disabled:opacity-30 transition-colors hover:bg-[#FF6B6C] hover:text-[#FFFFFF]"
              type="submit"
              value="Iniciar Sesion"
            />
            <div className="m-[20px]">
              <div>
                ¿No tienes cuenta?{" "}
                <Link
                  className="text-[#000000] font-semibold text-xl hover:text-[#FF6B6C] transition-colors"
                  to="/register"
                >
                  Registrate
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-start gap-[10px]">
              <hr className=" w-[145px] mt-[20px]" />
              <p className="mt-[8px]">O</p>
              <hr className=" w-[145px] mt-[20px]" />
            </div>
            <LoginButton />
          </form>
        </div>
      </div>
    </div>
  );
};
