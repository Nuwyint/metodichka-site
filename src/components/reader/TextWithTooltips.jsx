import { useMemo } from "react";
import { glossary } from "../../data/glossary";
import Tooltip from "../ui/Tooltip";

/**
 * Компонент для обработки текста и добавления tooltip к терминам
 */
export default function TextWithTooltips({ text }) {
  const processedText = useMemo(() => {
    if (!text || typeof text !== 'string') return text;

    // Создаем regex для поиска терминов (точное совпадение слова)
    const termPatterns = glossary.map((item) => ({
      term: item.term,
      definition: item.definition,
      regex: new RegExp(`\\b${item.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'),
    }));

    const parts = [];
    let lastIndex = 0;
    let currentIndex = 0;

    // Находим все совпадения
    const matches = [];
    termPatterns.forEach(({ term, definition, regex }) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          term,
          definition,
          text: match[0],
        });
      }
    });

    // Сортируем по позиции
    matches.sort((a, b) => a.start - b.start);

    // Убираем перекрывающиеся совпадения (берем первое)
    const filteredMatches = [];
    let lastEnd = 0;
    matches.forEach((match) => {
      if (match.start >= lastEnd) {
        filteredMatches.push(match);
        lastEnd = match.end;
      }
    });

    // Создаем массив частей текста
    filteredMatches.forEach((match) => {
      if (match.start > lastIndex) {
        parts.push(text.substring(lastIndex, match.start));
      }
      parts.push(
        <Tooltip key={match.start} term={match.term} definition={match.definition}>
          {match.text}
        </Tooltip>
      );
      lastIndex = match.end;
    });

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  }, [text]);

  return <>{processedText}</>;
}

