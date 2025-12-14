import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /**
   * GitHub Pages / статический хостинг:
   * - base: "./" — самый универсальный вариант для деплоя в подпапку репозитория
   *   (ассеты станут относительными и сайт будет работать по /<repo>/)
   *
   * Альтернатива (если хочешь строго /<repo>/ и используешь Actions/Pages):
   * - base: "/metodichka-site/"
   *
   * Важно: если поменяешь имя репозитория — обнови base.
   */
  base: "./",
});