<template>
    <div class="flex flex-col h-32 w-32 bg-white border-r border-b shadow-sm">
        <!-- Header -->
        <div class="py-1 text-center font-bold bg-indigo-100">Total</div>
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
