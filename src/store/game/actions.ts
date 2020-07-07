import * as types from './types'
import { Dispatch } from 'redux'
import { API, Auth } from 'aws-amplify'
import { RootState } from '../rootReducer'
import { AppActions, AppThunk } from '..'
import Constants from '../../config/constants'
import { fetchedUser, mapApiUser } from '../session/actions'

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
        .then(r => {
            // rely on user to determine if we're in a game or not
            API.get(Constants.apiName, '/user', {result: true})
            .then(u => {
                dispatch(fetchedUser(mapApiUser(u)))
                dispatch(createdGame(mapGameMeta(r)))
            })
        })
        .catch(e => console.log(e))
    }
}

export const fetchingGame = (): types.GameActionTypes => {
    return {
        type: types.GAME_FETCHING_GAME,
    }
}

export const fetchedGame = (game: types.ApiGameMeta): types.GameActionTypes => {
    return {
        type: types.GAME_FETCHED_GAME,
        game: {
            meta: mapGameMeta(game)
        }
    }
}

export const getGame = (): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {

        dispatch(fetchingGame())

        API.get(Constants.apiName, '/games', {result: true})
        .then(g => dispatch(fetchedGame(g)))
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
            // rely on user to determine if we're in a game or not
            API.get(Constants.apiName, '/user', {result: true})
            .then(u => {
                dispatch(fetchedUser(mapApiUser(u)))
                dispatch(joinedGame(mapGameMeta(g)))
            })
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

export const metaUpdate = (game: types.ApiGameMeta): types.GameActionTypes => {
    return {
        type: types.GAME_META_UPDATE,
        game: mapGameMeta(game)
    }
}

export const connectSocket = (): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        
        dispatch(connectingSocket())

        try {

            const token = (await Auth.currentSession()).getIdToken().getJwtToken()
            const socket = new WebSocket(`wss://jepc6bx2m7.execute-api.ap-southeast-2.amazonaws.com/dev?token=${token}`)

            socket.onopen = () => {
                dispatch(connectedSocket(socket))
                socket.send(JSON.stringify({game: 'SHD', type: 'start_game', data: 'test', gameId: '53bcca68-221b-4a41-b9d3-af1b8a79444c'}))
            }

            socket.onmessage = (e) => {
                console.log('Message:', e)
                const message = JSON.parse(e.data)

                console.log(message)

                switch(message.type) {
                    case 'META_UPDATE':
                        dispatch(metaUpdate(message.data))
                }
            }

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

export const fetchingPlayer = (playerId: string): types.GameActionTypes => {
    return {
        type: types.GAME_FETCHING_PLAYER,
        playerId,
    }
}

export const fetchedPlayer = (player: types.Player): types.GameActionTypes => {
    return {
        type: types.GAME_FETCHED_PLAYER,
        player,
    }
}

export const getPlayer = (playerId: string): AppThunk => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        
        dispatch(fetchingPlayer(playerId))

        API.get(Constants.apiName, `/user/${playerId}`, {result: true})
        .then(p => dispatch(fetchedPlayer({
            name: p.name,
            id: p.id,
            isFetched: true,
            isFetching: false,
        })))
        .catch(e => console.log(e))
    }
}

export const sendingMessage = (): types.GameActionTypes => {
    return {
        type: types.SOCKET_SENDING_MESSAGE,
    }
}

export const sentMessage = (): types.GameActionTypes => {
    return {
        type: types.SOCKET_SENT_MESSAGE,
    }
}

export const messageError = (error: string): types.GameActionTypes => {
    return {
        type: types.SOCKET_MESSAGE_ERROR,
        error,
    }
} 

export const sendMessage = (message: types.GameMessage) => {
    return async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {

        dispatch(sendingMessage())

        const socket = getState().game.socket

        if (socket === undefined || socket.readyState !== WebSocket.OPEN) {
            console.warn('Socket is null or not open')
            dispatch(messageError('Action failed'))
            return
        }

        socket.send(JSON.stringify(message))

        dispatch(sentMessage())

    }
}

