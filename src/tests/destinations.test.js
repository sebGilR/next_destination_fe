import destinationsReducer from '../store/reducers/destinationsReducer';
import {
  changeDestinations, addDestination, updateDestinations, removeDestination,
} from '../store/actions';

describe('destinationsReducer', () => {
  describe('CHANGE_DESTINATIONS', () => {
    const payload = ['Dest 1', 'Dest 2'];

    it('Replaces existing destinations with the action payload', () => {
      expect(
        destinationsReducer([], changeDestinations(payload)),
      )
        .toEqual(['Dest 1', 'Dest 2']);
    });
  });

  describe('ADD_DESTINATION', () => {
    const payload = 'Dest 1';
    it('Adds a new destination to the existing destinations array', () => {
      const current = ['Prev Dest'];
      const expected = ['Prev Dest', 'Dest 1'];

      expect(
        destinationsReducer(current, addDestination(payload)),
      )
        .toEqual(expected);
    });
  });

  describe('UPDATE_DESTINATION', () => {
    it('Returns a new array replacing a specific item with a new version', () => {
      const payload = { id: 1, data: 'changed' };
      const current = [{ id: 2 }, { id: 1, data: 'unchanged' }];
      const expected = [{ id: 2 }, { id: 1, data: 'changed' }];

      expect(
        destinationsReducer(current, updateDestinations(payload)),
      )
        .toEqual(expected);
    });
  });

  describe('REMOVE_DESTINATION', () => {
    it('Receives a destination ID and removes it from the array', () => {
      const payload = 1;
      const expected = [{ id: 2 }];
      const current = [{ id: 2 }, { id: 1, data: 'changed' }];

      expect(
        destinationsReducer(current, removeDestination(payload)),
      )
        .toEqual(expected);
    });
  });

  it('Returns the current state if action is not defined in the reducer', () => {
    const current = [{ id: 2 }, { id: 1, data: 'changed' }];

    expect(destinationsReducer(current, { type: 'OTHER' }))
      .toEqual(current);
  });
});
