import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, useLocation, useParams } from "react-router-dom";
import { getCoursesDetail } from "../../redux/action/actions";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
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

  //Carrito

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
    setIsCart(!isCart);
    const currentCart = JSON.parse(window.localStorage.getItem("cart")) || [];

    const updatedCart = isCart
      ? currentCart.filter((c) => c._id !== detail._id) // Eliminar del carrito
      : [...currentCart, detail]; // Agregar al carrito

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
    setIsFav(!isFav);
    const currentfav = JSON.parse(window.localStorage.getItem("fav")) || [];

    const updatedfav = isFav
      ? currentfav.filter((c) => c._id !== detail._id) // Eliminar del carrito
      : [...currentfav, detail]; // Agregar al carrito

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

  const createPreference = async (product) => {
    try {
      const { data } = await axios.post(`${URL}/createPreference`, product);
      window.location.href = data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const createPayment = async () => {
    try {
      const paymentId = location.search.split("&")[2].split("=")[1];
      const response = await axios.post(`${URL}/createPayment`, {
        data: paymentId,
      });
      return response;
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
  const mesI = ("0" + (fechaIni.getMonth() + 1)).slice(-2); // Sumar 1 al mes ya que en JavaScript los meses van de 0 a 11
  const diaI = ("0" + fechaIni.getDate()).slice(-2);

  const fechaInicial = `${añoI}-${mesI}-${diaI}`;

  const fechafin = new Date(detail?.finish_time);
  const añoF = fechafin.getFullYear();
  const mesF = ("0" + (fechafin.getMonth() + 1)).slice(-2); // Sumar 1 al mes ya que en JavaScript los meses van de 0 a 11
  const diaF = ("0" + fechafin.getDate()).slice(-2);

  const fechaFinal = `${añoF}-${mesF}-${diaF}`;

  return (
    <div className="bg-[#FFFFFF]  w-full h-full text-white container flex justify-center items-center">
      <div className="flex justify-center h-[95%] w-4/5 bg-[#1E68AD] p-10 rounded-md">
        <div className=" flex flex-col justify-center items-start text-center h-full w-3/5">
          <div className=" flex flex-col justify-center items-start rounded-xl">
            <p className="font-medium text-center   text-[#FF6B6C] uppercase  mt-8 text-6xl animate-fade-right animate-ease-in-out">
              {detail?.language}
            </p>
            <p className="text-[#FFFFFF] mt-5 mb-10 text-2xl font-normal opacity-70 text-start first-letter:text-3xl  ">
              Comienza con tan solo ${detail?.price}
            </p>

            <div className="text-[#FFFFFF] flex items-center gap-2   pb-1  font-normal  text-2xl  ">
              <SiLevelsdotfyi />
              <p className="border-b border-white/40 ">Nivel {detail?.level}</p>
            </div>
            <div className="text-[#FFFFFF] flex items-center gap-2 mt-5   pb-1 font-normal  text-2xl  ">
              <FaCalendarDays />
              <p className="border-b border-white/40">{detail?.schedule}</p>
            </div>
            <div className="text-[#FFFFFF] flex items-center gap-2 mt-5  pb-1 font-normal  text-2xl  ">
              <GiDuration />
              <p className="border-b border-white/40">
                Duracion de {detail?.duration}
              </p>
            </div>
            <div className="text-[#FFFFFF] flex items-center gap-2 mt-5  pb-1 font-normal  text-2xl  ">
              <FaHourglassStart />
              <p className="border-b border-white/40">
                Empieza el dia {fechaInicial}
              </p>
            </div>
            <div className="text-[#FFFFFF] flex items-center gap-2 mt-5 pb-1 mb-5 font-normal  text-2xl ">
              <FaHourglassEnd />
              <p className="border-b border-white/40">
                Finaliza el dia {fechaFinal}
              </p>
            </div>
            <div className="flex ">
              <button
                onClick={() => createPreference(detail)}
                className=" text-start mt-5 mb-10 p-2 bg-[#FFFFFF] text-[#000000] hover:text-[#FFFFFF] hover:bg-[#FF6B6C] rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
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
                    className=" text-start mt-5 mb-10 ml-3 p-2 bg-[#FFFFFF] text-[#000000] hover:text-[#FFFFFF] hover:bg-[#FF6B6C] rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    <p className=" m-2 text-2xl  ">Eliminar del Carrito</p>
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <button
                    onClick={handleCart}
                    className=" text-start mt-5 mb-10 ml-3 p-2 bg-[#FFFFFF] text-[#000000] hover:text-[#FFFFFF] hover:bg-[#FF6B6C] rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    <p className=" m-2 text-2xl  ">Agregar al Carrito</p>
                  </button>
                </div>
              )}
            </div>
            <div className="">
              {isFav ? (
                <button
                  onClick={handleFavorite}
                  className=" absolute top-[230px] left-[750px] text-5xl "
                >
                  ❤️
                </button>
              ) : (
                <button
                  onClick={handleFavorite}
                  className=" absolute top-[230px] left-[750px] text-5xl "
                >
                  🤍
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-2/5">
          <img
            className=" h-4/5 object-cover bg-white rounded-lg overflow-hidden animate-fade-left animate-ease-in-out"
            src={detail?.image}
            alt={detail?.lenguage}
          />
        </div>
      </div>
    </div>
  );
};
