import { Link } from "react-router-dom";

export default function PrevNextNav({ prev, next }) {
  return (
    <nav className="prev-next-nav">
      <div className="nav-section">
        {prev ? (
          <Link to={`/read/${prev.chapterId}/${prev.sectionId}`} className="nav-link nav-link-prev">
            <span className="nav-arrow">←</span>
            <div className="nav-content">
              <span className="nav-label">Предыдущая тема</span>
              <span className="nav-title">{prev.title}</span>
            </div>
          </Link>
        ) : (
          <div className="nav-link nav-link-prev disabled">
            <span className="nav-arrow">←</span>
            <div className="nav-content">
              <span className="nav-label">Предыдущая тема</span>
              <span className="nav-title">Нет</span>
            </div>
          </div>
        )}
      </div>

      <div className="nav-section">
        {next ? (
          <Link to={`/read/${next.chapterId}/${next.sectionId}`} className="nav-link nav-link-next">
            <div className="nav-content">
              <span className="nav-label">Следующая тема</span>
              <span className="nav-title">{next.title}</span>
            </div>
            <span className="nav-arrow">→</span>
          </Link>
        ) : (
          <div className="nav-link nav-link-next disabled">
            <div className="nav-content">
              <span className="nav-label">Следующая тема</span>
              <span className="nav-title">Нет</span>
            </div>
            <span className="nav-arrow">→</span>
          </div>
        )}
      </div>
    </nav>
  );
}

