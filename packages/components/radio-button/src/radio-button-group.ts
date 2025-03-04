import type { Slot, SlotsType } from "vue";
import type { ComponentType, ComponentSize } from "../../../types/basic";

export interface RadioButtonGroupProps {
  type?: ComponentType;
  size?: ComponentSize;
  modelValue?: string | number | boolean;
  disabled?: boolean;
}

export const radioButtonGroupEmits = {
  "update:modelValue": (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
} as const;

export type RadioButtonGroupEmits = typeof radioButtonGroupEmits;

export type RadioButtonGroupSlots = SlotsType<{
  default?: Slot;
}>;
