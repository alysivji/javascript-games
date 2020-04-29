// use emojis

const BOX_SIZE = 100;
const MARGIN = 50;
const LEFT = 50;
const TOP = 50;

board = []
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    square = document.createElement("div");
    square.style.position = "absolute";
    square.style.width = `${BOX_SIZE}px`;
    square.style.height = `${BOX_SIZE}px`;
    square.style.background = "black";

    _left = LEFT + MARGIN + (BOX_SIZE + MARGIN * 2) * i
    square.style.left = `${_left}px`;
    _top = TOP + MARGIN + (BOX_SIZE + MARGIN * 2) * j
    square.style.top = `${_top}px`;

    board.append(square)
    document.body.appendChild(square)
  }
}
