import * as React from 'react';
import renderer from 'react-test-renderer';
import GameHeader from './GameHeader';

describe('The GameHeader', () => {
  it('it renders', () => {
    const gameHeader = renderer
      .create(<GameHeader level={99} onNewGameClick={jest.fn()} />)
      .toJSON();
    expect(gameHeader).toMatchSnapshot();
  });
});
