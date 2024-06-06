import GameBoard from '../src/Models/GameBoard.mjs';

describe('Testing GameBoard Factory', () => {
  test('GameBoard factory should exist', () => {
    expect(GameBoard).toBeDefined();
  });
});