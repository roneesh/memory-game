import * as React from 'react';
import { IBoardTile } from '../../GameLevel';

interface ILevelReadyProps {
  board: IBoardTile[];
};

const LevelReady = (props: ILevelReadyProps) => {
  const { board } = props;

  return <div className="game-board">
    {board.map((item, index) => {
      return <div className="game-board__tile game-board__tile--static" key={index}>
        <div className="game-board__tile__card__face game-board__tile__card">
          <div className="game-board__tile__card__face game-board__tile__card__face--front" />
        </div>
      </div>;
    })}
  </div>
};

export default LevelReady;
