import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerValidate from "../Utils/registerValidate";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/action/actions";
import Swal from "sweetalert2";
import "./ColoredToast.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.postStatus);
  const postError = useSelector((state) => state.postError);
  const [status, setStatus] = useState(postStatus);
  const [state, setState] = useState({
    name: "",
    lastname: "",
    email: "",
    img: "",
    password: "",
    age: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });

    setErrors(registerValidate({ ...state, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setState((prevState) => ({
          ...prevState,
          img: reader.result,
        }));
      };
    }
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
    if (postError === null) {
      Toast.fire({
        icon: "success",
        title: "Usuario creado con Exito",
      });
      setStatus(false);
    } else {
      Toast.fire({
        icon: "error",
        title: `${postError}`,
      });
    }
  };

  return (
    <div className="w-full h-screen mt-[80px] bg-[#FFFFFF] text-[#000000] flex justify-center items-center animate-fade animate-once animate-ease-in">
      <div className="flex m-5 h-[95%]">
        <div className=" w-3/5 h-full">
          <img
            className="h-full object-cover rounded-l-md"
            src="img\image-register.jpg"
            alt=""
          />
        </div>
        <div className="w-2/5 h-full flex-col flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="h-full w-full font-medium flex justify-center items-center flex-col text-[#FFFFFF] bg-[#1E68AD] rounded-r-md"
          >
            <img className="w-[20%]" src="/public/img/logo4.png" alt="" />
            <h2 className=" text-3xl font-bold text-[#FFFFFF]">Registrarse</h2>
            <div className="flex w-full h-2/4 gap-1 justify-center items-center ">
              <div className="flex flex-col w-2/4 gap-[5px] p-5">
                <label htmlFor="name">Nombre</label>
                <input
                  className="text-black rounded-sm h-[40px] pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  name="name"
                  placeholder="Nombre..."
                  id="name"
                  type="text"
                />
                <span style={{ color: "red" }}>{errors.name}</span>
                <label htmlFor="lastname">Apellido</label>
                <input
                  className="text-black rounded-sm h-[40px] pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  name="lastname"
                  placeholder="Apellido..."
                  id="lastname"
                  type="text"
                />
                <span style={{ color: "red" }}>{errors.lastname}</span>
                <label htmlFor="password">Contraseña</label>
                <input
                  className="text-black rounded-sm h-[40px] pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  placeholder="Contraseña..."
                  name="password"
                  id="password"
                  type="password"
                />
                <span style={{ color: "red" }}>{errors.password}</span>
              </div>
              <div className="flex flex-col w-2/4 gap-[6px] p-5">
                <label htmlFor="email">Email</label>
                <input
                  className="text-black rounded-sm h-[40px] pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  name="email"
                  placeholder="Email..."
                  id="email"
                  type="email"
                />
                <span style={{ color: "red" }}>{errors.email}</span>
                <label htmlFor="age">Edad</label>
                <input
                  className="text-black rounded-sm h-[40px] pl-1 remove-arrow  focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  placeholder="Edad..."
                  name="age"
                  id="age"
                  type="number"
                />
                <span style={{ color: "red" }}>{errors.age}</span>
                <label htmlFor="img">Imagen URL</label>
                <input
                  className="text-black rounded-sm h-[40px] pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleImageChange}
                  name="img"
                  id="img"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <input
              disabled={buttonDisabled()}
              className=" relative bg-[#FFFFFF] text-[#000000] w-[300px] h-[40px] rounded-sm cursor-pointer hover:bg-[#FF6B6C] transition-colors hover:text-[#FFFFFF]  disabled:opacity-30	"
              type="submit"
              value="Registrarse"
            />
            <div>
              <div className="mt-[40px]">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  className="text-[#000000] font-bold text-xl hover:text-[#FF6B6C] transition-colors	"
                  to="/login"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
