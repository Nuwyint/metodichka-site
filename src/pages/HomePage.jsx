import { Link } from "react-router-dom";
import { handbook } from "../data/handbook";

export default function HomePage() {
  const firstChapter = handbook[1]; // Первая глава после введения

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Методическое пособие</h1>
        <p className="home-subtitle">
          Проектирование и разработка мультимедийного контента и пользовательского интерфейса
        </p>
        <Link to={`/read/${firstChapter?.id || 'intro'}`} className="btn btn-primary">
          Начать изучение
        </Link>
      </div>

      <div className="home-content">
        <h2>О пособии</h2>
        <p>
          Данное пособие предназначено для изучения основных принципов и этапов создания 
          различных мультимедийных элементов. Вы изучите работу с текстом, графикой, 
          анимацией, видео и звуком, а также научитесь создавать пользовательские интерфейсы.
        </p>

        <h2>Структура</h2>
        <ul className="chapters-preview">
          {handbook.map((chapter) => (
            <li key={chapter.id}>
              <Link to={`/read/${chapter.id}`}>
                {chapter.title}
              </Link>
              {chapter.short && <span className="chapter-short">{chapter.short}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

