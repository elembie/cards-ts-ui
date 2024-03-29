import { ICard, IPlayer, IState } from "../types";
import { GameTypes } from "../../store/game/types";

export interface ShdCard extends ICard {
    isSpecial: boolean,
    isHidden: boolean,
    order: number,
    playedBy: string,
    rotation: number,
    xOffset: number,
    yOffset: number,
}

export interface ApiShdCard extends ICard {
    is_special: boolean,
    is_hidden: boolean,
    order: number,
    played_by: string,
    sh_count: number,
    rotation: number,
    x_offset: number,
    y_offset: number,
}

export interface ShdPlayer extends IPlayer {
    canBurn: boolean,
    canPlay: boolean,
    hand: ShdCard[] | number,
    table: ShdCard[],
    hidden: ShdCard[],
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
    table: ApiShdCard[],
    hidden: ApiShdCard[],
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
    table: ApiShdCard[]
    total_players: number
}

export enum ShdStatues {
    INIT = 'INIT',
    PREP = 'PREP',
    PLAYING = 'PLAYING'
}

export enum ShdActions {
    DEAL = 'DEAL',
    SWAP = 'SWAP',
    READY = 'READY',
    PLAY = 'PLAY',
    BURN = 'BURN',
    PICKUP = 'PICKUP',
}

export const isShdState = (anyState: IState ): anyState is ShdState => {
    return (anyState as ShdState).gameType === GameTypes.Shithead
}

export const isShdPlayer = (anyPlayer: IPlayer): anyPlayer is ShdPlayer => {
    return (anyPlayer as ShdPlayer).isSh !== null && (anyPlayer as ShdPlayer).isSh !== undefined
}
