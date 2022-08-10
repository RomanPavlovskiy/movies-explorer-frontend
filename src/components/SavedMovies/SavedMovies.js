import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMoviesList from '../../utils/SavedMoviesList';

function SavedMovies() {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        cards={SavedMoviesList}
        buttonMore={false} />
    </section>
  );
};

export default SavedMovies;