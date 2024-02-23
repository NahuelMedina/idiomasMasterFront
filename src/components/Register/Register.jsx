import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerValidate from "../Utils/registerValidate";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/action/actions";
import Swal from 'sweetalert2'
import './ColoredToast.css'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postStatus = useSelector(state => state.postStatus)
  const postError = useSelector(state => state.postError)
  const [status, setStatus] = useState(postStatus)

  const [state, setState] = useState({
    name: "",
    lastname: "",
    email: "",
    img: "",
    password: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors(registerValidate({
      ...state,
      [name]: value
    }));

    setState({
      ...state,
      [name]: value
    });
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


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUser(state));
    if (postError === null) {
      Swal.fire({
        icon: 'success',
        title: '¡Usuario Creado Correctamente!',
        showConfirmButton: false,
        timer: 2300 // La alerta se cerrará automáticamente después de 1.5 segundos
      });
      setStatus(false)
      navigate("/login")
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al Crear Usuario',
        text: `${postError}` // Puedes mostrar el mensaje de error específico si lo proporciona la función de registro
      });
    }
  };

  const buttonDisabled = () => {
    let btn = true;
    if (Object.keys(errors).length === 0) {
        btn = false;
    }
    return btn;
}

  return (
    <div className="w-full h-full mt-[80px] bg-[#FFFFFF] text-[#000000] flex justify-center items-center animate-fade animate-once animate-ease-in">
      <div className="flex m-5 h-[95%]">
        <div className=" w-3/5 h-full">
          <img
            className="h-full object-cover rounded-l-md"
            src="img\image-register.jpg"
            alt=""
          />
        </div>
        <div className="w-2/5 h-full flex-col flex justify-center items-center">
          <h2 className="absolute top-28 text-3xl font-bold text-[#FFFFFF]">
            Registrarse
          </h2>
          <form
            onSubmit={handleSubmit}
            className="h-full w-full pt-20  flex justify-center items-center flex-col text-[#FFFFFF] bg-[#1E68AD] text-lg font-medium  rounded-r-md"
          >
            <div className="flex w-full h-2/4 gap-1 text-center justify-center items-center ">
              <div className="flex flex-col w-2/4 gap-2 p-8">
                <label htmlFor="name">Nombre</label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  name="name"
                  placeholder="Nombre..."
                  id="name"
                  type="text"
                  value={state.name}
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px', lineheight:'.75rem' }}>{errors.name}</span>
                <label htmlFor="lastname">Apellido</label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  name="lastname"
                  placeholder="Apellido..."
                  id="lastname"
                  type="text"
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px' }}>{errors.lastname}</span>
                <label htmlFor="password">Contraseña</label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  placeholder="Contraseña..."
                  name="password"
                  id="password"
                  type="password"
                  value={state.password}
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px' }}>{errors.password}</span>
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
                  value={state.email}
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px' }}>{errors.email}</span>
                <label htmlFor="age">Edad</label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 remove-arrow  focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  placeholder="Edad..."
                  name="age"
                  id="age"
                  type="number"
                  value={state.age}
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px' }}>{errors.age}</span>
                <label htmlFor="img">Imagen URL</label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleImageChange}
                  name="img"
                  id="img"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <input
              disabled={ buttonDisabled()}
              className="mt-10 relative top-5 bg-[#FFFFFF] text-[#000000] w-40 h-11 rounded-lg cursor-pointer hover:bg-[#FF6B6C] transition-colors hover:text-[#FFFFFF]  disabled:opacity-30	"
              type="submit"
              value="Registrarse"
            />
            <div>
              <div className="mt-20">
                <ul>
                  <li>
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      className="text-[#000000] font-bold text-xl hover:text-[#FF6B6C] transition-colors	"
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
    </div>
  );
};

export default Register;
