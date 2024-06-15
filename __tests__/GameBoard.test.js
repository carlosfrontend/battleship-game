import GameBoard from '../src/Models/GameBoard.mjs';
import {carrier} from '../src/Models/Ships.mjs';

const oceanBoard = GameBoard();
oceanBoard.createBoard();

describe('Testing GameBoard Factory', () => {
  test('GameBoard factory should exist', () => {
    expect(GameBoard).toBeDefined();
  });
    
  test('The board should exist', () => {
    expect(GameBoard().board).toBeDefined();
  });
      
  test('If you place a Carrier at horizontal coordinates [9,1] the board must have a Carrier at coordinates [9,1],[9,2],[9,3],[9,4] and [9, 5]', () => {
    oceanBoard.placeShip(carrier, [9,1], 'horizontal');
    expect(oceanBoard.board[9][1]).toEqual(carrier);
    expect(oceanBoard.board[9][2]).toEqual(carrier);
    expect(oceanBoard.board[9][3]).toEqual(carrier);
    expect(oceanBoard.board[9][4]).toEqual(carrier);
    expect(oceanBoard.board[9][5]).toEqual(carrier);
  });
  test('If you place a Carrier at horizontal coordinates [10,1] should return an error message', () => {
    oceanBoard.placeShip(carrier, [10,1], 'horizontal');
    expect(oceanBoard.placeShip(carrier, [10,1], 'horizontal')).toBe('Error!');
  });
});