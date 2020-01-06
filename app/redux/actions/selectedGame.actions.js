import * as actionTypes from './actionTypes';

export const setSelectedGame = state => dispatch => {
    dispatch({
        type: actionTypes.SETSELECTEDGAME,
        payload: state
    })
}

export const cleanSelectedGame = state => dispatch => {
    dispatch({
        type: actionTypes.CLEANSELECTEDGAME,
        payload: state
    })
}
