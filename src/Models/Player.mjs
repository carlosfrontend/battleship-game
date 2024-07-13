import GameBoard from './GameBoard.mjs';
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
  patrolBoatComputer
} from './Ships.mjs';

const Player = (name = 'Computer') => {
  const board = GameBoard();
  const createGameBoard = () => board.createBoard();
  let ships = {
    carrier: carrierComputer,
    battleship: battleshipComputer,
    destroyer: destroyerComputer,
    submarine: submarineComputer,
    patrolBoat: patrolBoatComputer

  };

 
  if(name !== 'Computer'){
    ships = {
      carrier: carrierPlayer,
      battleship: battleshipPlayer,
      destroyer: destroyerPlayer,
      submarine: submarinePlayer,
      patrolBoat: patrolBoatPlayer
    };
  }
   
  
  return { name, board, ships, createGameBoard };
};

export default Player;
