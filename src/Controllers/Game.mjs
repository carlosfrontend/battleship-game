import Player from '../Models/Player.mjs';

import waterIcon from '../img/water.svg';
import shipIcon from '../img/ship.svg';
import missedIcon from '../img/shot.svg';
import touchedIcon from '../img/impact.svg';
import settingsLogo from '../img/settings.svg';
import shipWheelLogo from '../img/ship-wheel.svg';
import movieRollLogo from '../img/movie-roll.svg';
import powerOffLogo from '../img/power.svg';

const Game = () => {
  const playerBoardDom = document.querySelector('#player-board');
  const computerBoardDom = document.querySelector('#computer-board');
  const player = Player('Player');
  const computer = Player();
  const playerBoard = player.createGameBoard();
  const computerBoard = computer.createGameBoard();
  let playerData = [];
  const computerData = [];
  let coords = [];
  let playerTurn = true;
  let computerTurn = true;
  const message = document.querySelector('.message');
  const computerCounter = [
    ...document.querySelectorAll('.computer-counter>.counter'),
  ];
  const playerCounter = [
    ...document.querySelectorAll('.player-counter>.counter'),
  ];
  const playerOneTitle = document.querySelector('.player-title');
  const computerTitle = document.querySelector('.computer-title');
  const userDialog = document.querySelector('#user-dialog');
  const settingsImg = document.querySelector('.settings-logo');
  const userForm = document.querySelector('#user-form');
  const playerOneName = document.querySelector('#name-one');
  const playerTwoName = document.querySelector('#name-two');
  const shipWheelImg = document.querySelector('.ship-wheel-icon');
  const movieRollImg = document.querySelector('.movie-roll-icon');
  const powerOffImg = document.querySelector('.power-off-icon');
  const placeBtn = document.querySelector('#place-normal-ships');
  const placeShipDialog = document.querySelector('#place-ship-dialog');
  const placeForm = document.querySelector('#place-form');
  const resetUserForm = document.querySelector('#reset');
  const gameMode = document.querySelector('#game-opt');

  settingsImg.src = settingsLogo;
  shipWheelImg.src = shipWheelLogo;
  movieRollImg.src = movieRollLogo;
  powerOffImg.src = powerOffLogo;
  userDialog.showModal();

  playerTwoName.disabled = true;

  gameMode.addEventListener('change', () => {
    if (gameMode.value === 'playerVsComputer') {
      playerTwoName.disabled = true;
    }
    if (gameMode.value === 'playerVsPlayer') {
      playerTwoName.disabled = false;
    }
  });

  resetUserForm.addEventListener('click', () => {
    playerOneName.value = '';
    playerTwoName.value = '';
  });

  userForm.addEventListener('submit', () => {
    if (gameMode.value === 'playerVsComputer') {
      playerOneTitle.textContent = playerOneName.value;
      computerTitle.textContent = computer.name;
      message.textContent = `${playerOneName.value} place your ships please`;
    }
  });

  placeBtn.addEventListener('click', () => {
    placeShipDialog.showModal();
  });

  /*  player.board.placeShip(player.ships.carrier, 0, 0, 'horizontal');
  player.board.placeShip(player.ships.battleship, 4, 9, 'vertical');
  player.board.placeShip(player.ships.destroyer, 2, 6, 'vertical');
  player.board.placeShip(player.ships.submarine, 9, 2, 'horizontal');
  player.board.placeShip(player.ships.patrolBoat, 4, 3, 'vertical'); */

  computer.board.placeShip(computer.ships.carrier, 1, 3, 'horizontal');
  computer.board.placeShip(computer.ships.battleship, 3, 9, 'vertical');
  computer.board.placeShip(computer.ships.destroyer, 6, 6, 'vertical');
  computer.board.placeShip(computer.ships.submarine, 5, 2, 'horizontal');
  computer.board.placeShip(computer.ships.patrolBoat, 2, 0, 'vertical');

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
        const shipData = playerBoard[x][y];
        const shipsArray = Object.values(player.ships);
        const index = shipsArray.indexOf(shipData);

        if (
          shipData.name === 'Carrier' ||
          shipData.name === 'Battleship' ||
          shipData.name === 'Destroyer' ||
          shipData.name === 'Submarine' ||
          shipData.name === 'Patrol Boat'
        ) {
          const currentCounter = [...playerCounter[index].children][
            shipData.health
          ];
          currentCounter.style.backgroundColor = 'red';
        }
        computerTurn = true;
        e.target.style.backgroundImage = '';
        e.target.style.backgroundImage = `url(${touchedIcon})`;
        e.target.disabled = true;
        setTimeout(() => {
          [...playerBoardDom.children][positions.shift()].click();
        },1000);
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
        const shipData = computerBoard[x][y];
        const shipsArray = Object.values(computer.ships);
        const index = shipsArray.indexOf(shipData);

        if (
          shipData.name === 'Carrier' ||
          shipData.name === 'Battleship' ||
          shipData.name === 'Destroyer' ||
          shipData.name === 'Submarine' ||
          shipData.name === 'Patrol Boat'
        ) {
          const currentCounter = [...computerCounter[index].children][
            shipData.damage - 1
          ];
          currentCounter.style.backgroundColor = 'red';
        }
        playerTurn = true;
        e.target.style.backgroundImage = '';
        e.target.style.backgroundImage = ` url(${touchedIcon})`;
        e.target.disabled = true;
        if (computer.board.allShipsSunk()) {
          message.textContent = `${player.name} Wins!`;
        }
        return;
      }

      if (playerTurn) {
        computerBoardDom.addEventListener('click', playerAttackHandler);
      } else {
        computerBoardDom.removeEventListener('click', playerAttackHandler);
        playerBoardDom.addEventListener('click', computerAttackHandler);
        setTimeout(() => {
          [...playerBoardDom.children][positions.shift()].click();
        },1000);
      }
    }
  };

  const updatePlayerBoardDom = () => {
    console.log('Updating player board!');
    playerData = [];
    coords = [];
    playerBoardDom.innerHTML = '';
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        playerData.push(playerBoard[x][y]);
        coords.push([x, y]);
      }
    }
    for (let i = 0; i < 100; i += 1) {
      const pCell = document.createElement('button');

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
      playerBoardDom.appendChild(pCell);
      [...playerBoardDom.children][i].setAttribute('x', coords[i][0]);
      [...playerBoardDom.children][i].setAttribute('y', coords[i][1]);
    }
  };

  resetDom();

  // Place player ships manually
  placeForm.addEventListener('submit', (e) => {
    const carrierX = document.querySelector('#carrier-x');
    const carrierY = document.querySelector('#carrier-y');
    const carrierOrientation = document.querySelector('#carrier-orientation');
    const battleshipX = document.querySelector('#battleship-x');
    const battleshipY = document.querySelector('#battleship-y');
    const battleshipOrientation = document.querySelector(
      '#battleship-orientation'
    );
    const destroyerX = document.querySelector('#destroyer-x');
    const destroyerY = document.querySelector('#destroyer-y');
    const destroyerOrientation = document.querySelector(
      '#destroyer-orientation'
    );
    const submarineX = document.querySelector('#submarine-x');
    const submarineY = document.querySelector('#submarine-y');
    const submarineOrientation = document.querySelector(
      '#submarine-orientation'
    );
    const patrolX = document.querySelector('#patrol-x');
    const patrolY = document.querySelector('#patrol-y');
    const patrolOrientation = document.querySelector('#patrol-orientation');

    if (
      player.board.placeShip(
        player.ships.carrier,
        +carrierX.value - 1,
        +carrierY.value,
        carrierOrientation.value
      ) === true &&
      player.board.placeShip(
        player.ships.battleship,
        +battleshipX.value - 1,
        +battleshipY.value,
        battleshipOrientation.value
      ) === true &&
      player.board.placeShip(
        player.ships.destroyer,
        +destroyerX.value - 1,
        +destroyerY.value,
        destroyerOrientation.value
      ) === true &&
      player.board.placeShip(
        player.ships.submarine,
        +submarineX.value - 1,
        +submarineY.value,
        submarineOrientation.value
      ) === true &&
      player.board.placeShip(
        player.ships.patrolBoat,
        +patrolX.value - 1,
        +patrolY.value,
        patrolOrientation.value
      ) === true
    ) {
      player.board.placeShip(
        player.ships.carrier,
        +carrierX.value - 1,
        +carrierY.value,
        carrierOrientation.value
      );

      player.board.placeShip(
        player.ships.battleship,
        +battleshipX.value - 1,
        +battleshipY.value,
        battleshipOrientation.value
      );

      player.board.placeShip(
        player.ships.destroyer,
        +destroyerX.value - 1,
        +destroyerY.value,
        destroyerOrientation.value
      );

      player.board.placeShip(
        player.ships.submarine,
        +submarineX.value - 1,
        +submarineY.value,
        submarineOrientation.value
      );

      player.board.placeShip(
        player.ships.patrolBoat,
        +patrolX.value - 1,
        +patrolY.value,
        patrolOrientation.value
      );

      updatePlayerBoardDom();
      console.table(playerBoard);
      computerBoardDom.addEventListener('click', playerAttackHandler);
    } else {
      e.preventDefault();
      alert('Bad positions try again !');
      carrierX.value = '';
      carrierY.value = '';
      carrierOrientation.value = 'Horizontal';
      battleshipX.value = '';
      battleshipY.value = '';
      battleshipOrientation.value = '';
      destroyerX.value = '';
      destroyerY.value = '';
      destroyerOrientation.value = '';
      submarineX.value = '';
      submarineY.value = '';
      submarineOrientation.value = '';
      patrolX.value = '';
      patrolY.value = '';
      patrolOrientation.value = '';
      for(let i = 0; i < 10; i+=1){
        for(let j = 0; j < 10; j+=1){
          playerBoard[i][j] = 'water';
        }
      }
      console.table(playerBoard);
    }
  });
};

export default Game;
