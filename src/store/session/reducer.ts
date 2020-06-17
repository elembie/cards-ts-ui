import * as types from './types'

const initialState: types.SessionState = {
    user: {
        id: '',
        inGame: false,
        isFetched: false,
    },
    error: undefined,
    isNewUser: false,
    isLoggedIn: false,
    isFetchingUser: false,
    isFetchUserError: false,
    isCreatingUser: false,
}

export const sessionReducer = (
    state = initialState,
    action: types.SessionActionTypes 
): types.SessionState => {

    switch(action.type) {

        case types.SESSION_LOGGED_IN:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
            }

        case types.SESSION_FETCHING_USER:
            return {
                ...state,
                isFetchingUser: true
            }

        case types.SESSION_FETCHED_USER_ERROR:
            return {
                ...state,
                error: action.error,
                isFetchingUser: false,
                isFetchUserError: true,
                isLoggedIn: false,
                isNewUser: action.error.code === 404
            }

        case types.SESSION_FETCHED_USER:
            return {
                ...state,
                user: {
                    ...action.user,
                    isFetched: true
                },
                isFetchingUser: false,
                isLoggedIn: true,
            }

        case types.SSESION_CREATING_USER:
            return {
                ...state,
                isCreatingUser: true,
            }

        case types.SESSION_CREATED_USER:
            return {
                ...state,
                user: {
                    ...action.user,
                    isFetched: true,
                },
                isFetchUserError: false,
                error: undefined,
                isLoggedIn: true,
                isFetchingUser: false,
                isNewUser: false,
            }


        default:
            return state
    }
}

