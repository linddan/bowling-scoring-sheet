<template>
    <div>
        <!-- Score input -->
        <div class="flex flex-row justify-between w-full py-4">
            <score-input v-if="!isGameFinished" :max="pinsLeft" @roll="onRoll" />
            <!-- Player -->
            <player :name="playerName" />
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
import { getPinsLeft } from '@/utils/game';
import { computed } from 'vue';

export default {
    emits: ['roll'],
    components: { Frame, ScoreInput, Player, TotalFrame },
    props: {
        id: String,
        playerName: String,
        frames: Array,
        total: Number,
        isGameFinished: Boolean,
    },
    setup(props, context) {
        const pinsLeft = computed(() => getPinsLeft(props.frames));

        const onRoll = (score) => {
            context.emit('roll', {
                score,
                gameId: props.id,
            });
        };

        return { onRoll, pinsLeft };
    },
};
</script>

<style></style>
