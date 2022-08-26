import profileIcon from "../../images/profileIcon.svg";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <input
        className="navigation__toggle"
        id="navigation__toggle"
        type="checkbox"
      />
      <label className="navigation__btn" htmlFor="navigation__toggle">
        <span className="navigation__btn-img"></span>
      </label>
      <div className="navigation__background"></div>
      <div className="navigation__container">
        <ul className="navigation__items">
          <li className="navigation__item navigation__item_type_main">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "navigation__link navigation__link_type_active"
                  : "navigation__link"
              }
            >
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? "navigation__link navigation__link_type_active"
                  : "navigation__link"
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive
                  ? "navigation__link navigation__link_type_active"
                  : "navigation__link"
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className="navigation__item navigation__item_type_account">
          <a
            className="navigation__link navigation__link_type_account"
            href="/profile"
          >
            Аккаунт
          </a>
          <img
            className="navigation__link-img"
            src={profileIcon}
            alt="Профайл"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
