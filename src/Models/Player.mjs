import GameBoard from './GameBoard.mjs';

const Player = (name = 'Computer') => {
  const board = GameBoard();
  const gameBoard = board.createBoard();
  const showBoard = () => {
    const playerBoard = document.querySelector('#player-board');
    const computerBoard = document.querySelector('#computer-board');
    const numbersHeader = document.querySelector('.numbers-header');
    const lettersHeader = document.querySelector('.letters-header');
    const numbersHeader2 = document.querySelector('.numbers-header-2');
    const lettersHeader2 = document.querySelector('.letters-header-2');
    const size = 10;
    const letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    if (name !== 'Computer') {
      for (let i = 0; i < letters.length; i += 1) {
        const letterCell = document.createElement('div');
        letterCell.className = 'letter-cell';
        letterCell.textContent = letters[i];
        lettersHeader.appendChild(letterCell);
      }

      for (let i = 0; i < size; i += 1) {
        const numberCell = document.createElement('div');
        const letterCell = document.createElement('div');
        numberCell.className = 'number-cell';
        letterCell.className = 'letter-cell';
        numberCell.textContent = i + 1;
        numbersHeader.appendChild(numberCell);
      }

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
      for (let i = 0; i < letters.length; i += 1) {
        const letterCell = document.createElement('div');
        letterCell.className = 'letter-cell';
        letterCell.textContent = letters[i];
        lettersHeader2.appendChild(letterCell);
      }
      for (let i = 0; i < size; i += 1) {
        const numberCell = document.createElement('div');
        const letterCell = document.createElement('div');
        numberCell.className = 'number-cell';
        letterCell.className = 'letter-cell';
        numberCell.textContent = i + 1;
        numbersHeader2.appendChild(numberCell);
      }

      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          const cell = document.createElement('div');
          cell.setAttribute('coord', [i, j]);
          cell.classList.add('c-cell');
          computerBoard.appendChild(cell);
          if (gameBoard[i][j] === 'water') {
            cell.className = 'p-cell water';
            computerBoard.appendChild(cell);
          } else {
            cell.className = 'p-cell water';
          }
        }
      }
    }

    return gameBoard;
  };
  return { name, board, showBoard };
};

export default Player;
