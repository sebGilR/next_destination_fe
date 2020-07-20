import menuReducer from '../store/reducers/menuReducer';
import { toggleMenu } from '../store/actions';

describe('menuReducer', () => {
  it('It returns false if menu state is true', () => {
    expect(menuReducer(true, toggleMenu())).toEqual(false);
  });

  it('It returns true if menu state is false', () => {
    expect(menuReducer(false, toggleMenu())).toEqual(true);
  });

  it('It returns the current state if the action is not defined in the reducer', () => {
    expect(menuReducer(false, { type: 'OTHER' })).toEqual(false);
  });
});
