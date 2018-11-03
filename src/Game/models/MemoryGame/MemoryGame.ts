class MemoryGame {

  public level: number;

  constructor(game?: { level: number }) {
    this.level = game ? game.level : 0;
  }

  public getLevelTime(): number {
    const calculatedTime = (-0.9 * this.level) + 100;
    return calculatedTime > 10 ? calculatedTime : 10;
  }

  public incrementLevel() {
    this.level = this.level + 1;
  }

}

export default MemoryGame;
