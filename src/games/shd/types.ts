import { ICard, IPlayer, IState } from "../types";

export interface IShdCard extends ICard {
    isSpecial: boolean,
    playedBy: string,
}

export interface IApiShdCard extends ICard {
    is_special: boolean,
    played_by: string,
}

export interface IShdPlayer extends IPlayer {
    canBurn: boolean,
    canPlay: boolean,
    hand: IShdCard[],
    isActive: boolean,
    isDealer: true,
    isOut: boolean,
    isReady: boolean,
    isSh: boolean,
    order: number,
    shCount: number,
}

export interface IApiShdPlayer extends IPlayer {
    can_burn: boolean,
    can_play: boolean,
    hand: IShdCard[],
    is_active: boolean,
    is_dealer: true,
    is_out: boolean,
    is_ready: boolean,
    is_sh: boolean,
    order: number,
    sh_count: number,
}

export interface IShdState extends IState {
    currentValue: number,
    dead: number,
    players: IShdPlayer[]
    stack: number,
    table: IShdCard[]
    totalPlayers: number
}

export interface IApiShdState extends IState {
    current_value: number,
    dead: number,
    players: IShdPlayer[]
    stack: number,
    table: IShdCard[]
    total_players: number
}
