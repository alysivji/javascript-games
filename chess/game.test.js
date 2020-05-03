import { Board, Knight } from "./game.js"

describe('Test Knight', () => {
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
