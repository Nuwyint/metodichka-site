import { useState, useEffect } from "react";

const FONT_SIZE_MIN = 0.8;
const FONT_SIZE_MAX = 1.5;
const FONT_SIZE_STEP = 0.1;

export default function ReadingSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    return parseFloat(localStorage.getItem("reading-font-size") || "1");
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("reading-theme") || "dark";
  });
  const [width, setWidth] = useState(() => {
    return localStorage.getItem("reading-width") || "normal";
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--reading-font-size", fontSize);
    localStorage.setItem("reading-font-size", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("reading-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-width", width);
    localStorage.setItem("reading-width", width);
  }, [width]);

  const decreaseFont = () => {
    setFontSize((prev) => Math.max(FONT_SIZE_MIN, prev - FONT_SIZE_STEP));
  };

  const increaseFont = () => {
    setFontSize((prev) => Math.min(FONT_SIZE_MAX, prev + FONT_SIZE_STEP));
  };

  return (
    <div className="reading-settings">
      <button
        className="settings-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Настройки чтения"
        aria-label="Настройки чтения"
      >
        ⚙️
      </button>
      {isOpen && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Настройки чтения</h3>
            <button
              className="settings-close"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
          <div className="settings-content">
            <div className="setting-group">
              <label>Размер шрифта</label>
              <div className="font-size-controls">
                <button onClick={decreaseFont} className="font-btn" disabled={fontSize <= FONT_SIZE_MIN}>
                  A−
                </button>
                <span className="font-size-value">{Math.round(fontSize * 100)}%</span>
                <button onClick={increaseFont} className="font-btn" disabled={fontSize >= FONT_SIZE_MAX}>
                  A+
                </button>
              </div>
            </div>

            <div className="setting-group">
              <label>Тема</label>
              <div className="theme-controls">
                <button
                  className={`theme-btn ${theme === "light" ? "active" : ""}`}
                  onClick={() => setTheme("light")}
                >
                  ☀️ Светлая
                </button>
                <button
                  className={`theme-btn ${theme === "dark" ? "active" : ""}`}
                  onClick={() => setTheme("dark")}
                >
                  🌙 Тёмная
                </button>
              </div>
            </div>

            <div className="setting-group">
              <label>Ширина контента</label>
              <div className="width-controls">
                <button
                  className={`width-btn ${width === "narrow" ? "active" : ""}`}
                  onClick={() => setWidth("narrow")}
                >
                  Узкая
                </button>
                <button
                  className={`width-btn ${width === "normal" ? "active" : ""}`}
                  onClick={() => setWidth("normal")}
                >
                  Обычная
                </button>
                <button
                  className={`width-btn ${width === "wide" ? "active" : ""}`}
                  onClick={() => setWidth("wide")}
                >
                  Широкая
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

