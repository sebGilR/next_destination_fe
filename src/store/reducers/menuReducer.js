import { TOGGLE_MENU } from '../actions';

const menuReducer = (state = false, action) => {
  if (action.type === TOGGLE_MENU) {
    return !state;
  }

  return state;
};

export default menuReducer;
