import GameBoard from '../src/Models/GameBoard.mjs';
import {carrierPlayer, battleshipPlayer,destroyerPlayer,submarinePlayer,patrolBoatPlayer,} from '../src/Models/Ships.mjs';

const oceanBoard = GameBoard();
const mockBoard = GameBoard();

oceanBoard.createBoard();
mockBoard.createBoard();

mockBoard.placeShip(carrierPlayer, 0, 1, 'horizontal');
mockBoard.placeShip(battleshipPlayer, 5, 6, 'vertical');
mockBoard.placeShip(destroyerPlayer, 0, 7, 'vertical');
mockBoard.placeShip(submarinePlayer, 2, 3, 'horizontal');
mockBoard.placeShip(patrolBoatPlayer, 6, 4, 'vertical');

describe('Testing GameBoard Factory', () => {
  test('GameBoard factory should exist', () => {
    expect(GameBoard).toBeDefined();
  });

  test('The board should exist', () => {
    expect(GameBoard().board).toBeDefined();
  });
  test('You shouldn\'t be able to place an carrier at horizontal coordinates 0, 10', () => {
    expect(oceanBoard.placeShip(carrierPlayer, 0, 10, 'horizontal')).toBe(false);
  });

  test('You shouldn\'t be able to place an battleship at horizontal coordinates -1, 8', () => {
    expect(oceanBoard.placeShip(submarinePlayer, -1, 8, 'horizontal')).toBe(false);
  });

  test('If there is a destroyer placed horizontally at coordinates 7, 0, a submarine can be placed vertically at coordinates 3,0', () => {
    oceanBoard.placeShip(destroyerPlayer, 7, 0, 'horizontal');
    expect(oceanBoard.placeShip(submarinePlayer, 3, 0, 'vertical')).toBe(true);
  });
  test('If there is a patrol boat placed horizontally at coordinates 1, 2, a battleship cannot be placed vertically at coordinates 1,1', () => {
    oceanBoard.placeShip(patrolBoatPlayer, 1, 2, 'horizontal');
    expect(oceanBoard.placeShip(battleshipPlayer, 1, 1, 'vertical')).toBe(false);
  });

  test('Check if an attack was missed', () => {
    expect(mockBoard.receiveAttack(0, 0)).toBe('Missed');
  });

  test('Check if the attack was correct', () => {
    expect(mockBoard.receiveAttack(0, 1)).toBe(false);
  });
  test('Check if all the ships were sunk', () => {
    // Carrier
    mockBoard.receiveAttack(0, 1);
    mockBoard.receiveAttack(0, 2);
    mockBoard.receiveAttack(0, 3);
    mockBoard.receiveAttack(0, 4);
    mockBoard.receiveAttack(0, 5);

    // Carrier damage
    expect(carrierPlayer.damage).toBe(5);

    // Were all ships sunk?
    expect(mockBoard.allShipsSunk()).toBe(false);

    // Submarine
    mockBoard.receiveAttack(2, 3);
    mockBoard.receiveAttack(2, 4);
    mockBoard.receiveAttack(2, 5);

    // Patrol Boat
    mockBoard.receiveAttack(6, 4);
    mockBoard.receiveAttack(7, 4);

    // Battleship
    mockBoard.receiveAttack(5, 6);
    mockBoard.receiveAttack(6, 6);
    mockBoard.receiveAttack(7, 6);
    mockBoard.receiveAttack(8, 6);

    // Destroyer
    mockBoard.receiveAttack(0, 7);
    mockBoard.receiveAttack(1, 7);
    // Destroyer damage
    expect(destroyerPlayer.damage).toBe(2);
    mockBoard.receiveAttack(2, 7);

    // Were all ships sunk?
    expect(mockBoard.allShipsSunk()).toBe(true);
  });
});
