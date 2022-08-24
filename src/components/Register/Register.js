import { useState } from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";
import { useValidation } from "../../utils/validation";
import logo from "../../images/logo.svg";

function Register({ onRegister, statusMessage }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const nameValid = useValidation(true);
  const emailValid = useValidation(true);
  const passwordValid = useValidation(true);
  const isFormWrong =
    nameValid.isWrong || emailValid.isWrong || passwordValid.isWrong;
  const submitButtonClassName = `register__submit ${
    isFormWrong && "register__submit_disabled"
  }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  function handleRegistrationSubmit(e) {
    e.preventDefault();
    onRegister(data.name, data.email, data.password);
  }

  return (
    <div className="register">
      <div className="register__container">
        <NavLink to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </NavLink>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          className="form form__register"
          method="post"
          onSubmit={handleRegistrationSubmit}
          autoComplete="off"
          noValidate
        >
          <label className="form__label">Имя</label>
          <input
            className="form__input"
            type="text"
            required
            placeholder="Имя"
            name="name"
            id="name-input"
            minLength="2"
            maxLength="30"
            onChange={(e) => {
              handleChange(e);
              nameValid.onChange(e);
            }}
          />
          <span className="form__input-error">
            {nameValid.isWrong && nameValid.errorMessage}
          </span>
          <label className="form__label">E-mail</label>
          <input
            className="form__input"
            type="email"
            required
            placeholder="email"
            name="email"
            id="email-input"
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
            minLength="4"
            onChange={(e) => {
              handleChange(e);
              passwordValid.onChange(e);
            }}
          />
          <span className="form__input-error">
            {passwordValid.isWrong && passwordValid.errorMessage}
          </span>
          <span className="form__error_result-reg">
            {statusMessage.length !== 0 && statusMessage}
          </span>
          <button
            className={submitButtonClassName}
            disabled={isFormWrong}
            type="submit"
          >
            Зарегистрироваться
          </button>
          <p className="form__text">
            Уже зарегистрированы?
            <NavLink to="/signin" className="form__link">
              Войти
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
