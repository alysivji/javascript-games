const PLAYER1 = "X"
const PLAYER2 = "O"

const BOX_SIZE = 100;
const MARGIN = 10;
const LEFT = 50;
const TOP = 50;

board = document.createElement("div");
board.style.position = "absolute";
board.style.width = (MARGIN + BOX_SIZE) * 3.4;
board.style.height = (MARGIN + BOX_SIZE) * 3.4;
board.style.background = "black";
board.style.left = LEFT;
board.style.top = TOP;
document.body.appendChild(board);

turnLabel = document.createElement("div");
turnLabel.innerHTML = "Turn";
document.body.appendChild(turnLabel);
turn = document.createElement("div");
turn.innerText = PLAYER1;
document.body.appendChild(turn);

squares = []
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    square = document.createElement("div");
    square.style.position = "absolute";
    square.style.width = `${BOX_SIZE}px`;
    square.style.height = `${BOX_SIZE}px`;
    square.style.background = "white";
    square.style.border = "thick solid black";
    square.style.textAlign = "center";
    square.style.verticalAlign = "middle";
    square.style.fontSize = "60px"

    _left = MARGIN + (BOX_SIZE + MARGIN * 2) * j
    square.style.left = `${_left}px`;
    _top = MARGIN + (BOX_SIZE + MARGIN * 2) * i
    square.style.top = `${_top}px`;

    // add onClick handler
    square.addEventListener("click", drawPiece)

    board.appendChild(square);
    squares.push(square);
  }
}

function drawPiece(event) {
  target = event.target;

  if (!target.innerText) {
    target.innerText = turn.innerText;

    checkGameState();

    if (turn.innerText == "X") {
      turn.innerText = "O";
    } else {
      turn.innerText = "X";
    }
  }
}

function checkGameState() {
  board = squares.map(square => square.innerText);
  catsGame = board.every(item => item != "")

  if (catsGame) {
    alert("Cat wins")
    removeEventListener("click", drawPiece)
    return
  }

  if (
    board[0] == turn.innerText && board[1] == turn.innerText && board[2] == turn.innerText ||
    board[3] == turn.innerText && board[4] == turn.innerText && board[5] == turn.innerText ||
    board[6] == turn.innerText && board[7] == turn.innerText && board[8] == turn.innerText ||
    board[0] == turn.innerText && board[3] == turn.innerText && board[6] == turn.innerText ||
    board[1] == turn.innerText && board[5] == turn.innerText && board[8] == turn.innerText ||
    board[2] == turn.innerText && board[1] == turn.innerText && board[2] == turn.innerText ||
    board[0] == turn.innerText && board[4] == turn.innerText && board[8] == turn.innerText ||
    board[2] == turn.innerText && board[4] == turn.innerText && board[6] == turn.innerText
  ) {
    alert(`${turn.innerText} Wins!`)
    removeEventListener("click", drawPiece)
  }
}
