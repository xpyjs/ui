import { type ComponentSize, type ComponentType } from "@/types/basic";
import { type Ref } from "vue";

export type RadioButtonGroupContext = {
  name?: string;
  modelValue?: Ref<string | number | boolean | undefined>;
  disabled?: Ref<boolean | undefined>;
  size?: Ref<ComponentSize | undefined>;
  type?: Ref<ComponentType | undefined>;
  changeEvent?: (value: string | number | boolean) => void;
};
