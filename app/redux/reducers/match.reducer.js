import * as actionTypes from '../actions/actionTypes';

let initialState = {

}

export default match = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.SETMATCH:
          return { ...state, ...action.payload }
      case actionTypes.CLEANMATCH:
          return initialState
      default:
          return state
  }
}
