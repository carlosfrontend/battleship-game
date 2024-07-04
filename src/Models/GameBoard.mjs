import {carrierPlayer, carrierComputer,battleshipPlayer,battleshipComputer,destroyerPlayer,destroyerComputer,submarinePlayer,submarineComputer,patrolBoatPlayer,patrolBoatComputer} from './Ships.mjs';

const GameBoard = () => {
  const board = [];
  const size = 10;

  const createBoard = () => {
    for (let i = 0; i < size; i += 1) {
      board[i] = [];
      for (let j = 0; j < size; j += 1) {
        board[i][j] = 'water';
      }
    }
    return board;
  };
  const isCellValid = (x, y) => x >= 0 && x < size && y >= 0 && y < size;
  const canPlaceShip = (length, row, col, dir) => {
    const dx = dir === 'horizontal' ? 1 : 0;
    const dy = dir === 'vertical' ? 1 : 0;

    for (let i = 0; i < length; i += 1) {
      const x = col + i * dx;
      const y = row + i * dy;

      if (!isCellValid(x, y)) {
        return false;
      }

      for (let adjX = x - 1; adjX <= x + 1; adjX += 1) {
        for (let adjY = y - 1; adjY <= y + 1; adjY += 1) {
          if (
            adjX >= 0 &&
            adjX < size &&
            adjY >= 0 &&
            adjY < size &&
            board[adjY][adjX] !== 'water'
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placeShip = (ship, row, col, dir) => {
    const { health } = ship;

    if (!canPlaceShip(health, row, col, dir)) {
      return false;
    }

    const dx = dir === 'horizontal' ? 1 : 0;
    const dy = dir === 'vertical' ? 1 : 0;

    for (let i = 0; i < health; i += 1) {
      const x = col + i * dx;
      const y = row + i * dy;
      board[y][x] = ship;
    }

    return true;
  };

  const receiveAttack = (row, col) => {
    const cell = board[row][col];
    if (cell !== null && typeof cell.hit === 'function') {
      return cell.hit(); // If returns true, the ship was sunk
    }

    board[row][col] = 'M';
    return 'Missed'; // Otherwise the attack failed and is marked
  };

  const allShipsSunk = () => {
    if (
      (carrierPlayer.hasSunk() &&
      battleshipPlayer.hasSunk() &&
      destroyerPlayer.hasSunk() &&
      submarinePlayer.hasSunk() &&
      patrolBoatPlayer.hasSunk()) || (carrierComputer.hasSunk &&battleshipComputer.hasSunk() && destroyerComputer.hasSunk() && submarineComputer.hasSunk() && patrolBoatComputer.hasSunk())
    ) {
      return true;
    }
  
    
    return false;
    
  };

  return {
    createBoard,
    placeShip,
    receiveAttack,
    allShipsSunk,
    get board() {
      return board;
    },
  };
};

export default GameBoard;
