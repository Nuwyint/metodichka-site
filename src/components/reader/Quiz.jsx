import { useState } from "react";

export default function Quiz({ question, options, correctIndex, explanation }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (index) => {
    if (showResult) return;
    setSelectedIndex(index);
    setIsCorrect(index === correctIndex);
    setShowResult(true);
  };

  const reset = () => {
    setSelectedIndex(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="quiz-block">
      <div className="quiz-header">
        <h3 className="quiz-title">Проверь себя</h3>
        <p className="quiz-question">{question}</p>
      </div>
      <div className="quiz-options">
        {options.map((option, index) => {
          let optionClass = "quiz-option";
          if (showResult) {
            if (index === correctIndex) {
              optionClass += " quiz-option-correct";
            } else if (index === selectedIndex && index !== correctIndex) {
              optionClass += " quiz-option-incorrect";
            }
          } else if (index === selectedIndex) {
            optionClass += " quiz-option-selected";
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => handleSelect(index)}
              disabled={showResult}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className={`quiz-result ${isCorrect ? "quiz-result-correct" : "quiz-result-incorrect"}`}>
          <div className="quiz-result-icon">
            {isCorrect ? "✓" : "✗"}
          </div>
          <div className="quiz-result-text">
            {isCorrect ? (
              <p><strong>Правильно!</strong></p>
            ) : (
              <p><strong>Неверно.</strong> Правильный ответ: {options[correctIndex]}</p>
            )}
            {explanation && <p className="quiz-explanation">{explanation}</p>}
          </div>
          <button onClick={reset} className="quiz-reset-btn">
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
}

