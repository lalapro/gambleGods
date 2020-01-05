import * as actionTypes from '../actions/actionTypes';

let initialState = {};

export default (gameState = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETGAMESTATE:
      return {...state, ...action.payload};
    case actionTypes.CLEANGAMESTATE:
      return initialState;
    default:
      return state;
  }
});
