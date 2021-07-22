import { combineReducers } from 'redux';
import cards from './cards';
import auth from './auth';
import colors from './colors';

const rootReducer = combineReducers({
  cards,
  auth,
  colors,
});

export default rootReducer;
