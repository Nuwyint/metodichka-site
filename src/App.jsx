import { useState, useEffect } from "react";
import "./index.css";

// ------------------ ДАННЫЕ РАЗДЕЛОВ ------------------

const sections = [
  {
    id: "intro",
    title: "Введение",
    short: "Что такое мультимедийные технологии.",
    content: (
      <>
        <p>
          Мультимедийные технологии – это технологии, позволяющие создавать,
          обрабатывать, хранить и передавать информацию в различных форматах
          (текст, графика, аудио, видео, изображения и анимация) с
          использованием компьютерной техники и программного обеспечения.
        </p>
        <p>
          Мультимедийные технологии на сегодняшний день играют огромную роль
          в нашей жизни. Они используются в образовании, медицине,
          развлечениях, рекламе, коммуникации, а также играют важную роль
          в создании пользовательского интерфейса для различных устройств
          и программных приложений.
        </p>
        <p>
          Они позволяют создавать более привлекательные и удобные для
          использования интерфейсы, которые помогают пользователям быстрее
          и легче находить нужную информацию и выполнять задачи.
        </p>
        <p>
          Проектирование и разработка включают в себя создание эффективного
          и привлекательного контента, который будет вовлекать и интересовать
          пользователей, а также разработку удобного и интуитивно понятного
          пользовательского интерфейса.
        </p>
        <p>
          Целью данного пособия является рассмотрение основных принципов и
          этапов создания различных мультимедийных элементов и подкрепление
          полученных знаний практическими заданиями.
        </p>
      </>
    ),
  },
  {
  id: "chapter1",
  title: "1. ТЕКСТ КАК ЭЛЕМЕНТ ДИЗАЙНА. ТЕОРИЯ ЦВЕТА",
  short: "Как работать с текстом и цветом, чтобы было красиво и читабельно.",
  blocks: [
    {
      type: "text",
      body: (
        <>
          <h3>1.1. ОБРАБОТКА ТЕКСТА</h3>
          <p>
            <strong>Текст — один из ключевых элементов дизайна.</strong> Он
            используется для передачи информации и выражения идей.
          </p>
          <p>
            Одним из ключевых аспектов использования текста как элемента
            дизайна является его читабельность. Для высокой удобочитаемости
            нужно учитывать гарнитуру, размер, интервалы и контраст.
          </p>
          <ul>
            <li>
              <strong>Шрифт:</strong> с засечками — для длинных текстов, без
              засечек — для заголовков и коротких блоков.
            </li>
            <li>
              <strong>Размер:</strong> 12–16 pt для основного текста, 18–24 pt —
              для заголовков.
            </li>
            <li>
              <strong>Контраст:</strong> светлый фон + тёмный текст или наоборот.
            </li>
            <li>
              <strong>Акценты:</strong> жирный, курсив и подчёркивание только
              для действительно важного.
            </li>
          </ul>
        </>
      ),
    },

    // 🟣 СРЕДНЯЯ ПЛАШКА С КАРТИНКОЙ/ВИДЕО
    {
      type: "media",
      mediaType: "image",          // или "video"
      src: "/media/typography_example.png", // положишь картинку в public/media
      alt: "Пример оформления текста",
      caption: "Рис. 1. Пример оформления текстового блока: заголовок, подзаголовок, акценты.",
    },

    {
      type: "text",
      body: (
        <>
          <h3>1.2. УСЛОВИЯ УДОБОЧИТАЕМОСТИ</h3>
          <ol>
            <li>Соразмерность толщины штрихов и просветов.</li>
            <li>Оптимальные межбуквенные и межстрочные расстояния.</li>
            <li>Пропорция высоты и ширины букв.</li>
            <li>Контраст основных и второстепенных штрихов.</li>
            <li>Размер шрифта под формат и расстояние до зрителя.</li>
            <li>Длина строки и интерлиньяж.</li>
            <li>Уместность шрифта по смыслу текста.</li>
            <li>Гармония сочетания нескольких шрифтов.</li>
            <li>Акценты: что выделяем, то и читают первым.</li>
            <li>Наглядность структуры: заголовки, подзаголовки, списки.</li>
          </ol>

          <h3>1.3. ЧЕТЫРЕ ПРИНЦИПА ОФОРМЛЕНИЯ</h3>
          <p>
            <strong>Контраст, повтор, выравнивание и приближенность</strong> —
            базовые принципы, которые делают текст структурным и удобным.
          </p>
          {/* дальше твой текст как раньше */}
        </>
      ),
    },
  ],
},

  {
    id: "chapter2",
    title: "2. ГРАФИЧЕСКИЙ ИНТЕРФЕЙС ПОЛЬЗОВАТЕЛЯ",
    short: "Структура, элементы интерфейса, базовые принципы UX/UI.",
    content: (
      <p>
        Позже сюда можно перенести полный текст раздела 2 из методички:
        элементы интерфейса, навигация, принципы UX и примеры хороших
        и плохих решений.
      </p>
    ),
  },
  {
    id: "chapter3",
    title: "3. ПРОГРАММНАЯ ГЕНЕРАЦИЯ ИЗОБРАЖЕНИЙ",
    short: "Идея: как код может рисовать картинки.",
    content: (
      <p>
        В этот раздел можно добавить теорию по генерации изображений,
        примеры кода на Python и описание практической работы.
      </p>
    ),
  },
];

// ------------------ ИНТЕРАКТИВ ДЛЯ ПЛАШЕК ------------------

const interactiveConfig = {
  intro: {
    left: {
      type: "tip",
      title: "Как работать с методичкой",
      text: "Иди сверху вниз: сначала введение, затем теория и практика. Помечай для себя, какие задания уже сделал.",
    },
    right: {
      type: "video",
      title: "Идея видео-введения",
      text: "Сюда позже можно встроить ролик: обзор курса, объяснение структуры и целей.",
    },
  },
  chapter1: {
    left: {
      type: "quiz",
      title: "Мини-тест по тексту",
      question: "Что в первую очередь влияет на удобочитаемость текста?",
      options: [
        "Только цвет текста",
        "Гарнитура, размер, интервалы и контраст",
        "Только длина строки",
      ],
      correctIndex: 1,
    },
    right: {
      type: "note",
      title: "Идея для практики",
      text: "Возьми любой скучный текстовый документ и попробуй сделать из него аккуратный плакат А4: заголовок, подзаголовки, акценты, цветовые акценты.",
    },
  },
};

// ------------------ КОМПОНЕНТЫ ------------------

function ProgressBar({ value }) {
  const clamped = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="progress-root">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${clamped}%` }} />
      </div>
      <span className="progress-label">{Math.round(clamped)}%</span>
    </div>
  );
}

function Header({ currentTitle, progress, onPrev, onNext, hasPrev, hasNext }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title-row">
          <span className="badge">МЕТОДИЧКА</span>
          <span className="header-section-title">{currentTitle}</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div className="header-right">
        <button
          className="header-btn"
          onClick={onPrev}
          disabled={!hasPrev}
          title="Предыдущий раздел"
        >
          ←
        </button>
        <button
          className="header-btn"
          onClick={onNext}
          disabled={!hasNext}
          title="Следующий раздел"
        >
          →
        </button>
        <button
          className="header-btn header-btn-ghost"
          type="button"
          onClick={() =>
            alert("Здесь потом можно сделать скачивание PDF-версии методички")
          }
        >
          ⬇ PDF
        </button>
      </div>
    </header>
  );
}

function SectionBody({ section }) {
  // Если blocks нет – используем старый content как один текст-блок
  const blocks =
    section.blocks ||
    (section.content
      ? [{ type: "text", body: section.content }]
      : []);

  return (
    <div className="content-body">
      {blocks.map((block, idx) => {
        if (block.type === "media") {
          return (
            <figure
              key={idx}
              className="content-block content-block--media"
            >
              {block.mediaType === "image" && (
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="content-media-img"
                />
              )}
              {block.mediaType === "video" && (
                <video
                  className="content-media-video"
                  controls
                >
                  <source src={block.src} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              )}
              {block.caption && (
                <figcaption className="content-media-caption">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // текстовый блок
        return (
          <section
            key={idx}
            className="content-block content-block--text"
          >
            {block.body}
          </section>
        );
      })}
    </div>
  );
}

function Sidebar({ sections, currentId, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <h2 className="sidebar-title">Оглавление</h2>
        <ul className="sidebar-list">
          {sections.map((section, idx) => (
            <li key={section.id}>
              <button
                className={
                  "sidebar-item" +
                  (section.id === currentId ? " sidebar-item--active" : "")
                }
                onClick={() => onSelect(section.id)}
              >
                <span className="sidebar-item-index">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="sidebar-item-text">
                  <span className="sidebar-item-title">{section.title}</span>
                  {section.short && (
                    <span className="sidebar-item-sub">{section.short}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// Мини-квиз для интерактивной плашки
function MiniQuiz({ title, question, options, correctIndex }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
  };

  const isCorrect = checked && selected === correctIndex;

  return (
    <div>
      <h3 className="ip-title">{title}</h3>
      <p className="ip-question">{question}</p>
      <ul className="ip-quiz-options">
        {options.map((opt, i) => {
          const isSel = selected === i;
          let cls = "ip-quiz-option";
          if (checked) {
            if (i === correctIndex) cls += " ip-quiz-option--correct";
            else if (isSel) cls += " ip-quiz-option--wrong";
          } else if (isSel) {
            cls += " ip-quiz-option--selected";
          }
          return (
            <li
              key={i}
              className={cls}
              onClick={() => !checked && setSelected(i)}
            >
              {opt}
            </li>
          );
        })}
      </ul>
      <button
        className="ip-btn"
        onClick={handleCheck}
        disabled={selected === null || checked}
      >
        Проверить
      </button>
      {checked && (
        <p className="ip-result">
          {isCorrect
            ? "✅ Всё верно, идём дальше!"
            : "❌ Не совсем. Перечитай раздел ещё раз."}
        </p>
      )}
    </div>
  );
}

// Выезжающая интерактивная плашка
function InteractivePanel({ side, block, visible, top }) {
  if (!block || !visible || top == null) return null;

  const classes =
    "interactive-panel interactive-panel--" +
    side +
    (visible ? " interactive-panel--visible" : "");

  let inner = null;

  if (block.type === "quiz") {
    inner = (
      <MiniQuiz
        title={block.title}
        question={block.question}
        options={block.options}
        correctIndex={block.correctIndex}
      />
    );
  } else {
    inner = (
      <>
        <h3 className="ip-title">{block.title}</h3>
        <p className="ip-text">{block.text}</p>
        {block.type === "video" && (
          <p className="ip-helper">
            🎥 Здесь позже можно встроить настоящий видео-плеер.
          </p>
        )}
      </>
    );
  }

 return (
    <aside className={classes} style={{ top }}>
      {inner}
    </aside>
  );
}

// ------------------ ГЛАВНЫЙ КОМПОНЕНТ ------------------

function App() {
  const [currentId, setCurrentId] = useState("intro");
  const [scrollPercent, setScrollPercent] = useState(0);

  const [leftTop, setLeftTop] = useState(null);
  const [rightTop, setRightTop] = useState(null);

  // слушаем скролл окна, а не одного блока
  useEffect(() => {
    // при переходе на другую главу сбрасываем плашки
    setLeftTop(null);
    setRightTop(null);
  }, [currentId]);
   useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const maxScroll = doc.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setScrollPercent(0);
        return;
      }

      const p = (scrollTop / maxScroll) * 100;
      setScrollPercent(p);

      // конфиг для текущего раздела
      const cfg = interactiveConfig[currentId] || {};

       if (cfg.left && leftTop === null && p > 30) {
        const top = scrollTop + window.innerHeight * 0.5;
        setLeftTop(top);
      }

      // если есть правая плашка и ещё не ставили её top
      if (cfg.right && rightTop === null && p > 70) {
        const top = scrollTop + window.innerHeight * 0.3;
        setRightTop(top);
      }
       
    
    };

    handleScroll(); // посчитать сразу при монтировании
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentId, leftTop, rightTop]);


  const currentIndex = sections.findIndex((s) => s.id === currentId);
  const currentSection =
    sections.find((s) => s.id === currentId) || sections[0];

  // общий прогресс = номер раздела + внутри него по скроллу
  const totalProgress =
    ((currentIndex + scrollPercent / 100) / sections.length) * 100;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < sections.length - 1;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    if (!hasPrev) return;
    const prev = sections[currentIndex - 1];
    setCurrentId(prev.id);
    setScrollPercent(0);
    scrollToTop();
  };

  const goNext = () => {
    if (!hasNext) return;
    const next = sections[currentIndex + 1];
    setCurrentId(next.id);
    setScrollPercent(0);
    scrollToTop();
  };

   const cfg = interactiveConfig[currentId] || {};
  const showLeft = leftTop !== null;
  const showRight = rightTop !== null;


  return (
    <div className="app">
      <Header
        currentTitle={currentSection.title}
        progress={totalProgress}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />

      <div className="layout">
        <Sidebar
          sections={sections}
          currentId={currentId}
          onSelect={(id) => {
            setCurrentId(id);
            setScrollPercent(0);
            scrollToTop();
          }}
        />

        <main className="main">
          <article className="content">
            <h2 className="content-title">{currentSection.title}</h2>
            {currentSection.short && (
              <p className="content-short">{currentSection.short}</p>
            )}
            <SectionBody section={currentSection} />
          </article>
        </main>
      </div>

      {/* Интерактивные плашки слева/справа */}
      <InteractivePanel
        side="left"
        block={cfg.left}
        visible={showLeft}
        top={leftTop}
      />
      <InteractivePanel
        side="right"
        block={cfg.right}
        visible={showRight}
        top={rightTop}
      />
    </div>
  );
}

export default App;
