// state
export interface User {
    id: string,
    email?: string,
    name?: string
    gameId?: string,
    phone?: string,
    inGame: boolean,
    _isFetched: boolean,
}

export interface SessionError {
    code: number,
    error: string,
}

export interface SessionState {
    user?: User,
    error?: SessionError,
    _isLoggedIn: boolean,
    _isFetchingUser: boolean,
    _isFetchUserError: boolean,
}

// actions
export const SESSION_LOGGED_IN = 'SESSION_LOGGED_IN'
export interface SessionLoggedIn {
    type: typeof SESSION_LOGGED_IN,
    user: User
}

export const SESSION_LOGGED_OUT = 'SESSION_LOGGED_OUT'
export interface SessionLoggedOut {
    type: typeof SESSION_LOGGED_OUT
}

export const SESSION_FETCHING_USER = 'SESSION_FETCHING_USER'
export interface SessionFetchingUser {
    type: typeof SESSION_FETCHING_USER
}

export const SESSION_FETCHED_USER = 'SESSION_FETCHED_USER'
export interface SessionFetchedUser {
    type: typeof SESSION_FETCHED_USER,
    user: User
}

export const SESSION_FETCHED_USER_ERROR = 'SESSION_FETCHED_USER_ERROR'
export interface SessionFetchedUserError {
    type: typeof SESSION_FETCHED_USER_ERROR,
    error: SessionError,
}

export type SessionActionTypes = SessionLoggedIn 
    | SessionLoggedOut
    | SessionFetchingUser
    | SessionFetchedUser
    | SessionFetchedUserError