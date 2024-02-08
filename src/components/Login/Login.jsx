import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
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

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
      {console.log(states)}
      <h2 className="relative top-14 text-3xl font-bold">Iniciar Sesion</h2>
      <form className="w-3/6 h-4/5 flex justify-center items-center flex-col bg-stone-900 rounded-lg text-lg pt-10 shadow-lg shadow-indigo-950 font-medium">
        <div className="flex flex-col gap-2 w-2/4 h-2/5 text-center items-center">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-indigo-600 w-60"
            name="email"
            id="email"
            type="email"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-indigo-600 w-60"
            name="password"
            id="password"
            type="password"
          />
        </div>
        <input
          disabled={buttonDisabled()}
          className="mt-10 bg-slate-600 w-40 h-11 rounded-lg cursor-pointer disabled:opacity-30"
          type="submit"
          value="Iniciar Sesion"
        />
      </form>
      <div className="mt-2">
        <ul>
          <li>
            ¿No tienes cuenta?{" "}
            <Link
              className="text-indigo-600 font-semibold text-base hover:text-indigo-400 transition-colors"
              to="/register"
            >
              Registrate
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
