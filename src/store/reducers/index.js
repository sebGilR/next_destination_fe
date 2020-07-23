import { combineReducers } from 'redux';
import userReducer from './userReducer';
import destinationsReducer from './destinationsReducer';
import menuReducer from './menuReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  destinations: destinationsReducer,
  menu: menuReducer,
  loading: loadingReducer,
});

export default rootReducer;
