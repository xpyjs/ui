---
outline: [2, 3]
---

<style>
  .x-select {
    margin-bottom: var(--x-gap-medium);
    min-width: 200px;
  }
</style>

# Select 选择器

Select 组件用于从预定义的选项列表中选择一个或多个选项，支持单选和多选模式。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `ModelValue` | - | 选择器值 |
| items | `SelectItem[]` | `[]` | 选项列表 |
| options | `SelectOption` | `{ label: 'label', value: 'value' }` | 选项配置 |
| type | `SelectType` | `'default'` | 多选模式下，选中的展示样式 |
| size | `ComponentSize` | `'medium'` | 选择器尺寸 |
| placeholder | `string` | `'请选择'` | 选择器占位符 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| clearable | `boolean` | `false` | 是否可清除 |
| popupProps | `Omit<PopupProps, 'visible'>` | - | popup 组件的 props |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 自定义选项内容 | `{ item: SelectItem, $index: number }` |
| tag | 自定义多选标签内容 | `{ tag: SelectItem }` |
| clear-icon | 自定义清除图标 | - |
| arrow | 自定义箭头图标 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | `(value: ModelValue) => void` |
| change | 选中值变化时触发 | `(value: ModelValue \| SelectItem) => void` |
| clear | 清除选项时触发 | - |

## 示例

### 基础用法

基础的选择器用法，点击触发下拉菜单。

:::demo

```vue
<template>
  <x-select
    v-model="value1"
    :items="items"
    placeholder="请选择"
    style="width: 200px"
    :popup-props="{ appendTo: null }"
  />
  <div class="demo-value">当前值: {{ value1 }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value1 = ref("");

// 基础选项
const items = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" }
];
</script>

<style lang="scss" scoped>
.demo-value {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
```

:::

### 多选模式

设置 `multiple` 属性可以启用多选模式，支持选择多个选项。

:::demo

```vue
<template>
  <x-select
    v-model="value2"
    :items="items"
    multiple
    placeholder="请选择多个选项"
    style="width: 200px"
    clearable
  />
  <x-select
    v-model="value2"
    :items="items"
    multiple
    type="tag"
    placeholder="请选择多个选项"
    style="width: 200px"
    clearable
  />
  <div class="demo-value">当前值: {{ value2 }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value2 = ref([]);

// 基础选项
const items = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" }
];
</script>

<style lang="scss" scoped>
.demo-value {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
```

:::

### 自定义选项

通过 `options` 属性可以自定义选项的键名。

:::demo

```vue
<template>
  <x-select
    v-model="value3"
    :items="customItems"
    :options="{ label: 'text', value: 'id' }"
    placeholder="自定义键名"
    style="width: 200px"
    clearable
  />
  <div class="demo-value">当前值: {{ value3 }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value3 = ref("");

// 自定义键名选项
const customItems = [
  { text: "自定义1", id: "1" },
  { text: "自定义2", id: "2" },
  { text: "自定义3", id: "3" },
  { text: "自定义4", id: "4" }
];
</script>

<style lang="scss" scoped>
.demo-value {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
```

:::

### 禁用选项

可以设置整个选择器禁用，或者设置特定选项禁用。

:::demo

```vue
<template>
  <x-select
    v-model="value4"
    :items="disabledItems"
    placeholder="包含禁用选项"
    style="width: 200px"
    clearable
  />
  <x-select
    v-model="value4"
    :items="items"
    disabled
    placeholder="整体禁用"
    style="width: 200px"
  />
  <div class="demo-value">当前值: {{ value4 }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value4 = ref("");

// 基础选项
const items = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" }
];

// 禁用选项
const disabledItems = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3", disabled: true },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" }
];
</script>

<style lang="scss" scoped>
.demo-value {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
```

:::

### 不同尺寸

提供三种不同尺寸的选择器。

:::demo

```vue
<template>
  <x-select
    v-model="value5"
    :items="items"
    size="small"
    placeholder="小号"
    style="width: 200px"
    clearable
  />
  <x-select
    v-model="value5"
    :items="items"
    placeholder="默认"
    style="width: 200px"
    clearable
  />
  <x-select
    v-model="value5"
    :items="items"
    size="large"
    placeholder="大号"
    style="width: 200px"
    clearable
  />
  <div class="demo-value">当前值: {{ value5 }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value5 = ref("");

// 基础选项
const items = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3" },
  { label: "选项4", value: "4" },
  { label: "选项5", value: "5" }
];
</script>

<style lang="scss" scoped>
.demo-value {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
```

:::

## TypeScript

```ts
// 选项类型定义
export interface SelectItem {
  label?: string;
  value?: string | number;
  disabled?: boolean;
  [key: string]: any;
}

// 选项参数
export interface SelectOption {
  label?: string;  // 选项标签。默认值 'label'
  value?: string;  // 选项值。默认值 'value'
}

// 选择器类型
export type SelectType = "default" | "tag";

// 组件尺寸
export type ComponentSize = "small" | "medium" | "large";
```
