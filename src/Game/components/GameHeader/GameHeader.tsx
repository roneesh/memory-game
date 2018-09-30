import * as React from 'react';

interface IGameHeaderProps {
  finished: boolean;
  score: number;
}

class Game extends React.Component<IGameHeaderProps, {}> {
  public render() {
    const { score, finished } = this.props;
    return (
      <div>
        <h1>Memory</h1>
        <p>score: {score}</p>
        <p>{finished ? 'Game over!' : 'Game in progress!'}</p>
      </div>
    );
  }
}

export default Game;
