import { useState, useEffect } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}

