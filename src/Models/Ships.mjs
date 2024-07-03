import Ship from './Ship.mjs';

const carrierPlayer = Ship('Carrier', 5);
const battleshipPlayer = Ship('Battleship', 4);
const destroyerPlayer = Ship('Destroyer', 3);
const submarinePlayer = Ship('Submarine', 3);
const patrolBoatPlayer = Ship('Patrol Boat', 2);

const carrierComputer = Ship('Carrier', 5);
const battleshipComputer = Ship('Battleship', 4);
const destroyerComputer = Ship('Destroyer', 3);
const submarineComputer = Ship('Submarine', 3);
const patrolBoatComputer = Ship('Patrol Boat', 2);

export {carrierPlayer, carrierComputer,battleshipPlayer,battleshipComputer,destroyerPlayer,destroyerComputer,submarinePlayer,submarineComputer,patrolBoatPlayer,patrolBoatComputer};