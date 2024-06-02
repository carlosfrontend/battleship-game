import Ship from '../src/Models/Ship';


describe('Testing Ship Factory', () => {
  test('Ship factory should be defined', () =>{
    expect(Ship).toBeDefined();
  });
    
  test('If the length 3 ship receives two hits, it must have two hits', () => {
    const ship1 = Ship(3);
    ship1.giveAHit();    
    ship1.giveAHit(); 
    expect(ship1.getNumberOfHints()).toBe(2);
  });

  test('If a ship of length 2 receives 2 hits it sinks', () =>{
    const ship2 = Ship(2);
    ship2.giveAHit();
    ship2.giveAHit();
    expect(ship2.isSunk()).toBeTruthy();
  });

  test('If a ship of length 4 receives 3 hits it continues floating', () =>{
    const ship2 = Ship(4);
    ship2.giveAHit();
    ship2.giveAHit();
    ship2.giveAHit();
    expect(ship2.isSunk()).toBeFalsy();
  });
  
});