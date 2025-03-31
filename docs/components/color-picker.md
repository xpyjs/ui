---
outline: [2, 3]
---

<style>
  .demo-row {
    width: 100%;
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .demo-desc {
    color: var(--x-text-color-secondary);
    font-size: 14px;
    margin-bottom: 8px;
  }
</style>

# ColorPicker 颜色选择器

用于颜色选择的交互组件

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `Color \| null` | `null` | 选中的颜色值 |
| showAlpha | `boolean` | `true` | 是否显示透明度选择 |
| showText | `boolean` | `true` | 是否显示下方文本框 |
| format | `ColorFormat` | `'hex'` | 指定输出颜色格式 |
| inline | `boolean` | `false` | 是否内联模式 |
| size | `ComponentSize` | `'medium'` | 颜色选择器大小 |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 颜色值更新事件 | `(value: string \| null) => void` |
| change | 颜色值变化事件 | `(value: string \| null) => void` |

## 示例

### 基础用法

基本的颜色选择功能

:::demo

```vue
<template>
  <x-color-picker v-model="color" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const color = ref("#7654ee");
</script>
```

:::

### 大小

提供三种不同大小的选择器

:::demo

```vue
<template>
  <div class="demo-row">
    <x-color-picker v-model="color" size="small" />
    <x-color-picker v-model="color" />
    <x-color-picker v-model="color" size="large" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const color = ref("#7654ee");
</script>
```

:::

### 透明度选择

控制是否显示透明度选择

:::demo

```vue
<template>
  <div class="demo-row" style="align-items: center">
    <div>
      <div class="demo-desc">可以选择透明度</div>
      <x-color-picker v-model="color1" show-alpha />
    </div>

    <div>
      <div class="demo-desc">颜色带透明度，但没有透明度选择</div>
      <x-color-picker v-model="color2" :show-alpha="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const color1 = ref("#7654ee77");
const color2 = ref("#F56C6C80");
</script>
```

:::

### 内联模式

直接内联显示完整的颜色选择面板

:::demo

```vue
<template>
  <div class="demo-row">
    <div>
      <div>当前选择颜色：{{ color1 }}</div>
      <x-color-picker v-model="color1" inline />
    </div>

    <div>
      <div>当前选择颜色：{{ color2 }}</div>
      <x-color-picker v-model="color2" inline show-alpha />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const color1 = ref("#67C23A");
const color2 = ref("#E6A23C");
</script>
```

:::

## TypeScript

```ts
// 颜色格式类型
export type ColorFormat = "hex" | "rgb" | "hsl";

// 组件尺寸
export type ComponentSize = "small" | "medium" | "large";

// 颜色类型
export type Color = string | RGBColor | HSLColor;

// RGB颜色对象
export interface RGBColor {
  r: number; // 红色 0-255
  g: number; // 绿色 0-255
  b: number; // 蓝色 0-255
  a?: number; // 透明度 0-1
}

// HSL颜色对象
export interface HSLColor {
  h: number; // 色相 0-360
  s: number; // 饱和度 0-100
  l: number; // 亮度 0-100
  a?: number; // 透明度 0-1
}
```
