import * as React from 'react';
import renderer from 'react-test-renderer';
import { IBoardTile } from '../../GameLevel';
import LevelReady from './LevelReady';

describe('The level when its ready', () => {
  let board: IBoardTile[] = [];
  const boardBase =
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

  beforeEach(() => {
    board = boardBase.map(character => {
      return {
        character,
      };
    });
  });

  it('it renders', () => {
    const levelReady = renderer
      .create(<LevelReady board={board} />)
      .toJSON();
    expect(levelReady).toMatchSnapshot();
  });
});
