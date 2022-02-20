import { useState } from "react";

import Peg from './Peg';
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

  const pegRow = pegs.map((_, index) => {
    return <Peg value={pegs[index]} />
  });

  const codeRow = code.map((_, index) => {
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
    <div className="guessRow">
      {/* <h3>{guessNumber}</h3> */}
      <div className="submitGuess">
        {enableInteraction && (
          <button
            onClick={() => {
              const result = checkGuess(code);
              setPegs(result)
            }}
          >
            Submit
          </button>
        )}
      </div>
      <div className="codeContainer">{codeRow}</div>
      <div className="solutionPegs">{pegRow}</div>
    </div>
  );
};

export default CodeRow;
