import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import GameLevel from './GameLevel';
import { LevelFinished, LevelPlaying, LevelPreview, LevelReady, } from './states';

describe('The GameLevel', () => {

  const getComponent = () => shallow(<GameLevel level={1} updateLevel={jest.fn()} />);
  const getSnapshot = () => <GameLevel level={1} updateLevel={jest.fn()} />;

  it('it renders', () => {
    const gameHeader = renderer
      .create(getSnapshot())
      .toJSON();
    expect(gameHeader).toMatchSnapshot();
  });

  it('generates a board', () => {
    const component = getComponent();
    const board = (component.instance() as GameLevel).state.board;
    expect(board.length).toEqual(24);
  });

  describe('rendering different level states', () => {
    it('renders a preview state', () => {
      const component = getComponent();
      component.find('button').simulate('click');
      expect(component.find(LevelPreview).length).toEqual(1);
    });

    it('can reset to a ready state and generate a new board', () => {
      const component = getComponent();
      const firstBoard = (component.instance() as GameLevel).state.board;
      component.find('button').simulate('click');
      component.find('button').simulate('click');

      const secondBoard = (component.instance() as GameLevel).state.board;
      expect(component.find(LevelReady).length).toEqual(1);
      expect(firstBoard).not.toEqual(secondBoard);
    });

    it('renders a playing state', () => {
      const component = getComponent();
      component.setState({ levelState: 'playing'});
      expect(component.find(LevelPlaying).length).toEqual(1);
    });

    it('renders a finished state', () => {
      const component = getComponent();
      component.setState({ levelState: 'finished'});
      expect(component.find(LevelFinished).length).toEqual(1);
    });
  });

  describe('rendering the level controls', () => {
    it('renders a button that starts the level', () => {
      const component = getComponent();
      const btn = component.find('button');
      btn.simulate('click');
      const instance = component.instance() as GameLevel;
      expect(instance.state.levelState).toEqual('preview');
    });

    it('renders a button to reset the level when playing', () => {
      const component = getComponent();
      const instance = component.instance() as GameLevel;
      instance.setLevelState('playing');
      const btn = component.find('button');
      btn.simulate('click');
      expect(instance.state.levelState).toEqual('ready');
    });

    it('doesnt render a reset btn if the level state is finished', () => {
      const component = getComponent();
      const instance = component.instance() as GameLevel;
      instance.setLevelState('finished');
      const btn = component.find('button');
      expect(btn.length).toEqual(0);
    });
  });

});
