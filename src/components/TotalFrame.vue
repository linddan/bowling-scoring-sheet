<template>
    <div class="flex flex-col h-24 w-24 bg-white border-yellow-400 border-r border-b shadow-sm">
        <!-- Header -->
        <div class="text-center font-bold bg-yellow-400">Total</div>
        <!-- Total -->
        <div class="flex items-center h-full w-full">
            <div class="text-center w-full text-4xl font-bold">
                {{ total }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        total: Number,
    },
};
</script>

<style></style>
