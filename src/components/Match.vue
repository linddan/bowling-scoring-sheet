<template>
    <div class="flex items-center flex-col">
        <div class="flex mb-8">
            <!-- Add game -->
            <form class="h-8" @submit.prevent="addNewGame(newPlayerName)">
                <input
                    class="p-2 h-full text-gray-500 placeholder-gray-300 focus:outline-none"
                    v-model="newPlayerName"
                    type="text"
                    placeholder="Enter your name"
                    data-cy="nameInput"
                />
                <button
                    class="p-2 h-full rounded-r-sm bg-green-500 hover:bg-green-400 text-sm text-white font-bold uppercase focus:outline-none"
                >
                    Add Game
                </button>
            </form>
            <!-- Reset match -->
            <button
                class="ml-5 p-2 rounded-sm bg-red-500 hover:bg-red-400 text-sm text-white font-bold  uppercase focus:outline-none"
                @click="resetMatch()"
                v-if="isMatchPlaying"
            >
                Reset Match
            </button>
        </div>
        <!-- Match result -->
        <div class="text-white text-4xl" v-if="isMatchFinished">Match finished!</div>
        <!-- Game -->
        <game
            v-for="game in games"
            :id="game.id"
            :playerName="game.player"
            :rolls="game.rolls"
            :key="game.id"
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
