import { shuffle } from 'lodash';
import * as React from 'react';
import './gameLevel.css';
import { LevelFinished, LevelPlaying, LevelPreview, LevelReady, } from './states';

interface IGameLevelProps {
  updateLevel: () => void;
  level: number;
};

type LevelState = "ready" | "preview" | "playing" | "finished";
export interface IBoardTile {
  character: string | HTMLElement;
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
        };
      })
    );
  }

  public setLevelState = (newLevelState: LevelState) => {
    if (newLevelState === 'ready') {
      this.setState({
        board: this.generateBoard(),
        levelState: newLevelState,
        turns: {
          count: 0,
          currentTurn: [],
        },
      });
    }
    this.setState({ levelState: newLevelState });
  }

  public getResetBtn() {
    const { levelState } = this.state;

    if (levelState === 'finished') {
      return null;
    }

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
    const { updateLevel } = this.props;

    switch(levelState) {
      case 'ready':
        return <LevelReady board={board} />;
      case 'preview':
        return <LevelPreview board={board} setLevelState={this.setLevelState} />;
      case 'playing':
        return <LevelPlaying board={board} setLevelState={this.setLevelState} />;
      case 'finished':
        return <LevelFinished board={board} updateLevel={updateLevel} />;
      default:
        return null;
    }
  }

  public componentDidUpdate(prevProps: IGameLevelProps) {
    if (this.props.level !== prevProps.level) {
      this.setLevelState('ready');
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
