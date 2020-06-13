import * as types from './types'

const initialState: types.SessionState = {
    user: {
        id: '',
        inGame: false,
        _isFetched: false,
    },
    error: undefined,
    _isLoggedIn: false,
    _isFetchingUser: false,
    _isFetchUserError: false,
}

export let sessionReducer = (
    state = initialState,
    action: types.SessionActionTypes 
): types.SessionState => {

    switch(action.type) {

        case types.SESSION_LOGGED_IN:
            return {
                ...state,
                user: action.user,
                _isLoggedIn: true,
            }

        case types.SESSION_FETCHING_USER:
            return {
                ...state,
                _isFetchingUser: true
            }

        case types.SESSION_FETCHED_USER_ERROR:
            return {
                ...state,
                error: action.error,
                _isFetchingUser: false,
                _isFetchUserError: true,
                _isLoggedIn: false,
            }

        case types.SESSION_FETCHED_USER:
            return {
                ...state,
                user: action.user,
                _isFetchingUser: false,
                _isLoggedIn: true,
            }

        default:
            return state
    }
}

