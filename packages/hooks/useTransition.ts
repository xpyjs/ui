import { type TransitionName } from "@/types/basic";
import { type Ref, computed } from "vue";

const TransitionMap: Record<TransitionName, string> = {
  "x-fade": "x-fade",
  "x-zoom": "x-zoom",
  "x-slide": "x-slide",
  "x-slide-up": "x-slide-up",
  "x-slide-down": "x-slide-down",
  "x-slide-left": "x-slide-left",
  "x-slide-right": "x-slide-right"
};

export function useTransition(transition: Ref<TransitionName | false>) {
  const transitionName = computed(() =>
    transition.value === false
      ? "no-transition"
      : TransitionMap[transition.value] || "x-fade"
  );

  return {
    transitionName
  };
}
