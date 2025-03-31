<template>
<div v-for="i in items" :key="i" :style="{'font-size': `var(--x-font-size-${i})`}">
    {{ i }}
</div>
</template>

<script lang="ts" setup>
const items = ['small', 'base', 'large', 'huge'];
</script>