---
outline: [2, 3]
---

<style>
  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Toast 提示

Toast 提示组件用于在页面上显示简短的提示信息，通常在一段时间后自动消失。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示提示 |
| content | `string` | `''` | 提示内容 |
| type | `ToastType` | `'default'` | 提示类型 |
| top | `VerticalAlign \| string \| number` | `'top'` | 提示位置，可传入 top/center/bottom 或具体位置值 |
| icon | `string` | `''` | 自定义图标 |
| inverse | `boolean` | `true` | 是否反转颜色 |
| duration | `number` | `3000` | 显示时长（毫秒），设为 0 则不自动关闭 |
| transitionName | `TransitionName \| false` | `'x-fade'` | 过渡动画名称，设为 false 则无动画 |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:visible | 可见状态变化时触发 | `(visible: boolean) => void` |
| close | 关闭后触发 | - |

## 全局方法

除了组件方式使用外，X-UI 还提供了全局方法 `$toast` 和 `useToast` 钩子来使用 Toast 组件。

### 命令式创建

```ts
// 使用方法
this.$toast(options);

// 或简写形式（直接传入内容）
this.$toast('这是一条提示消息');
```

### Hooks 方式

```ts
import { useToast } from '@xpyjs/x-ui';

// 在 setup 中使用
const { toast } = useToast();
toast(options);
// 或简写形式
toast('这是一条提示消息');
```

## 示例

### 基础用法

使用 `v-model:visible` 来控制提示的显示和隐藏。

:::demo

```vue
<template>
  <x-button @click="() => (visible = true)">显示提示</x-button>
  <x-toast v-model:visible="visible" content="这是一条基础提示消息" />

  <x-button @click="showBasic">命令式</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

const visible = ref(false);
const { proxy } = getCurrentInstance()!;
const showBasic = () => {
  proxy.$toast({
    content: "这是一条基于命令式的基础提示消息"
  });
};
</script>
```

:::

### 手动关闭

可以通过控制 `visible` 状态来手动关闭 Toast。

:::demo

```vue
<template>
  <x-button @click="() => (visible2 = true)">显示提示</x-button>
  <x-button @click="() => (visible2 = false)">手动关闭</x-button>
  <x-toast v-model:visible="visible2" content="这是一条基础提示消息" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible2 = ref(false);
</script>
```

:::

### 不同类型

Toast 组件提供了多种类型，包括默认、信息、成功、警告和错误。

:::demo

```vue
<template>
  <x-button type="default" @click="showDefault">默认提示</x-button>
  <x-button type="info" @click="showInfo">信息提示</x-button>
  <x-button type="success" @click="showSuccess">成功提示</x-button>
  <x-button type="warning" @click="showWarning">警告提示</x-button>
  <x-button type="error" @click="showError">错误提示</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

const showDefault = () => {
  proxy.$toast({
    type: "default",
    content: "这是一条默认提示消息"
  });
};

const showInfo = () => {
  proxy.$toast({
    type: "info",
    content: "这是一条信息提示消息"
  });
};

const showSuccess = () => {
  proxy.$toast({
    type: "success",
    content: "这是一条成功提示消息"
  });
};

const showWarning = () => {
  proxy.$toast({
    type: "warning",
    content: "这是一条警告提示消息"
  });
};

const showError = () => {
  proxy.$toast({
    type: "error",
    content: "这是一条错误提示消息"
  });
};
</script>
```

:::

### 不同位置

可以通过 `top` 属性指定提示的显示位置。

:::demo

```vue
<template>
  <x-button @click="showTop">顶部提示</x-button>
  <x-button @click="showCenter">居中提示</x-button>
  <x-button @click="showBottom">底部提示</x-button>
  <x-button @click="showCustom">自定义位置</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

const showTop = () => {
  proxy.$toast({
    content: "顶部提示消息",
    top: "top"
  });
};

const showCenter = () => {
  proxy.$toast({
    content: "居中提示消息",
    top: "center"
  });
};

const showBottom = () => {
  proxy.$toast({
    content: "底部提示消息",
    top: "bottom"
  });
};

const showCustom = () => {
  proxy.$toast({
    content: "自定义位置提示消息",
    top: "30vh"
  });
};
</script>
```

:::

### 自定义图标

可以通过 `icon` 属性自定义提示的图标。

:::demo

```vue
<template>
  <x-button @click="showCustomIcon">自定义图标</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

const showCustomIcon = () => {
  proxy.$toast({
    content: "自定义图标提示消息",
    icon: "line-md:coffee-loop"
  });
};
</script>
```

:::

### 反转颜色

通过 `inverse` 属性可以控制是否使用反转颜色。

:::demo

```vue
<template>
  <x-button @click="showInverse">反转颜色</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

const showInverse = () => {
  proxy.$toast({
    content: "反转颜色提示消息",
    inverse: false
  });
};
</script>
```

:::

### 自定义时长

通过 `duration` 属性可以自定义提示显示的时长。

:::demo

```vue
<template>
  <x-button @click="showDuration">显示 10 秒</x-button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;

const showDuration = () => {
  proxy.$toast({
    content: "显示 10 秒的提示消息",
    duration: 10000
  });
};
</script>
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

const showFade = () => {
  proxy.$toast({
    content: "淡入淡出动画",
    transitionName: "x-fade"
  });
};

const showZoom = () => {
  proxy.$toast({
    content: "缩放动画",
    transitionName: "x-zoom"
  });
};

const showSlide = () => {
  proxy.$toast({
    content: "滑动动画",
    transitionName: "x-slide-down"
  });
};

const noTransition = () => {
  proxy.$toast({
    content: "无动画效果",
    transitionName: false
  });
};
</script>
```

:::

## TypeScript

```ts
// Toast 类型
type ToastType = Omit<ComponentType, "secondary">;

// 垂直位置
type VerticalAlign = "top" | "center" | "bottom";

// 动画名称
type TransitionName =
  | "x-fade"
  | "x-zoom"
  | "x-slide"
  | "x-slide-up"
  | "x-slide-down"
  | "x-slide-left"
  | "x-slide-right";

// 基础颜色类型
type ComponentType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

// 全局方法选项
export type ToastOptions = Partial<Omit<ToastProps, "visible">> | string;
```
