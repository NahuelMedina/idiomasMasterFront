import { useState, useEffect } from "react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import UserDashboardCard from "./UserDashboardCard";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";

export default function UserDashboard({ userInfo }) {
  const [userData] = useLocalStorage("userData", {});
  const [idiomas, setIdiomas] = useState({});

  console.log(userInfo);

  useEffect(() => {
    const obtenerNivelesMasAltos = () => {
      const niveles = {
        Principiante: 1,
        Intermedio: 2,
        Avanzado: 3,
      };

      const nivelesMasAltos = {};

      userInfo.forEach((curso) => {
        const { language, level } = curso;

        if (
          !nivelesMasAltos[language] ||
          nivelesMasAltos[language] < niveles[level]
        ) {
          nivelesMasAltos[language] = niveles[level];
        }
      });

      setIdiomas(nivelesMasAltos);
    };

    obtenerNivelesMasAltos();
  }, [userInfo]);

  return (
    <div className="w-full h-full px-[40px] flex flex-row">
      <div className="h-full w-[40%] flex flex-col items-center justify-center">
        <div className="w-full h-[15%] flex items-center justify-center">
          <h1 className="text-[40px] text-black">
            {`Hola, ${userData.name} ${userData.lastname} 👋!`}
          </h1>
        </div>
        <div className="w-[400px] h-[400px] bg-green-500 flex items-center justify-center overflow-hidden rounded-[100%]">
          <img
            src={`${userData.img}`}
            alt={`${userData.img}`}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="h-full w-[50%] flex flex-col items-center justify-center">
        <div className="w-full h-[15%] flex items-center justify-center">
          <h1 className="text-[40px] text-black">Tu Progreso 🏆</h1>
        </div>
        {userInfo && userInfo.length > 0 ? (
          <>
            <div className="w-full h-[400px] grid grid-rows-6 gap-[6px] p-[10px] rounded-[10px] border-gray-200 shadow-md shadow-black/10 bg-gradient-to-r from-sky-400 to-sky-600">
              {Object.entries(idiomas).map(([idioma, nivel], index) => (
                <UserDashboardCard
                  key={index}
                  index={index}
                  idioma={idioma}
                  nivel={nivel}
                />
              ))}
            </div>
          </>
        ) : (
          <>
          <div className="w-full h-[400px] flex flex-col items-center justify-evenly p-[10px] rounded-[10px] border-gray-200 shadow-md shadow-black/10 bg-gradient-to-r from-sky-400 to-sky-600">
          <FaMagnifyingGlassPlus className="text-[90px]" />
            <h1 className="text-[50px]"> Aun No tienes Cursos</h1>
            <h1 className="text-[50px]">Explora nuestros Cursos</h1>

          </div>
          </>
        )}
      </div>
    </div>
  );
}
