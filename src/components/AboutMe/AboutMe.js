import './AboutMe.css';
import myPicture from '../../images/myPicture.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h3 className='about-me__title'>Студент</h3>
      <img className='about-me__pic' src={myPicture} alt='Фото выпускника' />
      <h4 className='about-me__name'>Роман</h4>
      <p className='about-me__about'>Менеджер в рекламном агентстве, 31 год</p>
      <p className='about-me__text'>После университета пошел работать в рекламную сферу, и нахожусь в ней по сей день. После пандемии появилось желание изучать что-то новое в сфере IT, и вот спустя 9 месяцев обучения я пишу дипломную работу.</p>
      <ul className='about-me__contacts'>
        <li className='about-me__link'><a href='https://vk.com' aria-label='Моя страница на VK' target='_blank' rel='noreferrer'>VK</a></li>
        <li className='about-me__link'><a href='https://github.com/RomanPavlovskiy' aria-label='Моя страница на GitHub' target='_blank' rel='noreferrer'>GitHub</a></li>
      </ul>
    </section>
  );
};

export default AboutMe;