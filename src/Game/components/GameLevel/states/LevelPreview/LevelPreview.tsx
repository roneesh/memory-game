import * as React from 'react';
import { IBoardTile } from '../../GameLevel';

interface ILevelPreviewProps {
  board: IBoardTile[];
};

const LevelPreview = (props: ILevelPreviewProps) => {
  const { board } = props;

  return <div className="game-board">
    {board.map((item, index) => {
      return <div className="game-board__tile" key={index}>
      <div className="game-board__tile__card__face game-board__tile__card">
        <div className="game-board__tile__card__face game-board__tile__card__face--front" />
        <div className="game-board__tile__card__face game-board__tile__card__face--back">
          {item.character}
        </div>
      </div>
    </div>;
    })}
  </div>
};

export default LevelPreview;
