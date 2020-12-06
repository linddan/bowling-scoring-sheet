<template>
    <div class="flex flex-row">
        <button
            class="p-1 mr-1 w-8 h-8 text-sm bg-yellow-400 hover:bg-yellow-100 text-black text-center focus:outline-none"
            v-for="(_, index) in maxAdjusted"
            :key="index"
            @click="onClick(index)"
        >
            {{ index }}
        </button>
    </div>
</template>

<script>
import { computed } from 'vue';
export default {
    emits: ['roll'],
    props: {
        max: Number,
    },
    setup(props, context) {
        const onClick = (score) => context.emit('roll', score);
        const maxAdjusted = computed(() => (props.max === 10 ? 11 : props.max));
        return { onClick, maxAdjusted };
    },
};
</script>
