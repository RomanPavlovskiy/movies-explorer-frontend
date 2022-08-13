import './Login.css';
import logo from '../../images/logo.svg';


function Login() {
  return (
    <div className='login'>
      <div className='login__container'>
      <a href='/'><img className='login__logo' src={logo} alt='Логотип' /></a>
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='form' method="post">
          <label className='form__label'>E-mail</label>
          <input className='form__input' type='email' required />
          <span className='form__input-error'>Что-то пошло не так...</span>
          <label className='form__label'>Пароль</label>
          <input className='form__input' type='password' required />
          <span className='form__input-error'>Что-то пошло не так...</span>
          <button className='form__submit form__submit_type_login' type='submit'>Войти</button>
          <p className='form__text'>Ещё не зарегистрированы? <a href='/signup' className='form__link'>Регистрация</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;