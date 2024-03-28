import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const MathText = ({ text }) => {
  const myStyle = {
    color: "black",
    fontWeight: "bold",
    margin: "20px",

    padding: "20px",
    border: "1px solid black",
  };
  const renderMathExpressions = (text) => {
    // Etsitään tekstistä kaikki dollarimerkityt ja korvataan ne InlineMath-komponentilla
    // ja kaksinkertaiset dollarimerkityt ja korvataan ne BlockMath-komponentilla
    text = text.replace(/\\newline/g, "\n");
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$.+?\$)/g);
    console.log(text);

    console.log(parts);
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      } else if (part.startsWith("$$")) {
        const mathContent = part.substring(2, part.length - 2);
        return <BlockMath key={index}>{mathContent}</BlockMath>;
      } else {
        const mathContent = part.substring(1, part.length - 1);
        return <InlineMath key={index}>{mathContent}</InlineMath>;
      }
    });
  };
  return <div style={myStyle}>{renderMathExpressions(text)}</div>;
};

export default MathText;
