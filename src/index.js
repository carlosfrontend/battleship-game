import Ship from './Models/Ship.mjs';
import GameBoard from './Models/GameBoard.mjs';

const ship1 = Ship(3);


const board1 = GameBoard();
board1.createBoard();
board1.placeShip([0,0],'y', ship1);
console.log(board1.board);

