import React, { useEffect, useState } from 'react'
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';




const ShopCart = () => {
  
  const [cartCourse, setCartCourse] =useState([])
  const [renderCards, setRenderCards] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const getCart = ()=>{
      return JSON.parse(localStorage.getItem('cart'))
  }

  useEffect(()=>{
    setCartCourse(getCart())
  },[])

  console.log(cartCourse);

  const handleEliminate = ()=>{
    localStorage.removeItem("cart");
    setCartCourse([])
    setRenderCards()
    setPageNum()
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

useEffect(()=>{
if(cartCourse === null){
return
}
  const pageNums = Math.ceil(cartCourse.length / itemsOnPage);
  const itemsArray = Array.from({ length: pageNums }, (_, index) =>
  cartCourse.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
);
  const renderCard = itemsArray[pagePosition - 1] || [];
  setRenderCards(renderCard)
  setPageNum(pageNums)
}, [cartCourse, itemsOnPage, pagePosition])





  const removeFromCart =(id)=>{
    const updatedCart = cartCourse.filter(course => course._id !== id);
    setCartCourse(updatedCart);
    const pageNums = Math.ceil(updatedCart.length / itemsOnPage);
    setPageNum(pageNums);
    const itemsArray = Array.from({ length: pageNums }, (_, index) =>
      updatedCart.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
    );
    const renderCard = itemsArray[pagePosition - 1] || [];
    setRenderCards(renderCard);
  }
  
  if(!cartCourse){
    return (
      <div className='bg-white h-screen wscreen'>
      <div className='flex justify-center items-center text-3xl font-bold text-black'>
        <h1 className=''>No hay cursos en el carrito</h1>
      </div>
      <div className='bottom-[100px] right-5 absolute h-24 p-3'>
    <div  className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
     <Link to='/home'> 
     <button >Ver mas cursos</button>
     </Link>
     </div>
    </div> 
      </div>
    )
  }
  
  return (
    <div className='bg-white h-screen wscreen grid '>-
      <div className='bottom-[180px] right-[70px] absolute h-24 p-3'>
           <div  className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
            <button >Comprar todos</button>
          </div>
          <div  className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
            <button onClick={handleEliminate}>Vaciar carrito</button>
          </div>
          <div  className="bg-[#FF6B6C] h-[40px] w-[230px] m-6  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
            <Link to='/home'> 
                <button >Ver mas cursos</button>
            </Link>
          </div>
        </div> 
      { cartCourse !== null && cartCourse.length > 0 ?(<div className=" justify-center w-[400px] h-[500px] border border-[#848484] mt-[5px] mx-[90px] absolute top-[100px] right-5 ">
            <p className="text-[25px] p-1 h-[30px] w-[300px]  text-[#1F1F1F] m-[2px]">{`Cantidad de Productos: ${cartCourse.length}`}</p>
            <p className='border-b border-black p-1 w-[300px]  ' ></p>
            {
                  cartCourse.map(c =>(
                    <div className='flex m-3'>  
                      <p className='w-[300px] text-5  font-semibold text-black'>-{c.language}</p>
                      <p>${c.price}</p>
                      </div>
                  ))
            }
          </div>):(
            <Link></Link>
          )}
    
    <div className=' '>
      <div className="  h-[75%] w-full">
        {cartCourse &&
          cartCourse.length > 0 &&
          renderCards.map((element, index) => (
            <div key={index} className='grid  '>
              <Card course={element} removeFromCart={removeFromCart}  />
            </div>
          ))}
      </div>
      <div className=" ">
        {
          cartCourse &&
          cartCourse.length > 0 ? ( 
            <div className='h-[70px] items-center justify-center flex flex-row'>
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
                pagePosition === pageNum ? "cursor-not-allowed" : "cursor-pointer"
              } text-black hover:text-[#1E68AD] transition-transform transform-gp active:scale-95`}
              onClick={nextPage}
              disabled={pagePosition === pageNum}
            />
            </div>
          ) : (
            <div></div>
          )
        }
            
          </div>
    </div>

  </div>
  )
}

export default ShopCart