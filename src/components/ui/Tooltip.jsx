import { useState } from "react";

export default function Tooltip({ term, definition, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="tooltip-trigger">{children}</span>
      {isVisible && (
        <div className="tooltip-content">
          <div className="tooltip-term">{term}</div>
          <div className="tooltip-definition">{definition}</div>
        </div>
      )}
    </span>
  );
}

