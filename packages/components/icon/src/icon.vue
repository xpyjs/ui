<template>
  <template v-if="svgContent">
    <i
      v-html="svgContent"
      aria-hidden="true"
      :style="iconStyle"
      class="x-icon"
    />
  </template>

  <i v-else :style="iconStyle" class="x-icon">
    <!-- 自定义图片格式优先级最高 -->
    <img
      v-if="url"
      :src="url"
      alt="x-ui custom icon"
      :style="{
        ...iconStyle,
        width: `${size}px`,
        height: `${size}px`
      }"
      crossorigin="anonymous"
    />

    <!-- 内置图标 -->
    <Icon v-else :icon="name" :style="iconStyle" />
  </i>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import { type IconProps } from "./props";
import { wrapSize } from "@/utils/size";

defineOptions({
  name: "XIcon"
});

const props = withDefaults(defineProps<IconProps>(), {
  name: "",
  content: "",
  color: "currentColor",
  size: "1em"
});

const svgContent = ref("");
const url = ref("");

const iconStyle = computed(() => {
  const { color, size } = props;

  return {
    fontSize: wrapSize(size, "1em"),
    color
  };
});

function processSvgContent(content: string) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(content, "image/svg+xml");
  const svgElement = svgDoc.querySelector("svg");

  if (svgElement) {
    const { color, size } = props;
    svgElement.setAttribute("fill", color || "currentColor");
    svgElement.setAttribute("width", wrapSize(size, "1em"));
    svgElement.setAttribute("height", wrapSize(size, "1em"));

    const title = svgElement.querySelector("title");
    if (title) {
      svgElement.removeChild(title);
    }

    return svgElement.outerHTML;
  }
  return "";
}

watchEffect(() => {
  if (props.content) {
    svgContent.value = processSvgContent(props.content);
  } else {
    const isUrl = props.name.startsWith("url:");
    if (isUrl) {
      url.value = props.name.slice(4);
    }
  }
});
</script>
