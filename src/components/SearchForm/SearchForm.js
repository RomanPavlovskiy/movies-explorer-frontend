import './SearchForm.css';
import searchArrow from '../../images/searchArrow.svg';


function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__film-container'>
        <input className='search-form__film-input' type='text' name='search' placeholder='Фильм' required />
        <button className='search-form__film-button' type='submit'> 
        <img className='search-form__film-button-arrow' src={searchArrow} alt='Поиск' />
        </button>
      </form>
      <div className='search-form__checkbox-container'>
        <input className='search-form__checkbox-input' type='checkbox' />
        <p className='search-form__checkbox-text'>Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;