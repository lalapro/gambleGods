import * as actionTypes from '../actions/actionTypes';

let initialState = {};

export default (selectedGame = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETSELECTEDGAME:
      return {...state, ...action.payload};
    case actionTypes.CLEANSELECTEDGAME:
      return initialState;
    default:
      return state;
  }
});
