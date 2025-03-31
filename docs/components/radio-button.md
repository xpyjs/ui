---
outline: [2, 3]
---

<style>
  .x-radio-button-group {
    margin-bottom: var(--x-gap-medium);
  }
</style>

# RadioButton 单选按钮组

单选按钮组件的按钮样式版本，常用于在一组相关且互斥的选项中进行选择。

## 参数

### RadioButton Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `string \| number \| boolean` | - | 按钮组绑定的值 |
| value | `string \| number \| boolean` | - | 单选按钮的值 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `ComponentSize` | `'medium'` | 按钮大小 |
| type | `ComponentType` | `'default'` | 按钮类型 |

### RadioButtonGroup Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `string \| number \| boolean` | - | 按钮组绑定的值 |
| disabled | `boolean` | `false` | 是否禁用整个按钮组 |
| size | `ComponentSize` | `'medium'` | 按钮组中所有按钮的大小 |
| type | `ComponentType` | `'default'` | 按钮组中所有按钮的类型 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于放置 RadioButton 组件 | - |

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
  <div class="demo-row">
    <x-radio-button-group v-model="radio">
      <x-radio-button value="1">选项1</x-radio-button>
      <x-radio-button value="2">选项2</x-radio-button>
      <x-radio-button value="3">选项3</x-radio-button>
    </x-radio-button-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio = ref("1");
</script>

<style>
.demo-row {
  width: 100%;
  margin-bottom: 16px;
}
</style>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <div class="demo-row">
    <x-radio-button-group v-model="radio" size="small">
      <x-radio-button value="1">小型</x-radio-button>
      <x-radio-button value="2">选项</x-radio-button>
      <x-radio-button value="3">按钮</x-radio-button>
    </x-radio-button-group>
  </div>
  <div class="demo-row">
    <x-radio-button-group v-model="radio" size="medium">
      <x-radio-button value="1">中等</x-radio-button>
      <x-radio-button value="2">选项</x-radio-button>
      <x-radio-button value="3">按钮</x-radio-button>
    </x-radio-button-group>
  </div>
  <div class="demo-row">
    <x-radio-button-group v-model="radio" size="large">
      <x-radio-button value="1">大型</x-radio-button>
      <x-radio-button value="2">选项</x-radio-button>
      <x-radio-button value="3">按钮</x-radio-button>
    </x-radio-button-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio = ref("1");
</script>
```

:::

### 不同类型

:::demo

```vue
<template>
  <div class="demo-row">
    <x-radio-button-group v-model="radio1" type="default">
      <x-radio-button value="1">默认</x-radio-button>
      <x-radio-button value="2">按钮</x-radio-button>
      <x-radio-button value="3">选项</x-radio-button>
    </x-radio-button-group>
  </div>
  <div class="demo-row">
    <x-radio-button-group v-model="radio2" type="primary">
      <x-radio-button value="1">主要</x-radio-button>
      <x-radio-button value="2">按钮</x-radio-button>
      <x-radio-button value="3">选项</x-radio-button>
    </x-radio-button-group>
  </div>
  <div class="demo-row">
    <x-radio-button-group v-model="radio3" type="success">
      <x-radio-button value="1">成功</x-radio-button>
      <x-radio-button value="2">按钮</x-radio-button>
      <x-radio-button value="3">选项</x-radio-button>
    </x-radio-button-group>
  </div>
  <div class="demo-row">
    <x-radio-button-group v-model="radio4" type="warning">
      <x-radio-button value="1">警告</x-radio-button>
      <x-radio-button value="2">按钮</x-radio-button>
      <x-radio-button value="3">选项</x-radio-button>
    </x-radio-button-group>
  </div>
  <div class="demo-row">
    <x-radio-button-group v-model="radio5" type="error">
      <x-radio-button value="1">错误</x-radio-button>
      <x-radio-button value="2">按钮</x-radio-button>
      <x-radio-button value="3">选项</x-radio-button>
    </x-radio-button-group>
  </div>

  <div style="margin-top: 16px;">单独设置类型</div>

  <div class="demo-row">
    <x-radio-button-group v-model="radio6">
      <x-radio-button value="1" type="default">默认</x-radio-button>
      <x-radio-button value="2" type="primary">主要</x-radio-button>
      <x-radio-button value="3" type="success">成功</x-radio-button>
      <x-radio-button value="4" type="warning">警告</x-radio-button>
      <x-radio-button value="5" type="error">错误</x-radio-button>
    </x-radio-button-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio1 = ref("1");
const radio2 = ref("1");
const radio3 = ref("1");
const radio4 = ref("1");
const radio5 = ref("1");
const radio6 = ref("1");
</script>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <div class="demo-row">
    <x-radio-button-group v-model="radio1" disabled>
      <x-radio-button value="1">禁用</x-radio-button>
      <x-radio-button value="2">状态</x-radio-button>
      <x-radio-button value="3">按钮</x-radio-button>
    </x-radio-button-group>
  </div>
  <div class="demo-row">
    <x-radio-button-group v-model="radio2">
      <x-radio-button value="1">正常</x-radio-button>
      <x-radio-button value="2" disabled>禁用</x-radio-button>
      <x-radio-button value="3">正常</x-radio-button>
    </x-radio-button-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio1 = ref("1");
const radio2 = ref("1");
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
