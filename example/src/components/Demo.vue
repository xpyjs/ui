<template>
  <section class="demo-section">
    <h2 v-if="title">{{ title }}</h2>
    <div class="demo-block">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();

defineOptions({
  name: "Demo"
});
</script>

<style lang="scss" scoped>
.demo-section {
  margin: 32px 0;

  h2 {
    font-size: 20px;
    margin-bottom: 16px;
    color: var(--x-color-neutral-800);
  }
}

.demo-block {
  padding: 24px;
  border: 1px solid var(--x-color-neutral-200);
  border-radius: 8px;
  background-color: var(--x-color-neutral-0);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
