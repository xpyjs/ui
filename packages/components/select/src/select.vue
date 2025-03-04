<template>
  <div
    :class="[
      'x-select',
      `x-select--${size}`,
      {
        'x-select--disabled': disabled,
        'x-select--readonly': readonly
      }
    ]"
  >
    <!-- 选择框触发器 -->
    <XPopup
      v-model:visible="popupVisible"
      v-bind="popupProps"
      :disabled="disabled"
    >
      <div v-if="isMultiple" tabindex="0" class="x-select--multiple-wrapper">
        <div
          v-if="Array.isArray(modelValue) && modelValue.length > 0"
          class="x-select--multiple"
        >
          <XScroll
            content-style="padding: 0 12px; display: flex; align-items: center;"
            :size="4"
          >
            <template v-if="type === 'tag'">
              <template v-for="item in modelValue" :key="item">
                <slot name="tag" :tag="item">
                  <XTag
                    class="x-select--multiple-item"
                    size="small"
                    type="primary"
                    closable
                    @close="handleClose(item)"
                  >
                    {{ getItemValue(item, options.label ?? "label") }}
                  </XTag>
                </slot>
              </template>
            </template>
            <template v-else>{{ displayValue }}</template>
          </XScroll>
        </div>
        <div v-else class="x-select--multiple__placeholder">
          {{ placeholder }}
        </div>

        <span style="flex-shrink: 0">
          <span
            :class="[
              'x-select__arrow',
              { 'x-select__arrow--active': popupVisible }
            ]"
          >
            <XIcon name="line-md:chevron-down" />
          </span>

          <span
            v-if="clearable && !disabled && !readonly && displayValue"
            class="x-select__clear"
            @click="handleClear"
          >
            <slot name="clear-icon">
              <XIcon name="line-md:close" />
            </slot>
          </span>
        </span>
      </div>

      <XInput
        v-else
        :model-value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="true"
        :size="size"
        :clearable="clearable && !disabled && !readonly"
      >
        <template #suffix>
          <span
            :class="[
              'x-select__arrow',
              { 'x-select__arrow--active': popupVisible }
            ]"
          >
            <slot name="arrow">
              <XIcon name="line-md:chevron-down" />
            </slot>
          </span>

          <!-- 清除按钮 -->
          <span
            v-if="clearable && !disabled && !readonly && displayValue"
            class="x-select__clear"
            @click="handleClear"
          >
            <slot name="clear-icon">
              <XIcon name="line-md:close" />
            </slot>
          </span>
        </template>
      </XInput>

      <template #content>
        <template
          v-for="(item, i) in items"
          :key="getItemValue(item, options.value ?? 'value')"
        >
          <slot :item="item" :$index="i">
            <div
              :class="[
                'x-select-item',
                { 'x-select-item__disabled': item.disabled },
                { 'x-select-item__active': checkActive(item) }
              ]"
              @click="handleOptionClick(item)"
            >
              {{ getItemValue(item, options.label ?? "label") }}
            </div>
          </slot>
        </template>
      </template>
    </XPopup>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { XInput } from "../../input";
import { XIcon } from "../../icon";
import { XPopup } from "../../popup";
import { XTag } from "../../tag";
import { XScroll } from "../../scroll";
import { type SelectProps, selectEmits, type SelectItem } from "./props";
import { warn } from "@/utils/console";
import { type ModelValue } from "@/types/basic";

defineOptions({
  name: "XSelect"
});

const props = withDefaults(defineProps<SelectProps>(), {
  items: () => [],
  options: () => ({
    label: "label",
    value: "value"
  }),
  type: "default",
  size: "medium",
  placeholder: "请选择"
});

const emit = defineEmits(selectEmits);

const visible = ref(false);
const popupVisible = computed({
  get: () => visible.value,
  set: value => {
    visible.value = value;
  }
});

const isMultiple = computed(() => Array.isArray(props.modelValue));

const getItemValue = (item: SelectItem | ModelValue, key: string) => {
  let _item: SelectItem | undefined = item as SelectItem;
  if (typeof item === "string" || typeof item === "number") {
    // 如果类型不一致，通过查找指定 key 来获取当前 item
    _item = props.items.find(it => it[props.options.value ?? "value"] === item);
  }

  if (!_item) {
    if (item) {
      warn("XSelect", `Item [${item}] / Key [${key}] not found.`);
    }
    return "";
  }

  if (Object.prototype.hasOwnProperty.call(_item, key)) {
    return _item[key];
  }

  warn("XSelect", `${key} is not a valid key for SelectItem.`);

  return "";
};

// 显示值
const displayValue = computed(() => {
  if (isMultiple.value) {
    return (props.modelValue as unknown as SelectItem[])
      .map(item => getItemValue(item, props.options.label ?? "label"))
      .join(", ");
  }
  return getItemValue(props.modelValue, props.options.label ?? "label");
});

const _findItem = (item: ModelValue) => {
  if (typeof item === "string" || typeof item === "number") {
    return props.items.find(it => it[props.options.value ?? "value"] === item);
  }
  return item;
};
const _isSameItem = (a: any, b: any) => {
  if (typeof a === "string" || typeof a === "number") {
    return a === b;
  }
  return (
    a?.[props.options.value ?? "value"] === b?.[props.options.value ?? "value"]
  );
};

// 检查是否选中
const checkActive = (item: SelectItem) => {
  if (isMultiple.value) {
    return (props.modelValue as unknown as SelectItem[]).some(it =>
      _isSameItem(it, item)
    );
  }

  return _isSameItem(_findItem(props.modelValue), item);
};

// 处理清除
const handleClear = (e: Event) => {
  e.stopPropagation();
  emit("update:modelValue", isMultiple.value ? [] : null);
  emit("clear");
  popupVisible.value = false;
};

// 处理选项点击
const handleOptionClick = (item: SelectItem) => {
  if (item.disabled) return;

  if (isMultiple.value) {
    const value = props.modelValue as unknown as SelectItem[];
    if (value.includes(item)) {
      value.splice(value.indexOf(item), 1);
    } else {
      value.push(item);
    }
    emit("update:modelValue", value);
    emit("change", value);
  } else {
    emit("update:modelValue", item);
    emit("change", item);
    popupVisible.value = false;
  }
};

// 处理关闭
const handleClose = (item: SelectItem) => {
  const value = props.modelValue as unknown as SelectItem[];
  value.splice(value.indexOf(item), 1);
  emit("update:modelValue", value);
  emit("change", value);
};
</script>
