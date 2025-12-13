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
                {result.matches.slice(0, 3).map((match, matchIdx) => (
                  <p key={matchIdx} className="result-snippet">
                    ...{highlightMatches(match.snippet, query)}...
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="search-empty">
          <p>Ничего не найдено. Попробуйте другой запрос.</p>
        </div>
      )}

      {!query && (
        <div className="search-empty">
          <p>Введите запрос для поиска по содержимому методички.</p>
        </div>
      )}
    </div>
  );
}

