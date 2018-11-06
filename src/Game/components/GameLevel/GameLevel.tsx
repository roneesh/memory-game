import { shuffle } from 'lodash';
import * as React from 'react';
import './gameLevel.css';
import { LevelPreview, LevelReady, } from './states';

interface IGameLevelProps {
  updateLevel: () => void;
};

type LevelState = "ready" | "preview" | "playing" | "finished";
export interface IBoardTile {
  character: string | HTMLElement;
  visible: boolean;
};
export interface ILevelTurns {
  count: number;
  currentTurn: number[];
}
interface IGameLevelState {
  levelState: LevelState;
  board: IBoardTile[];
  turns:  ILevelTurns;
};

class GameLevel extends React.Component<IGameLevelProps, IGameLevelState> {
  constructor(props: IGameLevelProps) {
    super(props);

    this.state = {
      board: this.generateBoard(),
      levelState: 'ready',
      turns: {
        count: 0,
        currentTurn: [],
      },
    };
  }

  public generateBoard(): IBoardTile[] {
    return shuffle(
      ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
      'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'].map(character => {
        return {
          character,
          visible: false,
        };
      })
    );
  }

  public setLevelState = (levelState: LevelState) => {
    this.setState({ levelState });
  }

  public getResetBtn() {
    const { levelState } = this.state;

    const text = levelState === 'ready' ? 'Play Level' : 'Reset';
    const nextState = levelState === 'ready' ? 'preview' : 'ready';
    return <button onClick={this.setLevelState.bind(null, nextState)}>
      {text}
    </button>;
  }

  public renderControls() {

    return <div className="game-level__controls">
      {this.getResetBtn()}
    </div>
  }

  public renderState() {
    const { levelState, board } = this.state;
    switch(levelState) {
      case 'ready':
        return <LevelReady board={board} />;
      case 'preview':
        return <LevelPreview board={board} />;
      // case 'playing':
      //   return <LevelPlaying />;
      // case 'finished':
      //   return <LevelFinished />;
      default:
        return null;
    }
  }

  public render() {
    return <div className="game-level">
      {this.renderControls()}
      {this.renderState()}
    </div>;
  }
}

export default GameLevel;
