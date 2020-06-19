export enum GameTypes {
    Shithead = 'SHD',
    ChaseTheQueen = 'CTB'
}

export interface CreateGame {
    isPrivate: boolean,
    gameType: GameTypes,
    tableSize: number,
}

export interface ApiGameMeta {
    id: string,
    created_by: string,
    game_type: GameTypes,
    invited_players: string[],
    players: string[],
    players_joined: number,
    private: boolean,
    table_size: number,
}

export interface GameMeta {
    id: string,
    createdBy: string,
    gameType: GameTypes,
    invitedPlayers: string[],
    players: string[],
    playersJoined: number,
    private: boolean,
    tableSize: number,
}

export interface Game {
    meta: GameMeta,
}

export interface GameState {
    isCreatingGame: boolean,
    isJoiningGame: boolean,
    isConnectingSocket: boolean,
    socket?: WebSocket,
    game?: Game,
}

export const GAME_CREATING_GAME = 'GAME_CREATING_GAME'
export interface CreatingGame {
    type: typeof GAME_CREATING_GAME
}

export const GAME_CREATED_GAME = 'GAME_CREATED_GAME'
export interface CreatedGame {
    type: typeof GAME_CREATED_GAME,
    game: GameMeta,
}

export const GAME_JOINING_GAME = 'GAME_JOINING_GAME'
export interface JoiningGame {
    type: typeof GAME_JOINING_GAME
}

export const GAME_JOINED_GAME = 'GAME_JOINED_GAME'
export interface JoinedGame {
    type: typeof GAME_JOINED_GAME,
    game: GameMeta,
}

export const GAME_SOCKET_CONNECTING = 'GAME_SOCKET_CONNECTING'
export interface ConnectingSocket {
    type: typeof GAME_SOCKET_CONNECTING,
}

export const GAME_SOCKET_CONNECTED = 'GAME_SOCKET_CONNECTED'
export interface ConnectedSocket {
    type: typeof GAME_SOCKET_CONNECTED,
    socket: WebSocket,
}

export type GameActionTypes = CreatingGame
    | CreatedGame
    | JoiningGame
    | JoinedGame
    | ConnectingSocket
    | ConnectedSocket