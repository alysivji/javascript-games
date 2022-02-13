import { useState } from "react";

import CodeRow from "./CodeRow";

type Props = {
  numGuessesAllowed: number;
};

function FullGame({ numGuessesAllowed }: Props) {
  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);

  const gameBoard = Array(numGuessesAllowed)
    .fill("")
    .map((_, index) => {
      return (
        <CodeRow
          key={index}
          guessNumber={index + 1}
          enableInteraction={currentGuessNumber === index}
        />
      );
    });

  return (
    <div>
      <h1>MasterMind</h1>
      <div className="gameBoard">{gameBoard}</div>
    </div>
  );
}

export default FullGame;
