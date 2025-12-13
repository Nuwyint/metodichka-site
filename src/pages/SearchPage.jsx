import { useState } from "react";
import { Link } from "react-router-dom";
import { searchHandbook, highlightMatches } from "../utils/search";
import "../styles/search.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const searchResults = searchHandbook(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-page">
      <h1>Поиск по методичке</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите запрос для поиска..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Найти
        </button>
      </form>

      {results.length > 0 && (
        <div className="search-results">
          <p className="results-count">Найдено результатов: {results.length}</p>
          {results.map((result, idx) => (
            <div key={idx} className="search-result-item">
              <h3>
                <Link to={`/read/${result.chapterId}/${result.sectionId}`}>
                  {result.chapterTitle} → {result.sectionTitle}
                </Link>
              </h3>
              <div className="result-snippets">
                {result.matches.slice(0, 3).map((match, matchIdx) => {
                  const highlighted = highlightMatches(match.snippet, query);
                  return (
                    <p key={matchIdx} className="result-snippet">
                      ...
                      {highlighted.map((part, partIdx) => 
                        part.type === 'highlight' ? (
                          <mark key={partIdx} className="search-highlight">
                            {part.content}
                          </mark>
                        ) : (
                          <span key={partIdx}>{part.content}</span>
                        )
                      )}
                      ...
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="search-empty empty-state fade-in">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">Ничего не найдено</h3>
          <p className="empty-state-text">Попробуйте другой запрос или проверьте правописание.</p>
        </div>
      )}

      {!query && (
        <div className="search-empty empty-state fade-in">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">Поиск по методичке</h3>
          <p className="empty-state-text">Введите запрос для поиска по содержимому методички.</p>
        </div>
      )}
    </div>
  );
}

