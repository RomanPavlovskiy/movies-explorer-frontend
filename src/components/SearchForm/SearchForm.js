import "./SearchForm.css";
import searchArrow from "../../images/searchArrow.svg";
import React, { useState } from "react";

function SearchForm({
  onSubmitSearch,
  short,
  handleShort,
  handleChange,
  inputSearch,
}) {
  const [error, setError] = useState("");
  function noSubmitError(evt) {
    evt.preventDefault();
    setError("Нужно ввести ключевое слово");
  }
  function resetError() {
    setError("");
  }

  return (
    <section className="search-form">
      <form
        className="search-form__film-container"
        onSubmit={inputSearch.length > 0 ? onSubmitSearch : noSubmitError}
        onChange={resetError}
        noValidate
      >
        <input
          className="search-form__film-input"
          type="text"
          name="search"
          placeholder="Фильм"
          required
          minLength="2"
          maxLength="50"
          onChange={handleChange}
          value={inputSearch}
        />
        <button
          className="search-form__film-button"
          type="submit"
          name="submit-search"
        >
          <img
            className="search-form__film-button-arrow"
            src={searchArrow}
            alt="Поиск"
          />
        </button>
      </form>
      <div className="search-form__checkbox-container">
        <input
          className="search-form__checkbox-input"
          type="checkbox"
          checked={short}
          onChange={handleShort}
        />
        <p className="search-form__checkbox-text">Короткометражки</p>
      </div>
      <span id="searchFilm-error" className="search-form__error">
        {error}
      </span>
    </section>
  );
}

export default SearchForm;
