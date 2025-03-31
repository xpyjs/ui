---
outline: [2, 3]
---

<style>
  .x-switch {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Switch 开关

开关控件，用于表示两种相互对立的状态间的切换，如开/关、显示/隐藏。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `boolean` | - | 开关状态，`true` 为开，`false` 为关 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `ComponentSize` | `'medium'` | 开关大小 |
| type | `ComponentType` | `'default'` | 开关类型 |
| activeColor | `string` | - | 开关打开时的颜色 |
| inactiveColor | `string` | - | 开关关闭时的颜色 |
| activeText | `string` | - | 开关打开时的文字说明 |
| inactiveText | `string` | - | 开关关闭时的文字说明 |
| activeIcon | `string` | - | 开关打开时的图标 |
| inactiveIcon | `string` | - | 开关关闭时的图标 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| activeIcon | 开关打开时的自定义图标 | - |
| inactiveIcon | 开关关闭时的自定义图标 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 开关状态变化时触发 | `(value: boolean) => void` |
| change | 开关状态变化时触发 | `(value: boolean) => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-switch v-model="checked" />
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <x-switch v-model="checked" size="small" />
  <x-switch v-model="checked" size="medium" />
  <x-switch v-model="checked" size="large" />
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>
```

:::

### 不同类型

:::demo

```vue
<template>
  <x-switch v-model="checked" type="default" />
  <x-switch v-model="checked" type="primary" />
  <x-switch v-model="checked" type="success" />
  <x-switch v-model="checked" type="warning" />
  <x-switch v-model="checked" type="error" />
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <x-switch v-model="checked1" disabled />
  <x-switch v-model="checked2" disabled />
</template>

<script setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
</script>
```

:::

### 自定义颜色

:::demo

```vue
<template>
  <x-switch
    v-model="checked"
    active-color="#13ce66"
    inactive-color="#ff4949"
  />
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>
```

:::

### 文字描述

:::demo

```vue
<template>
  <x-switch v-model="checked" active-text="开启" inactive-text="关闭" />
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>
```

:::

### 图标

:::demo

```vue
<template>
  <x-switch
    v-model="checked"
    active-icon="mdi:check"
    inactive-icon="mdi:close"
  />

  <x-switch v-model="checked">
    <template #activeIcon>
      <x-icon name="mdi:check" />
    </template>
    <template #inactiveIcon>
      <x-icon name="mdi:close" />
    </template>
  </x-switch>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
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
