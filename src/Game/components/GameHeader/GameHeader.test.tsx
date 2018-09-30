import * as React from 'react';
import renderer from 'react-test-renderer';
import GameHeader from './GameHeader';

describe('The GameHeader', () => {
  it('it renders a title and props', () => {
    const gameHeader = renderer
      .create(<GameHeader score={0} finished={false} />)
      .toJSON();
    expect(gameHeader).toMatchSnapshot();
  });

  it('it renders when the game is over', () => {
    const gameHeader = renderer
      .create(<GameHeader score={0} finished={true} />)
      .toJSON();
    expect(gameHeader).toMatchSnapshot();
  });
});
