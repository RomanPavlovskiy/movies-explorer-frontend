import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__links'>
        <li className='portfolio__link-element'>
          <a className='portfolio__link' href='https://github.com/RomanPavlovskiy/how-to-learn' target='_blank' rel='noreferrer'>Статичный сайт</a>
        </li>
        <li className='portfolio__link-element'>
          <a className='portfolio__link' href='https://romanpavlovskiy.github.io/russian-travel/' target='_blank' rel='noreferrer'>Адаптивный сайт</a>
        </li>
        <li className='portfolio__link-element'>
          <a className='portfolio__link' href='https://prdiploma.nomoredomains.xyz' target='_blank' rel='noreferrer'>Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;