<template>
    <div class="my-8">
        <!-- Player -->
        <player :name="playerName" />
        <!-- Total -->
        <div class="text-xl text-white">Total: {{ total }}</div>
        <!-- Score input -->
        <div class="flex flex-row w-full py-4">
            <score-input v-if="!isGameFinished" :max="pinsLeft" @roll="onRoll" />
        </div>
        <!-- Frames -->
        <div class="flex flex-wrap">
            <frame
                v-for="(_, index) in 10"
                :turn="index + 1"
                :roll1="frames[index]?.roll1"
                :roll2="frames[index]?.roll2"
                :roll3="frames[index]?.roll3"
                :total="frames[index]?.total"
                :key="`${id}-${index}`"
            />
            <total-frame :total="total" />
        </div>
    </div>
</template>

<script>
import Frame from './Frame.vue';
import ScoreInput from './ScoreInput.vue';
import Player from './Player.vue';
import TotalFrame from './TotalFrame.vue';

export default {
    emits: ['roll', 'gameover'],
    components: { Frame, ScoreInput, Player, TotalFrame },
    props: {
        id: String,
        playerName: String,
        frames: Array,
        total: Number,
        isGameFinished: Boolean,
    },
    setup(props, context) {
        // const pinsLeft = computed(() => calculatePinsLeft(frames.value));

        const onRoll = (score) => {
            context.emit('roll', {
                score,
                gameId: props.id,
            });
            // console.log('ROLL', { score, gameId: props.id });
        };

        const onGameOver = () => {
            context.emit('gameover', props.id);
        };

        return { onRoll, pinsLeft: 10, onGameOver };
    },
};
</script>

<style></style>
