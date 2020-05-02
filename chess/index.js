import { Game, RANKS, FILES } from "./game.js";

class HTMLChessManager {
  constructor(game) {
    this.game = game;
    this._drawBoard();
    this.update();
  }

  _drawBoard() {
    for (let rank of RANKS.reverse()) {
      for (let file of FILES) {
        let div = document.createElement("div");
        div.addEventListener('click', event => this.selectPiece(event));

        let position = file + rank;
        div.id = position;

        let positionSum = FILES.indexOf(file) + RANKS.indexOf(rank);
        let squareColor = positionSum % 2 == 0 ? "white" : "black";
        div.classList.add(squareColor);

        chessboardElement.appendChild(div);
      }
    }
  }

  update() {
    let { board } = this.game.currentState();
    board.forEach((piece, position) => {
      let square = document.getElementById(position);
      square.innerText = piece ? piece.symbol : "";
    });
  }

  selectPiece(event) {
    let target = event.target;
    let unselectPiece = target.classList.contains("selected")
    if (unselectPiece) {
      target.classList.remove("selected");
      return;
    }

    let position = target.id;
    let { selected, availableMoves } = this.game.selectPiece(position);
    if (selected) {
      for (let square of document.getElementsByClassName("selected")) {
        square.classList.remove("selected");
      }
      target.classList.add("selected");
    }
  }

}

const chessboardElement = document.getElementById("chessboard");
new HTMLChessManager(new Game());
