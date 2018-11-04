import * as React from 'react';
import { IBoardTile } from '../../GameLevel';
import './levelReady.css';

interface ILevelReadyProps {
  board: IBoardTile[];
};

const LevelReady = (props: ILevelReadyProps) => {
  const { board } = props;

  return <div className="game-board">
    {board.map((item, index) => {
      return <div className="game-board__tile" key={index} />;
    })}
  </div>
};

export default LevelReady;
