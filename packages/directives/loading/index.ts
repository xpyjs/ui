import { type Directive, ref } from "vue";
import type { LoadingProps } from "@/components/loading/src/props";
import { type MaybeElement, unrefElement } from "@/utils/dom/unrefElement";
import { useLoading } from "@/components/loading/src/hooks/useLoading";

export type LoadingBinding = boolean | [boolean, Partial<LoadingProps>];

export const vLoading: Directive<MaybeElement, LoadingBinding> = {
  mounted(el, binding) {
    let v = false;
    let options = {} as Partial<LoadingProps>;
    if (typeof binding.value === "boolean") {
      v = binding.value;
    } else if (Array.isArray(binding.value)) {
      [v, options] = binding.value;
    }

    // (options as any): error TS2589: Type instantiation is excessively deep and possibly infinite.
    useLoading(el, ref(v), ref(options as any));
  },

  updated(el, binding) {
    let v = false;
    let options = {} as Partial<LoadingProps>;
    if (typeof binding.value === "boolean") {
      v = binding.value;
    } else if (Array.isArray(binding.value)) {
      [v, options] = binding.value;
    }

    // (options as any): error TS2589: Type instantiation is excessively deep and possibly infinite.
    useLoading(el, ref(v), ref(options as any));
  },

  unmounted(el) {
    const loadingEl = unrefElement(el)?.querySelector(".x-loading-wrapper");
    if (loadingEl) {
      loadingEl.remove();
    }
  }
};
