import GameBoard from './GameBoard.mjs';

const Player = (name = 'Computer') => {
  const board = GameBoard();
  const createGameBoard = () => board.createBoard();

  return { name, board, createGameBoard };
};

export default Player;
