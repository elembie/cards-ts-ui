import { ICard, IPlayer, IState } from "../types";

export interface ShdCard extends ICard {
    isSpecial: boolean,
    playedBy: string,
}

export interface ApiShdCard extends ICard {
    is_special: boolean,
    played_by: string,
}

export interface ShdPlayer extends IPlayer {
    canBurn: boolean,
    canPlay: boolean,
    hand: ShdCard[] | number,
    table: ShdCard[] | number,
    hidden: number,
    isActive: boolean,
    isDealer: true,
    isOut: boolean,
    isReady: boolean,
    isSh: boolean,
    order: number,
    shCount: number,
}

export interface ApiShdPlayer extends IPlayer {
    can_burn: boolean,
    can_play: boolean,
    hand: ApiShdCard[] | number,
    table: ApiShdCard[] | number,
    hidden: number,
    is_active: boolean,
    is_dealer: true,
    is_out: boolean,
    is_ready: boolean,
    is_sh: boolean,
    order: number,
    sh_count: number,
}

export interface ShdState extends IState {
    currentValue: number,
    dead: number,
    players: ShdPlayer[]
    stack: number,
    table: ShdCard[]
    totalPlayers: number
}

export interface ApiShdState extends IState {
    current_value: number,
    dead: number,
    players: ApiShdPlayer[]
    stack: number,
    table: ShdCard[]
    total_players: number
}
