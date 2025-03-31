---
outline: [2, 3]
---

<style>
  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Information 信息提示

Information 组件用于展示用户需要关注的信息提示，支持不同类型的提示、自定义内容和多种显示位置。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否可见 |
| title | `string` | - | 标题 |
| content | `string` | - | 内容 |
| type | `InformationType` | `default` | 消息类型 |
| position | `Position` | `top-right` | 显示位置 |
| duration | `number` | `3000` | 显示时长(ms), 0 表示不自动关闭 |
| closable | `boolean` | `true` | 是否可关闭 |
| enterable | `boolean` | `true` | 鼠标移入是否暂停关闭 |
| transitionName | `TransitionName` \| `false` | - | 过渡动画名称，不传则根据位置自动判断。`false` 表示不使用动画 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 自定义内容 | - |
| title | 自定义标题 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:visible | 可见状态变化时触发 | `(visible: boolean) => void` |
| close | 关闭后触发 | - |

## 全局方法

除了组件方式使用外，X-UI 还提供了全局方法 `$information` 和 `useInformation` 钩子来使用 Information 组件。

### 命令式创建

```ts
// 使用方法
this.$information(options);
```

### Hooks 方式

```ts
import { useInformation } from '@xpyjs/x-ui';

// 在 setup 中使用
const { information } = useInformation();
information(options);
```

## 示例

### 基础用法

使用 `v-model:visible` 来控制信息提示的显示和隐藏。

:::demo

```vue
<template>
  <x-button @click="() => (visible = true)">显示信息</x-button>
  <x-information
    v-model:visible="visible"
    title="提示"
    content="这是一条基础信息提示"
  />

  <x-button @click="showBasic">命令式调用</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

const visible = ref(false);
const { proxy } = getCurrentInstance()!;

// 基础用法
const showBasic = () => {
  proxy?.$information({
    title: "提示",
    content: "这是一条基于命令式的基础信息提示"
  });
};
</script>
```

:::

### 不同类型

Information 组件提供了多种类型，包括默认、信息、成功、警告和错误。

:::demo

```vue
<template>
  <x-button type="default" @click="showDefault">默认信息</x-button>
  <x-button type="info" @click="showInfo">信息提示</x-button>
  <x-button type="success" @click="showSuccess">成功提示</x-button>
  <x-button type="warning" @click="showWarning">警告提示</x-button>
  <x-button type="error" @click="showError">错误提示</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 不同类型
const showDefault = () => {
  proxy?.$information({
    type: "default",
    title: "默认提示",
    content: "这是一条默认信息"
  });
};

const showInfo = () => {
  proxy?.$information({
    type: "info",
    title: "信息提示",
    content: "这是一条信息提示"
  });
};

const showSuccess = () => {
  proxy?.$information({
    type: "success",
    title: "成功提示",
    content: "这是一条成功提示"
  });
};

const showWarning = () => {
  proxy?.$information({
    type: "warning",
    title: "警告提示",
    content: "这是一条警告提示"
  });
};

const showError = () => {
  proxy?.$information({
    type: "error",
    title: "错误提示",
    content: "这是一条错误提示"
  });
};
</script>
```

:::

### 不同位置

可以通过 `position` 属性指定信息提示的显示位置。

:::demo

```vue
<template>
  <x-button @click="showTopLeft">左上角</x-button>
  <x-button @click="showTopRight">右上角</x-button>
  <x-button @click="showBottomLeft">左下角</x-button>
  <x-button @click="showBottomRight">右下角</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 不同位置
const showTopLeft = () => {
  proxy?.$information({
    title: "左上角提示",
    content: "这是一条左上角提示信息",
    position: "top-left"
  });
};

const showTopRight = () => {
  proxy?.$information({
    title: "右上角提示",
    content: "这是一条右上角提示信息",
    position: "top-right"
  });
};

const showBottomLeft = () => {
  proxy?.$information({
    title: "左下角提示",
    content: "这是一条左下角提示信息",
    position: "bottom-left"
  });
};

const showBottomRight = () => {
  proxy?.$information({
    title: "右下角提示",
    content: "这是一条右下角提示信息",
    position: "bottom-right"
  });
};
</script>
```

:::

### 自定义内容

通过默认插槽可以自定义信息提示的内容。

:::demo

```vue
<template>
  <x-button @click="visible2 = true">自定义内容</x-button>
  <x-information v-model:visible="visible2" title="自定义内容">
    <template #default>
      <div class="custom-content">
        <p>这是一段自定义内容</p>
        <x-button type="primary" size="small" @click="visible2 = false">
          确认
        </x-button>
      </div>
    </template>
  </x-information>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible2 = ref(false);
</script>

<style scoped>
.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
```

:::

### 自定义标题

通过 title 插槽可以自定义信息提示的标题。

:::demo

```vue
<template>
  <x-button @click="visible3 = true">自定义标题</x-button>
  <x-information v-model:visible="visible3">
    <template #title>
      <div class="custom-title">
        <x-icon name="mdi:alert" />
        <span>重要提示</span>
      </div>
    </template>
    这是一条重要提示信息
  </x-information>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible3 = ref(false);
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--x-color-warning);
}
</style>
```

:::

### 不同动画

通过 `transitionName` 属性可以设置不同的过渡动画。

:::demo

```vue
<template>
  <x-button @click="showFade">淡入淡出</x-button>
  <x-button @click="showZoom">缩放</x-button>
  <x-button @click="showSlide">滑动</x-button>
  <x-button @click="noTransition">无动画</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

// 不同动画
const showFade = () => {
  proxy?.$information({
    title: "淡入淡出",
    content: "这是一条使用淡入淡出动画的提示",
    transitionName: "x-fade"
  });
};

const showZoom = () => {
  proxy?.$information({
    title: "缩放动画",
    content: "这是一条使用缩放动画的提示",
    transitionName: "x-zoom"
  });
};

const showSlide = () => {
  proxy?.$information({
    title: "滑动动画",
    content: "这是一条使用滑动动画的提示",
    transitionName: "x-slide"
  });
};

const noTransition = () => {
  proxy?.$information({
    title: "无动画",
    content: "这是一条没有动画效果的提示",
    transitionName: false
  });
};
</script>
```

:::

## TypeScript

```ts
// 消息类型
type InformationType = 'default' | 'info' | 'success' | 'warning' | 'error';

// 位置
type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// 动画名称
type TransitionName =
  | 'x-fade'
  | 'x-zoom'
  | 'x-slide'
  | 'x-slide-up'
  | 'x-slide-down'
  | 'x-slide-left'
  | 'x-slide-right';

// 全局方法选项
export interface InformationOptions
  extends Partial<Omit<InformationProps, 'visible'>> {
  /**
   * 传递给内容组件的 props
   */
  componentProps?: Record<string, any>;
}
```
