import {
  CREATE_USER,
  LOG_IN,
  LOG_OUT,
  REMOVE_FAVORITE,
} from '../actions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
    case LOG_IN:
      return { ...action.payload };
    case LOG_OUT:
      return {};
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
