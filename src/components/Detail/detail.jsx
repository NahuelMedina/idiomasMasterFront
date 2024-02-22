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
const URL = import.meta.env.VITE_URL_HOST;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
import Swal from "sweetalert2";
import DetailReviews from "./detailReviews";

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

  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))

  const [reviews, setReviews] = useState(false)


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
        title: "Necesitas registrarte para agregar al Carrito!",
        footer: '<a href="/register">Registrarse</a>',
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
        title: "Necesitas registrarte para agregar a Favoritos!",
        footer: '<a href="/register">Registrarse</a>',
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
  initMercadoPago(PUBLIC_KEY, {
    locale: "es-MX",
  });

  useEffect((event) => {
    dispatch(getCoursesDetail(params.id));
  }, []);

  const initCreatePreference = (p) => {
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

    if(reviews){

      setReviews(false)
    } else {

      setReviews(true)
    }
  }

  return (
    <div className="h-[90vh] mt-[10vh] w-full flex flex-col pt-[30px] items-center ">
      <div className="flex flex-col min-h-[80%] w-[90%] bg-white border-[1px] border-gray-300 relative bg-white shadow-lg ">
        <div className="w-full h-[17%] bg-[#1d67ad] flex items-center justify-center ">
          <p className="font-medium   text-white uppercase text-6xl animate-fade-right animate-ease-in-out">
            {detail?.language}
          </p>
          <img
              src={`/img/${detail.language}.png`}
              alt={detail.lenguage}
              className="h-[60px] w-[60px] m-[25px] "
            />
        </div>
        <div className="w-full h-[10%] bg-yellow-400 flex justify-center items-center">
          <p className="text-black text-[25px] font-normal text-start">
            Comienza con tan solo ${detail?.price}
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
              <p className="ml-[30px] ">Nivel {detail?.level}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <FaCalendarDays className="ml-[100px] " />
              <p className="ml-[30px] ">{detail?.schedule}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <GiDuration className="ml-[100px] " />
              <p className="ml-[30px] ">Duracion de {detail?.duration}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <FaHourglassStart className="ml-[100px] " />
              <p className="ml-[30px] ">Empieza el dia {fechaInicial}</p>
            </div>
            <div className="text-black flex items-center  font-normal  text-2xl">
              <FaHourglassEnd className="ml-[100px] " />
              <p className="ml-[30px] ">Finaliza el dia {fechaFinal}</p>
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
            className="w-[270px] h-[70px] mr-[40px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded rounded-[10px]"
          >
            <p className=" m-2 text-2xl  "> Comprar ahora</p>{" "}
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
                className="w-[270px] h-[70px] ml-[40px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded rounded-[10px]"
              >
                <p className=" m-2 text-2xl  ">Eliminar del Carrito</p>
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={handleCart}
                className="w-[270px] h-[70px] ml-[40px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded rounded-[10px]"
              >
                <p className=" m-2 text-2xl  ">Agregar al Carrito</p>
              </button>
            </div>
          )}
        </div>
        
      </div>
      <div className="w-full min-h-[15%] flex items-center justify-center ">
      <button
    onClick={handleReviews} 
    className="w-[270px] h-[70px] ml-[40px] bg-white border-[3px] border-yellow-400 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded rounded-[10px]">
    {reviews ? 
        ("Ocultar Comentarios") 
        :
        ("Mostrar Comentarios") 
    }
</button>
      </div>
      <div className="w-[80%] h-auto flex items-center justify-center ">
        {reviews?
      (<DetailReviews/>)
      :(null)  
      }
      </div>
      <hr />
      <br />
        <ReviewComponent/>
    </div>
  );
};
