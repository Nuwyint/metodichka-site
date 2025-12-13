/**
 * Утилиты для навигации по методичке
 */

import { handbook } from "../data/handbook";

/**
 * Получить следующий раздел
 */
export function getNextSection(chapterId, sectionId) {
  const chapter = handbook.find((ch) => ch.id === chapterId);
  if (!chapter) return null;

  const currentSectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
  
  // Если есть следующий раздел в этой главе
  if (currentSectionIndex < chapter.sections.length - 1) {
    return {
      chapterId,
      sectionId: chapter.sections[currentSectionIndex + 1].id,
      title: chapter.sections[currentSectionIndex + 1].title
    };
  }

  // Ищем следующую главу
  const currentChapterIndex = handbook.findIndex((ch) => ch.id === chapterId);
  if (currentChapterIndex < handbook.length - 1) {
    const nextChapter = handbook[currentChapterIndex + 1];
    if (nextChapter.sections.length > 0) {
      return {
        chapterId: nextChapter.id,
        sectionId: nextChapter.sections[0].id,
        title: nextChapter.sections[0].title
      };
    }
  }

  return null;
}

/**
 * Получить предыдущий раздел
 */
export function getPrevSection(chapterId, sectionId) {
  const chapter = handbook.find((ch) => ch.id === chapterId);
  if (!chapter) return null;

  const currentSectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
  
  // Если есть предыдущий раздел в этой главе
  if (currentSectionIndex > 0) {
    return {
      chapterId,
      sectionId: chapter.sections[currentSectionIndex - 1].id,
      title: chapter.sections[currentSectionIndex - 1].title
    };
  }

  // Ищем предыдущую главу
  const currentChapterIndex = handbook.findIndex((ch) => ch.id === chapterId);
  if (currentChapterIndex > 0) {
    const prevChapter = handbook[currentChapterIndex - 1];
    if (prevChapter.sections.length > 0) {
      const lastSection = prevChapter.sections[prevChapter.sections.length - 1];
      return {
        chapterId: prevChapter.id,
        sectionId: lastSection.id,
        title: lastSection.title
      };
    }
  }

  return null;
}

/**
 * Генерация ID для якоря из текста
 */
export function generateAnchorId(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

