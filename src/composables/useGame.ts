import { reactive, ComputedRef, computed } from 'vue';
import { Game, GameState, GameStoreState } from '@/types/scoring.ts';
import { createNewGame } from '@/utils/game';

interface UseGame {
    game: ComputedRef<Game>;
    createGame: (game: Game) => void;
    endGame: () => void;
    addRoll: (score: number) => void;
    isGameFinished: ComputedRef<boolean>;
    isGameStarted: ComputedRef<boolean>;
}

const state: GameStoreState = reactive({
    games: [],
});

const getGameById = (id: string): Game | undefined => state.games.find((game) => game.id === id);

export default (): UseGame => {
    // Mutations
    const setGames = (games: Game[]) => (state.games = games);

    // Actions
    const addGame = (game: Game) => setGames([...state.games, game]);
    const resetGames = () => setGames([]);
    const updateGame = (updatedGame: Game) => {
        const otherGames = state.games.filter((game) => game.id !== updatedGame.id);
        setGames([...state.games, game]);
    };
    const endGame = (gameId: string) => {
        const game = getGameById(gameId);
        if (game) {
            game.gameState = GameState.Finished;
            setGames([...state.games, game]);
        }
    };
    const addRoll = (gameId: string, score: number) => {
        const game = getGameById(gameId);
        if (game) {
            game.rolls = [...game.rolls, score];
            setGames([...state.rolls, score]);
        }
    };

    // Getters
    const isGameFinished = computed(() => state.gameState === GameState.Finished);
    const isGameStarted = computed(() => state.gameState === GameState.Playing);
    const game = computed(() => ({
        id: state.id,
        rolls: state.rolls,
        player: state.player,
        total: state.total,
        gameState: state.gameState,
    }));

    return {
        game,
        isGameFinished,
        isGameStarted,
        createGame,
        addGame,
        resetGames,
        endGame,
        addRoll,
    };
};
