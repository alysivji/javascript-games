import { cycle } from 'itertools';

const RANKS = [1, 2, 3, 4, 5, 6, 7, 8]
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"]
const PLAYER_COLORS = ["white", "black"]

function toRank(letter) {
  return letter.charCodeAt() - 96;
}
function toFile(number) {
  return String.fromCharCode(number + 96);
}

class Player {
  constructor(color) {
    this.color = color;
    this.capturedPieces = [];
  }

  capturePiece(piece) {
    this.capturedPieces.push(piece);
  }
}

class Game {
  constructor() {
    this.players = PLAYER_COLORS.map(color => new Player(color));
    this.playersTurn = cycle(this.players);
    this._nextTurn();

    this.board = new Board();
    this._arrangePiecesForNewGame();
  }

  get currentState() {
    return {
      board: this.board.squares,
      turn: this.currentTurn.color,
      players: [
        {
          color: this.players[0].color,
          capturedPieces: this.players[0].capturedPieces,
        },
        {
          color: this.players[1].color,
          capturedPieces: this.players[1].capturedPieces,
        }
      ]
    };
  }

  selectPiece(position) {
    let piece = this.board.getPiece(position);
    if (!piece) {
      return { selected: false, availableMoves: [] }
    }

    let playersPiece = this.currentTurn.color === piece.color
    if (!playersPiece) {
      return { selected: false, availableMoves: [] }
    }

    // TODO if no availableMoves, how should we inform person?
    // => Raise a custom exception :D
    let positionObject = { file: position.substring(0, 1), rank: position.substring(1, 2) };
    let availableMoves = piece.getAvailableMoves(this.board.squares, positionObject);
    return { selected: true, availableMoves: availableMoves }
  }

  getAvailableMoves(position) {
    // not a piece
    let piece = this.board.getPiece(position);
    if (!piece) {
      return [];
    }

    let playersPiece = this.currentTurn.color === piece.color
    if (!playersPiece) {
      return [];
    }

    let positionObject = { file: position.substring(0, 1), rank: position.substring(1, 2) };
    return piece.getAvailableMoves(this.board.squares, positionObject);
  }

  movePiece(currPosition, newPosition) {
    // throw an Error if not possible; it should know how to handle
    const pieceToMove = this.board.getPiece(currPosition);
    if (!pieceToMove) {
      throw Error("no piece selected")
    }

    const playersPiece = this.currentTurn.color === pieceToMove.color
    if (!playersPiece) {
      throw Error("Not your turn")
    }

    const allowedMove = this.getAvailableMoves(currPosition).includes(newPosition)
    if (allowedMove) {
      const capturingPiece = this.board.getPiece(newPosition);
      if (capturingPiece) {
        this.currentTurn.capturePiece(capturingPiece);
        this.board.setSquare(currPosition, "");
      }
      this.board.setSquare(currPosition, "");
      this.board.setSquare(newPosition, pieceToMove);
      pieceToMove.incrementMovesCounter();
      this._nextTurn();
    }
  }

  _nextTurn() {
    this.currentTurn = this.playersTurn.next().value;
  }

  _arrangePiecesForNewGame() {
    this.board.setSquare("a1", new Rook("white"));
    this.board.setSquare("b1", new Knight("white"));
    this.board.setSquare("c1", new Bishop("white"));
    this.board.setSquare("d1", new Queen("white"));
    this.board.setSquare("e1", new King("white"));
    this.board.setSquare("f1", new Bishop("white"));
    this.board.setSquare("g1", new Knight("white"));
    this.board.setSquare("h1", new Rook("white"));
    for (let letter of FILES) {
      this.board.setSquare(letter + "2", new Pawn("white"));
    }

    this.board.setSquare("a8", new Rook("black"));
    this.board.setSquare("b8", new Knight("black"));
    this.board.setSquare("c8", new Bishop("black"));
    this.board.setSquare("d8", new Queen("black"));
    this.board.setSquare("e8", new King("black"));
    this.board.setSquare("f8", new Bishop("black"));
    this.board.setSquare("g8", new Knight("black"));
    this.board.setSquare("h8", new Rook("black"));
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
        squares.set(file + rank, "");
      }
    }
    this.squares = squares;
  }

  setSquare(position, piece) {
    if (!this.squares.has(position)) {
      throw Error(`Cannot set square ${position}`)
    }
    this.squares.set(position, piece);
  }

  getPiece(position) {
    return this.squares.get(position);
  }
}

class Piece {
  constructor(color) {
    this.color = color;
    this.numMoves = 0;
  }

  incrementMovesCounter() {
    this.numMoves++;
  }

  getAvailableMoves() {
    throw new Error('Object does not support the interface.');
  }
}

class Pawn extends Piece {
  // if we get to end, can become any piece; this is in game loop
  // or in move piece

  constructor(color) {
    super(color);
    this.symbol = color == "white" ? "♙" : "♟";
    this.move = color == "white" ? 1 : -1;
  }

  getAvailableMoves(board, position) {
    // can we move forward?
    let newRank = Number(position.rank) + this.move;
    let newPosition = position.file + newRank;

    if (!board.has(newPosition)) {
      return [];
    }

    let availableMoves = [];
    // can jump to positions with no pieces
    if (!board.get(newPosition)) {
      availableMoves.push(newPosition);

      if (this.numMoves == 0) {
        // pawns that haven't moved can go 2 spaces
        newRank = Number(position.rank) + this.move * 2;
        newPosition = position.file + newRank;
        if (!board.get(newPosition)) {
          availableMoves.push(newPosition);
        }
      }
    }

    // if capture available, add diagonal
    newRank = Number(position.rank) + this.move;
    for (let fileDelta of [1, -1]) {
      const newFile = toFile(Number(toRank(position.file)) + fileDelta);
      newPosition = newFile + newRank;

      const piece = board.get(newPosition);
      if (!piece) {
        continue
      }
      const currentPositionSquare = board.get(position.file + position.rank);
      if (piece.color == currentPositionSquare.color) continue;
      availableMoves.push(newPosition);
    }

    // TODO en passant

    return availableMoves;
  }
}

class Rook extends Piece {
  constructor(color) {
    super(color);
    this.symbol = color == "white" ? "♖" : "♜";
    this.directionVectors = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  }

  getAvailableMoves(board, position) {
    let availableMoves = [];

    for (let [file_dir, rank_dir] of this.directionVectors) {
      let multiplier = 1;
      do {
        let newFile = toFile(Number(toRank(position.file)) + file_dir * multiplier);
        let newRank = Number(position.rank) + rank_dir * multiplier;
        let newPosition = newFile + newRank;
        multiplier++;

        // not valid
        if (!board.has(newPosition)) {
          break;
        }

        // if position is empty, add it and continue
        let square = board.get(newPosition)
        if (!square) {
          availableMoves.push(newPosition);
          continue;
        }

        // if position is your color, break
        let currentPositionSquare = board.get(position.file + position.rank);
        if (square.color == currentPositionSquare.color) break;

        // if position is opponent's color, add it and break
        availableMoves.push(newPosition);
        break;
      } while (true);
    }
    return availableMoves;
  }
}

class Knight extends Piece {
  constructor(color) {
    super(color);
    this.symbol = color == "white" ? "♘" : "♞";
    this.possibleMoves = [
      [2, 1], [-2, 1], [2, -1], [-2, -1],
      [1, 2], [-1, 2], [1, -2], [-1, -2],
    ];
  }

  getAvailableMoves(board, position) {
    let availableMoves = [];

    for (let [file_delta, rank_delta] of this.possibleMoves) {
      let newFile = toFile(Number(toRank(position.file)) + file_delta);
      let newRank = Number(position.rank) + rank_delta;
      let newPosition = newFile + newRank;

      // valid position
      if (!board.has(newPosition)) {
        continue;
      }

      // can jump to positions with no pieces
      let square = board.get(newPosition)
      if (!square) {
        availableMoves.push(newPosition);
        continue
      }

      // cannot take own pieces
      let currentPositionSquare = board.get(position.file + position.rank);
      if (square.color == currentPositionSquare.color) continue;

      availableMoves.push(newPosition);
    }
    return availableMoves;
  }
}

class Bishop extends Piece {
  constructor(color) {
    super(color);
    this.symbol = color == "white" ? "♗" : "♝";
    this.directionVectors = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  }

  getAvailableMoves(board, position) {
    let availableMoves = [];

    for (let [file_dir, rank_dir] of this.directionVectors) {
      let multiplier = 1;
      do {
        let newFile = toFile(Number(toRank(position.file)) + file_dir * multiplier);
        let newRank = Number(position.rank) + rank_dir * multiplier;
        let newPosition = newFile + newRank;
        multiplier++;

        // not valid
        if (!board.has(newPosition)) {
          break;
        }

        // if position is empty, add it and continue
        let square = board.get(newPosition)
        if (!square) {
          availableMoves.push(newPosition);
          continue;
        }

        // if position is your color, break
        let currentPositionSquare = board.get(position.file + position.rank);
        if (square.color == currentPositionSquare.color) break;

        // if position is opponent's color, add it and break
        availableMoves.push(newPosition);
        break;
      } while (true);
    }
    return availableMoves;
  }
}

class Queen extends Piece {
  constructor(color) {
    super(color);
    this.symbol = color == "white" ? "♕" : "♛";
    this.directionVectors = [
      [1, 0], [-1, 0], [0, 1], [0, -1],
      [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];
  }

  getAvailableMoves(board, position) {
    let availableMoves = [];

    for (let [file_dir, rank_dir] of this.directionVectors) {
      let multiplier = 1;
      do {
        let newFile = toFile(Number(toRank(position.file)) + file_dir * multiplier);
        let newRank = Number(position.rank) + rank_dir * multiplier;
        let newPosition = newFile + newRank;
        multiplier++;

        // not valid
        if (!board.has(newPosition)) {
          break;
        }

        // if position is empty, add it and continue
        let square = board.get(newPosition)
        if (!square) {
          availableMoves.push(newPosition);
          continue;
        }

        // if position is your color, break
        let currentPositionSquare = board.get(position.file + position.rank);
        if (square.color == currentPositionSquare.color) break;

        // if position is opponent's color, add it and break
        availableMoves.push(newPosition);
        break;
      } while (true);
    }
    return availableMoves;
  }
}

class King extends Piece {
  constructor(color) {
    super(color);
    this.symbol = color == "white" ? "♔" : "♚";
  }

  getAvailableMoves() {
    return [];
  }
}

export { Board, Game, Knight, Rook, Bishop, Pawn, Queen, King, RANKS, FILES };
