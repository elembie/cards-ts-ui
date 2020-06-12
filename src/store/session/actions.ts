import * as types from './types'
import { Dispatch } from 'redux'
import { API } from 'aws-amplify'
import { RootState } from '../rootReducer'
import { AppActions, AppThunk } from '..'
import { User } from './types'

export const userLoggedIn = (username: string): types.SessionActionTypes => {

    let user: types.User = {
        id: username,
        inGame: false,
        _isFetched: false,
    }

    return {
        type: types.SESSION_LOGGED_IN,
        user
    }
}

export const userLoggedOut = (): types.SessionActionTypes => {
    return {
        type: types.SESSION_LOGGED_OUT
    }
}

export const fetchingUser = (): types.SessionActionTypes => {
    return {
        type: types.SESSION_FETCHING_USER,
    }
}

export const fetchedUser = (user: User): types.SessionActionTypes => {
    return {
        type: types.SESSION_FETCHED_USER,
        user: {
            ...user,
            _isFetched: true
        }
    }
}

export const fetchedUserError = (error: any): types.SessionActionTypes => {
    return {
        type: types.SESSION_FETCHED_USER_ERROR,
        error: {
            error: error.message,
            code: error.response.status,
        }
    }
}

export const getUser = (): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {

        dispatch(fetchingUser())

        API.get('CardsHttpApi', '/user', { result: true })
            .then(result => dispatch(fetchedUser(result)))
            .catch(error => dispatch(fetchedUserError(error)))
    }
}

