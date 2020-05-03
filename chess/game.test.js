import { Bishop, Board, Knight, Rook, Queen } from "./game.js"

describe('Test Rook', () => {
  let board;
  let knight;

  beforeEach(() => {
    board = new Board();
    knight = new Knight("white")
    board.setSquare("b1", knight);
  });

  test('Open move for knight', () => {
    const moves = knight.getAvailableMoves(board.squares, { file: "b", rank: 1 });
    expect(moves.sort()).toEqual(["d2", "c3", "a3"].sort())
  });

});

describe('Test Rook', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  test('Open moves', () => {
    const rook = new Rook("white")
    board.setSquare("d4", rook);

    const moves = rook.getAvailableMoves(board.squares, { file: "d", rank: 4 });
    const expectedMoves = ["d1", "d2", "d3", "d5", "d6", "d7", "d8", "a4", "b4", "c4", "e4", "f4", "g4", "h4"];
    expect(moves.sort()).toEqual(expectedMoves.sort())
  });

});

describe('Test Bishop', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  test('Open moves', () => {
    const bishop = new Bishop("white")
    board.setSquare("d4", bishop);

    const moves = bishop.getAvailableMoves(board.squares, { file: "d", rank: 4 });
    const expectedMoves = ["a1", "b2", "c3", "e5", "f6", "g7", "h8", "a7", "b6", "c5", "e3", "f2", "g1"];
    expect(moves.sort()).toEqual(expectedMoves.sort())
  });

});

describe('Test Queen', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  test('Open moves', () => {
    const queen = new Queen("white")
    board.setSquare("d4", queen);

    const moves = queen.getAvailableMoves(board.squares, { file: "d", rank: 4 });
    const expectedMoves = [
      "d1", "d2", "d3", "d5", "d6", "d7", "d8", "a4", "b4", "c4", "e4", "f4", "g4", "h4",
      "a1", "b2", "c3", "e5", "f6", "g7", "h8", "a7", "b6", "c5", "e3", "f2", "g1"
    ];
    expect(moves.sort()).toEqual(expectedMoves.sort())
  });

});
