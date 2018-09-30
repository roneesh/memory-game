import * as React from 'react';
import { GameHeader } from './components';

interface IGameState {
  finished: boolean;
  score: number;
}

class Game extends React.Component<{}, IGameState> {
  public state = {
    finished: false,
    score: 0,
  }

  public render() {
    const { score, finished } = this.state;
    return (
      <div>
        <GameHeader score={score} finished={finished} />
      </div>
    );
  }
}

export default Game;
