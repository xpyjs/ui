<template>
  <div class="x-color-input">
    <!-- 格式切换 -->
    <x-radio-button-group
      v-model="currentFormat"
      size="small"
      class="x-color-input__format"
    >
      <x-radio-button v-for="item in formats" :key="item" :value="item">
        {{ item.toUpperCase() }}
      </x-radio-button>
    </x-radio-button-group>

    <!-- 颜色值输入 -->
    <div class="x-color-input__fields">
      <template v-if="currentFormat === 'hex'">
        <div class="x-color-input__field">
          <span class="x-color-input__field-label">HEX</span>
          <x-input
            :model-value="hexValue"
            size="small"
            spellcheck="false"
            placeholder="#00000000"
            @change="handleHexChange"
          />
        </div>
      </template>

      <template v-else-if="currentFormat === 'rgb'">
        <div
          v-for="(field, index) in rgbFields"
          :key="field"
          class="x-color-input__field"
        >
          <span class="x-color-input__field-label">{{ field }}</span>
          <x-input-number
            v-model="rgbValues[index]"
            size="small"
            placeholder="0-255"
            :min="0"
            :max="255"
            :precision="0"
            @change="(v: number) => handleRgbChange(v, index)"
          />
        </div>
      </template>

      <template v-else-if="currentFormat === 'hsl'">
        <div
          v-for="(field, index) in hslFields"
          :key="field"
          class="x-color-input__field"
        >
          <span class="x-color-input__field-label">{{ field }}</span>
          <x-input-number
            v-model="hslValues[index]"
            size="small"
            :placeholder="index === 0 ? '0-360' : '0-100'"
            :min="index === 0 ? 0 : 0"
            :max="index === 0 ? 360 : 100"
            :precision="0"
            @change="(v: number) => handleHslChange(v, index)"
          />
        </div>
      </template>

      <!-- Alpha 输入 -->
      <div v-if="showAlpha" class="x-color-input__field">
        <span class="x-color-input__field-label">A</span>
        <x-input-number
          v-model="alphaValue"
          size="small"
          placeholder="0-100"
          :min="0"
          :max="100"
          :precision="0"
          @change="handleAlphaChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import XRadioButton from "@/components/radio-button/index.ts";
import XRadioButtonGroup from "@/components/radio-button-group/index.ts";
import XInput from "@/components/input/index.ts";
import XInputNumber from "@/components/input-number/index.ts";
import {
  formatColor,
  parseColor,
  rgbToHsl,
  hslToRgb,
  type RGBColor
} from "@/utils/color";

const props = defineProps<{
  color: RGBColor;
  showAlpha?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:color", color: RGBColor): void;
}>();

// 支持的格式
const formats = ["hex", "rgb", "hsl"] as const;
const currentFormat = ref<(typeof formats)[number]>("hex");

// RGB 字段
const rgbFields = ["R", "G", "B"];
const rgbValues = ref([0, 0, 0]);

// HSL 字段
const hslFields = ["H", "S", "L"];
const hslValues = ref([0, 0, 0]);

// Alpha 值
const alphaValue = ref(100);

// Hex 值
const hexValue = computed(() => formatColor(props.color, "hex") || "");

// 更新所有值
const updateValues = (color: RGBColor) => {
  rgbValues.value = [color.r, color.g, color.b];
  const hsl = rgbToHsl(color);
  hslValues.value = [hsl.h, hsl.s, hsl.l];
  alphaValue.value = Math.round((color.a ?? 1) * 100);
};

// 监听颜色变化
watch(
  () => props.color,
  value => {
    updateValues(value);
  },
  { immediate: true }
);

// 处理 Hex 变化
const handleHexChange = (value: string) => {
  const color = parseColor(value);
  if (color) {
    emit("update:color", {
      ...color,
      a: props.showAlpha ? color.a : props.color.a
    });
  }
};

// 处理 RGB 变化
const handleRgbChange = (value: number, index: number) => {
  rgbValues.value[index] = value;
  emit("update:color", {
    r: Number(rgbValues.value[0]),
    g: Number(rgbValues.value[1]),
    b: Number(rgbValues.value[2]),
    a: props.showAlpha ? props.color.a : 1
  });
};

// 处理 HSL 变化
const handleHslChange = (value: number, index: number) => {
  hslValues.value[index] = value;
  const rgb = hslToRgb({
    h: Number(hslValues.value[0]),
    s: Number(hslValues.value[1]),
    l: Number(hslValues.value[2])
  });
  emit("update:color", {
    ...rgb,
    a: props.showAlpha ? props.color.a : 1
  });
};

// 处理透明度变化
const handleAlphaChange = (value: number) => {
  alphaValue.value = value;
  emit("update:color", {
    ...props.color,
    a: props.showAlpha ? Number(alphaValue.value) / 100 : 1
  });
};
</script>
