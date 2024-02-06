import { Card } from "../Card/Card";

export const Cards = () => {
  const cardExample = [
    {
      id: 1,
      lenguage: "Inglés",
      company_course: "juan",
      level: "Principiante",
      instructor: "John Smith",
      schedule: "Lunes y Miércoles, 18:00 - 20:00",
      location: "Centro de Idiomas ABC",
      image: "https://example.com/ingles.jpg",
      duration: "1 Month",
    },
    {
      id: 2,
      lenguage: "Portuguese",
      company_course: "tr",
      level: "Principiante",
      instructor: "John Smith",
      schedule: "Lunes y Miércoles, 18:00 - 20:00",
      location: "Centro de Idiomas ABC",
      image: "https://example.com/ingles.jpg",
      duration: "1 Month",
    },
  ];
  return (
    <div className="divCardsContainer">
      {cardExample?.map((c) => (
        <Card
          key={c.company_course}
          id={c.company_course}
          lenguage={c.lenguage}
          level={c.level}
          schedule={c.schedule}
          duration={c.duration}
          image={c.image}
        />
      ))}
    </div>
  );
};
