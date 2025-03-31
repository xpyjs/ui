---
outline: [2, 3]
---

<style>
  .x-checkbox {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Checkbox 复选框

复选框是一种允许用户从一组选项中选择多个选项的控件。它通常用于表单中，允许用户进行多项选择。

## Checkbox 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `boolean \| any[]` | - | 选中状态，可以是布尔值或数组 |
| value | `string \| number` | - | 复选框值，在组合使用时有效 |
| type | `ComponentType` | `'default'` | 复选框类型 |
| shape | `'check' \| 'dot'` | `'check'` | 复选框形状 |
| size | `ComponentSize` | `'medium'` | 复选框大小 |
| disabled | `boolean` | `false` | 是否禁用 |
| label | `string` | - | 标签内容 |
| indeterminate | `boolean` | `false` | 是否为不确定状态 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于显示复选框标签 | - |
| box | 自定义复选框图标 | `{ checked: boolean, indeterminate: boolean, disabled: boolean }` |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 复选框值变化时触发 | `(value: boolean \| any[]) => void` |
| change | 复选框值变化时触发 | `(value: boolean \| any[]) => void` |

## CheckboxGroup 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `(string \| number)[]` | `[]` | 选中值数组 |
| type | `ComponentType` | `'default'` | 复选框组类型 |
| size | `ComponentSize` | `'medium'` | 复选框组大小 |
| disabled | `boolean` | `false` | 是否禁用 |
| direction | `Direction` | `'horizontal'` | 布局方向 |
| gap | `string \| number` | `0` | 间距 |
| all | `boolean \| null` | - | 全选状态，`true` 为全选，`false` 为全不选，`null` 为部分选中 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于放置 Checkbox 组件 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | `(value: (string \| number)[]) => void` |
| change | 选中值变化时触发 | `(value: (string \| number)[]) => void` |
| update:all | 全选状态变化时触发 | `(value: boolean \| null) => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <div class="demo-row">
    <x-checkbox v-model="checked">选项1</x-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
</script>

<style>
.demo-row {
  width: 100%;
  margin-bottom: 16px;
}
</style>
```

:::

### 不同形状

:::demo

```vue
<template>
  <div class="demo-row">
    <x-checkbox v-model="checked">默认</x-checkbox>
    <x-checkbox v-model="checked" shape="dot">dot</x-checkbox>
  </div>
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
  <div class="demo-row">
    <x-checkbox v-model="checked" size="small">小型</x-checkbox>
    <x-checkbox v-model="checked" size="medium">中等</x-checkbox>
    <x-checkbox v-model="checked" size="large">大型</x-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
```

:::

### 不同类型

:::demo

```vue
<template>
  <div class="demo-row">
    <x-checkbox v-model="checked" type="default">默认</x-checkbox>
    <x-checkbox v-model="checked" type="primary">主要</x-checkbox>
    <x-checkbox v-model="checked" type="success">成功</x-checkbox>
    <x-checkbox v-model="checked" type="warning">警告</x-checkbox>
    <x-checkbox v-model="checked" type="error">错误</x-checkbox>
  </div>
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
  <div class="demo-row">
    <x-checkbox v-model="checked1" disabled>禁用未选中</x-checkbox>
    <x-checkbox v-model="checked2" disabled>禁用已选中</x-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(true);
</script>
```

:::

### 不确定状态

:::demo

```vue
<template>
  <div class="demo-row">
    <x-checkbox v-model="checked" :indeterminate="true">不确定状态</x-checkbox>
  </div>

  <div class="demo-desc">
    很多时候，需要全选功能，这时候可以设置 indeterminate 属性。使用
    <code>x-checkbox-group</code> 的
    <code>all</code> 属性来控制全选状态。
  </div>

  <div class="demo-row">
    <x-checkbox v-model="allChecked" :indeterminate="allChecked === null">
      全选
    </x-checkbox>
  </div>

  <div class="demo-row">
    <x-checkbox-group v-model="groupValue" v-model:all="allChecked">
      <x-checkbox value="1">选项1</x-checkbox>
      <x-checkbox value="2">选项2</x-checkbox>
      <x-checkbox value="3">选项3</x-checkbox>
    </x-checkbox-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(true);
const groupValue = ref(["2"]);
const allChecked = ref(false);
</script>

<style>
.demo-desc {
  margin: 16px 0 8px;
  color: var(--x-text-color-secondary);
  font-size: 14px;
}
</style>
```

:::

### 复选框组

:::demo

```vue
<template>
  <div class="demo-desc">水平布局</div>
  <div class="demo-row">
    <x-checkbox-group v-model="groupValue" direction="horizontal" :gap="16">
      <x-checkbox value="1">选项1</x-checkbox>
      <x-checkbox value="2">选项2</x-checkbox>
      <x-checkbox value="3">选项3</x-checkbox>
    </x-checkbox-group>
  </div>

  <div class="demo-desc">垂直布局</div>
  <div class="demo-row">
    <x-checkbox-group v-model="groupValue" direction="vertical">
      <x-checkbox value="1">选项1</x-checkbox>
      <x-checkbox value="2">选项2</x-checkbox>
      <x-checkbox value="3">选项3</x-checkbox>
    </x-checkbox-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const groupValue = ref(["1"]);
</script>
```

:::

### 组尺寸和类型

:::demo

```vue
<template>
  <div class="demo-row">
    <x-checkbox-group v-model="groupValue" size="small">
      <x-checkbox value="1">小型</x-checkbox>
      <x-checkbox value="2">选项</x-checkbox>
      <x-checkbox value="3">按钮</x-checkbox>
    </x-checkbox-group>
  </div>

  <div class="demo-row">
    <x-checkbox-group v-model="groupValue" type="primary">
      <x-checkbox value="1">主要</x-checkbox>
      <x-checkbox value="2">选项</x-checkbox>
      <x-checkbox value="3">按钮</x-checkbox>
    </x-checkbox-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const groupValue = ref(["1"]);
</script>
```

:::

### 组禁用

:::demo

```vue
<template>
  <div class="demo-row">
    <x-checkbox-group v-model="groupValue" disabled>
      <x-checkbox value="1">禁用</x-checkbox>
      <x-checkbox value="2">状态</x-checkbox>
      <x-checkbox value="3">按钮</x-checkbox>
    </x-checkbox-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const groupValue = ref(["1"]);
</script>
```

:::

### 自定义内容

:::demo

```vue
<template>
  <div class="demo-row">
    <x-checkbox v-model="customChecked">
      <template #box="{ checked, indeterminate, disabled }">
        <div class="custom-checkbox">
          <x-icon v-if="checked" name="lets-icons:check-fill" />
          <x-icon
            v-else-if="indeterminate"
            name="mdi:radiobox-indeterminate-variant"
          />
          <x-icon v-else name="ph:empty-bold" />
        </div>
      </template>
      自定义图标
    </x-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const customChecked = ref(false);
</script>

<style>
.custom-checkbox {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
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

// 方向
export type Direction = "horizontal" | "vertical";
```
