import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function FormulaBlock({ formula, inline = false }) {
  if (inline) {
    return <InlineMath math={formula} />;
  }
  
  return (
    <div className="formula-block">
      <BlockMath math={formula} />
    </div>
  );
}

