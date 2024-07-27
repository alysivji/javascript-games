import React, { useState } from 'react'
import { SquareElement } from './Square';
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

  const handleToggleFlag = (point: Point) => {
    if (gameState !== GameState.IN_PROGRESS) return;
    if (squares.get(point.toString())!.revealed) return;

    const squaresArr: [string, Square][] = Array.from(squares.entries()).map(([point_str, square]) => {
      if (point.toString() !== point_str) return [point_str, square]
      const newSquare: Square = {
        ...square,
        flagged: !square.flagged,
      }
      return [point_str, newSquare];
    })

    setSquares(new Map(squaresArr));
  }

  const revealSquare = (point: Point) => {
    if (gameState !== GameState.IN_PROGRESS) return;
    const currSquare = squares.get(point.toString())!
    if (currSquare.revealed) return;
    if (currSquare.flagged) return;

    const squaresArr: [string, Square][] = Array.from(squares.entries()).map(([point_str, square]) => {
      if (point.toString() !== point_str) return [point_str, square]
      const newSquare: Square = {
        ...square,
        revealed: true,
      }
      return [point_str, newSquare];
    })

    const updatedSquares = new Map(squaresArr);

    // if the squares has no mine neighbours, find area of no mines
    if (currSquare.numNeighborMines === 0) {
      const pointsToReveal: Point[] = findPointsToReveal(updatedSquares, point)
      pointsToReveal.forEach(p => {
        const square = updatedSquares.get(p.toString())!
        const newSquare: Square = {
          ...square,
          revealed: true
        }
        updatedSquares.set(p.toString(), newSquare);
      });
    }

    setSquares(updatedSquares);

    // check game conditions
    if (currSquare.mine) setGameState(GameState.USER_LOST);
    const numSquaresToReveal = Array.from(updatedSquares.entries()).filter(([point_str, square]) => !square.revealed).length
    if (numSquaresToReveal === numMines) setGameState(GameState.USER_WON);
  }

  const board = Array.from(squares.entries()).map(([point_str, square]) => {
    const point = Point.fromString(point_str)

    return (
      <SquareElement
        key={point.toString()}
        point={point}
        square={square}
        revealSquare={revealSquare}
        toggleFlag={handleToggleFlag}
      />
    );
  });

  return (
    <>
      <h1>Minesweeper</h1>
      <p>Currently playing easy mode (TODO make mode toggleable)</p>
      <p>Current State: {gameState}</p>
      <button onClick={handleRestartGameClick}>Restart Game</button>
      <div className="game-board">
        {board}
      </div>
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


const findPointsToReveal = (squares: Map<string, Square>, point: Point): Point[] => {
  const currSquare = squares.get(point.toString())!
  if (currSquare.numNeighborMines !== 0) return []

  // find all zero neighbour points connected to point
  let zeroNeighbourKeys = new Set<string>();
  let searchedKeys = new Set<string>();
  let toSearchKeys = [point.toString()]

  while (toSearchKeys.length > 0) {
    const p_key = toSearchKeys.pop()!;
    searchedKeys.add(p_key);
    const s = squares.get(p_key)!
    if (s.numNeighborMines === 0) zeroNeighbourKeys.add(p_key);

    Point.fromString(p_key).adjacent8().forEach(adjP => {
      const adjPStr = adjP.toString();
      const adjSquare = squares.get(adjPStr);
      if (adjSquare === undefined) return
      if (adjSquare.numNeighborMines !== 0) return
      if (searchedKeys.has(adjPStr)) return
      toSearchKeys.push(adjPStr);
    })
  }

  // get all adjacent points to zeroNeighbourKeys
  const frontierPoints: Set<string> = new Set();
  zeroNeighbourKeys.forEach(key => {
    Point.fromString(key).adjacent8().forEach(frontierP => {
      const s = squares.get(frontierP.toString());
      if (s === undefined) return
      frontierPoints.add(frontierP.toString())
    })
  })

  const allKeysToReveal = Array.from(frontierPoints).concat(Array.from(zeroNeighbourKeys));

  return allKeysToReveal.map(pStr => Point.fromString(pStr));
}

export default Minesweeper;
