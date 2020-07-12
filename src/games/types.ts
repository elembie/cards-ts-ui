import { ShdState, ShdPlayer, ShdCard, ApiShdState, ApiShdCard, ApiShdPlayer } from './shd/types'

export interface ICard {
    id: string,
    rank: number,
    suit: 'c' | 'd' | 'h' | 's'
    value: number
}

export interface IPlayer {
    id: string,
    hand: ICard[]
}

export interface IState {
    players: IPlayer[],
    status: string,
}

export type StateTypes = IState | ShdState
export type PlayerTypes = IPlayer | ShdPlayer
export type CardTypes = ICard | ShdCard

export type ApiStateTypes = ApiShdState
export type ApiPlayerTypes = ApiShdPlayer
export type ApiCardTypes = ApiShdCard