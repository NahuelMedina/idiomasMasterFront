import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { Card } from "../Card/Card";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  createPreference,
  deleteCart,
  getCartDB,
} from "../../redux/action/actions";
import { FaCartShopping } from "react-icons/fa6";
import { CiReceipt } from "react-icons/ci";
import { useTranslation } from "react-i18next";
const URL = import.meta.env.VITE_URL_HOST;

const ShopCart = () => {
  const [cartCourse, setCartCourse] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [renderCards, setRenderCards] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState(1);
  const currentCart = useSelector((state) => state.currentCart);
  const dispatch = useDispatch();
  const location = useLocation();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  console.log(currentCart.courses);
  const [isInCart, setIsInCart] = useState(false);
  const { t , i18n} = useTranslation()


  useEffect(() => {
    if (isInCart === false) {
      dispatch(getCartDB(userData._id));
      dispatch(
        addCart({
          CoursesArray: JSON.parse(localStorage.getItem("cart")),
          CartId: currentCart?._id,
        })
      );
      setIsInCart(true);
    }
  }, [cartCourse, userData._id, currentCart, dispatch]);

  useEffect(() => {
    if (cartCourse === null) {
      return;
    }
    var aux = 0;
    cartCourse.forEach((c) => {
      aux += c.price * (c.items || 1);
    });
    setTotal(aux);
  }, [cartCourse]);

  const handleEliminate = () => {
    localStorage.removeItem("cart");
    setCartCourse([]);
    setRenderCards();
    setPageNum();
    setIsInCart(false);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartCourse.filter((course) => course._id !== id);
    setCartCourse(updatedCart);
    setIsInCart(false);
    const pageNums = Math.ceil(updatedCart.length / itemsOnPage);
    setPageNum(pageNums);
    const itemsArray = Array.from({ length: pageNums }, (_, index) =>
      updatedCart.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
    );
    const renderCard = itemsArray[pagePosition - 1] || [];
    setRenderCards(renderCard);
  };

  // Mercado pago
  const initCreatePreferenceCart = (p) => {
    dispatch(createPreference(p));
  };
  const createPayment = () => {
    try {
      const paymentId = location.search.split("&")[2].split("=")[1];
      axios
        .post(`${URL}/createPayment`, {
          data: paymentId,
        })
        .then(function (response) {
          // Manejar la respuesta del servidor
          if (response.status === 200) {
            // Mostrar alerta de éxito
            Swal.fire({
              icon: "success",
              title: t("PAGO CONFIRMADO"),
              text: t("EL PAGO SE HA CONFIRMADO CORRECTAMENTE."),
            });
          } else {
            // Mostrar alerta de error
            Swal.fire({
              icon: "error",
              title: t("ERROR AL CONFIRMAR EL PAGO"),
              text: t("HUBO UN PROBLEMA AL PROCESAR EL PAGO."),
            });
          }
        })
        .catch(function (error) {
          // Manejar errores de conexión u otros errores inesperados
          console.error("Error al realizar la solicitud:", error);
          // Mostrar alerta de error genérico
          Swal.fire({
            icon: "error",
            title: "Error",
            text: t("HUBO UN PROBLEMA AL REALIZAR LA SOLICITUD"),
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (location.key === "default") {
    createPayment();
    location.key = "";
  }
  // const createPayment = () => {
  //   try {
  //     const paymentId = location.search.split("&")[2].split("=")[1];
  //     axios.post(`${URL}/createPayment`, {
  //       data: paymentId,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // if (location.key === "default") {
  //   createPayment();
  //   location.key = "";
  // }

  // Paginado
  const [pagePosition, setPagePosition] = useState(1);
  const itemsOnPage = 2;
  const nextPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition < pageNum) {
        return prevPagePosition + 1;
      } else {
        return prevPagePosition;
      }
    });
  };
  const prevPage = () => {
    setPagePosition((prevPagePosition) => {
      if (prevPagePosition > 1) {
        return prevPagePosition - 1;
      } else {
        return prevPagePosition;
      }
    });
  };
  useEffect(() => {
    setPagePosition(1);
  }, [cartCourse]);

  useEffect(() => {
    if (cartCourse === null) {
      return;
    }
    const pageNums = Math.ceil(cartCourse.length / itemsOnPage);
    const itemsArray = Array.from({ length: pageNums }, (_, index) =>
      cartCourse.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
    );
    const renderCard = itemsArray[pagePosition - 1] || [];
    setRenderCards(renderCard);
    setPageNum(pageNums);
  }, [cartCourse, itemsOnPage, pagePosition]);

  // Mas y Menos uno

  const handleMinusOne = (id) => {
    setCartCourse((prevCart) =>
      prevCart.map((course) =>
        course._id === id
          ? { ...course, items: Math.max(1, (course.items || 1) - 1) }
          : course
      )
    );
  };
  const handlePlusOne = (id) => {
    setCartCourse((prevCart) =>
      prevCart.map((course) =>
        course._id === id
          ? { ...course, items: (course.items || 1) + 1 }
          : course
      )
    );
  };

  if (cartCourse === null || !cartCourse.length > 0) {
    return (
      <div className="w-full h-[90vh] mt-[80px] flex flex-col">
        <div className="flex justify-center items-center text-3xl font-bold text-black w-full h-[80%]">
          <h1 className="text-[60px] text-gray-600 ml-[50px]">
            {t("NO HAY CURSOS EN EL CARRITO")}
          </h1>
          <FaCartShopping className="text-[150px] ml-[50px] text-gray-600" />
        </div>
        <div className="flex justify-center items-center text-3xl font-bold text-black w-full h-[20%]">
          <Link
            to="/home"
            className="bg-sky-700 h-[70px] w-[400px] m-6  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-white text-[30px] rounded-lg hover:bg-yellow-500 hover:text-black font-medium cursor:pointer"
          >
            <p>{t("EXPLORA MAS CURSOS")}</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] mt-[80px] flex flex-row bg-white">
      <div className="h-full w-[70%] bg-red-200">
        <div className=" w-full h-full bg-white flex flex-col ">
          <div className="w-full h-[90%] pt-[20px]">
            {cartCourse &&
              cartCourse.length > 0 &&
              renderCards.map((element, index) => (
                <Card
                  key={element._id}
                  course={element}
                  removeFromCart={removeFromCart}
                />
              ))}
          </div>
          <div className="h-[70px]  items-center justify-evenly flex flex-row w-full">
            {cartCourse && cartCourse.length > 0 ? (
              <div className="h-[30px] items-center justify-center flex flex-row">
                <IoIosArrowDropleft
                  className={`text-[50px] ${
                    pagePosition === 1 ? "cursor-not-allowed" : "cursor-pointer"
                  } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                  onClick={prevPage}
                  disabled={pagePosition === 1}
                />
                <div className="w-[50px] flex items-center justify-center">
                  <p className="text-[30px] text-black">{`${pagePosition}`}</p>
                </div>
                <IoIosArrowDropright
                  className={`text-[50px] ${
                    pagePosition === pageNum
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                  onClick={nextPage}
                  disabled={pagePosition === pageNum}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div className="h-full w-[30%]">
        <div className="w-full h-full bg-white ">
          {cartCourse !== null && cartCourse.length > 0 ? (
            <div className="bg-white w-[94%] border-[1px] border-gray-300 shadow-lg mt-[20px]">
              <div className="w-full h-[50px] bg-gray-100 flex flex-row items-center">
                <CiReceipt className="text-[40px]" />
                <p className="text-lg text-black font-semibold bg-gray-100 py-2 px-4">
                  {t("CURSOS ELEGIDOS")}{":"}{cartCourse.length}
                </p>
              </div>

              <div className="border-b border-gray-400"></div>
              {cartCourse.map((c, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 border-b border-gray-400"
                >
                  <div className="flex items-center justify-start  h-full w-[80%]">
                    <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                      <button
                        onClick={() => handleMinusOne(c._id)}
                        className="p-2 focus:outline-none text-1xl text-black rounded-full"
                      >
                        <FaMinus />
                      </button>
                      <p className="text-lg text-gray-600 font-semibold mr-2">
                        {c.items || 1}
                      </p>
                      <button
                        onClick={() => handlePlusOne(c._id)}
                        className="p-2 focus:outline-none text-1xl text-black rounded-full"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <p className="text-lg text-gray-800 font-semibold mx-2">
                    {t(`LANGUAGE_${c?.language?.toUpperCase()}`)}, {t(`NIVEL_${c?.level?.toUpperCase()}`)}
                    </p>
                  </div>
                  <p className="text-lg text-gray-800 font-semibold">
                    ${c.price * (c.items || 1)}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-end px-4 py-2 border-b border-gray-400">
                <p className="text-xl text-gray-800 font-semibold">
                  Total: ${total}
                </p>
              </div>

              <div className="w-full h-[200px] bg-gray-100  flex items-center justify-center">
                <div className="bottom-[180px] right-[70px]">
                  <button
                    className="bg-sky-700 h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-white text-[20px] rounded-lg hover:bg-red-500 font-medium  hover:text-black  cursor:pointer"
                    onClick={() =>
                      initCreatePreferenceCart({
                        price: total,
                        coursesCart: cartCourse,
                      })
                    }
                  >
                    {t("REALIZAR COMPRA")}
                  </button>

                  <button
                    className="bg-sky-700 h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-white text-[20px] rounded-lg hover:bg-red-500 font-medium  hover:text-black  cursor:pointer"
                    onClick={handleEliminate}
                  >
                    {t("VACIAR CARRITO")}
                  </button>

                  <Link
                    to="/home"
                    className="bg-sky-700 h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-white text-[20px] rounded-lg hover:bg-red-500 font-medium  hover:text-black  cursor:pointer"
                  >
                    <button>{t("VER MAS CURSOS")}</button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link></Link>
          )}
        </div>
        {/* <div className="w-full h-[40%] bg-blue-700">

        <div className="bottom-[180px] right-[70px]">
        <div className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
          <button
            onClick={() =>
              initCreatePreferenceCart({
                price: total,
                coursesCart: cartCourse,
              })
            }
          >
            Comprar todos
          </button>
        </div>
        <div className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
          <button onClick={handleEliminate}>Vaciar carrito</button>
        </div>
        <div className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
          <Link to="/home">
            <button>Ver mas cursos</button>
          </Link>
        </div>
      </div>


        </div> */}
      </div>

      {/* <div className="bottom-[180px] right-[70px] absolute h-24 p-3 bg-red-200">
        <div className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
          <button
            onClick={() =>
              initCreatePreferenceCart({
                price: total,
                coursesCart: cartCourse,
              })
            }
          >
            Comprar todos
          </button>
        </div>
        <div className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
          <button onClick={handleEliminate}>Vaciar carrito</button>
        </div>
        <div className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
          <Link to="/home">
            <button>Ver mas cursos</button>
          </Link>
        </div>
      </div> */}
      {/* {cartCourse !== null && cartCourse.length > 0 ? (
        <div className="bg-gray-200 w-[400px] border border-gray-400 absolute top-24 right-5 rounded-lg shadow-lg">
          <p className="text-lg text-gray-800 font-semibold bg-gray-300 py-2 px-4">
            Cursos elegidos: {cartCourse.length}
          </p>
          <div className="border-b border-gray-400"></div>
          {cartCourse.map((c, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2 border-b border-gray-400"
            >
              <div className="flex items-center">
                <p className="text-lg text-gray-600 font-semibold mr-2">
                  {c.items || 1}
                </p>
                <button
                  onClick={() => handleMinusOne(c._id)}
                  className="p-2 focus:outline-none text-1xl text-black rounded-full"
                >
                  <FaMinus />
                </button>
                <p className="text-lg text-gray-800 font-semibold mx-2">
                  {c.language}
                </p>
                <button
                  onClick={() => handlePlusOne(c._id)}
                  className="p-2 focus:outline-none text-1xl text-black rounded-full"
                >
                  <FaPlus />
                </button>
              </div>
              <p className="text-lg text-gray-800 font-semibold">
                ${c.price * (c.items || 1)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-end px-4 py-2 border-b border-gray-400">
            <p className="text-xl text-gray-800 font-semibold">
              Total: ${total}
            </p>
          </div>
        </div>
      ) : (
        <Link></Link>
      )} */}
      {/* <div className=" ">
        <div className=" w-[100%] ">
          {cartCourse &&
            cartCourse.length > 0 &&
            renderCards.map((element, index) => (
              <Card
                key={element._id}
                course={element}
                removeFromCart={removeFromCart}
              />
            ))}
        </div>
        <div className=" ">
          {cartCourse && cartCourse.length > 0 ? (
            <div className="h-[30px] items-center justify-center flex flex-row">
              <IoIosArrowDropleft
                className={`text-[50px] ${
                  pagePosition === 1 ? "cursor-not-allowed" : "cursor-pointer"
                } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                onClick={prevPage}
                disabled={pagePosition === 1}
              />
              <div className="w-[50px] flex items-center justify-center">
                <p className="text-[30px] text-black">{`${pagePosition}`}</p>
              </div>
              <IoIosArrowDropright
                className={`text-[50px] ${
                  pagePosition === pageNum
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                onClick={nextPage}
                disabled={pagePosition === pageNum}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default ShopCart;
