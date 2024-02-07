import { Link } from "react-router-dom";

export const Card = ({id,image, lenguage, level, schedule, duration }) => {
  return (
    <div className="divCardContainer">
      <div>
        <img src={image} alt={lenguage} />
      </div>
      <div>
        <h2>{lenguage}</h2>
        <p>{level}</p>
        <p>{schedule}</p>
        <p>{duration}</p>
      </div>
      <Link to={`/detail/${id}`}>
      <button>Obtener Ahora</button>
      </Link>
    </div>
  );
};
