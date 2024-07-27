import React, { useState } from 'react'
import { Point, Square } from './types'
import './styles.css'

type Props = {
  point: Point
  square: Square
}

export const SquareElement: React.FC<Props> = ({ point, square }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const style = {
    gridRowStart: point.row + 1,
    gridColumnStart: point.col + 1
  };

  const handleMouseEnter = () => setShowTooltip(false);
  const handleMouseLeave = () => setShowTooltip(false);

  const tooltipContent = `Row: ${point.row}, Col: ${point.col}, Mines: ${square.mine} NeighborMines: ${square.numNeighborMines}`;

  return (
    <div
      key={point.toString()}
      className={`square row-${point.row} col-${point.col}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {square.mine ? "💣" : square.numNeighborMines}
      {showTooltip && (
        <div className="tooltip" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          {tooltipContent}
        </div>
      )}
    </div>
  )
}
