import { Game } from '@/types/scoring';
import { reactive, ComputedRef, computed } from 'vue';
import { MatchStoreState, GameState } from '@/types/scoring.ts';
import { createNewGame, isStrike } from '@/utils/game';

// TODO: Cleanup. Especially match/game-states.

const state: MatchStoreState = reactive({
    games: [],
    matchState: GameState.NotStarted,
});

interface UseMatch {
    games: ComputedRef<Game[]>;
    addGame: (playerName: string) => void;
    updateRolls: (gameId: string, rollIndex: number, rollScore: number) => void;
    startMatch: () => void;
    endMatch: () => void;
    endGame: (gameId: string) => void;
    resetMatch: () => void;
    isMatchFinished: ComputedRef<boolean>;
    isMatchNotStarted: ComputedRef<boolean>;
    isMatchPlaying: ComputedRef<boolean>;
    isGameFinished: (gameId: string) => boolean;
}

export default (): UseMatch => {
    // Mutations
    const setGames = (payload: Game[]) => {
        state.games = payload;
    };
    const setMatchState = (payload: GameState) => {
        state.matchState = payload;
    };

    // Actions
    const startMatch = () => setMatchState(GameState.Playing);
    const endMatch = () => setMatchState(GameState.Finished);
    const resetMatch = () => {
        setGames([] as Game[]);
        setMatchState(GameState.NotStarted);
    };

    const endGame = (gameId: string) => {
        const game = state.games.find((game) => game.id === gameId);
        const restGames = state.games.filter((game) => game.id !== gameId);
        if (game) {
            game.gameState = GameState.Finished;
            setGames([game, ...restGames]);
        }
    };
    const addGame = (playerName: string) => {
        setGames([...state.games, createNewGame(playerName)] as Game[]);
        startMatch();
    };

    const updateRolls = (gameId: string, rollScore: number) => {
        //TODO: Don't mutate

        const game = state.games.find((game) => game.id === gameId);
        const restGames = state.games.filter((game) => game.id !== gameId);
        if (game) {
            // Update roll score
            game.rolls.push(rollScore);
            setGames([game, ...restGames]);
            console.log('updated rolls:', game.rolls);
        }
    };

    // Getters
    const isMatchFinished = computed(
        () =>
            state.matchState === GameState.Playing &&
            state.games.every((game) => game.gameState === GameState.Finished)
    );
    const isMatchNotStarted = computed(() => state.matchState === GameState.NotStarted);
    const isMatchPlaying = computed(() => state.matchState === GameState.Playing);
    const isGameFinished = (gameId: string): boolean => {
        const game = state.games.find((game) => game.id === gameId);
        if (!game) return false;
        return game.gameState === GameState.Finished;
    };

    return {
        games: computed(() => state.games),
        addGame,
        updateRolls,
        startMatch,
        endMatch,
        endGame,
        resetMatch,
        isMatchFinished,
        isMatchNotStarted,
        isMatchPlaying,
        isGameFinished,
    };
};
