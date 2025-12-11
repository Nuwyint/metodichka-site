// auto-commit.cjs
// Скрипт для автокоммита и пуша в main одной командой: npm run ac "сообщение"

const { execSync } = require("child_process");

// Берём сообщение из аргументов
const msgFromArgs = process.argv.slice(2).join(" ");
const commitMessage = msgFromArgs || "chore: auto-commit";

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

try {
  console.log("➕ Добавляю все файлы...");
  run("git add .");

  console.log(`💬 Делаю коммит с сообщением: "${commitMessage}"`);
  try {
    run(`git commit -m "${commitMessage}"`);
  } catch (e) {
    console.log("⚠️ Нет изменений для коммита (nothing to commit). Продолжаю к push...");
  }

  console.log("🚀 Пушу в origin main (с перезаписью истории, если надо)...");
  run("git push --force origin main");

  console.log("\n✅ Готово! Изменения на GitHub.");
} catch (e) {
  console.error("\n❌ Ошибка в auto-commit скрипте:");
  console.error(e.message);
}
