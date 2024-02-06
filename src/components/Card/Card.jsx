export const Card = ({ image, language, level, schedule, duration }) => {
  const cardExample = {
    id: 1,
    language: "Inglés",
    level: "Principiante",
    instructor: "John Smith",
    schedule: "Lunes y Miércoles, 18:00 - 20:00",
    location: "Centro de Idiomas ABC",
    image: "https://example.com/ingles.jpg",
    duration: "1 Month",
  };
  return (
    <div>
      <div>
        <img src={cardExample.image} alt={cardExample.language} />
      </div>
      <div>
        <h3>{cardExample.language}</h3>
        <p>{cardExample.level}</p>
        <p>{cardExample.schedule}</p>
        <p>{cardExample.duration}</p>
      </div>
      <button>Obtener Ahora</button>
    </div>
  );
};
