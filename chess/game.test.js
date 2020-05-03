import { Board, Knight, Rook } from "./game.js"

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
