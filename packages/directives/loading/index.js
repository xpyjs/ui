import { ref } from "vue";
import { unrefElement } from "@/utils/dom/unrefElement";
import { useLoading } from "@/components/loading/src/hooks/useLoading";
export const vLoading = {
    mounted(el, binding) {
        let v = false;
        let options = {};
        if (typeof binding.value === "boolean") {
            v = binding.value;
        }
        else if (Array.isArray(binding.value)) {
            [v, options] = binding.value;
        }
        // (options as any): error TS2589: Type instantiation is excessively deep and possibly infinite.
        useLoading(el, ref(v), ref(options));
    },
    updated(el, binding) {
        let v = false;
        let options = {};
        if (typeof binding.value === "boolean") {
            v = binding.value;
        }
        else if (Array.isArray(binding.value)) {
            [v, options] = binding.value;
        }
        // (options as any): error TS2589: Type instantiation is excessively deep and possibly infinite.
        useLoading(el, ref(v), ref(options));
    },
    unmounted(el) {
        const loadingEl = unrefElement(el)?.querySelector(".x-loading-wrapper");
        if (loadingEl) {
            loadingEl.remove();
        }
    }
};
