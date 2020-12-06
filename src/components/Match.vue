<template>
    <div class="flex items-center flex-col">
        <div class="flex mb-8">
            <!-- Add game -->
            <form autocomplete="off" @submit.prevent="addNewGame(newPlayerName)">
                <input
                    class="p-2 h-full border-2 border-gray-600 rounded-sm  text-gray-600 placeholder-gray-300 focus:outline-none"
                    v-model="newPlayerName"
                    type="text"
                    placeholder="Enter your name"
                    data-cy="nameInput"
                />
                <button
                    class="ml-2 px-4 py-2 rounded-full border-2 border-green-500 hover:shadow-md transform hover:-translate-y-0.5 text-md text-green-800 font-medium focus:outline-none"
                >
                    Add a game
                </button>
            </form>
            <!-- Reset match -->
            <button
                class="ml-2 px-4 py-2 rounded-full border-2 border-red-500 bg-red-500 hover:shadow-md transform hover:-translate-y-0.5 text-md text-white font-medium focus:outline-none"
                @click="resetMatch()"
                v-if="isMatchPlaying"
            >
                Reset match
            </button>
        </div>
        <!-- Match result -->
        <div class="text-white text-4xl" v-if="isMatchFinished">Match finished!</div>
        <!-- Game -->
        <game
            v-for="game in games"
            :key="game.id"
            :id="game.id"
            :playerName="game.player"
            :frames="game.frames"
            :total="game.total"
            :isGameFinished="isGameFinished(game.id)"
            @roll="onPlayerRoll"
            @gameover="onGameOver"
        />
    </div>
</template>

<script>
import { ref } from 'vue';
import useMatch from '../composables/useMatch';
import Game from './Game.vue';

export default {
    components: { Game },
    setup() {
        const {
            games,
            addGame,
            endGame,
            resetMatch,
            startMatch,
            updateRolls,
            isGameFinished,
            isMatchFinished,
            isMatchPlaying,
        } = useMatch();

        const newPlayerName = ref('');

        const onPlayerRoll = ({ gameId, score }) => {
            updateRolls(gameId, score);
        };
        const addNewGame = (playerName) => {
            addGame(playerName);
            newPlayerName.value = '';
        };
        const onGameOver = (gameId) => {
            endGame(gameId);
        };
        return {
            games,
            addNewGame,
            startMatch,
            resetMatch,
            onPlayerRoll,
            newPlayerName,
            isGameFinished,
            isMatchFinished,
            isMatchPlaying,
            onGameOver,
        };
    },
};
</script>

<style></style>
