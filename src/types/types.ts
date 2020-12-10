import { ComputedRef } from 'vue';

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
    frames: Frame[];
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

export interface UseMatch {
    games: ComputedRef<Game[]>;
    addGame: (playerName: string) => void;
    updateRolls: (gameId: string, rollIndex: number, rollScore: number) => void;
    startMatch: () => void;
    endMatch: () => void;
    resetMatch: () => void;
    isMatchFinished: ComputedRef<boolean>;
    isMatchNotStarted: ComputedRef<boolean>;
    isMatchPlaying: ComputedRef<boolean>;
    isGameFinished: (gameId: string) => boolean;
}
