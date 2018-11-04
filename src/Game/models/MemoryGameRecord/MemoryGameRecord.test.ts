import MemoryGameRecord from './MemoryGameRecord';

describe('The MemoryGameRecord model', () => {
  describe('initialization', () => {
    it('initializes with a default game state', () => {
      const model = new MemoryGameRecord();
      expect(model).toEqual({
        level: 0,
      });
    });

    it('initializes with a given game state', () => {
      const model = new MemoryGameRecord({ level: 99 });
      expect(model).toEqual({
        level: 99,
      });
    });
  });

  describe('incrementing the level', () => {
    it('can increment its level', () => {
      const model = new MemoryGameRecord();
      model.incrementLevel();
      expect(model.level).toEqual(1);
    });
  });
});