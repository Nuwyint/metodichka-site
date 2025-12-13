import { useState } from "react";

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        {language && <span className="code-language">{language}</span>}
        <button
          onClick={handleCopy}
          className="code-copy-btn"
          title="Скопировать код"
          aria-label="Скопировать код"
        >
          {copied ? "✓ Скопировано" : "📋 Копировать"}
        </button>
      </div>
      <pre className="code-block">
        <code>{code}</code>
      </pre>
      {copied && (
        <div className="code-toast">Скопировано!</div>
      )}
    </div>
  );
}

