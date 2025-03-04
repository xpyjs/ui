<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-menu :menu="basicMenu">
        <x-button>点击打开菜单</x-button>
      </x-menu>
    </Demo>

    <Demo title="右键菜单">
      <x-menu :menu="contextMenu" trigger="contextmenu">
        <div class="context-area">右键点击此区域</div>
      </x-menu>
    </Demo>

    <Demo title="不同位置">
      <x-menu :menu="basicMenu" placement="bottom-start">
        <x-button>下方左对齐</x-button>
      </x-menu>
      <x-menu :menu="basicMenu" placement="right-start">
        <x-button>右侧顶部对齐</x-button>
      </x-menu>
      <x-menu :menu="basicMenu" placement="left-start">
        <x-button>左侧顶部对齐</x-button>
      </x-menu>
    </Demo>

    <Demo title="带图标">
      <x-menu :menu="iconMenu">
        <x-button>带图标的菜单</x-button>
      </x-menu>
    </Demo>

    <Demo title="禁用状态">
      <x-menu :menu="disabledMenu">
        <x-button>部分选项禁用</x-button>
      </x-menu>
    </Demo>

    <Demo title="多级菜单">
      <x-menu :menu="nestedMenu">
        <x-button>二级菜单</x-button>
      </x-menu>

      <x-menu :menu="nestedMenu2">
        <x-button>多级菜单</x-button>
      </x-menu>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Demo from "../../components/Demo.vue";

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

<style lang="scss" scoped>
.context-area {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--x-border-color);
  border-radius: var(--x-border-radius-base);
  color: var(--x-text-color-secondary);
}
</style>
