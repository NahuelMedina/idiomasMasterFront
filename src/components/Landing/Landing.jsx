import { SearchBar } from "../SearchBar/SearchBar";
export const Landing = () => {
  return (
    <div className="flex w-screnn h-screen bg-black text-white">
      <div className="flex justify-center items-center w-1/2">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-6xl">Es divertido hacer</p>
            <p className="text-6xl text-center">LO IMPOSIBLE</p>
          </div>
          <div>
            <SearchBar></SearchBar>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-1/2">
        <img
          className="rounded-lg"
          src="src\assets\fotos\ingelsperson.jpg"
        ></img>
      </div>
    </div>
  );
};
