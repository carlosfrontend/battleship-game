import Ship from "./Models/Ship.mjs";

const ship1 = Ship(3);
ship1.hit();
ship1.hit();
ship1.hit();

console.log(ship1.getNumberOfHits());