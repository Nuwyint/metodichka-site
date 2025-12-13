/**
 * Обработка текста для поиска терминов и добавления tooltip
 */

import { glossary } from "../data/glossary";

/**
 * Разбить текст на слова и найти термины
 */
export function findTermsInText(text) {
  if (!text || typeof text !== 'string') return [];
  
  const words = text.split(/(\s+|[.,;:!?()\[\]{}"']+)/);
  const terms = [];
  
  words.forEach((word, index) => {
    const cleanWord = word.replace(/[^\wа-яё]/gi, '').toLowerCase();
    if (cleanWord.length > 0) {
      const term = glossary.find(
        (item) => item.term.toLowerCase() === cleanWord
      );
      if (term) {
        terms.push({
          index,
          word,
          term: term.term,
          definition: term.definition
        });
      }
    }
  });
  
  return terms;
}

/**
 * Обработать текст и обернуть термины в компоненты Tooltip
 * Пока возвращаем простую версию - полная реализация будет в компоненте
 */
export function processTextForTerms(text) {
  return text; // Будет обработано в компоненте Reader
}

