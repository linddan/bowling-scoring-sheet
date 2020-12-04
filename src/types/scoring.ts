export enum GameState {
    Finished = 'FINISHED',
    NotStarted = 'NOT_STARTED',
    Playing = 'PLAYING',
}

export interface MatchStoreState {
    games: Game[];
    matchState: GameState;
}

export interface Game {
    id: string;
    rolls: number[];
    player: string;
    total: number;
    gameState: GameState;
}
