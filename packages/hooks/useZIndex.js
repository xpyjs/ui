import { computed, ref } from "vue";
const zIndexCounter = ref(4000);
export function useZIndex() {
    const generateZIndex = () => {
        zIndexCounter.value += 1;
    };
    const resetZIndex = () => {
        zIndexCounter.value = 4000;
    };
    return {
        zIndex: computed(() => zIndexCounter.value),
        generateZIndex,
        resetZIndex
    };
}
