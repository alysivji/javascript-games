/* Mastermind

Rules: https://en.wikipedia.org/wiki/Mastermind_(board_game)

Current implementation:
  - codemaker -- computer
  - codebreaker -- human player
*/

type CodeRow = {
  codePegs: string[];
  keyPegs: string[];
};

class MastermindEngine {
  // TODO: use enums here
  private _gameState: "IN_PROGRESS" | "PLAYER_WINS" | "GAME_OVER"

  code: string[];
  private guessesAllowed: number;

  decodingBoard: CodeRow[];
  numGuesses: number;

  get gameState() {
    return this._gameState
  }

  constructor(code: string[], guessesAllowed = 8) {
    this._gameState = "IN_PROGRESS"

    // TODO: include code is valid
    this.code = code;
    this.guessesAllowed = guessesAllowed;

    this.decodingBoard = [];
    this.numGuesses = 0;
  }

  takeTurn(guess: string[]): void {
    if (this._gameState !== "IN_PROGRESS") {
      throw new Error(`Error. Game state is ${this._gameState}`);
    }

    const keyPegs = this.evaluateCode(guess);
    this.decodingBoard.push({codePegs: guess, keyPegs})
    this.numGuesses++;

    const playerWins =
      keyPegs.map((item) => item === "black").reduce((a, b) => a && b)
    if (playerWins) this._gameState = "PLAYER_WINS";

    if (this.numGuesses === this.guessesAllowed) this._gameState = "GAME_OVER";

    return
  }

  private evaluateCode(guess: string[]): string[] {
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
    const fullMatch = Array(numPegsCorrect).fill("black");
    const partialMatch = Array(numPegsColorCorrect).fill("white");
    const noMatch = Array(4 - (numPegsCorrect + numPegsColorCorrect)).fill(
      undefined
    );
    const keyPegs = fullMatch.concat(partialMatch, noMatch);

    return keyPegs;
  }
}

export { MastermindEngine }
