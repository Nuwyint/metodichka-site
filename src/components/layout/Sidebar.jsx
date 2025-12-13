import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { handbook } from "../../data/handbook";

export default function Sidebar() {
  const { chapterId, sectionId } = useParams();
  const [expandedChapters, setExpandedChapters] = useState(new Set([chapterId || "intro"]));

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">Оглавление</h2>
        <nav className="sidebar-nav">
          {handbook.map((chapter) => {
            const isExpanded = expandedChapters.has(chapter.id);
            const isActive = chapterId === chapter.id;

            return (
              <div key={chapter.id} className="sidebar-chapter">
                <div
                  className={`sidebar-chapter-header ${isActive ? "active" : ""}`}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <Link
                    to={`/read/${chapter.id}`}
                    className="sidebar-chapter-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {chapter.title}
                  </Link>
                  {chapter.sections.length > 0 && (
                    <span className="sidebar-toggle">{isExpanded ? "−" : "+"}</span>
                  )}
                </div>
                {isExpanded && chapter.sections.length > 0 && (
                  <ul className="sidebar-sections">
                    {chapter.sections.map((section) => {
                      const isSectionActive = isActive && sectionId === section.id;
                      return (
                        <li key={section.id}>
                          <Link
                            to={`/read/${chapter.id}/${section.id}`}
                            className={`sidebar-section-link ${isSectionActive ? "active" : ""}`}
                          >
                            {section.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

