import { ShdState, ShdPlayer, ShdCard, ApiShdState, ApiShdCard, ApiShdPlayer, ShdStatues } from './shd/types'
import { GameTypes } from '../store/game/types'

export interface ICard {
    id: string,
    rank: number,
    suit: 'C' | 'D' | 'H' | 'S'
    value: number
    rotation: number,
    xOffset: number,
    yOffset: number,
}

export interface IPlayer {
    id: string,
    isActive: boolean,
    hand: ICard[] | number
}

export interface IState {
    gameType: GameTypes,
    players: IPlayer[],
    status: string,
    stack: number,
    table: ICard[],
}

export type StateTypes = IState | ShdState
export type PlayerTypes = IPlayer | ShdPlayer
export type CardTypes = ICard | ShdCard
export type Statuses = ShdStatues

export type ApiStateTypes = ApiShdState
export type ApiPlayerTypes = ApiShdPlayer
export type ApiCardTypes = ApiShdCard