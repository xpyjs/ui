<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-button @click="() => (visible = true)">显示信息</x-button>
      <x-information
        v-model:visible="visible"
        title="提示"
        content="这是一条基础信息提示"
      />

      <x-button @click="showBasic">命令式调用</x-button>
    </Demo>

    <Demo title="不同类型">
      <x-button type="default" @click="showDefault">默认信息</x-button>
      <x-button type="info" @click="showInfo">信息提示</x-button>
      <x-button type="success" @click="showSuccess">成功提示</x-button>
      <x-button type="warning" @click="showWarning">警告提示</x-button>
      <x-button type="error" @click="showError">错误提示</x-button>
    </Demo>

    <Demo title="不同位置">
      <x-button @click="showTopLeft">左上角</x-button>
      <x-button @click="showTopRight">右上角</x-button>
      <x-button @click="showBottomLeft">左下角</x-button>
      <x-button @click="showBottomRight">右下角</x-button>
    </Demo>

    <Demo title="自定义内容">
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
    </Demo>

    <Demo title="自定义标题">
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
    </Demo>

    <Demo title="不同动画">
      <x-button @click="showFade">淡入淡出</x-button>
      <x-button @click="showZoom">缩放</x-button>
      <x-button @click="showSlide">滑动</x-button>
      <x-button @click="noTransition">无动画</x-button>
    </Demo>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import Demo from "../../components/Demo.vue";

const visible = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);

const { proxy } = getCurrentInstance()!;

// 基础用法
const showBasic = () => {
  proxy?.$information({
    title: "提示",
    content: "这是一条基于命令式的基础信息提示"
  });
};

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

<style lang="scss" scoped>
.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--x-color-warning);
}
</style>
