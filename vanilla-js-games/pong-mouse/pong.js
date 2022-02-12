let endGameState = false;
let ball_speed_x = 5;
let ball_speed_y = -5;

// CONSTANTS
const LEFT = 100;
const TOP = 50;
const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 600;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;
const PADDLE_MOVEMENT = 40;
const BALL_SIZE = 20;

// Draw game pieces
board = document.createElement("div");
board.style.position = "absolute";
board.style.left = `${LEFT}px`;
board.style.top = `${TOP}px`;
board.style.width = `${BOARD_WIDTH}px`;
board.style.height = `${BOARD_HEIGHT}px`;
board.style.background = "black";
document.body.appendChild(board);

leftPaddle = document.createElement("div");
leftPaddle.style.position = "absolute";
lpLeft = 50;
leftPaddle.style.left = `${lpLeft}px`;
lpTop = 50;
leftPaddle.style.top = `${lpTop}px`;
leftPaddle.style.width = `${PADDLE_WIDTH}px`;
leftPaddle.style.height = `${PADDLE_HEIGHT}px`;
leftPaddle.style.background = "white";
board.appendChild(leftPaddle);

rightPaddle = document.createElement("div");
rightPaddle.style.position = "absolute";
rpLeft = 1130;
rightPaddle.style.left = `${rpLeft}px`;
rpTop = 50;
rightPaddle.style.top = `${rpTop}px`;
rightPaddle.style.width = `${PADDLE_WIDTH}px`;
rightPaddle.style.height = `${PADDLE_HEIGHT}px`;
rightPaddle.style.background = "white";
board.appendChild(rightPaddle);

ball = document.createElement("div");
ball.style.position = "absolute";
ballLeft = 800;
ball.style.left = `${ballLeft}px`;
ballTop = 300;
ball.style.top = `${ballTop}px`
ball.style.width = `${BALL_SIZE}px`;
ball.style.height = `${BALL_SIZE}px`;
ball.style.background = "white";
board.appendChild(ball);

// Move Right Paddle
window.addEventListener("keydown", keyDown);
function keyDown(event) {
  if (event.code == "ArrowUp") {
    newTop = rpTop - PADDLE_MOVEMENT;
    if (newTop >= 0) {
      rightPaddle.style.top = (newTop) + "px";
      rpTop = newTop;
    }
  } else if (event.code == "ArrowDown") {
    newTop = rpTop + PADDLE_MOVEMENT;
    if (newTop + PADDLE_HEIGHT <= BOARD_HEIGHT + 10) {
      rightPaddle.style.top = (newTop) + "px";
      rpTop = newTop;
    }
  }
}

// Move Left Paddle
function moved(event) {
  newTop = event.clientY;
  newBottom = newTop + PADDLE_HEIGHT;
  console.log(newBottom >= BOARD_HEIGHT);
  if (newTop > 0) {
    leftPaddle.style.top = (newTop) + "px";
    lpTop = newTop;
  }
  if (newBottom >= BOARD_HEIGHT) {
    newTop = BOARD_HEIGHT - PADDLE_HEIGHT;
    leftPaddle.style.top = (newTop) + "px";
    lpTop = newTop;
  }
}

window.addEventListener("mousemove", moved);


function gameLoop() {
  // move ball
  ballLeft += ball_speed_x;
  ballTop += ball_speed_y;

  // top bounce
  if (ballTop <= 0) {
    ballTop = 0;
    ball_speed_y = -ball_speed_y;
  }
  // bottom bounce
  ballBottom = ballTop + BALL_SIZE;
  if (ballBottom > BOARD_HEIGHT) {
    ballBottom = BOARD_HEIGHT;
    ball_speed_y = -ball_speed_y;
  }

  // did it hit left paddle
  leftPaddleRight = lpLeft + PADDLE_WIDTH;
  ballInBetweenLeftPaddle = (lpTop <= ballTop) && ((ballTop + BALL_SIZE) <= (lpTop + PADDLE_HEIGHT))
  if ((ballLeft <= leftPaddleRight) && ballInBetweenLeftPaddle) {
    ballLeft = leftPaddleRight;
    ball_speed_x = -ball_speed_x;
  }

  // did it hit right paddle
  ballRight = ballLeft + BALL_SIZE;
  ballInBetweenRightPaddle = (rpTop <= ballTop) && ((ballTop + BALL_SIZE) <= (rpTop + PADDLE_HEIGHT))
  if ((ballRight > rpLeft) && ballInBetweenRightPaddle) {
    ballLeft = rpLeft - BALL_SIZE;
    ball_speed_x = -ball_speed_x;
  }

  // is goal?
  if (ballLeft <= 0) {
    alert("Right paddle scores!");
    endGameState = true;
  }
  ballRight = ballLeft + BALL_SIZE;
  if (ballRight > BOARD_WIDTH) {
    alert("Left paddle scores!");
    endGameState = true;
  }

  if (!endGameState) {
    requestAnimationFrame(gameLoop);
  }

  // redraw ball
  ball.style.left = ballLeft;
  ball.style.top = ballTop;
}
requestAnimationFrame(gameLoop);
