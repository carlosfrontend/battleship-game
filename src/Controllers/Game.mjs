import Player from '../Models/Player.mjs';
import { battleship, carrier, destroyer, patrolBoat, submarine } from '../Models/Ships.mjs';

const Game = () => {
  const player = Player('Player 1');
  const computer = Player();
  
  player.board.createBoard();
  player.board.placeShip(carrier,0,1,'horizontal'); 
  player.board.placeShip(battleship,5,6,'vertical');
  player.board.placeShip(destroyer,0,7,'vertical');
  player.board.placeShip(submarine,2,3,'horizontal');
  player.board.placeShip(patrolBoat,6,4,'vertical');

  computer.board.createBoard();
  computer.board.placeShip(carrier,1,0,'vertical'); 
  computer.board.placeShip(battleship,4,4,'vertical');
  computer.board.placeShip(destroyer,0,5,'horizontal');
  computer.board.placeShip(submarine,7,1,'vertical');
  computer.board.placeShip(patrolBoat,6,7,'horizontal');
  return {player,computer};
};

export default Game;