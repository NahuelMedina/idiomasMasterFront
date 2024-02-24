import Slider from "react-slick";
import AboutCard from "./AboutCard";

import { useTranslation } from "react-i18next";


export const About = () => {

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "80px",
    slidesToShow: 3,
    speed: 500
  };

  const userinfo = [{name:"Antonio"}, {name:"Antonio"}, {name:"Antonio"}, {name:"Antonio"}, {name:"Antonio"}, {name:"Antonio"}]


  const { t , i18n} = useTranslation()


  return (
    <div className="w-full h-[110vh] mt-[80px] flex flex-col items-center justify-center">
      <div className="w-full h-[40%] flex  flex-col items-center justify-center">
        <div className="w-full h-[40%] flex justify-center">
        <h1 className="text-[60px] font-bold bg-gradient-to-r from-blue-700 to-pink-600 text-transparent bg-clip-text">Nuestro Proyecto</h1>
        </div>
        <div className="w-[70%] h-[70%] flex items-center justify-center ">
          <h1 className="text-[20px]">
            El interés de la población hispana por el crecimiento personal
            continuo y por su formación profesional crea la necesidad de nuevos
            aprendizajes que les permitan conectarse con el mundo. Por ello,
            seis estudiantes de SOY HENRY crearon en su proyecto final una
            plataforma donde se ofrecen diversos cursos de idiomas que se
            acomodan a las necesidades e intereses de sus usuarios.
          </h1>
        </div>
      </div>
      <div className="w-[1300px] h-[1000px] flex flex-col">
      <div className="w-full h-[150px] flex items-center justify-center">
        <h1 className="text-[60px] font-bold bg-gradient-to-r from-red-500 to-amber-500 text-transparent bg-clip-text">Nuestro Equipo</h1>
        </div>
      <Slider {...settings}>
      {userinfo.map((element) => (
                  <AboutCard
                   
                  />
                ))} 
      </Slider>
      </div>

      {/* <div className="w-3/5	">
        <img
          className="w-full h-full object-cover"
          src="img\image-about.jpg"
          alt=""
        />
      </div>
      <div className="w-2/5 bg-[#1F1F1F] flex justify-center items-center border-[#1E68AD] border-l-2 text-[#FFFFFF]">
        <div className="flex flex-col justify-evenly h-full ">
          <h1 className="text-4xl font-bold text-center pt-2 underline-offset-8 underline">
            {t("SOBRE_NOSOTROS")}
          </h1>
          <p className="text-xl text-center p-10 border-[#1E68AD] border-b-2">
              {t("EL_INTERES")}
          </p>
          <h3 className="text-center font-bold text-4xl underline-offset-8 underline">
            {t("EQUIPO_DE_TRABAJO")}
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
      </div> */}
    </div>
  );
};
