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


export interface Player {
    id: string,
    name: string,
    isFetched: boolean,
    isFetching: boolean,
}

export interface GameState {
    isCreatingGame: boolean,
    isFetchingGame: boolean,
    isFetchedGame: boolean,
    isJoiningGame: boolean,
    isLeavingGame: boolean,
    hasLeftGame: boolean,
    isConnectingSocket: boolean,
    isSendingMessage: boolean,
    isMessageError: boolean,
    isSocketOpen: boolean,
    socket?: WebSocket,
    meta: GameMeta,
    players: {[key: string]: Player},
}

export interface GameMessage {
    gameId: string,
    type: string,
    data: object,
    game: GameTypes
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

export const GAME_FETCHING_GAME = 'GAME_FETCHING_GAME'
export interface FetchingGame {
    type: typeof GAME_FETCHING_GAME,
}

export const GAME_FETCHED_GAME = 'GAME_FETCHED_GAME'
export interface FetchedGame {
    type: typeof GAME_FETCHED_GAME,
    game: { meta: GameMeta },
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

export const GAME_LEAVING_GAME = 'GAME_LEAVING_GAME'
export interface LeavingGame {
    type: typeof GAME_LEAVING_GAME,
}

export const GAME_LEFT_GAME = 'GAME_LEFT_GAME'
export interface LeftGame {
    type: typeof GAME_LEFT_GAME,
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

export const GAME_META_UPDATE = 'GAME_META_UPDATE'
export interface MetaUpdate {
    type: typeof GAME_META_UPDATE,
    game: GameMeta,
}

export const GAME_FETCHING_PLAYER = 'GAME_FETCHING_PLAYER'
export interface FetchingPlayer {
    type: typeof GAME_FETCHING_PLAYER,
    playerId: string,
}

export const GAME_FETCHED_PLAYER = 'GAME_FETCHED_PLAYER'
export interface FetchedPlayer {
    type: typeof GAME_FETCHED_PLAYER,
    player: Player,
}

export const SOCKET_SENDING_MESSAGE = 'SOCKET_SENDING_MESSAGE'
export interface SocketSendMessage {
    type: typeof SOCKET_SENDING_MESSAGE,
}

export const SOCKET_SENT_MESSAGE = 'SOCKET_SENT_MESSAGE'
export interface SocketMessageSent {
    type: typeof SOCKET_SENT_MESSAGE,
}

export const SOCKET_MESSAGE_ERROR = 'SOCKET_MESSAGE_ERROR'
export interface SocketMessageError {
    type: typeof SOCKET_MESSAGE_ERROR,
    error: string,
}

export type GameActionTypes = CreatingGame
    | CreatedGame
    | FetchingGame
    | FetchedGame
    | JoiningGame
    | JoinedGame
    | LeavingGame
    | LeftGame
    | ConnectingSocket
    | ConnectedSocket
    | MetaUpdate
    | FetchingPlayer
    | FetchedPlayer
    | SocketSendMessage
    | SocketMessageSent
    | SocketMessageError