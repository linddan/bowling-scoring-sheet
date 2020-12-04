<template>
    <div class="max-w-full p-8 mx-auto">
        <h1 class="text-6xl text-center text-white uppercase font-bold">Bowling</h1>
        <h2 class="text-2xl tracking-widest text-center text-white mb-8">Scoring Sheet</h2>
        <!-- Match -->
        <match />
    </div>
</template>

<script>
import Match from '@/components/Match.vue';
export default {
    components: { Match },
};
</script>
