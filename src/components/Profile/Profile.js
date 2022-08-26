import "./Profile.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useValidation } from "../../utils/validation";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onClick, editProfile, statusMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(`${currentUser.name}`);
  const [email, setEmail] = useState(`${currentUser.email}`);
  const nameValid = useValidation(false);
  const emailValid = useValidation(false);
  const isFormWrong =
    nameValid.isWrong ||
    emailValid.isWrong ||
    (name === currentUser.name && email === currentUser.email);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const logoutClassName = `profile__logout-button ${
    isFormOpened && "profile__logout-button_hidden"
  }`;
  const editButtonClassName = `profile__edit-button ${
    isFormOpened && "profile__edit-button_hidden"
  }`;
  const submitButtonClassName = `profile__button_hidden ${
    isFormOpened && "profile__button profile__button_disabled"
  } ${!isFormWrong && "profile__button_visible"}`;

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function openForm() {
    setIsFormOpened(true);
  }

  function closeForm() {
    setIsFormOpened(false);
  }

  function handleEditProfileSubmit(e) {
    e.preventDefault();

    editProfile({
      name: name,
      email: email,
    });
    closeForm();
  }

  return (
    <section className="profile">
      <form
        className="profile__form"
        onSubmit={handleEditProfileSubmit}
        noValidate
      >
        <div className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <label className="profile__lable">
            Имя
            <input
              className="profile__input"
              type="text"
              id="name-input"
              required
              name="name"
              minLength="2"
              maxLength="30"
              disabled={!isFormOpened}
              value={name || ""}
              onChange={(e) => {
                handleChangeName(e);
                nameValid.onChange(e);
              }}
            />
            <span className="profile__error">
              {nameValid.isWrong && nameValid.errorMessage}
            </span>
          </label>
          <label className="profile__lable">
            E-mail
            <input
              className="profile__input"
              type="email"
              id="email-input"
              required
              name="email"
              disabled={!isFormOpened}
              value={email || ""}
              onChange={(e) => {
                handleChangeEmail(e);
                emailValid.onChange(e);
              }}
            />
            <span className="profile__error">
              {emailValid.isWrong && emailValid.errorMessage}
            </span>
          </label>
        </div>
        <span className="profile__error profile__error_result">
          {statusMessage.length !== 0 && statusMessage}
        </span>
        <button
          className={submitButtonClassName}
          type="submit"
          disabled={isFormWrong}
        >
          Сохранить
        </button>
        <button
          className={editButtonClassName}
          type="button"
          onClick={openForm}
        >
          Редактировать
        </button>
        <Link className={logoutClassName} onClick={onClick} to="/signin">
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
}

export default Profile;
