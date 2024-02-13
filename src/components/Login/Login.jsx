import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/action/actions";

export const Login = () => {
  const dispatch = useDispatch();

  const [states, setStates] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStates({
      ...states,
      [name]: value,
    });
  };

  const buttonDisabled = () => {
    let buttonAux = false;

    for (const state in states) {
      if (states[state].length <= 0) {
        buttonAux = true;
        return buttonAux;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(states));
  };

  return (
    <div className="w-screen h-screen  bg-[#FFFFFF] text-[#000000] flex justify-center items-center animate-fade animate-once animate-ease-in">
      {console.log(states)}
      <div className="flex m-5 h-[95%]">
        <div className="w-3/5 h-full">
          <img
            className="h-full object-cover rounded-l-md"
            src="src\assets\fotos\image-login.jpg"
            alt=""
          />
        </div>
        <div className="w-2/5 h-full">
          <h2 className="absolute top-32 right-60 text-3xl font-bold text-[#FFFFFF]">
            Iniciar Sesion
          </h2>
          <form
            onSubmit={handleSubmit}
            className="h-full w-full flex justify-center items-center flex-col bg-[#1E68AD] text-[#FFFFFF] text-lg pt-10 font-medium rounded-r-md"
          >
            <div className="flex flex-col gap-2 w-2/4 h-2/5 text-center items-center">
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
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C] w-60"
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
      </div>
    </div>
  );
};
