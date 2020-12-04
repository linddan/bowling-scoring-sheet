<template>
    <div class="my-8">
        <!-- Player -->
        <player :name="playerName" />
        <!-- Total -->
        <div class="text-xl text-white">Total: {{ grandTotal }}</div>
        <!-- Score input -->
        <div class="flex flex-row w-full py-4">
            <score-input v-if="!isGameFinished" :max="pinsLeft" @roll="onRoll" />
        </div>
        <!-- Frames -->
        <div class="flex flex-wrap">
            <frame
                v-for="(frameRolls, index) in frames"
                :turn="index + 1"
                :roll1="frameRolls[0]"
                :roll2="frameRolls[1]"
                :roll3="frameRolls[2]"
                :total="calculateFrameSum(index)"
                :key="`${id}-${index}`"
                @gameover="onGameOver"
            />
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import Frame from './Frame.vue';
import ScoreInput from './ScoreInput.vue';
import { createFrameRolls, calculateSum, calculatePinsLeft } from '@/utils/game';
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
        const frames = computed(() => createFrameRolls(props.rolls));
        const grandTotal = computed(() => calculateSum(props.rolls));
        const pinsLeft = computed(() => calculatePinsLeft(frames.value));

        const calculateFrameSum = (index) => {
            const noOfRolls = index * 2 < 19 ? 2 : 3;
            return calculateSum(props.rolls, index * 2 + noOfRolls);
        };

        const onRoll = (score) => {
            context.emit('roll', {
                score,
                gameId: props.id,
            });
        };

        const onGameOver = () => {
            context.emit('gameover', props.id);
        };

        return { onRoll, pinsLeft, frames, grandTotal, calculateFrameSum, onGameOver };
    },
};
</script>

<style></style>
