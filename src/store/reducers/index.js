import { combineReducers } from 'redux';
import userReducer from './userReducer';
import destinationsReducer from './destinationsReducer';
import favoritesReducer from './favoritesReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
  user: userReducer,
  destinations: destinationsReducer,
  favorites: favoritesReducer,
  menu: menuReducer,
});

export default rootReducer;
