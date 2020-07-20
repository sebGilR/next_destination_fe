import userReducer from '../store/reducers/userReducer';
import {
  createUser, logIn, logOut, removeFavorite,
} from '../store/actions';

describe('userReducer', () => {
  describe('CREATE_USER/LOG_IN', () => {
    it('Saves to state the user object passed', () => {
      const user = { id: 1 };
      expect(userReducer({}, createUser(user)))
        .toEqual({ id: 1 });

      expect(userReducer({}, logIn(user)))
        .toEqual({ id: 1 });
    });
  });

  describe('LOG_OUT', () => {
    it('Replace the user object with an empty object', () => {
      const user = { id: 1 };
      expect(userReducer(user, logOut()))
        .toEqual({});
    });
  });

  describe('REMOVE_FAVORITE', () => {
    it('returns a user object without a specified favorite', () => {
      const user = {
        id: 1,
        favorites: [{ id: 1 }, { id: 2 }],
      };
      const expected = {
        id: 1,
        favorites: [{ id: 1 }],
      };

      expect(userReducer(user, removeFavorite(2)))
        .toEqual(expected);
    });
  });
});
