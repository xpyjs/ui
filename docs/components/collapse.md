---
outline: [2, 3]
---

<style>
  .content {
    padding: 10px;
    background-color: var(--x-color-fill);
    border-radius: var(--x-radius-medium);
  }
  .content-horizontal {
    padding: 10px;
    background-color: var(--x-color-fill);
    border-radius: var(--x-radius-medium);
    width: 300px;
  }
</style>

# Collapse 折叠面板

折叠面板是一种可以展开和收起内容的容器组件，用于节省页面空间，将内容分组展示。

## Collapse 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否展开 |
| label | `string` | `''` | 标题 |
| direction | `Direction` | `'vertical'` | 展开方向 |
| size | `string \| number` | - | 指定展开尺寸（高度/宽度） |
| disabled | `boolean` | `false` | 是否禁用 |
| name | `string \| number` | `''` | 唯一标识，用于分组控制 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| trigger | 触发器内容 | `{ expanded: boolean }` |
| default | 默认内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:visible | 展开状态变化时触发 | `(value: boolean) => void` |
| change | 展开状态变化时触发 | `(value: boolean) => void` |

## CollapseGroup 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| active | `string \| number` | `''` | 当前展开的面板(手风琴模式) |
| modelValue | `(string \| number)[]` | `[]` | 展开的面板集合(多选模式) |
| accordion | `boolean` | `false` | 是否手风琴模式 |
| direction | `Direction` | `'vertical'` | 展开方向 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:active | 当前激活面板变化时触发 | `(value: string \| number) => void` |
| update:modelValue | 当前激活面板集合变化时触发 | `(value: (string \| number)[]) => void` |
| change | 面板状态变化时触发 | `(value: string \| number \| (string \| number)[]) => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <div>
    <x-collapse label="点击展开/收起">
      <div class="content">
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
    </x-collapse>

    <x-collapse v-model:visible="expanded" label="点击展开/收起">
      <div class="content">
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
    </x-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const expanded = ref(true);
</script>
```

:::

### 自定义触发器

:::demo

```vue
<template>
  <x-collapse>
    <template #trigger>
      <div class="trigger-content">点我</div>
    </template>
    <div class="content">
      这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
    </div>
  </x-collapse>
</template>

<style scoped>
.trigger-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--x-color-primary-300);
  color: var(--x-color-success-600);
  transition: background-color 0.3s ease;
}
.trigger-content:hover {
  background-color: var(--x-color-primary-200);
}
</style>
```

:::

### 指定高度

:::demo

```vue
<template>
  <x-collapse size="100px" label="固定高度100px">
    <div class="content">
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
    </div>
  </x-collapse>

  <x-collapse size="50px" label="固定高度50px">
    <div class="content">
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
      <div>
        这是一段可以折叠的内容。这是一段可以折叠的内容。这是一段可以折叠的内容。
      </div>
    </div>
  </x-collapse>
</template>
```

:::

### 横向折叠

:::demo

```vue
<template>
  <x-collapse direction="horizontal" label="横向折叠">
    <div class="content-horizontal">
      <div style="white-space: nowrap" v-for="i in 5" :key="i">
        内容项 {{ i }}
      </div>
    </div>
  </x-collapse>
</template>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <x-collapse disabled label="禁用状态">
    <div class="content">这是一段被禁用的折叠内容。</div>
  </x-collapse>
</template>
```

:::

### 折叠组模式

:::demo

```vue
<template>
  <x-collapse-group v-model="activePanels">
    <x-collapse v-for="i in 3" :key="i" :name="i" :label="`面板 ${i}`">
      <div class="content">
        这是第 {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。这是第
        {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。
      </div>
    </x-collapse>
  </x-collapse-group>
</template>

<script setup>
import { ref } from 'vue';

const activePanels = ref([1]);
</script>
```

:::

### 折叠组模式-横向

:::demo

```vue
<template>
  <x-collapse-group v-model="activePanels" direction="horizontal">
    <x-collapse v-for="i in 3" :key="i" :name="i" :label="`面板 ${i}`">
      <div class="content">
        这是第 {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。这是第
        {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。
      </div>
    </x-collapse>
  </x-collapse-group>
</template>

<script setup>
import { ref } from 'vue';

const activePanels = ref([1]);
</script>
```

:::

### 手风琴模式

:::demo

```vue
<template>
  <x-collapse-group v-model:active="activePanel" accordion>
    <x-collapse v-for="i in 3" :key="i" :name="i" :label="`面板 ${i}`">
      <div class="content">
        这是第 {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。这是第
        {{ i }} 个面板的内容。这是第 {{ i }} 个面板的内容。
      </div>
    </x-collapse>
  </x-collapse-group>
</template>

<script setup>
import { ref } from 'vue';

const activePanel = ref('');
</script>
```

:::

## TypeScript

```ts
// 方向
export type Direction = "horizontal" | "vertical";
```
