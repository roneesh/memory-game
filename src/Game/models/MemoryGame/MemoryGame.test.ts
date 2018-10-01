import MemoryGame from './MemoryGame'

describe('A MemoryGame model', () => {
  it('initializes with a default game state', () => {
    const model = new MemoryGame();
    expect(model).toEqual({
      inProgress: true,
      score: 0,
    });
  });
});