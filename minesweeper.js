/* -----------------------------------LOGIC----------------------------- */

// object of tile status classes from css
const TILE_STATUSES = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked'
}

export function createBoard(boardSize, numberOfMines) {
  const board = []
  for (let x = 0; x < boardSize; x++) {
    const row = []
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement('div')
      element.dataset.status = TILE_STATUSES.HIDDEN
      
      const tile = {
        element,
        x,
        y
      }

      row.push(tile)
    }
    board.push(row)
  }
  return board
}