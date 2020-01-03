import * as actionTypes from './actionTypes';

export const setMatch = state => dispatch => {
    dispatch({
        type: actionTypes.SETMATCH,
        payload: state
    })
}

export const cleanMatch = state => dispatch => {
    dispatch({
        type: actionTypes.CLEANMATCH,
        payload: state
    })
}
