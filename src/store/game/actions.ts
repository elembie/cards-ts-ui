import * as types from './types'
import { Dispatch } from 'redux'
import { API } from 'aws-amplify'
import { RootState } from '../rootReducer'
import { AppActions, AppThunk } from '..'

export const creatingGame = (): types.GameActionTypes => {
    return {
        type: types.GAME_CREATING_GAME
    }
}

export const createGame = (game: types.CreatingGame): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(creatingGame())
    }
}