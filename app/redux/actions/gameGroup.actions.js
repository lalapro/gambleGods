import * as actionTypes from './actionTypes';

export const setGameGroup = state => dispatch => {
    dispatch({
        type: actionTypes.SETGAMEGROUP,
        payload: state
    })
}

export const cleanGameGroup = state => dispatch => {
    dispatch({
        type: actionTypes.CLEANGAMEGROUP,
        payload: state
    })
}
