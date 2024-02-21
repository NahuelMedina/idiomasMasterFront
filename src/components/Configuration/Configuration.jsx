import React, { useState } from "react";
import ProfileSection from "./ProfileSection";
import PaymentSection from "./PaymentSection";
import PrivacySection from "./PrivacySection";
import NotificationSection from "./NotificationSection";
import CourseSection from "./CourseSection";
import ReviewSection from "./PrivacySection";

export const Configuration = () => {
  const [selectedSection, setSelectedSection] = useState("perfil");

  const [options, setOptions] = useState({
    perfil: true,
    pago: false,
    review: false,
    notificaciones: false,
    cursos: false,
  });

  const handleClick = (element) => {
    const updatedOptions = {
      perfil: false,
      pago: false,
      review: false,
      notificaciones: false,
      cursos: false,
      [element]: true,
    };
    setOptions(updatedOptions);
  };

  // funcion para renderizar la sección seleccionada

  return (
    <div className=" w-full h-[80vh] mt-[80px] flex flex-col items-center">
      <div className="flex items-center w-[80%] h-[10%]  ">
        <h2 className="pl-3 mb-4 text-[30px] font-semibold">
          Configuracion Cuenta
        </h2>
      </div>
      <div className="h-[90%] w-[90%] flex flex-row min-w-[20%] ">
        <div className="flex-col-6 min-w-[20%] h-full pl-[15px] justify-end">
          <div
            className={`flex items-center h-[10%] font-bold border-l-[1px]  border-t-[1px] border-b-[1px] cursor-pointer ${options.perfil
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500"
                : "bg-white"
              }`}
            onClick={() => handleClick("perfil")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">
              Mi Perfil
            </p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[1px] border-b-[1px]   cursor-pointer ${options.cursos
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500"
                : "bg-white"
              }`}
            onClick={() => handleClick("cursos")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">
              Mis Cursos
            </p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[1px]  border-b-[1px]   cursor-pointer ${options.pago
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500"
                : "bg-white"
              }`}
            onClick={() => handleClick("pago")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">Mis Pagos</p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[1px] border-b-[1px]  cursor-pointer ${options.review
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500 "
                : "bg-white"
              }`}
            onClick={() => handleClick("review")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">
              Mis Reseñas
            </p>
          </div>
          {/* <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[2px]  border-t-[1px] border-b-[2px]   cursor-pointer ${
              options.notificaciones
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500 "
                : "bg-white"
            }`}
            onClick={() => handleClick("notificaciones")}
          >
            <p className="text-[18px] ml-[20px] ">Notificaciones</p>
          </div> */}
        </div>
        <div className="w-full border-[1px] border-blue-500 ">
          {options.perfil ? <ProfileSection /> : null}
          {options.pago ? <PaymentSection /> : null}
          {options.review ? <ReviewSection /> : null}
          {options.notificaciones ? <NotificationSection /> : null}
          {options.cursos ? <CourseSection /> : null}
        </div>
      </div>
    </div>
  );
};
