<template>
    <div class="background min-h-screen">
        <home />
    </div>
</template>

<script>
import Home from './views/Home.vue';
export default {
    components: { Home },
};
</script>

<style scoped>
.background {
    background: no-repeat url('./assets/background.jpg') black;
    background-position-y: -200px;
    background-position-x: right -200px;
}
</style>
