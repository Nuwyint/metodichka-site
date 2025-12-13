/**
 * Утилиты для поиска по методичке
 */

import { handbook } from "../data/handbook";

/**
 * Нормализация текста для поиска
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\sа-яё]/gi, '');
}

/**
 * Поиск по методичке
 */
export function searchHandbook(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = normalizeText(query);
  const results = [];

  handbook.forEach((chapter) => {
    chapter.sections.forEach((section) => {
      const sectionMatches = [];
      
      section.blocks.forEach((block, blockIndex) => {
        let text = '';
        
        if (block.type === 'text') {
          text = block.content || '';
        } else if (block.type === 'heading') {
          text = block.content || '';
        } else if (block.type === 'list' && block.items) {
          text = block.items.join(' ');
        }
        
        const normalizedText = normalizeText(text);
        if (normalizedText.includes(normalizedQuery)) {
          // Находим позицию совпадения
          const matchIndex = normalizedText.indexOf(normalizedQuery);
          const contextStart = Math.max(0, matchIndex - 50);
          const contextEnd = Math.min(normalizedText.length, matchIndex + normalizedQuery.length + 50);
          const snippet = text.substring(contextStart, contextEnd);
          
          sectionMatches.push({
            blockIndex,
            snippet,
            matchIndex: matchIndex - contextStart
          });
        }
      });

      if (sectionMatches.length > 0) {
        results.push({
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          sectionId: section.id,
          sectionTitle: section.title,
          matches: sectionMatches,
          matchCount: sectionMatches.length
        });
      }
    });
  });

  return results.sort((a, b) => b.matchCount - a.matchCount);
}

/**
 * Подсветка совпадений в тексте
 * Возвращает массив объектов для рендеринга в React компоненте
 */
export function highlightMatches(text, query) {
  if (!query || !text) return [{ type: 'text', content: text }];
  
  // Находим все совпадения с учетом регистра
  const matches = [];
  let match;
  const sourceRegex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  
  while ((match = sourceRegex.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0]
    });
  }

  if (matches.length === 0) return [{ type: 'text', content: text }];

  // Создаем массив частей текста с подсветкой
  const parts = [];
  let lastIndex = 0;

  matches.forEach((match, idx) => {
    if (match.start > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.start)
      });
    }
    parts.push({
      type: 'highlight',
      content: match.text,
      key: match.start
    });
    lastIndex = match.end;
  });

  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex)
    });
  }

  return parts;
}

