import { MastermindEngine } from "./game"

test('create new game', () => {
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code)

  expect(mastermind.gameState).toBe("IN_PROGRESS");
  expect(mastermind.numGuesses).toBe(0);
});


test('make guess -- no correct positions', () => {
  // Arrange -- set up game
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code)
  const guess = ["e", "f", "g", "h"]

  // Act -- guess code
  mastermind.takeTurn(guess)

  // Assert -- game state is as expected
  expect(mastermind.gameState).toBe("IN_PROGRESS");
  expect(mastermind.numGuesses).toBe(1);
  expect(mastermind.decodingBoard[0]).toStrictEqual({
    codePegs: guess,
    keyPegs: Array(4).fill(undefined)
  });
});

test('player guess code correctly', () => {
  // Arrange -- set up game with correct guess
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code)
  const guess = code.slice()

  // Act -- guess code
  mastermind.takeTurn(guess)

  // Assert -- game state is as expected
  expect(mastermind.gameState).toBe("PLAYER_WINS");
  expect(mastermind.numGuesses).toBe(1);
  expect(mastermind.decodingBoard[0]).toStrictEqual({
    codePegs: guess,
    keyPegs: Array(4).fill("black")
  });
});

test('player\'s guess has a correct color in the right position', () => {
  // Arrange -- set up game
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code)
  const guess = ["a", "e", "f", "g"]

  // Act -- guess code
  mastermind.takeTurn(guess)

  // Assert -- game state is as expected
  expect(mastermind.gameState).toBe("IN_PROGRESS");
  expect(mastermind.numGuesses).toBe(1);
  expect(mastermind.decodingBoard[0]).toStrictEqual({
    codePegs: guess,
    keyPegs: ["black", undefined, undefined, undefined]
  });
});

test('player\'s guess has a correct color in the wrong position', () => {
  // Arrange -- set up game
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code)
  const guess = ["e", "a", "f", "g"]

  // Act -- guess code
  mastermind.takeTurn(guess)

  // Assert -- game state is as expected
  expect(mastermind.gameState).toBe("IN_PROGRESS");
  expect(mastermind.numGuesses).toBe(1);
  expect(mastermind.decodingBoard[0]).toStrictEqual({
    codePegs: guess,
    keyPegs: ["white", undefined, undefined, undefined]
  });
});

test('player\'s guess results in 1 black and 1 white peg', () => {
  // Arrange -- set up game
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code)
  const guess = ["a", "c", "f", "g"]

  // Act -- guess code
  mastermind.takeTurn(guess)

  // Assert -- game state is as expected
  expect(mastermind.gameState).toBe("IN_PROGRESS");
  expect(mastermind.numGuesses).toBe(1);
  expect(mastermind.decodingBoard[0]).toStrictEqual({
    codePegs: guess,
    keyPegs: ["black", "white", undefined, undefined]
  });
});

test('game the player wins cannot be interactd with', () => {
  // Arrange -- set up game the player has won
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code)
  const guess = ["a", "b", "c", "d"]
  mastermind.takeTurn(guess)
  expect(mastermind.gameState).toBe("PLAYER_WINS");

  // Act / Assert -- make another guess
  expect(() => {
    mastermind.takeTurn(guess);
  }).toThrow();
});

test('game the player wins cannot be interactd with', () => {
  // Arrange -- set up game that is over
  const code = ["a", "b", "c", "d"]
  const mastermind = new MastermindEngine(code, 1)
  const guess = ["d", "b", "c", "d"]
  mastermind.takeTurn(guess)
  expect(mastermind.gameState).toBe("GAME_OVER");

  // Act / Assert -- make another guess
  expect(() => {
    mastermind.takeTurn(guess);
  }).toThrow();
});
