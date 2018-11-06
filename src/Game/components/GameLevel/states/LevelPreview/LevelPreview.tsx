import * as React from 'react';
import { IBoardTile } from '../../GameLevel';

interface ILevelPreviewProps {
  board: IBoardTile[];
};

interface ILevelPreviewState {
  previewer: NodeJS.Timer;
  previewedTileIndex: number;
};

class LevelPreview extends React.Component<ILevelPreviewProps, ILevelPreviewState> {
  constructor(props: ILevelPreviewProps) {
    super(props);

    this.state = {
      previewedTileIndex: 0,
      previewer: setInterval(this.incrementPreviewedTile, 200),
    };
  }

  public incrementPreviewedTile = () => {
    this.setState({
      previewedTileIndex: this.state.previewedTileIndex + 1,
    })
  }

  public render() {
    const { board } = this.props;
    const { previewedTileIndex } = this.state;
    return <div className="game-board">
      {board.map((item, index) => {
        return <div className="game-board__tile" key={index}>
          { index < previewedTileIndex ? item.character : null }
      </div>;
      })}
    </div>
  }

};

export default LevelPreview;
