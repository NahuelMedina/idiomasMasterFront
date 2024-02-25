import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, useLocation, useParams } from "react-router-dom";
import { createPreference, getCoursesDetail } from "../../redux/action/actions";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa";
import ReviewComponent from "../Detail_reviews/Detail_reviews";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useTranslation } from "react-i18next";
import DetailReviews from "./detailReviews";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
const URL = import.meta.env.VITE_URL_HOST;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export const Detail = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.courseDetail);
  const [isCart, setIsCart] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );
  const [isFav, setIsFav] = useState(false);
  const [fav, setFav] = useState(
    JSON.parse(window.localStorage.getItem("fav"))
  );
  const { isAuthenticated } = useAuth0();
    const [userData] = useLocalStorage("userData", {});
  //const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData'))
  const [reviews, setReviews] = useState(false);
  const { t , i18n} = useTranslation()

console.log(detail);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      return;
    }
    const isCourseCart = cart.some(
      (cartCourse) => cartCourse._id === detail._id
    );
    setIsCart(isCourseCart);
  }, [detail, cart]);

  const handleCart = () => {
    if (!isAuthenticated && !userData.hasOwnProperty("email")) {
      Swal.fire({
        icon: "info",
        title: t("NECESITAS_REGISTRARTE_CARRITO"),
        footer: `<a href="/register">${t("REGISTRARSE")}</a>`,
      });
      return;
    }
    setIsCart(!isCart);
    const currentCart = JSON.parse(window.localStorage.getItem("cart")) || [];

    const updatedCart = isCart
      ? currentCart.filter((c) => c._id !== detail._id) // Eliminar del carrito
      : [...currentCart, detail];

    setCart(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //Favoritos
  useEffect(() => {
    if (!fav || fav.length === 0) {
      return;
    }
    const isCoursefav = fav.some((favCourse) => favCourse._id === detail._id);
    setIsFav(isCoursefav);
  }, [detail, fav]);

  const handleFavorite = () => {
    if (!isAuthenticated && !userData.hasOwnProperty("email")) {
      Swal.fire({
        icon: "info",
        title: t("NECESITAS_REGISTRARTE_FAVORITO"),
        footer: `<a href="/register">${t("REGISTRARSE")}</a>`,
      });
      return;
    }
    setIsFav(!isFav);
    const currentfav = JSON.parse(window.localStorage.getItem("fav")) || [];

    const updatedfav = isFav
      ? currentfav.filter((c) => c._id !== detail._id)
      : [...currentfav, detail];

    setFav(updatedfav);
    window.localStorage.setItem("fav", JSON.stringify(updatedfav));
  };

  //Mercado Pago
  // initMercadoPago(PUBLIC_KEY, {
  //   locale: "es-MX",
  // });

  useEffect((event) => {
    dispatch(getCoursesDetail(params.id));
  }, []);

  const initCreatePreference = (p) => {
    if (!isAuthenticated && !userData.hasOwnProperty("email")) {
      Swal.fire({
        icon: "info",
        title: "Necesitas registrarte para realizar la Compra!",
        footer: '<a href="/register">Registrarse</a>',
      });
      return;
    }
    dispatch(createPreference(p));
  };

  const createPayment = () => {
    try {
      const paymentId = location.search.split("&")[2].split("=")[1];
      axios.post(`${URL}/createPayment`, {
        data: paymentId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (location.key === "default") {
    createPayment();
    location.key = "";
  }

  const fechaIni = new Date(detail?.start_time);
  const añoI = fechaIni.getFullYear();
  const mesI = ("0" + (fechaIni.getMonth() + 1)).slice(-2);
  const diaI = ("0" + fechaIni.getDate()).slice(-2);

  const fechaInicial = `${añoI}-${mesI}-${diaI}`;

  const fechafin = new Date(detail?.finish_time);
  const añoF = fechafin.getFullYear();
  const mesF = ("0" + (fechafin.getMonth() + 1)).slice(-2);
  const diaF = ("0" + fechafin.getDate()).slice(-2);

  const fechaFinal = `${añoF}-${mesF}-${diaF}`;

  const handleReviews = () => {
    if (reviews) {
      setReviews(false);
    } else {
      setReviews(true);
    }
  };

  const fullStars = () =>{
    const star = [];
    for(let i=1; i <= 5; i++){
      i <= detail?.rank ?
      star.push(<span><IoMdStar className=" text-yellow-500 "/></span>) :
      star.push(<span><IoMdStarOutline /></span>)
    }
    return star;

  }

  return (
    <div className="h-[90vh] mt-[10vh] w-full flex flex-col pt-[30px] items-center ">
      <div className="flex flex-col min-h-[80%] w-[90%] bg-white border-[1px] border-gray-300 relative shadow-lg ">
        <div className="w-full h-[17%] bg-[#1d67ad] flex items-center justify-center ">
          <p className="font-medium   text-white uppercase text-6xl animate-fade-right animate-ease-in-out">
          {t(`LANGUAGE_${detail?.language?.toUpperCase()}`)}
          </p>
          <img
            src={`/img/${detail.language}.png`}
            alt={detail.lenguage}
            className="h-[60px] w-[60px] m-[25px] "
          />
          <div className="absolute right-5 top-5 flex flex-col items-center mr-5 ">
          <h1 className="text-4xl font-bold text-white flex items-center">{detail?.rank}</h1> 
          <h1 className=" flex font-2xl">{fullStars()}</h1>
          </div>
        </div>
        <div className="w-full h-[10%] bg-yellow-400 flex justify-center items-center">
          <p className="text-black text-[25px] font-normal text-start">
            {t("COMIENZA_CON")} ${detail?.price}
          </p>
        </div>
        <div className="w-full h-[56%] bg-white grid grid-cols-2 items-center justify-center">
          <div className=" w-full- h-full flex items-center justify-center overflow-hidden">
            <div className="w-[450px] h-full overflow-hidden">
              <img
                className="w-full h-full object-cover bg-white overflow-hidden animate-fade-left animate-ease-in-out"
                src={detail?.image}
                alt={detail?.lenguage}
              />
            </div>
          </div>
          <div className="bg-white w-full- h-full grid grid-rows-5 overflow-hidden">
            <div className="text-black flex items-center  font-normal  text-2xl">
              <SiLevelsdotfyi className="ml-[100px] " />
              <p className="ml-[30px] ">{t("NIVEL")}{" "}{t(`NIVEL_${detail?.level?.toUpperCase()}`)}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <FaCalendarDays className="ml-[100px] " />
              <p className="ml-[30px] ">{t(`SCHEDULE_${detail?.schedule?.toUpperCase()}`)}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <GiDuration className="ml-[100px] " />
              <p className="ml-[30px] ">{t("DURACION_DE")}{t(`DURACION_${detail?.duration?.toUpperCase()}`)}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <FaHourglassStart className="ml-[100px] " />
              <p className="ml-[30px] ">{t("EMPIEZA EL DIA")} {fechaInicial}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <FaHourglassEnd className="ml-[100px] " />
              <p className="ml-[30px] ">{t("FINALIZA EL DIA")}{fechaFinal}</p>
            </div>
            <div className="w-[100px] h-[100px] flex items-center justify-center absolute right-[1px]">
              {isFav ? (
                <button onClick={handleFavorite} className=" text-5xl ">
                  ❤️
                </button>
              ) : (
                <button onClick={handleFavorite} className=" text-5xl ">
                  🤍
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-[17%] bg-[#1d67ad] flex items-center justify-center">
          <button
            onClick={() => initCreatePreference(detail)}
            className="w-[270px] h-[70px] mr-[40px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-[10px]"
          >
            <p className=" m-2 text-2xl  "> {t("COMPRAR AHORA")}</p>{" "}
            {preferenceId && (
              <Wallet
                initialization={{ preferenceId, redirectMode: "modal" }}
              />
            )}
          </button>
          {isCart ? (
            <div className="flex">
              <button
                onClick={handleCart}
                className="w-[270px] h-[70px] ml-[40px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4  rounded-[10px]"
              >
                <p className=" m-0 text-2xl  ">{t("ELIMINAR DEL CARRITO")}</p>
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={handleCart}
                className="w-[270px] h-[70px] ml-[40px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-[10px]"
              >
                <p className=" m-2 text-2xl  ">{t("AGREGAR AL CARRITO")}</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full min-h-[15%] flex items-center justify-center ">
      <button
    onClick={handleReviews} 
    className="w-[270px] h-[70px] ml-[40px] bg-white border-[3px] border-yellow-400 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-[10px]">
    {reviews ? 
        (t("MOSTRAR RESEÑAS")) 
        :
        (t("OCULTAR RESEÑAS")) 
    }
</button>
      </div>
      <div className="w-[80%] h-auto flex items-center justify-center ">
        {reviews ? <DetailReviews /> : <ReviewComponent />}
      </div>
      <hr />
      <br />
    </div>
  );
};
