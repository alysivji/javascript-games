import { useState } from "react";

import Peg from './Peg';
import CodeSquare from "./CodeSquare";

type Props = {
  guessNumber: number;
  enableInteraction: boolean;
  checkGuess: Function;
};

const CodeRow = ({ enableInteraction, checkGuess }: Props) => {
  const [code, setCode] = useState(Array(4).fill(""));
  const [pegs, setPegs] = useState(Array(4).fill(""));

  const handleColorSelection = (index: number, color: string) => {
    const newCode = code.slice();
    newCode[index] = color
    setCode(newCode);
  }

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

  const pegRow = pegs.map((_, index) => {
    return <Peg value={pegs[index]} key={index} />
  });

  return (
    <>
      <div className="guess-row">
        <div className="guess-code">{codeRow}</div>
        <div className="guess-pegs">{pegRow}</div>
      </div>

      <div className="submitGuess">
        {enableInteraction && (
          <button
            onClick={() => {
              if (code.includes("")) {
                alert("Need to fill out all 4 squares")
                return
              }
              const result = checkGuess(code);
              setPegs(result)
            }}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default CodeRow;
