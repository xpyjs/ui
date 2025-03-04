<template>
  <div
    :class="[
      'x-slider',
      `x-slider--${size}`,
      `x-slider--${type}`,
      {
        'x-slider--vertical': vertical,
        'x-slider--disabled': disabled,
        'x-slider--with-buttons': showButtons && isOneValue
      }
    ]"
  >
    <!-- 减少按钮 -->
    <template v-if="showButtons && isOneValue">
      <IncreaseComp v-if="vertical" @click="handleIncrease" />
      <DecreaseComp v-else @click="handleDecrease" />
    </template>

    <div ref="trackRef" class="x-slider__track" @click="handleTrackClick">
      <!-- 轨道背景 -->
      <div class="x-slider__rail">
        <!-- 选中区域 -->
        <div class="x-slider__bar" :style="barStyle"></div>

        <!-- 刻度 -->
        <template v-if="showTicks">
          <div
            v-for="tick in ticks"
            :key="tick"
            class="x-slider__tick"
            :style="getTickStyle(tick)"
          ></div>
        </template>
      </div>

      <!-- 统一使用双滑块的渲染逻辑 -->
      <template v-for="(value, index) in normalizedValue" :key="index">
        <div
          v-if="!isOneValue || index === 1"
          class="x-slider__button-wrapper"
          :style="buttonStyle[index]"
          @mousedown="e => handleButtonMouseDown(e, index)"
        >
          <slot name="button">
            <div class="x-slider__button"></div>
          </slot>
          <div v-if="showValue" class="x-slider__value">
            <slot name="value" :value="value">
              {{ value }}
            </slot>
          </div>
        </div>
      </template>
    </div>

    <!-- 增加按钮 -->
    <template v-if="showButtons && isOneValue">
      <DecreaseComp v-if="vertical" @click="handleDecrease" />
      <IncreaseComp v-else @click="handleIncrease" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, watch, h } from "vue";
import { XIcon } from "../../icon";
import { type SliderProps, sliderEmits } from "./props";
import { useEventListener } from "@/hooks/useEvent";

const IncreaseComp = defineComponent({
  name: "XSliderIncrease",
  components: { XIcon },
  setup(_, { emit, slots }) {
    return () => {
      return h(
        "div",
        {
          class: "x-slider__increase",
          onClick: () => {
            emit("click");
          }
        },
        [
          slots.increase
            ? slots.increase()
            : h(XIcon, {
                name: "mdi:plus"
              })
        ]
      );
    };
  }
});

const DecreaseComp = defineComponent({
  name: "XSliderDecrease",
  components: { XIcon },
  setup(_, { emit, slots }) {
    return () => {
      return h(
        "div",
        {
          class: "x-slider__decrease",
          onClick: () => {
            emit("click");
          }
        },
        [
          slots.decrease
            ? slots.decrease()
            : h(XIcon, {
                name: "mdi:minus"
              })
        ]
      );
    };
  }
});

defineOptions({
  name: "XSlider"
});

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  showButtons: false,
  showTicks: false,
  showValue: false,
  vertical: false,
  disabled: false,
  size: "medium",
  type: "default"
});

const emit = defineEmits(sliderEmits);

const trackRef = ref<HTMLElement>();
const isDragging = ref(false);
const isOneValue = computed(() => typeof props.modelValue === "number");

// 添加内部状态保存真实值
const internalValue = ref<number | [number, number]>(props.modelValue);

// 在 setup 前添加工具函数
const normalizeValue = (value: number, min: number, step: number) => {
  return Math.round((value - min) / step) * step + min;
};

// 修改格式化值的函数
const formatValue = (
  value: number | [number, number],
  min: number,
  max: number,
  step: number
): [number, number] => {
  if (Array.isArray(value)) {
    let [start, end] = value;
    const _start = normalizeValue(start, min, step);
    const _end = normalizeValue(end, 0, step);

    return _start > _end ? [_end, _start] : [_start, _end];
  }

  // 单值时,起始值固定为最小值
  const normalizedValue = normalizeValue(
    Math.min(Math.max(value, min), max),
    min,
    step
  );

  return [min, normalizedValue];
};

// 修改计算属性，使用内部状态
const normalizedValue = computed(() => {
  return formatValue(internalValue.value, props.min, props.max, props.step);
});

// 修改按钮位置计算
const buttonStyle = computed(() => {
  const [start, end] = normalizedValue.value;
  const startPos = ((start - props.min) / (props.max - props.min)) * 100;
  const endPos = ((end - props.min) / (props.max - props.min)) * 100;

  return props.vertical
    ? [{ bottom: `${startPos}%` }, { bottom: `${endPos}%` }]
    : [{ left: `${startPos}%` }, { left: `${endPos}%` }];
});

// 修改选中区域样式计算
const barStyle = computed(() => {
  const [start, end] = normalizedValue.value;
  const startPos = ((start - props.min) / (props.max - props.min)) * 100;
  const endPos = ((end - props.min) / (props.max - props.min)) * 100;

  return props.vertical
    ? {
        bottom: `${startPos}%`,
        height: `${endPos - startPos}%`
      }
    : {
        left: `${startPos}%`,
        width: `${endPos - startPos}%`
      };
});

// 计算刻度位置
const ticks = computed(() => {
  const count = (props.max - props.min) / props.step;
  return Array.from(
    { length: count + 1 },
    (_, i) => props.min + i * props.step
  );
});

const getTickStyle = (value: number) => {
  const position = ((value - props.min) / (props.max - props.min)) * 100;
  return props.vertical ? { bottom: `${position}%` } : { left: `${position}%` };
};

// 添加一个检查值是否需要更新的函数
const shouldUpdateValue = <T extends number>(oldValue: T, newValue: T) => {
  const diff = Math.abs(newValue - oldValue);
  return diff >= props.step;
};

// 修改值处理函数
// force 为 true 时，强制更新值
const handleValueChange = (
  newValue: number | [number, number],
  force?: boolean
) => {
  if (props.disabled) return;

  // 更新内部状态
  internalValue.value = newValue;

  const normalized = formatValue(newValue, props.min, props.max, props.step);

  let res: number | [number, number] | undefined = undefined;

  if (force) {
    res = normalized;
  } else {
    // 当超过步长时发出事件
    if (Array.isArray(newValue) && Array.isArray(props.modelValue)) {
      if (
        shouldUpdateValue(newValue[0], props.modelValue[0]) ||
        shouldUpdateValue(newValue[1], props.modelValue[1])
      ) {
        res = normalized;
      }
    } else if (
      typeof newValue === "number" &&
      typeof props.modelValue === "number"
    ) {
      if (shouldUpdateValue(newValue, props.modelValue)) {
        res = normalized;
      }
    }
  }

  if (!res) return;

  emit("update:modelValue", !isOneValue.value ? res : res[1]);
  emit("input", !isOneValue.value ? res : res[1]);
  emit("change", !isOneValue.value ? res : res[1]);
};

const dragIndex = ref(0);
// 修改拖拽相关的处理函数
const handleDragging = (e: MouseEvent) => {
  if (!isDragging.value) return;

  const track = trackRef.value!;
  const rect = track.getBoundingClientRect();

  let newValue;
  if (props.vertical) {
    const percent = (rect.bottom - e.clientY) / rect.height;
    newValue = props.min + percent * (props.max - props.min);
  } else {
    const percent = (e.clientX - rect.left) / rect.width;
    newValue = props.min + percent * (props.max - props.min);
  }

  // 更新内部状态
  if (Array.isArray(internalValue.value)) {
    const [start, end] = internalValue.value;
    internalValue.value =
      dragIndex.value === 0
        ? [Math.min(newValue, end - props.step), end]
        : [start, Math.max(newValue, start + props.step)];
  } else {
    internalValue.value = newValue;
  }

  handleValueChange(internalValue.value);
};

const handleDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  // 拖拽结束时统一发出事件
  const normalized = formatValue(
    internalValue.value,
    props.min,
    props.max,
    props.step
  );

  handleValueChange(normalized, true);
  emit("drag-end");
};

useEventListener(document, "mousemove", handleDragging);
useEventListener(document, "mouseup", handleDragEnd);

// 修改步进按钮处理
const handleIncrease = () => {
  if (props.disabled || !isOneValue.value) return;
  handleValueChange((internalValue.value as number) + props.step);
};

const handleDecrease = () => {
  if (props.disabled || !isOneValue.value) return;
  handleValueChange((internalValue.value as number) - props.step);
};

// 修改轨道点击处理
const handleTrackClick = (e: MouseEvent) => {
  if (props.disabled) return;

  const track = trackRef.value!;
  const rect = track.getBoundingClientRect();

  let position;
  if (props.vertical) {
    position = (rect.bottom - e.clientY) / rect.height;
  } else {
    position = (e.clientX - rect.left) / rect.width;
  }

  const clickValue = position * (props.max - props.min) + props.min;

  if (Array.isArray(props.modelValue)) {
    const [start, end] = normalizedValue.value;
    const distanceToStart = Math.abs(clickValue - start);
    const distanceToEnd = Math.abs(clickValue - end);

    // 更新距离点击位置最近的值
    handleValueChange([
      distanceToStart < distanceToEnd ? clickValue : start,
      distanceToStart < distanceToEnd ? end : clickValue
    ]);
  } else {
    handleValueChange(clickValue);
  }
};

// 记录按钮按下时的初始位置
const startPosition = ref(0);
// 修改按钮按下时的初始位置记录
const handleButtonMouseDown = (e: MouseEvent, index?: number) => {
  if (props.disabled) return;

  e.preventDefault();
  isDragging.value = true;
  dragIndex.value = index || 0;

  if (props.vertical) {
    startPosition.value = e.clientY;
  } else {
    startPosition.value = e.clientX;
  }
};

// 监听 modelValue 变化更新内部状态
watch(
  () => props.modelValue,
  newValue => {
    internalValue.value = newValue;
  },
  { immediate: true }
);
</script>
