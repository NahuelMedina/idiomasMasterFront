import { Link, useLocation } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import { LuCalendarSearch } from "react-icons/lu";
import { FaShoppingBasket } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../Favorite/UseLocalStorage";

export const Card = ({ course, removeFromFavorites }) => {

  const location = useLocation()
  const [isFav, setIsFav] = useState(false)
  const [fav, setFav] =useLocalStorage("fav", "")


  useEffect(() => {
    if (fav.length === 0) {
      return; 
  }
      const isCourseFav = fav.some(favCourse => favCourse._id === course._id);
      setIsFav(isCourseFav);
  }, [course, fav]);


  const handleFavorite = ()=>{
    setIsFav(!isFav);
    if (!isFav) {
      const item = JSON.parse(window.localStorage.getItem("fav"))
      if(item !== null){
        item.push(course)
        setFav(item)
      } else {
        setFav([course])
      }
    } else {
      const eliminateItem = JSON.parse(window.localStorage.getItem("fav"))
      const filteredFav = eliminateItem.filter(c => c._id !== course._id)
      setFav(filteredFav)
    }
  }

  // const handleEliminateFav = () =>{
  //   const eliminateItem = JSON.parse(window.localStorage.getItem("fav"))
  //   const filteredFav = eliminateItem.filter(c => c._id !== course._id)
  //   setFav(filteredFav)
  // }

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(course._id);
  };
console.log(fav);

return (
    <div className='overflow-hidden h-[520px] w-[350px] m-5 text-black rounded-[10px] shadow-lg shadow-black/50 transform transition-transform hover:scale-105 duration-500 ease-in-out'>
      <div className="h-[250px] w-[450px] bg-green-200 overflow-hidden items-center justify-center flex">
  return (
    <div className='overflow-hidden h-full w-full m-5 text-black rounded-[10px] shadow-lg shadow-black/50 '>
      <div className="h-[30%] w-full overflow-hidden items-center justify-center flex ">
        <img src={course.image} alt={course.lenguage} className='h-full w-full '/>
      </div>
      <div className="bg-[#1E68AD] h-[55%] w-full flex flex-col justify-start">
      <div className=" w-full h-[60px]  flex flex-row items-center justify-center">
      <img src={`/img/${course.language}.png`} alt={course.lenguage} className='h-[30px] w-[30px] m-[10px] '/>
     { location.pathname !== '/favorite' &&
    ( <div className="">
      { 
            isFav  ? (
               <button onClick={handleFavorite} className=" absolute top-2 right-2 text-2xl ">❤️</button>
            ) : (
               <button onClick={handleFavorite} className=" absolute top-2 right-2 text-2xl ">🤍</button>
            )
         } 
      </div>)}
      {location.pathname === '/favorite' && (
      <div>
        <button onClick={handleRemoveFromFavorites} className=" absolute top-2 right-2 text-2xl " >X</button>
      </div>)}
       <h2 className="text-white text-[30px] ">{course.language}</h2>
       </div>
       <div className=" w-full h-[70px]  flex flex-row items-center justify-start">
       <FaRankingStar className="text-[40px] text-yellow-400 m-[30px] "/>
       <h2 className="text-white text-[20px]">{course.level}</h2>
       </div>
       <div className=" w-full h-[70px]  flex flex-row items-center justify-start">
       <GrSchedule className="text-[40px] text-yellow-400 m-[30px] "/>

       <h2 className="text-white text-[20px]">{course.schedule}</h2>
       </div>
       <div className=" w-full h-[60px]  flex flex-row items-center justify-start">
       <LuCalendarSearch  className="text-[40px] text-yellow-400 m-[30px] "/>
       <h2 className="text-white text-[20px]">{course.duration}</h2>
       </div>
      </div>
      <div className="bg-[#FF6B6C] w-full h-[15%] flex flex-row items-center justify-center hover:bg-yellow-500">
      <Link to={`/detail/${course._id}`} className=" w-full h-[50px] flex flex-row items-center justify-center " >
      <FaShoppingBasket  className="text-[25px] m-[15px] "/>
        <button className="text-black text-[25px]">Obtener Ahora</button>
      </Link>
      </div>
     
    </div>
  );
};
