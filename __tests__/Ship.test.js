import Ship from '../src/Models/Ship';


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
    const ship2 = Ship(4);
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship2.isSunk()).toBeFalsy();
  });
  
});