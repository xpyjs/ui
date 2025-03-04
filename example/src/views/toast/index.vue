<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-button @click="() => (visible = true)">显示提示</x-button>
      <x-toast v-model:visible="visible" content="这是一条基础提示消息" />

      <x-button @click="showBasic">命令式</x-button>
    </Demo>

    <Demo title="手动关闭">
      <x-button @click="() => (visible2 = true)">显示提示</x-button>
      <x-button @click="() => (visible2 = false)">手动关闭</x-button>
      <x-toast v-model:visible="visible2" content="这是一条基础提示消息" />
    </Demo>

    <Demo title="不同类型">
      <x-button type="default" @click="showDefault">默认提示</x-button>
      <x-button type="info" @click="showInfo">信息提示</x-button>
      <x-button type="success" @click="showSuccess">成功提示</x-button>
      <x-button type="warning" @click="showWarning">警告提示</x-button>
      <x-button type="error" @click="showError">错误提示</x-button>
    </Demo>

    <Demo title="不同位置">
      <x-button @click="showTop">顶部提示</x-button>
      <x-button @click="showCenter">居中提示</x-button>
      <x-button @click="showBottom">底部提示</x-button>
      <x-button @click="showCustom">自定义位置</x-button>
    </Demo>

    <Demo title="自定义图标">
      <x-button @click="showCustomIcon">自定义图标</x-button>
    </Demo>

    <Demo title="反转颜色">
      <x-button @click="showInverse">反转颜色</x-button>
    </Demo>

    <Demo title="自定义时长">
      <x-button @click="showDuration">显示 10 秒</x-button>
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

const { proxy } = getCurrentInstance()!;
const showBasic = () => {
  proxy.$toast({
    content: "这是一条基于命令式的基础提示消息"
  });
};

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

const showCustomIcon = () => {
  proxy.$toast({
    content: "自定义图标提示消息",
    icon: "line-md:coffee-loop"
  });
};

const showInverse = () => {
  proxy.$toast({
    content: "反转颜色提示消息",
    inverse: false
  });
};

const showDuration = () => {
  proxy.$toast({
    content: "显示 10 秒的提示消息",
    duration: 10000
  });
};

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
