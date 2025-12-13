import { useParams, Link } from "react-router-dom";
import { handbook } from "../data/handbook";
import { getNextSection, getPrevSection, generateAnchorId } from "../utils/navigation";
import AnchorLink from "../components/reader/AnchorLink";
import PrevNextNav from "../components/reader/PrevNextNav";
import TextWithTooltips from "../components/reader/TextWithTooltips";
import FormulaBlock from "../components/reader/FormulaBlock";
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
  const currentSectionId = sectionId || chapter.sections[0]?.id;
  const section = chapter.sections.find((s) => s.id === currentSectionId);

  if (!section) {
    return (
      <div className="error-page">
        <h2>Раздел не найден</h2>
        <p>Запрошенный раздел не существует в этой главе.</p>
        <Link to={`/read/${chapterId}`}>Вернуться к главе</Link>
      </div>
    );
  }

  // Навигация
  const next = getNextSection(chapterId, currentSectionId);
  const prev = getPrevSection(chapterId, currentSectionId);

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
        <AnchorLink id={section.id} title={section.title} level={2} />
        <div className="section-blocks">
          {section.blocks.map((block, idx) => {
            const blockId = block.type === "heading" 
              ? generateAnchorId(block.content)
              : null;

            return (
              <div key={idx} className="block" id={blockId || undefined}>
                {block.type === "text" && (
                  <p>
                    <TextWithTooltips text={block.content} />
                  </p>
                )}
                {block.type === "heading" && (
                  <AnchorLink id={blockId} title={block.content} level={block.level || 3} />
                )}
                {block.type === "list" && (
                  block.listType === "ordered" ? (
                    <ol>
                      {block.items.map((item, i) => (
                        <li key={i}>
                          <TextWithTooltips text={item} />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {block.items.map((item, i) => (
                        <li key={i}>
                          <TextWithTooltips text={item} />
                        </li>
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
                {block.type === "formula" && (
                  <FormulaBlock formula={block.content} inline={block.inline} />
                )}
              </div>
            );
          })}
        </div>
      </article>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}

