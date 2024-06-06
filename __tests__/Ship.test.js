import Ship from '../src/Models/Ship.mjs';

describe('Testing Ship Factory', () => {
  test('Ship factory should be defined', () => {
    expect(Ship).toBeDefined();
  });

  test('If a ship with health 3 receives two hits, it must have two damages', () => {
    const ship1 = Ship(3);
    ship1.hit();
    ship1.hit();
    expect(ship1.damage).toBe(2);
  });

  test('If a ship with health 2 receives 2 hits it sinks', () => {
    const ship2 = Ship(2);
    ship2.hit();
    ship2.hit();
    expect(ship2.hasSunk()).toBeTruthy();
  });

  test('If a ship with health 4 receives 3 hits it continues floating', () => {
    const ship3 = Ship(4);
    ship3.hit();
    ship3.hit();
    ship3.hit();
    expect(ship3.hasSunk()).toBeFalsy();
  });

  test('If a ship with health 4 receives 4 or more hits, the number of damages received must be 4 because is sunk', () => {
    const ship4 = Ship(4);
    ship4.hit();
    ship4.hit();
    ship4.hit();
    ship4.hit();
    ship4.hit();
    ship4.hit();
    expect(ship4.damage).toBe(4);
  });

  test('If a ship is sunk should return true', () => {
    const ship5 = Ship(5);
    ship5.hit();
    ship5.hit();
    ship5.hit();
    ship5.hit();
    ship5.hit();
    ship5.hit();
    expect(ship5.hasSunk()).toBeTruthy();
  });

  test('If a ship doesn\'t sink it should return false', () => {
    const ship6 = Ship(3);
    ship6.hit();
    ship6.hit();
    expect(ship6.hasSunk()).toBeFalsy();
  });
  test('If a ship with health 4 receives two hits, its health must be equal to 2', () => {
    const ship7 = Ship(4);
    ship7.hit();
    ship7.hit();
    expect(ship7.health).toBe(2);
  });
});
