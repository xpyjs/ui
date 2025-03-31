---
outline: [2, 3]
---

<style>
  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Menu 菜单

菜单组件用于显示一组操作选项，通常用于上下文菜单、下拉菜单等场景。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| menu | `MenuItem[]` | `[]` | 菜单项配置 |
| trigger | `'click' \| 'hover' \| 'contextmenu'` | `'click'` | 触发方式 |
| placement | `Placement` | `'bottom'` | 菜单弹出位置 |
| disabled | `boolean` | `false` | 是否禁用菜单 |
| appendTo | `string \| HTMLElement \| null` | `body` | 菜单挂载位置 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 默认插槽，用于放置触发菜单的元素 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| visible-change | 菜单显示状态变化时触发 | `(visible: boolean) => void` |

## 示例

### 基础用法

:::demo

```vue
<template>
  <x-menu :menu="basicMenu">
    <x-button>点击打开菜单</x-button>
  </x-menu>
</template>

<script setup>
import { ref } from 'vue';

// 基础菜单
const basicMenu = ref([
  {
    label: "新建",
    action: () => console.log("新建")
  },
  {
    label: "打开",
    action: () => console.log("打开")
  },
  { type: "divider" },
  {
    label: "保存",
    action: () => console.log("保存")
  }
]);
</script>
```

:::

### 右键菜单

:::demo

```vue
<template>
  <x-menu :menu="contextMenu" trigger="contextmenu">
    <div class="context-area">右键点击此区域</div>
  </x-menu>
</template>

<script setup>
import { ref } from 'vue';

// 右键菜单
const contextMenu = ref([
  {
    label: "刷新",
    icon: "mdi:refresh",
    action: () => console.log("刷新")
  },
  { type: "divider" },
  {
    label: "复制",
    icon: "mdi:content-copy",
    action: () => console.log("复制")
  },
  {
    label: "粘贴",
    icon: "mdi:content-paste",
    action: () => console.log("粘贴")
  }
]);
</script>

<style scoped lang="scss">
.context-area {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--x-border-color);
  border-radius: var(--x-border-radius-base);
  color: var(--x-text-color-secondary);
  margin-bottom: var(--x-gap-medium);
}
</style>
```

:::

### 不同位置

:::demo

```vue
<template>
  <x-menu :menu="basicMenu" placement="bottom-start">
    <x-button>下方左对齐</x-button>
  </x-menu>
  <x-menu :menu="basicMenu" placement="right-start">
    <x-button>右侧顶部对齐</x-button>
  </x-menu>
  <x-menu :menu="basicMenu" placement="left-start">
    <x-button>左侧顶部对齐</x-button>
  </x-menu>
</template>

<script setup>
import { ref } from 'vue';

// 基础菜单
const basicMenu = ref([
  {
    label: "新建",
    action: () => console.log("新建")
  },
  {
    label: "打开",
    action: () => console.log("打开")
  },
  { type: "divider" },
  {
    label: "保存",
    action: () => console.log("保存")
  }
]);
</script>
```

:::

### 带图标

:::demo

```vue
<template>
  <x-menu :menu="iconMenu">
    <x-button>带图标的菜单</x-button>
  </x-menu>
</template>

<script setup>
import { ref } from 'vue';

// 带图标的菜单
const iconMenu = ref([
  {
    label: "新建文件",
    icon: "mdi:file-plus",
    action: () => console.log("新建文件")
  },
  {
    label: "新建文件夹",
    icon: "mdi:folder-plus",
    action: () => console.log("新建文件夹")
  },
  { type: "divider" },
  {
    label: "设置",
    icon: "mdi:cog",
    action: () => console.log("设置")
  }
]);
</script>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <x-menu :menu="disabledMenu">
    <x-button>部分选项禁用</x-button>
  </x-menu>
</template>

<script setup>
import { ref } from 'vue';

// 禁用状态菜单
const disabledMenu = ref([
  {
    label: "剪切",
    disabled: true
  },
  {
    label: "复制",
    action: () => console.log("复制")
  },
  {
    label: "粘贴",
    disabled: true
  }
]);
</script>
```

:::

### 多级菜单

:::demo

```vue
<template>
  <x-menu :menu="nestedMenu">
    <x-button>二级菜单</x-button>
  </x-menu>

  <x-menu :menu="nestedMenu2">
    <x-button>多级菜单</x-button>
  </x-menu>
</template>

<script setup>
import { ref } from 'vue';

// 多级菜单
const nestedMenu = ref([
  {
    label: "新建",
    children: [
      {
        label: "文件",
        action: () => console.log("新建文件")
      },
      {
        label: "文件夹",
        action: () => console.log("新建文件夹")
      }
    ]
  },
  { type: "divider" },
  {
    label: "更多操作",
    children: [
      {
        label: "导入",
        action: () => console.log("导入")
      },
      {
        label: "导出",
        action: () => console.log("导出")
      }
    ]
  }
]);

// 多级菜单2
const nestedMenu2 = ref([
  {
    label: "新建",
    children: [
      {
        label: "文件",
        children: [
          {
            label: "文件1",
            action: () => console.log("文件1")
          },
          {
            label: "文件2",
            action: () => console.log("文件2")
          }
        ]
      }
    ]
  },
  { type: "divider" },
  {
    label: "更多操作",
    children: [
      {
        label: "导入",
        icon: "mdi:import",
        action: () => console.log("导入")
      },
      {
        label: "导出",
        icon: "mdi:export",
        action: () => console.log("导出")
      },
      {
        label: "隐藏菜单",
        hidden: true
      },
      { type: "divider" },
      {
        label: "其他",
        children: [
          {
            label: "其他1",
            action: () => console.log("其他1")
          },
          {
            label: "其他2",
            disabled: true
          }
        ]
      }
    ]
  }
]);
</script>
```

:::

## TypeScript

```ts
// 弹出位置类型
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

// 菜单项类型
export interface MenuItem {
  // 菜单项类型，默认为普通菜单项，divider 为分割线
  type?: 'divider' | 'item';
  // 菜单项文本
  label?: string;
  // 菜单项图标
  icon?: string;
  // 点击菜单项时的回调函数
  action?: () => void;
  // 子菜单项
  children?: MenuItem[];
  // 是否禁用
  disabled?: boolean;
  // 是否隐藏
  hidden?: boolean;
}
```
