import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { handbook } from "../data/handbook";
import { getLastReadSection } from "../utils/progress";

export default function HomePage() {
  const firstChapter = handbook[1]; // Первая глава после введения
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    const progress = getLastReadSection();
    if (progress) {
      const chapter = handbook.find((ch) => ch.id === progress.chapterId);
      if (chapter) {
        const section = chapter.sections.find((s) => s.id === progress.sectionId);
        if (section) {
          setLastRead({
            chapterId: progress.chapterId,
            sectionId: progress.sectionId,
            chapterTitle: chapter.title,
            sectionTitle: section.title,
          });
        }
      }
    }
  }, []);

  return (
    <div className="home-page fade-in">
      <div className="home-hero">
        <h1>Методическое пособие</h1>
        <p className="home-subtitle">
          Проектирование и разработка мультимедийного контента и пользовательского интерфейса
        </p>
        {lastRead ? (
          <div className="continue-reading">
            <Link
              to={`/read/${lastRead.chapterId}/${lastRead.sectionId}`}
              className="btn btn-primary"
            >
              Продолжить чтение
            </Link>
            <p className="continue-info">
              Последний прочитанный раздел: {lastRead.sectionTitle}
            </p>
          </div>
        ) : (
          <Link to={`/read/${firstChapter?.id || 'intro'}`} className="btn btn-primary">
            Начать изучение
          </Link>
        )}
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

