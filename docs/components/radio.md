---
outline: [2, 3]
---

<style>
  .x-radio {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Radio 单选框

单选框组件用于在一组相关且互斥的选项中进行单一选择。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `string \| number \| boolean` | - | 选中值 |
| value | `string \| number \| boolean` | - | 单选框的值 |
| type | `ComponentType` | `'default'` | 单选框类型 |
| size | `ComponentSize` | `'medium'` | 单选框大小 |
| disabled | `boolean` | `false` | 是否禁用 |
| label | `string` | - | 单选框标签文本 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于显示单选框标签内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | `(value: string \| number \| boolean) => void` |
| change | 选中值变化时触发 | `(value: string \| number \| boolean) => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-radio v-model="radio1" value="1">选项1</x-radio>
  <x-radio v-model="radio1" value="2">选项2</x-radio>
</template>

<script setup>
import { ref } from 'vue';

const radio1 = ref("1");
</script>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <div class="demo-row">
    <x-radio v-model="radio2" value="1" size="small">小型</x-radio>
    <x-radio v-model="radio2" value="2" size="medium">中等</x-radio>
    <x-radio v-model="radio2" value="3" size="large">大型</x-radio>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio2 = ref("1");
</script>

<style>
.demo-row {
  width: 100%;
  margin-bottom: 16px;
}
</style>
```

:::

### 不同类型

:::demo

```vue
<template>
  <div class="demo-row">
    <x-radio v-model="radio3" value="1" type="default">默认</x-radio>
    <x-radio v-model="radio3" value="2" type="primary">主要</x-radio>
    <x-radio v-model="radio3" value="3" type="success">成功</x-radio>
    <x-radio v-model="radio3" value="4" type="warning">警告</x-radio>
    <x-radio v-model="radio3" value="5" type="error">错误</x-radio>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio3 = ref("1");
</script>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <div class="demo-row">
    <x-radio v-model="radio4" value="1" disabled>禁用未选中</x-radio>
    <x-radio v-model="radio4" value="2" disabled>禁用已选中</x-radio>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio4 = ref("2");
</script>
```

:::

### 分组使用

:::demo

```vue
<template>
  <div class="demo-desc">绑定相同 v-model 值，自动编为一组</div>
  <div class="demo-row">
    <x-radio v-model="radio5" value="1">分组1-选项1</x-radio>
    <x-radio v-model="radio5" value="2">分组1-选项2</x-radio>
  </div>
  <div class="demo-row">
    <x-radio v-model="radio6" value="1">分组2-选项1</x-radio>
    <x-radio v-model="radio6" value="2">分组2-选项2</x-radio>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio5 = ref("1");
const radio6 = ref("1");
</script>

<style>
.demo-desc {
  width: 100%;
  margin-bottom: 16px;
  font-size: 16px;
  color: var(--x-text-color);
}
</style>
```

:::

### 带标签

:::demo

```vue
<template>
  <div class="demo-row">
    <x-radio v-model="radio7" value="1" label="选项1" />
    <x-radio v-model="radio7" value="2" label="选项2" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio7 = ref("1");
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
