import * as types from './types'
import { Dispatch } from 'redux'
import { API } from 'aws-amplify'
import { RootState } from '../rootReducer'
import { AppActions, AppThunk } from '..'
import Constants from '../../config/constants'

export const creatingGame = (): types.GameActionTypes => {
    return {
        type: types.GAME_CREATING_GAME
    }
}

export const createGame = (game: types.CreateGame): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {

        dispatch(creatingGame())

        API.post(Constants.apiName, '/games', {
            body: {
                game_type: game.gameType,
                private: game.isPrivate,
                table_size: game.tableSize
            },
            headers: {},
            result: true,
        })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    }
}