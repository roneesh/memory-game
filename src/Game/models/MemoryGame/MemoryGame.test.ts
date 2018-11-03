import MemoryGame from './MemoryGame'

describe('The MemoryGame model', () => {
  describe('initialization', () => {
    it('initializes with a default game state', () => {
      const model = new MemoryGame();
      expect(model).toEqual({
        level: 0,
      });
    });

    it('initializes with a given game state', () => {
      const model = new MemoryGame({ level: 99 });
      expect(model).toEqual({
        level: 99,
      });
    });
  });

  describe('playing the game', () => {
    it('returns a level time of 100 at level 0 based on its level', () => {
      const model = new MemoryGame();
      expect(model.getLevelTime()).toEqual(100);
    });

    it('returns a decreasing time by 0.9s for levels from 0 to 100', () => {
      const level10 = new MemoryGame({ level: 10 });
      const level11 = new MemoryGame({ level: 11 });
      expect(level10.getLevelTime()).toEqual(91);
      expect(level11.getLevelTime()).toEqual(90.1);
    })

    it('returns a value of 10 for any level above 100', () => {
      const level101 = new MemoryGame({ level: 101 });
      const level201 = new MemoryGame({ level: 201 });
      expect(level101.getLevelTime()).toEqual(10);
      expect(level201.getLevelTime()).toEqual(10);
    });
  });

  describe('incrementing the level', () => {
    it('can increment its level', () => {
      const model = new MemoryGame();
      model.incrementLevel();
      expect(model.level).toEqual(1);
    });
  });
});