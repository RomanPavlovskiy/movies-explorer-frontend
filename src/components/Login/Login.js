import { useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";
import { useValidation } from "../../utils/validation";
import logo from "../../images/logo.svg";

function Login({ onLogin, statusMessage }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const emailValid = useValidation(true);
  const passwordValid = useValidation(true);
  const isFormWrong = emailValid.isWrong || passwordValid.isWrong;
  const submitButtonClassName = `login__submit ${
    isFormWrong && "login__submit_disabled"
  }`;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  function handleLoginSubmit(e) {
    e.preventDefault();
    onLogin(data.email, data.password);
  }

  return (
    <div className="login">
      <div className="login__container">
        <NavLink to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </NavLink>
        <h2 className="login__title">Рады видеть!</h2>
        <form
          className="form"
          method="post"
          onSubmit={handleLoginSubmit}
          autoComplete="off"
          noValidate
        >
          <label className="form__label">E-mail</label>
          <input
            className="form__input"
            type="email"
            required
            placeholder="email"
            name="email"
            id="email"
            minLength="5"
            onChange={(e) => {
              handleChange(e);
              emailValid.onChange(e);
            }}
          />
          <span className="form__input-error">
            {emailValid.isWrong && emailValid.errorMessage}
          </span>
          <label className="form__label">Пароль</label>
          <input
            className="form__input"
            type="password"
            required
            placeholder="Пароль"
            name="password"
            id="password"
            minLength="2"
            onChange={(e) => {
              handleChange(e);
              passwordValid.onChange(e);
            }}
          />
          <span className="form__input-error">
            {passwordValid.isWrong && passwordValid.errorMessage}
          </span>
          <span className="form__error_result">
            {statusMessage.length !== 0 && statusMessage}
          </span>
          <button
            type="submit"
            className={submitButtonClassName}
            disabled={isFormWrong}
          >
            Войти
          </button>
          <p className="form__text">
            Ещё не зарегистрированы?{" "}
            <NavLink to="/signup" className="form__link">
              Регистрация
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
