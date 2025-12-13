/**
 * Утилиты для отслеживания прогресса чтения
 */

const PROGRESS_KEY = "reading-progress";

/**
 * Сохранить прогресс чтения
 */
export function saveReadingProgress(chapterId, sectionId) {
  const progress = {
    chapterId,
    sectionId,
    timestamp: Date.now(),
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

/**
 * Получить последний прочитанный раздел
 */
export function getLastReadSection() {
  const saved = localStorage.getItem(PROGRESS_KEY);
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

/**
 * Очистить прогресс
 */
export function clearProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}

