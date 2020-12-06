<template>
    <div class="flex flex-col h-24 w-24 bg-white border-yellow-400 border-r border-b shadow-b-md">
        <!-- Turn -->
        <div class=" text-center font-semi-bold bg-yellow-400">{{ turn }}</div>
        <!-- Rolls -->
        <div class="flex items-center flex-row border-yellow-400 border-b">
            <div class="flex-grow h-6 w-6 text-center text-sm border-yellow-400 border-r">
                {{ rollResultSymbols[0] }}
            </div>
            <div class="flex-grow h-6 w-6 text-center text-sm">
                {{ rollResultSymbols[1] }}
            </div>
            <div
                v-if="turn === 10"
                class="flex-grow h-6 w-6 border-yellow-400 border-l text-center text-sm"
            >
                {{ rollResultSymbols[2] }}
            </div>
        </div>
        <!-- Total -->
        <div class="flex items-center h-full w-full">
            <div class="text-center w-full text-2xl font-semi">
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
    setup(props) {
        const rollResultSymbols = computed(() =>
            getRollResultSymbols(props.roll1, props.roll2, props.roll3)
        );

        return { rollResultSymbols };
    },
};
</script>

<style></style>
