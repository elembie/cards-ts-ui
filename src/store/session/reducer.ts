import * as types from './types'

const initialState: types.SessionState = {
    user: undefined,
    _isLoggedIn: false,
}

export let sessionReducer = (
    state = initialState,
    action: types.SessionActionTypes 
): types.SessionState => {

    switch(action.type) {

        case types.SESSION_LOGGED_IN:
            return {
                ...state,
                user: action.data.user,
                _isLoggedIn: true,
            }

        default:
            return state
    }
}

