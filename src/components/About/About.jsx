import { useTranslation } from "react-i18next";


export const About = () => {
  const { t , i18n} = useTranslation()


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
      </div>
    </div>
  );
};
