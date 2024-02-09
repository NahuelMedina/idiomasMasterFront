export const About = () => {
  return (
    <div className="w-screen flex animate-fade animate-once animate-ease-in">
      <div className="w-3/5	">
        <img
          className="w-full h-full "
          src="https://pixabay.com/get/ge1cf95a681273ac1beefe71e7cfe1f2bd764bbb833d493264f3f444f974096c0015f02754170398bc0f3c77f1d2344f8.jpg"
          alt=""
        />
      </div>
      <div className="w-2/5 bg-[#1E68AD] flex justify-center items-center border-[#02427F] border-l-2 text-[#FFFFFF]">
        <div className="flex flex-col justify-evenly h-full ">
          <h2 className="text-4xl font-bold text-center pt-2 underline-offset-8 underline">
            Sobre Nosotros
          </h2>
          <p className="text-xl text-center p-10 border-[#02427F] border-b-2">
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
                <p>Simón Andrés</p>
                <p>Tomas Pon</p>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};
