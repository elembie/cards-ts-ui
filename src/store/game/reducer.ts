import * as types from './types'
import { mapApiState, mapApiPlayer } from '../../games/mapping'
import { IPlayer, IState, PlayerTypes } from '../../games/types'

const initialState: types.GameState = {
    isCreatingGame: false,
    isFetchingGame: false,
    isFetchedGame: false,
    isJoiningGame: false,
    isLeavingGame: false,
    hasLeftGame: false,
    isConnectingSocket: false,
    isSocketOpen: false,
    isMessageError: false,
    isSendingMessage: false,
    player: {} as IPlayer,
    opponents: {},
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

const mapPlayersFromState = (gameState: IState) => {
    return gameState.players.reduce((players, player) => ({
        ...players,
        [player.id]: player
    }), {} as {[key:string]: IPlayer})
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
                state: action.game.state,
                player: action.game.player,
                players: mapPlayersFromState(action.game.state)
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
                isSocketOpen: true,
                isConnectingSocket: false,
            }

        case types.GAME_META_UPDATE:
            return {
                ...state,
                meta: action.game
            }

        case types.GAME_STATE_UPDATE:
            return {
                ...state,
                state: mapApiState(state.meta.gameType, action.state),
                players: mapPlayersFromState(action.state),
            }

        case types.GAME_PLAYER_UPDATE:
            return {
                ...state,
                player: mapApiPlayer(state.meta.gameType, action.player)
            }

        case types.GAME_FETCHING_PLAYER:
            return {
                ...state,
                opponents: {
                    ...state.opponents,
                    [action.playerId]: {
                        ...state.opponents[action.playerId],
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
                opponents: {
                    ...state.opponents,
                    [action.opponent.id]: {
                        ...state.opponents[action.opponent.id],
                        ...action.opponent,                        
                    }
                }
            }

        default:
            return state

    }

}