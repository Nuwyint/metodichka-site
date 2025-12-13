import { useParams, Link } from "react-router-dom";
import { handbook } from "../data/handbook";
import "../styles/read.css";

export default function ReadPage() {
  const { chapterId, sectionId } = useParams();
  
  const chapter = handbook.find((ch) => ch.id === chapterId);
  
  if (!chapter) {
    return (
      <div className="error-page">
        <h2>Раздел не найден</h2>
        <p>Запрошенный раздел не существует.</p>
        <Link to="/">Вернуться на главную</Link>
      </div>
    );
  }

  // Если sectionId указан, показываем конкретный раздел
  // Иначе показываем первый раздел главы
  const section = sectionId 
    ? chapter.sections.find((s) => s.id === sectionId)
    : chapter.sections[0];

  if (!section) {
    return (
      <div className="error-page">
        <h2>Раздел не найден</h2>
        <p>Запрошенный раздел не существует в этой главе.</p>
        <Link to={`/read/${chapterId}`}>Вернуться к главе</Link>
      </div>
    );
  }

  // Хлебные крошки
  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: chapter.title, path: `/read/${chapterId}` },
    { label: section.title, path: null }
  ];

  return (
    <div className="read-page">
      <nav className="breadcrumbs">
        {breadcrumbs.map((crumb, idx) => (
          <span key={idx}>
            {crumb.path ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span>{crumb.label}</span>
            )}
            {idx < breadcrumbs.length - 1 && <span className="breadcrumb-separator"> → </span>}
          </span>
        ))}
      </nav>

      <h1>{chapter.title}</h1>
      {chapter.short && <p className="chapter-short">{chapter.short}</p>}
      
      <article className="section-content">
        <h2 id={section.id}>{section.title}</h2>
        <div className="section-blocks">
          {section.blocks.map((block, idx) => (
            <div key={idx} className="block">
              {block.type === "text" && <p>{block.content}</p>}
              {block.type === "heading" && (
                <h3>{block.content}</h3>
              )}
              {block.type === "list" && (
                block.listType === "ordered" ? (
                  <ol>
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul>
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )
              )}
              {block.type === "image" && (
                <figure>
                  <img src={block.src} alt={block.alt} />
                  {block.caption && <figcaption>{block.caption}</figcaption>}
                </figure>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

