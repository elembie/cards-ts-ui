import * as types from './types'
import { mapApiState, mapApiPlayer } from '../../games/mapping'
import { IPlayer, IState, ICard } from '../../games/types'
import { isShdState, ShdCard, ShdPlayer } from '../../games/shd/types'

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
    },
    state: {
        gameType: types.GameTypes.Shithead,
        players: [],
        status: 'none',
        stack: 0,
    },
    selectedCards: [],
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
                players: Object.keys(action.game.state).length > 0 ? mapPlayersFromState(action.game.state) : {}
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
                players: mapPlayersFromState(mapApiState(state.meta.gameType, action.state)),
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

        case types.CARD_ADD_SELECTED:
            return {
                ...state,
                selectedCards: [
                    ...state.selectedCards,
                    ...action.cardIds,
                ]
            }    
            
        case types.CARD_REMOVE_SELECTED:
            return {
                ...state,
                selectedCards: state.selectedCards.filter(id => action.cardIds.indexOf(id) < 0)
            }
            
        case types.CARD_CLEAR_SELECTED:
            return {
                ...state,
                selectedCards: [],
            } 
            
        case types.HAND_REMOVED_CARD:
            return {
                ...state,
                player:  {
                    ...state.player,
                    hand: typeof state.player.hand === 'number' 
                        ? state.player.hand 
                        : state.player.hand.filter(c => c.id !== action.cardId)
                }
            }

        // SHD actions
        case types.SHD_SWAP_TABLE:
            if (isShdState(state.state)) {
                return {
                    ...state,
                    selectedCards: [],
                    player: {
                        ...state.player,
                        hand: [
                            ...(state.player.hand as ICard[]).filter(c => c.id !== action.cards.hand),
                            (state.player as ShdPlayer).table.find(c => c.id === action.cards.table)
                        ],
                        table: [
                            ...(state.player as ShdPlayer).table.filter(c => c.id !== action.cards.table),
                            {
                                ...(state.player.hand as ICard[]).find(c => c.id === action.cards.hand),
                                order: (state.player as ShdPlayer).table.find(c => c.id === action.cards.table)?.order,
                            }
                        ]
                    } as ShdPlayer,
                }

            } else {
                return state
            }

        default:
            return state

    }

}