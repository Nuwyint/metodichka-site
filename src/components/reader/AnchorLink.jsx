import { useState } from "react";

export default function AnchorLink({ id, title, level = 2 }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const HeadingTag = `h${level}`;

  return (
    <span className="anchor-link-wrapper">
      <HeadingTag className="anchor-link" id={id}>
        {title}
      </HeadingTag>
      <button
        onClick={copyLink}
        className="anchor-copy-btn"
        title="Скопировать ссылку"
        aria-label="Скопировать ссылку на этот раздел"
      >
        {copied ? "✓" : "🔗"}
      </button>
    </span>
  );
}

