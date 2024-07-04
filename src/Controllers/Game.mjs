import Player from '../Models/Player.mjs';
import {
  carrierPlayer,
  carrierComputer,
  battleshipPlayer,
  battleshipComputer,
  destroyerPlayer,
  destroyerComputer,
  submarinePlayer,
  submarineComputer,
  patrolBoatPlayer,
  patrolBoatComputer,
} from '../Models/Ships.mjs';
import waterIcon from '../img/water.svg';
import shipIcon from '../img/ship.svg';
import missedIcon from '../img/shot.svg';
import touchedIcon from '../img/impact.svg';

const Game = () => {
  const playerBoardDom = document.querySelector('#player-board');
  const computerBoardDom = document.querySelector('#computer-board');
  const player = Player('Player');
  const computer = Player();
  const playerBoard = player.createGameBoard();
  const computerBoard = computer.createGameBoard();
  const playerData = [];
  const computerData = [];
  const coords = [];
  let playerTurn = true;
  let computerTurn = true;
  const message = document.querySelector('.message');

  const resetDom = () => {
    playerBoardDom.innerHTML = '';
    computerBoardDom.innerHTML = '';
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        playerData.push(playerBoard[x][y]);
        computerData.push(computerBoard[x][y]);
        coords.push([x, y]);
      }
    }

    for (let i = 0; i < 100; i += 1) {
      const pCell = document.createElement('button');
      const cCell = document.createElement('button');

      if (playerData[i] === 'water') {
        pCell.classList.add('water');
        pCell.style.backgroundImage = ` url(${waterIcon})`;
      }

      if (typeof playerData[i] === 'object') {
        pCell.classList.add('water');
        pCell.style.backgroundImage = ` url(${shipIcon})`;
      }

      if (playerData[i] === 'M') {
        pCell.classList.add('water');
        pCell.style.backgroundImage = `url(${waterIcon})`;
      }

      if (computerData[i] === 'water') {
        cCell.classList.add('water');
        cCell.style.backgroundImage = `url(${waterIcon})`;
      }

      if (typeof computerData[i] === 'object') {
        cCell.classList.add('water');
        cCell.style.backgroundImage = `url(${waterIcon})`;
      }

      if (computerData[i] === 'M') {
        cCell.classList.add('water');
        cCell.style.backgroundImage = `url(${waterIcon})`;
      }

      playerBoardDom.append(pCell);
      computerBoardDom.append(cCell);
      [...playerBoardDom.children][i].setAttribute('x', coords[i][0]);
      [...playerBoardDom.children][i].setAttribute('y', coords[i][1]);
      [...computerBoardDom.children][i].setAttribute('x', coords[i][0]);
      [...computerBoardDom.children][i].setAttribute('y', coords[i][1]);
    }
  };

  // Function to generate a random number between 0 and 100 (both included)
  function getRandomNum() {
    return Math.floor(Math.random() * 100);
  }

  // Create a set to store unique positions
  const positionsSet = new Set();

  // Generate random positions until we have 100 unique ones
  while (positionsSet.size < 100) {
    const pos = getRandomNum();
    positionsSet.add(`${pos}`);
  }

  // Convert the set to a numbers array
  const positions = Array.from(positionsSet).map((num) => +num);

  player.board.placeShip(carrierPlayer, 0, 0, 'horizontal');
  player.board.placeShip(battleshipPlayer, 4, 9, 'vertical');
  player.board.placeShip(destroyerPlayer, 2, 6, 'vertical');
  player.board.placeShip(submarinePlayer, 9, 2, 'horizontal');
  player.board.placeShip(patrolBoatPlayer, 4, 3, 'vertical');

  computer.board.placeShip(carrierComputer, 1, 3, 'horizontal');
  computer.board.placeShip(battleshipComputer, 3, 9, 'vertical');
  computer.board.placeShip(destroyerComputer, 6, 6, 'vertical');
  computer.board.placeShip(submarineComputer, 5, 2, 'horizontal');
  computer.board.placeShip(patrolBoatComputer, 2, 0, 'vertical');

  const computerAttackHandler = (e) => {
    e.stopPropagation();
    if (e.target.closest('.water')) {
      const x = +e.target.getAttribute('x');
      const y = +e.target.getAttribute('y');
      player.board.receiveAttack(x, y);
      if (playerBoard[x][y] === 'M') {
        computerTurn = false;
        e.target.style.backgroundImage = '';
        e.target.style.backgroundImage = `url(${missedIcon})`;
        e.target.disabled = true;
      } else {
        [...playerBoardDom.children][positions.shift()].click();
        computerTurn = true;
        e.target.style.backgroundImage = '';
        e.target.style.backgroundImage = `url(${touchedIcon})`;
        e.target.disabled = true;
      }

      if (computerTurn) {
        playerBoardDom.addEventListener('click', computerAttackHandler);
      } else {
        playerBoardDom.removeEventListener('click', computerAttackHandler);
        // eslint-disable-next-line no-use-before-define
        computerBoardDom.addEventListener('click', playerAttackHandler);
      }
    }
    if (player.board.allShipsSunk()) {
      message.textContent = `${computer.name} Wins!`;
      console.table(playerBoard);
    }
  };

  const playerAttackHandler = (e) => {
    e.stopPropagation();
    if (e.target.closest('.water')) {
      const x = +e.target.getAttribute('x');
      const y = +e.target.getAttribute('y');
      computer.board.receiveAttack(x, y);
      if (computerBoard[x][y] === 'M') {
        playerTurn = false;
        e.target.style.backgroundImage = '';
        e.target.style.backgroundImage = ` url(${missedIcon})`;
        e.target.disabled = true;
      } else {
        playerTurn = true;
        e.target.style.backgroundImage = '';
        e.target.style.backgroundImage = ` url(${touchedIcon})`;
        e.target.disabled = true;
        if (computer.board.allShipsSunk()) {
          message.textContent = `${player.name} Wins!`;
          console.table(computerBoard);
        }
        return;
      }

      if (playerTurn) {
        computerBoardDom.addEventListener('click', playerAttackHandler);
      } else {
        computerBoardDom.removeEventListener('click', playerAttackHandler);
        playerBoardDom.addEventListener('click', computerAttackHandler);
        [...playerBoardDom.children][positions.shift()].click();
      }
    }
  };

  resetDom();
  computerBoardDom.addEventListener('click', playerAttackHandler);
};

export default Game;
