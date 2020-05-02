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
  }

  nextTurn() {
    return this.players.next().value;
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

  draw() {
    // drawing logic should be here
  }
}

let g = new Game();
console.log(g);
