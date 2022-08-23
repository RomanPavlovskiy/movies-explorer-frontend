import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <a href="/" className="form__link form__link_type_not-found">
        Назад
      </a>
    </section>
  );
}

export default NotFound;
