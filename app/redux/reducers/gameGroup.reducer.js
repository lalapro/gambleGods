import * as actionTypes from '../actions/actionTypes';

let initialState = {
  games: []
}

export default gameGroup = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.SETGAMEGROUP:
          return { ...state, ...action.payload }
      case actionTypes.CLEANGAMEGROUP:
          return initialState
      default:
          return state
  }
}
