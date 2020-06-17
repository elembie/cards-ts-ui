import * as types from './types'
import { Dispatch } from 'redux'
import { API, Auth } from 'aws-amplify'
import { RootState } from '../rootReducer'
import { AppActions, AppThunk } from '..'
import Constants from '../../config/constants'

const mapGameMeta = (game: types.ApiGameMeta): types.GameMeta => {
    return {
        id: game.id,
        createdBy: game.created_by,
        gameType: game.game_type,
        invitedPlayers: game.invited_players,
        players: game.players,
        playersJoined: game.players_joined,
        private: game.private,
        tableSize: game.table_size
    }
}

export const creatingGame = (): types.GameActionTypes => {
    return {
        type: types.GAME_CREATING_GAME
    }
}

export const createdGame = (game: types.GameMeta): types.GameActionTypes => {
    return {
        type: types.GAME_CREATED_GAME,
        game,
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
        .then(r => dispatch(createdGame(mapGameMeta(r))))
        .catch(e => console.log(e))
    }
}

export const connectingSocket = (): types.GameActionTypes => {
    return {
        type: types.GAME_SOCKET_CONNECTING,
    }
}

export const connectedSocket = (socket: WebSocket): types.GameActionTypes => {
    return {
        type: types.GAME_SOCKET_CONNECTED,
        socket,
    }
}

export const connectSocket = (): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        
        dispatch(connectingSocket())

        try {

            const token = (await Auth.currentSession()).getIdToken().getJwtToken()
            const socket = new WebSocket(`wss://jepc6bx2m7.execute-api.ap-southeast-2.amazonaws.com/dev?token=${token}`)
            dispatch(connectedSocket(socket))

        } catch (e) {
            console.log(e)
        }

    }
}