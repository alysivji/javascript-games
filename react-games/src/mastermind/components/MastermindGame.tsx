import { useState } from "react";

import CodeRow from "./CodeRow";
import Solution from "./Solution";
import { CODE_PEGS } from "../constants";
import { MastermindEngine } from "../game";

const CODE_COLORS = Array.from(CODE_PEGS.keys());

type Props = {
  numGuessesAllowed: number;
};

const generate_random_code= () => {
  const generatedCode: string[] = [];
  for (let i = 0; i < 4; i++) {
    const randomColor =
      CODE_COLORS[Math.floor(Math.random() * CODE_COLORS.length)];
    generatedCode.push(randomColor)
  }
  return generatedCode
}

function MastermindGame({ numGuessesAllowed }: Props) {
  // come up with random code here
  const [solution, _] = useState(generate_random_code())
  const [mastermind, setMastermind] = useState(new MastermindEngine(solution));
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
    <div className="mastermind-container">
      <h1>MasterMind</h1>
      <div className="mastermind-board">{gameBoard}</div>
      {/* NOTE: the submit button is screwing stuff up */}
      {/* Have a div overlaying the solution */}
      <Solution code={solution} />
    </div>
  );
}

export default MastermindGame;
