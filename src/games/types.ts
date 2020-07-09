import { ShdState, ShdPlayer, ShdCard, ApiShdState, ApiShdCard, ApiShdPlayer } from './shd/types'

export type StateTypes = ShdState
export type PlayerTypes = ShdPlayer
export type CardTypes = ShdCard

export type ApiStateTypes = ApiShdState
export type ApiPlayerTypes = ApiShdPlayer
export type ApiCardTypes = ApiShdCard

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

    mapApi(state: ApiStateTypes): StateTypes
}