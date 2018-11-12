import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { IBoardTile } from '../../GameLevel';
import LevelFinished from './LevelFinished';

describe('The level when its previewing', () => {
  let board: IBoardTile[] = [];
  let updateLevelSpy: any;
  const boardBase =
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

  const getComponent = () => shallow((<LevelFinished board={board} updateLevel={updateLevelSpy} />));
  const getSnapshot = () => <LevelFinished board={board} updateLevel={jest.fn()} />;

  beforeEach(() => {
    updateLevelSpy = jest.fn();
    board = boardBase.map(character => {
      return {
        character,
      };
    });
  });

  it('it renders as wiggling tiles', () => {
    const levelFinished = renderer
      .create(getSnapshot())
      .toJSON();
    expect(levelFinished).toMatchSnapshot();
  });

  it('turns wiggling tiles into exploding ones', () => {
    const component = getComponent();
    jest.runTimersToTime(6000);

    expect(component.find('.game-board__tile--exploding-up').length).toEqual(12);
    expect(component.find('.game-board__tile--exploding-down').length).toEqual(12);
  });

  it('dispatches a game update after 9000ms', () => {
    getComponent();
    jest.runTimersToTime(9000);
    expect(updateLevelSpy).toHaveBeenCalled();
  });

});
