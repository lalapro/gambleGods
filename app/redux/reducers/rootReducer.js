import { combineReducers } from 'redux';
import gameGroup from './gameGroup.reducer.js';
import match from './match.reducer.js';
import selectedGame from './selectedGame.reducer.js';

const rootReducer = combineReducers({
  gameGroup,
  match,
  selectedGame
});

export default rootReducer;
