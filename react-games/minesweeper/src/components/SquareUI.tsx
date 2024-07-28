import React from 'react'
import { Box } from '@chakra-ui/react';
import { Point, Square } from './types'

type Props = {
  point: Point
  square: Square
  revealSquare: (point: Point) => void;
  toggleFlag: (point: Point) => void;
}

export const SquareUi: React.FC<Props> = ({ point, square, revealSquare, toggleFlag }) => {
  const handleLeftClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to stop the page from navigating on drag.
    revealSquare(point);
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the context menu from appearing.
    toggleFlag(point);
  }

  // Use the Box component as a container, and Button for interactions.
  return (
    <Box
      onContextMenu={handleRightClick}
      onClick={handleLeftClick}
      w="40px"  // width
      h="40px"  // height
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px solid #000" // border style
      bgColor={square.revealed ? (square.mine ? "red" : "#eee") : "#ccc"}  // background color changes based on state
      cursor="pointer"
      position="relative"
    >
      {
        square.revealed ? (
          square.mine ? "💣" : (square.numNeighborMines === 0 ? "" : square.numNeighborMines)
        ) : (
          square.flagged ? "🚩" : ""
        )
      }
    </Box>
  )
}
