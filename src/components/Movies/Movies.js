import { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
import { SetFilterMovies } from "../../utils/filterMovies";

function Movies({ savedMovies, saveMovie }) {
  const [beatFilmMovies, setBeatFilmMovies] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const {
    short,
    filteredMovies,
    inputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    filterMovies,
  } = SetFilterMovies(beatFilmMovies, "beatFilm", false, getMoviesBeatfilm);

  function getMoviesBeatfilm() {
    if (localStorage.getItem("beatFilmMovies")) {
      setBeatFilmMovies(JSON.parse(localStorage.getItem("beatFilmMovies")));
      filterMovies(
        JSON.parse(localStorage.getItem("beatFilmMovies")),
        inputSearch,
        short
      );
    } else {
      setShowPreloader(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setBeatFilmMovies(data);
          localStorage.setItem("beatFilmMovies", JSON.stringify(data));
          filterMovies(data, inputSearch, short);
          setIsSearchError(false);
        })
        .catch((err) => {
          setIsSearchError(true);
          console.log(err);
        })
        .finally(() => setShowPreloader(false));
    }
  }

  useEffect(() => {
    setIsSearchError(false);
    if (localStorage.getItem("beatFilmMovies")) {
      setBeatFilmMovies(JSON.parse(localStorage.getItem("beatFilmMovies")));
    }
  }, []);

  return (
    <section className="movies">
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleInputChange}
        handleShort={handleSwitchShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        short={short}
        cards={filteredMovies}
        savedMovies={savedMovies}
        saveMovie={saveMovie}
        showPreloader={showPreloader}
        isSearchError={isSearchError}
      />
    </section>
  );
}

export default Movies;
