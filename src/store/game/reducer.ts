import * as types from './types'

const initialState: types.GameState = {
    isCreatingGame: false,
    isFetchingGame: false,
    isFetchedGame: false,
    isJoiningGame: false,
    isLeavingGame: false,
    hasLeftGame: false,
    isConnectingSocket: false,
    players: {},
    meta: {
        players: [],
        createdBy: '',
        gameType: types.GameTypes.Shithead,
        id: '',
        invitedPlayers: [],
        playersJoined: 0,
        private: true,
        tableSize: 0,
    }
}

export const gameReducer = (
    state = initialState,
    action: types.GameActionTypes
): types.GameState => {

    switch(action.type) {

        case types.GAME_CREATING_GAME:
            return {
                ...state,
                isCreatingGame: true,
            }

        case types.GAME_CREATED_GAME:
            return {
                ...state,
                isFetchingGame: false,
                isFetchedGame: true,
                isCreatingGame: false,
                hasLeftGame: false,
                isLeavingGame: false,
                meta: action.game,
            }

        case types.GAME_FETCHING_GAME:
            return {
                ...state,
                isFetchingGame: true,
            }

        case types.GAME_FETCHED_GAME:
            return {
                ...state,
                isFetchingGame: false,
                isFetchedGame: true,
                meta: action.game.meta,
            }

        case types.GAME_JOINING_GAME:
            return {
                ...state,
                isJoiningGame: true,
            }

        case types.GAME_JOINED_GAME:
            return {
                ...state,
                isJoiningGame: false,
                hasLeftGame: false,
                isLeavingGame: false,
                isFetchedGame: true,
                meta: action.game,
            }

        case types.GAME_LEAVING_GAME:
            return {
                ...state,
                isLeavingGame: true,
            }

        case types.GAME_LEFT_GAME: 
           return {
                ...initialState,
                hasLeftGame: true,
                isFetchedGame: false,
           }
        
        case types.GAME_SOCKET_CONNECTING:
            return {
                ...state,
                isConnectingSocket: true,
            }

        case types.GAME_SOCKET_CONNECTED:
            return {
                ...state,
                socket: action.socket,
            }

        case types.GAME_META_UPDATE:
            return {
                ...state,
                meta: action.game
            }

        case types.GAME_FETCHING_PLAYER:
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.playerId]: {
                        isFetching: true,
                        isFetched: false,
                        id: '',
                        name: '',
                    }
                }
            }

        case types.GAME_FETCHED_PLAYER:
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.player.id]: {
                        ...action.player,                        
                    }
                }
            }

        default:
            return state

    }

}