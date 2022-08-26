import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <p className="form__link form__link_type_not-found" onClick={() => navigate(-1)}>
        Назад
      </p>
    </section>
  );
}

export default NotFound;
