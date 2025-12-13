import { useParams } from "react-router-dom";
import { handbook } from "../data/handbook";

export default function ReadPage() {
  const { chapterId, sectionId } = useParams();
  
  const chapter = handbook.find((ch) => ch.id === chapterId);
  
  if (!chapter) {
    return (
      <div className="error-page">
        <h2>Раздел не найден</h2>
        <p>Запрошенный раздел не существует.</p>
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
      </div>
    );
  }

  return (
    <div className="read-page">
      <h1>{chapter.title}</h1>
      {chapter.short && <p className="chapter-short">{chapter.short}</p>}
      
      <article className="section-content">
        <h2>{section.title}</h2>
        {/* TODO: Рендеринг блоков будет в компоненте Reader */}
        <div className="section-blocks">
          {section.blocks.map((block, idx) => (
            <div key={idx} className="block">
              {block.type === "text" && <p>{block.content}</p>}
              {block.type === "heading" && (
                <h3>{block.content}</h3>
              )}
              {block.type === "list" && (
                <ul>
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
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

