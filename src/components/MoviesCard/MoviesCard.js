import './MoviesCard.css';

function MoviesCard({ card }) {
  return (
    <article className='movies-card'>
      <button className='movies-card__delete'></button>
      <img src={card.image} alt={card.title} className='movies-card__photo' />
      <div className='movies-card__text'>
        <h2 className='movies-card__title'>{card.title}</h2>
        <p className='movies-card__duration'>{card.duration}</p>
      </div>
    </article>
  );
};

export default MoviesCard;