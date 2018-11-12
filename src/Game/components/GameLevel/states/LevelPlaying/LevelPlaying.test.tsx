import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';
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
    jest.useFakeTimers();
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
    expect(instance.state.boardCopy[0].status).toEqual('selected');
  });

  it('doesnt count an already clicked tile as a second turn or new tile', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPlaying;
    const firstTile = component.find('.game-board__tile').first();
    firstTile.simulate('click');
    firstTile.simulate('click');

    expect(instance.state.turns.count).toEqual(1);
  });

  it('wont click a third tile while waiting', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPlaying;
    component.find('.game-board__tile').at(0).simulate('click');
    component.find('.game-board__tile').at(1).simulate('click');
    component.find('.game-board__tile').at(2).simulate('click');

    expect(instance.state.turns.count).toEqual(2);
  });

  it('wont process a click on a found pair', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPlaying;
    component.find('.game-board__tile').at(0).simulate('click');
    component.find('.game-board__tile').at(1).simulate('click');
    component.find('.game-board__tile').at(0).simulate('click');

    expect(instance.state.turns.count).toEqual(2);
  });

  it('will process a pair properly until the turn resolves', () => {
    const component = getComponent();
    component.find('.game-board__tile').at(0).simulate('click');
    component.find('.game-board__tile').at(1).simulate('click');
    const instance = component.instance() as LevelPlaying;

    expect(instance.state.turns.count).toEqual(2);
    expect(instance.state.turns.selections.length).toEqual(2);
    expect(instance.state.boardCopy[0].status).toEqual('selected');
    expect(instance.state.boardCopy[1].status).toEqual('selected');
  });

  it('resolves a turn properly', async () => {
    const component = getComponent();
    component.find('.game-board__tile').at(0).simulate('click');
    component.find('.game-board__tile').at(1).simulate('click');
    await (component.instance() as LevelPlaying).resolveTurn();
    const instance = (component.instance() as LevelPlaying);

    expect(instance.state.turns.count).toEqual(2);
    expect(instance.state.turns.selections.length).toEqual(0);
    expect(instance.state.boardCopy[0].status).toEqual('found');
    expect(instance.state.boardCopy[1].status).toEqual('found');
  });

  it('calls setLevelState when every tile has been found', async () => {
    const component = getComponent();
    const boardCopy = cloneDeep((component.instance() as LevelPlaying).state.boardCopy);
    const completedBoard = boardCopy.map(tile => {
      return {
        character: tile.character,
        status: 'found',
      };
    });
    component.setState({
      boardCopy: completedBoard,
    });

    await (component.instance() as LevelPlaying).resolveTurn().then(() => {
      expect(setLevelStateSpy).toHaveBeenCalledWith('finished');
    });
  });
});
