import React from 'react'
import { Point, Square } from './types'
import { SquareElement } from './Square'
import './styles.css'

interface MinesweeperGameProps {
  squares: Map<string, Square>;
}

export const Board: React.FC<MinesweeperGameProps> = ({ squares }) => {
  const board = Array.from(squares.entries()).map(([point_str, square], index) => {
    const point = Point.fromString(point_str)

    return (
      <SquareElement
        key={point.toString()}
        point={point}
        square={square}
      />
    );
  });

  return (
    <div className="game-board">
      {board}
    </div>
  )
}
