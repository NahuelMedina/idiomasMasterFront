import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCoursesDetail,  } from "../../redux/action/actions";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa";

export const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.courseDetail);


  useEffect((event) => {
    dispatch(getCoursesDetail(params.id));
    
  }, []);

  const fechaIni = new Date(detail?.start_time);
  const añoI = fechaIni.getFullYear();
  const mesI = ('0' + (fechaIni.getMonth() + 1)).slice(-2); // Sumar 1 al mes ya que en JavaScript los meses van de 0 a 11
  const diaI = ('0' + fechaIni.getDate()).slice(-2);

  const fechaInicial = `${añoI}-${mesI}-${diaI}`;

  const fechafin = new Date(detail?.finish_time);
  const añoF = fechafin.getFullYear();
  const mesF = ('0' + (fechafin.getMonth() + 1)).slice(-2); // Sumar 1 al mes ya que en JavaScript los meses van de 0 a 11
  const diaF = ('0' + fechafin.getDate()).slice(-2);

  const fechaFinal = `${añoF}-${mesF}-${diaF}`;

  return (
    <div className="bg-[#FFFFFF] w-screen h-screen text-white container flex justify-center items-center">
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
                Empieza el dia {detail?.start_time}
              </p>
            </div>
            <div className="text-[#FFFFFF] flex items-center gap-2 mt-5 pb-1 mb-5 font-normal  text-2xl ">
              <FaHourglassEnd />
              <p className="border-b border-white/40">
                Finaliza el dia {detail?.finish_time}
              </p>
            </div>
            <div className="flex">
            <button className=" text-start mt-5 mb-16 p-2 bg-[#FFFFFF] text-[#000000] hover:text-[#FFFFFF] hover:bg-[#FF6B6C] rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <p className=" m-2 text-2xl  "> Comprar ahora</p>{" "}
            </button>
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

