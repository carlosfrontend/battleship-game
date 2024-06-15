import Ship from '../src/Models/Ship.mjs';
import {
  battleship,
  carrier,
  destroyer,
  patrolBoat,
  submarine,
} from '../src/Models/Ships.mjs';

describe('Testing Ship Factory', () => {
  test('Ship factory should be defined', () => {
    expect(Ship).toBeDefined();
  });

  test('If a Destroyer with health 3 receives two hits, it must have two damages', () => {
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.damage).toBe(2);
  });

  test('If a Patrol Boat with health 2 receives 2 hits it sinks', () => {
    patrolBoat.hit();
    patrolBoat.hit();
    expect(patrolBoat.hasSunk()).toBeTruthy();
  });

  test('If a Battleship with health 4 receives 3 hits it continues floating', () => {
    battleship.hit();
    battleship.hit();
    battleship.hit();
    expect(battleship.hasSunk()).toBeFalsy();
  });

  test('If a Battleship with health 4 receives 4 or more hits, the number of damages received must be 4 because is sunk', () => {
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    expect(battleship.damage).toBe(4);
  });

  test('If a Carrier with health 5 is sunk should return true and if it continues to hit, it should return a message warning that it is already sunk.', () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.hit()).toBe(
      'The ship you are trying to hit has already sank.'
    );
    expect(carrier.hasSunk()).toBeTruthy();
  });

  test('If a ship doesn\'t sink it should return false', () => {
    const ship6 = Ship('Submarine', 3);
    ship6.hit();
    ship6.hit();
    expect(ship6.hasSunk()).toBeFalsy();
  });
  test('If a ship with health 4 receives two hits, its health must be equal to 2', () => {
    const ship7 = Ship('Battleship', 4);
    ship7.hit();
    ship7.hit();
    expect(ship7.health).toBe(2);
  });
  test('If a submarine with health 2 receives 2 hits it should have a damage of 2', () => {
    submarine.hit();
    submarine.hit();
    expect(submarine.damage).toBe(2);
  });
});
