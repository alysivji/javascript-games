import React, { useState } from 'react'
import { Point, Square } from './types'
import './styles.css'

type Props = {
  point: Point
  square: Square
  revealSquare: (point: Point) => void;
  toggleFlag: (point: Point) => void;
}

export const SquareElement: React.FC<Props> = ({ point, square, revealSquare, toggleFlag }) => {
  const style = {
    gridRowStart: point.row + 1,
    gridColumnStart: point.col + 1
  };

  const handleLeftClick = (e: React.MouseEvent) => {
    e.preventDefault();
    revealSquare(point);
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFlag(point)
  }

  return (
    <div
      className={`square row-${point.row} col-${point.col}`}
      style={style}
    >
      {
        square.revealed
          ?
          square.mine
            ?
            "💣"
            :
            square.numNeighborMines
          :
          <button
            className="unrevealed"
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
          >
            {
              square.flagged ? "🚩" : ""
            }
          </button>
      }
    </div>
  )
}
