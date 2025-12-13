// Скрипт для создания структуры недостающих изображений
// Запустите: node setup-missing-images.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mediaDir = path.join(__dirname, 'public', 'media');

// Список необходимых изображений
const requiredImages = [
  'interface-map.png',      // Рис. 8
  'flat-design.png',        // Рис. 9
  'material-design.png',    // Рис. 10
  'minimal-layout.png',    // Рис. 11
  'pictograms.png',        // Рис. 12
  'responsive-design.png', // Рис. 13
];

// Проверяем существующие файлы
console.log('📋 Проверка изображений в public/media/...\n');

const existing = [];
const missing = [];

requiredImages.forEach(img => {
  const filePath = path.join(mediaDir, img);
  if (fs.existsSync(filePath)) {
    existing.push(img);
    console.log(`✅ ${img} - найдено`);
  } else {
    missing.push(img);
    console.log(`❌ ${img} - отсутствует`);
  }
});

console.log(`\n📊 Статистика:`);
console.log(`   Найдено: ${existing.length}/${requiredImages.length}`);
console.log(`   Отсутствует: ${missing.length}/${requiredImages.length}`);

if (missing.length > 0) {
  console.log(`\n⚠️  Отсутствующие изображения:`);
  missing.forEach(img => console.log(`   - ${img}`));
  console.log(`\n💡 Инструкции по добавлению изображений:`);
  console.log(`   1. Откройте PDF файл методички`);
  console.log(`   2. Найдите соответствующие рисунки`);
  console.log(`   3. Экспортируйте или сделайте скриншоты`);
  console.log(`   4. Сохраните в папку: ${mediaDir}`);
  console.log(`   5. Используйте точные имена файлов из списка выше`);
  console.log(`\n📖 Подробные инструкции в файле README-IMAGES.md`);
} else {
  console.log(`\n🎉 Все изображения на месте!`);
}

