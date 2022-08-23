import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h3 className="about-project__title">О проекте</h3>
      <ul className="about-project__elements">
        <li className="about-project__element">
          <h4 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__element">
          <h4 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__deadlines">
        <li className="about-project__deadline">
          <p className="about-project__deadline-subtitle about-project__deadline-subtitle_backend">
            1 неделя
          </p>
          <p className="about-project__deadline-text">Back-end</p>
        </li>
        <li className="about-project__deadline">
          <p className="about-project__deadline-subtitle about-project__deadline-subtitle_frontend">
            4 недели
          </p>
          <p className="about-project__deadline-text">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
