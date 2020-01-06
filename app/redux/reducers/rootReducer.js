import {combineReducers} from 'redux';
import gameGroup from './gameGroup.reducer.js';
import match from './match.reducer.js';
import selectedGame from './selectedGame.reducer.js';
import gameState from './gameState.reducer.js';

const rootReducer = combineReducers({
  gameGroup,
  match,
  selectedGame,
  gameState,
});

export default rootReducer;
