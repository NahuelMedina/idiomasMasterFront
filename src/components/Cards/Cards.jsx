import { Card } from "../Card/Card";

export const Cards = (info) => {
  return (
    <div>
      {info?.map((c) => (
        <Card
          key={c.company_course}
          id={c.company_course}
          lenguage={c.lenguage}
          level={c.level}
          duration={c.duration}
          image={c.image}
        />
      ))}
    </div>
  );
};
