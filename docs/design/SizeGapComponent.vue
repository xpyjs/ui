<template>
<div style="border-radius: 6px; background-color: var(--x-bg-color-hover); padding: 10px">
    <div v-for="i in items" :key="i" class="row" :style="{'--gap': `var(--x-gap-${i})`}">
        <span style="width: 60px; text-align: right; line-height: 80px;">{{ i }}</span>
        <div class="gap-item" v-for="i in 3" />
    </div>
</div>
</template>

<script lang="ts" setup>
const items = ['small', 'medium', 'large'];
</script>

<style scoped>
.row {
    display: flex; margin-bottom: 10px;
    height: 80px;
}

.row:last-child {
    margin-bottom: 0;
}

.gap-item {
    flex: 1;
    background-color: var(--x-bg-color-disabled);
    border-radius: 4px;
    margin-left: var(--gap);

}
</style>