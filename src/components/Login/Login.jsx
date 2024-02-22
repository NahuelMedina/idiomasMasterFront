import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, setUserdata } from "../../redux/action/actions";
import LoginButton from "../../googleLogin";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useEffect, useState } from "react";
import { getmailUser } from "../Admin/userData";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
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
          title: '¡Loggeado con Éxito!',
          showConfirmButton: false,
          timer: 2200
        });;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al intentar ingresar',
        text: "Error al iniciar sesión El correo electrónico/contraseña que ingresó es incorrecto. Verifique sus credenciales o intente utilizar un método diferente para iniciar sesión."
      })
    }
  };

  return (
    <div className="w-full h-[90vh] mt-[80px] grid grid-cols-2">
      <div className="w-full h-full flex relative">
        <img
          className="h-full object-cover rounded-l-md animate-fade-right animate-ease-in-out"
          src="img\image-login.jpg"
          alt=""
        />
        <div className="absolute w-full h-full bg-black/50 animate-fade-right animate-ease-in-out"></div>
      </div>
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="bg-gradient-to-r from-sky-600 to-sky-600 w-[80%] h-[80%] rounded-[20px] flex flex-col items-center shadow-lg shadow-black/50 animate-fade-left animate-ease-in-out">
          <div className=" w-[70%] h-[15%] flex items-center justify-center border-b-[1px] border-b-yellow-400">
            <h1 className="text-[40px] text-yellow-400">Inicio de Sesion</h1>
          </div>
          <form onSubmit={handleSubmit} className=" w-[80%] h-[60%] grid grid-rows-3 py-[10px]">
          <div className=" w-full h-full">
              <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                  <div className="w-[20%] h-full bg-sky-900 flex items-center justify-center">
                    <MdEmail className="text-[40px] text-white" />
                  </div>

                  <input
                    className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                    onChange={handleChange}
                    name="email"
                    placeholder="Ingresa tu Email"
                    id="email"
                    type="email"
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                {/* <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {errors.email}
                </span> */}
              </div>
            </div>
            <div className=" w-full h-full">
              <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden">
                  <div className="w-[20%] h-full bg-sky-900 flex items-center justify-center">
                    <RiLockPasswordLine className="text-[40px] text-white" />
                  </div>

                  <input
                    className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                    onChange={handleChange}
                    placeholder="Ingresa tu Contraseña"
                    name="password"
                    id="password"
                    type="password"
                  />
                </div>
              </div>
              <div className=" w-full h-[30%] flex items-center justify-center">
                {/* <span
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: "15px",
                    lineheight: ".75rem",
                  }}
                >
                  {errors.password}
                </span> */}
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <input
                  disabled={buttonDisabled()}
                  className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  type="submit"
                  value="Iniciar Sesion"
                />
              </div>
          </form>
          <div className=" w-[70%] h-[15%] flex items-center flex-col justify-evenly border-t-[1px] border-t-yellow-500">
         
          <LoginButton />
          </div>
          <div className=" w-[70%] h-[5%] flex items-center flex-col">
         
          <ul>
                  <li li className="text-white">
                    ¿No tienes cuenta?{" "}
                    <Link
                       className="text-yellow-400 font-bold text-xl hover:text-yellow-600	"
                      to="/register"
                    >
                      Registrate
                    </Link>
                  </li>
                </ul>
         </div>
        </div>
      </div>
      {/* <div className="flex m-5 h-[95%]">
        <div className="w-3/5 h-full">
          <img
            className="h-full object-cover rounded-l-md"
            src="img\image-login.jpg"
            alt=""
          />
        </div>
        <div className="w-2/5 h-full">
          <h2 className="absolute top-32 right-60 text-3xl font-bold text-[#FFFFFF]">
            Iniciar Sesion
          </h2>
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
              <label htmlFor="password">Contraseña</label>
              <input
                onChange={handleChange}
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C] w-60 mb-2" // Añadir margen inferior aquí
                name="password"
                placeholder="Contraseña..."
                id="password"
                type="password"
              />
            </div>
            <input
              disabled={buttonDisabled()}
              className="mb-8 bg-[#FFFFFF] text-[#000000] w-40 h-11 rounded-lg cursor-pointer disabled:opacity-30 transition-colors hover:bg-[#FF6B6C] hover:text-[#FFFFFF]"
              type="submit"
              value="Iniciar Sesion"
            />
            <LoginButton />
            <div>
              <div className="mt-2">
                <ul>
                  <li>
                    ¿No tienes cuenta?{" "}
                    <Link
                      className="text-[#000000] font-semibold text-xl hover:text-[#FF6B6C] transition-colors"
                      to="/register"
                    >
                      Registrate
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
};
