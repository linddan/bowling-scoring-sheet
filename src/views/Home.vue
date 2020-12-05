<template>
    <div class="max-w-full p-8 mx-auto"></div>
</template>

<script>
import useMatch from '@/composables/useMatch';
export default {
    components: {},
    setup() {
        const { addGame } = useMatch();
        addGame('Something');
    },
};
</script>
