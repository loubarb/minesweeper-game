/* -----------------------------------UI----------------------------- */
import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from './minesweeper.js';

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector('.board');
const minesLeft = document.querySelector('[data-mine-count]');
const messageText = document.querySelector('.subtext');

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    // handle left-click tile
    tile.element.addEventListener('click', (e) => {
      revealTile(board, tile);
      checkGameEnd();
    });
    // handle right-clicking with contextmenu
    tile.element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});

// fills in board --size variable from board class in css
boardElement.style.setProperty('--size', BOARD_SIZE);

minesLeft.textContent = NUMBER_OF_MINES;

// updates mine count when marking tiles
function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);

  minesLeft.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener('click', stopProp, { capture: true });
    boardElement.addEventListener('contextmenu', stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = 'You won the game!';
  }

  if (lose) {
    messageText.textContent = 'You lost. Try again.';
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopPropagation();
}
