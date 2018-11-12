import * as React from 'react';
import { IBoardTile } from '../../GameLevel';


interface ILevelPlayingProps {
  board: IBoardTile[];
  setLevelState: (newLevelState: string) => void;
};

interface ILevelPlayingTile {
  character: string | HTMLElement;
  status: 'unfound' | 'found' | 'selected';
}
interface ILevelTurns {
  count: number;
  selections: number[];
};
interface ILevelPlayingState {
  boardCopy: ILevelPlayingTile[];
  turns: ILevelTurns;
}

class LevelPlaying extends React.Component<ILevelPlayingProps, ILevelPlayingState> {
  constructor(props: ILevelPlayingProps) {
    super(props);

    this.state = {
      boardCopy: Array.from(props.board).map(tile => {
        return {
          character: tile.character,
          status: 'unfound',
        } as ILevelPlayingTile;
      }),
      turns: {
        count: 0,
        selections: [],
      },
    };
  }

  public onTileClick = async (index: number) => {
    const { boardCopy, turns } = this.state;
    const tile = boardCopy[index];

    const maxTilesSelected = turns.selections.length === 2;
    const tileIsAlreadyClicked = tile.status === 'selected' || tile.status === 'found';
    const dontProcessClick = maxTilesSelected || tileIsAlreadyClicked;
    if (dontProcessClick) {
      return;
    }

    tile.status = 'selected';
    const newSelections = [...turns.selections, index];
    const newTurns = {
      count: this.state.turns.count + 1,
      selections: newSelections,
    };

    if (newSelections.length < 2) {
      this.setState({ turns: newTurns });
    } else {
      this.setState({ turns: newTurns }, this.resolveTurn);
    }
  }

  public resolveTurn = async () => {
    // 200ms delay before we hide tiles again
    await new Promise(resolve => setTimeout(() => {resolve()}, 200));

    const { boardCopy, turns } = this.state;

    const selections = turns.selections;
    const tileCharactersMatch =
      boardCopy[selections[0]].character === boardCopy[selections[1]].character;
    if (tileCharactersMatch) {
      boardCopy[selections[0]].status = 'found';
      boardCopy[selections[1]].status = 'found';
    } else {
      boardCopy[selections[0]].status = 'unfound';
      boardCopy[selections[1]].status = 'unfound';
    }
    const allFoundTiles = boardCopy.filter(tile => tile.status === 'found');
    if (allFoundTiles.length === 24) {
      this.props.setLevelState('finished');
    } else {
      this.setState({
        turns: {
          count: turns.count,
          selections: [],
        },
      });
    }
  }

  public render() {
    const { boardCopy, turns } = this.state;

    return <div>
      <div className="game-board">
        {boardCopy.map((tile, index) => {
          return (
            <div className="game-board__tile"
              key={index}
              onClick={this.onTileClick.bind(this, index)}
            >
              {tile.status === 'unfound' ? null : tile.character}
            </div>
          );
        })}
      </div>
      <div>
        <p>Turns: {turns.count} </p>
      </div>
    </div>
  }

};

export default LevelPlaying;
