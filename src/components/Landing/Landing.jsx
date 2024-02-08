import { useSelector } from "react-redux";
import { SearchBar } from "../SearchBar/SearchBar";
import { Card } from "../Card/Card";


export const Landing = () => {

  const search = useSelector(state => state.coursesName)

console.log(search);
  return (
    <div className="flex w-screnn h-screen bg-black text-white">

      <div className="flex justify-center items-center w-1/2">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-6xl">Es divertido hacer</p>
            <p className="text-6xl text-center">LO IMPOSIBLE</p>
          </div>
          <div>
            <h1 className="flex justify-center items-center font-bold">Busca el idioma que quieres aprender!!</h1>
            <SearchBar></SearchBar>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {search.length > 0 ? (
          search.map((course, index) => <Card key={index} course={course} />)
          ) : (
          <div>
           <h2>No hay cursos de tal idioma</h2>
          </div>
          )}
      </div>
     
    </div>
  );
};
