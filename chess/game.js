import { cycle } from 'itertools';

const RANKS = [1, 2, 3, 4, 5, 6, 7, 8]
const FILES = ["A", "B", "C", "D", "E", "F", "G", "H"]
const PLAYER_COLORS = ["white", "black"]

class Player {
  constructor(color) {
    this.color = color;
    this.captured_pieces = [];
  }
}

class Game {
  constructor() {
    let players = PLAYER_COLORS.map(color => new Player(color));
    this.players = cycle(players);
    this.current_turn = this.nextTurn();

    this.board = new Board();
    this._arrangePiecesForNewGame();
  }

  nextTurn() {
    return this.players.next().value;
  }

  _arrangePiecesForNewGame() {
    this.board.setSquare("A1", new Rook("white"));
    this.board.setSquare("B1", new Knight("white"));
    this.board.setSquare("C1", new Bishop("white"));
    this.board.setSquare("D1", new Queen("white"));
    this.board.setSquare("E1", new King("white"));
    this.board.setSquare("F1", new Bishop("white"));
    this.board.setSquare("G1", new Knight("white"));
    this.board.setSquare("H1", new Rook("white"));
    for (let letter of FILES) {
      this.board.setSquare(letter + "2", new Pawn("white"));
    }

    this.board.setSquare("A8", new Rook("black"));
    this.board.setSquare("B8", new Knight("black"));
    this.board.setSquare("C8", new Bishop("black"));
    this.board.setSquare("D8", new Queen("black"));
    this.board.setSquare("E8", new King("black"));
    this.board.setSquare("F8", new Bishop("black"));
    this.board.setSquare("G8", new Knight("black"));
    this.board.setSquare("H8", new Rook("black"));
    for (let letter of FILES) {
      this.board.setSquare(letter + "7", new Pawn("black"));
    }
  }
}

class Board {
  constructor() {
    let squares = new Map();
    for (let file of FILES) {
      for (let rank of RANKS) {
        squares[file + rank] = undefined;
      }
    }
    this.squares = squares;
  }

  setSquare(position, piece) {
    if (!(position in this.squares)) {
      throw Error(`Cannot set square {position}`)
    }
    this.squares[position] = piece;
  }

  draw() {
    // drawing logic should be here
  }
}

class Piece {
  constructor(color) {
    this.color = color;
  }
}

class Pawn extends Piece {

}

class Rook extends Piece {

}

class Knight extends Piece {

}

class Bishop extends Piece {

}

class Queen extends Piece {

}

class King extends Piece {

}

export { Game };
