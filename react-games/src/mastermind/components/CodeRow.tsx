import { useState } from "react";

import Peg from './CodePeg';
import CodeSquare from "./CodeSquare";

type Props = {
  guessNumber: number;
  enableInteraction: boolean;
  checkGuess: Function;
};

const CodeRow = ({ guessNumber, enableInteraction, checkGuess }: Props) => {
  const [code, setCode] = useState(Array(4).fill(""));
  const [pegs, setPegs] = useState(Array(4).fill(""));

  const handleColorSelection = (index: number, color: string) => {
    const newCode = code.slice();
    newCode[index] = color
    setCode(newCode);
  }

  const codeRow = code.map((_, index) => {
    return <Peg value={pegs[index]} />
  });

  const pegRow = pegs.map((_, index) => {
    return (
      <CodeSquare
        enableInteraction={enableInteraction}
        key={index}
        index={index}
        selectedColor={code[index]}
        onColorSection={handleColorSelection}
      />
    );
  });

  return (
    <div>
      <h3>{guessNumber}</h3>
      <div className="keyPegs">{pegRow}</div>
      <div className="codeRow">{codeRow}</div>
      {enableInteraction && (
        <button
          onClick={() => {
            const result = checkGuess(code);
            setPegs(result)
          }}
        >
          Click Me
        </button>
      )}
    </div>
  );
};

export default CodeRow;
