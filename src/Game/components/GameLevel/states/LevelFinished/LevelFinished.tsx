import * as React from 'react';
import { IBoardTile } from '../../GameLevel';

interface ILevelFinishedProps {
  board: IBoardTile[];
  updateLevel: () => void;
};

interface ILevelFinishedState {
  finishedTimer: NodeJS.Timer;
  timeElapsed: number;
  action: 'wiggling' | 'exploding';
};

class LevelFinished extends React.Component<ILevelFinishedProps, ILevelFinishedState> {
  public timeIncrement = 1000;

  constructor(props: ILevelFinishedProps) {
    super(props);

    this.state = {
      action: 'wiggling',
      finishedTimer: setInterval(this.finishedManager, this.timeIncrement),
      timeElapsed: 0,
    };
  }

  public componentWillUnmount() {
    clearInterval(this.state.finishedTimer);
  }

  public finishedManager = () => {
    const { updateLevel } = this.props;
    const { timeElapsed } = this.state;
    if (timeElapsed < 3000) {
      this.setState({
        timeElapsed: timeElapsed + this.timeIncrement,
      });
      return;
    }
    if (timeElapsed < 6000) {
      this.setState({
        action: 'exploding',
        timeElapsed: timeElapsed + this.timeIncrement,
      });
      return;
    }
    updateLevel();
  }

  public render() {
    const { board } = this.props;
    const { action } = this.state;

    return <div className="game-board">
      {board.map((tile, index) => {
        const movementClass =
          action === 'wiggling' ? 'wiggling' : index <= 11 ? 'exploding-up' : 'exploding-down';
        const tileClass = `game-board__tile game-board__tile--${movementClass}`;

        return <div className={tileClass} key={index}>
          {tile.character}
      </div>;
      })}
    </div>
  }

};

export default LevelFinished;
