export const About = () => {
  return (
    <div className="w-screen h-screen mt-[80px] flex animate-fade animate-once animate-ease-in">
      <div className="w-3/5	">
        <img
          className="w-full h-full object-cover"
          src="img\image-about.jpg"
          alt=""
        />
      </div>
      <div className="w-2/5 bg-[#1F1F1F] flex justify-center items-center border-[#1E68AD] border-l-2 text-[#FFFFFF]">
        <div className="flex flex-col justify-evenly h-full ">
          <h2 className="text-4xl font-bold text-center pt-2 underline-offset-8 underline">
            Sobre Nosotros
          </h2>
          <p className="text-xl text-center p-10 border-[#1E68AD] border-b-2">
            El interés de la población hispana por el crecimiento personal
            continuo y por su formación profesional, crea la necesidad de nuevos
            aprendizajes que le permitan conectarse con el mundo, por ello 6
            estudiantes de SOY HENRY, crearon en su proyecto final una
            plataforma donde se ofrecen diversos cursos de idiomas, que se
            acomodan a las necesidades e intereses de sus usuarios.
          </p>
          <h3 className="text-center font-bold text-4xl underline-offset-8 underline">
            Equipo de trabajo
          </h3>
          <p className="text-center text-lg p-2 font-semibold">
            <div className="flex justify-evenly items-center ">
              <div>
                <p>Bautista Calvo</p>
                <p> Gaspar Moncivaez</p>
                <p>Gastón Yudica</p>
              </div>
              <div>
                <p>Nahuel Medina</p>
                <p>Andrés Arboleda</p>
                <p>Tomas Pon</p>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};
