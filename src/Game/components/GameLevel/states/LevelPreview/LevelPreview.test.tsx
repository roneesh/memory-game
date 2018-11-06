import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { IBoardTile } from '../../GameLevel';
import LevelPreview from './LevelPreview';

describe('The level when its previewing', () => {
  let board: IBoardTile[] = [];
  const boardBase =
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

  const getComponent = (props?: any) => shallow((<LevelPreview board={board} {...props} />));
  const getSnapshot = (props?: any) => <LevelPreview board={board} {...props} />;

  beforeEach(() => {
    board = boardBase.map(character => {
      return {
        character,
        visible: false,
      };
    });
  });

  it('it renders', () => {
    const levelPreview = renderer
      .create(getSnapshot())
      .toJSON();
    expect(levelPreview).toMatchSnapshot();
  });

  it('previews its tiles every 200 seconds', () => {
    const component = getComponent();
    const instance = component.instance() as LevelPreview;
    const timerSpy = spyOn(instance.state, 'previewer');
    jest.advanceTimersByTime(200);
    jest.advanceTimersByTime(200);

    expect(timerSpy).toHaveBeenCalledTimes(1);
    expect(component.text()).toEqual('A');
  });
});
