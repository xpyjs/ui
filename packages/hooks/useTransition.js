import {} from "@/types/basic";
import { computed } from "vue";
const TransitionMap = {
    "x-fade": "x-fade",
    "x-zoom": "x-zoom",
    "x-slide": "x-slide",
    "x-slide-up": "x-slide-up",
    "x-slide-down": "x-slide-down",
    "x-slide-left": "x-slide-left",
    "x-slide-right": "x-slide-right"
};
export function useTransition(transition) {
    const transitionName = computed(() => transition.value === false
        ? "no-transition"
        : TransitionMap[transition.value] || "x-fade");
    return {
        transitionName
    };
}
