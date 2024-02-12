import React from "react";
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
    <div className='mt-12 text-white flex justify-around container bg-opacity-50 backdrop-filter backdrop-blur-lg'>
      <div>
        <img className='mt-10 h-[450px] w-[500px] bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105' src={detail?.image} alt={detail?.lenguage} />

      </div>
      <div>
        <p className="font-black text-sky-600  m-8 text-8xl ">
          {detail?.language}
        </p>
        <div className="p-15 m-6  ">
          <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
            Nivel {detail?.level}
          </p>
          <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
            {detail?.schedule}
          </p>
          <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
            Duracion de {detail?.duration}
          </p>
          <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
            Empieza el dia {fechaInicial}
          </p>
          <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
            Finaliza el dia {fechaFinal}
          </p>
          <button className="ml-24 px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <p className="text-slate-300 m-2 font-bold text-3xl  ">
              {" "}
              Comprar: ${detail?.price}
            </p>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
