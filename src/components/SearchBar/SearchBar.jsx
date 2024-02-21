import { IoSearchCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { search } from "../../redux/action/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(search(searchTerm));
      // Si llegamos aquí, significa que se encontraron cursos
      Swal.fire({
        icon: 'success',
        title: 'Hora de aprender',
        text: 'Se encontraron cursos con ese nombre.',
        showConfirmButton: false,
        timer: 2200
      });
      setSearchTerm("");
      navigate("/search");
    } catch (error) {
      // Si se produce un error, significa que no se encontraron cursos
      console.error('Error en la búsqueda:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos!',
        text: 'No hay cursos con ese nombre. Por favor, inténtelo de nuevo.',

      });
    }
  };
  //
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }



  return (
    <div className="flex items-center justify-start h-full w-[400px]">
      <input
        placeholder="Busca y Aprende un idioma Nuevo"
        type="search"
        className="w-[400px] h-[40px] bg-[#ffffff] border-2 border-[#ffffff] rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition"
        value={searchTerm}
        onChange={handleSearch}
      />
      <IoSearchCircle
        className="text-[50px] cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95"
        onClick={handleSubmit}
        type="submit"
      />
    </div>
  );
};
