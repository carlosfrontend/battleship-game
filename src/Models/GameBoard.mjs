const GameBoard = () => {
  const board = [];
  const rows = 10;
  const columns = 10;
  const createBoard = () => {
    for(let i = 0; i < rows; i+=1){
      board.push([]);
      for(let j = 0; j < columns; j+=1){
        board[i].push({});
      }
    }
  };
  const placeShip = (coord, axis, ship ) => {
    const [x, y] = [...coord];
    if(axis === 'y'){
      for(let i = 0; i < ship.health; i+=1){
        board[i][y] = ship;
      }
    }else if(axis === 'x'){
     
      for(let i = 0; i < ship.health; i+=1){
        board[x][i] = ship;
      }
    }
  };
  return {createBoard, placeShip, get board(){return board;}};
};

export default GameBoard;