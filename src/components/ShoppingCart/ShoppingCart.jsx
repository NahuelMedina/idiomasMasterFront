import { useSelector } from "react-redux"


export const ShoppingCart = ()=>{

    const course = useSelector(state => state.coursesCart)
    console.log(course);

    return(
        <div className='mt-12 text-white flex justify-around container bg-opacity-50 backdrop-filter backdrop-blur-lg'>
            <div>
            <img className='mt-10 h-[450px] w-[500px] bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105' src={course?.image} alt={course?.lenguage} />

            </div>
            <div>
                <p className="font-black text-sky-600  m-8 text-8xl ">
                {course?.language}
                </p>
            <div className="p-15 m-6  ">
                <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
                    Nivel {course?.level}
                </p>
                <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
                    {course?.schedule}
                </p>
                <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
                    Duracion de {course?.duration}
                </p>
                <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
                    Empieza el dia {course?.start_time}
                </p>
                <p className="text-slate-300 m-6 font-bold text-3xl px-2 py-1 rounded-full bg-opacity-50 bg-zinc-700">
                    Finaliza el dia {course?.finish_time}
                </p>
             </div>
            </div>
        </div>
    )
}