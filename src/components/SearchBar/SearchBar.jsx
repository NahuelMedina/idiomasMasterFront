import { IoSearchCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { search } from "../../redux/action/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(search(searchTerm));
    setSearchTerm(""); 
    navigate('/home')
  };


  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value); 
  };

  return (
    <div className="flex items-center justify-start h-full w-[600px]">
      <input
        placeholder="Busca y Aprende un idioma Nuevo"
        type="search"
        className="w-[450px] h-[50px] bg-[#ffffff] border-2 border-[#ffffff] rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition"
        value={searchTerm}
        onChange={handleSearch}
      />
      <IoSearchCircle
        className="text-[60px] cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95"
        onClick={handleSubmit}
        type="submit"
      />
    </div>
  );
};
