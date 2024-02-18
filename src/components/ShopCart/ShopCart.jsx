import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { Card } from "../Card/Card";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createPreference } from "../../redux/action/actions";
const URL = import.meta.env.VITE_URL_HOST;
const ShopCart = () => {
  const [cartCourse, setCartCourse] = useState([]);
  const [renderCards, setRenderCards] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const getCart = () => {
    return JSON.parse(localStorage.getItem("cart"));
  };

  useEffect(() => {
    setCartCourse(getCart());
  }, []);

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
  };

  const removeFromCart = (id) => {
    const updatedCart = cartCourse.filter((course) => course._id !== id);
    setCartCourse(updatedCart);
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
  console.log(total);
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
      <div className="bg-white  w-full h-full">
        <div className="flex justify-center items-center text-3xl font-bold text-black">
          <h1 className="">No hay cursos en el carrito</h1>
        </div>
        <div className="bottom-[100px] right-5 absolute h-24 p-3">
          <div className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
            <Link to="/home">
              <button>
                <p>Ver mas cursos</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white  w-full h-full grid ">
      -
      <div className="bottom-[180px] right-[70px] absolute h-24 p-3">
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
      {cartCourse !== null && cartCourse.length > 0 ? (
        <div className="bg-gray-200 w-[400px] h-[488px] overflow-y-auto border border-gray-400 mt-5 mx-5 absolute top-24 right-5 rounded-lg overflow-hidden shadow-lg">
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
      )}
      <div className=" ">
        <div className="  h-[75%] w-full">
          {cartCourse &&
            cartCourse.length > 0 &&
            renderCards.map((element, index) => (
              <div key={index} className="grid  ">
                <Card course={element} removeFromCart={removeFromCart} />
              </div>
            ))}
        </div>
        <div className=" ">
          {cartCourse && cartCourse.length > 0 ? (
            <div className="h-[70px] items-center justify-center flex flex-row">
              <IoIosArrowDropleft
                className={`text-[50px] m-[30px] ${
                  pagePosition === 1 ? "cursor-not-allowed" : "cursor-pointer"
                } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
                onClick={prevPage}
                disabled={pagePosition === 1}
              />
              <div className="w-[50px] flex items-center justify-center">
                <h1 className="text-[30px] m-[30px] text-black">{`${pagePosition}`}</h1>
              </div>
              <IoIosArrowDropright
                className={`text-[50px] m-[30px] ${
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
  );
};

export default ShopCart;
