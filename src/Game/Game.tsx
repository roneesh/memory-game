import * as React from 'react';

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
    return (
      <p>Foo</p>
    );
  }
}

export default Game;
