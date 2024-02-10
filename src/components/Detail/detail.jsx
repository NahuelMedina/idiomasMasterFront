import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addCart,  allCartFunction,  allCartStatus,  getCoursesDetail,  } from "../../redux/action/actions";
import { TiShoppingCart } from "react-icons/ti";

export const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.courseDetail);
  const course = useSelector(state => state.coursesCart)
  const allCart = useSelector(state => state.allCart)
  const status = useSelector(state => state.statusCart)

  console.log(course);
  console.log(allCart)

  useEffect(() => {
    dispatch(getCoursesDetail(params.id));
    
  }, []);

  const handleCart = ()=>{
      dispatch(addCart(detail));
      dispatch(allCartFunction(detail));
      dispatch(allCartStatus(detail));
  }

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
            Empieza el dia {detail?.start_time}
          </p>
          <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
            Finaliza el dia {detail?.finish_time}
          </p>
          <div className="flex">
          <button className="ml-24 px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <p className="text-slate-300 m-2 font-bold text-3xl  ">
              Comprar: ${detail?.price}
            </p>
          </button>
          
            { status === false ? (
              <button onClick={handleCart} className="ml-24 px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <p className="text-slate-300 m-2 font-bold text-3xl flex ">
              Agregar al carrito <TiShoppingCart /> 
            </p>
            </button>
            ):(
              <button className="ml-24 px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <Link to='/cart'>
                <p className="text-slate-300 m-2 font-bold text-3xl flex ">
                    Ver el carrito <TiShoppingCart /> 
                </p>
              </Link>
            </button>
            )}
         </div>
        </div>
      </div>
    </div>
  );
};

