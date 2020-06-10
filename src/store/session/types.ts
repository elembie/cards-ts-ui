// state
export interface User {
    id: string,
    email: string,
    gameId: string,
    inGame: boolean,
    _isFetching: boolean,
}

export interface SessionState {
    user?: User,
    _isLoggedIn: boolean
}

// actions
export const SESSION_LOGGED_IN = 'SESSION_LOGGED_IN'
export interface SessionLoggedIn {
    type: typeof SESSION_LOGGED_IN,
    data: {
        user: User
    }
}

export const SESSION_LOGGED_OUT = 'SESSION_LOGGED_OUT'
export interface SessionLoggedOut {
    type: typeof SESSION_LOGGED_OUT
}

export type SessionActionTypes = SessionLoggedIn | SessionLoggedOut