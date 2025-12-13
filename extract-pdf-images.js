// Скрипт для извлечения изображений из PDF
// Требует: npm install pdfjs-dist canvas

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проверяем наличие необходимых библиотек
let pdfjsLib, createCanvas;
try {
  pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const canvasModule = await import('canvas');
  createCanvas = canvasModule.createCanvas;
} catch (e) {
  console.log('❌ Необходимо установить зависимости:');
  console.log('npm install pdfjs-dist canvas');
  console.log('\nИли используйте альтернативный метод:');
  console.log('1. Откройте PDF в Adobe Acrobat');
  console.log('2. Инструменты → Редактирование PDF → Экспорт → Изображение');
  console.log('3. Сохраните изображения в папку public/media/');
  process.exit(1);
}

async function extractImagesFromPDF(pdfPath, outputDir) {
  try {
    console.log(`📄 Загрузка PDF: ${pdfPath}`);
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    
    console.log(`📊 Страниц в PDF: ${pdf.numPages}`);
    
    // Создаем директорию для изображений
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const images = [];
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      console.log(`\n📄 Обработка страницы ${pageNum}...`);
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });
      
      // Рендерим страницу как изображение
      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d');
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      // Сохраняем страницу как изображение
      const pageImagePath = path.join(outputDir, `page-${pageNum}.png`);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(pageImagePath, buffer);
      images.push(pageImagePath);
      console.log(`✅ Сохранено: ${pageImagePath}`);
      
      // Пытаемся извлечь встроенные изображения
      const ops = await page.getOperatorList();
      let imageIndex = 0;
      
      for (let i = 0; i < ops.fnArray.length; i++) {
        if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
          const imageName = ops.argsArray[i][0];
          try {
            const image = await page.objs.get(imageName);
            if (image && image.data) {
              imageIndex++;
              const imagePath = path.join(outputDir, `page-${pageNum}-img-${imageIndex}.png`);
              fs.writeFileSync(imagePath, image.data);
              images.push(imagePath);
              console.log(`✅ Извлечено изображение: ${imagePath}`);
            }
          } catch (err) {
            // Игнорируем ошибки извлечения отдельных изображений
          }
        }
      }
    }
    
    console.log(`\n✅ Готово! Извлечено ${images.length} изображений в ${outputDir}`);
    return images;
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    throw error;
  }
}

// Получаем путь к PDF из аргументов
const pdfPath = process.argv[2] || 'ПРОЕКТИРОВАНИЕ И РАЗРАБОТКА МУЛЬТИМЕДИЙНОГО КОНТЕНТА И ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА.pdf';
const outputDir = path.join(__dirname, 'public', 'media', 'pdf-images');

if (!fs.existsSync(pdfPath)) {
  console.error(`❌ Файл не найден: ${pdfPath}`);
  console.log('\n📝 Использование:');
  console.log('node extract-pdf-images.js <путь-к-pdf-файлу>');
  console.log('\n💡 Или поместите PDF файл в корень проекта с именем:');
  console.log('"ПРОЕКТИРОВАНИЕ И РАЗРАБОТКА МУЛЬТИМЕДИЙНОГО КОНТЕНТА И ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА.pdf"');
  process.exit(1);
}

extractImagesFromPDF(pdfPath, outputDir)
  .then(() => {
    console.log('\n🎉 Извлечение завершено!');
  })
  .catch(err => {
    console.error('❌ Ошибка при извлечении:', err);
    process.exit(1);
  });

