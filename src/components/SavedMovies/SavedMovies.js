import "./SavedMovies.css";
import React, { useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SetFilterMovies } from "../../utils/filterMovies";

function SavedMovies({
  cards,
  deleteMovie,
  showPreloader,
  getMovies,
  isSearchError,
}) {
  const {
    short,
    setShort,
    filteredMovies,
    updateFilteredMovies,
    inputSearch,
    setInputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
  } = SetFilterMovies(cards, "saved", true);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    updateFilteredMovies(cards);
    setShort(false);
    setInputSearch("");
  }, [cards]);

  return (
    <section className="saved-movies">
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleInputChange}
        handleShort={handleSwitchShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        cards={filteredMovies}
        short={short}
        deleteMovie={deleteMovie}
        showPreloader={showPreloader}
        isSearchError={isSearchError}
      />
    </section>
  );
}

export default SavedMovies;
