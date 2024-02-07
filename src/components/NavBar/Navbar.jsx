import "../../Styles/styles.css";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="navBar">
      <img
        className="logoNavBar"
        src="src\assets\logo\logo_idiomaster-removebg-preview.png"
      ></img>
      <div>
        <button className="navButton">Sobre Nosotros</button>
      </div>
      <div>
        <button className="navButton">Curso</button>
      </div>
      <div>
        <Link to='/home'>
          <button className="navButton">Explorar</button>
        </Link>
      </div>
      <div className="loginDiv">
        <button className="navButton">Registrarse</button>
      </div>
    </div>
  );
};
