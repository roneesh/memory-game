import * as React from 'react';
import { GameHeader, GameLevel } from './components';
import './game.css';
import { MemoryGameRecord } from './models';

export interface IGameState {
  game: MemoryGameRecord;
}

class Game extends React.Component<{}, IGameState> {
  public state = {
    game: new MemoryGameRecord(),
  };

  public onLevelComplete = () => {
    const { game } = this.state;
    const currentLevel = game.level;
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
        <GameLevel level={game.level} updateLevel={this.onLevelComplete} />
      </div>
    );
  }
}

export default Game;
