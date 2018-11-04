import { shallow } from 'enzyme';
import * as React from 'react';
import { GameHeader, GameLevel } from './components';
import Game, { IGameState } from './Game';
import { MemoryGameRecord } from './models';

describe('The Game Wrapper', () => {
  it('is a wrapper which has an initial game in its state', () => {
    const game = shallow(<Game />);
    const state = game.instance().state as IGameState;
    expect(state.game).toBeInstanceOf(MemoryGameRecord);
  });

  it('renders a GameHeader', () => {
    const game = shallow(<Game />);
    expect(game.find(GameHeader).length).toEqual(1);
  });

  it('renders a GameLevel', () => {
    const game = shallow(<Game />);
    expect(game.find(GameLevel).length).toEqual(1);
  });

  it('can increment its game\'s level', () => {
    const game = shallow(<Game />);
    expect((game.instance().state as IGameState).game.level).toEqual(0);

    (game.instance() as Game).onLevelComplete();
    expect((game.instance().state as IGameState).game.level).toEqual(1);
  });

});