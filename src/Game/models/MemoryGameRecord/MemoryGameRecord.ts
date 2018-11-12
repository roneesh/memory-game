class MemoryGameRecord {

  public level: number;

  constructor(game?: { level: number }) {
    this.level = game && game.level || 1;
  }

  public incrementLevel() {
    this.level = this.level + 1;
  }

}

export default MemoryGameRecord;
