import { Link } from "react-router-dom";
export const Card = ({ course }) => {
  return (
    <div className={styles.contain}>
      <div>
        <img
          className={styles.image}
          src={course.image}
          alt={course.lenguage}
        />
      </div>
      <div>
        <h2>{course.lenguage}</h2>
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
