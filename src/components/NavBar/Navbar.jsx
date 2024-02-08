import { Link, NavLink, useLocation } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
export const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex h-20 justify-between items-center text-white bg-black">
      <div className="flex justify-center w-1/2 items-center gap-20">
        <Link to="/">
          <img
            className="w-32"
            src="src\assets\logo\logo_idiomaster-removebg-preview.png"
          ></img>
        </Link>
        <div>
          <NavLink className="navButton">Sobre Nosotros</NavLink>
        </div>
        <div>
          <NavLink className="navButton">Curso</NavLink>
        </div>
        <div>
          <NavLink className="navButton" to="/home">
            Explorar
          </NavLink>
        </div>
      </div>
      <div>
        {location.pathname === '/'? (
          <SearchBar></SearchBar>
        )
      :<Link></Link>
      }
        
      </div>
      <div className="mr-20">
        {location.pathname !== "/register" && location.pathname !== "/login" ? (
          <Link to="/register" className="navButton">
            Registrarse
          </Link>
        ) : (
          <Link></Link>
        )}
      </div>
    </div>
  );
};
