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
        div.addEventListener('click', event => this.handleBoardClick(event));

        let position = file + rank;
        div.id = position;

        let positionSum = FILES.indexOf(file) + RANKS.indexOf(rank);
        let squareColor = positionSum % 2 == 0 ? "white" : "black";
        div.classList.add(squareColor);

        document.getElementById("htmlChessboard").appendChild(div);
      }
    }
  }

  update() {
    let { board, turn } = this.game.currentState;
    board.forEach((piece, position) => {
      let square = document.getElementById(position);
      square.innerText = piece ? piece.symbol : "";
    });
    // update DOM node that showns turn
  }

  handleBoardClick(event) {
    const previouslySelected = document.getElementsByClassName("selected")[0]

    document.querySelectorAll(".selected").forEach(square => square.classList.remove("selected"));
    document.querySelectorAll(".availableMove").forEach(square => square.classList.remove("availableMove"));

    let position = event.target.id;

    let { board, turn } = this.game.currentState;
    let piece = board.get(position);

    if (!previouslySelected) {
      if (!piece) return;
      if (piece.color != turn) return;

      // select piece
      event.target.classList.add("selected");
      let availableMoves = this.game.getAvailableMoves(position);
      for (let move of availableMoves) {
        let square = document.getElementById(move);
        square.classList.add("availableMove");
      }
    } else {
      const previouslySelectedPosition = previouslySelected.id
      this.game.movePiece(previouslySelectedPosition, position);
      this.update();
    }
  }
}

class FancyChessManager {
  constructor(game) {
    this.game = game;
    this.drawBoard();
  }

  drawBoard() {
    let { board, turn } = this.game.currentState;
    // convert board mapping into object of position: ojbect

    var config = {
      draggable: true,
      position: 'start',
    }
    new Chessboard('fancyChess', config);
  }
}

// new HTMLChessManager(new Game());
new FancyChessManager(new Game());
