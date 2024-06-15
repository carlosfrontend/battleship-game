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
  
  const isValid = (pos, ship, orientation) => {
    if (orientation === 'horizontal' && pos[0] < 0 || pos[0] > size - 1 || pos[1] < 0 || pos[1] > ship.health) {
      return false;
    }
    return true;
  };
  const placeShip = (ship, coord, orientation) => {
    let msg = 'Error!';
    // console.log(isValid(coord,ship,orientation));
    const x = coord[0];
    const y = coord[1];

    if (orientation === 'horizontal' && isValid(coord,ship,orientation)) {
      board[x][y] = ship;
      for (let i = 1; i < ship.health; i += 1) {
        board[x][y + i] = ship;
      }
    } else {
      return msg;
    }

    msg = 'Ship placed!';
    return msg;
  };

  return {
    createBoard,
    placeShip,
    get board() {
      return board;
    },
  };
};

export default GameBoard;
