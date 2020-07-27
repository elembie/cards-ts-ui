import { ShdState, ShdPlayer, ShdCard, ApiShdState, ApiShdCard, ApiShdPlayer } from './shd/types'
import { GameTypes } from '../store/game/types'

export interface ICard {
    id: string,
    rank: number,
    suit: 'C' | 'D' | 'H' | 'S'
    value: number
}

export interface IPlayer {
    id: string,
    hand: ICard[] | number
}

export interface IState {
    gameType: GameTypes,
    players: IPlayer[],
    status: string,
    stack: number,
}

export type StateTypes = IState | ShdState
export type PlayerTypes = IPlayer | ShdPlayer
export type CardTypes = ICard | ShdCard

export type ApiStateTypes = ApiShdState
export type ApiPlayerTypes = ApiShdPlayer
export type ApiCardTypes = ApiShdCard