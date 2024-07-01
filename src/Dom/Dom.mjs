import waterIcon from '../img/water.svg';
import shipIcon from '../img/ship.svg';

import {
  battleship,
  carrier,
  destroyer,
  patrolBoat,
  submarine,
} from '../Models/Ships.mjs';

const Dom = () => {
  const boardSize = 100;
  const size = 10;
  const playerBoardDom = document.querySelector('#player-board');
  const computerBoardDom = document.querySelector('#computer-board');
  const playerTitle = document.querySelector('.player-title');
  const computerTitle = document.querySelector('.computer-title');
  const coords = [];

  for(let i = 0; i < size; i+=1){
    for(let j = 0; j < size; j+=1){
      coords.push([i, j]);
    }
  }

  const drawBoards = () => {
    for (let i = 0; i < boardSize; i += 1) {
      const playerCell = document.createElement('button');
      const computerCell = document.createElement('button');
      playerCell.classList.add('water');
      const cellImgPlayer = document.createElement('img');
      const cellImgComputer = document.createElement('img');
      cellImgPlayer.src = waterIcon;
      cellImgComputer.src = waterIcon;
      playerCell.append(cellImgPlayer);
      computerCell.classList.add('water');
      computerCell.append(cellImgComputer);
      playerBoardDom.append(playerCell);
      computerBoardDom.append(computerCell);
    }
  };
  // Shows the players titles
  const showPlayerTitles = (player, computer) => {
    playerTitle.textContent = player;
    computerTitle.textContent = computer;
  };


  // Place the player ships
  const placePlayerShips = (player) => {
    player.board.placeShip(carrier, 0, 0, 'vertical');
    player.board.placeShip(battleship, 4, 2, 'horizontal');
    player.board.placeShip(destroyer, 7, 8, 'vertical');
    player.board.placeShip(submarine, 0, 7, 'horizontal');
    player.board.placeShip(patrolBoat, 8, 1, 'vertical');   
  };

  // Place the computer ships
  const placeComputerShips = (computer) => {
    computer.board.placeShip(carrier, 9, 5, 'horizontal');
    computer.board.placeShip(battleship, 3, 0, 'vertical');
    computer.board.placeShip(destroyer, 2, 7, 'horizontal');
    computer.board.placeShip(submarine, 4, 3, 'horizontal');
    computer.board.placeShip(patrolBoat, 0, 3, 'horizontal');
  };

  const showPlayerBoard = (playerBoard) => {
    playerBoardDom.innerHTML = '';
    
    const dataArray = [];

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        dataArray.push(playerBoard[i][j]);
      }
    }

    for (let i = 0; i < boardSize; i += 1) {
      const playerCell = document.createElement('button');
      if (dataArray[i] === 'water') {
        playerBoardDom.append(playerCell);
      } else {
        playerBoardDom.append(playerCell);
      }
    }

    for (let i = 0; i < boardSize; i += 1) {
      if (dataArray[i] === 'water') {
        const water = document.createElement('img');
        water.src = waterIcon;
        [...playerBoardDom.children][i].classList.add('water');
        [...playerBoardDom.children][i].append(water);
      } else {
        const ship = document.createElement('img');
        ship.src = shipIcon;
        [...playerBoardDom.children][i].classList.add('water');
        [...playerBoardDom.children][i].append(ship);
      }
    }
    const playerImages = document.querySelectorAll('#player-board>button>img');

    for(let i = 0; i < boardSize; i+=1){
      playerImages[i].setAttribute('x', coords[i][0]);
      playerImages[i].setAttribute('y', coords[i][1]);
    }
  };

  const showComputerBoard = (computerBoard) => {
    computerBoardDom.innerHTML = '';
    
    const dataArray = [];

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        dataArray.push(computerBoard[i][j]);
      }
    }

    for (let i = 0; i < boardSize; i += 1) {
      const computerCell = document.createElement('button');
      if (dataArray[i] === 'water') {
        computerBoardDom.append(computerCell);
      } else {
        computerBoardDom.append(computerCell);
      }
    }

    for (let i = 0; i < boardSize; i += 1) {
      if (dataArray[i] === 'water') {
        const water = document.createElement('img');
        water.src = waterIcon;
        [...computerBoardDom.children][i].classList.add('water');
        [...computerBoardDom.children][i].append(water);
      } else {
        const ship = document.createElement('img');
        ship.src = waterIcon;
        [...computerBoardDom.children][i].classList.add('water');
        [...computerBoardDom.children][i].append(ship);
      }
    }
    const computerImages = document.querySelectorAll('#computer-board>button>img');

    for(let i = 0; i < boardSize; i+=1){
      computerImages[i].setAttribute('x', coords[i][0]);
      computerImages[i].setAttribute('y', coords[i][1]);
    }
  };


  return {
    drawBoards,
    showPlayerTitles,
    placePlayerShips,
    placeComputerShips,
    showPlayerBoard,
    showComputerBoard
  };
};

export default Dom;
