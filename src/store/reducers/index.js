import { combineReducers } from 'redux';
import userReducer from './userReducer';
import destinationsReducer from './destinationsReducer';
import favoritesReducer from './favoritesReducer';
import menuReducer from './menuReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  destinations: destinationsReducer,
  favorites: favoritesReducer,
  menu: menuReducer,
  loading: loadingReducer,
});

export default rootReducer;
