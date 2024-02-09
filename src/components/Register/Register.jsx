import { useState } from "react";
import { Link } from "react-router-dom";
import registerValidate from "../Utils/registerValidate";

export const Register = () => {
  const [state, setState] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    name: "Nombre obligatorio.",
    lastName: "",
    email: "",
    password: "",
    image: "",
    age: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });

    setErrors(registerValidate({ ...state, [name]: value }));
  };

  const buttonDisabled = () => {
    let buttonAux = false;

    for (const error in errors) {
      if (errors[error]) {
        buttonAux = true;
        return buttonAux;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
      <h2 className="relative top-14 text-3xl font-bold">Registrarse</h2>
      <form
        onChange={handleSubmit}
        className="w-3/6 h-4/5 flex justify-center items-center flex-col bg-stone-900 rounded-lg text-lg pt-10 shadow-lg shadow-indigo-950 font-medium "
      >
        <div className="flex w-full h-2/4 gap-20 text-center justify-center items-center ">
          <div className="flex flex-col w-2/4 gap-2 p-8">
            <label htmlFor="name">Nombre</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-indigo-600"
              onChange={handleChange}
              name="name"
              id="name"
              type="text"
            />
            <span style={{ color: "red" }}>{errors.name}</span>
            <label htmlFor="lastName">Apellido</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-indigo-600"
              onChange={handleChange}
              name="lastName"
              id="lastName"
              type="text"
            />
            <span style={{ color: "red" }}>{errors.lastName}</span>
            <label htmlFor="password">Constraseña</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-indigo-600"
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
            />
            <span style={{ color: "red" }}>{errors.password}</span>
          </div>
          <div className="flex flex-col w-2/4 gap-2 p-8">
            <label htmlFor="email">Email</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-indigo-600"
              onChange={handleChange}
              name="email"
              id="email"
              type="email"
            />
            <span style={{ color: "red" }}>{errors.email}</span>
            <label htmlFor="age">Edad</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 remove-arrow  focus:border-2 border-indigo-600"
              onChange={handleChange}
              name="age"
              id="age"
              type="number"
            />
            <span style={{ color: "red" }}>{errors.age}</span>
            <label htmlFor="image">Imagen</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-indigo-600"
              onChange={handleChange}
              name="image"
              id="image"
              type="text"
            />
            <span style={{ color: "red" }}>{errors.image}</span>
          </div>
        </div>
        <input
          disabled={buttonDisabled()}
          className="mt-10 relative top-5 bg-slate-600 w-40 h-11 rounded-lg cursor-pointer disabled:opacity-30	"
          type="submit"
          value="Registrarse"
        />
      </form>
      <div className="mt-2">
        <ul>
          <li>
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="text-indigo-600 font-semibold text-base hover:text-indigo-400 transition-colors	"
              to="/login"
            >
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
