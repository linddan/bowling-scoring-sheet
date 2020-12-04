<template>
    <div class="text-xl text-white uppercase" data-cy="playerName">{{ name }}</div>
</template>

<script>
export default {
    props: {
        name: String,
    },
};
</script>

<style></style>
