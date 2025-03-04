import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
export function useMutationObserver(targetRef, callback, options = {
    childList: true, // 监听子节点的增删
    subtree: true, // 监听所有后代节点
    characterData: true, // 监听文本内容变化
    attributes: true // 监听属性变化
}) {
    const mutationObserver = ref();
    const cleanup = () => {
        if (mutationObserver.value) {
            mutationObserver.value.disconnect();
            mutationObserver.value = undefined;
        }
    };
    const setupMutationObserver = () => {
        if (!targetRef.value)
            return;
        // 清理旧的观察者
        cleanup();
        // 创建新的观察者
        mutationObserver.value = new MutationObserver(() => {
            nextTick(() => {
                callback();
            });
        });
        // 开始观察
        mutationObserver.value.observe(targetRef.value, options);
    };
    // 在 mounted 时设置观察者
    onMounted(() => {
        setupMutationObserver();
    });
    // 监听目标元素的变化
    watch(() => targetRef.value, newValue => {
        if (newValue) {
            setupMutationObserver();
        }
    });
    // 在组件卸载时清理
    onBeforeUnmount(() => {
        cleanup();
    });
    return {
        setupMutationObserver,
        cleanup
    };
}
