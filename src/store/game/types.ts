export enum GameTypes {
    Shithead = 'SHD',
    ChaseTheQueen = 'CTB'
}

export interface CreateGame {
    isPrivate: boolean,
    gameType: GameTypes,
    tableSize: number,
}


export interface GameState {
    isCreatingGame: boolean
}

export const GAME_CREATING_GAME = 'GAME_CREATING_GAME'
export interface CreatingGame {
    type: typeof GAME_CREATING_GAME
}

export type GameActionTypes = CreatingGame