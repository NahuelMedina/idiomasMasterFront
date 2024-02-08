import { IoSearchCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { search } from "../../redux/action/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(search(document.getElementById("search").value));
  };

  return (
    <div className="text-center">
      <input
        id="search"
        type="text"
        className=" text-black"
        placeholder="Buscar..."
      ></input>
      <button type="submit" onClick={handleSubmit} className="h-3 w-3">
        <IoSearchCircle />
      </button>
    </div>
  );
};
