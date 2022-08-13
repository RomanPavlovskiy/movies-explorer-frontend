import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/MoviesList';

function Movies() {
    return (
      <section className='movies'>
        <SearchForm />
        <MoviesCardList
          cards={cards}
          buttonMore={true} />
      </section>
    );
  };
  
  export default Movies;