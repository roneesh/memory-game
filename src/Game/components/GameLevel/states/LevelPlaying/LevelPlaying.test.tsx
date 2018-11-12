import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { IBoardTile } from '../../GameLevel';
import LevelPlaying from './LevelPlaying';

describe('The level when its playing', () => {
  let board: IBoardTile[] = [];
  let setLevelStateSpy: any;
  const boardBase =
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

  const getComponent = () => shallow((<LevelPlaying board={board} setLevelState={setLevelStateSpy} />));
  const getSnapshot = () => <LevelPlaying board={board} setLevelState={jest.fn()} />;

  beforeEach(() => {
    setLevelStateSpy = jest.fn();
    board = boardBase.map(character => {
      return {
        character,
      };
    });
  });

  it('renders a blank board on load', () => {
    const levelPlaying = renderer
      .create(getSnapshot())
      .toJSON();
    expect(levelPlaying).toMatchSnapshot();
  });

  it('on click of a blank tile it counts it as a turn and makes it a visible state', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPlaying;
    component.find('.game-board__tile').first().simulate('click');

    expect(instance.state.turns.count).toEqual(1);
  });

  it('doesnt count an already clicked tile as a second turn or new tile', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPlaying;
    const firstTile = component.find('.game-board__tile').first();
    firstTile.simulate('click');
    firstTile.simulate('click');

    expect(instance.state.turns.count).toEqual(1);
  });

  // it('dispatches the next statit(e update when its foundPairs lenght is 12', () => {

  // });
});
