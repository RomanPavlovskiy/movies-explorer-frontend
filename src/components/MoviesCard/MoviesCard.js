import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ card, savedMovies, saveMovie, getMovies, deleteMovie }) {
  const duration = `${Math.trunc(card.duration / 60)}ч ${card.duration % 60}м`;
  const path = useLocation();
  const isSaved = savedMovies?.some((i) => i.movieId === card.id);
  const cardButtonClassName = `movies-card__favorite-btn movies-card__favorite-btn_is_hidden ${
    isSaved && "movies-card__favorite-btn_is_saved"
  }`;

  function handleSaveClick() {
    saveMovie(card);
    getMovies();
  }

  function handleDeleteClick() {
    deleteMovie(card);
  }

  function handleTrailerOpen() {
    window.open(`${card.trailerLink}`, `Трейлер фильма "${card.nameRU}"`);
  }

  return (
    <article className="movies-card">
      {path.pathname === "/movies" && (
        <label className="movies-card__favorite-container">
          <input
            aria-label="Добавить в Сохраненные фильмы"
            type="checkbox"
            className="movies-card__favorite-btn-hide"
            id={card.id}
            onChange={handleSaveClick}
          />
          <span className={cardButtonClassName} />
        </label>
      )}

      {path.pathname === "/saved-movies" && (
        <button
          aria-label="Удалить из Сохраненных фильмов"
          type="button"
          className="movies-card__del-btn"
          id={card.id}
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="movies-card__image"
        src={
          path.pathname === "/movies"
            ? `https://api.nomoreparties.co${card.image.url}`
            : card.image
        }
        alt={card.nameRU}
        onClick={handleTrailerOpen}
      />
      <div className="movies-card__title-container">
        <div className="movies-card__text">
          <h2 className="movies-card__title">{card.nameRU}</h2>
          <span className="movies-card__duration">{duration}</span>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
