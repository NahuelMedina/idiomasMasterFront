import { useState } from "react";
import { Link } from "react-router-dom";
import registerValidate from "../Utils/registerValidate";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/action/actions";

const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    lastname: "",
    email: "",
    img: "",
    password: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    name: "Nombre obligatorio.",
    lastname: "",
    email: "",
    password: "",
    img: "",
    age: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target);
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
    dispatch(postUser(state));
  };

  return (
    <div className="w-screen h-screen bg-[#FFFFFF] text-[#000000] flex justify-center items-center animate-fade animate-once animate-ease-in">
      {console.log(state)}
      <div className=" w-3/5 h-full">
        <img
          className="h-screen object-cover"
          src="src\assets\fotos\image-register.jpg"
          alt=""
        />
      </div>
      <div className="w-2/5 h-screen flex-col flex justify-center items-center">
        <h2 className="absolute top-28 text-3xl font-bold text-[#FFFFFF]">
          Registrarse
        </h2>
        <form
          onSubmit={handleSubmit}
          className="h-screen w-full pt-20  flex justify-center items-center flex-col text-[#FFFFFF] bg-[#1F1F1F] text-lg shadow-md shadow-[#000000] font-medium "
        >
          <div className="flex w-full h-2/4 gap-1 text-center justify-center items-center ">
            <div className="flex flex-col w-2/4 gap-2 p-8">
              <label htmlFor="name">Nombre</label>
              <input
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#1E68AD]"
                onChange={handleChange}
                name="name"
                placeholder="Nombre..."
                id="name"
                type="text"
              />
              <span style={{ color: "red" }}>{errors.name}</span>
              <label htmlFor="lastname">Apellido</label>
              <input
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#1E68AD]"
                onChange={handleChange}
                name="lastname"
                placeholder="Apellido..."
                id="lastname"
                type="text"
              />
              <span style={{ color: "red" }}>{errors.lastname}</span>
              <label htmlFor="password">Constraseña</label>
              <input
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#1E68AD]"
                onChange={handleChange}
                placeholder="Contraseña..."
                name="password"
                id="password"
                type="password"
              />
              <span style={{ color: "red" }}>{errors.password}</span>
            </div>
            <div className="flex flex-col w-2/4 gap-2 p-8">
              <label htmlFor="email">Email</label>
              <input
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#1E68AD]"
                onChange={handleChange}
                name="email"
                placeholder="Email..."
                id="email"
                type="email"
              />
              <span style={{ color: "red" }}>{errors.email}</span>
              <label htmlFor="age">Edad</label>
              <input
                className="text-black rounded-md h-8 outline-none pl-1 remove-arrow  focus:border-2 border-[#1E68AD]"
                onChange={handleChange}
                placeholder="Edad..."
                name="age"
                id="age"
                type="number"
              />
              <span style={{ color: "red" }}>{errors.age}</span>
              <label htmlFor="img">Imagen URL</label>
              <input
                className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#1E68AD]"
                onChange={handleChange}
                name="img"
                id="img"
                type="text"
              />
            </div>
          </div>
          <input
            disabled={buttonDisabled()}
            className="mt-10 relative top-5 bg-slate-600 w-40 h-11 rounded-lg cursor-pointer disabled:opacity-30	"
            type="submit"
            value="Registrarse"
          />
          <div>
            <div className="mt-20">
              <ul>
                <li>
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    className="text-[#02427F] font-bold text-xl hover:text-[#1E68AD] transition-colors	"
                    to="/login"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register
