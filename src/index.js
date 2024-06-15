import {carrier} from './Models/Ships.mjs';
import GameBoard from './Models/GameBoard.mjs';



const oceanBoard = GameBoard();
oceanBoard.createBoard();
console.log(oceanBoard.placeShip(carrier, [9,0], 'horizontal'));
console.table(oceanBoard.board);

