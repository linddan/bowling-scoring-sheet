<template>
    <div class="flex flex-col h-32 w-32 bg-white border-r border-b shadow-sm">
        <!-- Turn -->
        <div class="py-1 text-center font-bold bg-indigo-100">{{ turn }}</div>
        <!-- Rolls -->
        <div class="flex items-center flex-row border-b">
            <div class="flex-grow h-8 w-8 text-center border-r">{{ rollResultSymbols[0] }}</div>
            <div class="flex-grow h-8 w-8 text-center border-r">{{ rollResultSymbols[1] }}</div>
            <div v-if="roll3" class="flex-grow h-8 w-8 text-center">
                {{ rollResultSymbols[3] }}
            </div>
        </div>
        <!-- Total -->
        <div v-if="isFrameStarted" class="flex items-center h-full w-full">
            <div v-if="shouldShowTotal" class="text-center w-full text-4xl font-bold">
                {{ total }}
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onUpdated } from 'vue';
import { getRollResultSymbols, hasRolled, isStrike } from '@/utils/game';
export default {
    emits: ['gameover'],
    props: {
        turn: Number,
        roll1: Number,
        roll2: Number,
        roll3: Number,
        total: Number,
    },
    setup(props, context) {
        onUpdated(() => {
            // TODO: Ugly solution, that the Frame component determines when game is over.
            // Would be better to determine this in the store, when updating rolls.
            if (props.turn === 10) {
                const gameOver =
                    (hasRolled(props.roll1, props.roll2, props.roll3) &&
                        isStrike(props.roll1) &&
                        isStrike(props.roll2)) ||
                    hasRolled(props.roll1, props.roll2);
                if (gameOver) {
                    context.emit('gameover');
                }
            }
        });
        const rollResultSymbols = computed(() =>
            getRollResultSymbols(props.roll1, props.roll2, props.roll3)
        );

        const shouldShowTotal = computed(() => hasRolled(props.roll1, props.roll2));
        const isFrameStarted = computed(() => hasRolled(props.roll1));

        return { rollResultSymbols, shouldShowTotal, isFrameStarted };
    },
};
</script>

<style></style>
