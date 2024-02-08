import { Link, NavLink, useLocation } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
export const Navbar = () => {
  const location = useLocation();
  const styleNavLink = ({ isActive }) =>
    isActive ? "text-indigo-900 font-semibold" : "text-white font-semibold";
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
          <NavLink className={styleNavLink} to="/about">
            Sobre Nosotros
          </NavLink>
        </div>
        <div>
          <NavLink className={styleNavLink}>Curso</NavLink>
        </div>
        <div>
          <NavLink className={styleNavLink} to="/home">
            Explorar
          </NavLink>
        </div>
      </div>
      <div>
        {location.pathname !== '/'? (
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
