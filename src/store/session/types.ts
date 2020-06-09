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
}

// actions
export const SESSION_LOGGED_IN = 'SESSION_LOGGED_IN'

export interface SessionLoggedIn {
    type: typeof SESSION_LOGGED_IN,
    data: {
        user: User
    }
}

export type SessionActionTypes = SessionLoggedIn