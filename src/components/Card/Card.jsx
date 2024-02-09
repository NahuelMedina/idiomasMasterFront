import { Link } from "react-router-dom";
export const Card = ({ course }) => {

  return (
    <div className="bg-slate-950 border rounded-lg  border-gray-700 mt-8">
      <div>
        <img src={course.image} alt={course.lenguage} className='h-[150px] w-[200px] rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105'/>
      </div>
      <div>
        <h2 className="flex justify-center">{course.language}</h2>
        <p className="flex justify-center">Nivel {course.level}</p>
        <p className="flex justify-center">{course.schedule}</p>
        <p className="flex justify-center">Duracion de {course.duration}</p>
      </div>
      <Link to={`/detail/${course._id}`}>
        <button className="ml-8 px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out">Obtener Ahora</button>
      </Link>
    </div>
  );
};
