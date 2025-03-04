<template>
  <div class="demo-container">
    <Demo title="基础色板">
      <div class="color-grid">
        <div v-for="name in baseColors" :key="name" class="color-item">
          <div class="color-name">{{ name }}</div>
          <div class="color-variants">
            <div
              v-for="level in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]"
              :key="level"
              class="color-block"
              :style="{
                backgroundColor: `var(--x-color-${name}-${level})`
              }"
              @click="copyColor(`--x-color-${name}-${level}`)"
            >
              <span
                class="var-name"
                :style="{
                  color:
                    level > 400 ? 'var(--x-bg-color)' : 'var(--x-text-color)'
                }"
                >--x-color-{{ name }}-{{ level }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </Demo>

    <Demo title="文本色板">
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
    </Demo>

    <Demo title="边框色板">
      <div class="color-row">
        <div v-for="name in borderTypes" :key="name" class="color-item">
          <div class="color-name">{{ name }}</div>
          <div
            class="color-block"
            :style="{ backgroundColor: `var(--x-border-color-${name})` }"
            @click="copyColor(`--x-border-color-${name}`)"
          >
            <span class="var-name">--x-border-color-{{ name }}</span>
          </div>
        </div>
      </div>
    </Demo>

    <Demo title="背景色板">
      <div class="color-row">
        <div v-for="name in bgTypes" :key="name" class="color-item">
          <div class="color-name">{{ name }}</div>
          <div
            class="color-block"
            :style="{ backgroundColor: `var(--x-bg-color-${name})` }"
            @click="copyColor(`--x-bg-color-${name}`)"
          >
            <span class="var-name">--x-bg-color-{{ name }}</span>
          </div>
        </div>
      </div>
    </Demo>

    <Demo title="固定色板">
      <div class="color-row">
        <div v-for="name in fixedColors" :key="name" class="color-item">
          <div class="color-name">{{ name }}</div>
          <div
            class="color-block"
            :class="`color-block-${name}`"
            :style="{ backgroundColor: `var(--x-color-${name})` }"
            @click="copyColor(`--x-color-${name}`)"
          >
            <span class="var-name">--x-color-{{ name }}</span>
          </div>
        </div>
      </div>
    </Demo>

    <!-- 添加提示组件 -->
    <div class="copy-tooltip" :class="{ show: showTooltip }">
      已复制到剪贴板
    </div>
  </div>
</template>

<script setup lang="ts">
import Demo from "../../components/Demo.vue";
import { ref } from "vue";

const baseColors = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
  "neutral"
];

const textTypes = [
  "primary",
  "regular",
  "secondary",
  "placeholder",
  "disabled"
];

const borderTypes = ["lightest", "light", "default", "dark"];

const bgTypes = ["base", "hover", "disabled"];

const fixedColors = ["white", "black", "transparent"];

const showTooltip = ref(false);
let tooltipTimer: number | null = null;

const copyColor = async (colorVar: string) => {
  try {
    await navigator.clipboard.writeText(colorVar);

    if (showTooltip.value) {
      showTooltip.value = false;
      tooltipTimer && clearTimeout(tooltipTimer);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 显示提示
    showTooltip.value = true;

    // 清除之前的定时器
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
    }

    // 2秒后隐藏提示
    tooltipTimer = window.setTimeout(() => {
      showTooltip.value = false;
    }, 2000);
  } catch (err) {
    console.error("复制失败:", err);
  }
};
</script>

<style lang="scss" scoped>
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
  height: 120px;
  border-radius: var(--x-border-radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  cursor: pointer;
  width: 200px;

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

// 添加提示样式
.copy-tooltip {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background-color: var(--x-color-primary-500);
  color: var(--x-bg-color);
  padding: 8px 16px;
  border-radius: var(--x-border-radius-base);
  font-size: var(--x-font-size-small);
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1000;

  &.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
