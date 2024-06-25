import GameBoard from './GameBoard.mjs';

const Player = (name = 'Computer') => {
  const board = GameBoard();
  const gameBoard = board.createBoard();
  const showBoard = () => {
    const playerBoard = document.querySelector('#player-board');
    const computerBoard = document.querySelector('#computer-board');
    const size = 10;

    if (name !== 'Computer') {
      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          const cell = document.createElement('div');
          cell.setAttribute('coord', [i, j]);
          cell.className = 'p-cell';
          playerBoard.appendChild(cell);
          if (gameBoard[i][j] === 'water') {
            cell.className = 'p-cell water';
            playerBoard.appendChild(cell);
          }
          if (gameBoard[i][j] !== 'water') {
            cell.className = 'p-cell ship';
            cell.setAttribute('draggable', 'true');
            cell.style.border = 'none';
            playerBoard.appendChild(cell);
          }
        }
      }
    } else {
      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          const cell = document.createElement('div');
          cell.setAttribute('coord', [i, j]);
          cell.classList.add('c-cell');
          computerBoard.appendChild(cell);
          if (gameBoard[i][j] === 'water') {
            cell.className = 'c-cell water';
            computerBoard.appendChild(cell);
          } else {
            cell.className = 'c-cell water';
          }
        }
      }
    }

    return gameBoard;
  };
  return { name, board, showBoard };
};

export default Player;
