import * as types from './types'
import { Dispatch } from 'redux'
import { API, Auth } from 'aws-amplify'
import { RootState } from '../rootReducer'
import { AppActions, AppThunk } from '..'
import Constants from '../../config/constants'
import { getUser, fetchedUser, mapApiUser } from '../session/actions'

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

export const joiningGame = (): types.GameActionTypes => {
    return {
        type: types.GAME_JOINING_GAME
    }
}

export const joinedGame = (game: types.GameMeta): types.GameActionTypes => {
    return {
        type: types.GAME_JOINED_GAME,
        game,
    }
}

export const joinGame = (gameId: string): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {

        dispatch(joiningGame())

        API.post(Constants.apiName, `/games/${gameId}/players`, {
            headers: {},
            result: true,
        })
        .then(g => {
            dispatch(joinedGame(mapGameMeta(g)))
            // rely on user to determine if we're in a game or not
            API.get(Constants.apiName, '/user', {result: true})
            .then(u => dispatch(fetchedUser(mapApiUser(u))))
        })
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

export const leavingGame = (): types.GameActionTypes => {
    return {
        type: types.GAME_LEAVING_GAME,
    }
}

export const leftGame = (): types.GameActionTypes => {
    return {
        type: types.GAME_LEFT_GAME,
    }
}

export const leaveGame = (gameId: string): AppThunk=> {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {

        dispatch(leavingGame())

        API.del(Constants.apiName, `/games/${gameId}/players`, {
            result: true,
        })
        .then(r => {
            console.log('DELETE:', r)
            API.get(Constants.apiName, '/user', {result: true})
            .then(u => {
                dispatch(fetchedUser(mapApiUser(u)))
                dispatch(leftGame())
            })
        })
        .catch(e => console.log(e))
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

export const disconnectSocket = (gameId: string): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        const socket = getState().game.socket
        socket?.close(1000, gameId)
    }
}