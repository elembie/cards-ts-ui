import * as types from './types'

const initialState: types.GameState = {
    isCreatingGame: false,
    isConnectingSocket: false,
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
                    meta: action.game,
                },
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

        default:
            return state

    }

}