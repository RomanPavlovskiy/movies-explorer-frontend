import { useState, useEffect } from "react";

export function SetFilterMovies(cards, isSaved, initialStateRender, getFilm) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [short, setShort] = useState(false);

  useEffect(() => {
    updateFilteredMovies(
      JSON.parse(localStorage.getItem(`${isSaved}FilteredMovies`) || "[]")
    );
    updateInputSearch(localStorage.getItem(`${isSaved}InputSearch`) || "");
    updateShort(JSON.parse(localStorage.getItem(`${isSaved}Short`) || "false"));
  }, []);

  function updateFilteredMovies(filteredMovies) {
    setFilteredMovies(filteredMovies);
    localStorage.setItem(
      `${isSaved}FilteredMovies`,
      JSON.stringify(filteredMovies)
    );
  }

  function updateInputSearch(inputSearch) {
    setInputSearch(inputSearch);
    localStorage.setItem(`${isSaved}InputSearch`, inputSearch);
  }

  function updateShort(short) {
    setShort(short);
    localStorage.setItem(`${isSaved}Short`, JSON.stringify(short));
  }

  function handleInputChange(evt) {
    const value = evt.target.value.toLowerCase();
    updateInputSearch(value);
  }

  function filterMovies(cards, input, shortCheck) {
    if (input.length === 0 && !initialStateRender) {
      !initialStateRender && updateFilteredMovies([]);
    } else {
      updateFilteredMovies(
        cards.filter(
          ({ nameRU, nameEN, duration }) =>
            (nameRU.toLowerCase().includes(input) ||
              nameEN?.toLowerCase().includes(input)) &
            (!shortCheck || duration <= 40)
        )
      );
    }
  }

  function handleSwitchShort(evt) {
    const inputShortCheckBox = evt.target.checked;
    updateShort(inputShortCheckBox);
    filterMovies(cards, inputSearch, inputShortCheckBox);
  }

  function onSubmitSearch(e) {
    e.preventDefault();
    if (!initialStateRender) {
      getFilm();
    } else {
      filterMovies(cards, inputSearch, short);
    }
  }

  return {
    short,
    filteredMovies,
    setFilteredMovies,
    inputSearch,
    setInputSearch,
    setShort,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    updateFilteredMovies,
    filterMovies,
  };
}
