import { useState, useMemo } from "react";
import { glossary } from "../data/glossary";
import "../styles/glossary.css";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGlossary = useMemo(() => {
    if (!searchQuery.trim()) {
      return glossary;
    }
    const query = searchQuery.toLowerCase();
    return glossary.filter(
      (item) =>
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Группировка по первой букве
  const groupedGlossary = useMemo(() => {
    const groups = {};
    filteredGlossary.forEach((item) => {
      const firstLetter = item.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });
    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        letter,
        terms: groups[letter].sort((a, b) =>
          a.term.localeCompare(b.term)
        ),
      }));
  }, [filteredGlossary]);

  return (
    <div className="glossary-page">
      <h1>Глоссарий терминов</h1>
      <p className="glossary-intro">
        Определения основных терминов, используемых в методичке.
      </p>

      <div className="glossary-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по терминам..."
          className="glossary-search-input"
        />
      </div>

      {filteredGlossary.length === 0 ? (
        <div className="glossary-empty empty-state fade-in">
          <div className="empty-state-icon">📚</div>
          <h3 className="empty-state-title">Термины не найдены</h3>
          <p className="empty-state-text">Попробуйте другой запрос.</p>
        </div>
      ) : (
        <div className="glossary-content">
          {groupedGlossary.map((group) => (
            <div key={group.letter} className="glossary-group">
              <h2 className="glossary-letter">{group.letter}</h2>
              <div className="glossary-terms">
                {group.terms.map((item) => (
                  <div key={item.term} className="glossary-term-card">
                    <h3 className="term-name">{item.term}</h3>
                    <p className="term-definition">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

