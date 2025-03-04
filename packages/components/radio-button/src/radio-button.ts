import type { Slot, SlotsType } from "vue";
import type { ComponentType, ComponentSize } from "../../../types/basic";

export interface RadioButtonProps {
  type?: ComponentType;
  size?: ComponentSize;
  modelValue?: string | number | boolean;
  value?: string | number | boolean;
  disabled?: boolean;
}

export const radioButtonEmits = {
  "update:modelValue": (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
} as const;

export type RadioButtonEmits = typeof radioButtonEmits;

export type RadioButtonSlots = SlotsType<{
  default?: Slot;
}>;
