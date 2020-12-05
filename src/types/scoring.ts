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

export interface Frame {
    roll1: number | null;
    roll2: number | null;
    roll3: number | null;
    total: number;
}
