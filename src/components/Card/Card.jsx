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

export const Card = ({ course, removeFromFavorites, removeFromCart }) => {
  const location = useLocation();
  const [isFav, setIsFav] = useState(false);
  const [fav, setFav] = useLocalStorage("fav", "");
  const [isCart, setIsCart] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", "");
  const { isAuthenticated } = useAuth0();

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
    if (!isAuthenticated) {
      Swal.fire({
        icon: "info",
        title: "Necesitas registrarte para agregar al Carrito!",
        footer: '<a href="/register">Registrarse</a>',
      });
      return;
    }
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
    if (!isAuthenticated) {
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
      <div className=" flex h-[240px] w-[1200px] m-5 text-black rounded-[10px] shadow-lg shadow-black/50 transform transition-transform ">
        <div className="h-[240px] w-[400px] bg-[#151139] overflow-hidden items-center justify-center flex">
          <img
            src={course.image}
            alt={course.lenguage}
            className="h-full w-full "
          />
        </div>
        <div className="bg-[#1E68AD] h-[240px] w-[500px] flex flex-col justify-start">
          <div className="  h-[50px]  flex flex-row items-center justify-center">
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
                    className=" absolute top-2 right-[370px] text-2xl "
                  >
                    ❤️
                  </button>
                ) : (
                  <button
                    onClick={handleFavorite}
                    className=" absolute top-2 right-[370px] text-2xl "
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
            <h2 className="text-white text-[30px] ">{course.language}</h2>
          </div>
          <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
            <FaRankingStar className="text-[40px] text-yellow-400 m-[50px] " />
            <h2 className="text-white text-[20px]">{course.level}</h2>
          </div>
          <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
            <GrSchedule className="text-[40px] text-yellow-400 m-[50px] " />

            <h2 className="text-white text-[20px]">{course.schedule}</h2>
          </div>
          <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
            <LuCalendarSearch className="text-[40px] text-yellow-400 m-[50px] " />
            <h2 className="text-white text-[20px]">{course.duration}</h2>
          </div>
        </div>
        <div className="grid grid-rows-0 gap-0 w-[350px] h-[240px] border-t border-black ">
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
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden h-[530px] w-[350px] m-5 text-black rounded-[10px] shadow-lg shadow-black/50 transform transition-transform ">
      <div className="h-[230px] w-[450px] bg-green-200 overflow-hidden items-center justify-center flex">
        <img
          src={course.image}
          alt={course.lenguage}
          className="h-full w-full "
        />
      </div>
      <div className="bg-[#1E68AD] h-[220px] w-full flex flex-col justify-start">
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
          <h2 className="text-white text-[30px] ">{course.language}</h2>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <FaRankingStar className="text-[40px] text-yellow-400 m-[50px] " />
          <h2 className="text-white text-[20px]">{course.level}</h2>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <GrSchedule className="text-[40px] text-yellow-400 m-[50px] " />

          <h2 className="text-white text-[20px]">{course.schedule}</h2>
        </div>
        <div className=" w-full h-[50px]  flex flex-row items-center justify-start">
          <LuCalendarSearch className="text-[40px] text-yellow-400 m-[50px] " />
          <h2 className="text-white text-[20px]">{course.duration}</h2>
        </div>
      </div>
      <div className="bg-[#FF6B6C] w-full h-[40px] flex flex-row items-center justify-center">
        <Link
          to={`/detail/${course._id}`}
          className="bg-[#FF6B6C] w-full h-[40px] flex flex-row items-center justify-center hover:bg-yellow-500"
        >
          <FaShoppingBasket className="text-[25px] m-[15px] " />
          <button className="text-black text-[25px]">Obtener Ahora</button>
        </Link>
      </div>
      <div className="bg-[#FF6B6C] w-full h-[40px] flex flex-row items-center justify-center  hover:bg-yellow-500">
        {isCart ? (
          <div className="flex">
            <RxCross2 className="text-[25px] m-[15px] " />
            <button onClick={handleCart} className="text-black text-[25px] ">
              Eliminar del carrito
            </button>
          </div>
        ) : (
          <div className="flex">
            <FaCartShopping className="text-[25px] m-[15px] " />
            <button onClick={handleCart} className="text-black text-[25px] ">
              Agregar al carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
