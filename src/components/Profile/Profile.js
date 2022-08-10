import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Роман!</h2>
        <div className='profile__element'>
          <p className='profile__element-value profile__element-value_weight'>Имя</p>
          <p className='profile__element-value'>Роман</p>
        </div>
        <div className='profile__element'>
          <p className='profile__element-value profile__element-value_weight'>E-mail</p>
          <p className='profile__element-value'>roman.mrkat91@yandex.ru</p>
        </div>
      </div>
      <div className='profile__links'>
        <a className='profile__link' href='/'>Редактировать</a>
        <a className='profile__link profile__link_exit' href='/'>Выйти из аккаунта</a>
      </div>
    </section>
  )
}

export default Profile;