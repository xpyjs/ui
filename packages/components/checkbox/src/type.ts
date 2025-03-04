import {
  type ComponentSize,
  type ComponentType,
  type Direction
} from "@/types/basic";
import { type Ref } from "vue";

export type CheckboxModelValue = boolean | (string | number)[];

export type CheckboxGroupContext = {
  name: string;
  modelValue: Ref<(string | number)[]>;
  disabled: Ref<boolean>;
  size: Ref<ComponentSize>;
  type: Ref<ComponentType>;
  direction: Ref<Direction>;
  gap: Ref<string | number>;
  registerChild?: (value: string | number) => void;
  unregisterChild?: (value: string | number) => void;
  changeEvent: (value: (string | number)[]) => void;
};
