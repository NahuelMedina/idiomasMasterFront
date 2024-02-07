import { Link, NavLink, useLocation } from "react-router-dom";
export const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex h-20 justify-between items-center text-white bg-black">
      <div className="flex justify-center w-1/2 items-center gap-20">
        <img
          className="w-32"
          src="src\assets\logo\logo_idiomaster-removebg-preview.png"
        ></img>
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
<<<<<<< HEAD
      <div className="mr-20">
        {location.pathname !== "/register" && location.pathname !== "/login" ? (
          <Link to="/register" className="navButton">
            Registrarse
          </Link>
        ) : (
          <Link></Link>
        )}
=======
      <div>
        <button className="navButton">Cursos</button>
      </div>
      <div>
        <Link to='/home'>
          <button className="navButton">Explorar</button>
        </Link>
      </div>
      <div className="loginDiv">
        <button className="navButton">Registrarse</button>
>>>>>>> 3f73ac229de72e66f06dae29e63c58a9d2a969dd
      </div>
    </div>
  );
};
