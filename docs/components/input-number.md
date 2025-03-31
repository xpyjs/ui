---
outline: [2, 3]
---

<style>
  .x-input-number {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
    min-width: 200px;
  }
</style>

# InputNumber 数字输入框

InputNumber 组件用于处理数字类型的输入，支持精度控制和范围限制。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `number \| null` | - | 绑定值 |
| min | `number` | `-Infinity` | 最小值 |
| max | `number` | `Infinity` | 最大值 |
| precision | `number` | - | 数值精度，小数位数 |
| placeholder | `string` | - | 占位文本 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| clearable | `boolean` | `false` | 是否可清空 |
| size | `ComponentSize` | `'medium'` | 尺寸 |
| status | `'success' \| 'warning' \| 'error'` | - | 状态样式 |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `(value: number \| null) => void` |
| change | 值变化时触发 | `(value: number \| null, event: Event) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清除按钮时触发 | `() => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-input-number v-model="value1" placeholder="请输入数字" />
  当前数字：{{ value1 }}
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(null);
</script>
```

:::

### 最大值和最小值

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input-number
      v-model="value2"
      :min="0"
      :max="100"
      placeholder="0-100"
    />
  </div>
  当前数字：{{ value2 }}
</template>

<script setup>
import { ref } from 'vue';

const value2 = ref(50);
</script>

<style>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}
</style>
```

:::

### 精度控制

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input-number
      v-model="value3"
      :precision="2"
      placeholder="保留2位小数"
    />
    当前数字：{{ value3 }}
  </div>

  <div class="demo-row">
    <x-input-number
      v-model="value4"
      :precision="0"
      placeholder="只能输入整数"
    />
    当前数字：{{ value4 }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value3 = ref(3.14);
const value4 = ref(100);
</script>
```

:::

### 尺寸

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input-number v-model="value5" size="small" placeholder="小" />
    <x-input-number v-model="value5" placeholder="中" />
    <x-input-number v-model="value5" size="large" placeholder="大" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value5 = ref(null);
</script>
```

:::

### 状态

:::demo

```vue
<template>
  <div class="demo-row">
    <x-input-number disabled v-model="value6" placeholder="禁用" />
    <x-input-number readonly v-model="value6" placeholder="只读" />
    <x-input-number v-model="value6" status="success" placeholder="成功" />
    <x-input-number v-model="value6" status="warning" placeholder="警告" />
    <x-input-number v-model="value6" status="error" placeholder="错误" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value6 = ref(666);
</script>
```

:::

### 可清空

:::demo

```vue
<template>
  <x-input-number
    v-model="value7"
    clearable
    placeholder="点击清除图标清空"
  />
</template>

<script setup>
import { ref } from 'vue';

const value7 = ref(null);
</script>
```

:::

## TypeScript

```ts
// 组件尺寸
export type ComponentSize = "small" | "medium" | "large";

// 组件状态
export type ComponentStatus = "success" | "warning" | "error";
```
