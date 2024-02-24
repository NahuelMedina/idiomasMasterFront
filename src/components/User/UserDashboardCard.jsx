export default function UserDashboardCard({ index, idioma, nivel }) {
    let level = "";
    let contenidoCondicional;
  
    if (nivel === 1) {
      level = "Principiante";
      contenidoCondicional = (
        <div className="h-full w-[65%] grid grid-cols-3 items-center gap-[4px]">
          <div className="h-[30px] w-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-[70px]"></div>
        </div>
      );
    } else if (nivel === 2) {
      level = "Intermedio";
      contenidoCondicional = (
        <div className="h-full w-[65%] grid grid-cols-3 items-center gap-[4px]">
          <div className="h-[30px] w-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-[70px]"></div>
          <div className="h-[30px] w-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-[70px]"></div>
        </div>
      );
    } else {
      level = "Avanzado";
      contenidoCondicional = (
        <div className="h-full w-[65%] grid grid-cols-3 items-center gap-[4px]">
          <div className="h-[30px] w-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-[70px]"></div>
          <div className="h-[30px] w-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-[70px]"></div>
          <div className="h-[30px] w-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-[70px]"></div>
        </div>
      );
    }
  
    return (
      <div className="w-[90%] h-full border-[1px] border-gray-100 ml-[30px] flex flex-row rounded-[50px] shadow-md shadow-black/10 bg-white">
        <div className="h-full w-[30%] flex flex-col items-center justify-evenly">
          <h1 className="text-[22px] text-black">{idioma}</h1>
          <h1 className="text-[17px] text-gray-600">{level}</h1>
        </div>
        {contenidoCondicional}
      </div>
    );
  }
  