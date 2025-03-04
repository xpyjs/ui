<template>
  <div class="demo-container">
    <Demo title="基础用法">
      <x-button @click="() => (visible = true)">显示消息</x-button>
      <x-message v-model:visible="visible" content="这是一条基础消息提示" />

      <x-button @click="showBasic">命令式调用</x-button>
    </Demo>

    <Demo title="不同类型">
      <x-button type="default" @click="showDefault">默认消息</x-button>
      <x-button type="info" @click="showInfo">信息消息</x-button>
      <x-button type="success" @click="showSuccess">成功消息</x-button>
      <x-button type="warning" @click="showWarning">警告消息</x-button>
      <x-button type="error" @click="showError">错误消息</x-button>
    </Demo>

    <Demo title="不同位置">
      <x-button @click="showTop">顶部显示</x-button>
      <x-button @click="showCenter">居中显示</x-button>
      <x-button @click="showBottom">底部显示</x-button>
      <x-button @click="showCustom">自定义位置</x-button>
    </Demo>

    <Demo title="手动关闭">
      <x-button @click="showClosable">可关闭消息</x-button>
      <x-button @click="showNoClosable">不可关闭消息</x-button>
    </Demo>

    <Demo title="自定义时长">
      <x-button @click="showDuration">显示 10 秒</x-button>
      <x-button @click="showNoDuration">不自动关闭</x-button>
    </Demo>

    <Demo title="多行文本">
      <x-button @click="showMultiline">多行文本</x-button>
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
const { proxy } = getCurrentInstance()!;

// 基础用法
const showBasic = () => {
  proxy?.$message("这是一条基础消息提示");
};

// 不同类型
const showDefault = () => {
  proxy?.$message({
    type: "default",
    content: "这是一条默认消息"
  });
};

const showInfo = () => {
  proxy?.$message({
    type: "info",
    content: "这是一条信息消息"
  });
};

const showSuccess = () => {
  proxy?.$message({
    type: "success",
    content: "这是一条成功消息"
  });
};

const showWarning = () => {
  proxy?.$message({
    type: "warning",
    content: "这是一条警告消息"
  });
};

const showError = () => {
  proxy?.$message({
    type: "error",
    content: "这是一条错误消息"
  });
};

// 不同位置
const showTop = () => {
  proxy?.$message({
    content: "顶部显示的消息",
    top: "top"
  });
};

const showCenter = () => {
  proxy?.$message({
    content: "居中显示的消息",
    top: "center"
  });
};

const showBottom = () => {
  proxy?.$message({
    content: "底部显示的消息",
    top: "bottom"
  });
};

const showCustom = () => {
  proxy?.$message({
    content: "自定义位置的消息",
    top: "30vh"
  });
};

// 手动关闭
const showClosable = () => {
  proxy?.$message({
    content: "点击关闭按钮可以关闭消息",
    closable: true
  });
};

const showNoClosable = () => {
  proxy?.$message({
    content: "这条消息不能手动关闭",
    closable: false
  });
};

// 自定义时长
const showDuration = () => {
  proxy?.$message({
    content: "这条消息将显示 10 秒",
    duration: 10000
  });
};

const showNoDuration = () => {
  proxy?.$message({
    content: "这条消息不会自动关闭",
    duration: 0
  });
};

// 多行文本
const showMultiline = () => {
  proxy?.$message({
    content: `这是一条多行消息提示
第二行内容
第三行内容`
  });
};

// 不同动画
const showFade = () => {
  proxy?.$message({
    content: "淡入淡出动画",
    transitionName: "x-fade"
  });
};

const showZoom = () => {
  proxy?.$message({
    content: "缩放动画",
    transitionName: "x-zoom"
  });
};

const showSlide = () => {
  proxy?.$message({
    content: "滑动动画",
    transitionName: "x-slide-down"
  });
};

const noTransition = () => {
  proxy?.$message({
    content: "无动画效果",
    transitionName: false
  });
};
</script>
