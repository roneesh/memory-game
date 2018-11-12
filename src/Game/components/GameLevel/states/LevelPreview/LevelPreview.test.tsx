import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { IBoardTile } from '../../GameLevel';
import LevelPreview from './LevelPreview';

describe('The level when its previewing', () => {
  let board: IBoardTile[] = [];
  let setLevelStateSpy: any;
  const boardBase =
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

  const getComponent = () => shallow((<LevelPreview board={board} setLevelState={setLevelStateSpy} />));
  const getSnapshot = () => <LevelPreview board={board} setLevelState={jest.fn()} />;

  beforeEach(() => {
    setLevelStateSpy = jest.fn();
    board = boardBase.map(character => {
      return {
        character,
      };
    });
  });

  it('it renders', () => {
    const levelPreview = renderer
      .create(getSnapshot())
      .toJSON();
    expect(levelPreview).toMatchSnapshot();
  });

  it('increments its previewedTileIndex until its time elapsed is 4800', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPreview;
    jest.runTimersToTime(4800);
    expect(instance.state.previewedTileIndex).toEqual(24);
  });

  it('is wiggling from 4800ms to 7800ms', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPreview;
    jest.runTimersToTime(7800);
    expect(instance.state.wiggling).toEqual(true);
    expect(component.find('.game-board__tile.game-board__tile--wiggling').length).toEqual(24);
  });

  it('dispatches the next state update after 7800ms', () => {
    getComponent();
    jest.runTimersToTime(8000);
    expect(setLevelStateSpy).toHaveBeenCalledWith('playing');
  });

  it('clears its interval on unmount', () => {
    const component = getComponent();
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const interval = (component.instance() as LevelPreview).state.previewTimer;
    component.unmount();
    expect(clearIntervalSpy).toHaveBeenCalledWith(interval);
  });
});
