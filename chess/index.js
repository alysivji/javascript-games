import { Game, RANKS, FILES } from "./game.js";

class HTMLChessboard {
  constructor() {
    for (let rank of RANKS.reverse()) {
      for (let file of FILES) {
        let div = document.createElement("div");

        let position = file + rank;
        div.id = position;

        let positionSum = FILES.indexOf(file) + RANKS.indexOf(rank);
        let squareColor = positionSum % 2 == 0 ? "white" : "black";
        div.classList.add(squareColor);

        chessboardElement.appendChild(div);
      }
    }
  }

  boardToHTML(board) {
    board.squares.forEach((piece, position) => {
      let square = document.getElementById(position);
      square.innerText = piece ? piece.symbol : "";
    });
  }
}

let g = new Game();
let board = g.board;
console.log(board);

const chessboardElement = document.getElementById("chessboard");
let htmlChessboard = new HTMLChessboard();
htmlChessboard.boardToHTML(board);
