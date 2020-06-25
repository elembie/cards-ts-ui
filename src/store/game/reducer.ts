import * as types from './types'

const initialState: types.GameState = {
    isCreatingGame: false,
    isFetchingGame: false,
    isJoiningGame: false,
    isLeavingGame: false,
    hasLeftGame: false,
    isConnectingSocket: false,
    players: [],
    game: {
        isFetched: false,
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
                isCreatingGame: false,
                game: {
                    isFetched: true,
                    meta: action.game,
                },
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
                game: {
                    ...action.game,
                    isFetched: true,
                }
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
                game: {
                    isFetched: true,
                    meta: action.game,
                },
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
               game: {
                   isFetched: false,
                   meta: {} as any,
               }
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
                game: {
                    ...state.game,
                    meta: action.game,
                }
            }

        default:
            return state

    }

}