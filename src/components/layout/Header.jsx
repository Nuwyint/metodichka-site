import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>Методическое пособие</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/">Главная</Link>
          <Link to="/glossary">Глоссарий</Link>
          <Link to="/search">Поиск</Link>
          <Link to="/tests">Тесты</Link>
        </nav>
      </div>
      <ProgressBar />
    </header>
  );
}

