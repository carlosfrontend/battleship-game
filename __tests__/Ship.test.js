import Ship from '../src/Models/Ship.mjs';


describe('Testing Ship Factory', () => {
  test('Ship factory should be defined', () =>{
    expect(Ship).toBeDefined();
  });
    
  test('If the length 3 ship receives two hits, it must have two hits', () => {
    const ship1 = Ship(3);
    ship1.hit();    
    ship1.hit(); 
    expect(ship1.getNumberOfHits()).toBe(2);
  });

  test('If a ship of length 2 receives 2 hits it sinks', () =>{
    const ship2 = Ship(2);
    ship2.hit();
    ship2.hit();
    expect(ship2.isSunk()).toBeTruthy();
  });

  test('If a ship of length 4 receives 3 hits it continues floating', () =>{
    const ship3 = Ship(4);
    ship3.hit();
    ship3.hit();
    ship3.hit();
    expect(ship3.isSunk()).toBeFalsy();
  });

  test('If a ship of length 4 receives 4 or more hits, the number of hits received must be 4 because is sunk ', () =>{
    const ship4 = Ship(4);
    ship4.hit();
    ship4.hit();
    ship4.hit();
    ship4.hit();
    ship4.hit();
    ship4.hit();
    expect(ship4.getNumberOfHits()).toBe(4);
  });
  
});