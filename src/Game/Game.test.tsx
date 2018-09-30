import { shallow } from 'enzyme';
import * as React from 'react';
import { GameHeader } from './components';
import Game from './Game';

describe('The Game Wrapper', () => {
  it('is a wrapper which has an initial game state', () => {
    const game = shallow(<Game />);
    expect(game.instance().state).toEqual({
      finished: false,
      score: 0,
    });
  });

  it('renders a GameHeader', () => {
    const game = shallow(<Game />);
    expect(game.find(GameHeader).length).toEqual(1);
  });
});