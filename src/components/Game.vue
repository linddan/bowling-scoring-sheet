<template>
    <div class="my-8">
        <!-- Player -->
        <player :name="playerName" />
        <!-- Total -->
        <div class="text-xl text-white">Total: {{ game.sum }}</div>
        <!-- Score input -->
        <div class="flex flex-row w-full py-4">
            <score-input v-if="!isGameFinished" :max="pinsLeft" @roll="onRoll" />
        </div>
        <!-- Frames -->
        <div class="flex flex-wrap">
            <frame
                v-for="(frame, index) in game.frames"
                :turn="index + 1"
                :roll1="frame.roll1"
                :roll2="frame.roll2"
                :roll3="frame.roll3"
                :total="frame.total"
                :key="`${id}-${index}`"
            />
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import Frame from './Frame.vue';
import ScoreInput from './ScoreInput.vue';
import { calculateSum } from '@/utils/game';
import Player from './Player.vue';

export default {
    emits: ['roll', 'gameover'],
    components: { Frame, ScoreInput, Player },
    props: {
        id: String,
        playerName: String,
        rolls: Array,
        isGameFinished: Boolean,
    },
    setup(props, context) {
        const game = computed(() => calculateSum(props.rolls));
        // const pinsLeft = computed(() => calculatePinsLeft(frames.value));

        const onRoll = (score) => {
            context.emit('roll', {
                score,
                gameId: props.id,
            });
        };

        const onGameOver = () => {
            context.emit('gameover', props.id);
        };

        return { onRoll, pinsLeft: 10, game, onGameOver };
    },
};
</script>

<style></style>
