import Ship from '../src/Models/Ship.mjs';
import { carrierComputer,battleshipComputer,destroyerComputer,submarineComputer,patrolBoatComputer} from '../src/Models/Ships.mjs';

describe('Testing Ship Factory', () => {
  test('Ship factory should be defined', () => {
    expect(Ship).toBeDefined();
  });

  test('If a Destroyer with health 3 receives two hits, it must have two damages', () => {
    destroyerComputer.hit();
    destroyerComputer.hit();
    expect(destroyerComputer.damage).toBe(2);
  });

  test('If a Patrol Boat with health 2 receives 2 hits it sinks', () => {
    patrolBoatComputer.hit();
    patrolBoatComputer.hit();
    expect(patrolBoatComputer.hasSunk()).toBeTruthy();
  });

  test('If a Battleship with health 4 receives 3 hits it continues floating', () => {
    battleshipComputer.hit();
    battleshipComputer.hit();
    battleshipComputer.hit();
    expect(battleshipComputer.hasSunk()).toBeFalsy();
  });

  test('If a Battleship with health 4 receives 4 or more hits, the number of damages received must be 4 because is sunk', () => {
    battleshipComputer.hit();
    battleshipComputer.hit();
    battleshipComputer.hit();
    battleshipComputer.hit();
    battleshipComputer.hit();
    battleshipComputer.hit();
    expect(battleshipComputer.damage).toBe(4);
  });

  test('If a Carrier with health 5 is sunk should return true and if it continues to hit, it should return a message warning that it is already sunk.', () => {
    carrierComputer.hit();
    carrierComputer.hit();
    carrierComputer.hit();
    carrierComputer.hit();
    carrierComputer.hit();
    expect(carrierComputer.hit()).toBe(
      'The ship you are trying to hit has already sank.'
    );
    expect(carrierComputer.hasSunk()).toBeTruthy();
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
    submarineComputer.hit();
    submarineComputer.hit();
    expect(submarineComputer.damage).toBe(2);
  });
});
