import GameBoard from './Models/GameBoard.mjs';
import{battleship, carrier, destroyer, patrolBoat, submarine} from './Models/Ships.mjs';



const oceanBoard = GameBoard();
oceanBoard.createBoard();
oceanBoard.placeShip(carrier,0,1,'horizontal'); //    health 5
oceanBoard.placeShip(battleship,5,6,'vertical');//   health 4
oceanBoard.placeShip(destroyer,0,7,'vertical');//    health 3
oceanBoard.placeShip(submarine,2,3,'horizontal');//  health 3
oceanBoard.placeShip(patrolBoat,6,4,'vertical');// health 2

oceanBoard.receiveAttack(0,1);
oceanBoard.receiveAttack(0,2);
oceanBoard.receiveAttack(0,3);
oceanBoard.receiveAttack(0,4);
oceanBoard.receiveAttack(0,5);

oceanBoard.receiveAttack(2,3);
oceanBoard.receiveAttack(2,4);
oceanBoard.receiveAttack(2,5);

oceanBoard.receiveAttack(6,4);
oceanBoard.receiveAttack(7,4);

oceanBoard.receiveAttack(5,6);
oceanBoard.receiveAttack(6,6);
oceanBoard.receiveAttack(7,6);
oceanBoard.receiveAttack(8,6);

oceanBoard.receiveAttack(0,7);
oceanBoard.receiveAttack(1,7);
oceanBoard.receiveAttack(2,7);

console.log(oceanBoard.allShipsSunk());
console.table(oceanBoard.board);

