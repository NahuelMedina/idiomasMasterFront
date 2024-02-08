import { Link } from "react-router-dom";
export const Card = ({ course }) => {
  return (
    <div>
      <div>
        <img src={course.image} alt={course.lenguage} className='h-[150px] w-[200px]'/>
      </div>
      <div>
        <h2>{course.language}</h2>
        <h2>{course.language}</h2>
        <p>{course.level}</p>
        <p>{course.schedule}</p>
        <p>{course.duration}</p>
      </div>
      <Link to={`/detail/${course.id}`}>
        <button>Obtener Ahora</button>
      </Link>
    </div>
  );
};
