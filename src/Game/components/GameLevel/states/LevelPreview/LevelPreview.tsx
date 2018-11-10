import * as React from 'react';
import { IBoardTile } from '../../GameLevel';

interface ILevelPreviewProps {
  board: IBoardTile[];
  setLevelState: (newLevelState: string) => void;
};

interface ILevelPreviewState {
  previewTimer: NodeJS.Timer;
  timeElapsed: number;
  previewedTileIndex: number;
  wiggling: boolean;
};

class LevelPreview extends React.Component<ILevelPreviewProps, ILevelPreviewState> {
  public timeIncrement = 200;

  constructor(props: ILevelPreviewProps) {
    super(props);

    this.state = {
      previewTimer: setInterval(this.previewManager, this.timeIncrement),
      previewedTileIndex: 0,
      timeElapsed: 0,
      wiggling: false,
    };
  }

  public previewManager = () => {
    const { setLevelState } = this.props;
    const { timeElapsed } = this.state;
    if (timeElapsed < 4800) {
      this.setState({
        previewedTileIndex: this.state.previewedTileIndex + 1,
        timeElapsed: timeElapsed + this.timeIncrement,
      });
      return;
    }
    if (timeElapsed < 7800) {
      this.setState({
        timeElapsed: timeElapsed + this.timeIncrement,
        wiggling: true,
      });
      return;
    }
    setLevelState('playing');
  }

  public incrementPreviewedTile = () => {
    this.setState({
      previewedTileIndex: this.state.previewedTileIndex + 1,
    })
  }

  public render() {
    const { board } = this.props;
    const { previewedTileIndex, wiggling } = this.state;
    const tileClass = `game-board__tile ${wiggling ? 'game-board__tile--wiggling' : ''}`;

    return <div className="game-board">
      {board.map((item, index) => {
        const character = index < previewedTileIndex ? item.character : null;
        return <div className={tileClass} key={index}>
          {character}
      </div>;
      })}
    </div>
  }

};

export default LevelPreview;
