import { useState } from "react";
import { MastermindEngine } from "../game";

import CodeRow from "./CodeRow";

type Props = {
  numGuessesAllowed: number;
};

function MastermindGame({ numGuessesAllowed }: Props) {
  // come up with random code here
  const code = ["white", "white", "white", "white"];
  const [mastermind, setMastermind] = useState(new MastermindEngine(code));
  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);

  const checkGuess = (code: string[]) => {
    const keyPegs = mastermind.takeTurn(code);
    setMastermind(mastermind);
    setCurrentGuessNumber(mastermind.numGuesses);

    if (mastermind.gameState === "PLAYER_WINS") {
      alert("Congrats! You won!");
    } else if (mastermind.gameState === "GAME_OVER") {
      alert("You lost! Try to play again!");
    }

    return keyPegs;
  };

  const gameBoard = Array(numGuessesAllowed)
    .fill("")
    .map((_, index) => {
      return (
        <CodeRow
          key={index}
          guessNumber={index + 1}
          enableInteraction={
            currentGuessNumber === index &&
            mastermind.gameState === "IN_PROGRESS"
          }
          checkGuess={checkGuess}
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

export default MastermindGame;
