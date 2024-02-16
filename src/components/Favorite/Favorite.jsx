import React, { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from 'react-router-dom';

const Favorite = () => {

    const [favCourse, setFavCourse] =useState([])
    const [renderCards, setRenderCards] = useState([]);
    const [pageNum, setPageNum] = useState(0);

    const getFav = ()=>{
        return JSON.parse(localStorage.getItem('fav'))
    }

    useEffect(()=>{
        setFavCourse(getFav())
    },[])

    console.log(favCourse);

    const handleEliminate = ()=>{
      localStorage.removeItem("fav");
      setFavCourse([])
      setRenderCards()
      setPageNum()
    }

  // Paginado
  const [pagePosition, setPagePosition] = useState(1);
  const itemsOnPage = 3;
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
    }, [favCourse]);
  
  useEffect(()=>{
  if(favCourse === null){
  return
  }
    const pageNums = Math.ceil(favCourse.length / itemsOnPage);
    const itemsArray = Array.from({ length: pageNums }, (_, index) =>
    favCourse.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
  );
    const renderCard = itemsArray[pagePosition - 1] || [];
    setRenderCards(renderCard)
    setPageNum(pageNums)
  }, [favCourse, itemsOnPage, pagePosition])



  const removeFromFavorites = (id) => {
    const updatedFavorites = favCourse.filter(course => course._id !== id);
    setFavCourse(updatedFavorites);
    const pageNums = Math.ceil(updatedFavorites.length / itemsOnPage);
    setPageNum(pageNums);
    const itemsArray = Array.from({ length: pageNums }, (_, index) =>
      updatedFavorites.slice(index * itemsOnPage, (index + 1) * itemsOnPage)
    );
    const renderCard = itemsArray[pagePosition - 1] || [];
    setRenderCards(renderCard);
  };


  return (
    <div className='bg-white  w-full h-full overflow-hidden '>
      {
        favCourse &&
        favCourse.length > 0 ? (
          <div  className="bg-[#FF6B6C] h-[40px] w-[230px] bottom-8 left-6 absolute  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
        <button onClick={handleEliminate}>Eliminar Todos</button>
      </div>
        ) : (
          <Link></Link>
        )
      }
      <div  className="bg-[#FF6B6C] h-[40px] w-[230px] bottom-6 right-8 absolute  flex flex-row items-center justify-center overflow-y-hidden overflow-x-hidden  text-black text-[20px] rounded-lg hover:bg-red-500 font-medium">
       <Link to='/home'> 
       <button >Ver mas cursos</button>
       </Link>
      </div> 
        { favCourse !== null && favCourse.length > 0 ?(<div className=" w-[900px] border-b-[2px] border-[#848484] mt-[5px] mx-[90px]">
              <h1 className="text-[25px] text-[#1F1F1F] m-[2px]">{`Cursos Favoritos: ${favCourse.length}`}</h1>
            </div>):(
              <Link></Link>
            )}
      
      <div className=' '>
        <div className="flex justify-evenly items-center h-[75%] w-full">
          {favCourse &&
            favCourse.length > 0 &&
            renderCards.map((element, index) => (
              <div key={index}>
                <Card course={element} removeFromFavorites={removeFromFavorites} />
              </div>
            ))}
        </div>
        <div className=" ">
          {
            favCourse &&
            favCourse.length > 0 ? ( 
              <div className='h-[70px] items-center justify-center flex flex-row w-full'>
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
              <div className='flex justify-center my-[100px] text-3xl font-bold'>
                <h1 >No hay cursos favoritos</h1>
              </div>
            )
          }
              
            </div>
      </div>

    </div>
  )
}

export default Favorite