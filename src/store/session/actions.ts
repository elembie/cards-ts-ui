import * as types from './types'
import { Dispatch } from 'redux'
import { API } from 'aws-amplify'
import { RootState } from '../rootReducer'
import { AppActions, AppThunk } from '..'
import { User } from './types'
import Constants from '../../config/constants'


export const mapApiUser = (user: types.ApiUser): User => {
    return {
        id: user.id,
        inGame: user.in_game,
        name: user.name,
        isFetched: true,
        email: user.email,
        gameId: user.game_id,
        phone: user.phone,
    }
}

export const userLoggedIn = (username: string): types.SessionActionTypes => {

    let user: types.User = {
        id: username,
        inGame: false,
        isFetched: false,
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
        user
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

        API.get(Constants.apiName, '/user', {})
            .then(u => dispatch(fetchedUser(mapApiUser(u))))
            .catch(error => {
                console.log(error)
                dispatch(fetchedUserError(error))
            })
    }
}

export const creatingUser = (): types.SessionActionTypes => {
    return {
        type: types.SSESION_CREATING_USER
    }
}

export const createdUser = (user: User): types.SessionActionTypes => {
    return {
        type: types.SESSION_CREATED_USER,
        user
    }
}

export const createUser = (name: string): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {

        dispatch(creatingUser())

        API.post(Constants.apiName, '/user', {
            body: {
                name
            }
        })
        .then(r => dispatch(createdUser(r)))
        .catch(e => console.log(e))
    }
}

