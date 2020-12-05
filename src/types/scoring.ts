export enum GameState {
    Finished = 'FINISHED',
    NotStarted = 'NOT_STARTED',
    Playing = 'PLAYING',
}

export interface MatchStoreState {
    games: Game[];
    matchState: GameState;
}

export interface GameStoreState {
    games: Game[];
}

export interface Game {
    id: string;
    rolls: number[];
    player: string;
    total: number;
    gameState: GameState;
}

export type Roll = number;

export interface Frame {
    roll1: Roll;
    roll2: Roll;
    roll3: Roll;
    total: number;
}
