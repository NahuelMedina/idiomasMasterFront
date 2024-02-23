import { Link, useLocation } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import { LuCalendarSearch } from "react-icons/lu";
import { FaShoppingBasket } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { TbListDetails } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { addCart, deleteCart, getCartDB } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";

export const Card = ({ course, removeFromFavorites, removeFromCart }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentCart = useSelector((state) => state.currentCart);
  const [isFav, setIsFav] = useState(false);
  const [fav, setFav] = useLocalStorage("fav", "");
  const [isCart, setIsCart] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", "");
  const { isAuthenticated } = useAuth0();
  const [userData] = useLocalStorage("userData", {})
  // const [userData, setUserData] = useState(
  //   JSON.parse(localStorage.getItem("userData"))
  // );
  const [cartState, setCartState] = useState({
    CourseId: "",
    CartId: "",
  });

  // Sector Carrito
  useEffect(() => {
    if (!cart || cart.length === 0) {
      return;
    }
    const isCourseCart = cart.some(
      (cartCourse) => cartCourse._id === course._id
    );
    setIsCart(isCourseCart);
  }, [course, cart]);

  const handleCart = () => {


    if (!isAuthenticated && !userData.hasOwnProperty("email")) {
      Swal.fire({
        icon: "info",
        title: "Necesitas registrarte para agregar al Carrito!",
        footer: '<a href="/register">Registrarse</a>',
      });
      return;
    }
    dispatch(getCartDB(userData._id));
    dispatch(getCartDB(userData._id));

    setIsCart(!isCart);
    if (!isCart) {
      const itemCart = JSON.parse(window.localStorage.getItem("cart"));
      if (itemCart !== null) {
        itemCart.push(course);
        setCart(itemCart);
      } else {
        setCart([course]);
      }
    } else {
      removeFromCart(course._id);
      const eliminateItemCart = JSON.parse(window.localStorage.getItem("cart"));
      const filteredCart = eliminateItemCart.filter(
        (c) => c._id !== course._id
      );
      setCart(filteredCart);
    }
  };

  // Sector Favoritos
  useEffect(() => {
    if (!fav && fav.length === 0) {
      return;
    }
    const isCourseFav = fav.some((favCourse) => favCourse._id === course._id);
    setIsFav(isCourseFav);
  }, [course, fav]);

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
    if (!isFav) {
      const item = JSON.parse(window.localStorage.getItem("fav"));
      if (item !== null) {
        item.push(course);
        setFav(item);
      } else {
        setFav([course]);
      }
    } else {
      const eliminateItem = JSON.parse(window.localStorage.getItem("fav"));
      const filteredFav = eliminateItem.filter((c) => c._id !== course._id);
      setFav(filteredFav);
    }
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(course._id);
    const eliminateItem = JSON.parse(window.localStorage.getItem("fav"));
    const filteredFav = eliminateItem.filter((c) => c._id !== course._id);
    setFav(filteredFav);
  };

  if (location.pathname === "/cart") {
    return (
      <div className="overflow-hidden flex h-[220px] w-[90%] m-5 text-black  shadow-lg shadow-black/50 transform transition-transform mt-[50px]">
        <div className="h-full w-[35%] bg-[#151139] overflow-hidden items-center justify-center flex ">
          <img
            src={course.image}
            alt={course.lenguage}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="h-full w-[50%] flex flex-col justify-start  bg-[#f3f4f5]">
          <div className=" ml-[30px] h-[50px]  flex flex-row ">
            <img
              src={`/img/${course.language}.png`}
              alt={course.lenguage}
              className="h-[30px] w-[30px] m-[10px] "
            />
            {/* {location.pathname !== "/favorite" && (
              <div className="">
                {isFav ? (
                  <button
                    onClick={handleFavorite}
                    className=" absolute top-2 right-[250px] text-2xl "
                  >
                    ❤️
                  </button>
                ) : (
                  <button
                    onClick={handleFavorite}
                    className=" absolute top-1 right-[250px] text-2xl "
                  >
                    🤍
                  </button>
                )}
              </div>
            )}
            {location.pathname === "/favorite" && (
              <div>
                <button
                  onClick={handleRemoveFromFavorites}
                  className=" absolute top-2 right-2 text-3xl "
                >
                  <RxCrossCircled className="bg-white rounded-[15px]" />
                </button>
              </div>
            )} */}

            <h2 className="text-black text-[30px] ">{course.language}</h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black text-[17px]">Nivel: {course.level}</h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black text-[17px]">
              Horarios: {course.schedule}
            </h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black text-[17px]">
              Duracion: {course.duration}
            </h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black  text-[17px]">
              Fecha Inicio: {course.start_time.split("T")[0]}
            </h2>
          </div>
          <div className="ml-[40px] w-full h-[30px]  flex flex-row items-center justify-start">
            <h2 className="text-black  text-[17px]">
              Fecha Finalizacion: {course.finish_time.split("T")[0]}
            </h2>
          </div>
        </div>
        <div className="h-full w-[20%]  grid grid-rows-4 border-l-[1px]">
          <div className="w-full h-full flex items-center justify-end">
            {location.pathname !== "/favorite" && (
              <div className="">
                {isFav ? (
                  <button
                    onClick={handleFavorite}
                    className=" text-2xl mr-[20px] "
                  >
                    ❤️
                  </button>
                ) : (
                  <button
                    onClick={handleFavorite}
                    className=" text-2xl mr-[20px]"
                  >
                    🤍
                  </button>
                )}
              </div>
            )}
            {location.pathname === "/favorite" && (
              <div>
                <button
                  onClick={handleRemoveFromFavorites}
                  className=" absolute top-2 right-2 text-3xl "
                >
                  <TiDelete className="bg-white rounded-[15px]" />
                </button>
              </div>
            )}
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="text-black  text-[30px]">$ {course.price}</h2>
          </div>
          <Link
            to={`/detail/${course._id}`}
            className="bg-yellow-400 w-full px-[15px] text-black h-full  flex flex-row items-center  justify-evenly hover:bg-yellow-500 cursor:pointer hover:text-black"
          >
            <h1 className=" text-[15px] cursor:pointer">
              Detalle del producto
            </h1>
            <TbListDetails className=" text-[35px] cursor:pointer " />
          </Link>
          <div className="w-full h-full px-[15px] flex items-center text-white justify-center items-center bg-sky-700 hover:bg-red-500 cursor:pointer">
            {isCart ? (
              <div className="flex cursor:pointer flex items-center justify-center">
                <h1
                  onClick={handleCart}
                  className="text-[15px] cursor:pointer "
                >
                  Eliminar del carrito
                </h1>
                <FaRegTrashCan className="text-[30px] cursor:pointer" />
              </div>
            ) : (
              <div className=" flex items-center justify-center">
                <button
                  onClick={handleCart}
                  className="text-[15px] cursor:pointer"
                >
                  Agregar al carrito
                </button>
                <FaCartShopping className="text-[25px] cursor:pointer" />
              </div>
            )}
          </div>
        </div>
        {/* <div className="grid grid-rows-0 gap-0 w-[350px] h-[240px] border-t border-black ">
          <div className="bg-[#FF6B6C] w-full  h-[120px] flex flex-row items-center justify-center   border-x border-black ">
            <Link
              to={`/detail/${course._id}`}
              className="bg-[#FF6B6C] w-full  h-[120px]  flex flex-row items-center justify-center hover:bg-yellow-500"
            >
              <TbListDetails className="text-[25px] m-[15px]  h-[120px] " />
              <button className="text-black text-[25px]">
                Detalle del producto
              </button>
            </Link>
          </div>
          <div className="bg-[#FF6B6C] h-[120px] w-full flex flex-row items-center justify-center border-x border-t border-black  hover:bg-yellow-500">
            {isCart ? (
              <div className="flex">
                <RxCross2 className="text-[35px] m-[15px] " />
                <button
                  onClick={handleCart}
                  className="text-black text-[25px] w-full  "
                >
                  Eliminar del carrito
                </button>
              </div>
            ) : (
              <div className="flex">
                <FaCartShopping className="text-[25px] m-[15px] " />
                <button
                  onClick={handleCart}
                  className="text-black text-[25px] "
                >
                  Agregar al carrito
                </button>
              </div>
            )}
          </div>
        </div> */}
      </div>
    );
  }




  return (
    <div className="overflow-hidden h-[90%] w-[40%] max-w-[450px] m-5 text-black rounded-[10px] flex-col justify-center items-center  shadow-lg shadow-black/50 transform transition-transform">
      <div className="h-[40%] w-full overflow-hidden ">
        <img
          src={course.image}
          alt={course.lenguage}
          className="h-[250px] w-full object-cover"
        />
      </div>
      <div className="bg-[#1E68AD] h-[45%] w-full flex flex-col justify-start">
        <div className=" w-full h-[50px]  flex flex-row items-center justify-center">
          <img
            src={`/img/${course.language}.png`}
            alt={course.lenguage}
            className="h-[30px] w-[30px] m-[10px] "
          />
          {location.pathname !== "/favorite" && (
            <div className="">
              {isFav ? (
                <button
                  onClick={handleFavorite}
                  className=" absolute top-2 right-2 text-2xl "
                >
                  ❤️
                </button>
              ) : (
                <button
                  onClick={handleFavorite}
                  className=" absolute top-2 right-2 text-2xl "
                >
                  🤍
                </button>
              )}
            </div>
          )}
          {location.pathname === "/favorite" && (
            <div>
              <button
                onClick={handleRemoveFromFavorites}
                className=" absolute top-2 right-2 text-3xl "
              >
                <RxCrossCircled className="bg-white rounded-[15px]" />
              </button>
            </div>
          )}
          <p className="text-white text-[30px] ">{course.language}</p>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <FaRankingStar className="text-[40px] text-yellow-400 m-[50px] " />
          <p className="text-white text-[20px]">{course.level}</p>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <GrSchedule className="text-[40px] text-yellow-400 m-[50px] " />

          <p className="text-white text-[20px]">{course.schedule}</p>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <LuCalendarSearch className="text-[40px] text-yellow-400 m-[50px] " />
          <p className="text-white text-[20px]">{course.duration}</p>
        </div>
      </div>
      <div className="bg-sky-700 h-[15%] w-full text-xl  grid grid-cols-2 items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <Link
            to={`/detail/${course._id}`}
            className="bg-white w-[80%] h-[70%] rounded-[10px] flex flex-row items-center justify-center hover:bg-yellow-500"
          >
            <button className="text-black flex  items-center justify-center h-[30px]">
              <FaShoppingBasket className="mr-1" /> Obtener Ahora
            </button>
          </Link>
        </div>
        <div className="bg-white w-[90%] h-[70%] rounded-[10px] flex flex-row items-center justify-center hover:bg-yellow-500 cursor:pointer">
          {isCart ? (
            <div className="flex cursor:pointer">
              <button
                onClick={handleCart}
                className="text-black w-full h-[30px] flex items-center justify-center cursor:pointer "
              >
                <RxCross2 className=" mr-1" />
                Eliminar del carrito
              </button>
            </div>
          ) : (
            <div className="flex  w-full">
              <button
                onClick={handleCart}
                className="text-black w-full flex items-center justify-center h-[30px] cursor:pointer"
              >
                <FaCartShopping className=" mr-1" />
                Agregar al carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
