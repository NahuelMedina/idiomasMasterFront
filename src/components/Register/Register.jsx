import { useState } from "react";
import { Link } from "react-router-dom";
import registerValidate from "../Utils/registerValidate";
import { useDispatch } from "react-redux";
import { register } from "../../redux/action/actions";
export const Register = () => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setState({ ...state, img: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
    dispatch(register(state));
  };

  return (
    <div className="w-screen h-screen bg-[#FFFFFF] text-[#000000] flex justify-center items-center flex-col">
      {console.log(state)}
      <h2 className="relative top-14 text-3xl font-bold text-[#FFFFFF]">
        Registrarse
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-3/6 h-4/5 flex justify-center items-center flex-col text-[#FFFFFF] bg-[#1F1F1F] rounded-lg text-lg pt-10 shadow-md shadow-[#000000] font-medium "
      >
        <div className="flex w-full h-2/4 gap-5 text-center justify-center items-center ">
          <div className="flex flex-col w-2/4 gap-2 p-8">
            <label htmlFor="name">Nombre</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
              onChange={handleChange}
              name="name"
              placeholder="Nombre..."
              id="name"
              type="text"
            />
            <span style={{ color: "red" }}>{errors.name}</span>
            <label htmlFor="lastname">Apellido</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
              onChange={handleChange}
              name="lastname"
              placeholder="Apellido..."
              id="lastname"
              type="text"
            />
            <span style={{ color: "red" }}>{errors.lastname}</span>
            <label htmlFor="password">Constraseña</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
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
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
              onChange={handleChange}
              name="email"
              placeholder="Email..."
              id="email"
              type="email"
            />
            <span style={{ color: "red" }}>{errors.email}</span>
            <label htmlFor="age">Edad</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 remove-arrow  focus:border-2 border-[#FF6B6C]"
              onChange={handleChange}
              placeholder="Edad..."
              name="age"
              id="age"
              type="number"
            />
            <span style={{ color: "red" }}>{errors.age}</span>
            <label htmlFor="img">Imagen</label>
            <input
              className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
              onChange={handleFileChange}
              name="img"
              id="img"
              type="file"
            />
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
              className="text-[#000000] font-semibold text-base hover:text-[#FF6B6C] transition-colors	"
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
