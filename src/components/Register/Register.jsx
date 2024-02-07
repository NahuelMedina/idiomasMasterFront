import style from "./Register.module.css";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className={style.registerContainer}>
      <h2>Registrarse</h2>
      <form>
        <div className={style.divContainerInputs}>
          <div className={style.divForm1}>
            <label htmlFor="name">Nombre:</label>
            <input name="name" id="name" type="text" />
            <label htmlFor="lastName">Apellido:</label>
            <input name="lastName" id="lastName" type="text" />
            <label htmlFor="password">Constraseña:</label>
            <input name="password" id="password" type="text" />
          </div>
          <div className={style.divForm2}>
            <label htmlFor="email">Email:</label>
            <input name="email" id="email" type="email" />
            <label htmlFor="age">Edad:</label>
            <input name="age" id="age" type="number" />
            <label htmlFor="image">Imagen:</label>
            <input name="image" id="image" type="text" />
          </div>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <div className={style.divRegisterUl}>
        <ul>
          <li>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
