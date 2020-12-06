<template>
    <div class="flex flex-col h-32 w-32 bg-white border-r border-b shadow-sm">
        <!-- Turn -->
        <div class="py-1 text-center font-bold bg-indigo-100">{{ turn }}</div>
        <!-- Rolls -->
        <div class="flex items-center flex-row border-b">
            <div class="flex-grow h-8 w-8 text-center border-r">{{ rollResultSymbols[0] }}</div>
            <div class="flex-grow h-8 w-8 text-center border-r">{{ rollResultSymbols[1] }}</div>
            <div v-if="turn === 10" class="flex-grow h-8 w-8 text-center">
                {{ rollResultSymbols[2] }}
            </div>
        </div>
        <!-- Total -->
        <div class="flex items-center h-full w-full">
            <div class="text-center w-full text-4xl font-bold">
                {{ total }}
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { getRollResultSymbols } from '@/utils/game';
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
        const rollResultSymbols = computed(() =>
            getRollResultSymbols(props.roll1, props.roll2, props.roll3)
        );

        // const shouldShowTotal = computed(() => hasRolled(props.roll1, props.roll2));
        // const isFrameStarted = computed(() => hasRolled(props.roll1));

        return { rollResultSymbols };
    },
};
</script>

<style></style>
