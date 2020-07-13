import { combineReducers } from 'redux';
import userReducer from './userReducer';
import destinationsReducer from './destinationsReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  destinations: destinationsReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
