import { combineReducers } from 'redux';
import activities from './activities';
import auth from './auth';
import colors from './colors';

const rootReducer = combineReducers({
  activities,
  auth,
  colors,
});

export default rootReducer;
