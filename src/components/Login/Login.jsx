import style from "./Login.module.css";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className={style.divLoginContainer}>
      <h2>Iniciar Sesion</h2>
      <form>
        <div>
          <label htmlFor="name">Email:</label>
          <input name="name" id="name" type="text" />
          <label htmlFor="password">Password:</label>
          <input name="password" id="password" type="text" />
        </div>
        <button type="submit">Iniciar Sesion</button>
      </form>
      <div className={style.divLoginUl}>
        <ul>
          <li>
            ¿No tienes cuenta? <Link to="/register">Registrate</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
