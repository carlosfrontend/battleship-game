import Player from '../Models/Player.mjs';
import {
  battleship,
  carrier,
  destroyer,
  patrolBoat,
  submarine,
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
    console.log('Updated');
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

  const playerCarrier = carrier;
  const playerBattleShip = battleship;
  const playerDestroyer = destroyer;
  const playerSubmarine = submarine;
  const playerPatrolBoat = patrolBoat;

  const computerCarrier = carrier;
  const computerBattleShip = battleship;
  const computerDestroyer = destroyer;
  const computerSubmarine = submarine;
  const computerPatrolBoat = patrolBoat;

  player.board.placeShip(playerCarrier, 0, 0, 'horizontal');
  player.board.placeShip(playerBattleShip, 4, 9, 'vertical');
  player.board.placeShip(playerDestroyer, 2, 6, 'vertical');
  player.board.placeShip(playerSubmarine, 9, 2, 'horizontal');
  player.board.placeShip(playerPatrolBoat, 4, 3, 'vertical');

  computer.board.placeShip(computerCarrier, 1, 3, 'horizontal');
  computer.board.placeShip(computerBattleShip, 3, 9, 'vertical');
  computer.board.placeShip(computerDestroyer, 6, 6, 'vertical');
  computer.board.placeShip(computerSubmarine, 5, 2, 'horizontal');
  computer.board.placeShip(computerPatrolBoat, 2, 0, 'vertical');

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
        return;
      }

      if (playerTurn) {
        computerBoardDom.addEventListener('click', playerAttackHandler);
      } else {
        computerBoardDom.removeEventListener('click', playerAttackHandler);
        playerBoardDom.addEventListener('click', computerAttackHandler);
        [...playerBoardDom.children][positions.shift()].click();
      }
      if (computer.board.allShipsSunk()) {
        message.textContent = `${player.name} Wins!`;
        console.table(computerBoard);
      }
    }
  };

  resetDom();
  computerBoardDom.addEventListener('click', playerAttackHandler);
};

export default Game;
