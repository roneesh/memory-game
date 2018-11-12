import * as React from 'react';
import './gameHeader.css';

interface IGameHeaderProps {
  level: number;
  onNewGameClick: () => void;
}

class Game extends React.Component<IGameHeaderProps, {}> {
  public render() {
    return (
      <div className="game-header">
        <h1 className="game-header__heading">Memory</h1>
        <div className="game-header__information">
          <div>
            <button onClick={this.props.onNewGameClick}>
              Reset Game
            </button>
          </div>
          <p>Level: {this.props.level}</p>
        </div>
      </div>
    );
  }
}

export default Game;
