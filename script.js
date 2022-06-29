/* -----------------------------------UI----------------------------- */
import { TILE_STATUSES, createBoard, markTile } from "./minesweeper.js"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeft = document.querySelector('[data-mine-count]')

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element)
    tile.element.addEventListener('click', (e) => {
      console.log(e.currentTarget)

    })
    // handle right-clicking with contextmenu
    tile.element.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      markTile(tile)
      listMinesLeft()
    })
  })
})

// fills in board --size variable from board class in css
boardElement.style.setProperty('--size', BOARD_SIZE)

minesLeft.textContent = NUMBER_OF_MINES

// updates mine count when marking tiles
function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
  }, 0)

  minesLeft.textContent = NUMBER_OF_MINES - markedTilesCount
}