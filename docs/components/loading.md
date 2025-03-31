---
outline: [2, 3]
---

<style>
  .loading-types {
    width: 100%;
    display: flex;
    gap: 1rem;
  }

  .loading-type {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .loading-name {
    text-align: center;
    text-transform: capitalize;
  }

  .loading-container {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--x-bg-color-hover);
    border-radius: var(--x-border-radius-base);
    color: var(--x-text-color-secondary);
    margin-bottom: 10px;
  }

  .loading-box {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--x-bg-color-hover);
    border-radius: var(--x-border-radius-base);
    color: var(--x-text-color-secondary);
  }

  .mt-4 {
    margin-top: 1rem;
  }

  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Loading 加载

用于在页面中展示加载动画，提示用户正在加载中。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示加载状态 |
| type | `LoadingType` | `'spinner'` | 加载动画类型 |
| icon | `string \| Component` | - | 自定义图标 |
| iconStyle | `XStyle` | - | 自定义图标样式 |
| text | `string` | - | 加载提示文本 |
| mask | `boolean` | `true` | 背景遮罩 |
| fullscreen | `boolean` | `false` | 全屏显示 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于显示加载组件的内容 | - |
| icon | 自定义图标插槽 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| after-leave | 加载组件离开过渡动画结束后触发 | () => void |

## 示例

### 基础用法

使用 `visible` 属性控制加载状态的显示和隐藏。

:::demo

```vue
<template>
  <x-button @click="showLoading">显示 Loading</x-button>
  <x-button @click="hideLoading">隐藏 Loading</x-button>

  <div v-loading="visible" class="loading-container">这是一个容器</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const showLoading = () => (visible.value = true);
const hideLoading = () => (visible.value = false);
</script>
```

:::

### 全屏 Loading

设置 `fullscreen` 属性可以全屏显示加载状态。

:::demo

```vue
<template>
  <x-button
    v-loading="[visible2, { fullscreen: true }]"
    @click="showFullscreenLoading"
  >
    显示全屏 Loading
  </x-button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible2 = ref(false);
const showFullscreenLoading = () => {
  visible2.value = true;
  setTimeout(() => {
    visible2.value = false;
  }, 3000);
};
</script>
```

:::

### 不同类型

Loading 组件提供了多种内置动画类型。

:::demo

```vue
<template>
  <div class="loading-types">
    <div v-for="(type, i) in types" :key="type" class="loading-type">
      <div class="loading-box">
        <x-loading :visible="typesLoading[i]" :type="type" :mask="false" />
      </div>
      <x-button
        type="secondary"
        variant="text"
        @click="typesLoading[i] = !typesLoading[i]"
      >
        {{ type }}
      </x-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const types = ["spinner", "dots", "snake", "pulse", "wave"] as const;
const typesLoading = ref([true, true, true, true, true]);
</script>
```

:::

### 自定义文本

通过 `text` 属性可以添加加载提示文本。

:::demo

```vue
<template>
  <div v-loading="[true, { text: '加载中...' }]" class="loading-container" />
  <div class="loading-name">带文本的 Loading</div>
</template>
```

:::

### 自定义图标

通过 `icon` 属性或插槽可以自定义加载图标。

:::demo

```vue
<template>
  <div
    v-loading="[
      true,
      { icon: 'line-md:loading-alt-loop', iconStyle: { fontSize: '30px' } }
    ]"
    class="loading-container"
  />
</template>
```

:::

### 使用钩子方法

可以使用 `useLoading` 钩子函数以编程方式控制 Loading 状态。

:::demo

```vue
<template>
  <div ref="containerRef" class="loading-container">钩子方法调用</div>
  <x-button @click="hookLoading = !hookLoading">切换状态</x-button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLoading } from '@xpyjs/x-ui';

const hookLoading = ref(false);
const containerRef = ref();

onMounted(() => {
  const { close } = useLoading(containerRef, hookLoading);
});
</script>
```

:::

## 指令用法

Loading 组件提供了 `v-loading` 指令，可以更简单地控制元素的加载状态。

### 基本用法

```vue
<div v-loading="true">内容区域</div>
```

### 配置选项

指令值可以是布尔值或数组，数组第一个元素为加载状态，第二个元素为配置选项。

```vue
<div v-loading="[true, { text: '加载中...', type: 'dots' }]">内容区域</div>
```

## TypeScript

```ts
// 加载动画类型
export type LoadingType = "spinner" | "dots" | "snake" | "pulse" | "wave";

// 加载绑定值类型
export type LoadingBinding = boolean | [boolean, Partial<LoadingProps>];

// 加载属性接口
export interface LoadingProps {
  // 是否显示加载状态
  visible?: boolean;
  // 加载动画类型
  type?: LoadingType;
  // 自定义图标
  icon?: string | Component;
  // 自定义图标样式
  iconStyle?: XStyle;
  // 加载提示文本
  text?: string;
  // 背景遮罩
  mask?: boolean;
  // 全屏显示
  fullscreen?: boolean;
}
```
