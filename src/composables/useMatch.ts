import { Game } from '@/types/types';
import { reactive, computed } from 'vue';
import { MatchStoreState, GameState, UseMatch } from '@/types/types';
import { calculateSum, createNewGame } from '@/utils/game';

// TODO: Cleanup. Especially match/game-states.

const state: MatchStoreState = reactive({
    games: [],
    matchState: GameState.NotStarted,
});

export default (): UseMatch => {
    //
    // Mutations
    //
    const setGames = (payload: Game[]) => {
        state.games = payload;
    };
    const setMatchState = (payload: GameState) => {
        state.matchState = payload;
    };

    //
    // Actions
    //

    // Starts the match
    const startMatch = () => setMatchState(GameState.Playing);

    // Ends the match
    const endMatch = () => setMatchState(GameState.Finished);

    // Resets the match (remove all added games)
    const resetMatch = () => {
        setGames([] as Game[]);
        setMatchState(GameState.NotStarted);
    };

    // Adds a game to the match
    const addGame = (playerName: string) => {
        setGames([...state.games, createNewGame(playerName)] as Game[]);
        startMatch();
    };

    // Add a roll to a game
    const updateRolls = (gameId: string, rollScore: number) => {
        const game = state.games.find((game) => game.id === gameId);
        if (game) {
            // Update roll score
            const updatedRolls = [...game.rolls, rollScore];
            // Recalculate
            const { frames, sum, isGameFinished } = calculateSum(updatedRolls);
            // Update the game (create a copy, no mutating)
            const newGame = {
                id: game.id,
                player: game.player,
                rolls: updatedRolls,
                total: sum,
                frames,
                gameState: isGameFinished ? GameState.Finished : game.gameState,
            };
            const restGames = state.games.filter((game) => game.id !== gameId);
            setGames([newGame, ...restGames]);
        }
    };

    //
    // Getters
    //
    const games = computed(() => state.games);
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
        games,
        isMatchFinished,
        isMatchNotStarted,
        isMatchPlaying,
        addGame,
        updateRolls,
        startMatch,
        endMatch,
        resetMatch,
        isGameFinished,
    };
};
