import Ship from './Ship.mjs';

const carrier = Ship('Carrier', 5);
const battleship = Ship('Battleship', 4);
const destroyer = Ship('Destroyer', 3);
const submarine = Ship('Submarine', 3);
const patrolBoat = Ship('Patrol Boat', 2);

export {carrier,battleship,destroyer,submarine,patrolBoat};