import * as actionTypes from './actionTypes';

export const setGameState = state => dispatch => {
  dispatch({
    type: actionTypes.SETGAMESTATE,
    payload: state,
  });
};

export const cleanGameState = state => dispatch => {
  dispatch({
    type: actionTypes.CLEANGAMESTATE,
    payload: state,
  });
};
