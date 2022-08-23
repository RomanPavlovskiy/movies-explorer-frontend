import "./MoviesCardList.css";
import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useScreenSizeHandler } from "../../utils/screenSizeHandler";

function MoviesCardList({
  cards,
  savedMovies,
  saveMovie,
  getMovies,
  deleteMovie,
  showPreloader,
  isSearchError,
}) {
  const path = useLocation();
  const { displayedMovies, displayMoreMovies } = useScreenSizeHandler(cards);

  return (
    <>
      <Preloader showPreloader={showPreloader} />
      <p
        className={`movies-card-list__text ${
          isSearchError && "movies-card-list__text_visible"
        }`}
      >
        Произошла ошибка. Попробуйте позже.
      </p>
      <p
        className={`movies-card-list__text ${
          ((path.pathname === "/movies" &&
            displayedMovies?.length === 0 &&
            localStorage.getItem("beatFilmMovies")) ||
            (path.pathname === "/saved-movies" && cards?.length === 0)) &&
          "movies-card-list__text_visible"
        }`}
      >
        Ничего не найдено
      </p>
      <section className="movies-card-list" aria-label="Фильмы">
        {path.pathname === "/movies" &&
          displayedMovies.map((card) => (
            <MoviesCard
              key={card.id || card._id}
              card={card}
              getMovies={getMovies}
              savedMovies={savedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          ))}
        {path.pathname === "/saved-movies" &&
          cards.map((card) => (
            <MoviesCard
              key={card.id || card._id}
              card={card}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          ))}
      </section>
      <section className="movies-card-list__more">
        {Boolean(
          (path.pathname === "/movies") &
            (cards.length > displayedMovies.length)
        ) && (
          <button
            className="movies-card-list__more-button"
            onClick={displayMoreMovies}
          >
            Ещё
          </button>
        )}
      </section>
    </>
  );
}

export default MoviesCardList;
