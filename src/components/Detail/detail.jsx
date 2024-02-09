import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoursesDetail } from "../../redux/action/actions";

export const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.courseDetail);

  useEffect(() => {
    dispatch(getCoursesDetail(params.id));
  }, []);

  return (
    <div className="bg-[#FFFFFF] w-screen h-screen text-white container flex justify-center items-center">
      <div>
        <img
          className="mt-10 h-[450px] w-[500px] bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105"
          src={detail?.image}
          alt={detail?.lenguage}
        />
      </div>
      <div className="flex justify-center h-[95%] w-4/5 bg-[#1E68AD] p-10">
        <div className=" flex flex-col justify-center items-start text-center h-full w-3/5">
          <div className=" flex flex-col justify-center items-start rounded-xl">
            <p className="font-medium text-center   text-[#FF6B6C] uppercase  mt-8 text-6xl animate-fade-right animate-ease-in-out">
              {detail?.language}
            </p>
            <p className="text-[#FFFFFF] mt-5 mb-10 text-2xl font-normal opacity-70 text-start first-letter:text-3xl  ">
              Comienza con tan solo ${detail?.price}
            </p>
            <p className="text-[#FFFFFF] border-b border-white/40  pb-1  font-normal  text-2xl   ">
              Nivel {detail?.level}
            </p>
            <p className="text-[#FFFFFF] mt-5 border-b border-white/40 pb-1 font-normal  text-2xl    ">
              {detail?.schedule}
            </p>
            <p className="text-[#FFFFFF] mt-5 border-b border-white/40 pb-1 font-normal  text-2xl   ">
              Duracion de {detail?.duration}
            </p>
            <p className="text-[#FFFFFF] mt-5 border-b border-white/40 pb-1 font-normal  text-2xl   ">
              Empieza el dia {detail?.start_time}
            </p>
            <p className="text-[#FFFFFF] mt-5 border-b border-white/40 pb-1 mb-5 font-normal  text-2xl ">
              Finaliza el dia {detail?.finish_time}
            </p>
            <button className=" text-start mt-5 mb-16 p-2 bg-[#FFFFFF] text-[#000000] hover:text-[#FFFFFF] hover:bg-[#FF6B6C] rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <p className=" m-2 text-2xl  "> Comprar ahora</p>{" "}
            </button>
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
