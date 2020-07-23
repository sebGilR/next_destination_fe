import loadingReducer from '../store/reducers/loadingReducer';
import { startLoading, endLoading } from '../store/actions';

describe('loadingReducer', () => {
  describe('START_LOADING', () => {
    it('Returns true for the loading state', () => {
      expect(loadingReducer(false, startLoading()))
        .toEqual(true);
    });
  });

  describe('END_LOADING', () => {
    it('Returns false for the loading state', () => {
      expect(loadingReducer(true, endLoading()))
        .toEqual(false);
    });
  });

  it('Returns the current state if the action is not defined in the reducer', () => {
    expect(loadingReducer(true, { type: 'OTHER' }))
      .toEqual(true);
  });
});
