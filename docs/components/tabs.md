---
outline: [2, 3]
---

<style>
  .x-tabs {
    margin-bottom: var(--x-gap-large);
  }
  .tab-content {
    padding: 20px;
    color: var(--x-text-color);
  }
</style>

# Tabs 标签页

Tabs 标签页组件用于在同一块区域内，通过标签页的形式，展示不同的内容模块，实现内容的分组切换展示。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `string \| number` | - | 当前激活的标签页，对应 items 中的 id 值 |
| items | `TabItem[]` | `[]` | 标签页数据 |
| type | `'line' \| 'card' \| 'round'` | `'line'` | 标签页类型 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 标签页方向 |
| closable | `boolean` | `false` | 是否可关闭标签页 |
| addable | `boolean` | `false` | 是否可新增标签页 |
| beforeChange | `(id: string \| number) => boolean \| Promise<boolean>` | - | 切换前的钩子函数。返回 true 则切换，返回 false 则不切换 |

### TabItem

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| id | `string \| number` | - | 标签页唯一标识 |
| label | `string` | - | 标签页标题 |
| icon | `string` | - | 标签页图标 |
| disabled | `boolean` | `false` | 是否禁用 |
| closable | `boolean` | `false` | 是否可关闭 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 标签页内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:modelValue | 激活标签页改变时触发 | `(value: string \| number) => void` |
| change | 标签页切换时触发 | `(value: string \| number) => void` |
| close | 关闭标签页时触发 | `(id: string \| number) => void` |
| add | 点击新增按钮时触发 | - |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-tabs v-model="activeTab1" :items="basicItems">
    <div v-show="activeTab1 === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab1 === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab1 === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>
</template>

<script setup>
import { ref } from 'vue';
const activeTab1 = ref("1");
// 基础标签页
const basicItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
</script>
```

:::

### 指定展示的页签

:::demo

```vue
<template>
  <div class="demo-desc">默认展示第二个页签</div>

  <x-tabs v-model="activeTab1" :items="basicItems">
    <div v-show="activeTab1 === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab1 === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab1 === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>
</template>

<script setup>
import { ref } from 'vue';
const activeTab1 = ref("2");
// 基础标签页
const basicItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
</script>
```

:::

### 不同类型

:::demo

```vue
<template>
  <x-tabs v-model="activeTab" type="line" :items="basicItems">
    <div v-show="activeTab === '1'">线条指示器一的内容</div>
    <div v-show="activeTab === '2'">线条指示器二的内容</div>
    <div v-show="activeTab === '3'">线条指示器三的内容</div>
  </x-tabs>

  <x-tabs v-model="activeTab" type="round" :items="basicItems">
    <div v-show="activeTab === '1'">圆角指示器一的内容</div>
    <div v-show="activeTab === '2'">圆角指示器二的内容</div>
    <div v-show="activeTab === '3'">圆角指示器三的内容</div>
  </x-tabs>

  <x-tabs v-model="activeTab" type="card" :items="basicItems">
    <div v-show="activeTab === '1'">卡片指示器一的内容</div>
    <div v-show="activeTab === '2'">卡片指示器二的内容</div>
    <div v-show="activeTab === '3'">卡片指示器三的内容</div>
  </x-tabs>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref("1");

// 基础标签页
const basicItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
</script>
```

:::

### 纵向标签页

:::demo

```vue
<template>
  <x-tabs
    style="height: 200px"
    v-model="activeTab"
    :items="basicItems"
    direction="vertical"
  >
    <div v-show="activeTab === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>

  <x-tabs
    style="height: 200px"
    v-model="activeTab"
    :items="basicItems"
    direction="vertical"
    type="round"
  >
    <div v-show="activeTab === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>

  <x-tabs
    style="height: 200px"
    v-model="activeTab"
    :items="basicItems"
    direction="vertical"
    type="card"
  >
    <div v-show="activeTab === '1'" class="tab-content">标签页一的内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二的内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三的内容</div>
  </x-tabs>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref("1");
const basicItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
</script>
```

:::

### 带图标

:::demo

```vue
<template>
  <x-tabs v-model="activeTab" :items="iconItems">
    <div v-show="activeTab === '1'" class="tab-content">首页内容</div>
    <div v-show="activeTab === '2'" class="tab-content">用户内容</div>
    <div v-show="activeTab === '3'" class="tab-content">设置内容</div>
  </x-tabs>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref("1");
// 带图标标签页
const iconItems = ref([
  { id: "1", label: "首页", icon: "mdi:home" },
  { id: "2", label: "用户", icon: "mdi:account" },
  { id: "3", label: "设置", icon: "mdi:cog" }
]);
</script>
```

:::

### 可关闭标签页

:::demo

```vue
<template>
  <x-tabs v-model="activeTab" :items="closeItems" closable @close="handleClose">
    <div v-show="activeTab === '1'" class="tab-content">标签页一内容</div>
    <div v-show="activeTab === '2'" class="tab-content">标签页二内容</div>
    <div v-show="activeTab === '3'" class="tab-content">标签页三内容</div>
  </x-tabs>
</template>

<script setup>
import { ref } from 'vue';
const activeTab = ref("1");

// 可关闭标签页
const closeItems = ref([
  { id: "1", label: "标签页一" },
  { id: "2", label: "标签页二" },
  { id: "3", label: "标签页三" }
]);
// 关闭标签页
const handleClose = (id) => {
  const index = closeItems.value.findIndex(item => item.id === id);
  if (index > -1) {
    closeItems.value.splice(index, 1);
  }
};
</script>
```

:::

### 可新增标签页

:::demo

```vue
<template>
  <x-tabs
    v-model="activeTab"
    :items="dynamicItems"
    closable
    addable
    @close="handleDynamicClose"
    @add="handleAdd"
  >
    <div
      v-for="item in dynamicItems"
      :key="item.id"
      v-show="activeTab === item.id"
      class="tab-content"
    >
      {{ item.label }}的内容
    </div>
  </x-tabs>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref("1");

// 动态标签页
const dynamicItems = ref([
  { id: "1", label: "标签页1" },
  { id: "2", label: "标签页2" }
]);

// 关闭动态标签页
const handleDynamicClose = (id) => {
  const index = dynamicItems.value.findIndex(item => item.id === id);
  if (index > -1) {
    dynamicItems.value.splice(index, 1);
  }
};

// 新增标签页
const handleAdd = () => {
  const newId = String(dynamicItems.value.length + 1);
  dynamicItems.value.push({
    id: newId,
    label: `标签页${newId}`
  });
  activeTab.value = newId;
};
</script>
```

:::

## TypeScript

```ts
export interface TabItem {
  // 标签页唯一标识
  id?: string | number;
  // 标签页标题
  label: string;
  // 标签页图标
  icon?: string;
  // 是否禁用
  disabled?: boolean;
  // 是否可关闭
  closable?: boolean;
}
```
