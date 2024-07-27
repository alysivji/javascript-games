import React, { useState } from 'react'
import { Board } from './Board'
import { Point, Square } from './types';

const rows = 10;
const cols = 10;
const numMines = 10;


enum GameState {
  IN_PROGRESS = "In Progress",
  USER_WON = "User Won",
  USER_LOST = "User Lost"
}

const Minesweeper = () => {
  const [gameState, setGameState] = useState(GameState.IN_PROGRESS);
  const [squares, setSquares] = useState(initializeBoard(rows, cols, numMines));

  const handleRestartGameClick = () => {
    setGameState(GameState.IN_PROGRESS);
    setSquares(initializeBoard(rows, cols, numMines));
  }

  const handleGameOverClick = () => {
    setGameState(GameState.USER_LOST);
  }

  return (
    <>
      <h1>Minesweeper</h1>
      <p>Currently playing easy mode (TODO make mode toggleable)</p>
      <p>Current State: {gameState}</p>
      <button onClick={handleRestartGameClick}>Restart Game</button>
      <button onClick={handleGameOverClick}>Game Over</button>
      <Board squares={squares} />
    </>
  )
}

const initializeBoard = (rows: number, cols: number, numMines: number): Map<string, Square> => {
  const squares: Map<string, Square> = new Map();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const location = new Point(row, col)
      const square: Square = {
        mine: false,
        revealed: false,
        flagged: false,
        numNeighborMines: 0,
      }
      squares.set(location.toString(), square);
    }
  }

  console.log(squares)

  // set mine locations
  const squareLocations = Array.from(squares.keys());
  const mineLocations = squareLocations.sort(() => 0.5 - Math.random()).slice(0, numMines);

  // update board with mines
  mineLocations.forEach(point_str => {
    const point = Point.fromString(point_str);
    // add mine
    const updatedMine: Square = {
      ...squares.get(point_str)!,
      mine: true,
      numNeighborMines: -1,
    }
    squares.set(point_str, updatedMine);

    // go through mine neighbours and update num mines hint
    point.adjacent8().forEach(adjP => {
      const adjacentSquare = squares.get(adjP.toString());
      if (adjacentSquare === undefined) return;
      const updatedSquare: Square = {
        ...adjacentSquare,
        numNeighborMines: adjacentSquare.numNeighborMines + 1,
      }
      squares.set(adjP.toString(), updatedSquare);
    })
  })

  return squares;
}


export default Minesweeper;
