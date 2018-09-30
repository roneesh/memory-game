import { shallow } from 'enzyme';
import * as React from 'react';
import Game from './Game';

describe('The Game Wrapper', () => {
  it('is a wrapper which has an initial game state', () => {
    const game = shallow(<Game />);
    expect(game.instance().state).toEqual({
      finished: false,
      score: 0,
    });
  });
});