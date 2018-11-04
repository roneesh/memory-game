import * as React from 'react';
import { GameHeader, GameLevel } from './components';
import './game.css';
import { MemoryGameRecord } from './models';

export interface IGameState {
  game: MemoryGameRecord;
}

class Game extends React.Component<{}, IGameState> {
  public state = {
    game: new MemoryGameRecord(), // really is a game record
  };

  public onLevelComplete() {
    const currentLevel = this.state.game.level;
    this.setState({
      game: new MemoryGameRecord({ level: currentLevel + 1 }),
    });
  }

  public newGame = () => this.setState({ game: new MemoryGameRecord() });

  public render() {
    const { game } = this.state;
    return (
      <div className="game" >
        <GameHeader level={game.level} onNewGameClick={this.newGame}/>
        <GameLevel updateLevel={this.onLevelComplete} />
      </div>
    );
  }
}

export default Game;
