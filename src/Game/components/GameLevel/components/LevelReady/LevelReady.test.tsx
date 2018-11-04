import * as React from 'react';
import renderer from 'react-test-renderer';
import LevelReady from './LevelReady';

describe('The level when its ready', () => {
  it('it renders', () => {
    const board = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
      'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'].map(character => {
        return {
          character,
          visible: false,
        };
      });
    const levelReady = renderer
      .create(<LevelReady board={board} />)
      .toJSON();
    expect(levelReady).toMatchSnapshot();
  });
});
