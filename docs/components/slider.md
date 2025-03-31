---
outline: [2, 3]
---

<style>
  .demo-row {
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Slider 滑块

用于在一个固定区间内进行数值选择的组件

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `number \| [number, number]` | - | 滑块的值 |
| min | `number` | `0` | 最小值 |
| max | `number` | `100` | 最大值 |
| step | `number` | `1` | 步长 |
| showButtons | `boolean` | `false` | 是否显示步进按钮 |
| showTicks | `boolean` | `false` | 是否显示刻度 |
| showValue | `boolean` | `false` | 是否显示数值 |
| vertical | `boolean` | `false` | 是否垂直显示 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `ComponentSize` | `'medium'` | 组件尺寸 |
| type | `ComponentType` | `'default'` | 组件类型 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| button | 自定义滑块按钮 | - |
| increase | 自定义增加按钮 | - |
| decrease | 自定义减少按钮 | - |
| value | 自定义数值显示 | `{ value: number }` |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `(value: number \| [number, number]) => void` |
| change | 值改变时触发 | `(value: number \| [number, number]) => void` |
| input | 值输入时触发 | `(value: number \| [number, number]) => void` |
| drag-end | 拖拽结束时触发 | `() => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-slider v-model="value1" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value1 = ref(0);
</script>
```

:::

### 显示数值

:::demo

```vue
<template>
  <x-slider v-model="value2" show-value />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value2 = ref(30);
</script>
```

:::

### 步进按钮

:::demo

```vue
<template>
  <x-slider v-model="value3" show-buttons />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value3 = ref(40);
</script>
```

:::

### 刻度标记

:::demo

```vue
<template>
  <x-slider v-model="value4" show-ticks :step="10" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value4 = ref(50);
</script>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <div class="demo-row">
    <x-slider v-model="value5" size="small" show-value />
    <x-slider v-model="value5" size="medium" show-value />
    <x-slider v-model="value5" size="large" show-value />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value5 = ref(60);
</script>
```

:::

### 不同类型

:::demo

```vue
<template>
  <div class="demo-row">
    <x-slider v-model="value6" type="primary" show-value />
    <x-slider v-model="value6" type="success" show-value />
    <x-slider v-model="value6" type="warning" show-value />
    <x-slider v-model="value6" type="error" show-value />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value6 = ref(70);
</script>
```

:::

### 垂直方向

:::demo

```vue
<template>
  <div style="height: 200px; display: flex; gap: 32px">
    <x-slider v-model="value7" vertical />
    <x-slider v-model="value7" vertical show-value />
    <x-slider v-model="value7" vertical show-buttons />
    <x-slider v-model="value7" vertical show-ticks :step="10" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value7 = ref(80);
</script>
```

:::

### 自定义范围

:::demo

```vue
<template>
  <x-slider v-model="value8" :min="-20" :max="20" show-value />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value8 = ref(0);
</script>
```

:::

### 自定义步长

:::demo

```vue
<template>
  <x-slider v-model="value9" :step="5" show-value show-ticks />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value9 = ref(50);
</script>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <x-slider v-model="value10" disabled show-value />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value10 = ref(50);
</script>
```

:::

### 自定义按钮

:::demo

```vue
<template>
  <x-slider v-model="value11" show-value>
    <template #button>
      <div class="custom-button">
        <x-icon name="mdi:drag" />
      </div>
    </template>
  </x-slider>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value11 = ref(50);
</script>

<style lang="scss" scoped>
.custom-button {
  width: 24px;
  height: 24px;
  background-color: var(--x-color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--x-bg-color);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  .x-icon {
    font-size: 16px;
  }
}
</style>
```

:::

### 自定义步进按钮

:::demo

```vue
<template>
  <x-slider v-model="value12" show-buttons show-value>
    <template #decrease>
      <x-icon name="mdi:minus-circle" />
    </template>
    <template #increase>
      <x-icon name="mdi:plus-circle" />
    </template>
  </x-slider>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value12 = ref(50);
</script>
```

:::

### 区间选择

:::demo

```vue
<template>
  <x-slider v-model="rangeValue" :step="10" show-value show-ticks />
  <div>当前值: {{ rangeValue }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const rangeValue = ref([20, 60]);
</script>
```

:::

### 自动排序

:::demo

```vue
<template>
  <x-slider v-model="rangeValue2" show-value />
  <div>当前值: {{ rangeValue2 }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const rangeValue2 = ref([60, 30]);
</script>
```

:::

## TypeScript

```ts
// 基础颜色类型
export type ComponentType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// 组件尺寸
export type ComponentSize = "small" | "medium" | "large";
```
