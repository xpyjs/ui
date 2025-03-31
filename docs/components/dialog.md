---
outline: [2, 3]
---

<style>
  .demo-dialog-button {
    margin-right: var(--x-gap-medium);
    margin-bottom: var(--x-gap-medium);
  }
</style>

# Dialog 对话框

对话框组件用于在不离开当前页面的情况下，显示需要用户进行操作的内容。通常用于确认信息、警告提示、展示表单等场景。

## 参数

### Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示对话框 |
| appendTo | `string \| HTMLElement` | `body` | 对话框挂载的节点 |
| esc | `boolean` | `true` | 是否按下ESC键关闭对话框 |
| lockScroll | `boolean` | `true` | 是否在对话框显示时锁定页面滚动 |
| mask | `boolean` | `true` | 是否显示遮罩层 |
| maskClosable | `boolean` | `true` | 是否点击遮罩层关闭对话框 |
| fullscreen | `boolean` | `false` | 是否全屏显示 |
| zIndex | `number` | `4000` | 对话框的层级 |
| transitionName | `TransitionName` \| false | - | 对话框的过渡名称。false 不使用动画 |
| title | `string` | - | 对话框标题 |
| width | `string \| number` | `500px` | 对话框宽度 |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| top | `string \| number` | `15vh` | 对话框距离顶部的距离 |
| center | `boolean` | `false` | 是否对头部和底部采用居中布局 |
| vertical | `VerticalAlign` | `top` | 垂直对齐方式 |
| bodyHeight | `string` \| `number` | - | 固定内容高度 |
| showFooter | `boolean` | `true` | 是否显示底部区域 |
| customClass | `string` | - | 自定义类名 |

### Slots

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| default | 对话框内容 | - |
| title | 对话框标题区内容 | - |
| footer | 对话框底部内容 | - |

### Events

| 名称 | 描述 | 参数 |
| --- | --- | --- |
| show | 对话框打开时触发 | - |
| shown | 对话框打开动画结束时触发 | - |
| hide | 对话框关闭时触发 | - |
| hidden | 对话框关闭动画结束时触发 | - |
| cancel | 对话框取消时触发 | - |
| confirm | 对话框确认时触发 | - |
| update:visible | 对话框显示状态变化时触发 | `(value: boolean) => void` |

## 示例

### 基础用法

通过控制 `v-model` 属性来显示/隐藏对话框。

:::demo

```vue
<template>
  <XButton @click="visible = true">打开对话框</XButton>
  <XDialog v-model:visible="visible" title="基础对话框">
    <div class="dialog-content">
      <p>这是一个基础对话框示例</p>
      <p>支持通过插槽自定义内容</p>
    </div>
    <template #footer>
      <XButton @click="visible = false">取消</XButton>
      <XButton type="primary" @click="visible = false">确定</XButton>
    </template>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
</script>
```

:::

### 全屏对话框

通过设置 `fullscreen` 属性可以让对话框全屏显示。

:::demo

```vue
<template>
  <XButton @click="visible = true">全屏模式</XButton>
  <XDialog v-model:visible="visible" title="全屏对话框" fullscreen>
    <div class="dialog-content">
      <p>这是一个全屏显示的对话框</p>
      <p>内容区域会自动适应屏幕高度</p>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
</script>
```

:::

### 自定义宽度

通过设置 `width` 属性可以自定义对话框的宽度。

:::demo

```vue
<template>
  <XButton @click="visible = true">自定义宽度</XButton>
  <XDialog v-model:visible="visible" title="宽对话框" width="800px">
    <div class="dialog-content">
      <p>这个对话框的宽度设置为800px</p>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
</script>
```

:::

### 内容高度过长

当内容高度超过对话框默认高度时，可以通过设置 `body-height` 属性来控制内容区域高度。

:::demo

```vue
<template>
  <XButton @click="visible1 = true">内容高度过长，没有设置高度</XButton>
  <XDialog v-model:visible="visible1" title="内容过长">
    <div class="dialog-content">
      <template v-for="i in 100" :key="i">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </template>
    </div>
  </XDialog>

  <XButton @click="visible2 = true">内容高度过长，设置高度</XButton>
  <XDialog v-model:visible="visible2" title="内容过长" body-height="500px">
    <div class="dialog-content">
      <template v-for="i in 100" :key="i">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </template>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible1 = ref(false);
const visible2 = ref(false);
</script>
```

:::

### 子对话框

对话框可以嵌套使用，创建多层对话框。

:::demo

```vue
<template>
  <XButton @click="visibleParent = true">子对话框</XButton>
  <XDialog
    v-model:visible="visibleParent"
    title="子对话框示例"
    :show-footer="false"
  >
    <div class="dialog-content">
      <p>这个是父对话框</p>
      <XButton @click="visibleChild = true">打开子对话框</XButton>
      <XDialog
        v-model:visible="visibleChild"
        title="子对话框"
        top="20vh"
        width="200px"
      >
        <p>这个是子对话框</p>
      </XDialog>
    </div>
  </XDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visibleParent = ref(false);
const visibleChild = ref(false);
</script>
```

:::

### 命令式创建

除了使用组件方式创建对话框外，还可以通过 JavaScript 命令式创建。

:::demo

```vue
<template>
  <x-button @click="showDialog">全局命令打开对话框</x-button>
  <x-button @click="showDialog2">钩子方法打开对话框</x-button>
</template>

<script setup lang="ts">
import { defineComponent, getCurrentInstance, h } from "vue";
import { useDialog, XButton, XDialog } from "@xpyjs/x-ui";

const comp = defineComponent({
  setup(props: any, { emit }) {
    const handleConfirm = () => {
      // 确认时可以传递任何值
      emit("confirm", { status: "success", data: "some data" });
    };

    const handleCancel = () => {
      // 取消时可以传递原因
      emit("cancel", "user cancelled");
    };

    return () =>
      h(
        XDialog,
        {},
        {
          default: () => [
            h("p", "这是一个通过命令式创建的对话框"),
            h("div", { style: "text-align: right; margin-top: 20px" }, [
              h(
                XButton,
                {
                  onClick: handleCancel,
                  style: "margin-right: 8px"
                },
                () => "取消"
              ),
              h(
                XButton,
                {
                  type: "primary",
                  onClick: handleConfirm
                },
                () => "确认"
              )
            ])
          ]
        }
      );
  }
})

const { proxy } = getCurrentInstance()!;
const showDialog = () => {
  proxy
    ?.$dialog(
      comp,
      {
        title: "全局命令打开对话框",
        width: "400px",
        showFooter: false
      }
    )
    .then(result => {
      console.log("对话框确认:", result);
    })
    .catch(reason => {
      console.log("对话框取消/关闭:", reason);
    });
};

const { dialog } = useDialog();
const showDialog2 = () => {
  dialog(
    comp,
    {
      title: "钩子方法打开对话框",
      width: "500px",
      showFooter: false
    }
  )
  .then(result => {
    console.log("对话框确认:", result);
  })
  .catch(reason => {
    console.log("对话框取消/关闭:", reason);
  });
};
</script>
```

:::

## TypeScript

```ts
// 动画名称
export type TransitionName =
  | "x-fade"
  | "x-zoom"
  | "x-slide"
  | "x-slide-up"
  | "x-slide-down"
  | "x-slide-left"
  | "x-slide-right";

export type VerticalAlign = "top" | "bottom" | "center";
```

### 命令式创建声明

```ts

export interface DialogOptions extends Partial<DialogProps> {
  /**
   * 传递给内容组件的 props
   */
  componentProps?: Record<string, any>;
}

export interface DialogInstance {
  /**
   * 关闭对话框
   */
  close: (value?: any) => void;
  /**
   * 更新对话框属性
   */
  update: (options: DialogOptions) => void;
}

export type DialogReturn = Promise<any> & {
  /**
   * 对话框实例
   */
  instance: DialogInstance;
};
```
