import * as React from 'react';
import renderer from 'react-test-renderer';
import { IBoardTile } from '../../GameLevel';
import LevelPreview from './LevelPreview';

describe('The level when its previewing', () => {
  let board: IBoardTile[] = [];
  const boardBase =
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

  beforeEach(() => {
    board = boardBase.map(character => {
      return {
        character,
        visible: false,
      };
    });
  });

  it('it renders', () => {
    const levelPreview = renderer
      .create(<LevelPreview board={board} />)
      .toJSON();
    expect(levelPreview).toMatchSnapshot();
  });
});
