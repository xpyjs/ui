<template>
<div class="color-row">
  <div v-for="(name, i) in textTypes" :key="name" class="color-item">
    <div class="color-name">{{ name }}</div>
    <div
      class="color-block"
      :style="{ backgroundColor: `var(--x-text-color-${name})` }"
      @click="copyColor(`--x-text-color-${name}`)"
    >
      <span
        class="var-name"
        :style="{
          color: i > 1 ? 'var(--x-text-color)' : 'var(--x-bg-color)'
        }"
      >
        --x-text-color-{{ name }}
      </span>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from '@xpyjs/x-ui';


const textTypes = [
  "primary",
  "regular",
  "secondary",
  "placeholder",
  "disabled"
];


const copyColor = async (colorVar: string) => {
  try {
    await navigator.clipboard.writeText(colorVar);

    const { toast } = useToast();
    toast({
      content: `已复制 ${colorVar}`,
      top: 'center'
    });
  } catch (err) {
    console.error("复制失败:", err);
  }
};
</script>

<style scoped lang="scss">
.color-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.color-item {
  .color-name {
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }

  .color-variants {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.color-block {
  position: relative;
  border-radius: var(--x-border-radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  cursor: pointer;
  height: 80px;

  &.color-block-transparent {
    background-image: linear-gradient(
        45deg,
        var(--x-bg-color-hover) 25%,
        #0000 25%
      ),
      linear-gradient(135deg, var(--x-bg-color-hover) 25%, #0000 25%),
      linear-gradient(45deg, #0000 75%, var(--x-bg-color-hover) 75%),
      linear-gradient(135deg, #0000 75%, var(--x-bg-color-hover) 75%);
    background-size: 20px 20px;
    background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
    background-color: transparent;
  }

  &.color-block-white {
    color: black;
  }

  &.color-block-black {
    color: white;
  }

  .var-name {
    font-size: var(--x-font-size-small);
    opacity: 0;
    transition: opacity 0.2s;
    text-align: center;
    word-break: break-all;
  }

  &:hover {
    .var-name {
      opacity: 1;
    }
  }
}

.color-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>