---
outline: [2, 3]
---

<style>
  .x-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Popup 弹出框

Popup 组件用于在页面中弹出一个浮层，可以包含任意内容，支持多种触发方式和位置控制。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示弹窗 |
| trigger | `TriggerType` | `'click'` | 触发方式 |
| reference | `Element \| string \| null` | `null` | 手动触发的 reference |
| placement | `PlacementType` | `'bottom'` | 弹出位置 |
| offset | `number` | `8` | 弹窗内容与触发元素的距离 |
| showArrow | `boolean` | `true` | 是否显示箭头 |
| transitionName | `TransitionName \| false` | `'x-fade'` | 过渡动画名称 |
| showDelay | `number` | `100` | 移入延迟时间(ms) |
| hideDelay | `number` | `100` | 移出延迟时间(ms) |
| disabled | `boolean` | `false` | 是否禁用 |
| hideOnClick | `boolean` | `true` | 点击外部是否关闭 |
| enterable | `boolean` | `true` | 是否可以移入弹窗 |
| appendTo | `AppendTo` | `'body'` | 挂载节点 |
| esc | `boolean` | `true` | 是否在按下 Esc 键时关闭 |
| lockScroll | `boolean` | `false` | 是否锁定滚动 |
| autoFocus | `boolean` | `true` | 是否自动聚焦第一个可聚焦元素 |
| restoreFocus | `boolean` | `true` | 关闭时是否恢复焦点 |
| alignWidth | `boolean` | `true` | 是否对齐触发元素的宽度 |
| popupClass | `XClass` | `''` | 弹出层样式类 |
| popupStyle | `XStyle` | `''` | 弹出层样式 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 触发元素 | - |
| content | 弹出内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| update:visible | 可见状态变化时触发 | `(visible: boolean) => void` |
| show | 显示前触发 | - |
| shown | A显示后触发 | - |
| hide | 隐藏前触发 | - |
| hidden | 隐藏后触发 | - |
| click-outside | 点击外部时触发 | `(event: MouseEvent) => void` |

## 示例

### 基础用法

基础的弹出框用法。

:::demo

```vue
<template>
  <x-popup>
    <x-button>打开弹窗</x-button>
    <template #content>
      <div class="popup-content">这是一个基础弹窗</div>
    </template>
  </x-popup>
</template>

<style scoped>
.popup-content {
  padding: 16px;
}
</style>
```

:::

### 不同触发方式

Popup 支持多种触发方式：点击、悬停、右键和手动。

:::demo

```vue
<template>
  <x-popup trigger="click">
    <x-button>点击触发</x-button>
    <template #content>
      <div class="popup-content">点击触发的弹窗</div>
    </template>
  </x-popup>

  <x-popup trigger="hover">
    <x-button>悬停触发</x-button>
    <template #content>
      <div class="popup-content">悬停触发的弹窗</div>
    </template>
  </x-popup>

  <x-popup trigger="contextmenu">
    <x-button>右键触发</x-button>
    <template #content>
      <div class="popup-content">右键触发的弹窗</div>
    </template>
  </x-popup>

  <x-popup trigger="manual" v-model:visible="visible">
    <template #content>
      <div class="popup-content">手动触发的弹窗</div>
    </template>
    <x-button @click="visible = !visible">手动触发</x-button>
  </x-popup>

  <x-popup :reference="triggerRef">
    <template #content>
      <div class="popup-content">指定区域的弹窗</div>
    </template>
    <x-button>指定区域</x-button>
  </x-popup>

  <div ref="triggerRef">弹出框区域</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const triggerRef = ref<HTMLElement>();
</script>

<style scoped>
.popup-content {
  padding: 16px;
}
</style>
```

:::

### 挂载节点

可以指定弹出框挂载的位置。

:::demo

```vue
<template>
  <x-popup append-to="body">
    <x-button>挂载到 body</x-button>
    <template #content>
      <div class="popup-content">这是一个基础弹窗</div>
    </template>
  </x-popup>

  <x-popup :append-to="null">
    <x-button>挂载本地</x-button>
    <template #content>
      <div class="popup-content">这是一个基础弹窗</div>
    </template>
  </x-popup>
</template>

<style scoped>
.popup-content {
  padding: 16px;
}
</style>
```

:::

### 不同位置

Popup 支持12个不同的弹出位置。

:::demo

```vue
<template>
  <div class="placement-demo">
    <div class="top">
      <x-popup placement="top-start">
        <x-button>上左</x-button>
        <template #content>
          <div class="popup-content">top-start</div>
        </template>
      </x-popup>

      <x-popup placement="top">
        <x-button>上中</x-button>
        <template #content>
          <div class="popup-content">top</div>
        </template>
      </x-popup>

      <x-popup placement="top-end">
        <x-button>上右</x-button>
        <template #content>
          <div class="popup-content">top-end</div>
        </template>
      </x-popup>
    </div>

    <div class="left-right">
      <div class="left">
        <x-popup placement="left-start">
          <x-button>左上</x-button>
          <template #content>
            <div class="popup-content">left-start</div>
          </template>
        </x-popup>

        <x-popup placement="left">
          <x-button>左中</x-button>
          <template #content>
            <div class="popup-content">left</div>
          </template>
        </x-popup>

        <x-popup placement="left-end">
          <x-button>左下</x-button>
          <template #content>
            <div class="popup-content">left-end</div>
          </template>
        </x-popup>
      </div>

      <div class="right">
        <x-popup placement="right-start">
          <x-button>右上</x-button>
          <template #content>
            <div class="popup-content">right-start</div>
          </template>
        </x-popup>

        <x-popup placement="right">
          <x-button>右中</x-button>
          <template #content>
            <div class="popup-content">right</div>
          </template>
        </x-popup>

        <x-popup placement="right-end">
          <x-button>右下</x-button>
          <template #content>
            <div class="popup-content">right-end</div>
          </template>
        </x-popup>
      </div>
    </div>

    <div class="bottom">
      <x-popup placement="bottom-start">
        <x-button>下左</x-button>
        <template #content>
          <div class="popup-content">bottom-start</div>
        </template>
      </x-popup>

      <x-popup placement="bottom">
        <x-button>下中</x-button>
        <template #content>
          <div class="popup-content">bottom</div>
        </template>
      </x-popup>

      <x-popup placement="bottom-end">
        <x-button>下右</x-button>
        <template #content>
          <div class="popup-content">bottom-end</div>
        </template>
      </x-popup>
    </div>
  </div>
</template>

<style scoped>
.popup-content {
  padding: 16px;
}

.placement-demo {
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  padding: 100px;

  .top,
  .bottom {
    display: flex;
    gap: 80px;
  }

  .left-right {
    display: flex;
    justify-content: space-between;
    width: 400px;

    .left,
    .right {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>
```

:::

### 过渡动画

可以使用不同的过渡动画效果。

:::demo

```vue
<template>
  <x-popup transition-name="x-fade">
    <x-button>淡入淡出</x-button>
    <template #content>
      <div class="popup-content">fade 动画</div>
    </template>
  </x-popup>

  <x-popup transition-name="x-zoom">
    <x-button>缩放</x-button>
    <template #content>
      <div class="popup-content">zoom 动画</div>
    </template>
  </x-popup>

  <x-popup transition-name="x-slide-up">
    <x-button>滑动</x-button>
    <template #content>
      <div class="popup-content">slide-up 动画</div>
    </template>
  </x-popup>

  <x-popup :transition-name="false">
    <x-button>禁用过度</x-button>
    <template #content>
      <div class="popup-content">没有动画</div>
    </template>
  </x-popup>
</template>

<style scoped>
.popup-content {
  padding: 16px;
}
</style>
```

:::

### 事件

Popup 提供了一系列事件来监听其状态变化。

:::demo

```vue
<template>
  <x-popup
    @show="handleShow"
    @shown="handleShown"
    @hide="handleHide"
    @hidden="handleHidden"
  >
    <x-button>事件</x-button>
    <template #content>
      <div class="popup-content">触发动画事件</div>
    </template>
  </x-popup>
</template>

<script setup lang="ts">
const handleShow = () => {
  console.log("show");
};

const handleShown = () => {
  console.log("shown");
};

const handleHide = () => {
  console.log("hide");
};

const handleHidden = () => {
  console.log("hidden");
};
</script>

<style scoped>
.popup-content {
  padding: 16px;
}
</style>
```

:::

## TypeScript

```ts
// 触发方式
export type TriggerType =
  | "hover"
  | "click"
  | "focus"
  | "contextmenu"
  | "manual";

// 弹出位置
export type PlacementType =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

// 动画名称
export type TransitionName =
  | "x-fade"
  | "x-zoom"
  | "x-slide"
  | "x-slide-up"
  | "x-slide-down"
  | "x-slide-left"
  | "x-slide-right";

// 挂载节点类型
export type AppendTo = HTMLElement | "body" | null;
```
