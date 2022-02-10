/* Mastermind

Rules: https://en.wikipedia.org/wiki/Mastermind_(board_game)

Current implementation:
  - codemaker -- computer
  - codebreaker -- human player
*/

const CODE_PEGS = {
  heart: "♥️",
  diamond: "♦️",
  spade: "♠️",
  club: "♣️",
  pawn: "♟",
  white: "🏐",
};

const KEY_PEGS = {
  black: "⬛",
  white: "⬜",
};

type CodeRow = {
  codePegs: string[];
  keyPegs: string[];
};

class MastermindEngine {
  gameState: "IN_PROGRESS" | "PLAYER_WINS" | "GAME_OVER"

  code: string[];
  guessesAllowed: number;

  decodingBoard: CodeRow[];
  numGuesses: number;

  constructor(code: string[], guessesAllowed = 8) {
    this.gameState = "IN_PROGRESS"

    // TODO: include code is valid
    this.code = code;
    this.guessesAllowed = guessesAllowed;

    this.decodingBoard = [];
    this.numGuesses = 0;
  }

  turn(guess: string[]): void {
    const keyPegs = this.evaluateCode(guess);

    const playerWins =
      keyPegs.map((item) => item === KEY_PEGS["black"]).filter(Boolean)
        .length === this.guessesAllowed;
    if (playerWins) this.gameState = "PLAYER_WINS";

    if (this.numGuesses == this.guessesAllowed) this.gameState = "GAME_OVER";

    return
  }

  private evaluateCode(guess: string[]): string[] {
    if (this.numGuesses > this.guessesAllowed) {
      throw new Error(`Game over! You've made ${this.guessesAllowed} guesses!`);
    }
    this.numGuesses++;

    // represents pegs in the code that have been matched
    let matchedPegs: boolean[] = [false, false, false, false];

    let numPegsCorrect = 0;
    guess.forEach((peg, index) => {
      if (peg !== this.code[index]) return;
      matchedPegs[index] = true;
      numPegsCorrect++;
    });

    let numPegsColorCorrect = 0;
    guess.forEach((peg, index) => {
      if (matchedPegs[index]) return;

      // does the guess peg match any of the unmatched pegs
      const remainingCodePegs = this.code.map((value, index) => {
        if (matchedPegs[index] === false) return value;
      });
      for (let i = 0; i < remainingCodePegs.length; i++) {
        if (peg !== remainingCodePegs[i]) continue;
        matchedPegs[index] = true;
        numPegsColorCorrect++;
        break;
      }
    });

    // fill keyPegs with result
    const fullMatch = Array(numPegsCorrect).fill(KEY_PEGS["black"]);
    const partialMatch = Array(numPegsColorCorrect).fill(KEY_PEGS["white"]);
    const noMatch = Array(4 - (numPegsCorrect + numPegsColorCorrect)).fill(
      undefined
    );
    const keyPegs = fullMatch.concat(partialMatch, noMatch);

    return keyPegs;
  }
}
