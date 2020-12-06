<template>
    <div class="max-w-full p-0 mx-auto">
        <div class="flex flex-col">
            <header class="mb-8 py-4 flex flex-row items-center justify-center bg-yellow-300">
                <div class="p-4">
                    <h1 class="text-5xl text-center text-gray-800 uppercase font-bold">Bowling</h1>
                    <h2 class="text-3xl text-center text-gray-800">Scoring Sheet</h2>
                </div>
            </header>
            <!-- Match -->
            <match />
        </div>
    </div>
</template>

<script>
import Match from '@/components/Match.vue';
export default {
    components: { Match },
};
</script>
