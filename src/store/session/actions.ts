import * as types from './types'

export let userLoggedIn = (user: types.User): types.SessionActionTypes => {
    return {
        type: types.SESSION_LOGGED_IN,
        data: {
            user
        }
    }
}

export let userLoggedOut = (): types.SessionActionTypes => {
    return {
        type: types.SESSION_LOGGED_OUT
    }
}

