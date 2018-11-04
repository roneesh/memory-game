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
        <ul>
          <li>Level: {this.props.level}</li>
          <li>
            <button onClick={this.props.onNewGameClick}>
              New Game
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Game;
