const GameBoard = () => {
  const board = [];
  const rows = 10;
  const columns = 10;
  const getBoard = () => {
    for(let i = 0; i < rows; i+=1){
      board.push([]);
      for(let j = 0; j < columns; j+=1){
        board[i].push({});
      }
    }
    return board;
  };
  
  return {getBoard};
};

export default GameBoard;