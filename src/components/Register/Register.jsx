import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerValidate from "../Utils/registerValidate";
import registerValidateEng from "../Utils/registerValidateEng";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/action/actions";
import Swal from 'sweetalert2'
import './ColoredToast.css'
import { useTranslation } from "react-i18next";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postStatus = useSelector(state => state.postStatus)
  const postStatusFail = useSelector(state => state.postStatusFail)
  const postError = useSelector(state => state.postError)
  const [status, setStatus] = useState(postStatus)
  const [lang , setLang] = useState('')
  const { t , i18n} = useTranslation()

useEffect(()=>{
  setLang(localStorage.getItem("lang"))
},[])
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
  setLang(localStorage.getItem("lang"))
    if(lang === "en"){
      setErrors(registerValidateEng({
        ...state,
        [name]: value
      }));
    }
    if(lang === "es"){
      setErrors(registerValidate({
      ...state,
      [name]: value
    }));
    }
    
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
        title: t("USUARIO_CREADO"),
        showConfirmButton: false,
        timer: 2300 
      });
      setStatus(false)
      navigate("/login")
    } else {
      Swal.fire({
        icon: 'error',
        title: t("ERROR_AL_CREAR_USUARIO"),
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
  console.log(errors);
  console.log(buttonDisabled());

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
          <h1 className="absolute top-28 text-3xl font-bold text-[#FFFFFF]">
          {t("REGISTRARSE")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="h-full w-full pt-20  flex justify-center items-center flex-col text-[#FFFFFF] bg-[#1E68AD] text-lg font-medium  rounded-r-md"
          >
            <div className="flex w-full h-2/4 gap-1 text-center justify-center items-center ">
              <div className="flex flex-col w-2/4 gap-2 p-8">
                <label htmlFor="name"><h1>{t("NOMBRE")}</h1></label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  name="name"
                  placeholder={`${t("NOMBRE")}...`}
                  id="name"
                  type="text"
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px', lineheight:'.75rem' }}>{errors.name}</span>
                <label htmlFor="lastname"><h1>{t("APELLIDO")}</h1></label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  name="lastname"
                  placeholder={`${t("APELLIDO")}...`}
                  id="lastname"
                  type="text"
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px' }}>{errors.lastname}</span>
                <label htmlFor="password"><h1>{t("CONTRASEÑA")}</h1></label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  placeholder={`${t("CONTRASEÑA")}...`}
                  name="password"
                  id="password"
                  type="password"
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
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px' }}>{errors.email}</span>
                <label htmlFor="age"><h1>Edad</h1></label>
                <input
                  className="text-black rounded-md h-8 outline-none pl-1 remove-arrow  focus:border-2 border-[#FF6B6C]"
                  onChange={handleChange}
                  placeholder={`${t("EDAD")}...`}
                  name="age"
                  id="age"
                  type="number"
                />
                <span style={{ color: "rgb(240 90 18)", fontSize:'15px' }}>{errors.age}</span>
                <label htmlFor="img"><h1>{t("IMAGEN_URL")}</h1></label>
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
              value={t("REGISTRARSE")}
            />
            <div>
              <div className="mt-20">
                <ul>
                  <li className="flex m-2">
                    <h1>{t("YA_TIENES_CUENTA")}</h1>
                    <Link
                      className="text-[#000000] ml-2 font-bold text-xl hover:text-[#FF6B6C] transition-colors	"
                      to="/login"
                    >
                      <h1>{t("INICIAR_SESION")}</h1>
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
