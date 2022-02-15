import { useState } from "react";

import CodeSquare from "./CodeSquare";

type Props = {
  guessNumber: number;
  enableInteraction: boolean;
  checkGuess: Function;
};

const CodeRow = ({ guessNumber, enableInteraction, checkGuess }: Props) => {
  // this element needs to know all of the state of the square below
  // using this information; we should interact with the mastermind session
  const [code, setCode] = useState(Array(4).fill(""));

  const handleColorSelection = (index: number, color: string) => {
    const newCode = code.slice();
    newCode[index] = color
    setCode(newCode);
  }

  const codeRow = code.map((value, index) => {
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
      <div className="codeRow">{codeRow}</div>
      {enableInteraction && (
        <button
          onClick={() => {
            checkGuess(code);
          }}
        >
          Click Me
        </button>
      )}
      <div className="keyPegs">{/* todo */}</div>
    </div>
  );
};

export default CodeRow;
