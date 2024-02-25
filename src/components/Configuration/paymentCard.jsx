import { useEffect, useState } from "react";
import { idProduct } from "../Admin/userData";
import { useTranslation } from "react-i18next";

export default function PaymentCard({ id, amount, date, course, status }) {
  const [courses, setCourse] = useState({});
  const { t , i18n} = useTranslation()

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await idProduct(course);

      if (response.data) {
        setCourse(response.data);
      }
    };

    fetchCourse();
  }, [course]);

  return (
    <div className="bg-white shadow-lg border-[1px] border-gray-200 flex flex-col items-center justify-evenly h-[200px] w-full">
      <div className="bg-blue-500 flex flex-col h-[30%] w-full justify-center">
        <h1 className="ml-[15px] text-[17px] text-white">{`${t("NUMERO DE PAGO")} : ${id}`}</h1>
      </div>
      <div className=" flex flex-row h-[70%] w-full">
        <div className="w-[20%] h-full bg-gray-100 flex flex-col items-center justify-center">
          <h1 className=" text-[17px] text-black">{`${t("TOTAL PAGO")} :`}</h1>
          <h1 className=" text-[40px] text-black">{`$ ${Math.floor(
            amount * 0.00026
          )}`}</h1>
        </div>
        <div className="w-[60%] h-full bg-white grid grid-cols-2 items-center justify-center">
          <div className="flex pl-[30px] justify-evenly flex-col w-full h-full">
            <h1 h1 className=" text-[20px] ml-[10px] text-black">
              {t("IDIOMA CURSO")}{" : "}{t(`LANGUAGE_${courses?.language?.toUpperCase()}`)}
            </h1> 
            <h1 h1 className=" text-[20px] ml-[10px] text-black">
            {t("DURACION_DE")}{" : "}{t(`DURACION_${courses?.duration?.toUpperCase()}`)}
            </h1>
            <h1 h1 className=" text-[20px] ml-[10px] text-black">
            {t("NIVEL")}{" : "}{t(`NIVEL_${courses?.level?.toUpperCase()}`)}
            </h1>
          </div>
          <div className=" flex   justify-evenly flex-col w-full h-full">
            <h1 h1 className=" text-[20px] ml-[10px] text-black">
            {t("HORARIOS")}{" : "}{t(`SCHEDULE_${courses?.schedule?.toUpperCase()}`)}
            </h1>
            <h1 h1 className=" text-[20px] ml-[10px] text-black">
              {t("UBICACION")}{" : "}{courses?.location}
            </h1>
            <h1 h1 className=" text-[20px] ml-[10px] text-black">
             {t("FECHA DE PAGO")}{" : "}{date.split("T")[0]}
            </h1>
          </div>
        </div>
        <div className="w-[20%] h-full bg-gray-100 flex flex-col items-center justify-center">
          <h1 className=" text-[17px] text-black">{t("ESTADO DEL PAGO")}{" : "}</h1>
          <h1 className=" text-[25px] text-black">{t(`STATUS_${status?.toUpperCase()}`)}</h1>
        </div>
      </div>
    </div>
  );
}
