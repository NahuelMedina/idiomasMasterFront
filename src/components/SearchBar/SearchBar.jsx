import { IoSearchCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { search } from "../../redux/action/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    dispatch(search(searchTerm));
    navigate("/home");
  };

  return (
    <div className="text-center">
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" text-black border-1 rounded-lg"
        placeholder="Buscar..."
      />
      <button type="submit" onClick={handleSubmit} className="h-3 w-3">
        <IoSearchCircle />
      </button>
    </div>
  );
};
