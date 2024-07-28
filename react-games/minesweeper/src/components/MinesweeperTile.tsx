import React from 'react'
import { Box } from '@chakra-ui/react';
import { Point, TileDetails } from './types'

type Props = {
  point: Point
  tile: TileDetails
  revealTile: (point: Point) => void;
  toggleFlag: (point: Point) => void;
}

export const MinesweeperTile: React.FC<Props> = ({ point, tile, revealTile, toggleFlag }) => {
  const handleLeftClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to stop the page from navigating on drag.
    revealTile(point);
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
      bgColor={tile.revealed ? (tile.mine ? "red" : "#eee") : "#ccc"}  // background color changes based on state
      cursor="pointer"
      position="relative"
    >
      {
        tile.revealed ? (
          tile.mine ? "💣" : (tile.numNeighborMines === 0 ? "" : tile.numNeighborMines)
        ) : (
          tile.flagged ? "🚩" : ""
        )
      }
    </Box>
  )
}
